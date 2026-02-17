
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
    Utensils, Droplets, Scale, PlusCircle, Info, Sparkles, CheckCircle2, 
    Zap, Coffee, Copy, History, X, Save, Calendar as CalendarIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWellnessData, type MealLog } from '@/hooks/use-wellness-data';
import { format, subDays, isSameDay } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { WellnessActivityCalendar } from './WellnessActivityCalendar';

export function DietTracker() {
    const { 
        mealLogs, addMealLog, copyDayLog, 
        waterLogs, addWater, 
        lowEnergyMode
    } = useWellnessData();
    
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [mounted, setMounted] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        setMounted(true);
    }, []);

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
        if (!mealForm.calories && mealForm.calories !== 0) return;
        addMealLog({ ...mealForm, date: dateStr });
        setMealForm({
            mealType: 'Breakfast',
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0
        });
        toast({ title: "Meal Logged", variant: "success" });
    };

    const handleCopyYesterday = () => {
        const yesterday = format(subDays(selectedDate, 1), 'yyyy-MM-dd');
        copyDayLog(yesterday, dateStr);
        toast({ title: "Logs Copied", description: "Copied nutrition data from previous day." });
    };

    const currentWaterCount = waterLogs[dateStr] || 0;

    const handleWaterIconClick = (index: number) => {
        const targetLevel = index + 1;
        const newLevel = currentWaterCount === targetLevel ? index : targetLevel;
        addWater(dateStr, newLevel - currentWaterCount);
    };

    if (lowEnergyMode) {
        return (
            <div className="max-w-md mx-auto space-y-6 pt-10">
                <Card className="text-center p-8 bg-amber-500/5 border-amber-500/20">
                    <Utensils className="mx-auto h-12 w-12 text-amber-500 mb-4" />
                    <CardTitle className="mb-2">Minimum Viable Day</CardTitle>
                    <CardDescription className="mb-6">Streak preservation active. Low-friction logging only.</CardDescription>
                    <div className="space-y-4">
                        <p className="text-sm font-medium">Log a quick check-in for your nutrition streak:</p>
                        <Button 
                            className="w-full bg-primary h-12" 
                            onClick={() => {
                                addMealLog({ date: dateStr, mealType: 'Snacks', calories: 100, protein: 0, carbs: 0, fat: 0 });
                                toast({ title: "Streak Preserved", variant: 'success' });
                            }}
                        >
                            Quick Log (100 kcal)
                        </Button>
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
                            Log New Meal
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase border border-primary/10" onClick={handleCopyYesterday}>
                                <Copy className="w-3 h-3 mr-1.5" />
                                Copy Prev
                            </Button>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest border border-primary/10">
                                        <CalendarIcon className="w-3 h-3 mr-1.5" />
                                        {mounted ? format(selectedDate, 'MMM d') : '...'}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={selectedDate} onSelect={(d) => d && setSelectedDate(d)} />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Type</Label>
                        <Select value={mealForm.mealType} onValueChange={(v: any) => setMealForm({ ...mealForm, mealType: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Calories</Label>
                        <Input 
                            type="number" 
                            placeholder="0" 
                            value={mealForm.calories || ''} 
                            onChange={e => setMealForm({ ...mealForm, calories: parseInt(e.target.value) || 0 })} 
                            className="font-bold"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Protein (g)</Label>
                        <Input 
                            type="number" 
                            placeholder="0" 
                            value={mealForm.protein || ''} 
                            onChange={e => setMealForm({ ...mealForm, protein: parseInt(e.target.value) || 0 })} 
                        />
                    </div>
                    <div className="flex items-end">
                        <Button className="w-full font-bold h-10 gap-2" onClick={handleLogMeal}>
                            <Save className="w-4 h-4" /> Save Meal
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-primary/5 border-primary/10">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                            Caloric Trajectory
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px]">7-Day Avg: {rollingStats.avgCals}</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 py-4 text-center">
                        <div className="flex justify-center items-baseline gap-4">
                            <div className="text-center">
                                <span className="text-4xl font-black">{rollingStats.todayCals}</span>
                                <p className="text-[9px] font-black uppercase text-primary mt-1">Today's Intake</p>
                            </div>
                        </div>
                        <Progress value={(rollingStats.todayCals / rollingStats.target) * 100} className="h-2" />
                    </CardContent>
                </Card>

                <Card className="bg-blue-500/[0.03] border-blue-500/10">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-blue-600">Hydration Control</CardTitle>
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
                                        i < currentWaterCount ? "bg-blue-500 text-white" : "text-blue-500/40 hover:bg-blue-500/10"
                                    )}
                                    onClick={() => handleWaterIconClick(i)}
                                >
                                    <Droplets className="w-4 h-4" />
                                </Button>
                            ))}
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Meeting {Math.min(100, (currentWaterCount / 8) * 100).toFixed(0)}% of Daily Goal</p>
                    </CardContent>
                </Card>
            </div>

            <WellnessActivityCalendar categoryFilter="Nutrition" />
        </div>
    );
}
