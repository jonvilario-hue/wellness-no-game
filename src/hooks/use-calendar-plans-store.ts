
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CalendarPlan, CalendarActivityInstance, ActivityStatus } from '@/types/calendar-plans';
import { presetPlans } from '@/data/preset-calendar-plans';
import { format, isSameDay } from 'date-fns';

interface CalendarPlansState {
  activePlanIds: string[];
  customPlans: CalendarPlan[];
  activityInstances: Record<string, CalendarActivityInstance[]>; // key: YYYY-MM-DD
  
  togglePlan: (planId: string) => void;
  addCustomPlan: (plan: CalendarPlan) => void;
  updateActivityStatus: (date: string, instanceId: string, status: ActivityStatus) => void;
  syncFromTracker: (category: string, activityName?: string) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useCalendarPlansStore = create<CalendarPlansState>()(
  persist(
    (set, get) => ({
      activePlanIds: [],
      customPlans: [],
      activityInstances: {},
      _hasHydrated: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      togglePlan: (planId) => {
        const { activePlanIds } = get();
        const isActive = activePlanIds.includes(planId);
        
        if (isActive) {
          set({ activePlanIds: activePlanIds.filter(id => id !== planId) });
        } else {
          set({ activePlanIds: [...activePlanIds, planId] });
        }
      },

      addCustomPlan: (plan) => {
        set((state) => ({
          customPlans: [...state.customPlans, plan],
          activePlanIds: [...state.activePlanIds, plan.id]
        }));
      },

      updateActivityStatus: (date, instanceId, status) => {
        set((state) => {
          const dayInstances = state.activityInstances[date] || [];
          const updatedInstances = dayInstances.map(inst => 
            inst.id === instanceId ? { ...inst, status, completedAt: status === 'completed' ? new Date().toISOString() : undefined } : inst
          );
          
          return {
            activityInstances: {
              ...state.activityInstances,
              [date]: updatedInstances
            }
          };
        });
      },

      syncFromTracker: (category, activityName) => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const { activePlanIds, activityInstances } = get();
        const dayInstances = activityInstances[today] || [];
        
        // Find matching incomplete activity for today
        const match = dayInstances.find(inst => {
          if (inst.status === 'completed') return false;
          // In a real app, we'd lookup the activity definition via planId/activityId
          // For MVP, we'll assume a match based on category for now
          return true; // Simple logic for MVP sync
        });

        if (match) {
          get().updateActivityStatus(today, match.id, 'completed');
        }
      },
    }),
    {
      name: 'calendar-plans-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);
