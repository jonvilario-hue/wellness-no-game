
'use client';

import { useFinanceEngine } from '@/hooks/use-finance-engine';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard as CardIcon, Calendar, TrendingDown, Info, ShieldAlert, PlusCircle, Trash2, Edit, Save } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export function CreditOptimizer() {
  const { creditCards, addCreditCard, deleteCreditCard, updateCreditCard } = useFinanceEngine();
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [limit, setLimit] = useState('');
  const [balance, setBalance] = useState('');
  const [statementDay, setStatementDay] = useState('1');
  const [dueDay, setDueDay] = useState('25');

  const handleAdd = () => {
    addCreditCard({
      name,
      limit: parseFloat(limit),
      balance: parseFloat(balance),
      statementDay: parseInt(statementDay),
      dueDay: parseInt(dueDay)
    });
    setIsAddOpen(false);
    setName(''); setLimit(''); setBalance(''); setStatementDay('1'); setDueDay('25');
  };

  const totalUtil = creditCards.reduce((s, c) => s + c.balance, 0) / creditCards.reduce((s, c) => s + c.limit, 0) || 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center px-1">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">Credit Utilization Lab</h2>
          <p className="text-sm text-muted-foreground">Manage reporting dates to optimize your credit footprint.</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="gap-2 font-bold h-10 shadow-lg">
          <PlusCircle className="w-4 h-4" /> Monitor New Card
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-primary/10 bg-primary/5 p-6 flex flex-col justify-center items-center text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Aggregate Utilization</p>
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
            <svg className="w-full h-full -rotate-90">
              <circle cx="64" cy="64" r="58" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted/20" />
              <circle 
                cx="64" cy="64" r="58" fill="none" stroke="currentColor" strokeWidth="8" 
                strokeDasharray={364} strokeDashoffset={364 - (364 * totalUtil)}
                strokeLinecap="round" className={cn("transition-all duration-1000", totalUtil > 0.3 ? "text-red-500" : totalUtil > 0.1 ? "text-amber-500" : "text-emerald-500")}
              />
            </svg>
            <span className="absolute text-2xl font-black">{Math.round(totalUtil * 100)}%</span>
          </div>
          <Badge variant={totalUtil < 0.1 ? 'default' : 'outline'} className="uppercase text-[9px] font-black">
            {totalUtil < 0.1 ? 'Optimal Elite' : totalUtil < 0.3 ? 'Good Standing' : 'Risk Detected'}
          </Badge>
        </Card>

        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {creditCards.map(card => {
            const util = card.balance / card.limit;
            const isAtRisk = util > 0.1;
            return (
              <Card key={card.id} className="border-primary/5 hover:border-primary/20 transition-all">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary"><CardIcon className="w-4 h-4" /></div>
                      <h4 className="font-bold text-sm">{card.name}</h4>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteCreditCard(card.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold uppercase opacity-60">
                      <span>Utilization</span>
                      <span className={cn(isAtRisk ? "text-amber-600" : "text-emerald-600")}>{Math.round(util * 100)}%</span>
                    </div>
                    <Progress value={util * 100} className={cn("h-1", isAtRisk && "[&>div]:bg-amber-500")} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 bg-muted/30 rounded-lg border border-primary/5">
                      <p className="text-[8px] font-black uppercase text-muted-foreground">Statement Day</p>
                      <p className="text-xs font-bold">{card.statementDay}</p>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-lg border border-primary/5">
                      <p className="text-[8px] font-black uppercase text-muted-foreground">Due Day</p>
                      <p className="text-xs font-bold">{card.dueDay}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none bg-primary/5 shadow-none">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" /> The "Reporting Gap" Secret
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your credit score is calculated using the balance reported on your <b>Statement Date</b>, not the Due Date. If you spend $3,000 and pay it off on the Due Date, the bureau still thinks you are using $3,000 of your limit.
            </p>
            <div className="p-3 bg-background rounded-xl border border-primary/10">
              <p className="text-xs font-bold">Pro Tip: The 15/3 Rule</p>
              <p className="text-[10px] text-muted-foreground mt-1">Make one payment 15 days before your statement, and another 3 days before. This forces a low balance to be reported every month.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-muted/30 shadow-none">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" /> Optimization Warnings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {creditCards.filter(c => c.balance / c.limit > 0.1).length > 0 ? (
              creditCards.filter(c => c.balance / c.limit > 0.1).map(c => (
                <div key={c.id} className="p-3 border border-amber-200 bg-amber-50 rounded-lg text-amber-800 text-[10px] flex items-center gap-2">
                  <TrendingDown className="w-3 h-3" />
                  <span><b>{c.name}:</b> Pay down $${Math.round(c.balance - (c.limit * 0.09))} to reach the 10% elite tier.</span>
                </div>
              ))
            ) : (
              <div className="p-10 text-center opacity-30 italic text-xs">All card utilization levels are optimal.</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Monitor Credit Card</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase">Card Name</Label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Amex Gold" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase">Credit Limit ($)</Label>
                <Input type="number" value={limit} onChange={e => setLimit(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase">Current Balance ($)</Label>
                <Input type="number" value={balance} onChange={e => setBalance(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase">Statement Day (1-31)</Label>
                <Input type="number" min="1" max="31" value={statementDay} onChange={e => setStatementDay(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase">Due Day (1-31)</Label>
                <Input type="number" min="1" max="31" value={dueDay} onChange={e => setDueDay(e.target.value)} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={!name || !limit}>Lock In Monitor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
