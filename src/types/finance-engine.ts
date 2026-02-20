
export type InsightSeverity = 'info' | 'warning' | 'urgent';
export type InsightType = 'alert' | 'tip' | 'nudge' | 'playbook-trigger';

export interface FinancialInsight {
  id: string;
  type: InsightType;
  title: string;
  summary: string;
  severity: InsightSeverity;
  triggerSignal: string;
  dismissed: boolean;
  dismissedAt: string | null;
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface CreditCard {
  id: string;
  name: string;
  limit: number;
  balance: number;
  statementDay: number;
  dueDay: number;
  lastUpdated: string;
}

export interface Debt {
  id: string;
  name: string;
  balance: number;
  apr: number; // Decimal, e.g. 0.24 for 24%
  minimumPayment: number;
  type: 'credit-card' | 'loan' | 'other';
}

export interface DebtPlan {
  strategy: 'avalanche' | 'snowball';
  extraMonthlyPayment: number;
  projectedPayoffDate: string;
  projectedTotalInterest: number;
}

export interface PlaybookStep {
  stepNumber: number;
  title: string;
  explanation: string;
  actionType: 'read' | 'toggle-setting' | 'set-goal' | 'external-link';
  completed: boolean;
}

export interface Playbook {
  id: string;
  name: string;
  description: string;
  category: 'debt' | 'savings' | 'credit' | 'budgeting' | 'investing-basics';
  steps: PlaybookStep[];
  estimatedMinutes: number;
  tags: string[];
}

export interface UserPlaybookProgress {
  playbookId: string;
  startedAt: string;
  completedSteps: number[];
  completedAt: string | null;
  active: boolean;
}

export interface FinancialTip {
  id: string;
  title: string;
  body: string;
  category: string;
  applicableWhen: string;
  priority: number;
}

export interface FinanceConstants {
  assumedInflationRate: number;
  assumedHYSARate: number;
  assumedMarketReturn: number;
  defaultUtilizationThreshold: number;
  subscriptionWarningThresholdMonthly: number;
}

export interface NetWorthSnapshot {
  id: string;
  date: string;
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  accountBreakdown: Record<string, number>;
}
