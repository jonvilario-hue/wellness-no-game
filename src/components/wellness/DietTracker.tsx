
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
    Zap, ClipboardList, BookOpen, Coffee, MessageSquare
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';
import { SynergyPanel } from './SynergyPanel';

type NutritionMode = 'Detailed' | 'Moderate' | 'Simple';

const weightData = [
    { day: 'Mon', weight: 185.2 }, { day: 'Tue', weight: 184.8 }, { day: 'Wed', weight: 185.0 },
    { day: 'Thu', weight: 184.5 }, { day: 'Fri', weight: 184.1 }, { day: 'Sat', weight: 183.9 }, { day: 'Sun', weight: 183.5 },
];

export function DietTracker() {
    const [mode, setMode] = useState<NutritionMode>('Detailed');
    const [waterIntake, setWaterIntake] = useState(4);
    const [weight, setWeight] = useState('183.5');
    const [calories, setCalories] = useState({ current: 1450, target: 2200 });
    const [macros] = useState({ p: 140, c: 180, f: 60 }); // Targets

    const habits = [
        { id: 'h1', label: 'Ate vegetables with lunch', done: true },
        { id: 'h2', label: '8 glasses of water', done: false },
        { id: 'h3', label: 'No snacking after 8pm', done: true },
        { id: 'h4', label: 'Balanced breakfast', done: false },
    ];

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Header Control */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-4 rounded-xl border">
                <div className="space-y-1">
                    <h2 className="text-lg font-bold">Goal: Maintenance & Recovery</h2>
                    <p className="text-xs text-muted-foreground">Tracking Intensity: <span className="text-primary font-bold">{mode}</span></p>
                </div>
                <div className="flex bg-muted p-1 rounded-lg">
                    {(['Simple', 'Moderate', 'Detailed'] as NutritionMode[]).map(m => (
                        <button 
                            key={m} 
                            onClick={() => setMode(m)}
                            className={cn(
                                "text-[10px] font-bold uppercase px-3 py-1.5 rounded-md transition-all",
                                mode === m ? "bg-background shadow-sm text-primary" : "text-muted-foreground"
                            )}
                        >
                            {m}
                        </button>
                    ))}
                </div>
            </div>

            <SynergyPanel />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Primary Tracking */}
                    <Card className="border-primary/10">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Zap className="w-4 h-4 text-primary" />
                                Today's Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8 py-6">
                            <div className="text-center space-y-3">
                                <div className="flex justify-center items-baseline gap-2">
                                    <span className="text-4xl font-black">{calories.current}</span>
                                    <span className="text-sm text-muted-foreground font-bold uppercase tracking-widest">/ {calories.target} kcal</span>
                                </div>
                                <Progress value={(calories.current / calories.target) * 100} className="h-3" />
                            </div>

                            {mode === 'Detailed' && (
                                <div className="grid grid-cols-3 gap-4">
                                    {['Protein', 'Carbs', 'Fat'].map((macro, i) => (
                                        <div key={macro} className="flex flex-col items-center gap-2">
                                            <div className="w-full bg-muted rounded-full h-1">
                                                <div className="bg-primary h-full rounded-full" style={{ width: '65%' }} />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase text-muted-foreground">{macro}</span>
                                            <span className="text-sm font-black">92g <span className="text-[10px] font-normal opacity-50">/ 140g</span></span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Meal Logging */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-base">Meal History</CardTitle>
                            <Button size="sm" variant="ghost" className="h-8 gap-2 text-primary font-bold">
                                <PlusCircle className="w-4 h-4" /> Log Food
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map(meal => (
                                <div key={meal} className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-muted/20 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-muted rounded-lg"><Coffee className="w-4 h-4 text-muted-foreground" /></div>
                                        <div>
                                            <p className="text-sm font-bold">{meal}</p>
                                            <p className="text-[10px] text-muted-foreground">Logged at 08:30 AM</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black">450 kcal</p>
                                        <p className="text-[10px] text-muted-foreground">32g Protein</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Habit Based Tracking (Always visible if Simple or mixed) */}
                    {(mode === 'Simple' || mode === 'Moderate') && (
                        <Card className="bg-primary/[0.02]">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    Daily Habits
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {habits.map(habit => (
                                    <button 
                                        key={habit.id}
                                        className={cn(
                                            "flex items-center justify-between p-3 rounded-lg border transition-all text-left",
                                            habit.done ? "bg-green-500/10 border-green-500/20 text-green-700" : "bg-background border-muted hover:border-primary/20"
                                        )}
                                    >
                                        <span className="text-xs font-bold">{habit.label}</span>
                                        {habit.done && <CheckCircle2 className="w-4 h-4" />}
                                    </button>
                                ))}
                            </CardContent>
                        </Card>
                    )}
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
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-baseline">
                                <span className="text-2xl font-black">{weight} lbs</span>
                                <span className="text-[10px] font-bold text-green-600">-1.7 lbs / wk</span>
                            </div>
                            <div className="h-32 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={weightData}>
                                        <defs>
                                            <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="day" hide />
                                        <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="weight" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorWeight)" strokeWidth={2} />
                                    </AreaChart>
                                </ResponsiveContainer>
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
                                {[...Array(10)].map((_, i) => (
                                    <Button 
                                        key={i}
                                        variant="ghost" 
                                        size="icon" 
                                        className={cn("w-7 h-7 rounded-full border border-blue-500/20", i < waterIntake ? "bg-blue-500 text-white" : "text-blue-500/40")}
                                        onClick={() => setWaterIntake(i + 1)}
                                    >
                                        <Droplets className="w-3 h-3" />
                                    </Button>
                                ))}
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Goal: 10 Glasses</p>
                        </CardContent>
                    </Card>

                    {/* Energy Correlation */}
                    <Card className="bg-primary/5 border-primary/10">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <Brain className="w-4 h-4 text-primary" />
                                Bio-Feedback
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="p-3 bg-background rounded-lg border text-[11px] leading-relaxed flex gap-2">
                                <Info className="w-4 h-4 text-primary shrink-0" />
                                <p>You reported <span className="font-bold">Low Energy</span> at 2pm on days where breakfast protein was below 20g. Aim for 30g tomorrow.</p>
                            </div>
                            <Button variant="outline" size="sm" className="w-full text-[10px] h-7 gap-2" asChild>
                                <Link href="/journal">
                                    <MessageSquare className="w-3 h-3" /> Add Mindful Eating Note
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Meal Prep Integration */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <ClipboardList className="w-4 h-4 text-muted-foreground" />
                                Planning & Prep
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full h-8 text-[10px] justify-start gap-2 border-primary/10">
                                <BookOpen className="w-3.5 h-3.5 text-primary" /> View Weekly Meal Plan
                            </Button>
                            <Button variant="outline" className="w-full h-8 text-[10px] justify-start gap-2 border-primary/10">
                                <Apple className="w-3.5 h-3.5 text-primary" /> Generate Grocery List
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card className="bg-muted/20 border-dashed">
                <CardFooter className="pt-6">
                    <p className="text-[10px] text-muted-foreground italic text-center w-full">Disclaimer: This tool is for tracking and educational purposes. Consult a medical professional for dietary or weight management advice.</p>
                </CardFooter>
            </Card>
        </div>
    );
}
