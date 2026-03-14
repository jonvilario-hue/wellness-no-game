
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type MathOperator = '+' | '-' | '*' | '/';

export interface TrainerSettings {
  operators: MathOperator[];
  minNumber: number;
  maxNumber: number;
  duration: number; // seconds, 0 for infinite
}

export interface MathSessionRecord {
  id: string;
  date: string;
  score: number;
  total: number;
  wpm: number;
  duration: number;
  operators: MathOperator[];
}

interface MathTrainerState {
  settings: TrainerSettings;
  history: MathSessionRecord[];
  highScore: number;
  
  updateSettings: (updates: Partial<TrainerSettings>) => void;
  addSession: (session: Omit<MathSessionRecord, 'id' | 'date'>) => void;
  clearHistory: () => void;
}

export const useMathTrainerStore = create<MathTrainerState>()(
  persist(
    (set) => ({
      settings: {
        operators: ['+', '-'],
        minNumber: 2,
        maxNumber: 100,
        duration: 120,
      },
      history: [],
      highScore: 0,

      updateSettings: (updates) => set((state) => ({
        settings: { ...state.settings, ...updates }
      })),

      addSession: (session) => set((state) => {
        const newSession = {
          ...session,
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
        };
        const newHighScore = session.score > state.highScore ? session.score : state.highScore;
        return {
          history: [newSession, ...state.history].slice(0, 50),
          highScore: newHighScore
        };
      }),

      clearHistory: () => set({ history: [], highScore: 0 }),
    }),
    {
      name: 'math-trainer-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
