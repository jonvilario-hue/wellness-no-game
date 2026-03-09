
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
  difficulty?: number;
  energyLevel?: string;
  reps?: number;
  holdTime?: number;
};

export type StillnessLog = {
  id: string;
  techniqueId: string;
  techniqueName: string;
  duration: number;
  timestamp: string;
  trigger?: string;
  preStress?: number;
  postCalm?: number;
};

export type CommunicationLog = {
  id: string;
  practiceId: string;
  practiceName: string;
  duration: number;
  timestamp: string;
  effectiveness?: number;
  context?: string;
};

export type DietaryApproach = 'Balanced' | 'Keto' | 'High Protein' | 'Low Carb' | 'Custom';

export type SavingsGoal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  icon: string;
};

export type Subscription = {
  id: string;
  name: string;
  amount: number;
  active: boolean;
  nextBillingDate: string;
};

export type Envelope = {
  id: string;
  name: string;
  balance: number;
  limit: number;
};

export type Budget = {
  category: string;
  limit: number;
  period: 'weekly' | 'monthly';
};

export const calculateStreak = (data: any[] | Record<string, boolean>): number => {
  const dates = new Set<string>();
  if (Array.isArray(data)) {
    data.forEach(item => {
      const timestamp = item.timestamp || (item.date ? `${item.date}T12:00:00` : null);
      if (timestamp) {
        dates.add(format(new Date(timestamp), 'yyyy-MM-dd'));
      }
    });
  } else {
    Object.entries(data).forEach(([date, completed]) => {
      if (completed) dates.add(date);
    });
  }

  if (dates.size === 0) return 0;

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
  trackingEnabled: Record<string, boolean>; 
  transactions: Transaction[];
  mealLogs: MealLog[];
  bodyMetrics: BodyMetric[];
  mealPlans: MealPlan[];
  dietaryApproach: DietaryApproach;
  calorieTarget: number;
  dietaryProfile: DietaryProfile;
  movementLogs: MovementLog[];
  stillnessLogs: StillnessLog[];
  communicationLogs: CommunicationLog[];
  customPractices: Exercise[];
  collapsedCategories: Record<string, boolean>;
  planProgress: Record<string, Record<number, boolean>>;
  completions: Record<string, boolean>;
  movementProgress: Record<string, { bestReps?: number; bestHoldTime?: number }>;
  dismissedPlans: Record<string, boolean>; // key is category
  
  assets: Record<string, number>;
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
  subscriptions: Subscription[];
  bills: any[];
  envelopes: Envelope[];

  setLowEnergyMode: (enabled: boolean) => void;
  toggleTracking: (id: string) => void;
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
  toggleCategoryCollapse: (category: string) => void;
  logCompletion: () => void;
  deleteMovementLog: (id: string) => void;
  deleteStillnessLog: (id: string) => void;
  deleteCommunicationLog: (id: string) => void;
  deleteMealLog: (id: string) => void;
  deleteTransaction: (id: string) => void;
  togglePlanDay: (planId: string, day: number) => void;
  setPlanDismissed: (category: string, dismissed: boolean) => void;
  markPlanDayComplete: (planId: string, day: number) => void;
  
  setBudget: (category: string, limit: number) => void;
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id' | 'currentAmount'>) => void;
  contributeToGoal: (id: string, amount: number) => void;
  addBill: (bill: any) => void;
  toggleBillPaid: (id: string) => void;
  updateEnvelope: (id: string, delta: number) => void;
  toggleSubscription: (id: string) => void;
  copyDayLog: (from: string, to: string) => void;
};

export const useWellnessData = create<WellnessState>()(
  persist(
    (set, get) => ({
      lowEnergyMode: false,
      trackingEnabled: {
        'Movement': true,
        'Stillness': true,
        'Communication': true,
        'Speed Reading': true
      },
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
      movementProgress: {},
      dismissedPlans: {},
      
      assets: { 'Cash': 1250, 'Savings': 4500, 'Investments': 8200 },
      budgets: [
        { category: 'groceries', limit: 400, period: 'monthly' },
        { category: 'dining', limit: 200, period: 'monthly' }
      ],
      savingsGoals: [
        { id: '1', name: 'Emergency Fund', targetAmount: 10000, currentAmount: 2500, icon: '🛡️' },
        { id: '2', name: 'New Laptop', targetAmount: 2000, currentAmount: 850, icon: '💻' }
      ],
      subscriptions: [
        { id: 'sub1', name: 'Streaming', amount: 15.99, active: true, nextBillingDate: '2024-04-15' },
        { id: 'sub2', name: 'Gym', amount: 45.00, active: true, nextBillingDate: '2024-04-01' }
      ],
      bills: [],
      envelopes: [
        { id: 'env1', name: 'Coffee', balance: 45, limit: 100 },
        { id: 'env2', name: 'Entertainment', balance: 120, limit: 300 }
      ],

      setLowEnergyMode: (lowEnergyMode) => set({ lowEnergyMode }),
      toggleTracking: (id) => set(s => ({
        trackingEnabled: {
          ...s.trackingEnabled,
          [id]: !s.trackingEnabled[id]
        }
      })),
      addTransaction: (tx) => set(s => ({ transactions: [{ ...tx, id: crypto.randomUUID() }, ...s.transactions] })),
      addMealLog: (log) => set(s => ({ mealLogs: [{ ...log, id: crypto.randomUUID() }, ...s.mealLogs] })),
      addBodyMetric: (metric) => set(s => ({ bodyMetrics: [...s.bodyMetrics.filter(m => m.date !== metric.date), metric] })),
      setDietaryApproach: (dietaryApproach, calorieTarget) => set({ dietaryApproach, calorieTarget }),
      addMealPlan: (plan) => set(s => ({ mealPlans: [{ ...plan, id: crypto.randomUUID() }, ...s.mealPlans] })),
      updateMealPlan: (id, updates) => set(s => ({ mealPlans: s.mealPlans.map(p => p.id === id ? { ...p, ...updates } : p) })),
      updateDietaryProfile: (updates) => set(s => ({ dietaryProfile: { ...s.dietaryProfile, ...updates } })),
      
      addMovementLog: (log) => set(s => {
        const id = crypto.randomUUID();
        const currentBest = s.movementProgress[log.exerciseId] || {};
        const newBest = { ...currentBest };
        
        if (log.reps !== undefined && (!currentBest.bestReps || log.reps > currentBest.bestReps)) {
          newBest.bestReps = log.reps;
        }
        if (log.holdTime !== undefined && (!currentBest.bestHoldTime || log.holdTime > currentBest.bestHoldTime)) {
          newBest.bestHoldTime = log.holdTime;
        }

        return { 
          movementLogs: [{ ...log, id }, ...s.movementLogs],
          movementProgress: { ...s.movementProgress, [log.exerciseId]: newBest }
        };
      }),

      addStillnessLog: (log) => set(s => ({ stillnessLogs: [{ ...log, id: crypto.randomUUID() }, ...s.stillnessLogs] })),
      addCommunicationLog: (log) => set(s => ({ communicationLogs: [{ ...log, id: crypto.randomUUID() }, ...s.communicationLogs] })),
      toggleCategoryCollapse: (category) => set(s => ({ collapsedCategories: { ...s.collapsedCategories, [category]: !s.collapsedCategories[category] } })),
      logCompletion: () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        set(s => ({ completions: { ...s.completions, [today]: true } }));
      },
      deleteMovementLog: (id) => set(s => ({ movementLogs: s.movementLogs.filter(l => l.id !== id) })),
      deleteStillnessLog: (id) => set(s => ({ stillnessLogs: s.stillnessLogs.filter(l => l.id !== id) })),
      deleteCommunicationLog: (id) => set(s => ({ communicationLogs: s.communicationLogs.filter(l => l.id !== id) })),
      deleteMealLog: (id) => set(s => ({ mealLogs: s.mealLogs.filter(l => l.id !== id) })),
      deleteTransaction: (id) => set(s => ({ transactions: s.transactions.filter(t => t.id !== id) })),

      togglePlanDay: (planId, day) => set(state => {
        const planDays = state.planProgress[planId] || {};
        return {
          planProgress: {
            ...state.planProgress,
            [planId]: {
              ...planDays,
              [day]: !planDays[day]
            }
          }
        };
      }),

      markPlanDayComplete: (planId, day) => set(state => {
        const planDays = state.planProgress[planId] || {};
        return {
          planProgress: {
            ...state.planProgress,
            [planId]: {
              ...planDays,
              [day]: true
            }
          }
        };
      }),

      setPlanDismissed: (category, dismissed) => set(s => ({
        dismissedPlans: {
          ...s.dismissedPlans,
          [category]: dismissed
        }
      })),

      setBudget: (category, limit) => set(s => ({ budgets: [...s.budgets.filter(b => b.category !== category), { category, limit, period: 'monthly' }] })),
      addSavingsGoal: (goal) => set(s => ({ savingsGoals: [...s.savingsGoals, { ...goal, id: crypto.randomUUID(), currentAmount: 0 }] })),
      contributeToGoal: (id, amount) => set(s => ({ savingsGoals: s.savingsGoals.map(g => g.id === id ? { ...g, currentAmount: g.currentAmount + amount } : g) })),
      addBill: (bill) => set(s => ({ bills: [...s.bills, bill] })),
      toggleBillPaid: (id) => {},
      updateEnvelope: (id, delta) => set(s => ({ envelopes: s.envelopes.map(e => e.id === id ? { ...e, balance: Math.max(0, e.balance + delta) } : e) })),
      toggleSubscription: (id) => set(s => ({ subscriptions: s.subscriptions.map(sub => sub.id === id ? { ...sub, active: !sub.active } : sub) })),
      copyDayLog: (from, to) => {
        const logsToCopy = get().mealLogs.filter(l => l.date === from);
        logsToCopy.forEach(l => get().addMealLog({ ...l, date: to }));
      },
    }),
    {
      name: 'wellness-data-storage-v8',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (!state.movementProgress) state.movementProgress = {};
          if (!state.dismissedPlans) state.dismissedPlans = {};
          if (!state.trackingEnabled) state.trackingEnabled = {
            'Movement': true,
            'Stillness': true,
            'Communication': true,
            'Speed Reading': true
          };
        }
      }
    }
  )
);
