
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { DrawingLog, DrawingDiscipline, DrawingAchievement } from '@/types/drawing';
import { format, subDays, isAfter, parseISO, startOfWeek, isToday } from 'date-fns';

interface DrawingState {
  logs: DrawingLog[];
  achievements: Record<string, DrawingAchievement>;
  streak: {
    current: number;
    longest: number;
    lastDate: string | null;
  };
  planProgress: Record<string, Record<number, boolean>>; // planId -> { day -> completed }
  
  addLog: (logData: Omit<DrawingLog, 'id' | 'timestamp' | 'date'>) => void;
  markPlanDayComplete: (planId: string, day: number) => void;
  
  getWeeklyVolume: () => number;
  getTopDiscipline: () => DrawingDiscipline | 'None';
  getDisciplineBalance: () => { name: string; value: number }[];
  _hasHydrated: boolean;
}

export const useDrawingStore = create<DrawingState>()(
  persist(
    (set, get) => ({
      logs: [],
      achievements: {},
      streak: { current: 0, longest: 0, lastDate: null },
      planProgress: {},
      _hasHydrated: false,

      addLog: (logData) => {
        const now = new Date();
        const timestamp = now.toISOString();
        const dateStr = format(now, 'yyyy-MM-dd');
        
        const newLog: DrawingLog = {
          ...logData,
          id: crypto.randomUUID(),
          timestamp,
          date: dateStr
        };

        set(state => {
          // Update Streak
          let newStreak = state.streak.current;
          const lastDate = state.streak.lastDate;
          
          if (!lastDate || !isToday(parseISO(lastDate))) {
            if (lastDate && isToday(subDays(now, 1))) {
              newStreak += 1;
            } else {
              newStreak = 1;
            }
          }

          // Update Achievements
          const current = state.achievements[logData.discipline] || { 
            discipline: logData.discipline, totalMinutes: 0, sessions: 0, bestSatisfaction: 0 
          };
          
          const newAchievements = {
            ...state.achievements,
            [logData.discipline]: {
              ...current,
              totalMinutes: current.totalMinutes + logData.durationMinutes,
              sessions: current.sessions + 1,
              bestSatisfaction: Math.max(current.bestSatisfaction, logData.satisfactionRating)
            }
          };

          return {
            logs: [newLog, ...state.logs].slice(0, 200),
            streak: {
              current: newStreak,
              longest: Math.max(newStreak, state.streak.longest),
              lastDate: timestamp
            },
            achievements: newAchievements
          };
        });
      },

      markPlanDayComplete: (planId, day) => set(state => {
        const current = state.planProgress[planId] || {};
        return {
          planProgress: {
            ...state.planProgress,
            [planId]: { ...current, [day]: true }
          }
        };
      }),

      getWeeklyVolume: () => {
        const start = startOfWeek(new Date());
        return get().logs
          .filter(l => isAfter(parseISO(l.timestamp), start))
          .reduce((sum, l) => sum + l.durationMinutes, 0);
      },

      getTopDiscipline: () => {
        const counts: Record<string, number> = {};
        get().logs.forEach(l => {
          counts[l.discipline] = (counts[l.discipline] || 0) + 1;
        });
        return (Object.entries(counts).sort((a,b) => b[1] - a[1])[0]?.[0] as DrawingDiscipline) || 'None';
      },

      getDisciplineBalance: () => {
        const disciplines: DrawingDiscipline[] = [
          'Line Control', 'Gesture & Movement', 'Contour & Observation', 'Proportion & Measurement',
          'Perspective & Space', 'Value & Light', 'Form & Construction', 'Composition & Thumbnails'
        ];
        
        const totals: Record<string, number> = {};
        get().logs.slice(0, 50).forEach(l => {
          totals[l.discipline] = (totals[l.discipline] || 0) + l.durationMinutes;
        });

        return disciplines.map(d => ({
          name: d.split(' ')[0], // Compact name
          value: totals[d] || 0
        }));
      }
    }),
    {
      name: 'drawing-studio-storage-v1',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state._hasHydrated = true;
      }
    }
  )
);
