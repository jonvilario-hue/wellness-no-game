
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Deck, Card, ReviewLog } from '@/types/flashcards';
import { sm2 } from '@/lib/srs';

const createNewCard = (deckId: string, front: string, back: string, tags: string[] = []): Card => {
  const now = new Date().toISOString();
  return {
    id: `card-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    front,
    back,
    tags,
    deckId,
    interval: 0,
    easeFactor: 2.5,
    repetitions: 0,
    dueDate: now,
    createdAt: now,
    updatedAt: now,
    type: 'basic',
  };
};

const createNewDeck = (name: string, description: string = ''): Deck => {
    return {
        id: `deck-${Date.now()}`,
        name,
        description,
    }
}

interface FlashcardState {
  decks: Deck[];
  cards: Card[];
  reviewLogs: ReviewLog[];
  addDeck: (deckData: Omit<Deck, 'id'>) => void;
  updateDeck: (id: string, deckData: Partial<Omit<Deck, 'id'>>) => void;
  deleteDeck: (id: string) => void;
  addCard: (cardData: Omit<Card, 'id' | 'interval' | 'easeFactor' | 'repetitions' | 'dueDate' | 'createdAt' | 'updatedAt' | 'type'>) => void;
  bulkAddCards: (cardDataArray: Omit<Card, 'id' | 'interval' | 'easeFactor' | 'repetitions' | 'dueDate' | 'createdAt' | 'updatedAt' | 'type'>[]) => void;
  updateCard: (id: string, cardData: Partial<Omit<Card, 'id' | 'deckId'>>) => void;
  deleteCard: (id: string) => void;
  reviewCard: (cardId: string, rating: 1 | 2 | 3 | 4) => { isCorrect: boolean };
}

const defaultDecks: Deck[] = [
    { id: 'default-deck', name: 'Default', description: 'A default deck for your cards.'}
]

export const useFlashcardStore = create<FlashcardState>()(
  persist(
    (set, get) => ({
      decks: defaultDecks,
      cards: [],
      reviewLogs: [],

      addDeck: (deckData) => {
        const newDeck = createNewDeck(deckData.name, deckData.description);
        set((state) => ({ decks: [...state.decks, newDeck] }));
      },
      updateDeck: (id, deckData) => {
        set((state) => ({
          decks: state.decks.map((d) => (d.id === id ? { ...d, ...deckData } : d)),
        }));
      },
      deleteDeck: (id) => {
        if (id === 'default-deck') {
            console.warn("The default deck cannot be deleted.");
            return;
        }
        set((state) => ({
          // Move cards to default deck instead of deleting them
          cards: state.cards.map(c => c.deckId === id ? { ...c, deckId: 'default-deck' } : c),
          decks: state.decks.filter((d) => d.id !== id),
        }));
      },

      addCard: (cardData) => {
        const newCard = createNewCard(cardData.deckId, cardData.front, cardData.back, cardData.tags);
        set((state) => ({ cards: [...state.cards, newCard] }));
      },
      
      bulkAddCards: (cardDataArray) => {
          let decks = get().decks;
          const defaultDeckExists = decks.some(d => d.id === 'default-deck');
          
          if (!defaultDeckExists) {
              const defaultDeck = { id: 'default-deck', name: 'Default', description: 'A deck for imported cards.' };
              decks = [...decks, defaultDeck];
          }

          const newCards = cardDataArray.map(cardData => 
              createNewCard(cardData.deckId, cardData.front, cardData.back, cardData.tags)
          );
          set(state => ({ cards: [...state.cards, ...newCards], decks }));
      },

      updateCard: (id, cardData) => {
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === id ? { ...c, ...cardData, updatedAt: new Date().toISOString() } : c
          ),
        }));
      },
      deleteCard: (id) => {
        set((state) => ({ cards: state.cards.filter((c) => c.id !== id) }));
      },
      
      reviewCard: (cardId, rating) => {
          const card = get().cards.find(c => c.id === cardId);
          if (!card) return { isCorrect: false };

          const { interval, easeFactor, repetitions, isCorrect } = sm2(card, rating);
          
          const now = new Date();
          const dueDate = new Date(now.setDate(now.getDate() + interval)).toISOString();

          const ratingMap = {1: 'again', 2: 'hard', 3: 'good', 4: 'easy'};

          const log: ReviewLog = {
              cardId: card.id,
              deckId: card.deckId,
              reviewedAt: new Date().toISOString(),
              rating: ratingMap[rating],
              previousInterval: card.interval,
              newInterval: interval,
              previousEaseFactor: card.easeFactor,
              newEaseFactor: easeFactor,
          };

          set(state => ({
              cards: state.cards.map(c => 
                  c.id === cardId ? { ...c, interval, easeFactor, repetitions, dueDate, updatedAt: new Date().toISOString() } : c
              ),
              reviewLogs: [log, ...state.reviewLogs].slice(0, 200) // Keep last 200 logs
          }));

          return { isCorrect };
      }
    }),
    {
      name: 'flashcard-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
