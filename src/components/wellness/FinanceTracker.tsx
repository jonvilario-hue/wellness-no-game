
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
    Wallet, PlusCircle, TrendingUp, Target, Bell, 
    DollarSign, Info, AlertCircle, Sparkles,
    Calendar, ShoppingCart, Utensils, Car, Tv, CreditCard,
    Home, Zap, Heart, GraduationCap, Box, Trash2, ArrowUpRight, ArrowDownRight,
    Smile, Frown, Meh, Download, ShieldCheck
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { cn } from '@/lib/utils';
import { SynergyPanel } from './SynergyPanel';

type Transaction = {
    id: string;
    amount: number;
    category: string;
    merchant: string;
    date: string;
    type: 'income' | 'expense';
    note?: string;
    moodTag?: 'happy' | 'neutral' | 'stressed';
};

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
    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: '1', amount: 15.50, category: 'dining', merchant: 'Coffee Shop', date: '2024-08-10', type: 'expense', moodTag: 'stressed', note: 'Impulse buy' },
        { id: '2', amount: 2500, category: 'Salary', merchant: 'Employer Inc', date: '2024-08-01', type: 'income' },
    ]);
    const [budgets] = useState({ groceries: 400, dining: 200, entertainment: 150 });
    const [showAdd, setShowAdd] = useState(false);

    // Form State
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('expense');
    const [category, setCategory] = useState('misc');
    const [merchant, setMerchant] = useState('');
    const [mood, setMood] = useState<'happy' | 'neutral' | 'stressed' | undefined>();

    const stats = useMemo(() => {
        const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        return { income, expense, net: income - expense };
    }, [transactions]);

    const handleAdd = () => {
        if (!amount || !merchant) return;
        const newTx: Transaction = {
            id: Math.random().toString(),
            amount: parseFloat(amount),
            type,
            category,
            merchant,
            date: new Date().toISOString().split('T')[0],
            moodTag: mood,
        };
        setTransactions([newTx, ...transactions]);
        setShowAdd(false);
        setAmount('');
        setMerchant('');
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Header Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-primary/5 border-primary/10">
                    <CardHeader className="p-4 pb-0">
                        <CardDescription className="text-[10px] font-bold uppercase tracking-wider">Net Balance</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-1">
                        <p className={cn("text-2xl font-black", stats.net >= 0 ? "text-green-600" : "text-destructive")}>
                            ${stats.net.toLocaleString()}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="p-4 pb-0">
                        <CardDescription className="text-[10px] font-bold uppercase tracking-wider">Income</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-1 flex items-center justify-between">
                        <p className="text-xl font-bold text-green-600">${stats.income.toLocaleString()}</p>
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="p-4 pb-0">
                        <CardDescription className="text-[10px] font-bold uppercase tracking-wider">Expenses</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-1 flex items-center justify-between">
                        <p className="text-xl font-bold text-destructive">${stats.expense.toLocaleString()}</p>
                        <ArrowDownRight className="w-4 h-4 text-destructive" />
                    </CardContent>
                </Card>
            </div>

            <SynergyPanel />

            <Tabs defaultValue="overview">
                <div className="flex justify-between items-center mb-4">
                    <TabsList className="h-8 bg-muted/50 p-1">
                        <TabsTrigger value="overview" className="text-xs px-3">Overview</TabsTrigger>
                        <TabsTrigger value="history" className="text-xs px-3">History</TabsTrigger>
                        <TabsTrigger value="goals" className="text-xs px-3">Goals</TabsTrigger>
                    </TabsList>
                    <Button size="sm" onClick={() => setShowAdd(!showAdd)} className="h-8 gap-2">
                        <PlusCircle className="w-4 h-4" />
                        Log Transaction
                    </Button>
                </div>

                <TabsContent value="overview" className="space-y-6">
                    {showAdd && (
                        <Card className="border-primary/20 animate-in slide-in-from-top-2 duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-base">Quick Entry</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-bold uppercase">Amount</Label>
                                        <Input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-bold uppercase">Merchant</Label>
                                        <Input placeholder="Starbucks, Rent, etc." value={merchant} onChange={e => setMerchant(e.target.value)} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-bold uppercase">Category</Label>
                                        <Select value={category} onValueChange={setCategory}>
                                            <SelectTrigger className="h-10">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {defaultCategories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-bold uppercase">Mood (Optional)</Label>
                                        <div className="flex gap-2">
                                            <Button variant={mood === 'happy' ? 'default' : 'outline'} size="icon" className="flex-1" onClick={() => setMood('happy')}><Smile className="w-4 h-4"/></Button>
                                            <Button variant={mood === 'neutral' ? 'default' : 'outline'} size="icon" className="flex-1" onClick={() => setMood('neutral')}><Meh className="w-4 h-4"/></Button>
                                            <Button variant={mood === 'stressed' ? 'default' : 'outline'} size="icon" className="flex-1" onClick={() => setMood('stressed')}><Frown className="w-4 h-4"/></Button>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full" onClick={handleAdd}>Save Transaction</Button>
                            </CardContent>
                        </Card>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Budget Progress */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Target className="w-4 h-4 text-primary" />
                                    Monthly Budgets
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                {Object.entries(budgets).map(([catId, limit]) => {
                                    const spend = transactions
                                        .filter(t => t.category === catId && t.type === 'expense')
                                        .reduce((s, t) => s + t.amount, 0);
                                    const percent = Math.min(100, (spend / limit) * 100);
                                    const catInfo = defaultCategories.find(c => c.id === catId);
                                    return (
                                        <div key={catId} className="space-y-1.5">
                                            <div className="flex justify-between items-end">
                                                <span className="text-xs font-bold flex items-center gap-2">
                                                    {catInfo?.name}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground">${spend} of ${limit}</span>
                                            </div>
                                            <Progress value={percent} className={cn("h-1.5", percent > 90 ? "[&>div]:bg-destructive" : "")} />
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>

                        {/* Recent Insights */}
                        <Card className="bg-primary/5 border-primary/10">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                    Behavioral Insights
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-3 bg-background rounded-lg border text-xs flex gap-3">
                                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                                    <p>Subscription creep detected: You have <span className="font-bold">3 new streaming services</span> this month. Total: $42/mo.</p>
                                </div>
                                <div className="p-3 bg-background rounded-lg border text-xs flex gap-3">
                                    <Info className="w-4 h-4 text-primary shrink-0" />
                                    <p>Weekend spending is <span className="font-bold text-primary">2.4x higher</span> than weekdays. Most of this is 'Stressed' mood-tagged dining.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="history">
                    <Card>
                        <CardContent className="p-0">
                            {transactions.map(tx => (
                                <div key={tx.id} className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-muted/30 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("p-2 rounded-lg", tx.type === 'income' ? "bg-green-500/10 text-green-600" : "bg-primary/10 text-primary")}>
                                            <DollarSign className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">{tx.merchant}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{tx.category} • {tx.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={cn("text-sm font-black", tx.type === 'income' ? "text-green-600" : "text-foreground")}>
                                            {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                                        </p>
                                        {tx.moodTag && (
                                            <Badge variant="outline" className="text-[8px] h-4 py-0 px-1 border-primary/20 text-primary/60">
                                                {tx.moodTag}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="goals">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-base">Emergency Fund</CardTitle>
                                <CardDescription className="text-xs">Target: $10,000 by Dec 2024</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center">
                                    <p className="text-2xl font-black">$4,200 <span className="text-sm font-normal text-muted-foreground">/ $10,000</span></p>
                                    <Progress value={42} className="h-3 mt-2" />
                                </div>
                                <div className="p-3 bg-muted/50 rounded-lg text-[10px] leading-relaxed">
                                    <span className="font-bold text-primary flex items-center gap-1 mb-1">
                                        <TrendingUp className="w-3 h-3" /> PROJECTION
                                    </span>
                                    At your current savings rate, you will hit this goal in <span className="font-bold">February 2025</span>. 
                                    Reducing dining out by $50/mo moves this to <span className="font-bold text-green-600">December 2024</span>.
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Privacy Section */}
            <Card className="bg-muted/20 border-dashed">
                <CardHeader>
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                        Data & Privacy
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-xs gap-2">
                        <Download className="w-3 h-3" /> Export CSV
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs gap-2 text-destructive border-destructive/20 hover:bg-destructive/5">
                        <Trash2 className="w-3 h-3" /> Delete All Records
                    </Button>
                </CardContent>
                <CardFooter>
                    <p className="text-[10px] text-muted-foreground italic">Disclaimer: This is a financial tracking tool only. We do not provide financial advice. Consult a professional for major decisions.</p>
                </CardFooter>
            </Card>
        </div>
    );
}
