
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
    PieChart, DollarSign, Info, AlertCircle, Sparkles,
    Calendar, ShoppingCart, Utensils, Car, Tv, CreditCard,
    Home, Zap, Heart, GraduationCap, Box, Trash2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { cn } from '@/lib/utils';

type Transaction = {
    id: string;
    amount: number;
    category: string;
    date: string;
    type: 'income' | 'expense';
    note?: string;
    mood?: string;
};

type Budget = {
    category: string;
    limit: number;
};

type FinancialGoal = {
    id: string;
    title: string;
    target: number;
    current: number;
    deadline: string;
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
        { id: '1', amount: 50, category: 'groceries', date: new Date().toISOString().split('T')[0], type: 'expense', note: 'Weekly shop' },
        { id: '2', amount: 2500, category: 'Salary', date: new Date().toISOString().split('T')[0], type: 'income' },
    ]);
    const [budgets, setBudgets] = useState<Budget[]>([
        { category: 'groceries', limit: 400 },
        { category: 'dining', limit: 200 },
    ]);
    const [goals, setGoals] = useState<FinancialGoal[]>([
        { id: 'g1', title: 'Vacation Fund', target: 5000, current: 1200, deadline: '2025-09-01' }
    ]);

    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('misc');
    const [note, setNote] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('expense');

    const monthlyIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const monthlyExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const netBalance = monthlyIncome - monthlyExpenses;

    const handleAddTransaction = () => {
        if (!amount) return;
        const newTransaction: Transaction = {
            id: crypto.randomUUID(),
            amount: parseFloat(amount),
            category,
            date: new Date().toISOString().split('T')[0],
            type,
            note,
        };
        setTransactions([newTransaction, ...transactions]);
        setAmount('');
        setNote('');
    };

    const getCategorySpend = (catId: string) => {
        return transactions
            .filter(t => t.category === catId && t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-primary/5 border-primary/10">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Net Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className={cn("text-3xl font-bold", netBalance >= 0 ? "text-green-600" : "text-destructive")}>
                            ${netBalance.toLocaleString()}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Income</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-green-600">${monthlyIncome.toLocaleString()}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-destructive">${monthlyExpenses.toLocaleString()}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PlusCircle className="w-5 h-5 text-primary" />
                                Log Transaction
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Amount</Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input 
                                            type="number" 
                                            className="pl-9" 
                                            placeholder="0.00" 
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Type</Label>
                                    <Select value={type} onValueChange={(v: any) => setType(v)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="expense">Expense</SelectItem>
                                            <SelectItem value="income">Income</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {defaultCategories.map(cat => (
                                                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Note (Optional)</Label>
                                    <Input 
                                        placeholder="Lunch with team..." 
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Button className="w-full" onClick={handleAddTransaction}>Add Transaction</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                Budget Progress
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {budgets.map(budget => {
                                const spent = getCategorySpend(budget.category);
                                const percent = Math.min(100, (spent / budget.limit) * 100);
                                const catInfo = defaultCategories.find(c => c.id === budget.category);
                                return (
                                    <div key={budget.category} className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <div className="flex items-center gap-2">
                                                {catInfo && <catInfo.icon className="w-4 h-4 text-muted-foreground" />}
                                                <span className="font-medium">{catInfo?.name}</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground">
                                                ${spent} / ${budget.limit}
                                            </span>
                                        </div>
                                        <Progress value={percent} className={cn("h-2", percent > 90 ? "bg-destructive/20 [&>div]:bg-destructive" : "")} />
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="bg-primary/5 border-primary/10">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-primary" />
                                Insights
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-3 bg-background rounded-lg border text-sm flex gap-3">
                                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <p>You spend <span className="font-bold text-primary">40% more on weekends</span>. Try prepping Sunday lunch on Friday to save!</p>
                            </div>
                            <div className="p-3 bg-background rounded-lg border text-sm flex gap-3">
                                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                <p>Reducing dining out by <span className="font-bold text-primary">$50/month</span> moves your Vacation goal from September to July.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Target className="w-5 h-5 text-primary" />
                                Goals
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {goals.map(goal => (
                                <div key={goal.id} className="space-y-2 p-3 bg-muted/30 rounded-lg">
                                    <div className="flex justify-between font-bold text-sm">
                                        <span>{goal.title}</span>
                                        <span>${goal.current} / ${goal.target}</span>
                                    </div>
                                    <Progress value={(goal.current / goal.target) * 100} className="h-1.5" />
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                                        Deadline: {new Date(goal.deadline).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full border-dashed text-xs h-8">Add New Goal</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Bell className="w-5 h-5 text-primary" />
                                Bill Reminders
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between p-2 text-xs border rounded-md">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="font-semibold">Rent Payment</span>
                                </div>
                                <span className="text-muted-foreground font-mono">Due in 4 days</span>
                            </div>
                            <div className="flex items-center justify-between p-2 text-xs border rounded-md">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                                    <span className="font-semibold">Fiber Internet</span>
                                </div>
                                <span className="text-muted-foreground font-mono">Aug 15</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
