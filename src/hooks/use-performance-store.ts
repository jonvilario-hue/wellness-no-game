
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CHCDomain } from '@/types';

type TrainingMode = 'neutral' | 'math' | 'music';

type PerformanceMetric = {
  score: number;
  totalTime: number; // in seconds
  sessions: number;
  trend: number; // calculated on the fly
};

type DomainPerformance = {
  neutral: PerformanceMetric;
  math: PerformanceMetric;
  music: PerformanceMetric;
};

type PerformanceState = {
  performance: Record<CHCDomain, DomainPerformance>;
  logGameResult: (domain: CHCDomain, mode: TrainingMode, result: { score: number; time: number }) => void;
  getPerformanceData: () => any; // Simplified for now
};

const initialMetric = (): PerformanceMetric => ({
  score: 0,
  totalTime: 0,
  sessions: 0,
  trend: 0,
});

const initialDomainPerformance = (): DomainPerformance => ({
  neutral: initialMetric(),
  math: initialMetric(),
  music: initialMetric(),
});

const initialPerformanceState = (): Record<CHCDomain, DomainPerformance> => ({
  Gf: initialDomainPerformance(),
  Gc: initialDomainPerformance(),
  Gwm: initialDomainPerformance(),
  Gs: initialDomainPerformance(),
  Gv: initialDomainPerformance(),
  Ga: initialDomainPerformance(),
  Glr: initialDomainPerformance(),
  EF: initialDomainPerformance(),
});


export const usePerformanceStore = create<PerformanceState>()(
  persist(
    (set, get) => ({
      performance: initialPerformanceState(),
      
      logGameResult: (domain, mode, result) => {
        set((state) => {
          const newPerformance = { ...state.performance };
          const domainData = newPerformance[domain];
          const modeData = domainData[mode];
          
          const oldSessions = modeData.sessions;
          const newSessions = oldSessions + 1;
          const oldTotalScore = modeData.score * oldSessions;
          
          const newAverageScore = (oldTotalScore + result.score) / newSessions;
          const newTotalTime = modeData.totalTime + result.time;

          const newModeData: PerformanceMetric = {
            sessions: newSessions,
            score: Math.round(newAverageScore),
            totalTime: newTotalTime,
            trend: Math.round(((newAverageScore - modeData.score) / (modeData.score || 50)) * 100), // Basic trend
          };

          newPerformance[domain] = {
            ...domainData,
            [mode]: newModeData,
          };
          
          return { performance: newPerformance };
        });
      },

      // This function is designed to be server-safe BUT must be called from a client component
      // to access the actual persisted state from localStorage.
      getPerformanceData: () => {
         if (typeof window === 'undefined') {
            console.warn("getPerformanceData called on the server. Returning empty data. This should be handled gracefully.");
            return []; // Or some default structure
        }
        const state = get();
        // This transformation is needed for the AI flows which expect a flat array.
        // For now, we will just return the 'neutral' scores for simplicity.
        return Object.entries(state.performance).map(([domain, data]) => ({
            domain: domain as CHCDomain,
            score: data.neutral.score,
            trend: data.neutral.trend,
            sessions: data.neutral.sessions,
        }));
      },
    }),
    {
      name: 'cognitive-performance-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
