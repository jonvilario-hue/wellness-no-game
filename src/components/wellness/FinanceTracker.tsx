
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
    Smile, Frown, Meh, Download, ShieldCheck, CheckCircle2, X
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { cn } from '@/lib/utils';
import { SynergyPanel } from './SynergyPanel';
import { useWellnessData, type Transaction } from '@/hooks/use-wellness-data';

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
        subscriptions, addSubscription, toggleSubscription,
        lowEnergyMode, featurePhase, assets, liabilities
    } = useWellnessData();
    
    const [showAdd, setShowAdd] = useState(false);
    const [activeView, setActiveView] = useState('overview');

    // Form State
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('expense');
    const [category, setCategory] = useState('misc');
    const [merchant, setMerchant] = useState('');
    const [mood, setMood] = useState<'happy' | 'neutral' | 'stressed' | undefined>();

    const stats = useMemo(() => {
        const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        const monthlyBurn = expense > 0 ? expense : 1500; // Fallback for runway calculation
        const liquidAssets = Object.values(assets).reduce((a, b) => a + b, 0);
        const runway = Math.floor(liquidAssets / monthlyBurn);
        
        return { income, expense, net: income - expense, runway };
    }, [transactions, assets]);

    const handleAdd = () => {
        if (!amount || !merchant) return;
        addTransaction({
            amount: parseFloat(amount),
            type,
            category,
            merchant,
            date: new Date().toISOString().split('T')[0],
            moodTag: mood,
        });
        setShowAdd(false);
        setAmount('');
        setMerchant('');
    };

    if (lowEnergyMode) {
        return (
            <div className="max-w-md mx-auto space-y-6 pt-10">
                <Card className="text-center p-8 bg-amber-500/5 border-amber-500/20">
                    <ShieldCheck className="mx-auto h-12 w-12 text-amber-500 mb-4" />
                    <CardTitle className="mb-2">Minimum Viable Day</CardTitle>
                    <CardDescription className="mb-6">Low Energy mode active. Just focus on the basics today.</CardDescription>
                    <div className="space-y-4">
                        <p className="text-sm font-medium">Did you avoid any unplanned spending today?</p>
                        <div className="flex gap-2">
                            <Button className="flex-1 bg-green-600 hover:bg-green-700 h-12">Yes</Button>
                            <Button variant="outline" className="flex-1 h-12">No</Button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Header Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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
                {featurePhase >= 2 && (
                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader className="p-4 pb-0">
                            <CardDescription className="text-[10px] font-bold uppercase tracking-wider">Financial Runway</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-1">
                            <p className="text-2xl font-black text-primary">{stats.runway} <span className="text-xs font-normal">Months</span></p>
                        </CardContent>
                    </Card>
                )}
            </div>

            <SynergyPanel />

            <Tabs defaultValue="overview" onValueChange={setActiveView}>
                <div className="flex justify-between items-center mb-4">
                    <TabsList className="h-8 bg-muted/50 p-1">
                        <TabsTrigger value="overview" className="text-xs px-3">Overview</TabsTrigger>
                        <TabsTrigger value="history" className="text-xs px-3">History</TabsTrigger>
                        <TabsTrigger value="subs" className="text-xs px-3">Subscriptions</TabsTrigger>
                        {featurePhase >= 2 && <TabsTrigger value="worth" className="text-xs px-3">Net Worth</TabsTrigger>}
                    </TabsList>
                    <Button size="sm" onClick={() => setShowAdd(!showAdd)} className="h-8 gap-2">
                        {showAdd ? <X className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                        {showAdd ? "Cancel" : "Log Transaction"}
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
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Target className="w-4 h-4 text-primary" />
                                    Active Goals
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold">
                                        <span>Emergency Fund</span>
                                        <span>$4,200 / $10,000</span>
                                    </div>
                                    <Progress value={42} className="h-2" />
                                    {featurePhase >= 2 && (
                                        <p className="text-[10px] text-muted-foreground italic">
                                            Saving $100 more/month extends your runway by <span className="text-primary font-bold">3 weeks</span>.
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

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
                                    <p>You spend <span className="font-bold text-primary">40% more on weekends</span>. This $15 impulse buy could become $450 in your savings goal over a year.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="history">
                    <Card>
                        <CardContent className="p-0">
                            {transactions.length === 0 ? (
                                <div className="p-10 text-center opacity-50 italic text-sm">No transactions logged yet.</div>
                            ) : (
                                transactions.map(tx => (
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
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className={cn("text-sm font-black", tx.type === 'income' ? "text-green-600" : "text-foreground")}>
                                                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                                                </p>
                                                {tx.moodTag && <Badge variant="outline" className="text-[8px] h-4 py-0 px-1">{tx.moodTag}</Badge>}
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => deleteTransaction(tx.id)}>
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="subs">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-primary" />
                                Active Subscriptions
                            </CardTitle>
                            <CardDescription>Track your recurring charges and annual impact.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {subscriptions.map(sub => (
                                <div key={sub.id} className="flex items-center justify-between p-4 rounded-xl border bg-muted/30">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-background rounded-lg border"><Tv className="w-4 h-4 text-muted-foreground" /></div>
                                        <div>
                                            <p className="text-sm font-bold">{sub.name}</p>
                                            <p className="text-[10px] text-primary font-bold">
                                                ${sub.amount}/{sub.billingCycle === 'monthly' ? 'mo' : 'yr'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-muted-foreground">
                                            ${(sub.billingCycle === 'monthly' ? sub.amount * 12 : sub.amount).toFixed(2)}/year
                                        </p>
                                        <Button variant="link" className="h-auto p-0 text-[10px] text-destructive font-bold uppercase">Cancel Sub</Button>
                                    </div>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full border-dashed h-12 gap-2 text-muted-foreground">
                                <PlusCircle className="w-4 h-4" /> Add Recurring Subscription
                            </Button>
                        </CardContent>
                    </Card>
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
                </CardContent>
                <CardFooter>
                    <p className="text-[10px] text-muted-foreground italic">Disclaimer: Financial tracking for educational purposes. We do not provide financial advice.</p>
                </CardFooter>
            </Card>
        </div>
    );
}
