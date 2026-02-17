'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { subDays, isSameDay, format, startOfWeek, differenceInDays } from 'date-fns';

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
};

export type Subscription = {
  id: string;
  name: string;
  amount: number;
  billingCycle: 'monthly' | 'annually';
  category: string;
  active: boolean;
};

export type MealLog = {
  id: string;
  date: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isFlexMeal?: boolean;
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

export type WellnessState = {
  // Global
  lowEnergyMode: boolean;
  featurePhase: number;
  
  // Finance
  transactions: Transaction[];
  subscriptions: Subscription[];
  assets: Record<string, number>;
  liabilities: Record<string, number>;
  
  // Nutrition
  mealLogs: MealLog[];
  waterLogs: Record<string, number>;
  weightLogs: { date: string; weight: number }[];
  flexMealsPerWeek: number;

  // Movement & Stillness Logs
  movementLogs: MovementLog[];
  stillnessLogs: StillnessLog[];
  movementProgress: Record<string, MovementProgress>;
  
  // Routines
  routines: CustomRoutine[];

  // Actions
  setLowEnergyMode: (enabled: boolean) => void;
  setFeaturePhase: (phase: number) => void;
  
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  addSubscription: (sub: Omit<Subscription, 'id' | 'active'>) => void;
  toggleSubscription: (id: string) => void;
  updateNetWorth: (assets: Record<string, number>, liabilities: Record<string, number>) => void;
  
  addMealLog: (log: Omit<MealLog, 'id'>) => void;
  copyDayLog: (fromDate: string, toDate: string) => void;
  addWater: (date: string, amount: number) => void;
  addWeight: (date: string, weight: number) => void;

  addMovementLog: (log: Omit<MovementLog, 'id'>) => void;
  addStillnessLog: (log: Omit<StillnessLog, 'id'>) => void;
  
  addRoutine: (routine: Omit<CustomRoutine, 'id' | 'createdAt'>) => void;
  deleteRoutine: (id: string) => void;
};

export const useWellnessData = create<WellnessState>()(
  persist(
    (set, get) => ({
      lowEnergyMode: false,
      featurePhase: 1,
      
      transactions: [],
      subscriptions: [
        { id: 's1', name: 'Netflix', amount: 15.99, billingCycle: 'monthly', category: 'entertainment', active: true },
        { id: 's2', name: 'Spotify', amount: 9.99, billingCycle: 'monthly', category: 'entertainment', active: true },
      ],
      assets: { cash: 5000, savings: 12000, investments: 8500 },
      liabilities: { creditCard: 1200, carLoan: 15000 },
      
      mealLogs: [],
      waterLogs: {},
      weightLogs: [],
      flexMealsPerWeek: 2,

      movementLogs: [],
      stillnessLogs: [],
      movementProgress: {},
      routines: [],

      setLowEnergyMode: (lowEnergyMode) => set({ lowEnergyMode }),
      setFeaturePhase: (featurePhase) => set({ featurePhase }),

      addTransaction: (tx) => set((state) => ({ 
        transactions: [{ ...tx, id: crypto.randomUUID() }, ...state.transactions] 
      })),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(t => t.id !== id)
      })),
      addSubscription: (sub) => set((state) => ({
        subscriptions: [...state.subscriptions, { ...sub, id: crypto.randomUUID(), active: true }]
      })),
      toggleSubscription: (id) => set((state) => ({
        subscriptions: state.subscriptions.map(s => s.id === id ? { ...s, active: !s.active } : s)
      })),
      updateNetWorth: (assets, liabilities) => set({ assets, liabilities }),

      addMealLog: (log) => set((state) => ({
        mealLogs: [{ ...log, id: crypto.randomUUID() }, ...state.mealLogs]
      })),
      copyDayLog: (fromDate, toDate) => set((state) => {
        const fromLogs = state.mealLogs.filter(l => l.date === fromDate);
        const newLogs = fromLogs.map(l => ({ ...l, id: crypto.randomUUID(), date: toDate }));
        return { mealLogs: [...newLogs, ...state.mealLogs] };
      }),
      addWater: (date, amount) => set((state) => ({
        waterLogs: { ...state.waterLogs, [date]: (state.waterLogs[date] || 0) + amount }
      })),
      addWeight: (date, weight) => set((state) => ({
        weightLogs: [...state.weightLogs.filter(w => w.date !== date), { date, weight }]
      })),

      addMovementLog: (log) => set((state) => {
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

        return {
          movementLogs: [newLog, ...state.movementLogs],
          movementProgress: newProgress
        };
      }),
      addStillnessLog: (log) => set((state) => ({
        stillnessLogs: [{ ...log, id: crypto.randomUUID() }, ...state.stillnessLogs]
      })),

      addRoutine: (routine) => set((state) => ({
        routines: [{ ...routine, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...state.routines]
      })),
      deleteRoutine: (id) => set((state) => ({
        routines: state.routines.filter(r => r.id !== id)
      })),
    }),
    {
      name: 'wellness-data-storage-v2',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Utility to calculate streak with a 1-day grace period
export const calculateStreak = (logs: { timestamp: string }[]) => {
  if (logs.length === 0) return 0;
  
  const dates = Array.from(new Set(logs.map(l => format(new Date(l.timestamp), 'yyyy-MM-dd'))))
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
  const today = format(new Date(), 'yyyy-MM-dd');
  const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');
  
  if (dates[0] !== today && dates[0] !== yesterday) return 0;
  
  let streak = 1;
  for (let i = 0; i < dates.length - 1; i++) {
    const diff = differenceInDays(new Date(dates[i]), new Date(dates[i+1]));
    if (diff <= 2) { // 1 day gap allowed
      streak++;
    } else {
      break;
    }
  }
  return streak;
};
