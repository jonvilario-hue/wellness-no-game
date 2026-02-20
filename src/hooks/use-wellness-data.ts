
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { subDays, isSameDay, format, startOfDay, differenceInDays, parseISO, isBefore } from 'date-fns';
import type { Exercise } from '@/data/exercises';

export type Transaction = {
  id: string;
  amount: number;
  category: string;
  merchant: string;
  date: string;
  type: 'income' | 'expense';
  note?: string;
  moodTag?: 'happy' | 'neutral' | 'stressed';
  isSubscription?: boolean;
  isAnomaly?: boolean;
};

export type Subscription = {
  id: string;
  name: string;
  amount: number;
  billingCycle: 'monthly' | 'annually';
  category: string;
  active: boolean;
  nextBillingDate?: string;
};

export type SavingsGoal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  icon: string;
};

export type Bill = {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
  isPaid: boolean;
};

export type Budget = {
  category: string;
  limit: number;
  period: 'weekly' | 'monthly';
};

export type Envelope = {
  id: string;
  name: string;
  balance: number;
  limit: number;
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
  isFlexMeal?: boolean;
};

export type Food = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
};

export type Recipe = Food & {
  ingredients: string[];
};

export type BodyMetric = {
  date: string;
  weight: number;
  bodyFat?: number;
  waist?: number;
};

export type MealPlan = {
  date: string;
  mealType: string;
  foodId: string;
  foodName: string;
};

export type MovementLog = {
  id: string;
  exerciseId: string;
  exerciseName: string;
  duration: number;
  timestamp: string;
  difficulty?: number;
  energyLevel?: 'Low' | 'Medium' | 'High';
  reps?: number;
  holdTime?: number;
};

export type StillnessLog = {
  id: string;
  techniqueId: string;
  techniqueName: string;
  duration: number;
  timestamp: string;
  preStress?: number;
  postCalm?: number;
  trigger?: 'Proactive' | 'Stress' | 'Anxiety' | "Can't Sleep" | 'Other';
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

export type MovementProgress = {
  exerciseId: string;
  bestReps?: number;
  bestHoldTime?: number;
  lastUpdated: string;
};

export type CustomRoutine = {
  id: string;
  name: string;
  exerciseIds: string[];
  createdAt: string;
};

export type DietaryApproach = 'Balanced' | 'Keto' | 'High Protein' | 'Low Carb' | 'Custom';

export type WellnessState = {
  // Global
  lowEnergyMode: boolean;
  featurePhase: number;
  
  // Finance
  transactions: Transaction[];
  subscriptions: Subscription[];
  budgets: Budget[];
  envelopes: Envelope[];
  savingsGoals: SavingsGoal[];
  bills: Bill[];
  assets: Record<string, number>;
  liabilities: Record<string, number>;
  
  // Nutrition
  mealLogs: MealLog[];
  waterLogs: Record<string, number>;
  bodyMetrics: BodyMetric[];
  mealPlans: MealPlan[];
  customFoods: Food[];
  recipes: Recipe[];
  flexMealsPerWeek: number;
  dietaryApproach: DietaryApproach;
  calorieTarget: number;

  // Activity Logs
  movementLogs: MovementLog[];
  stillnessLogs: StillnessLog[];
  communicationLogs: CommunicationLog[];
  movementProgress: Record<string, MovementProgress>;
  
  // Routines (Stacks)
  routines: CustomRoutine[];

  // Custom Content
  customPractices: Exercise[];
  collapsedCategories: Record<string, boolean>;

  // Plans & Progress
  planProgress: Record<string, Record<number, boolean>>;
  completions: Record<string, boolean>;

  // Actions
  setLowEnergyMode: (enabled: boolean) => void;
  
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  setBudget: (budget: Budget) => void;
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id' | 'currentAmount'>) => void;
  contributeToGoal: (id: string, amount: number) => void;
  addBill: (bill: Omit<Bill, 'id' | 'isPaid'>) => void;
  toggleBillPaid: (id: string) => void;
  updateEnvelope: (id: string, amount: number) => void;
  toggleSubscription: (id: string) => void;
  updateNetWorth: (assets: Record<string, number>, liabilities: Record<string, number>) => void;
  
  addMealLog: (log: Omit<MealLog, 'id'>) => void;
  deleteMealLog: (id: string) => void;
  addMealPlan: (plan: MealPlan) => void;
  addBodyMetric: (metric: BodyMetric) => void;
  setDietaryApproach: (approach: DietaryApproach, target: number) => void;
  addCustomFood: (food: Omit<Food, 'id'>) => void;
  addRecipe: (recipe: Omit<Recipe, 'id'>) => void;
  addWater: (date: string, amount: number) => void;

  addMovementLog: (log: Omit<MovementLog, 'id'>) => void;
  deleteMovementLog: (id: string) => void;
  addStillnessLog: (log: Omit<StillnessLog, 'id'>) => void;
  addCommunicationLog: (log: Omit<CommunicationLog, 'id'>) => void;
  
  addRoutine: (routine: Omit<CustomRoutine, 'id' | 'createdAt'>) => void;
  toggleCategoryCollapse: (category: string) => void;
  togglePlanDay: (planId: string, dayNumber: number) => void;
  logCompletion: () => void;
};

export const calculateStreak = (activityLogs: any[] | Record<string, any>) => {
  let dates: string[] = [];
  if (Array.isArray(activityLogs)) {
    dates = activityLogs.map(l => (l.timestamp || l.date).split('T')[0]);
  } else {
    dates = Object.keys(activityLogs).filter(k => activityLogs[k]);
  }

  if (dates.length === 0) return 0;

  const uniqueDates = Array.from(new Set(dates)).sort((a, b) => b.localeCompare(a));
  const today = format(new Date(), 'yyyy-MM-dd');
  const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');

  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
    return 0;
  }

  let streak = 0;
  let checkDate = parseISO(uniqueDates[0]);

  for (const dateStr of uniqueDates) {
    const date = parseISO(dateStr);
    if (isSameDay(date, checkDate)) {
      streak++;
      checkDate = subDays(checkDate, 1);
    } else {
      break;
    }
  }

  return streak;
};

export const useWellnessData = create<WellnessState>()(
  persist(
    (set, get) => ({
      lowEnergyMode: false,
      featurePhase: 4,
      
      transactions: [],
      subscriptions: [
        { id: 's1', name: 'Netflix', amount: 15.99, billingCycle: 'monthly', category: 'entertainment', active: true, nextBillingDate: '2024-04-15' },
        { id: 's2', name: 'Spotify', amount: 9.99, billingCycle: 'monthly', category: 'entertainment', active: true, nextBillingDate: '2024-04-20' },
      ],
      budgets: [],
      envelopes: [
        { id: 'env-1', name: 'Groceries', balance: 400, limit: 400 },
        { id: 'env-2', name: 'Dining', balance: 150, limit: 150 },
        { id: 'env-3', name: 'Transit', balance: 100, limit: 100 },
      ],
      savingsGoals: [],
      bills: [],
      assets: { cash: 5000, savings: 12000, investments: 8500 },
      liabilities: { creditCard: 1200, carLoan: 15000 },
      
      mealLogs: [],
      waterLogs: {},
      bodyMetrics: [],
      mealPlans: [],
      customFoods: [],
      recipes: [],
      flexMealsPerWeek: 2,
      dietaryApproach: 'Balanced',
      calorieTarget: 2200,

      movementLogs: [],
      stillnessLogs: [],
      communicationLogs: [],
      movementProgress: {},
      routines: [],

      customPractices: [],
      collapsedCategories: {},

      planProgress: {},
      completions: {},

      setLowEnergyMode: (lowEnergyMode) => set({ lowEnergyMode }),

      addTransaction: (tx) => {
        const id = crypto.randomUUID();
        const avg = get().transactions.filter(t => t.category === tx.category).reduce((s,t) => s + t.amount, 0) / (get().transactions.length || 1);
        const isAnomaly = tx.amount > (avg * 2.5) && get().transactions.length > 5;
        
        set((state) => ({ 
          transactions: [{ ...tx, id, isAnomaly }, ...state.transactions] 
        }));
        get().logCompletion();
      },
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(t => t.id !== id)
      })),
      setBudget: (budget) => set((state) => ({
        budgets: [...state.budgets.filter(b => b.category !== budget.category), budget]
      })),
      addSavingsGoal: (goal) => set((state) => ({
        savingsGoals: [...state.savingsGoals, { ...goal, id: crypto.randomUUID(), currentAmount: 0 }]
      })),
      contributeToGoal: (id, amount) => set((state) => ({
        savingsGoals: state.savingsGoals.map(g => g.id === id ? { ...g, currentAmount: g.currentAmount + amount } : g)
      })),
      addBill: (bill) => set((state) => ({
        bills: [...state.bills, { ...bill, id: crypto.randomUUID(), isPaid: false }]
      })),
      toggleBillPaid: (id) => set((state) => ({
        bills: state.bills.map(b => b.id === id ? { ...b, isPaid: !b.isPaid } : b)
      })),
      updateEnvelope: (id, amount) => set((state) => ({
        envelopes: state.envelopes.map(e => e.id === id ? { ...e, balance: e.balance + amount } : e)
      })),
      toggleSubscription: (id) => set((state) => ({
        subscriptions: state.subscriptions.map(s => s.id === id ? { ...s, active: !s.active } : s)
      })),
      updateNetWorth: (assets, liabilities) => set({ assets, liabilities }),

      addMealLog: (log) => {
        set((state) => ({
          mealLogs: [{ ...log, id: crypto.randomUUID() }, ...state.mealLogs]
        }));
        get().logCompletion();
      },
      deleteMealLog: (id) => set((state) => ({
        mealLogs: state.mealLogs.filter(l => l.id !== id)
      })),
      addMealPlan: (plan) => set((state) => ({
        mealPlans: [...state.mealPlans, plan]
      })),
      addBodyMetric: (metric) => set((state) => ({
        bodyMetrics: [...state.bodyMetrics.filter(m => m.date !== metric.date), metric]
      })),
      setDietaryApproach: (dietaryApproach, calorieTarget) => set({ dietaryApproach, calorieTarget }),
      addCustomFood: (food) => set((state) => ({
        customFoods: [...state.customFoods, { ...food, id: crypto.randomUUID() }]
      })),
      addRecipe: (recipe) => set((state) => ({
        recipes: [...state.recipes, { ...recipe, id: crypto.randomUUID() }]
      })),
      addWater: (date, amount) => set((state) => ({
        waterLogs: { ...state.waterLogs, [date]: (state.waterLogs[date] || 0) + amount }
      })),

      addMovementLog: (log) => {
        set((state) => {
          const newLog = { ...log, id: crypto.randomUUID() };
          const newProgress = { ...state.movementProgress };
          if (log.reps || log.holdTime) {
            const currentBest = newProgress[log.exerciseId] || { exerciseId: log.exerciseId, lastUpdated: new Date().toISOString() };
            newProgress[log.exerciseId] = {
              ...currentBest,
              bestReps: Math.max(currentBest.bestReps || 0, log.reps || 0),
              bestHoldTime: Math.max(currentBest.bestHoldTime || 0, log.holdTime || 0),
              lastUpdated: new Date().toISOString()
            };
          }
          return { movementLogs: [newLog, ...state.movementLogs], movementProgress: newProgress };
        });
        get().logCompletion();
      },
      deleteMovementLog: (id) => set((state) => ({
        movementLogs: state.movementLogs.filter(l => l.id !== id)
      })),
      addStillnessLog: (log) => {
        set((state) => ({
          stillnessLogs: [{ ...log, id: crypto.randomUUID() }, ...state.stillnessLogs]
        }));
        get().logCompletion();
      },
      deleteStillnessLog: (id) => set((state) => ({
        stillnessLogs: state.stillnessLogs.filter(l => l.id !== id)
      })),
      addCommunicationLog: (log) => {
        set((state) => ({
          communicationLogs: [{ ...log, id: crypto.randomUUID() }, ...state.communicationLogs]
        }));
        get().logCompletion();
      },
      deleteCommunicationLog: (id) => set((state) => ({
        communicationLogs: state.communicationLogs.filter(l => l.id !== id)
      })),
      addRoutine: (routine) => set((state) => ({
        routines: [{ ...routine, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...state.routines]
      })),
      toggleCategoryCollapse: (category) => set((state) => ({
        collapsedCategories: { ...state.collapsedCategories, [category]: !state.collapsedCategories[category] }
      })),
      togglePlanDay: (planId, dayNumber) => {
        set((state) => {
          const currentPlan = state.planProgress[planId] || {};
          return { planProgress: { ...state.planProgress, [planId]: { ...currentPlan, [dayNumber]: !currentPlan[dayNumber] } } };
        });
        get().logCompletion();
      },
      logCompletion: () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        set((state) => ({ completions: { ...state.completions, [today]: true } }));
      }
    }),
    {
      name: 'wellness-data-storage-v4',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
