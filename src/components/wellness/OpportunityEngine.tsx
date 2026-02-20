
'use client';

import { useEffect, useMemo } from 'react';
import { useWellnessData } from '@/hooks/use-wellness-data';
import { useFinanceEngine } from '@/hooks/use-finance-engine';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, TrendingDown, Zap, ShieldAlert, Info, X, ArrowRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { format, subMonths, isWithinInterval, startOfMonth, endOfMonth, parseISO, differenceInDays } from 'date-fns';
import { calculateFutureValue } from '@/lib/finance-utils';
import { cn } from '@/lib/utils';

export function OpportunityEngine() {
  const { transactions, assets, subscriptions: wellnessSubs } = useWellnessData();
  const { 
    insights, addInsight, dismissInsight, constants, 
    settings, markTipSeen, seenTips, creditCards 
  } = useFinanceEngine();

  // 1. Core Logic: Run whenever dependencies change
  useEffect(() => {
    if (!settings.showInsights) return;

    const now = new Date();
    
    // --- Signal A: Lazy Cash ---
    const totalCash = Object.entries(assets)
      .filter(([name]) => name.toLowerCase().includes('cash') || name.toLowerCase().includes('checking'))
      .reduce((s, [_, v]) => s + v, 0);

    const last3Months = { start: subMonths(now, 3), end: now };
    const totalOutflow = transactions
      .filter(t => t.type === 'expense' && isWithinInterval(parseISO(t.date), last3Months))
      .reduce((s, t) => s + t.amount, 0);
    const avgMonthlySpend = totalOutflow / 3;

    if (totalCash > (avgMonthlySpend * 2)) {
      const excess = totalCash - (avgMonthlySpend * 1.5);
      const monthlyErosion = (excess * constants.assumedInflationRate) / 12;
      const potentialYield = (excess * constants.assumedHYSARate) / 12;

      addInsight({
        id: 'lazy-cash',
        type: 'alert',
        title: 'Idle Cash Detected',
        summary: `You have $${Math.round(excess).toLocaleString()} sitting in low-yield accounts. Inflation is eroding $${monthlyErosion.toFixed(2)}/month of purchasing power.`,
        severity: 'warning',
        triggerSignal: 'checking_balance_high',
        metadata: { excess, potentialYield }
      });
    }

    // --- Signal B: Credit Utilization Window ---
    creditCards.forEach(card => {
      const utilization = card.balance / card.limit;
      const todayDay = now.getDate();
      const daysUntilStatement = (card.statementDay - todayDay + 31) % 31;

      if (utilization > 0.10 && daysUntilStatement <= 5 && daysUntilStatement >= 0) {
        const targetPaydown = card.balance - (card.limit * 0.09);
        addInsight({
          id: `credit-util-${card.id}`,
          type: 'alert',
          title: `Credit Shield: ${card.name}`,
          summary: `Your statement closes in ${daysUntilStatement} days. Pay down $${Math.round(targetPaydown)} to report <10% utilization.`,
          severity: 'urgent',
          triggerSignal: 'statement_approaching',
          metadata: { cardId: card.id, targetPaydown }
        });
      }
    });

    // --- Signal C: Subscription Bloat ---
    const totalSubs = wellnessSubs.filter(s => s.active).reduce((s, sub) => s + sub.amount, 0);
    if (totalSubs > constants.subscriptionWarningThresholdMonthly) {
      addInsight({
        id: 'sub-bloat',
        type: 'nudge',
        title: 'Subscription Efficiency',
        summary: `You spend $${Math.round(totalSubs)}/month on recurring services. Our engine predicts a 10-year wealth impact of $${Math.round(calculateFutureValue(totalSubs)).toLocaleString()}.`,
        severity: 'info',
        triggerSignal: 'total_subs_high'
      });
    }

  }, [transactions, assets, wellnessSubs, creditCards, settings.showInsights, constants, addInsight]);

  const activeInsights = useMemo(() => 
    insights.filter(i => !i.dismissed).slice(0, 3), 
  [insights]);

  if (!settings.showInsights || activeInsights.length === 0) return null;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Strategic Insights</h3>
        </div>
        <Badge variant="outline" className="text-[10px] uppercase bg-primary/5 border-primary/20">Alpha Logic v1.0</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeInsights.map((insight) => (
          <Card key={insight.id} className={cn(
            "relative group transition-all hover:shadow-md border-primary/10 overflow-hidden",
            insight.severity === 'urgent' && "border-red-500/30 bg-red-500/5",
            insight.severity === 'warning' && "border-amber-500/30 bg-amber-500/5"
          )}>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => dismissInsight(insight.id)}
            >
              <X className="w-3 h-3" />
            </Button>
            
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center gap-2 mb-1">
                {insight.severity === 'urgent' ? <ShieldAlert className="w-4 h-4 text-red-600" /> : 
                 insight.severity === 'warning' ? <Zap className="w-4 h-4 text-amber-600" /> :
                 <Info className="w-4 h-4 text-primary" />}
                <CardTitle className="text-sm font-bold">{insight.title}</CardTitle>
              </div>
              <CardDescription className="text-xs text-foreground leading-relaxed">
                {insight.summary}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-[10px] text-muted-foreground italic mb-3">
                Educational information only — not personalized financial advice.
              </p>
              <Button variant="link" className="p-0 h-auto text-[10px] font-black uppercase text-primary gap-1 group-hover:gap-2 transition-all">
                Act on Insight <ArrowRight className="w-3 h-3" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
