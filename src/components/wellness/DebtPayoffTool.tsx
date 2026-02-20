'use client';

import { useState, useMemo } from 'react';
import { useFinanceEngine } from '@/hooks/use-finance-engine';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ArrowRight, Calculator, TrendingDown, PiggyBank, PlusCircle, Trash2, SlidersHorizontal, Info, ShieldAlert } from 'lucide-react';
import { calculateMonthsToPayoff, calculateTotalInterest } from '@/lib/finance-utils';
import { cn } from '@/lib/utils';

export function DebtPayoffTool() {
  const { debts, addDebt, updateDebt, deleteDebt, setDebtPlan, debtPlan } = useFinanceEngine();
  const [extraPayment, setExtraPayment] = useState('100');
  const [isAdding, setIsAddOpen] = useState(false);

  // New Debt Form
  const [newName, setName] = useState('');
  const [newBal, setBal] = useState('');
  const [newApr, setApr] = useState('');
  const [newMin, setMin] = useState('');

  const handleAdd = () => {
    addDebt({
      name: newName,
      balance: parseFloat(newBal),
      apr: parseFloat(newApr) / 100,
      minimumPayment: parseFloat(newMin),
      type: 'credit-card'
    });
    setIsAddOpen(false);
    setName(''); setBal(''); setApr(''); setMin('');
  };

  const strategies = useMemo(() => {
    if (debts.length === 0) return null;

    const extra = parseFloat(extraPayment) || 0;
    
    const avalanche = [...debts].sort((a, b) => b.apr - a.apr);
    const snowball = [...debts].sort((a, b) => a.balance - b.balance);

    const calculateTimeline = (sortedDebts: typeof debts) => {
      let totalInterest = 0;
      let totalMonths = 0;
      // Simplified: Assume extra goes to the first priority item
      sortedDebts.forEach((d, i) => {
        const payment = d.minimumPayment + (i === 0 ? extra : 0);
        totalInterest += calculateTotalInterest(d.balance, d.apr, payment);
        totalMonths = Math.max(totalMonths, calculateMonthsToPayoff(d.balance, d.apr, payment));
      });
      return { totalInterest, totalMonths };
    };

    return {
      avalanche: calculateTimeline(avalanche),
      snowball: calculateTimeline(snowball)
    };
  }, [debts, extraPayment]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center px-1">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">Debt Reality Engine</h2>
          <p className="text-sm text-muted-foreground">Compare payoff mechanics and visualize interest saves.</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="gap-2">
          <PlusCircle className="w-4 h-4" /> Add Account
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Account List */}
        <div className="lg:col-span-2 space-y-4">
          {debts.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed rounded-2xl bg-muted/20">
              <Calculator className="w-12 h-12 text-muted-foreground opacity-20 mx-auto mb-4" />
              <p className="font-bold text-muted-foreground">No debt accounts tracked.</p>
              <p className="text-xs text-muted-foreground mt-1">Add your high-interest cards to see payoff projections.</p>
            </div>
          ) : (
            debts.map(debt => {
              const interest = calculateTotalInterest(debt.balance, debt.apr, debt.minimumPayment);
              const months = calculateMonthsToPayoff(debt.balance, debt.apr, debt.minimumPayment);
              return (
                <Card key={debt.id} className="border-primary/5 hover:border-primary/20 transition-all">
                  <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-base truncate">{debt.name}</h4>
                        <Badge variant="secondary" className="text-[10px] font-black h-5">{Math.round(debt.apr * 100)}% APR</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground uppercase font-black tracking-widest">
                        Balance: ${debt.balance.toLocaleString()} • Min: ${debt.minimumPayment}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right w-full sm:w-auto">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Interest Penalty</p>
                      <p className="text-lg font-black text-red-500">${Math.round(interest).toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">{Math.floor(months/12)}y {months%12}m to clear</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteDebt(debt.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Right: Strategy Simulation */}
        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/10">
            <CardHeader>
              <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary" /> Strategy Simulator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-muted-foreground">Extra Monthly Payment ($)</Label>
                <Input type="number" value={extraPayment} onChange={e => setExtraPayment(e.target.value)} className="font-bold text-lg" />
              </div>

              {strategies && (
                <div className="space-y-4">
                  <div className="p-4 bg-background border rounded-xl space-y-3">
                    <div className="flex justify-between items-center">
                      <h5 className="text-xs font-bold text-primary flex items-center gap-2">
                        <Zap className="w-3 h-3" /> Debt Avalanche
                      </h5>
                      <Badge className="bg-primary text-[9px]">BEST MATH</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <p className="text-[8px] font-black uppercase opacity-60">Payoff Date</p>
                        <p className="text-xs font-bold">{Math.floor(strategies.avalanche.totalMonths / 12)}y {strategies.avalanche.totalMonths % 12}m</p>
                      </div>
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <p className="text-[8px] font-black uppercase opacity-60">Total Interest</p>
                        <p className="text-xs font-bold text-red-500">${Math.round(strategies.avalanche.totalInterest).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-background border border-dashed rounded-xl space-y-3">
                    <div className="flex justify-between items-center">
                      <h5 className="text-xs font-bold flex items-center gap-2">
                        <PiggyBank className="w-3 h-3 text-emerald-500" /> Debt Snowball
                      </h5>
                      <Badge variant="outline" className="text-[9px]">EASIEST START</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <p className="text-[8px] font-black uppercase opacity-60">Payoff Date</p>
                        <p className="text-xs font-bold">{Math.floor(strategies.snowball.totalMonths / 12)}y {strategies.snowball.totalMonths % 12}m</p>
                      </div>
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <p className="text-[8px] font-black uppercase opacity-60">Total Interest</p>
                        <p className="text-xs font-bold">${Math.round(strategies.snowball.totalInterest).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-3">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-[10px] text-muted-foreground leading-relaxed italic">
              "Educational information only — not personalized financial advice. Consult a qualified financial advisor for decisions specific to your situation."
            </p>
          </div>
        </div>
      </div>

      <Dialog open={isAdding} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Debt Account</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase">Account Name</Label>
              <Input value={newName} onChange={e => setName(e.target.value)} placeholder="e.g. Sapphire Preferred" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase">Balance ($)</Label>
                <Input type="number" value={newBal} onChange={e => setBal(e.target.value)} placeholder="0.00" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase">APR (%)</Label>
                <Input type="number" value={newApr} onChange={e => setApr(e.target.value)} placeholder="24.99" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase">Minimum Monthly Payment ($)</Label>
              <Input type="number" value={newMin} onChange={e => setMin(e.target.value)} placeholder="35" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={!newName || !newBal}>Add to Strategy</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}