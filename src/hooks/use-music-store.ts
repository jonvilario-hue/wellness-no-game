
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { 
  MusicDrillLog, MusicAchievement, 
  MusicDomain 
} from '@/types/music';
import { format, subDays, isAfter, parseISO, startOfWeek, isToday } from 'date-fns';
import { initDB } from '@/lib/storage/db';

interface MusicState {
  logs: MusicDrillLog[];
  achievements: Record<string, MusicAchievement>;
  streak: {
    current: number;
    longest: number;
    lastDate: string | null;
  };
  
  logDrill: (drillData: Omit<MusicDrillLog, 'id' | 'userId' | 'timestamp' | 'syncedToCalendar'>) => Promise<void>;
  getWeeklyVolume: () => number;
  getTopDomain: () => MusicDomain | 'None';
  getGlobalHAR: () => number;
  _hasHydrated: boolean;
}

export const useMusicStore = create<MusicState>()(
  persist(
    (set, get) => ({
      logs: [],
      achievements: {},
      streak: { current: 0, longest: 0, lastDate: null },
      _hasHydrated: false,

      logDrill: async (drillData) => {
        const now = new Date();
        const timestamp = now.toISOString();
        const dateStr = format(now, 'yyyy-MM-dd');
        
        const newLog: MusicDrillLog = {
          ...drillData,
          id: crypto.randomUUID(),
          userId: 'local-user',
          timestamp,
          syncedToCalendar: false
        };

        // 1. Persist to IndexedDB
        const db = await initDB();
        await db.put('music-drill-logs', newLog);

        set(state => {
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

          // 3. Update Achievements
          const currentBest = state.achievements[drillData.domain]?.bestHAR || 0;
          const newAchievements = { ...state.achievements };
          if (drillData.har > currentBest) {
            newAchievements[drillData.domain] = { bestHAR: drillData.har, date: dateStr };
          }

          return {
            logs: [newLog, ...state.logs].slice(0, 100),
            streak: {
              current: newStreak,
              longest: Math.max(newStreak, state.streak.longest),
              lastDate: timestamp
            },
            achievements: newAchievements
          };
        });
      },

      getWeeklyVolume: () => {
        const start = startOfWeek(new Date());
        return get().logs
          .filter(l => isAfter(parseISO(l.timestamp), start))
          .reduce((sum, l) => sum + l.durationMinutes, 0);
      },

      getTopDomain: () => {
        const counts: Record<string, number> = {};
        get().logs.forEach(l => {
          counts[l.domain] = (counts[l.domain] || 0) + 1;
        });
        return (Object.entries(counts).sort((a,b) => b[1] - a[1])[0]?.[0] as MusicDomain) || 'None';
      },

      getGlobalHAR: () => {
        const recentLogs = get().logs.slice(0, 20);
        if (recentLogs.length === 0) return 0;
        const sum = recentLogs.reduce((acc, l) => acc + l.har, 0);
        return Math.round(sum / recentLogs.length);
      }
    }),
    {
      name: 'music-lab-storage-local-v1',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state._hasHydrated = true;
      }
    }
  )
);
