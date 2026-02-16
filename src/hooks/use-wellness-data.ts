
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { subDays, isSameDay, format, startOfWeek } from 'date-fns';

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
    }),
    {
      name: 'wellness-data-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
