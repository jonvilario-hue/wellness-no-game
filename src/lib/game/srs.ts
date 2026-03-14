'use client';

/**
 * @fileOverview Spaced Repetition System (SRS) Service Layer.
 * 
 * CRITICAL RULE: This is the ONLY file allowed to import from 'firebase/firestore',
 * 'firebase/auth', or 'firebase/storage'. All cloud-backed SRS logic lives here.
 */

import { 
  Firestore, 
  doc, 
  collection, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  onSnapshot,
  orderBy,
  Query,
  CollectionReference,
  DocumentData,
  writeBatch
} from 'firebase/firestore';
import { getAuth, signInAnonymously, User, onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { initializeFirebase } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useState, useEffect } from 'react';

// --- TYPES ---

export type CardType = 'basic' | 'cloze' | 'basic-reversed' | 'image-occlusion' | 'type-in';

export interface Flashcard {
  id: string;
  deckId: string;
  front: string;
  back: string;
  type: CardType;
  dueDate: string; // ISO
  interval: number; // in days
  easeFactor: number;
  repetitions: number;
  lapses: number;
  suspended: boolean;
  tags: string[];
}

export interface FlashcardDeck {
  id: string;
  name: string;
  description: string;
  settings: any;
}

export interface AnkiMetadata {
  id: string;
  userId: string;
  fileName: string;
  displayName: string;
  fileSize: number;
  downloadUrl: string;
  uploadedAt: string;
}

// --- AUTH ---

export function getSrsAuth() {
  const { auth } = initializeFirebase();
  return auth;
}

export async function ensureSrsAuth(): Promise<User | null> {
  const auth = getSrsAuth();
  if (auth.currentUser) return auth.currentUser;
  
  try {
    const cred = await signInAnonymously(auth);
    return cred.user;
  } catch (err) {
    console.error("SRS Auth failed:", err);
    return null;
  }
}

// --- HOOKS (Centralized to keep UI imports clean) ---

export function useSrsUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getSrsAuth();
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  return { user, loading };
}

// Re-implementing simplified hooks to avoid page-level firebase imports
export function useSrsCollection<T = any>(memoizedQuery: Query<DocumentData> | null) {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!memoizedQuery) return;
    setIsLoading(true);
    return onSnapshot(memoizedQuery, (snap) => {
      setData(snap.docs.map(d => ({ ...d.data(), id: d.id } as T)));
      setIsLoading(false);
    }, (err) => {
      console.error("SRS Sync Error:", err);
      setIsLoading(false);
    });
  }, [memoizedQuery]);

  return { data, isLoading };
}

// --- ALGORITHM (SM-2) ---

export function applySM2(card: Flashcard, rating: number): Flashcard {
  let { interval, easeFactor, repetitions, lapses, suspended } = card;

  // rating: 1 (Again), 2 (Hard), 3 (Good), 4 (Easy)
  if (rating === 1) {
    lapses += 1;
    repetitions = 0;
    interval = 1;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
  } else {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;

    if (rating === 2) easeFactor = Math.max(1.3, easeFactor - 0.15);
    if (rating === 4) {
      easeFactor += 0.15;
      interval = Math.round(interval * 1.3);
    }
  }

  const now = new Date();
  const dueDate = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);

  return {
    ...card,
    interval,
    easeFactor: parseFloat(easeFactor.toFixed(2)),
    repetitions,
    lapses,
    suspended,
    dueDate: dueDate.toISOString(),
  };
}

// --- FIRESTORE WRAPPERS ---

export async function srsAddDeck(userId: string, name: string, description: string = '') {
  const { firestore } = initializeFirebase();
  const id = crypto.randomUUID();
  const deckRef = doc(firestore, 'users', userId, 'flashcard-decks', id);
  const data: FlashcardDeck = {
    id,
    name,
    description,
    settings: { newCardsPerDay: 20, maxReviewsPerDay: 200 }
  };

  setDoc(deckRef, data).catch(err => {
    errorEmitter.emit('permission-error', new FirestorePermissionError({
      path: deckRef.path,
      operation: 'create',
      requestResourceData: data
    }));
  });
  return id;
}

export async function srsAddCard(userId: string, card: Omit<Flashcard, 'id' | 'interval' | 'easeFactor' | 'repetitions' | 'lapses' | 'suspended'>) {
  const { firestore } = initializeFirebase();
  const id = crypto.randomUUID();
  const cardRef = doc(firestore, 'users', userId, 'flashcard-decks', card.deckId, 'cards', id);
  
  const data: Flashcard = {
    ...card,
    id,
    interval: 0,
    easeFactor: 2.5,
    repetitions: 0,
    lapses: 0,
    suspended: false
  };

  setDoc(cardRef, data).catch(err => {
    errorEmitter.emit('permission-error', new FirestorePermissionError({
      path: cardRef.path,
      operation: 'create',
      requestResourceData: data
    }));
  });
}

export async function srsUpdateCard(userId: string, deckId: string, cardId: string, rating: number, currentCard: Flashcard) {
  const { firestore } = initializeFirebase();
  const updated = applySM2(currentCard, rating);
  const cardRef = doc(firestore, 'users', userId, 'flashcard-decks', deckId, 'cards', cardId);

  updateDoc(cardRef, updated as any).catch(err => {
    errorEmitter.emit('permission-error', new FirestorePermissionError({
      path: cardRef.path,
      operation: 'update',
      requestResourceData: updated
    }));
  });
}

// --- ANKI VAULT (STORAGE) ---

export async function srsUploadAnki(userId: string, file: File, onProgress?: (p: number) => void) {
  const { storage, firestore } = initializeFirebase();
  const deckId = crypto.randomUUID();
  const storageRef = ref(storage, `users/${userId}/anki-decks/${deckId}.apkg`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise<AnkiMetadata>((resolve, reject) => {
    uploadTask.on('state_changed', 
      (snap) => onProgress?.((snap.bytesTransferred / snap.totalBytes) * 100),
      (err) => reject(err),
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        const metadata: AnkiMetadata = {
          id: deckId,
          userId,
          fileName: file.name,
          displayName: file.name.replace('.apkg', ''),
          fileSize: file.size,
          downloadUrl,
          uploadedAt: new Date().toISOString()
        };
        
        await setDoc(doc(firestore, 'users', userId, 'anki-decks', deckId), metadata);
        resolve(metadata);
      }
    );
  });
}

export async function srsDeleteAnki(userId: string, deckId: string) {
  const { storage, firestore } = initializeFirebase();
  const storageRef = ref(storage, `users/${userId}/anki-decks/${deckId}.apkg`);
  await deleteObject(storageRef);
  await deleteDoc(doc(firestore, 'users', userId, 'anki-decks', deckId));
}

// --- QUERY GENERATORS ---

export function getDecksQuery(userId: string) {
  const { firestore } = initializeFirebase();
  return query(collection(firestore, 'users', userId, 'flashcard-decks'), orderBy('name'));
}

export function getDueCardsQuery(userId: string, deckId: string) {
  const { firestore } = initializeFirebase();
  const now = new Date().toISOString();
  return query(
    collection(firestore, 'users', userId, 'flashcard-decks', deckId, 'cards'),
    where('dueDate', '<=', now),
    where('suspended', '==', false)
  );
}
