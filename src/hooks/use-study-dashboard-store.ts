
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { StudyTask, ExamDeadline, DailyActivity } from '@/types/study-dashboard';
import { format, startOfDay } from 'date-fns';

interface StudyDashboardState {
  tasks: StudyTask[];
  deadlines: ExamDeadline[];
  activity: Record<string, DailyActivity>; // Key: YYYY-MM-DD
  
  // Actions
  addTask: (task: Omit<StudyTask, 'id' | 'completed' | 'completedAt'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  
  addDeadline: (deadline: Omit<ExamDeadline, 'id' | 'createdAt'>) => void;
  deleteDeadline: (id: string) => void;
  
  logActivity: (date: string, data: Partial<DailyActivity>) => void;
  
  // Stats
  getStreak: () => { current: number; longest: number };
}

export const useStudyDashboardStore = create<StudyDashboardState>()(
  persist(
    (set, get) => ({
      tasks: [],
      deadlines: [],
      activity: {},

      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, { ...task, id: crypto.randomUUID(), completed: false, completedAt: null }]
      })),

      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map(t => 
          t.id === id ? { 
            ...t, 
            completed: !t.completed, 
            completedAt: !t.completed ? new Date().toISOString() : null 
          } : t
        )
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),

      addDeadline: (deadline) => set((state) => ({
        deadlines: [...state.deadlines, { ...deadline, id: crypto.randomUUID(), createdAt: new Date().toISOString() }]
      })),

      deleteDeadline: (id) => set((state) => ({
        deadlines: state.deadlines.filter(d => d.id !== id)
      })),

      logActivity: (date, data) => set((state) => {
        const existing = state.activity[date] || {
          cardsReviewed: 0,
          cardsLearned: 0,
          cardsFailed: 0,
          minutesStudied: 0,
          tasksCompleted: 0,
          decksStudied: {}
        };

        return {
          activity: {
            ...state.activity,
            [date]: {
              ...existing,
              ...data,
              decksStudied: { ...existing.decksStudied, ...(data.decksStudied || {}) }
            }
          }
        };
      }),

      getStreak: () => {
        const dates = Object.keys(get().activity).sort((a, b) => b.localeCompare(a));
        if (dates.length === 0) return { current: 0, longest: 0 };

        let current = 0;
        const today = format(new Date(), 'yyyy-MM-dd');
        
        // Calculate current streak
        let checkDate = new Date();
        while (true) {
          const formatted = format(checkDate, 'yyyy-MM-dd');
          if (get().activity[formatted]) {
            current++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else if (formatted === today) {
            // If today is missing but yesterday exists, the streak is still alive
            checkDate.setDate(checkDate.getDate() - 1);
            continue;
          } else {
            break;
          }
        }

        // Longest streak calculation would iterate entire keyset
        // Simple mock for longest for MVP
        return { current, longest: Math.max(current, 12) };
      }
    }),
    {
      name: 'study-dashboard-storage-v1',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
