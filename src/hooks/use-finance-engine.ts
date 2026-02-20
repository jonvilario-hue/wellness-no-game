
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  FinancialInsight, CreditCard, Debt, DebtPlan, Playbook, 
  UserPlaybookProgress, FinancialTip, FinanceConstants, NetWorthSnapshot 
} from '@/types/finance-engine';
import { DEFAULT_FINANCE_CONSTANTS, SEED_PLAYBOOKS, SEED_TIPS } from '@/lib/finance-constants';

interface FinanceEngineState {
  insights: FinancialInsight[];
  creditCards: CreditCard[];
  debts: Debt[];
  debtPlan: DebtPlan | null;
  playbookProgress: UserPlaybookProgress[];
  seenTips: string[];
  netWorthSnapshots: NetWorthSnapshot[];
  settings: {
    showInsights: boolean;
    showDailyTips: boolean;
    adviceTone: 'gentle' | 'direct';
  };
  constants: FinanceConstants;
  isInitialized: boolean;

  // Actions
  addInsight: (insight: Omit<FinancialInsight, 'dismissed' | 'dismissedAt' | 'createdAt'>) => void;
  dismissInsight: (id: string) => void;
  updateCreditCard: (id: string, updates: Partial<CreditCard>) => void;
  addCreditCard: (card: Omit<CreditCard, 'id' | 'lastUpdated'>) => void;
  deleteCreditCard: (id: string) => void;
  updateDebt: (id: string, updates: Partial<Debt>) => void;
  addDebt: (debt: Omit<Debt, 'id'>) => void;
  deleteDebt: (id: string) => void;
  setDebtPlan: (plan: DebtPlan) => void;
  updatePlaybookStep: (playbookId: string, stepNumber: number, completed: boolean) => void;
  markTipSeen: (tipId: string) => void;
  addNetWorthSnapshot: (snapshot: Omit<NetWorthSnapshot, 'id'>) => void;
  updateSettings: (updates: Partial<FinanceEngineState['settings']>) => void;
  updateConstants: (updates: Partial<FinanceConstants>) => void;
  initialize: () => void;
}

export const useFinanceEngine = create<FinanceEngineState>()(
  persist(
    (set, get) => ({
      insights: [],
      creditCards: [],
      debts: [],
      debtPlan: null,
      playbookProgress: [],
      seenTips: [],
      netWorthSnapshots: [],
      settings: {
        showInsights: true,
        showDailyTips: true,
        adviceTone: 'gentle',
      },
      constants: DEFAULT_FINANCE_CONSTANTS,
      isInitialized: false,

      initialize: () => {
        if (get().isInitialized) return;
        set({ isInitialized: true });
      },

      addInsight: (newInsight) => set(state => {
        if (state.insights.some(i => i.id === newInsight.id && !i.dismissed)) return state;
        return {
          insights: [{
            ...newInsight,
            dismissed: false,
            dismissedAt: null,
            createdAt: new Date().toISOString()
          }, ...state.insights]
        };
      }),

      dismissInsight: (id) => set(state => ({
        insights: state.insights.map(i => i.id === id ? { ...i, dismissed: true, dismissedAt: new Date().toISOString() } : i)
      })),

      addCreditCard: (card) => set(state => ({
        creditCards: [...state.creditCards, { ...card, id: crypto.randomUUID(), lastUpdated: new Date().toISOString() }]
      })),

      updateCreditCard: (id, updates) => set(state => ({
        creditCards: state.creditCards.map(c => c.id === id ? { ...c, ...updates, lastUpdated: new Date().toISOString() } : c)
      })),

      deleteCreditCard: (id) => set(state => ({
        creditCards: state.creditCards.filter(c => c.id !== id)
      })),

      addDebt: (debt) => set(state => ({
        debts: [...state.debts, { ...debt, id: crypto.randomUUID() }]
      })),

      updateDebt: (id, updates) => set(state => ({
        debts: state.debts.map(d => d.id === id ? { ...d, ...updates } : d)
      })),

      deleteDebt: (id) => set(state => ({
        debts: state.debts.filter(d => d.id !== id)
      })),

      setDebtPlan: (debtPlan) => set({ debtPlan }),

      updatePlaybookStep: (playbookId, stepNumber, completed) => set(state => {
        const existing = state.playbookProgress.find(p => p.playbookId === playbookId);
        let newProgress;
        
        if (existing) {
          const steps = completed 
            ? [...new Set([...existing.completedSteps, stepNumber])]
            : existing.completedSteps.filter(s => s !== stepNumber);
          
          const playbook = SEED_PLAYBOOKS.find(p => p.id === playbookId);
          const isFinished = playbook && steps.length === playbook.steps.length;

          newProgress = state.playbookProgress.map(p => p.playbookId === playbookId ? {
            ...p,
            completedSteps: steps,
            completedAt: isFinished ? new Date().toISOString() : null
          } : p);
        } else {
          newProgress = [...state.playbookProgress, {
            playbookId,
            startedAt: new Date().toISOString(),
            completedSteps: completed ? [stepNumber] : [],
            completedAt: null,
            active: true
          }];
        }
        return { playbookProgress: newProgress };
      }),

      markTipSeen: (id) => set(state => ({
        seenTips: [...new Set([...state.seenTips, id])]
      })),

      addNetWorthSnapshot: (snap) => set(state => ({
        netWorthSnapshots: [...state.netWorthSnapshots, { ...snap, id: crypto.randomUUID() }].sort((a,b) => a.date.localeCompare(b.date))
      })),

      updateSettings: (settings) => set(state => ({ settings: { ...state.settings, ...settings } })),
      updateConstants: (constants) => set(state => ({ constants: { ...state.constants, ...constants } })),
    }),
    {
      name: 'finance-engine-storage-v1',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
