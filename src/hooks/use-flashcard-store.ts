
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Card, Deck, CardType, DeckSettings } from '@/types/flashcards';

export const DEFAULT_DECK_SETTINGS: DeckSettings = {
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
  relearningSteps: [10],
  minimumLapseIntervalDays: 1,
  leechThreshold: 8,
  leechAction: 'suspend',
};

type FlashcardStore = {
  decks: Deck[];
  cards: Card[];
  addDeck: (deck: { name: string; description?: string }) => void;
  updateDeck: (deckId: string, updates: Partial<Deck>) => void;
  deleteDeck: (deckId: string) => void;
  addCard: (card: { front: string; back: string; deckId: string; type: CardType; tags?: string[] }) => void;
  updateCard: (updatedCard: Card) => void;
  deleteCard: (cardId: string) => void;
};

const createInitialState = () => {
    const defaultDeck: Deck = {
        id: 'default',
        name: 'Default',
        description: 'General study cards.',
        settings: { ...DEFAULT_DECK_SETTINGS },
    };
    return { decks: [defaultDeck], cards: [] };
};

export const useFlashcardStore = create<FlashcardStore>()(
  persist(
    (set, get) => ({
      ...createInitialState(),
      addDeck: (deck) =>
        set((state) => ({
          decks: [...state.decks, {
            id: crypto.randomUUID(),
            ...deck,
            settings: { ...DEFAULT_DECK_SETTINGS },
          }],
        })),
      updateDeck: (deckId, updates) =>
        set((state) => ({
          decks: state.decks.map((d) => (d.id === deckId ? { ...d, ...updates } : d)),
        })),
      deleteDeck: (deckId) =>
        set((state) => {
          if (deckId === 'default') return state; 
          return {
            decks: state.decks.filter((d) => d.id !== deckId),
            cards: state.cards.map(c => c.deckId === deckId ? { ...c, deckId: 'default' } : c),
          };
        }),
      addCard: (card) =>
        set((state) => {
          const deck = state.decks.find(d => d.id === card.deckId);
          const ease = deck?.settings.startingEase || 2.5;
          return {
            cards: [...state.cards, {
              id: crypto.randomUUID(),
              ...card,
              interval: 0,
              easeFactor: ease,
              repetitions: 0,
              lapses: 0,
              dueDate: new Date().toISOString(),
            }],
          };
        }),
      updateCard: (updatedCard) =>
        set((state) => ({
          cards: state.cards.map((c) => (c.id === updatedCard.id ? updatedCard : c)),
        })),
      deleteCard: (cardId) =>
        set((state) => ({
          cards: state.cards.filter((c) => c.id !== cardId),
        })),
    }),
    {
      name: 'flashcard-storage-v3',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
