
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
    Home, Zap, Heart, GraduationCap, Box, Trash2, ArrowUpRight, ArrowDownRight,
    Save, X, Calendar as CalendarIcon, Download, History, PiggyBank,
    AlertCircle, Layers, Bell, CheckCircle2, RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWellnessData } from '@/hooks/use-wellness-data';
import { format, subDays, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { WellnessActivityCalendar } from './WellnessActivityCalendar';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

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
        transactions, addTransaction, deleteTransaction, 
        subscriptions, toggleSubscription, lowEnergyMode, assets, 
        budgets, setBudget, savingsGoals, addSavingsGoal, contributeToGoal,
        bills, addBill, toggleBillPaid, envelopes, updateEnvelope
    } = useWellnessData();
    
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [isImporting, setIsImporting] = useState(false);
    const { toast } = useToast();

    // Form States
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('expense');
    const [category, setCategory] = useState('misc');
    const [merchant, setMerchant] = useState('');

    const stats = useMemo(() => {
        const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        const net = income - expense;
        const liquidAssets = Object.values(assets).reduce((a, b) => a + b, 0);
        
        const currentMonth = { start: startOfMonth(new Date()), end: endOfMonth(new Date()) };
        const monthSpend = transactions
            .filter(t => t.type === 'expense' && isWithinInterval(parseISO(t.date), currentMonth))
            .reduce((s, t) => s + t.amount, 0);

        return { income, expense, net, liquidAssets, monthSpend };
    }, [transactions, assets]);

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

    const handleSimulatedImport = () => {
        setIsImporting(true);
        setTimeout(() => {
            const mocks = [
                { amount: 45.20, merchant: 'Whole Foods', category: 'groceries' },
                { amount: 12.00, merchant: 'Starbucks', category: 'dining' },
                { amount: 850.00, merchant: 'Landlord Inc', category: 'housing' }
            ];
            mocks.forEach(m => addTransaction({ ...m, type: 'expense', date: format(new Date(), 'yyyy-MM-dd') }));
            setIsImporting(false);
            toast({ title: "Import Successful", description: "Synced 3 transactions from simulated bank account." });
        }, 1500);
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-20">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Financial Architecture</h2>
                    <p className="text-sm text-muted-foreground italic">"Wealth is the ability to fully experience life."</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none h-10 gap-2 border-primary/20" onClick={handleSimulatedImport} disabled={isImporting}>
                        {isImporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                        Import Bank
                    </Button>
                    <Button size="sm" className="flex-1 sm:flex-none h-10 gap-2 shadow-lg" onClick={() => setActiveTab('log')}>
                        <PlusCircle className="w-4 h-4" /> Log Expense
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-muted/50 p-1 mb-8 grid grid-cols-2 md:flex md:w-fit h-auto">
                    <TabsTrigger value="overview" className="text-xs uppercase font-bold px-6">Overview</TabsTrigger>
                    <TabsTrigger value="log" className="text-xs uppercase font-bold px-6">Logging</TabsTrigger>
                    <TabsTrigger value="budgets" className="text-xs uppercase font-bold px-6">Budgets</TabsTrigger>
                    <TabsTrigger value="envelopes" className="text-xs uppercase font-bold px-6">Envelopes</TabsTrigger>
                    <TabsTrigger value="wealth" className="text-xs uppercase font-bold px-6">Wealth Goals</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <Card className="bg-primary border-none text-primary-foreground">
                            <CardContent className="p-6">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Liquid Assets</p>
                                <p className="text-3xl font-black mt-1">${stats.liquidAssets.toLocaleString()}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-primary/5 border-primary/10">
                            <CardContent className="p-6">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Monthly Spend</p>
                                <p className="text-3xl font-black mt-1 text-destructive">${stats.monthSpend.toLocaleString()}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-primary/5 border-primary/10">
                            <CardContent className="p-6">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Subscriptions</p>
                                <p className="text-3xl font-black mt-1 text-foreground">{subscriptions.filter(s => s.active).length}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-primary/5 border-primary/10">
                            <CardContent className="p-6">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active Savings</p>
                                <p className="text-3xl font-black mt-1 text-green-600">{savingsGoals.length}</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="border-primary/10 overflow-hidden">
                        <CardHeader className="bg-primary/[0.02] border-b pb-4">
                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                <History className="w-4 h-4 text-primary" /> Net Worth Trajectory
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-64 pt-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={[
                                    { date: 'Jan', val: stats.liquidAssets * 0.8 },
                                    { date: 'Feb', val: stats.liquidAssets * 0.9 },
                                    { date: 'Mar', val: stats.liquidAssets }
                                ]}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                                    <XAxis dataKey="date" fontSize={10} axisLine={false} tickLine={false} />
                                    <YAxis fontSize={10} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ borderRadius: '12px' }} />
                                    <Area type="monotone" dataKey="val" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.1} strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-primary/10">
                            <CardHeader><CardTitle className="text-base">Upcoming Bills</CardTitle></CardHeader>
                            <CardContent className="space-y-2">
                                {subscriptions.filter(s => s.active).map(s => (
                                    <div key={s.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg border border-primary/5">
                                        <div className="flex items-center gap-3">
                                            <Bell className="w-4 h-4 text-primary" />
                                            <div>
                                                <p className="text-sm font-bold">{s.name}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase">Due {s.nextBillingDate || 'Soon'}</p>
                                            </div>
                                        </div>
                                        <p className="font-black text-sm">${s.amount}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                        <Card className="border-primary/10 bg-destructive/[0.02]">
                            <CardHeader><CardTitle className="text-base flex items-center gap-2"><AlertCircle className="w-4 h-4 text-destructive" /> Spending Anomalies</CardTitle></CardHeader>
                            <CardContent className="space-y-2">
                                {transactions.filter(t => t.isAnomaly).map(t => (
                                    <div key={t.id} className="p-3 border border-destructive/20 rounded-lg bg-background">
                                        <p className="text-xs font-bold">{t.merchant} spend is 2.5x higher than average.</p>
                                        <p className="text-[10px] text-muted-foreground mt-1 uppercase">{t.date} • ${t.amount}</p>
                                    </div>
                                ))}
                                {transactions.filter(t => t.isAnomaly).length === 0 && (
                                    <p className="text-sm text-muted-foreground italic text-center py-4">No significant spending deviations detected.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="log" className="space-y-6">
                    <Card className="border-primary/20 bg-primary/[0.02]">
                        <CardHeader>
                            <CardTitle className="text-lg">Manual Pulse Entry</CardTitle>
                            <CardDescription>Log data when bank synchronization is unavailable or for cash transactions.</CardDescription>
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

                <TabsContent value="budgets" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {defaultCategories.slice(0, 6).map(cat => {
                            const budget = budgets.find(b => b.category === cat.id) || { category: cat.id, limit: 500, period: 'monthly' };
                            const spent = transactions
                                .filter(t => t.category === cat.id && t.type === 'expense')
                                .reduce((s, t) => s + t.amount, 0);
                            const percent = Math.min(100, (spent / budget.limit) * 100);
                            
                            return (
                                <Card key={cat.id} className="border-primary/10">
                                    <CardHeader className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-2">
                                                <cat.icon className="w-4 h-4 text-primary" />
                                                <CardTitle className="text-sm font-bold capitalize">{cat.name}</CardTitle>
                                            </div>
                                            <Badge variant="outline" className="text-[9px] h-5">${budget.limit}</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0 space-y-3">
                                        <div className="flex justify-between text-[10px] font-bold">
                                            <span className="text-muted-foreground uppercase">Consumed</span>
                                            <span>${spent.toFixed(0)}</span>
                                        </div>
                                        <Progress value={percent} className={cn("h-1.5", percent > 90 && "[&>div]:bg-destructive")} />
                                    </CardContent>
                                    <CardFooter className="p-2 border-t flex justify-end">
                                        <Button variant="ghost" size="sm" className="h-7 text-[10px] font-black uppercase">Edit Limit</Button>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>
                </TabsContent>

                <TabsContent value="envelopes" className="space-y-6">
                    <Card className="bg-primary/5 border-primary/10">
                        <CardHeader>
                            <CardTitle>Cash Envelopes</CardTitle>
                            <CardDescription>Allocate fixed funds to digital envelopes. Spending draws down the balance.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {envelopes.map(env => (
                                <div key={env.id} className="p-4 bg-background border rounded-xl space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-bold text-sm">{env.name}</h4>
                                        <Badge className="bg-primary text-white">${env.balance}</Badge>
                                    </div>
                                    <div className="space-y-1">
                                        <Progress value={(env.balance / env.limit) * 100} className="h-1" />
                                        <p className="text-[9px] text-muted-foreground text-right uppercase">Limit: ${env.limit}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" className="flex-1 h-8 text-[10px] font-bold" onClick={() => updateEnvelope(env.id, 50)}>Add $50</Button>
                                        <Button size="sm" variant="outline" className="flex-1 h-8 text-[10px] font-bold" onClick={() => updateEnvelope(env.id, -50)}>Spend $50</Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="wealth" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-primary/10">
                            <CardHeader>
                                <CardTitle>Savings Goals</CardTitle>
                                <CardDescription>Target-driven accumulation tracking.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {savingsGoals.map(goal => (
                                    <div key={goal.id} className="space-y-3 p-4 border rounded-xl bg-muted/20">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{goal.icon}</span>
                                                <div>
                                                    <p className="text-sm font-bold">{goal.name}</p>
                                                    <p className="text-[10px] text-muted-foreground uppercase">Target: ${goal.targetAmount}</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" className="h-7 text-primary font-bold" onClick={() => contributeToGoal(goal.id, 100)}>+ $100</Button>
                                        </div>
                                        <Progress value={(goal.currentAmount / goal.targetAmount) * 100} className="h-1.5" />
                                        <div className="flex justify-between text-[10px] font-bold uppercase opacity-60">
                                            <span>${goal.currentAmount}</span>
                                            <span>{Math.round((goal.currentAmount / goal.targetAmount) * 100)}%</span>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full border-dashed h-12" onClick={() => addSavingsGoal({ name: 'Emergency Fund', targetAmount: 5000, icon: '🛡️' })}>
                                    <PlusCircle className="w-4 h-4 mr-2" /> New Goal
                                </Button>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/10">
                            <CardHeader>
                                <CardTitle>Automatic Rules</CardTitle>
                                <CardDescription>Smart logic to accelerate wealth building.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold">Round-Up Rule</p>
                                        <p className="text-[10px] text-muted-foreground uppercase">Spare change to Emergency Fund</p>
                                    </div>
                                    <Badge>Active</Badge>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-dashed">
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold">50/30/20 Shield</p>
                                        <p className="text-[10px] text-muted-foreground uppercase">Enforce allocation splits</p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase">Enable</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
