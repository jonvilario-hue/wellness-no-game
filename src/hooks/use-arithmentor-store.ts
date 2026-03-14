'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { format, isSameDay, parseISO } from 'date-fns';

export type ArithmentorDifficulty = 'Apprentice' | 'Sage' | 'Architect' | 'Titan';
export type ArithmentorMode = 'Zen' | 'Sprint';

export interface ArithmentorSettings {
  difficulty: ArithmentorDifficulty;
  mode: ArithmentorMode;
  dailyGoal: number;
}

export interface ArithmentorSession {
  id: string;
  date: string;
  solved: number;
  accuracy: number;
  avgTimePerProblem: number; // in seconds
  difficulty: ArithmentorDifficulty;
}

interface ArithmentorState {
  settings: ArithmentorSettings;
  history: ArithmentorSession[];
  stats: {
    totalSolved: number;
    bestPace: number; // Lowest seconds per problem
    solvedToday: number;
    lastActiveDate: string | null;
  };
  
  updateSettings: (updates: Partial<ArithmentorSettings>) => void;
  addSession: (session: Omit<ArithmentorSession, 'id' | 'date'>) => void;
  resetProgress: () => void;
}

export const useArithmentorStore = create<ArithmentorState>()(
  persist(
    (set, get) => ({
      settings: {
        difficulty: 'Sage',
        mode: 'Zen',
        dailyGoal: 50,
      },
      history: [],
      stats: {
        totalSolved: 0,
        bestPace: 0,
        solvedToday: 0,
        lastActiveDate: null,
      },

      updateSettings: (updates) => set((state) => ({
        settings: { ...state.settings, ...updates }
      })),

      addSession: (session) => set((state) => {
        const now = new Date();
        const todayStr = format(now, 'yyyy-MM-dd');
        const isNewDay = state.stats.lastActiveDate !== todayStr;
        
        const newSession = {
          ...session,
          id: crypto.randomUUID(),
          date: now.toISOString(),
        };
        
        const newSolvedToday = isNewDay ? session.solved : state.stats.solvedToday + session.solved;
        const newBestPace = state.stats.bestPace === 0 
          ? session.avgTimePerProblem 
          : Math.min(state.stats.bestPace, session.avgTimePerProblem);

        return {
          history: [newSession, ...state.history].slice(0, 50),
          stats: {
            totalSolved: state.stats.totalSolved + session.solved,
            bestPace: newBestPace,
            solvedToday: newSolvedToday,
            lastActiveDate: todayStr
          }
        };
      }),

      resetProgress: () => set({ 
        history: [], 
        stats: { totalSolved: 0, bestPace: 0, solvedToday: 0, lastActiveDate: null } 
      }),
    }),
    {
      name: 'arithmentor-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
