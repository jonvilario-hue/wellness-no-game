'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Card, Deck, CardType, DeckSettings } from '@/types/flashcards';
import { addDays } from 'date-fns';
import { 
  srsAddDeck, 
  srsAddCard, 
  srsUpdateCard, 
  Flashcard, 
  FlashcardDeck 
} from '@/lib/game/srs';

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
  addDeck: (userId: string, deck: { name: string; description?: string }) => void;
  updateDeck: (userId: string, deckId: string, updates: Partial<Deck>) => void;
  deleteDeck: (userId: string, deckId: string) => void;
  addCard: (userId: string, card: { front: string; back: string; deckId: string; type: CardType; tags?: string[] }) => void;
  updateCardLocal: (updatedCard: Card) => void;
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

      addDeck: (userId, deck) => {
        srsAddDeck(userId, deck.name, deck.description);
      },

      updateDeck: (userId, deckId, updates) => {
        set((state) => ({
          decks: state.decks.map((d) => (d.id === deckId ? { ...d, ...updates } : d)),
        }));
      },

      deleteDeck: (userId, deckId) => {
        if (deckId === 'default') return;
        set((state) => ({
          decks: state.decks.filter((d) => d.id !== deckId),
        }));
      },

      addCard: (userId, card) => {
        srsAddCard(userId, {
          ...card,
          dueDate: new Date().toISOString(),
          tags: card.tags || []
        });
      },

      updateCardLocal: (updatedCard) => {
        set((state) => ({
          cards: state.cards.map((c) => (c.id === updatedCard.id ? updatedCard : c)),
        }));
      },
    }),
    {
      name: 'flashcard-storage-v4',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
