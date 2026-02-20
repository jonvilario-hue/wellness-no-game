
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { format, subDays, isSameDay, parseISO, addDays } from 'date-fns';
import type { Exercise } from '@/data/exercises';

export type Transaction = {
  id: string;
  amount: number;
  category: string;
  merchant: string;
  date: string;
  type: 'income' | 'expense';
  isAnomaly?: boolean;
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

export type MovementLog = {
  id: string;
  exerciseId: string;
  exerciseName: string;
  duration: number;
  timestamp: string;
};

export type StillnessLog = {
  id: string;
  techniqueId: string;
  techniqueName: string;
  duration: number;
  timestamp: string;
  trigger?: string;
};

export type DietaryApproach = 'Balanced' | 'Keto' | 'High Protein' | 'Low Carb' | 'Custom';

export type WellnessState = {
  lowEnergyMode: boolean;
  transactions: Transaction[];
  mealLogs: MealLog[];
  bodyMetrics: BodyMetric[];
  mealPlans: MealPlan[];
  dietaryApproach: DietaryApproach;
  calorieTarget: number;
  dietaryProfile: DietaryProfile;
  movementLogs: MovementLog[];
  stillnessLogs: StillnessLog[];
  communicationLogs: any[];
  customPractices: Exercise[];
  collapsedCategories: Record<string, boolean>;
  planProgress: Record<string, Record<number, boolean>>;
  completions: Record<string, boolean>;

  setLowEnergyMode: (enabled: boolean) => void;
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  addMealLog: (log: Omit<MealLog, 'id'>) => void;
  addBodyMetric: (metric: BodyMetric) => void;
  setDietaryApproach: (approach: DietaryApproach, target: number) => void;
  addMealPlan: (plan: Omit<MealPlan, 'id'>) => void;
  updateMealPlan: (id: string, updates: Partial<MealPlan>) => void;
  updateDietaryProfile: (updates: Partial<DietaryProfile>) => void;
  addMovementLog: (log: any) => void;
  addStillnessLog: (log: any) => void;
  addCommunicationLog: (log: any) => void;
  addRoutine: (routine: any) => void;
  toggleCategoryCollapse: (category: string) => void;
  togglePlanDay: (planId: string, dayNumber: number) => void;
  logCompletion: () => void;
};

export const useWellnessData = create<WellnessState>()(
  persist(
    (set, get) => ({
      lowEnergyMode: false,
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
      movementLogs: [],
      stillnessLogs: [],
      communicationLogs: [],
      customPractices: [],
      collapsedCategories: {},
      planProgress: {},
      completions: {},

      setLowEnergyMode: (lowEnergyMode) => set({ lowEnergyMode }),
      addTransaction: (tx) => set(s => ({ transactions: [{ ...tx, id: crypto.randomUUID() }, ...s.transactions] })),
      addMealLog: (log) => set(s => ({ mealLogs: [{ ...log, id: crypto.randomUUID() }, ...s.mealLogs] })),
      addBodyMetric: (metric) => set(s => ({ bodyMetrics: [...s.bodyMetrics.filter(m => m.date !== metric.date), metric] })),
      setDietaryApproach: (dietaryApproach, calorieTarget) => set({ dietaryApproach, calorieTarget }),
      addMealPlan: (plan) => set(s => ({ mealPlans: [{ ...plan, id: crypto.randomUUID() }, ...s.mealPlans] })),
      updateMealPlan: (id, updates) => set(s => ({ mealPlans: s.mealPlans.map(p => p.id === id ? { ...p, ...updates } : p) })),
      updateDietaryProfile: (updates) => set(s => ({ dietaryProfile: { ...s.dietaryProfile, ...updates } })),
      addMovementLog: (log) => set(s => ({ movementLogs: [{ ...log, id: crypto.randomUUID() }, ...s.movementLogs] })),
      addStillnessLog: (log) => set(s => ({ stillnessLogs: [{ ...log, id: crypto.randomUUID() }, ...s.stillnessLogs] })),
      addCommunicationLog: (log) => set(s => ({ communicationLogs: [{ ...log, id: crypto.randomUUID() }, ...s.communicationLogs] })),
      addRoutine: (routine) => {},
      toggleCategoryCollapse: (category) => set(s => ({ collapsedCategories: { ...s.collapsedCategories, [category]: !s.collapsedCategories[category] } })),
      togglePlanDay: (planId, dayNumber) => {},
      logCompletion: () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        set(s => ({ completions: { ...s.completions, [today]: true } }));
      }
    }),
    {
      name: 'wellness-data-storage-v5',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
