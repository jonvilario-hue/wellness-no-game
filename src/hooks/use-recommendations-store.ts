
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Recommendation, RecommendationType } from '@/types/recommendations';

interface RecommendationsState {
  history: Array<{
    id: string;
    type: RecommendationType;
    shownAt: string;
    dismissed: boolean;
    acted: boolean;
    actedAt?: string;
  }>;
  preferences: {
    enabledCategories: RecommendationType[];
    maxPerDay: number;
  };
  
  // Actions
  logShown: (rec: Recommendation) => void;
  dismiss: (id: string) => void;
  markActed: (id: string) => void;
  updatePreferences: (updates: Partial<RecommendationsState['preferences']>) => void;
  isDismissed: (id: string) => boolean;
}

const DEFAULT_CATEGORIES: RecommendationType[] = [
  'recovery', 'momentum_booster', 'streak_saver', 'milestone_nudge', 'celebration', 'planning'
];

export const useRecommendationsStore = create<RecommendationsState>()(
  persist(
    (set, get) => ({
      history: [],
      preferences: {
        enabledCategories: DEFAULT_CATEGORIES,
        maxPerDay: 3,
      },

      logShown: (rec) => set((state) => {
        if (state.history.some(h => h.id === rec.id)) return state;
        return {
          history: [...state.history, {
            id: rec.id,
            type: rec.type,
            shownAt: new Date().toISOString(),
            dismissed: false,
            acted: false
          }].slice(-50) // Keep last 50
        };
      }),

      dismiss: (id) => set((state) => ({
        history: state.history.map(h => h.id === id ? { ...h, dismissed: true } : h)
      })),

      markActed: (id) => set((state) => ({
        history: state.history.map(h => h.id === id ? { ...h, acted: true, actedAt: new Date().toISOString() } : h)
      })),

      isDismissed: (id) => {
        return get().history.find(h => h.id === id)?.dismissed || false;
      },

      updatePreferences: (updates) => set((state) => ({
        preferences: { ...state.preferences, ...updates }
      })),
    }),
    {
      name: 'recommendation-history-v1',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
