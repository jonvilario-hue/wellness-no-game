'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CalendarPlan, CalendarActivityInstance, ActivityStatus, PlanCategory } from '@/types/calendar-plans';
import { presetPlans } from '@/data/preset-calendar-plans';
import { format } from 'date-fns';

interface CalendarPlansState {
  activePlanIds: string[];
  customPlans: CalendarPlan[];
  deletedPresetIds: string[]; // Track which preset plans the user has "deleted"
  activityInstances: Record<string, CalendarActivityInstance[]>; // key: YYYY-MM-DD
  
  togglePlan: (planId: string) => void;
  deletePlan: (planId: string) => void;
  resetDefaults: () => void;
  addCustomPlan: (plan: CalendarPlan) => void;
  updateActivityStatus: (date: string, instanceId: string, status: ActivityStatus, source?: string) => void;
  syncFromTracker: (category: PlanCategory, activityName: string) => { matched: boolean; instanceId?: string };
  addAdHocActivity: (date: string, activity: Partial<CalendarActivityInstance>) => void;
  
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useCalendarPlansStore = create<CalendarPlansState>()(
  persist(
    (set, get) => ({
      activePlanIds: [],
      customPlans: [],
      deletedPresetIds: [],
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

      deletePlan: (planId) => {
        set((state) => {
          const isPreset = presetPlans.some(p => p.id === planId);
          return {
            activePlanIds: state.activePlanIds.filter(id => id !== planId),
            customPlans: state.customPlans.filter(p => p.id !== planId),
            deletedPresetIds: isPreset ? [...state.deletedPresetIds, planId] : state.deletedPresetIds
          };
        });
      },

      resetDefaults: () => {
        set({ deletedPresetIds: [] });
      },

      addCustomPlan: (plan) => {
        set((state) => ({
          customPlans: [...state.customPlans, plan],
          activePlanIds: [...state.activePlanIds, plan.id]
        }));
      },

      updateActivityStatus: (date, instanceId, status, source) => {
        set((state) => {
          const dayInstances = state.activityInstances[date] || [];
          const updatedInstances = dayInstances.map(inst => 
            inst.id === instanceId ? { 
              ...inst, 
              status, 
              completedAt: status === 'completed' ? new Date().toISOString() : undefined,
              completedVia: source === 'tracker' ? 'tracker-auto-sync' : 'calendar'
            } : inst
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
        const { activityInstances } = get();
        const dayInstances = activityInstances[today] || [];
        
        const match = dayInstances.find(inst => {
          if (inst.status === 'completed') return false;
          return inst.activityName.toLowerCase().includes(activityName.toLowerCase());
        });

        if (match) {
          get().updateActivityStatus(today, match.id, 'completed', 'tracker');
          return { matched: true, instanceId: match.id };
        }
        
        return { matched: false };
      },

      addAdHocActivity: (date, activity) => {
        set((state) => {
          const dayInstances = state.activityInstances[date] || [];
          const newInstance: CalendarActivityInstance = {
            id: `adhoc-${Date.now()}`,
            planId: 'adhoc',
            activityId: 'adhoc',
            activityName: activity.activityName || 'Activity',
            status: 'completed',
            completedAt: new Date().toISOString(),
            completedVia: 'tracker-auto-sync',
            ...activity
          };
          
          return {
            activityInstances: {
              ...state.activityInstances,
              [date]: [...dayInstances, newInstance]
            }
          };
        });
      },
    }),
    {
      name: 'calendar-plans-storage-v2',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);