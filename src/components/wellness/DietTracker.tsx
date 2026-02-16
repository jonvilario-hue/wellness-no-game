
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
    Utensils, Droplets, Scale, Apple, 
    PlusCircle, Info, Sparkles, CheckCircle2, 
    Zap, ClipboardList, BookOpen, Coffee, MessageSquare, Copy, History, X,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';
import { SynergyPanel } from './SynergyPanel';
import { useWellnessData, type MealLog } from '@/hooks/use-wellness-data';
import { format, subDays, isSameDay } from 'date-fns';

type NutritionMode = 'Detailed' | 'Moderate' | 'Simple';

export function DietTracker() {
    const { 
        mealLogs, addMealLog, copyDayLog, 
        waterLogs, addWater, 
        weightLogs, addWeight,
        lowEnergyMode, featurePhase
    } = useWellnessData();
    
    const [mode, setMode] = useState<NutritionMode>('Detailed');
    const [showAdd, setShowAdd] = useState(false);
    const today = format(new Date(), 'yyyy-MM-dd');
    
    const [mealForm, setMealForm] = useState<Omit<MealLog, 'id' | 'date'>>({
        mealType: 'Breakfast',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
    });

    const rollingStats = useMemo(() => {
        const last7Days = Array.from({ length: 7 }, (_, i) => format(subDays(new Date(), i), 'yyyy-MM-dd'));
        const totalCals = mealLogs
            .filter(l => last7Days.includes(l.date))
            .reduce((sum, l) => sum + l.calories, 0);
        const avgCals = Math.round(totalCals / 7);
        
        const todayCals = mealLogs
            .filter(l => l.date === today)
            .reduce((sum, l) => sum + l.calories, 0);
            
        return { avgCals, todayCals, target: 2200 };
    }, [mealLogs, today]);

    const handleLogMeal = () => {
        addMealLog({ ...mealForm, date: today });
        setShowAdd(false);
    };

    const handleCopyYesterday = () => {
        const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');
        copyDayLog(yesterday, today);
    };

    if (lowEnergyMode) {
        return (
            <div className="max-w-md mx-auto space-y-6 pt-10">
                <Card className="text-center p-8 bg-amber-500/5 border-amber-500/20">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-amber-500 mb-4" />
                    <CardTitle className="mb-2">Minimum Viable Day</CardTitle>
                    <CardDescription className="mb-6">Streak preservation active. Low-friction logging only.</CardDescription>
                    <div className="space-y-4">
                        <p className="text-sm font-medium">Log one thing you ate or drank today:</p>
                        <Input placeholder="e.g. Water and a sandwich" className="h-12" />
                        <Button className="w-full bg-primary h-12">Log MVD Entry</Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Header Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-primary/5 border-primary/10">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                            7-Day Rolling Average
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-none">Focus: Consistency</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 py-4">
                        <div className="text-center">
                            <span className="text-5xl font-black">{rollingStats.avgCals}</span>
                            <span className="text-sm text-muted-foreground font-bold ml-2">CAL / DAY</span>
                        </div>
                        <Progress value={(rollingStats.avgCals / rollingStats.target) * 100} className="h-2" />
                        <p className="text-[10px] text-center text-muted-foreground">
                            Today's specific intake: <span className="font-bold text-foreground">{rollingStats.todayCals} kcal</span>
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/10">
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            Performance Synergy
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="p-3 bg-background rounded-lg border text-xs flex gap-3">
                            <Zap className="w-4 h-4 text-primary shrink-0" />
                            <p>You reported <span className="font-bold">low energy</span> on days where breakfast protein was below 20g. Aim for 30g tomorrow.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Log Actions */}
                    <div className="flex gap-2">
                        <Button className="flex-1 h-14 gap-2 text-lg font-bold" onClick={() => setShowAdd(true)}>
                            <PlusCircle className="w-5 h-5" /> Log Meal
                        </Button>
                        <Button variant="outline" className="flex-1 h-14 gap-2" onClick={handleCopyYesterday}>
                            <Copy className="w-4 h-4" /> Copy Yesterday
                        </Button>
                    </div>

                    {showAdd && (
                        <Card className="border-primary/20 animate-in zoom-in-95">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-base">Quick Meal Log</CardTitle>
                                <Button variant="ghost" size="icon" onClick={() => setShowAdd(false)}><X className="w-4 h-4" /></Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-bold uppercase">Meal</Label>
                                        <Select value={mealForm.mealType} onValueChange={(v: any) => setMealForm({ ...mealForm, mealType: v })}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-bold uppercase">Calories</Label>
                                        <Input type="number" value={mealForm.calories || ''} onChange={e => setMealForm({ ...mealForm, calories: parseInt(e.target.value) || 0 })} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-bold uppercase">Protein</Label>
                                        <Input type="number" value={mealForm.protein || ''} onChange={e => setMealForm({ ...mealForm, protein: parseInt(e.target.value) || 0 })} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-bold uppercase">Carbs</Label>
                                        <Input type="number" value={mealForm.carbs || ''} onChange={e => setMealForm({ ...mealForm, carbs: parseInt(e.target.value) || 0 })} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-bold uppercase">Fat</Label>
                                        <Input type="number" value={mealForm.fat || ''} onChange={e => setMealForm({ ...mealForm, fat: parseInt(e.target.value) || 0 })} />
                                    </div>
                                </div>
                                <Button className="w-full" onClick={handleLogMeal}>Save Meal</Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Daily History */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <History className="w-4 h-4 text-muted-foreground" />
                                Today's Meals
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {mealLogs.filter(l => l.date === today).length === 0 ? (
                                <div className="p-10 text-center opacity-50 italic text-sm">No meals logged for today.</div>
                            ) : (
                                mealLogs.filter(l => l.date === today).map(log => (
                                    <div key={log.id} className="flex items-center justify-between p-4 border-b last:border-0">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-muted rounded-lg"><Coffee className="w-4 h-4 text-muted-foreground" /></div>
                                            <div>
                                                <p className="text-sm font-bold">{log.mealType}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase">{log.protein}g P • {log.carbs}g C • {log.fat}g F</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black">{log.calories} kcal</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    {/* Weight Tracker */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <Scale className="w-4 h-4 text-primary" />
                                Weight Trajectory
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-baseline mb-4">
                                <span className="text-2xl font-black">183.5 lbs</span>
                                <span className="text-[10px] font-bold text-green-600">Smoothed Trend</span>
                            </div>
                            <div className="h-32 w-full bg-muted/20 rounded-lg border border-dashed flex items-center justify-center">
                                <p className="text-[10px] text-muted-foreground">Trajectory chart will populate after 3 logs.</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Hydration */}
                    <Card className="bg-blue-500/[0.03] border-blue-500/10">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold flex items-center gap-2 text-blue-600">
                                <Droplets className="w-4 h-4" />
                                Hydration
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-center">
                            <div className="flex justify-center gap-1.5 flex-wrap">
                                {[...Array(8)].map((_, i) => (
                                    <Button 
                                        key={i}
                                        variant="ghost" 
                                        size="icon" 
                                        className={cn(
                                            "w-8 h-8 rounded-full border border-blue-500/20", 
                                            i < (waterLogs[today] || 0) ? "bg-blue-500 text-white" : "text-blue-500/40"
                                        )}
                                        onClick={() => addWater(today, 1)}
                                    >
                                        <Droplets className="w-4 h-4" />
                                    </Button>
                                ))}
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Goal: 8 Glasses</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Disclaimer */}
            <Card className="bg-muted/20 border-dashed">
                <CardFooter className="pt-6">
                    <p className="text-[10px] text-muted-foreground italic text-center w-full">Disclaimer: This tool is for tracking and educational purposes. Consult a medical professional for dietary advice.</p>
                </CardFooter>
            </Card>
        </div>
    );
}
