
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { format, subDays, isAfter, parseISO, startOfWeek } from 'date-fns';
import type { Exercise } from '@/data/exercises';

export type LogEntry = {
  id: string;
  exerciseId: string;
  exerciseName: string;
  category: string;
  duration: number; // minutes
  timestamp: string;
  difficulty?: number;
  energyLevel?: string;
  reps?: number;
  holdTime?: number;
  preStress?: number;
  postCalm?: number;
  effectiveness?: number;
  context?: string;
};

export type DietaryProfile = {
    allergies: string[];
    dietaryPreference: "omnivore" | "vegetarian" | "vegan" | "pescatarian" | "halal" | "kosher";
    medicalRestrictions: string[];
    weeklyFoodBudget: number;
    maxPrepTimeMinutes: number;
    householdSize: number;
};

export type MealPlan = {
  id: string;
  date: string;
  mealType: string;
  foodName: string;
  logged: boolean;
  loggedAt?: string;
};

export type MealLog = {
  id: string;
  date: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type BodyMetric = {
  date: string;
  weight: number;
};

export type DietaryApproach = 'Balanced' | 'Keto' | 'High Protein' | 'Low Carb' | 'Custom';

export const calculateStreak = (logs: LogEntry[]): number => {
  if (!logs || logs.length === 0) return 0;
  
  const dates = new Set<string>();
  logs.forEach(log => {
    dates.add(format(new Date(log.timestamp || log.completedAt), 'yyyy-MM-dd'));
  });

  let streak = 0;
  let checkDate = new Date();
  
  if (!dates.has(format(checkDate, 'yyyy-MM-dd'))) {
    checkDate = subDays(checkDate, 1);
  }

  while (dates.has(format(checkDate, 'yyyy-MM-dd'))) {
    streak++;
    checkDate = subDays(checkDate, 1);
  }

  return streak;
};

export type WellnessState = {
  lowEnergyMode: boolean;
  trackExplainerDismissed: boolean;
  allLogs: LogEntry[];
  transactions: any[];
  mealLogs: MealLog[];
  bodyMetrics: BodyMetric[];
  mealPlans: MealPlan[];
  dietaryApproach: DietaryApproach;
  calorieTarget: number;
  dietaryProfile: DietaryProfile;
  customPractices: Exercise[];
  collapsedCategories: Record<string, boolean>;
  planProgress: Record<string, Record<number, boolean>>;
  completions: Record<string, boolean>;
  dismissedPlans: Record<string, boolean>;
  
  assets: Record<string, number>;
  envelopes: any[];
  subscriptions: any[];

  setLowEnergyMode: (enabled: boolean) => void;
  setTrackExplainerDismissed: (dismissed: boolean) => void;
  addLogEntry: (log: Omit<LogEntry, 'id'>) => void;
  deleteLogEntry: (id: string) => void;
  
  addTransaction: (tx: any) => void;
  deleteTransaction: (id: string) => void;
  
  addMealLog: (log: Omit<MealLog, 'id'>) => void;
  deleteMealLog: (id: string) => void;
  addBodyMetric: (metric: BodyMetric) => void;
  setDietaryApproach: (approach: DietaryApproach, target: number) => void;
  addMealPlan: (plan: Omit<MealPlan, 'id'>) => void;
  updateMealPlan: (id: string, updates: Partial<MealPlan>) => void;
  updateDietaryProfile: (updates: Partial<DietaryProfile>) => void;
  toggleCategoryCollapse: (category: string) => void;
  logCompletion: () => void;
  togglePlanDay: (planId: string, day: number) => void;
  setPlanDismissed: (category: string, dismissed: boolean) => void;
  markPlanDayComplete: (planId: string, day: number) => void;
  copyDayLog: (from: string, to: string) => void;
};

export const useWellnessData = create<WellnessState>()(
  persist(
    (set, get) => ({
      lowEnergyMode: false,
      trackExplainerDismissed: false,
      allLogs: [],
      transactions: [],
      mealLogs: [],
      bodyMetrics: [],
      mealPlans: [],
      dietaryApproach: 'Balanced',
      calorieTarget: 2200,
      dietaryProfile: {
          allergies: [],
          dietaryPreference: 'omnivore',
          medicalRestrictions: [],
          weeklyFoodBudget: 100,
          maxPrepTimeMinutes: 30,
          householdSize: 1
      },
      customPractices: [],
      collapsedCategories: {},
      planProgress: {},
      completions: {},
      dismissedPlans: {},
      assets: { 'Cash': 1250, 'Savings': 4500, 'Investments': 8200 },
      envelopes: [],
      subscriptions: [],

      setLowEnergyMode: (lowEnergyMode) => set({ lowEnergyMode }),
      setTrackExplainerDismissed: (dismissed) => set({ trackExplainerDismissed: dismissed }),
      
      addLogEntry: (log) => set(s => ({ allLogs: [{ ...log, id: crypto.randomUUID() }, ...s.allLogs] })),
      deleteLogEntry: (id) => set(s => ({ allLogs: s.allLogs.filter(l => l.id !== id) })),

      addTransaction: (tx) => set(s => ({ transactions: [{ ...tx, id: crypto.randomUUID() }, ...s.transactions] })),
      deleteTransaction: (id) => set(s => ({ transactions: s.transactions.filter(t => t.id !== id) })),

      addMealLog: (log) => set(s => ({ mealLogs: [{ ...log, id: crypto.randomUUID() }, ...s.mealLogs] })),
      deleteMealLog: (id) => set(s => ({ mealLogs: s.mealLogs.filter(l => l.id !== id) })),
      
      addBodyMetric: (metric) => set(s => ({ bodyMetrics: [...s.bodyMetrics.filter(m => m.date !== metric.date), metric] })),
      setDietaryApproach: (dietaryApproach, calorieTarget) => set({ dietaryApproach, calorieTarget }),
      addMealPlan: (plan) => set(s => ({ mealPlans: [{ ...plan, id: crypto.randomUUID() }, ...s.mealPlans] })),
      updateMealPlan: (id, updates) => set(s => ({ mealPlans: s.mealPlans.map(p => p.id === id ? { ...p, ...updates } : p) })),
      updateDietaryProfile: (updates) => set(s => ({ dietaryProfile: { ...s.dietaryProfile, ...updates } })),
      
      toggleCategoryCollapse: (category) => set(s => ({ collapsedCategories: { ...s.collapsedCategories, [category]: !s.collapsedCategories[category] } })),
      logCompletion: () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        set(s => ({ completions: { ...s.completions, [today]: true } }));
      },
      togglePlanDay: (planId, day) => set(state => {
        const planDays = state.planProgress[planId] || {};
        return { planProgress: { ...state.planProgress, [planId]: { ...planDays, [day]: !planDays[day] } } };
      }),
      markPlanDayComplete: (planId, day) => set(state => {
        const planDays = state.planProgress[planId] || {};
        return { planProgress: { ...state.planProgress, [planId]: { ...planDays, [day]: true } } };
      }),
      setPlanDismissed: (category, dismissed) => set(s => ({ dismissedPlans: { ...s.dismissedPlans, [category]: dismissed } })),
      copyDayLog: (from, to) => {
        const logsToCopy = get().mealLogs.filter(l => l.date === from);
        logsToCopy.forEach(l => get().addMealLog({ ...l, date: to }));
      },
    }),
    {
      name: 'wellness-data-storage-v11',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Helper selectors for categorization
export const useMovementLogs = () => {
  const allLogs = useWellnessData(s => s.allLogs);
  return useMemo(() => allLogs.filter(l => ['Stretching', 'Strength', 'Energizer', 'Wakeup & Wind-Down', 'Mind-Body'].includes(l.category)), [allLogs]);
};

export const useStillnessLogs = () => {
  const allLogs = useWellnessData(s => s.allLogs);
  return useMemo(() => allLogs.filter(l => ['Breathwork', 'Clarity & Focus', 'Grounding & Safety', 'Self-Compassion'].includes(l.category)), [allLogs]);
};

export const useCommunicationLogs = () => {
  const allLogs = useWellnessData(s => s.allLogs);
  const commCategories = ['Vocal Mechanics', 'Active Listening', 'Nonverbal', 'Conversation Structure', 'Persuasion', 'clarity_language_craft', 'Storytelling', 'difficult_conversations', 'Public Speaking', 'professional_communication'];
  return useMemo(() => allLogs.filter(l => commCategories.includes(l.category)), [allLogs]);
};
