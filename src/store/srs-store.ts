
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  Card,
  Deck,
  CardType,
  CardState,
  Rating,
  DeckSettings,
  HistoryEntry,
  DailyProgress,
  StudySession,
  ThemeName,
} from '@/types/srs-types';
import {
  DEFAULT_SETTINGS,
  getEffectiveSettings,
  scheduleCard,
  getDueCards,
  getPreviewIntervals,
} from '@/lib/srs-scheduler';
import { applyTheme } from '@/lib/srs-themes';

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function ensureDailyProgress(map: Record<string, DailyProgress>): DailyProgress {
  const key = todayKey();
  if (!map[key]) {
    map[key] = {
      date: key,
      newReviewed: 0,
      reviewsDone: 0,
      totalReviews: 0,
      correctCount: 0,
      againCount: 0,
    };
  }
  return map[key];
}

interface FlashcardStore {
  decks: Deck[];
  cards: Card[];
  globalSettings: DeckSettings;
  history: HistoryEntry[];
  dailyProgress: Record<string, DailyProgress>;
  theme: ThemeName;
  studySession: StudySession;

  addDeck: (deck: { name: string; description?: string; settings?: Partial<DeckSettings> }) => void;
  updateDeck: (deckId: string, updates: Partial<Deck>) => void;
  deleteDeck: (deckId: string) => void;
  addCard: (card: { front: string; back: string; deckId: string; type: CardType; tags?: string[] }) => void;
  addCards: (cards: { front: string; back: string; deckId: string; type: CardType; tags?: string[] }[]) => void;
  updateCard: (cardId: string, updates: Partial<Card>) => void;
  deleteCard: (cardId: string) => void;
  moveCards: (cardIds: string[], targetDeckId: string) => void;
  updateGlobalSettings: (updates: Partial<DeckSettings>) => void;
  updateDeckSettings: (deckId: string, updates: Partial<DeckSettings>) => void;
  getEffectiveSettingsForDeck: (deckId: string) => DeckSettings;
  setTheme: (theme: ThemeName) => void;
  startStudySession: (deckId: string) => void;
  endStudySession: () => void;
  flipCard: () => void;
  rateCard: (rating: Rating) => void;
  advanceWaitingRoom: () => void;
  getDueCountsForDeck: (deckId: string) => { newCount: number; reviewCount: number; learningCount: number };
  getPreviewIntervalsForCurrent: () => Record<Rating, string> | null;
  getCurrentCard: () => Card | null;
  clearHistory: () => void;
}

const DEFAULT_DECK: Deck = {
  id: 'default',
  name: 'Default',
  description: 'Uncategorized cards.',
  settings: {},
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const EMPTY_SESSION: StudySession = {
  deckId: null,
  queue: [],
  waitingRoom: [],
  currentIndex: 0,
  isFlipped: false,
  sessionStartedAt: null,
  newStudied: 0,
  reviewsStudied: 0,
};

export const useFlashcardStore = create<FlashcardStore>()(
  persist(
    (set, get) => ({
      decks: [DEFAULT_DECK],
      cards: [],
      globalSettings: { ...DEFAULT_SETTINGS },
      history: [],
      dailyProgress: {},
      theme: 'midnight',
      studySession: { ...EMPTY_SESSION },

      addDeck: (deck) =>
        set((s) => ({
          decks: [...s.decks, {
            id: crypto.randomUUID(),
            name: deck.name,
            description: deck.description ?? '',
            settings: deck.settings ?? {},
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }],
        })),

      updateDeck: (deckId, updates) =>
        set((s) => ({
          decks: s.decks.map((d) => d.id === deckId ? { ...d, ...updates, updatedAt: new Date().toISOString() } : d),
        })),

      deleteDeck: (deckId) =>
        set((s) => {
          if (deckId === 'default') return s;
          return {
            decks: s.decks.filter((d) => d.id !== deckId),
            cards: s.cards.map((c) => c.deckId === deckId ? { ...c, deckId: 'default' } : c),
            studySession: s.studySession.deckId === deckId ? { ...EMPTY_SESSION } : s.studySession,
          };
        }),

      addCard: (card) =>
        set((s) => ({
          cards: [...s.cards, {
            id: crypto.randomUUID(),
            ...card,
            tags: card.tags ?? [],
            state: 'new',
            stepIndex: 0,
            due: new Date().toISOString(),
            interval: 0,
            ease: s.globalSettings.startingEase,
            reps: 0,
            lapses: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }],
        })),

      addCards: (cards) =>
        set((s) => ({
          cards: [...s.cards, ...cards.map(card => ({
            id: crypto.randomUUID(),
            ...card,
            tags: card.tags ?? [],
            state: 'new' as CardState,
            stepIndex: 0,
            due: new Date().toISOString(),
            interval: 0,
            ease: s.globalSettings.startingEase,
            reps: 0,
            lapses: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }))],
        })),

      updateCard: (cardId, updates) =>
        set((s) => ({
          cards: s.cards.map((c) => c.id === cardId ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c),
        })),

      deleteCard: (cardId) =>
        set((s) => ({
          cards: s.cards.filter((c) => c.id !== cardId),
          studySession: {
            ...s.studySession,
            queue: s.studySession.queue.filter((id) => id !== cardId),
            waitingRoom: s.studySession.waitingRoom.filter((w) => w.cardId !== cardId),
          },
        })),

      moveCards: (cardIds, targetDeckId) =>
        set((s) => ({
          cards: s.cards.map((c) => cardIds.includes(c.id) ? { ...c, deckId: targetDeckId, updatedAt: new Date().toISOString() } : c),
        })),

      updateGlobalSettings: (updates) => set((s) => ({ globalSettings: { ...s.globalSettings, ...updates } })),

      updateDeckSettings: (deckId, updates) =>
        set((s) => ({
          decks: s.decks.map((d) => d.id === deckId ? { ...d, settings: { ...d.settings, ...updates }, updatedAt: new Date().toISOString() } : d),
        })),

      getEffectiveSettingsForDeck: (deckId) => {
        const s = get();
        const deck = s.decks.find((d) => d.id === deckId);
        return getEffectiveSettings(s.globalSettings, deck?.settings ?? {});
      },

      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },

      startStudySession: (deckId) =>
        set((s) => {
          const settings = getEffectiveSettings(s.globalSettings, s.decks.find((d) => d.id === deckId)?.settings ?? {});
          const progress = s.dailyProgress[todayKey()];
          const { newCards, reviewCards, learningCards } = getDueCards(s.cards, deckId, settings, progress);

          const shuffle = <T,>(arr: T[]): T[] => {
            const a = [...arr];
            for (let i = a.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
          };

          const queue = [
            ...shuffle(learningCards).map((c) => c.id),
            ...shuffle(newCards).map((c) => c.id),
            ...shuffle(reviewCards).map((c) => c.id),
          ];

          return {
            studySession: {
              deckId,
              queue,
              waitingRoom: [],
              currentIndex: 0,
              isFlipped: false,
              sessionStartedAt: new Date().toISOString(),
              newStudied: 0,
              reviewsStudied: 0,
            },
          };
        }),

      endStudySession: () => set({ studySession: { ...EMPTY_SESSION } }),

      flipCard: () => set((s) => ({ studySession: { ...s.studySession, isFlipped: true } })),

      rateCard: (rating) =>
        set((s) => {
          const { studySession, cards, dailyProgress, history } = s;
          if (!studySession.deckId || studySession.currentIndex >= studySession.queue.length) return s;

          const cardId = studySession.queue[studySession.currentIndex];
          const card = cards.find((c) => c.id === cardId);
          if (!card) return s;

          const settings = getEffectiveSettings(s.globalSettings, s.decks.find((d) => d.id === studySession.deckId)?.settings ?? {});
          const previousState = card.state;
          const updatedCard = scheduleCard(card, rating, settings);

          const newDailyProgress = { ...dailyProgress };
          const dp = ensureDailyProgress(newDailyProgress);
          dp.totalReviews += 1;
          if (rating === 'again') dp.againCount += 1; else dp.correctCount += 1;

          let newStudied = studySession.newStudied;
          let reviewsStudied = studySession.reviewsStudied;
          if (previousState === 'new') { dp.newReviewed += 1; newStudied += 1; }
          if (previousState === 'review') { dp.reviewsDone += 1; reviewsStudied += 1; }

          const historyEntry: HistoryEntry = {
            id: crypto.randomUUID(),
            cardId: card.id,
            deckId: card.deckId,
            rating,
            previousState,
            newState: updatedCard.state,
            previousInterval: card.interval,
            newInterval: updatedCard.interval,
            timestamp: new Date().toISOString(),
          };

          const newWaitingRoom = [...studySession.waitingRoom];
          if (updatedCard.state === 'learning' || updatedCard.state === 'relearning') {
            newWaitingRoom.push({ cardId: updatedCard.id, availableAt: new Date(updatedCard.due).getTime() });
          }

          const newCards = cards.map((c) => c.id === cardId ? updatedCard : c);
          let nextIndex = studySession.currentIndex + 1;
          const now = Date.now();
          const ready = newWaitingRoom.filter((w) => w.availableAt <= now);
          const stillWaiting = newWaitingRoom.filter((w) => w.availableAt > now);

          let newQueue = [...studySession.queue];
          if (ready.length > 0) {
            const readyIds = ready.map((w) => w.cardId);
            newQueue.splice(nextIndex, 0, ...readyIds);
          }

          return {
            cards: newCards,
            dailyProgress: newDailyProgress,
            history: [...history, historyEntry],
            studySession: {
              ...studySession,
              queue: newQueue,
              waitingRoom: stillWaiting,
              currentIndex: nextIndex,
              isFlipped: false,
              newStudied,
              reviewsStudied,
            },
          };
        }),

      advanceWaitingRoom: () =>
        set((s) => {
          const { studySession } = s;
          const now = Date.now();
          const ready = studySession.waitingRoom.filter((w) => w.availableAt <= now);
          const stillWaiting = studySession.waitingRoom.filter((w) => w.availableAt > now);
          if (ready.length === 0) return s;
          const readyIds = ready.map((w) => w.cardId);
          return {
            studySession: {
              ...studySession,
              queue: [...studySession.queue, ...readyIds],
              waitingRoom: stillWaiting,
            },
          };
        }),

      getDueCountsForDeck: (deckId) => {
        const s = get();
        const settings = getEffectiveSettings(s.globalSettings, s.decks.find((d) => d.id === deckId)?.settings ?? {});
        const progress = s.dailyProgress[todayKey()];
        const { newCards, reviewCards, learningCards } = getDueCards(s.cards, deckId, settings, progress);
        return {
          newCount: newCards.length,
          reviewCount: reviewCards.length,
          learningCount: learningCards.length,
        };
      },

      getPreviewIntervalsForCurrent: () => {
        const s = get();
        const cardId = s.studySession.queue[s.studySession.currentIndex];
        const card = s.cards.find((c) => c.id === cardId);
        if (!card) return null;
        const settings = getEffectiveSettings(s.globalSettings, s.decks.find((d) => d.id === s.studySession.deckId)?.settings ?? {});
        return getPreviewIntervals(card, settings);
      },

      getCurrentCard: () => {
        const s = get();
        const cardId = s.studySession.queue[s.studySession.currentIndex];
        return s.cards.find((c) => c.id === cardId) ?? null;
      },

      clearHistory: () => set({ history: [], dailyProgress: {} }),
    }),
    {
      name: 'srs-master-storage-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        decks: state.decks,
        cards: state.cards,
        globalSettings: state.globalSettings,
        history: state.history,
        dailyProgress: state.dailyProgress,
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        if (!state.decks?.length || !state.decks.find((d) => d.id === 'default')) {
          state.decks = [DEFAULT_DECK, ...(state.decks ?? [])];
        }
        state.studySession = { ...EMPTY_SESSION };
        if (state.theme) applyTheme(state.theme);
      },
    }
  )
);
