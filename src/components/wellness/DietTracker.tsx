
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
    Utensils, Scale, Copy, X, Calendar as CalendarIcon,
    ChefHat, ShoppingCart, Library, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWellnessData } from '@/hooks/use-wellness-data';
import { format, subDays, startOfWeek, addDays } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { MealPlannerCalendar } from './MealPlannerCalendar';
import { MealGuideLibrary } from './MealGuideLibrary';
import { ShoppingListView } from './ShoppingListView';
import { DietaryProfileSettings } from './DietaryProfileSettings';
import { WellnessActivityCalendar } from './WellnessActivityCalendar';
import { NutritionArchitect } from './NutritionArchitect';

export function DietTracker() {
    const { 
        mealLogs, deleteMealLog, copyDayLog, 
        bodyMetrics, addBodyMetric,
        dietaryApproach, calorieTarget,
        dietaryProfile
    } = useWellnessData();
    
    const [activeTab, setActiveTab] = useState('daily');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [isMounted, setIsMounted] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    
    const stats = useMemo(() => {
        const todayLogs = mealLogs.filter(l => l.date === dateStr);
        const totalCals = todayLogs.reduce((s, l) => s + l.calories, 0);
        const totalP = todayLogs.reduce((s, l) => s + l.protein, 0);
        const totalC = todayLogs.reduce((s, l) => s + l.carbs, 0);
        const totalF = todayLogs.reduce((s, l) => s + l.fat, 0);
        
        const macroData = [
            { name: 'Protein', value: totalP, color: '#3b82f6' },
            { name: 'Carbs', value: totalC, color: '#10b981' },
            { name: 'Fat', value: totalF, color: '#f59e0b' }
        ].filter(m => m.value > 0);

        return { totalCals, totalP, totalC, totalF, macroData };
    }, [mealLogs, dateStr]);

    if (!isMounted) return null;

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Nutrition Laboratory</h2>
                    <p className="text-sm text-muted-foreground italic">"Fuel your cognitive engine with precision."</p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 h-10 px-4 flex gap-2">
                        <Scale className="w-4 h-4" />
                        <span className="font-bold uppercase tracking-tight">Approach: {dietaryApproach}</span>
                    </Badge>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-muted/50 p-1 mb-8 grid grid-cols-2 md:flex md:w-fit h-auto">
                    <TabsTrigger value="daily" className="text-xs uppercase font-bold px-6">Daily Intake</TabsTrigger>
                    <TabsTrigger value="planner" className="text-xs uppercase font-bold px-6">
                        <CalendarIcon className="w-3 h-3 mr-2" /> Planner
                    </TabsTrigger>
                    <TabsTrigger value="ai-architect" className="text-xs uppercase font-bold px-6">
                        <Sparkles className="w-3 h-3 mr-2" /> AI Architect
                    </TabsTrigger>
                    <TabsTrigger value="guides" className="text-xs uppercase font-bold px-6">
                        <Library className="w-3 h-3 mr-2" /> Guides
                    </TabsTrigger>
                    <TabsTrigger value="shopping" className="text-xs uppercase font-bold px-6">
                        <ShoppingCart className="w-3 h-3 mr-2" /> Shopping
                    </TabsTrigger>
                    <TabsTrigger value="progress" className="text-xs uppercase font-bold px-6">Body Progress</TabsTrigger>
                    <TabsTrigger value="settings" className="text-xs uppercase font-bold px-6">Profile</TabsTrigger>
                </TabsList>

                <TabsContent value="daily" className="space-y-8 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="md:col-span-2 border-primary/10">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Caloric Saturation</CardTitle>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest">
                                                <CalendarIcon className="w-3 h-3 mr-1.5" /> {format(selectedDate, 'MMM d')}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" selected={selectedDate} onSelect={(d) => d && setSelectedDate(d)} />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 py-6">
                                <div className="text-center">
                                    <span className="text-6xl font-black">{stats.totalCals}</span>
                                    <p className="text-xs font-bold text-muted-foreground uppercase mt-1">Consumed of {calorieTarget} kcal</p>
                                </div>
                                <Progress value={(stats.totalCals / calorieTarget) * 100} className="h-3" />
                                
                                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                                    <div className="text-center">
                                        <p className="text-2xl font-black text-blue-500">{stats.totalP}g</p>
                                        <p className="text-[9px] font-bold uppercase text-muted-foreground">Protein</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-black text-emerald-500">{stats.totalC}g</p>
                                        <p className="text-[9px] font-bold uppercase text-muted-foreground">Carbs</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-black text-amber-500">{stats.totalF}g</p>
                                        <p className="text-[9px] font-bold uppercase text-muted-foreground">Fat</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-primary/10 bg-primary/[0.02] flex flex-col justify-center items-center p-6">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6">Macro Balance</CardTitle>
                            {stats.macroData.length > 0 ? (
                                <div className="h-48 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={stats.macroData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                                {stats.macroData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            ) : (
                                <div className="h-48 flex items-center justify-center opacity-30 italic text-xs">No data today</div>
                            )}
                        </Card>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-1">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Recent Intake</h3>
                            <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold uppercase" onClick={() => copyDayLog(format(subDays(selectedDate, 1), 'yyyy-MM-dd'), dateStr)}>
                                <Copy className="w-3 h-3 mr-1.5" /> Copy Yesterday
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mealLogs.filter(l => l.date === dateStr).map(log => (
                                <div key={log.id} className="p-4 bg-background border border-primary/5 rounded-xl flex items-center justify-between group hover:border-primary/20 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary"><Utensils className="w-4 h-4" /></div>
                                        <div>
                                            <p className="text-sm font-bold">{log.foodName || log.mealType}</p>
                                            <p className="text-[9px] text-muted-foreground uppercase">{log.calories} KCAL • {log.protein}P {log.carbs}C {log.fat}F</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100" onClick={() => deleteMealLog(log.id)}><X className="w-4 h-4" /></Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <WellnessActivityCalendar categoryFilter="Nutrition" />
                </TabsContent>

                <TabsContent value="planner">
                    <MealPlannerCalendar />
                </TabsContent>

                <TabsContent value="ai-architect">
                    <NutritionArchitect />
                </TabsContent>

                <TabsContent value="guides">
                    <MealGuideLibrary />
                </TabsContent>

                <TabsContent value="shopping">
                    <ShoppingListView />
                </TabsContent>

                <TabsContent value="progress">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="border-primary/10">
                            <CardHeader><CardTitle className="text-sm font-black uppercase tracking-widest">Add Measurement</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] font-bold uppercase">Weight (kg/lb)</Label>
                                    <Input type="number" placeholder="0.0" onBlur={e => addBodyMetric({ date: dateStr, weight: parseFloat(e.target.value) })} />
                                </div>
                                <Button className="w-full font-bold">Save Progress</Button>
                            </CardContent>
                        </Card>
                        <Card className="md:col-span-2 border-primary/10 h-80 flex items-center justify-center">
                             <div className="text-muted-foreground text-sm italic">Body metric visualization engine active</div>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="settings">
                    <DietaryProfileSettings />
                </TabsContent>
            </Tabs>
        </div>
    );
}
