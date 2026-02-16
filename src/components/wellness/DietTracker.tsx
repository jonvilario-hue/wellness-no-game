
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
    Utensils, Droplets, Scale, Calendar, Apple, 
    Beef, Wheat, PlusCircle, Search, Info, 
    Sparkles, CheckCircle2, ListChecks, Zap
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

type Meal = {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
    time: string;
};

const weightData = [
    { day: 'Mon', weight: 185.2 },
    { day: 'Tue', weight: 184.8 },
    { day: 'Wed', weight: 185.0 },
    { day: 'Thu', weight: 184.5 },
    { day: 'Fri', weight: 184.1 },
    { day: 'Sat', weight: 183.9 },
    { day: 'Sun', weight: 183.5 },
];

export function DietTracker() {
    const [trackingMode, setTrackingMode] = useState<'Detailed' | 'Moderate' | 'Simple'>('Detailed');
    const [waterIntake, setWaterIntake] = useState(4);
    const [meals, setMeals] = useState<Meal[]>([
        { id: '1', name: 'Oatmeal & Protein', calories: 450, protein: 30, carbs: 55, fat: 8, type: 'Breakfast', time: '08:30' },
    ]);

    const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
    const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
    const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
    const totalFat = meals.reduce((sum, m) => sum + m.fat, 0);

    const targets = { calories: 2400, protein: 180, carbs: 220, fat: 80 };

    const MacroRing = ({ label, current, target, color }: { label: string, current: number, target: number, color: string }) => {
        const percent = Math.min(100, (current / target) * 100);
        return (
            <div className="flex flex-col items-center gap-1">
                <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                        <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted/30" />
                        <circle 
                            cx="32" 
                            cy="32" 
                            r="28" 
                            fill="none" 
                            stroke={color} 
                            strokeWidth="4" 
                            strokeDasharray={176} 
                            strokeDashoffset={176 - (176 * percent) / 100} 
                            strokeLinecap="round" 
                            className="transition-all duration-1000" 
                        />
                    </svg>
                    <span className="absolute text-[10px] font-bold">{Math.round(percent)}%</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
                <span className="text-xs font-bold">{current}g</span>
            </div>
        );
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center bg-card p-4 rounded-xl border">
                <div className="space-y-1">
                    <h2 className="text-lg font-bold">Goal: Lean Muscle Gain</h2>
                    <p className="text-xs text-muted-foreground">Current Intensity: <span className="text-primary font-bold">{trackingMode}</span></p>
                </div>
                <div className="flex gap-2">
                    {['Simple', 'Moderate', 'Detailed'].map(m => (
                        <Button 
                            key={m} 
                            variant={trackingMode === m ? 'default' : 'outline'} 
                            size="sm" 
                            className="text-xs h-7"
                            onClick={() => setTrackingMode(m as any)}
                        >
                            {m}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-primary" />
                                Daily Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="text-center space-y-2">
                                <p className="text-4xl font-black">{totalCalories} / {targets.calories}</p>
                                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Calories Consumed</p>
                                <Progress value={(totalCalories / targets.calories) * 100} className="h-3" />
                            </div>
                            {trackingMode === 'Detailed' && (
                                <div className="flex justify-around pt-2">
                                    <MacroRing label="Protein" current={totalProtein} target={targets.protein} color="#F97316" />
                                    <MacroRing label="Carbs" current={totalCarbs} target={targets.carbs} color="#3B82F6" />
                                    <MacroRing label="Fat" current={totalFat} target={targets.fat} color="#EAB308" />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PlusCircle className="w-5 h-5 text-primary" />
                                Meal Logs
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map(type => (
                                <div key={type} className="group p-4 bg-muted/30 rounded-lg border border-transparent hover:border-primary/20 transition-all">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-bold">{type}</h3>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                                            <PlusCircle className="w-5 h-5" />
                                        </Button>
                                    </div>
                                    <div className="mt-2 space-y-2">
                                        {meals.filter(m => m.type === type).map(meal => (
                                            <div key={meal.id} className="flex justify-between items-center text-sm">
                                                <span>{meal.name}</span>
                                                <div className="flex gap-3 text-muted-foreground">
                                                    <span>{meal.calories} kcal</span>
                                                    {trackingMode === 'Detailed' && <span className="font-mono text-[10px]">{meal.protein}P / {meal.carbs}C / {meal.fat}F</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Droplets className="w-5 h-5 text-blue-500" />
                                Hydration
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-center">
                            <div className="flex justify-center gap-2 flex-wrap">
                                {[...Array(10)].map((_, i) => (
                                    <Button 
                                        key={i}
                                        variant="ghost" 
                                        size="icon" 
                                        className={cn("w-8 h-8 rounded-full border", i < waterIntake ? "bg-blue-500 text-white border-blue-600" : "text-muted-foreground")}
                                        onClick={() => setWaterIntake(i + 1)}
                                    >
                                        <Droplets className="w-4 h-4" />
                                    </Button>
                                ))}
                            </div>
                            <p className="text-sm font-bold text-muted-foreground">{waterIntake} / 10 glasses</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Scale className="w-5 h-5 text-primary" />
                                Weight Trend
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={weightData}>
                                    <defs>
                                        <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                                    <XAxis dataKey="day" hide />
                                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="weight" stroke="hsl(var(--primary))" fill="url(#weightGrad)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                        <CardFooter className="pt-0">
                            <p className="text-xs text-muted-foreground text-center w-full">Down <span className="text-green-600 font-bold">1.7 lbs</span> this week</p>
                        </CardFooter>
                    </Card>

                    <Card className="bg-primary/5 border-primary/10">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-primary" />
                                Bio-Insights
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-3 bg-background rounded-lg border text-sm flex gap-3">
                                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <p>You report <span className="font-bold">low energy</span> on days with &lt;20g protein at breakfast. Try eggs or a shake.</p>
                            </div>
                            <div className="p-3 bg-background rounded-lg border text-sm flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                <p>Meal prepping saves you <span className="font-bold text-primary">$45/week</span> on average—supporting both your diet and finance goals.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                Meal Prep
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full text-xs h-8 justify-start gap-2">
                                <ListChecks className="w-4 h-4" /> View Grocery List
                            </Button>
                            <Button variant="outline" className="w-full text-xs h-8 justify-start gap-2">
                                <Calendar className="w-4 h-4" /> Schedule Prep Session
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
