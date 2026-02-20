
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
    PlusCircle, Wallet, Target, DollarSign, Sparkles, 
    ShoppingCart, Utensils, Car, Tv, CreditCard,
    Home, Zap, Heart, GraduationCap, Box, Trash2,
    Save, X, Calendar as CalendarIcon, Download, History, PiggyBank,
    AlertCircle, Layers, Bell, CheckCircle2, RefreshCw, BarChart3,
    TrendingUp, Calculator, ShieldCheck, Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWellnessData } from '@/hooks/use-wellness-data';
import { useFinanceEngine } from '@/hooks/use-finance-engine';
import { format, subDays, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { WellnessActivityCalendar } from './WellnessActivityCalendar';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { OpportunityEngine } from './OpportunityEngine';
import { PlaybookLibrary } from './PlaybookLibrary';
import { DebtPayoffTool } from './DebtPayoffTool';
import { CreditOptimizer } from './CreditOptimizer';
import { FinanceTips } from './FinanceTips';
import { calculateFutureValue } from '@/lib/finance-utils';

const defaultCategories = [
    { id: 'groceries', name: 'Groceries', icon: ShoppingCart },
    { id: 'dining', name: 'Dining Out', icon: Utensils },
    { id: 'transport', name: 'Transportation', icon: Car },
    { id: 'entertainment', name: 'Entertainment', icon: Tv },
    { id: 'subscriptions', name: 'Subscriptions', icon: CreditCard },
    { id: 'housing', name: 'Housing', icon: Home },
    { id: 'utilities', name: 'Utilities', icon: Zap },
    { id: 'health', name: 'Health', icon: Heart },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'misc', name: 'Miscellaneous', icon: Box },
];

export function FinanceTracker() {
    const { 
        transactions = [], 
        addTransaction, 
        deleteTransaction, 
        subscriptions = [], 
        assets = {}, 
        budgets = [], 
        savingsGoals = [], 
        contributeToGoal,
        envelopes = [], 
        updateEnvelope 
    } = useWellnessData();
    
    const { 
      netWorthSnapshots, addNetWorthSnapshot, settings, updateSettings, constants 
    } = useFinanceEngine();

    const [activeTab, setActiveTab] = useState('overview');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [isImporting, setIsImporting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [showFV, setShowFV] = useState(false);
    const { toast } = useToast();

    // Form States
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('expense');
    const [category, setCategory] = useState('misc');
    const [merchant, setMerchant] = useState('');

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const stats = useMemo(() => {
        if (!isMounted) return { income: 0, expense: 0, net: 0, liquidAssets: 0, monthSpend: 0 };

        const income = (transactions || []).filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const expense = (transactions || []).filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        const net = income - expense;
        const liquidAssets = Object.values(assets || {}).reduce((a, b) => a + b, 0);
        
        const currentMonth = { start: startOfMonth(new Date()), end: endOfMonth(new Date()) };
        const monthSpend = (transactions || [])
            .filter(t => t.type === 'expense' && isWithinInterval(parseISO(t.date), currentMonth))
            .reduce((s, t) => s + t.amount, 0);

        return { income, expense, net, liquidAssets, monthSpend };
    }, [transactions, assets, isMounted]);

    const handleAdd = () => {
        if (!amount || !merchant) return;
        addTransaction({
            amount: parseFloat(amount),
            type,
            category,
            merchant,
            date: format(selectedDate, 'yyyy-MM-dd')
        });
        setAmount('');
        setMerchant('');
        toast({ title: "Transaction Logged", variant: "success" });
    };

    const handleTakeSnapshot = () => {
      const totalAssets = stats.liquidAssets;
      const totalLiabilities = 0; // Simplified for MVP
      addNetWorthSnapshot({
        date: new Date().toISOString(),
        totalAssets,
        totalLiabilities,
        netWorth: totalAssets - totalLiabilities,
        accountBreakdown: assets
      });
      toast({ title: "Snapshot Recorded", variant: 'success' });
    };

    if (!isMounted) return null;

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Financial Laboratory</h2>
                    <p className="text-sm text-muted-foreground italic">"Architecting wealth through cognitive clarity."</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none h-10 gap-2 border-primary/20" onClick={handleTakeSnapshot}>
                        <Camera className="w-4 h-4" /> Snapshot
                    </Button>
                    <Button size="sm" className="flex-1 sm:flex-none h-10 gap-2 shadow-lg" onClick={() => setActiveTab('log')}>
                        <PlusCircle className="w-4 h-4" /> Log Pulse
                    </Button>
                </div>
            </div>

            <OpportunityEngine />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-muted/50 p-1 mb-8 grid grid-cols-2 md:flex md:w-fit h-auto gap-1">
                    <TabsTrigger value="overview" className="text-xs uppercase font-bold px-6">Overview</TabsTrigger>
                    <TabsTrigger value="log" className="text-xs uppercase font-bold px-6">Logs</TabsTrigger>
                    <TabsTrigger value="credit" className="text-xs uppercase font-bold px-6">Credit Optimizer</TabsTrigger>
                    <TabsTrigger value="debt" className="text-xs uppercase font-bold px-6">Debt Strategy</TabsTrigger>
                    <TabsTrigger value="playbooks" className="text-xs uppercase font-bold px-6">Playbooks</TabsTrigger>
                    <TabsTrigger value="settings" className="text-xs uppercase font-bold px-6">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card className="bg-primary border-none text-primary-foreground">
                            <CardContent className="p-6">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Asset Liquidity</p>
                                <p className="text-3xl font-black mt-1">${stats.liquidAssets.toLocaleString()}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-primary/5 border-primary/10">
                            <CardContent className="p-6">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Monthly Burn</p>
                                <p className="text-3xl font-black mt-1 text-destructive">${stats.monthSpend.toLocaleString()}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-primary/5 border-primary/10">
                            <CardContent className="p-6">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Subscriptions</p>
                                <p className="text-3xl font-black mt-1 text-foreground">{subscriptions.filter(s => s.active).length}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-primary/5 border-primary/10 flex flex-col justify-center p-6">
                            <FinanceTips />
                        </Card>
                    </div>

                    <Card className="border-primary/10 overflow-hidden">
                        <CardHeader className="bg-primary/[0.02] border-b pb-4">
                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-primary" /> Equity Growth Curve
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-64 pt-8">
                            {netWorthSnapshots.length < 2 ? (
                              <div className="flex items-center justify-center h-full opacity-30 italic text-xs">Need 2+ snapshots to plot growth</div>
                            ) : (
                              <ResponsiveContainer width="100%" height="100%">
                                  <AreaChart data={netWorthSnapshots}>
                                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                                      <XAxis dataKey="date" fontSize={10} axisLine={false} tickLine={false} tickFormatter={d => format(parseISO(d), 'MMM')} />
                                      <YAxis fontSize={10} axisLine={false} tickLine={false} />
                                      <Tooltip contentStyle={{ borderRadius: '12px' }} />
                                      <Area type="monotone" dataKey="netWorth" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.1} strokeWidth={3} />
                                  </AreaChart>
                              </ResponsiveContainer>
                            )}
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-primary/10">
                            <CardHeader className="flex flex-row items-center justify-between">
                              <CardTitle className="text-base">Recurring Liabilities</CardTitle>
                              <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold uppercase" onClick={() => setShowFV(!showFV)}>
                                {showFV ? 'View Monthly' : 'View 10-Year Opportunity Cost'}
                              </Button>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {subscriptions.filter(s => s.active).sort((a,b) => b.amount - a.amount).map(s => {
                                    const fv = calculateFutureValue(s.amount, constants.assumedMarketReturn);
                                    return (
                                      <div key={s.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg border border-primary/5 group hover:border-primary/20 transition-all">
                                          <div className="flex items-center gap-3">
                                              <Bell className="w-4 h-4 text-primary" />
                                              <div>
                                                  <p className="text-sm font-bold">{s.name}</p>
                                                  <p className="text-[10px] text-muted-foreground uppercase">{s.active ? 'Active' : 'Paused'}</p>
                                              </div>
                                          </div>
                                          <div className="text-right">
                                            <p className="font-black text-sm">{showFV ? `$${Math.round(fv).toLocaleString()}` : `$${s.amount}`}</p>
                                            <p className="text-[8px] font-bold text-muted-foreground uppercase">{showFV ? 'Projected 10y Value' : 'Per Month'}</p>
                                          </div>
                                      </div>
                                    );
                                })}
                            </CardContent>
                        </Card>
                        
                        <Card className="border-primary/10">
                            <CardHeader><CardTitle className="text-base">Envelopes & Budgets</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                {envelopes.map(env => (
                                    <div key={env.id} className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold">
                                            <span>{env.name}</span>
                                            <span>${env.balance} / ${env.limit}</span>
                                        </div>
                                        <Progress value={(env.balance / env.limit) * 100} className="h-1.5" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="log">
                    <Card className="border-primary/20 bg-primary/[0.02] mb-8">
                        <CardHeader>
                            <CardTitle className="text-lg">Manual Pulse Entry</CardTitle>
                            <CardDescription>Log a new transaction to the local ledger.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase text-muted-foreground">Amount ($)</Label>
                                <Input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase text-muted-foreground">Merchant</Label>
                                <Input placeholder="Vendor name" value={merchant} onChange={e => setMerchant(e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase text-muted-foreground">Category</Label>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {defaultCategories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-end">
                                <Button className="w-full font-bold h-10 gap-2" onClick={handleAdd}>
                                    <Save className="w-4 h-4" /> Save Log
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    <WellnessActivityCalendar categoryFilter="Finance" />
                </TabsContent>

                <TabsContent value="credit">
                    <CreditOptimizer />
                </TabsContent>

                <TabsContent value="debt">
                    <DebtPayoffTool />
                </TabsContent>

                <TabsContent value="playbooks">
                    <PlaybookLibrary />
                </TabsContent>

                <TabsContent value="settings">
                    <div className="max-w-2xl mx-auto space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Advice Logic Configuration</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div className="space-y-0.5">
                                        <Label>Show Strategic Insights</Label>
                                        <p className="text-xs text-muted-foreground">Enable the Opportunity Engine calculations.</p>
                                    </div>
                                    <Badge onClick={() => updateSettings({ showInsights: !settings.showInsights })} className="cursor-pointer">
                                        {settings.showInsights ? 'Active' : 'Disabled'}
                                    </Badge>
                                </div>
                                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-3">
                                    <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold uppercase tracking-tight">Compliance Anchor</p>
                                        <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                                            "Educational information only — not personalized financial advice. Consult a qualified financial advisor for decisions specific to your situation."
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
