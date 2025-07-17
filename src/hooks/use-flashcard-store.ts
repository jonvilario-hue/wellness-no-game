
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Deck, Card, ReviewLog } from '@/types/flashcards';
import { sm2 } from '@/lib/srs';

const createNewCard = (deckId: string, front: string, back: string, tags: string[] = []): Card => {
  const now = new Date().toISOString();
  return {
    id: `card-${Date.now()}`,
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
  updateCard: (id: string, cardData: Partial<Omit<Card, 'id' | 'deckId'>>) => void;
  deleteCard: (id: string) => void;
  reviewCard: (cardId: string, rating: 1 | 2 | 3 | 4) => void;
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
        set((state) => ({
          decks: state.decks.filter((d) => d.id !== id),
          cards: state.cards.filter((c) => c.deckId !== id), // Also delete cards in the deck
        }));
      },

      addCard: (cardData) => {
        const newCard = createNewCard(cardData.deckId, cardData.front, cardData.back, cardData.tags);
        set((state) => ({ cards: [...state.cards, newCard] }));
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
          if (!card) return;

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
      }
    }),
    {
      name: 'flashcard-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
