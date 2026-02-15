
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type SleepPhase = 'Wake' | 'REM' | 'Light' | 'Deep';

export type NightlyLog = {
  id: string;
  date: string;
  score: number;
  totalDuration: number; // minutes
  phases: {
    wake: number; // minutes
    rem: number;
    light: number;
    deep: number;
  };
  efficiency: number;
  latency: number; // minutes to fall asleep
  notes?: string;
};

export type Chronotype = 'Lark' | 'Owl' | 'Dolphin' | 'Bear' | null;

interface SleepProState {
  logs: NightlyLog[];
  goals: {
    bedtime: string; // HH:mm
    waketime: string;
    duration: number; // goal in minutes
  };
  settings: {
    smartAlarm: boolean;
    noiseType: 'none' | 'white' | 'pink' | 'brown' | 'rain' | 'waves';
    dimmerEnabled: boolean;
    dreamJournalReminder: boolean;
  };
  chronotype: Chronotype;
  
  // Actions
  addLog: (log: NightlyLog) => void;
  updateGoals: (goals: Partial<SleepProState['goals']>) => void;
  updateSettings: (settings: Partial<SleepProState['settings']>) => void;
  setChronotype: (type: Chronotype) => void;
  generateSimulatedNight: () => NightlyLog;
}

const defaultGoals = {
  bedtime: '23:00',
  waketime: '07:00',
  duration: 480, // 8 hours
};

const defaultSettings = {
  smartAlarm: true,
  noiseType: 'none' as const,
  dimmerEnabled: true,
  dreamJournalReminder: true,
};

export const useSleepProStore = create<SleepProState>()(
  persist(
    (set, get) => ({
      logs: [],
      goals: defaultGoals,
      settings: defaultSettings,
      chronotype: null,

      addLog: (log) => set((state) => ({ logs: [log, ...state.logs].slice(0, 30) })),
      
      updateGoals: (newGoals) => set((state) => ({ goals: { ...state.goals, ...newGoals } })),
      
      updateSettings: (newSettings) => set((state) => ({ settings: { ...state.settings, ...newSettings } })),
      
      setChronotype: (type) => set({ chronotype: type }),

      generateSimulatedNight: () => {
        const total = 420 + Math.floor(Math.random() * 120); // 7-9 hours
        const deep = Math.floor(total * (0.15 + Math.random() * 0.1));
        const rem = Math.floor(total * (0.2 + Math.random() * 0.1));
        const wake = Math.floor(Math.random() * 30);
        const light = total - deep - rem - wake;
        
        const score = Math.min(100, Math.round((total / 480) * 70 + (deep / 90) * 15 + (rem / 120) * 15 - (wake / 10)));

        const log: NightlyLog = {
          id: crypto.randomUUID(),
          date: new Date().toISOString().split('T')[0],
          score,
          totalDuration: total,
          phases: { wake, rem, light, deep },
          efficiency: Math.round(((total - wake) / total) * 100),
          latency: 10 + Math.floor(Math.random() * 20),
        };
        
        get().addLog(log);
        return log;
      },
    }),
    {
      name: 'sleep-pro-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
