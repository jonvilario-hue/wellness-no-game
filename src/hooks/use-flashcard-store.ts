
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Card, Deck, CardType, DeckSettings } from '@/types/flashcards';
import { addDays } from 'date-fns';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  updateDoc, 
  onSnapshot, 
  query, 
  where,
  writeBatch
} from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

export const DEFAULT_DECK_SETTINGS: DeckSettings = {
  activePreset: 'casual',
  newCardsPerDay: 20,
  learningSteps: [1, 10],
  graduatingIntervalDays: 1,
  easyIntervalDays: 4,
  insertionOrder: 'sequential',
  maxReviewsPerDay: 200,
  startingEase: 2.5,
  easyBonus: 1.3,
  intervalModifier: 1.0,
  hardIntervalModifier: 1.2,
  maximumIntervalDays: 36500,
  minimumIntervalDays: 1,
  fuzzFactorEnabled: true,
  relearningSteps: [10],
  newIntervalAfterLapsePercent: 0,
  minimumLapseIntervalDays: 1,
  leechThreshold: 8,
  leechAction: 'suspend',
  reviewSortOrder: 'due-date',
  interdayLearningPriority: 'before-reviews',
  showAnswerTimer: false,
  showRemainingCount: true,
  autoplayAudio: true,
  buryNewSiblings: true,
  buryReviewSiblings: true,
  buryInterdayLearningSiblings: true,
  algorithm: 'sm2',
  desiredRetention: 0.90,
  fsrsParameters: [0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14, 0.94, 2.18, 0.05, 0.34, 1.26, 0.29, 2.61],
  learnAheadLimitMinutes: 20,
  dayBoundaryHour: 4,
};

type FlashcardStore = {
  decks: Deck[];
  cards: Card[];
  isSyncing: boolean;
  
  // Actions
  addDeck: (deck: { name: string; description?: string }) => void;
  updateDeck: (deckId: string, updates: Partial<Deck>) => void;
  deleteDeck: (deckId: string) => void;
  addCard: (card: { front: string; back: string; deckId: string; type: CardType; tags?: string[] }) => void;
  addCards: (cards: { front: string; back: string; deckId: string; type: CardType; tags?: string[] }[]) => void;
  updateCard: (updatedCard: Card) => void;
  deleteCard: (cardId: string) => void;
  rescheduleDueCards: (offsetDays: number) => void;
  
  // Firebase Sync
  initializeSync: (userId: string) => () => void;
};

const createInitialState = () => {
    const defaultDeck: Deck = {
        id: 'default',
        name: 'Default',
        description: 'General study cards.',
        settings: { ...DEFAULT_DECK_SETTINGS },
    };
    return { decks: [defaultDeck], cards: [], isSyncing: false };
};

export const useFlashcardStore = create<FlashcardStore>()(
  persist(
    (set, get) => ({
      ...createInitialState(),

      initializeSync: (userId: string) => {
        const { firestore } = initializeFirebase();
        
        set({ isSyncing: true });

        // Sync Decks
        const decksUnsub = onSnapshot(collection(firestore, 'users', userId, 'flashcard-decks'), (snap) => {
          const decks = snap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Deck));
          if (decks.length > 0) {
            set({ decks });
          }
        });

        // Sync Cards
        // In a real high-volume app, we would query per-deck, but for MVP we fetch all user cards
        const cardsUnsub = onSnapshot(query(collection(firestore, 'users', userId, 'flashcard-decks')), (deckSnap) => {
          deckSnap.docs.forEach(deckDoc => {
            onSnapshot(collection(firestore, 'users', userId, 'flashcard-decks', deckDoc.id, 'cards'), (cardSnap) => {
              const newCards = cardSnap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Card));
              set(state => {
                const filtered = state.cards.filter(c => !newCards.some(nc => nc.id === c.id));
                return { cards: [...filtered, ...newCards] };
              });
            });
          });
        });

        return () => {
          decksUnsub();
          cardsUnsub();
        };
      },

      addDeck: (deck) => {
        const { decks } = get();
        const id = crypto.randomUUID();
        const newDeck = {
          id,
          ...deck,
          settings: { ...DEFAULT_DECK_SETTINGS },
        };
        set({ decks: [...decks, newDeck] });
        
        // Push to Firebase (Non-blocking as per guidelines)
        const { firestore, user } = initializeFirebase();
        if (user) {
          setDoc(doc(firestore, 'users', user.uid, 'flashcard-decks', id), newDeck);
        }
      },

      updateDeck: (deckId, updates) => {
        set((state) => ({
          decks: state.decks.map((d) => (d.id === deckId ? { ...d, ...updates } : d)),
        }));

        const { firestore, user } = initializeFirebase();
        if (user) {
          updateDoc(doc(firestore, 'users', user.uid, 'flashcard-decks', deckId), updates);
        }
      },

      deleteDeck: (deckId) => {
        if (deckId === 'default') return;
        
        set((state) => ({
          decks: state.decks.filter((d) => d.id !== deckId),
          cards: state.cards.map(c => c.deckId === deckId ? { ...c, deckId: 'default' } : c),
        }));

        const { firestore, user } = initializeFirebase();
        if (user) {
          deleteDoc(doc(firestore, 'users', user.uid, 'flashcard-decks', deckId));
        }
      },

      addCard: (card) => {
        const id = crypto.randomUUID();
        const deck = get().decks.find(d => d.id === card.deckId);
        const ease = deck?.settings.startingEase || 2.5;
        const newCard: Card = {
          id,
          ...card,
          interval: 0,
          easeFactor: ease,
          repetitions: 0,
          lapses: 0,
          dueDate: new Date().toISOString(),
        };

        set((state) => ({ cards: [...state.cards, newCard] }));

        const { firestore, user } = initializeFirebase();
        if (user) {
          setDoc(doc(firestore, 'users', user.uid, 'flashcard-decks', card.deckId, 'cards', id), newCard);
        }
      },

      addCards: (newCards) => {
        const { firestore, user } = initializeFirebase();
        const batch = user ? writeBatch(firestore) : null;

        const createdCards = newCards.map(card => {
          const deck = get().decks.find(d => d.id === card.deckId);
          const ease = deck?.settings.startingEase || 2.5;
          const id = crypto.randomUUID();
          const nc = {
            id,
            ...card,
            interval: 0,
            easeFactor: ease,
            repetitions: 0,
            lapses: 0,
            dueDate: new Date().toISOString(),
          };
          
          if (batch && user) {
            batch.set(doc(firestore, 'users', user.uid, 'flashcard-decks', card.deckId, 'cards', id), nc);
          }
          return nc;
        });

        set((state) => ({ cards: [...state.cards, ...createdCards] }));
        if (batch) batch.commit();
      },

      updateCard: (updatedCard) => {
        set((state) => ({
          cards: state.cards.map((c) => (c.id === updatedCard.id ? updatedCard : c)),
        }));

        const { firestore, user } = initializeFirebase();
        if (user) {
          updateDoc(doc(firestore, 'users', user.uid, 'flashcard-decks', updatedCard.deckId, 'cards', updatedCard.id), updatedCard);
        }
      },

      deleteCard: (cardId) => {
        const card = get().cards.find(c => c.id === cardId);
        set((state) => ({
          cards: state.cards.filter((c) => c.id !== cardId),
        }));

        const { firestore, user } = initializeFirebase();
        if (user && card) {
          deleteDoc(doc(firestore, 'users', user.uid, 'flashcard-decks', card.deckId, 'cards', cardId));
        }
      },

      rescheduleDueCards: (offsetDays) => {
        const { firestore, user } = initializeFirebase();
        const batch = user ? writeBatch(firestore) : null;

        set((state) => ({
          cards: state.cards.map(card => {
            const isDue = new Date(card.dueDate) <= new Date();
            if (!isDue) return card;
            const newDate = addDays(new Date(card.dueDate), offsetDays).toISOString();
            
            if (batch && user) {
              batch.update(doc(firestore, 'users', user.uid, 'flashcard-decks', card.deckId, 'cards', card.id), { dueDate: newDate });
            }
            
            return { ...card, dueDate: newDate };
          })
        }));

        if (batch) batch.commit();
      }
    }),
    {
      name: 'flashcard-storage-v4',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
