
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type LunarienDifficulty = 'Apprentice' | 'Practitioner' | 'Master' | 'God';

export interface LunarienSettings {
  difficulty: LunarienDifficulty;
  duration: number;
  includeSquares: boolean;
  includePercentages: boolean;
}

export interface LunarienSession {
  id: string;
  date: string;
  score: number;
  accuracy: number;
  ppm: number;
  difficulty: LunarienDifficulty;
}

interface LunarienState {
  settings: LunarienSettings;
  history: LunarienSession[];
  stats: {
    totalSolved: number;
    highestPPM: number;
    currentLevel: number;
  };
  
  updateSettings: (updates: Partial<LunarienSettings>) => void;
  addSession: (session: Omit<LunarienSession, 'id' | 'date'>) => void;
  clearHistory: () => void;
}

export const useLunarienStore = create<LunarienState>()(
  persist(
    (set) => ({
      settings: {
        difficulty: 'Practitioner',
        duration: 60,
        includeSquares: false,
        includePercentages: false,
      },
      history: [],
      stats: {
        totalSolved: 0,
        highestPPM: 0,
        currentLevel: 1,
      },

      updateSettings: (updates) => set((state) => ({
        settings: { ...state.settings, ...updates }
      })),

      addSession: (session) => set((state) => {
        const newSession = {
          ...session,
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
        };
        
        return {
          history: [newSession, ...state.history].slice(0, 50),
          stats: {
            totalSolved: state.stats.totalSolved + session.score,
            highestPPM: Math.max(state.stats.highestPPM, session.ppm),
            currentLevel: Math.floor((state.stats.totalSolved + session.score) / 50) + 1
          }
        };
      }),

      clearHistory: () => set({ 
        history: [], 
        stats: { totalSolved: 0, highestPPM: 0, currentLevel: 1 } 
      }),
    }),
    {
      name: 'lunarien-math-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
