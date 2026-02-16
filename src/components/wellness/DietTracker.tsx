
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
    Utensils, Droplets, Scale, PlusCircle, Info, Sparkles, CheckCircle2, 
    Zap, Coffee, Copy, History, X, Calendar as CalendarIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SynergyPanel } from './SynergyPanel';
import { useWellnessData, type MealLog } from '@/hooks/use-wellness-data';
import { format, subDays, isSameDay } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

export function DietTracker() {
    const { 
        mealLogs, addMealLog, copyDayLog, 
        waterLogs, addWater, 
        lowEnergyMode
    } = useWellnessData();
    
    const [showAdd, setShowAdd] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    
    const [mealForm, setMealForm] = useState<Omit<MealLog, 'id' | 'date'>>({
        mealType: 'Breakfast',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
    });

    const rollingStats = useMemo(() => {
        const last7Days = Array.from({ length: 7 }, (_, i) => format(subDays(new Date(), i), 'yyyy-MM-dd'));
        const last7Logs = mealLogs.filter(l => last7Days.includes(l.date));
        const totalCals = last7Logs.reduce((sum, l) => sum + l.calories, 0);
        const avgCals = last7Logs.length > 0 ? Math.round(totalCals / 7) : 0;
        
        const todayLogs = mealLogs.filter(l => l.date === dateStr);
        const todayCals = todayLogs.reduce((sum, l) => sum + l.calories, 0);
        const todayProtein = todayLogs.reduce((sum, l) => sum + l.protein, 0);
            
        return { avgCals, todayCals, todayProtein, target: 2200 };
    }, [mealLogs, dateStr]);

    const handleLogMeal = () => {
        addMealLog({ ...mealForm, date: dateStr });
        setShowAdd(false);
        // Reset form for next entry
        setMealForm({
            mealType: 'Breakfast',
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0
        });
    };

    const handleCopyYesterday = () => {
        const yesterday = format(subDays(selectedDate, 1), 'yyyy-MM-dd');
        copyDayLog(yesterday, dateStr);
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
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Focus Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="h-9 px-4 font-bold border-primary/20 hover:bg-primary/5 transition-colors">
                                <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
                                {format(selectedDate, 'MMMM d, yyyy')}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={selectedDate} onSelect={(d) => d && setSelectedDate(d)} />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button className="flex-1 md:flex-none h-10 gap-2 font-bold" onClick={() => setShowAdd(true)}>
                        <PlusCircle className="w-4 h-4" /> Log Meal
                    </Button>
                    <Button variant="outline" className="flex-1 md:flex-none h-10 gap-2 border-primary/10" onClick={handleCopyYesterday}>
                        <Copy className="w-4 h-4" /> Copy Previous
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-primary/5 border-primary/10">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                            7-Day Average
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-none">Consistency</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 py-4 text-center">
                        <div className="flex justify-center items-baseline gap-4">
                            <div className="text-center">
                                <span className="text-4xl font-black">{rollingStats.todayCals}</span>
                                <p className="text-[9px] font-black uppercase text-primary mt-1">Today</p>
                            </div>
                            <div className="w-[1px] h-10 bg-border mx-2" />
                            <div className="text-center opacity-60">
                                <span className="text-2xl font-black">{rollingStats.avgCals}</span>
                                <p className="text-[9px] font-black uppercase mt-1">Average</p>
                            </div>
                        </div>
                        <Progress value={(rollingStats.todayCals / rollingStats.target) * 100} className="h-2" />
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
                            <p>Daily protein target for cognitive stability: <span className="font-bold">120g</span>. Logged for {format(selectedDate, 'MMM d')}: <span className="font-bold text-primary">{rollingStats.todayProtein}g</span>.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {showAdd && (
                        <Card className="border-primary/20 animate-in zoom-in-95 duration-200">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-base">Quick Meal Log ({format(selectedDate, 'MMM d')})</CardTitle>
                                <Button variant="ghost" size="icon" onClick={() => setShowAdd(false)}><X className="w-4 h-4" /></Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-bold uppercase">Meal Type</Label>
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
                                        <Label className="text-[10px] font-bold uppercase">Protein (g)</Label>
                                        <Input type="number" value={mealForm.protein || ''} onChange={e => setMealForm({ ...mealForm, protein: parseInt(e.target.value) || 0 })} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-bold uppercase">Carbs (g)</Label>
                                        <Input type="number" value={mealForm.carbs || ''} onChange={e => setMealForm({ ...mealForm, carbs: parseInt(e.target.value) || 0 })} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-bold uppercase">Fat (g)</Label>
                                        <Input type="number" value={mealForm.fat || ''} onChange={e => setMealForm({ ...mealForm, fat: parseInt(e.target.value) || 0 })} />
                                    </div>
                                </div>
                                <Button className="w-full font-bold h-12" onClick={handleLogMeal}>Save Meal Entry</Button>
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <History className="w-4 h-4 text-muted-foreground" />
                                Logs for {format(selectedDate, 'PPP')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {mealLogs.filter(l => l.date === dateStr).length === 0 ? (
                                <div className="p-10 text-center opacity-50 italic text-sm">No meals logged for this date.</div>
                            ) : (
                                mealLogs.filter(l => l.date === dateStr).map(log => (
                                    <div key={log.id} className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-muted/20 transition-colors">
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
                                            "w-8 h-8 rounded-full border border-blue-500/20 transition-all", 
                                            i < (waterLogs[dateStr] || 0) ? "bg-blue-500 text-white" : "text-blue-500/40 hover:bg-blue-500/10"
                                        )}
                                        onClick={() => addWater(dateStr, 1)}
                                    >
                                        <Droplets className="w-4 h-4" />
                                    </Button>
                                ))}
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Daily Target Met: {Math.min(100, ((waterLogs[dateStr] || 0) / 8) * 100).toFixed(0)}%</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
