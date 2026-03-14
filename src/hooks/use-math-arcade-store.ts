
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type MathOperator = '+' | '-' | '*' | '/';

export interface ArcadeSession {
  id: string;
  date: string;
  score: number;
  xpGained: number;
  maxCombo: number;
  accuracy: number;
  operators: MathOperator[];
}

interface MathArcadeState {
  totalXP: number;
  level: number;
  highScores: Record<string, number>; // key is sorted operators joined by comma
  history: ArcadeSession[];
  
  // Actions
  addXP: (amount: number) => void;
  saveSession: (session: Omit<ArcadeSession, 'id' | 'date'>) => void;
  updateHighScore: (operators: MathOperator[], score: number) => void;
  resetProgress: () => void;
}

export const useMathArcadeStore = create<MathArcadeState>()(
  persist(
    (set, get) => ({
      totalXP: 0,
      level: 1,
      highScores: {},
      history: [],

      addXP: (amount) => set((state) => {
        const newXP = state.totalXP + amount;
        const newLevel = Math.floor(Math.sqrt(newXP / 100)) + 1;
        return { totalXP: newXP, level: newLevel };
      }),

      saveSession: (sessionData) => set((state) => {
        const newSession = {
          ...sessionData,
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
        };
        
        // Update high score for this configuration
        const opKey = [...sessionData.operators].sort().join(',');
        const currentHigh = state.highScores[opKey] || 0;
        const newHighScores = { ...state.highScores };
        if (sessionData.score > currentHigh) {
          newHighScores[opKey] = sessionData.score;
        }

        return {
          history: [newSession, ...state.history].slice(0, 50),
          highScores: newHighScores
        };
      }),

      updateHighScore: (operators, score) => set((state) => {
        const opKey = [...operators].sort().join(',');
        const currentHigh = state.highScores[opKey] || 0;
        if (score > currentHigh) {
          return { highScores: { ...state.highScores, [opKey]: score } };
        }
        return state;
      }),

      resetProgress: () => set({ totalXP: 0, level: 1, highScores: {}, history: [] }),
    }),
    {
      name: 'math-arcade-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
