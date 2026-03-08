
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ReadingLog, SpeedReadingAchievement, ReadingTier, DrillType } from '@/types/speedreading';
import { isToday, subDays, format, parseISO } from 'date-fns';

interface SpeedReadingState {
  logs: ReadingLog[];
  achievements: Record<ReadingTier, SpeedReadingAchievement>;
  targetWpm: number;
  
  addLog: (log: Omit<ReadingLog, 'id' | 'timestamp' | 'date'>) => void;
  setTargetWpm: (wpm: number) => void;
  getStreak: () => number;
}

const initialAchievement = (): SpeedReadingAchievement => ({
  highestWPM: 0,
  highestERR: 0,
  bestCompAtHighSpeed: 0,
  streak: 0,
  lastDrillDate: null,
});

export const useSpeedReadingStore = create<SpeedReadingState>()(
  persist(
    (set, get) => ({
      logs: [],
      achievements: {
        'Casual': initialAchievement(),
        'Technical': initialAchievement(),
        'Dense Data': initialAchievement(),
      },
      targetWpm: 300,

      setTargetWpm: (targetWpm) => set({ targetWpm }),

      addLog: (logData) => set(state => {
        const id = crypto.randomUUID();
        const now = new Date();
        const date = format(now, 'yyyy-MM-dd');
        const timestamp = now.toISOString();
        
        const newLog: ReadingLog = { ...logData, id, date, timestamp };
        const tier = logData.tier;
        const currentAchieve = state.achievements[tier];

        // Update Achievements
        const updatedAchieve = { ...currentAchieve };
        if (newLog.wpm > currentAchieve.highestWPM) updatedAchieve.highestWPM = newLog.wpm;
        if (newLog.err > currentAchieve.highestERR) updatedAchieve.highestERR = newLog.err;
        if (newLog.wpm >= 400 && newLog.comprehensionScore > currentAchieve.bestCompAtHighSpeed) {
          updatedAchieve.bestCompAtHighSpeed = newLog.comprehensionScore;
        }

        // Update Streak Logic
        const lastDate = currentAchieve.lastDrillDate ? parseISO(currentAchieve.lastDrillDate) : null;
        if (!lastDate || !isToday(lastDate)) {
          if (lastDate && isToday(addDays(lastDate, 1))) {
            updatedAchieve.streak += 1;
          } else {
            updatedAchieve.streak = 1;
          }
        }
        updatedAchieve.lastDrillDate = timestamp;

        return {
          logs: [newLog, ...state.logs],
          achievements: {
            ...state.achievements,
            [tier]: updatedAchieve
          }
        };
      }),

      getStreak: () => {
        const logs = get().logs;
        if (logs.length === 0) return 0;
        
        const dates = new Set(logs.map(l => l.date));
        let streak = 0;
        let checkDate = new Date();
        
        while (dates.has(format(checkDate, 'yyyy-MM-dd'))) {
          streak++;
          checkDate = subDays(checkDate, 1);
        }
        
        return streak;
      }
    }),
    {
      name: 'speedreading-storage-v1',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
