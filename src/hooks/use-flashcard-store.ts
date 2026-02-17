'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Card, Deck, CardType, DeckSettings } from '@/types/flashcards';

export const DEFAULT_DECK_SETTINGS: DeckSettings = {
  activePreset: 'casual',
  // New Cards
  newCardsPerDay: 20,
  learningSteps: [1, 10],
  graduatingIntervalDays: 1,
  easyIntervalDays: 4,
  insertionOrder: 'sequential',

  // Reviews
  maxReviewsPerDay: 200,
  startingEase: 2.5,
  easyBonus: 1.3,
  intervalModifier: 1.0,
  hardIntervalModifier: 1.2,
  maximumIntervalDays: 36500,
  minimumIntervalDays: 1,
  fuzzFactorEnabled: true,

  // Lapses
  relearningSteps: [10],
  newIntervalAfterLapsePercent: 0,
  minimumLapseIntervalDays: 1,
  leechThreshold: 8,
  leechAction: 'suspend',

  // Display & Order
  reviewSortOrder: 'due-date',
  interdayLearningPriority: 'before-reviews',
  showAnswerTimer: false,
  showRemainingCount: true,
  autoplayAudio: true,

  // Burying
  buryNewSiblings: true,
  buryReviewSiblings: true,
  buryInterdayLearningSiblings: true,

  // Advanced
  algorithm: 'sm2',
  desiredRetention: 0.90,
  fsrsParameters: [0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14, 0.94, 2.18, 0.05, 0.34, 1.26, 0.29, 2.61],

  // Daily Limits
  learnAheadLimitMinutes: 20,
  dayBoundaryHour: 4,
};

type FlashcardStore = {
  decks: Deck[];
  cards: Card[];
  addDeck: (deck: { name: string; description?: string }) => void;
  updateDeck: (deckId: string, updates: Partial<Deck>) => void;
  deleteDeck: (deckId: string) => void;
  addCard: (card: { front: string; back: string; deckId: string; type: CardType; tags?: string[] }) => void;
  addCards: (cards: { front: string; back: string; deckId: string; type: CardType; tags?: string[] }[]) => void;
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
      addCards: (newCards) =>
        set((state) => {
          const createdCards = newCards.map(card => {
            const deck = state.decks.find(d => d.id === card.deckId);
            const ease = deck?.settings.startingEase || 2.5;
            return {
              id: crypto.randomUUID(),
              ...card,
              interval: 0,
              easeFactor: ease,
              repetitions: 0,
              lapses: 0,
              dueDate: new Date().toISOString(),
            };
          });
          return {
            cards: [...state.cards, ...createdCards],
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
      name: 'flashcard-storage-v4',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.decks) {
          state.decks = state.decks.map(deck => ({
            ...deck,
            settings: { ...DEFAULT_DECK_SETTINGS, ...deck.settings }
          }));
        }
      }
    }
  )
);
