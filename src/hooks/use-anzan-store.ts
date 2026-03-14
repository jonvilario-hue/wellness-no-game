
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AnzanSettings {
  digits: number;
  count: number;
  speed: number; // seconds per number
}

export interface AnzanRecord {
  id: string;
  date: string;
  digits: number;
  count: number;
  speed: number;
  success: boolean;
}

interface AnzanState {
  settings: AnzanSettings;
  history: AnzanRecord[];
  personalBests: {
    maxDigits: number;
    minSpeed: number;
  };
  
  updateSettings: (updates: Partial<AnzanSettings>) => void;
  addSession: (record: Omit<AnzanRecord, 'id' | 'date'>) => void;
  clearHistory: () => void;
}

export const useAnzanStore = create<AnzanState>()(
  persist(
    (set) => ({
      settings: {
        digits: 1,
        count: 5,
        speed: 1.0,
      },
      history: [],
      personalBests: {
        maxDigits: 1,
        minSpeed: 2.0,
      },

      updateSettings: (updates) => set((state) => ({
        settings: { ...state.settings, ...updates }
      })),

      addSession: (record) => set((state) => {
        const newRecord = {
          ...record,
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
        };
        
        const newPBs = { ...state.personalBests };
        if (record.success) {
          if (record.digits > state.personalBests.maxDigits) newPBs.maxDigits = record.digits;
          if (record.speed < state.personalBests.minSpeed) newPBs.minSpeed = record.speed;
        }

        return {
          history: [newRecord, ...state.history].slice(0, 50),
          personalBests: newPBs
        };
      }),

      clearHistory: () => set({ history: [], personalBests: { maxDigits: 1, minSpeed: 2.0 } }),
    }),
    {
      name: 'anzan-trainer-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
