
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CodingDrillLog, CodingLanguage, LanguageProgress, CodingDrillType } from '@/types/coding';
import { format, subDays, isToday, parseISO, startOfWeek, isAfter } from 'date-fns';

interface CodingState {
  logs: CodingDrillLog[];
  languageProgress: Record<string, LanguageProgress>; // key: language
  activeLanguage: CodingLanguage;
  streak: {
    current: number;
    longest: number;
    lastDate: string | null;
  };
  
  setActiveLanguage: (lang: CodingLanguage) => void;
  addLog: (log: Omit<CodingDrillLog, 'id' | 'timestamp' | 'date'>) => void;
  getFluencyScore: () => number;
  getWeeklyVolume: () => number;
  getLanguageDistribution: () => Record<CodingLanguage, number>;
  getTopProtocol: () => CodingDrillType | 'None';
  _hasHydrated: boolean;
}

const DEFAULT_PROGRESS = (lang: CodingLanguage): LanguageProgress => ({
  language: lang,
  level: 1,
  consecutiveSuccesses: 0,
  consecutiveFailures: 0,
  avgAccuracy: 0,
  avgSpeed: 0
});

export const useCodingStore = create<CodingState>()(
  persist(
    (set, get) => ({
      logs: [],
      languageProgress: {},
      activeLanguage: 'TypeScript',
      streak: { current: 0, longest: 0, lastDate: null },
      _hasHydrated: false,

      setActiveLanguage: (activeLanguage) => set({ activeLanguage }),

      addLog: (logData) => {
        const now = new Date();
        const dateStr = format(now, 'yyyy-MM-dd');
        const timestamp = now.toISOString();
        
        const newLog: CodingDrillLog = {
          ...logData,
          id: crypto.randomUUID(),
          timestamp,
          date: dateStr
        };

        set(state => {
          // 1. Update Logs
          const newLogs = [newLog, ...state.logs].slice(0, 500);

          // 2. Update Streak
          let newStreak = state.streak.current;
          const lastDate = state.streak.lastDate;
          if (!lastDate || !isToday(parseISO(lastDate))) {
            if (lastDate && isToday(subDays(now, 1))) {
              newStreak += 1;
            } else {
              newStreak = 1;
            }
          }

          // 3. Adaptive Difficulty Engine
          const lang = logData.language;
          const progress = state.languageProgress[lang] || DEFAULT_PROGRESS(lang);
          let { level, consecutiveSuccesses, consecutiveFailures } = progress;

          if (logData.accuracy >= 85) {
            consecutiveSuccesses++;
            consecutiveFailures = 0;
            if (consecutiveSuccesses >= 3 && level < 4) {
              level++;
              consecutiveSuccesses = 0;
            }
          } else if (logData.accuracy < 60) {
            consecutiveFailures++;
            consecutiveSuccesses = 0;
            if (consecutiveFailures >= 2 && level > 1) {
              level--;
              consecutiveFailures = 0;
            }
          }

          const newLangProgress = {
            ...progress,
            level,
            consecutiveSuccesses,
            consecutiveFailures,
            avgAccuracy: (progress.avgAccuracy * 4 + logData.accuracy) / 5,
            avgSpeed: (progress.avgSpeed * 4 + logData.speedMetric) / 5
          };

          return {
            logs: newLogs,
            streak: {
              current: newStreak,
              longest: Math.max(newStreak, state.streak.longest),
              lastDate: timestamp
            },
            languageProgress: {
              ...state.languageProgress,
              [lang]: newLangProgress
            }
          };
        });
      },

      getFluencyScore: () => {
        const recentLogs = get().logs.slice(0, 20);
        if (recentLogs.length === 0) return 0;
        // Fluency = Avg Accuracy * Normalized Speed Metric
        const avgAcc = recentLogs.reduce((s, l) => s + l.accuracy, 0) / recentLogs.length;
        return Math.round(avgAcc); // Simplified for MVP
      },

      getWeeklyVolume: () => {
        const start = startOfWeek(new Date());
        return get().logs
          .filter(l => isAfter(parseISO(l.timestamp), start))
          .reduce((sum, l) => sum + Math.ceil(l.durationSeconds / 60), 0);
      },

      getLanguageDistribution: () => {
        const start = startOfWeek(new Date());
        const weekLogs = get().logs.filter(l => isAfter(parseISO(l.timestamp), start));
        const dist: Record<string, number> = {};
        weekLogs.forEach(l => {
          dist[l.language] = (dist[l.language] || 0) + 1;
        });
        return dist as any;
      },

      getTopProtocol: () => {
        const recentLogs = get().logs.slice(0, 50);
        if (recentLogs.length === 0) return 'None';
        const counts: Record<string, number> = {};
        recentLogs.forEach(l => {
          counts[l.type] = (counts[l.type] || 0) + 1;
        });
        return (Object.entries(counts).sort((a,b) => b[1] - a[1])[0][0] as any);
      }
    }),
    {
      name: 'coding-fluency-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state._hasHydrated = true;
      }
    }
  )
);
