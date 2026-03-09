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
  planOrder: string[]; // List of IDs to maintain manual sorting
  activityInstances: Record<string, CalendarActivityInstance[]>; // key: YYYY-MM-DD
  
  togglePlan: (planId: string) => void;
  deletePlan: (planId: string) => void;
  resetDefaults: () => void;
  addCustomPlan: (plan: CalendarPlan) => void;
  updateCustomPlan: (planId: string, updates: Partial<CalendarPlan>) => void;
  updateActivityStatus: (date: string, instanceId: string, status: ActivityStatus, source?: string) => void;
  syncFromTracker: (category: PlanCategory, activityName: string) => { matched: boolean; instanceId?: string };
  addAdHocActivity: (date: string, activity: Partial<CalendarActivityInstance>) => void;
  
  // Sorting
  reorderPlan: (planId: string, direction: 'up' | 'down') => void;

  // Study Tool Integration
  addStudySessionEvent: (date: string, toolId: string, resourceId: string, name: string, time?: string) => string;
  markStudySessionComplete: (toolId: string, resourceId: string) => void;

  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useCalendarPlansStore = create<CalendarPlansState>()(
  persist(
    (set, get) => ({
      activePlanIds: [],
      customPlans: [],
      deletedPresetIds: [],
      planOrder: [],
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
            planOrder: state.planOrder.filter(id => id !== planId),
            deletedPresetIds: isPreset ? [...state.deletedPresetIds, planId] : state.deletedPresetIds
          };
        });
      },

      resetDefaults: () => {
        set({ deletedPresetIds: [], planOrder: [] });
      },

      addCustomPlan: (plan) => {
        set((state) => ({
          customPlans: [...state.customPlans, plan],
          activePlanIds: [...state.activePlanIds, plan.id],
          planOrder: [plan.id, ...state.planOrder]
        }));
      },

      updateCustomPlan: (planId, updates) => {
        set((state) => ({
          customPlans: state.customPlans.map(p => p.id === planId ? { ...p, ...updates } : p)
        }));
      },

      reorderPlan: (planId, direction) => {
        const { planOrder } = get();
        // If order is empty, initialize it with current available plans
        let currentOrder = planOrder.length > 0 ? [...planOrder] : [];
        
        if (currentOrder.length === 0) {
          // Initialize order if it's the first move
          const customIds = get().customPlans.map(p => p.id);
          const presetIds = presetPlans.filter(p => !get().deletedPresetIds.includes(p.id)).map(p => p.id);
          currentOrder = [...presetIds, ...customIds];
        }

        const index = currentOrder.indexOf(planId);
        if (index === -1) return;

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= currentOrder.length) return;

        const updatedOrder = [...currentOrder];
        const [moved] = updatedOrder.splice(index, 1);
        updatedOrder.splice(newIndex, 0, moved);

        set({ planOrder: updatedOrder });
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
        
        // Find first incomplete matching instance for today
        const match = dayInstances.find(inst => {
          if (inst.status === 'completed') return false;
          // Case insensitive match
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

      addStudySessionEvent: (date, toolId, resourceId, name, time) => {
        const id = `study-${Date.now()}`;
        set((state) => {
          const dayInstances = state.activityInstances[date] || [];
          const newInstance: CalendarActivityInstance = {
            id,
            planId: 'study-sessions',
            activityId: toolId,
            activityName: name,
            status: 'not-started',
            date,
            scheduledTime: time,
            studyToolId: toolId,
            studyResourceId: resourceId,
            completedVia: 'calendar'
          };
          return {
            activityInstances: {
              ...state.activityInstances,
              [date]: [...dayInstances, newInstance]
            }
          };
        });
        return id;
      },

      markStudySessionComplete: (toolId, resourceId) => {
        const { activityInstances } = get();
        const today = format(new Date(), 'yyyy-MM-dd');
        const dayInstances = activityInstances[today] || [];
        
        const match = dayInstances.find(inst => 
          inst.studyToolId === toolId && 
          inst.studyResourceId === resourceId && 
          inst.status !== 'completed'
        );

        if (match) {
          get().updateActivityStatus(today, match.id, 'completed', 'tracker');
        }
      }
    }),
    {
      name: 'calendar-plans-storage-v4',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);
