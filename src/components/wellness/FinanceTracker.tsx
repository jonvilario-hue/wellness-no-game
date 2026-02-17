
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
import { Switch } from '@/components/ui/switch';
import { 
    PlusCircle, Wallet, Target, DollarSign, Sparkles, 
    ShoppingCart, Utensils, Car, Tv, CreditCard,
    Home, Zap, Heart, GraduationCap, Box, Trash2, ArrowUpRight, ArrowDownRight,
    Save, X, Calendar as CalendarIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SynergyPanel } from './SynergyPanel';
import { useWellnessData } from '@/hooks/use-wellness-data';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { WellnessActivityCalendar } from './WellnessActivityCalendar';

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
        subscriptions, toggleSubscription, lowEnergyMode, assets
    } = useWellnessData();
    
    const [activeView, setActiveView] = useState('overview');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [mounted, setMounted] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        setMounted(true);
    }, []);

    const [amount, setAmount] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('expense');
    const [category, setCategory] = useState('misc');
    const [merchant, setMerchant] = useState('');
    const [mood, setMood] = useState<'happy' | 'neutral' | 'stressed' | undefined>();

    const stats = useMemo(() => {
        const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        const monthlyBurn = expense > 0 ? expense : 1500;
        const liquidAssets = Object.values(assets).reduce((a, b) => a + b, 0);
        const runway = Math.floor(liquidAssets / monthlyBurn);
        
        return { income, expense, net: income - expense, runway };
    }, [transactions, assets]);

    const handleAdd = () => {
        if (!amount || !merchant) {
            toast({ title: "Missing Fields", description: "Please enter an amount and merchant.", variant: "destructive" });
            return;
        }
        addTransaction({
            amount: parseFloat(amount),
            type,
            category,
            merchant,
            date: format(selectedDate, 'yyyy-MM-dd'),
            moodTag: mood,
        });
        setAmount('');
        setMerchant('');
        toast({ title: "Transaction Logged", variant: "success" });
    };

    if (lowEnergyMode) {
        return (
            <div className="max-w-md mx-auto space-y-6 pt-10">
                <Card className="text-center p-8 bg-amber-500/5 border-amber-500/20">
                    <Zap className="mx-auto h-12 w-12 text-amber-500 mb-4" />
                    <CardTitle className="mb-2">Minimum Viable Day</CardTitle>
                    <CardDescription className="mb-6">Financial friction reduced. Only essential tracking active.</CardDescription>
                    <div className="space-y-4">
                        <p className="text-sm font-medium">Did you avoid unplanned spending today?</p>
                        <div className="flex gap-2">
                            <Button 
                                className="flex-1 bg-green-600 hover:bg-green-700 h-12 font-bold"
                                onClick={() => toast({ title: "Finance Logged", variant: "success" })}
                            >
                                Yes
                            </Button>
                            <Button 
                                variant="outline" 
                                className="flex-1 h-12 font-bold"
                                onClick={() => toast({ title: "Note Logged" })}
                            >
                                No
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* PERMANENT LOGGING FORM */}
            <Card className="border-primary/20 bg-primary/[0.02]">
                <CardHeader className="pb-4">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <PlusCircle className="w-5 h-5 text-primary" />
                            Log New Transaction
                        </CardTitle>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest border border-primary/10">
                                    <CalendarIcon className="w-3 h-3 mr-1.5" />
                                    {mounted ? format(selectedDate, 'MMM d, yyyy') : 'Loading...'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={selectedDate} onSelect={(d) => d && setSelectedDate(d)} />
                            </PopoverContent>
                        </Popover>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Amount ($)</Label>
                        <Input 
                            type="number" 
                            placeholder="0.00" 
                            value={amount} 
                            onChange={e => setAmount(e.target.value)} 
                            className="font-bold"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Merchant</Label>
                        <Input 
                            placeholder="Where did you spend?" 
                            value={merchant} 
                            onChange={e => setMerchant(e.target.value)} 
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {defaultCategories.map(c => (
                                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-end">
                        <Button className="w-full font-bold h-10 gap-2" onClick={handleAdd}>
                            <Save className="w-4 h-4" /> Save Entry
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <Card className="bg-card border-primary/10">
                    <CardHeader className="p-4 pb-0">
                        <CardDescription className="text-[10px] font-bold uppercase tracking-wider">Net Balance</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-1">
                        <p className={cn("text-2xl font-black", stats.net >= 0 ? "text-green-600" : "text-destructive")}>
                            ${stats.net.toLocaleString()}
                        </p>
                    </CardContent>
                </Card>
                <Card><CardContent className="p-4 flex items-center justify-between h-full"><p className="text-xl font-bold text-green-600">${stats.income.toLocaleString()}</p><ArrowUpRight className="w-4 h-4 text-green-600"/></CardContent></Card>
                <Card><CardContent className="p-4 flex items-center justify-between h-full"><p className="text-xl font-bold text-destructive">${stats.expense.toLocaleString()}</p><ArrowDownRight className="w-4 h-4 text-destructive"/></CardContent></Card>
                <Card className="bg-primary/5 border-primary/20"><CardContent className="p-4 h-full flex flex-col justify-center"><p className="text-[10px] font-bold uppercase opacity-60">Runway</p><p className="text-2xl font-black">{stats.runway} Mo</p></CardContent></Card>
            </div>

            <SynergyPanel />

            <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
                <TabsList className="h-8 bg-muted/50 p-1 mb-4">
                    <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                    <TabsTrigger value="history" className="text-xs">Transaction History</TabsTrigger>
                    <TabsTrigger value="subs" className="text-xs">Active Subscriptions</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <div className="p-10 text-center border-2 border-dashed rounded-2xl opacity-30 italic text-sm">
                        Select History or Subscriptions to view detailed data stacks.
                    </div>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                    <Card>
                        <CardContent className="p-0">
                            {transactions.length === 0 ? (
                                <div className="p-10 text-center opacity-50 italic text-sm">No transactions logged.</div>
                            ) : (
                                transactions.sort((a,b) => b.date.localeCompare(a.date)).map(tx => (
                                    <div key={tx.id} className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-muted/30 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className={cn("p-2 rounded-lg", tx.type === 'income' ? "bg-green-500/10 text-green-600" : "bg-primary/10 text-primary")}><DollarSign className="w-4 h-4" /></div>
                                            <div><p className="text-sm font-bold">{tx.merchant}</p><p className="text-[10px] text-muted-foreground uppercase">{tx.category} • {tx.date}</p></div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <p className={cn("text-sm font-black", tx.type === 'income' ? "text-green-600" : "text-foreground")}>{tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}</p>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => deleteTransaction(tx.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="subs" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Active Subscriptions</CardTitle>
                            <CardDescription>Toggle to include or exclude from monthly burn rate calculations.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            {subscriptions.length === 0 ? (
                                <div className="p-10 text-center opacity-50 italic text-sm">No subscriptions added.</div>
                            ) : (
                                subscriptions.map(s => (
                                    <div key={s.id} className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-muted/10 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-muted rounded-lg"><CreditCard className="w-4 h-4" /></div>
                                            <div>
                                                <p className="text-sm font-bold">{s.name}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase">{s.category} • ${s.amount}/{s.billingCycle === 'monthly' ? 'mo' : 'yr'}</p>
                                            </div>
                                        </div>
                                        <Switch checked={s.active} onCheckedChange={() => toggleSubscription(s.id)} />
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <WellnessActivityCalendar categoryFilter="Finance" />
        </div>
    );
}
