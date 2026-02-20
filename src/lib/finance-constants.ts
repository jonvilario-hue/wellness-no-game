
import { FinanceConstants, FinancialTip, Playbook } from '@/types/finance-engine';

export const DEFAULT_FINANCE_CONSTANTS: FinanceConstants = {
  assumedInflationRate: 0.03,
  assumedHYSARate: 0.045,
  assumedMarketReturn: 0.07,
  defaultUtilizationThreshold: 0.10,
  subscriptionWarningThresholdMonthly: 200,
};

export const SEED_PLAYBOOKS: Playbook[] = [
  {
    id: 'pb-1',
    name: 'Stop the Bleeding',
    description: 'Eliminate late fees, overdrafts, and unnecessary recurring costs.',
    category: 'budgeting',
    estimatedMinutes: 15,
    tags: ['essential', 'beginner'],
    steps: [
      { stepNumber: 1, title: 'Subscription Audit', explanation: 'List every recurring charge from the last 3 months. Cancel anything you haven\'t used in 30 days.', actionType: 'read', completed: false },
      { stepNumber: 2, title: 'Autopay Minimums', explanation: 'Set every bill to autopay at least the minimum. This ensures you never pay a late fee or hit your credit score.', actionType: 'toggle-setting', completed: false },
      { stepNumber: 3, title: 'Payday Alignment', explanation: 'Call your utility and card providers to move due dates to the 2nd or 16th—aligning them with your paychecks.', actionType: 'read', completed: false },
      { stepNumber: 4, title: 'Calendar Reminders', explanation: 'Add a recurring event to your calendar 3 days before every major bill is due.', actionType: 'read', completed: false }
    ]
  },
  {
    id: 'pb-2',
    name: 'Build a $1,000 Starter Buffer',
    description: 'Create a foundational safety net to break the cycle of high-interest debt.',
    category: 'savings',
    estimatedMinutes: 10,
    tags: ['emergency-fund', 'beginner'],
    steps: [
      { stepNumber: 1, title: 'The Buffer Target', explanation: 'Identify exactly where this cash will live. A high-yield savings account is best.', actionType: 'set-goal', completed: false },
      { stepNumber: 2, title: 'Automate the Transfer', explanation: 'Set an automatic $25 transfer every Friday. Consistency beats intensity.', actionType: 'toggle-setting', completed: false },
      { stepNumber: 3, title: 'Windfall Capture', explanation: 'Commit to moving 50% of any "found" money (tax returns, gifts, bonuses) directly into this fund.', actionType: 'read', completed: false }
    ]
  },
  {
    id: 'pb-3',
    name: 'Get Out of Credit Card Debt',
    description: 'A tactical approach to eliminating high-interest consumer debt.',
    category: 'debt',
    estimatedMinutes: 20,
    tags: ['debt-payoff', 'intermediate'],
    steps: [
      { stepNumber: 1, title: 'The Debt Inventory', explanation: 'List every card, its balance, and its APR. Facing the numbers is the first win.', actionType: 'read', completed: false },
      { stepNumber: 2, title: 'Pick Your Strategy', explanation: 'Choose Avalanche (math-first) or Snowball (psychology-first). Use the tool in the Debt tab.', actionType: 'read', completed: false },
      { stepNumber: 3, title: 'The Freeze', explanation: 'Remove your credit cards from your digital wallets. Use cash or debit only until the balances are zero.', actionType: 'read', completed: false }
    ]
  },
  {
    id: 'pb-4',
    name: 'Optimize Your Credit Score',
    description: 'Advanced tactics to improve your borrowing power safely.',
    category: 'credit',
    estimatedMinutes: 12,
    tags: ['credit-score', 'advanced'],
    steps: [
      { stepNumber: 1, title: 'Statement vs Due Date', explanation: 'Your issuer reports your balance on the statement date. Pay it down BEFORE this day to lower reported utilization.', actionType: 'read', completed: false },
      { stepNumber: 2, title: 'Bureau Freeze', explanation: 'Prevent identity theft and unauthorized inquiries by freezing your credit at Equifax, Experian, and TransUnion.', actionType: 'external-link', completed: false },
      { stepNumber: 3, title: 'Utilization Guardrails', explanation: 'Set an alert for when any card exceeds 10% of its limit.', actionType: 'toggle-setting', completed: false }
    ]
  },
  {
    id: 'pb-5',
    name: 'Protect Your Identity',
    description: 'Harden your digital and financial perimeter.',
    category: 'investing-basics',
    estimatedMinutes: 10,
    tags: ['security', 'essential'],
    steps: [
      { stepNumber: 1, title: 'Credential Audit', explanation: 'Check HaveIBeenPwned.com for any leaked passwords associated with your bank emails.', actionType: 'external-link', completed: false },
      { stepNumber: 2, title: 'Large Transaction Alerts', explanation: 'Enable push notifications for any transaction over $100 across all accounts.', actionType: 'toggle-setting', completed: false }
    ]
  },
  {
    id: 'pb-6',
    name: 'Optimize Your Paycheck',
    description: 'Ensure your primary income stream is working as hard as you are.',
    category: 'investing-basics',
    estimatedMinutes: 15,
    tags: ['wealth', 'income'],
    steps: [
      { stepNumber: 1, title: '401k Match Check', explanation: 'Are you getting the "free money" from your employer? If they match 3%, you must contribute at least 3%.', actionType: 'read', completed: false },
      { stepNumber: 2, title: 'Withholding Review', explanation: 'A massive tax refund is an interest-free loan to the government. Adjust your W4 to get that cash in your checks instead.', actionType: 'read', completed: false },
      { stepNumber: 3, title: 'Automation on Day 1', explanation: 'Move your savings and bill payments to happen on the same day your direct deposit hits.', actionType: 'toggle-setting', completed: false }
    ]
  }
];

export const SEED_TIPS: FinancialTip[] = [
  { id: 'tip-1', title: 'The 24-Hour Rule', body: 'Wait 24 hours before any non-essential purchase over $50. This stops impulse spending and lets the logical brain take over.', category: 'spending', applicableWhen: 'always', priority: 1 },
  { id: 'tip-2', title: 'Statement vs Due Date', body: 'Your credit score is based on the balance on your STATEMENT date, not your DUE date. Pay early to look like a low-risk borrower.', category: 'credit', applicableWhen: 'always', priority: 2 },
  { id: 'tip-3', title: 'Negotiate Annual Bills', body: 'Insurance, internet, and phone companies count on "laziness tax." Call them once a year to ask for better rates.', category: 'savings', applicableWhen: 'always', priority: 3 },
  { id: 'tip-4', title: 'Audit Subscriptions', body: 'Small monthly charges feel invisible. Check your bank statements quarterly for "ghost" subscriptions you no longer use.', category: 'budgeting', applicableWhen: 'always', priority: 4 },
  { id: 'tip-5', title: 'Hide Your Raise', body: 'When you get a raise, increase your 401k or savings automation by the same amount immediately. Avoid lifestyle creep.', category: 'wealth', applicableWhen: 'always', priority: 5 }
];
