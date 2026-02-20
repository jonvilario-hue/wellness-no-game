
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Plus, CheckCircle2, Circle, ChevronLeft, ChevronRight, Utensils, Zap, Apple } from 'lucide-react';
import { useWellnessData, type MealPlan } from '@/hooks/use-wellness-data';
import { useToast } from '@/hooks/use-toast';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogFooter,
    DialogDescription 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SubstitutionDialog } from './SubstitutionDialog';

const SLOTS = ["Breakfast", "Lunch", "Dinner", "Snacks"] as const;

export function MealPlannerCalendar() {
    const { mealPlans, addMealPlan, updateMealPlan, addMealLog } = useWellnessData();
    const [viewDate, setViewDate] = useState(new Date());
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSwapOpen, setIsSwapOpen] = useState(false);
    const [targetSlot, setTargetSlot] = useState<{ date: string, slot: string } | null>(null);
    const [foodName, setFoodName] = useState('');
    const { toast } = useToast();

    const weekDays = useMemo(() => {
        const start = startOfWeek(viewDate);
        return Array.from({ length: 7 }, (_, i) => addDays(start, i));
    }, [viewDate]);

    const handleLogConsumed = (plan: MealPlan) => {
        if (plan.logged) return;
        
        addMealLog({
            date: plan.date,
            mealType: plan.mealType as any,
            foodName: plan.foodName,
            calories: 350, // Default estimate
            protein: 20,
            carbs: 40,
            fat: 10
        });

        updateMealPlan(plan.id, { logged: true, loggedAt: new Date().toISOString() });
        toast({ title: "Meal Consumed", description: "Pushed to daily logs.", variant: 'success' });
    };

    const handleAddPlan = () => {
        if (!targetSlot || !foodName) return;
        addMealPlan({
            date: targetSlot.date,
            mealType: targetSlot.slot,
            foodName,
            logged: false
        });
        setIsAddModalOpen(false);
        setFoodName('');
    };

    return (
        <div className="space-y-6 animate-in fade-in">
            <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => setViewDate(subDays(viewDate, 7))}><ChevronLeft className="w-4 h-4" /></Button>
                    <h3 className="text-xl font-black uppercase tracking-tighter">Week of {format(weekDays[0], 'MMM d')}</h3>
                    <Button variant="outline" size="icon" onClick={() => setViewDate(addDays(viewDate, 7))}><ChevronRight className="w-4 h-4" /></Button>
                </div>
                <Button variant="ghost" className="text-xs font-bold uppercase" onClick={() => setViewDate(new Date())}>Reset to Today</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {weekDays.map(day => {
                    const dStr = format(day, 'yyyy-MM-dd');
                    const isToday = isSameDay(new Date(), day);

                    return (
                        <div key={dStr} className="space-y-2">
                            <div className={cn(
                                "p-2 text-center rounded-t-xl border-b-2",
                                isToday ? "bg-primary text-primary-foreground border-primary" : "bg-muted/50 border-primary/10"
                            )}>
                                <p className="text-[10px] font-black uppercase opacity-70">{format(day, 'EEE')}</p>
                                <p className="text-lg font-black">{format(day, 'd')}</p>
                            </div>

                            <div className="space-y-2">
                                {SLOTS.map(slot => {
                                    const plan = mealPlans.find(p => p.date === dStr && p.mealType === slot);
                                    
                                    return (
                                        <Card key={slot} className={cn(
                                            "min-h-[100px] flex flex-col group transition-all",
                                            plan?.logged ? "opacity-50 grayscale bg-muted/20" : "hover:border-primary/30"
                                        )}>
                                            <CardHeader className="p-2 pb-1 border-b border-primary/5 bg-muted/10">
                                                <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">{slot}</p>
                                            </CardHeader>
                                            <CardContent className="p-2 flex-grow flex flex-col justify-center items-center text-center">
                                                {plan ? (
                                                    <div className="space-y-2 w-full">
                                                        <p className="text-[10px] font-bold leading-tight line-clamp-2">{plan.foodName}</p>
                                                        <div className="flex gap-1 justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Button 
                                                                size="sm" 
                                                                variant="ghost" 
                                                                className="h-6 w-6 p-0" 
                                                                onClick={() => handleLogConsumed(plan)}
                                                                disabled={plan.logged}
                                                            >
                                                                {plan.logged ? <CheckCircle2 className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
                                                            </Button>
                                                            <Button 
                                                                size="sm" 
                                                                variant="ghost" 
                                                                className="h-6 w-6 p-0"
                                                                onClick={() => { setTargetSlot({ date: dStr, slot }); setIsSwapOpen(true); }}
                                                            >
                                                                <Zap className="w-3 h-3 text-amber-500" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        className="h-10 w-10 p-0 rounded-full opacity-0 group-hover:opacity-100 border border-dashed"
                                                        onClick={() => { setTargetSlot({ date: dStr, slot }); setIsAddModalOpen(true); }}
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Plan a Meal</DialogTitle>
                        <DialogDescription>Assign a food or recipe to this calendar slot.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-bold uppercase">Food Name</Label>
                            <Input value={foodName} onChange={e => setFoodName(e.target.value)} placeholder="e.g. Scrambled Eggs & Toast" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleAddPlan} disabled={!foodName}>Save to Calendar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {targetSlot && (
                <SubstitutionDialog 
                    open={isSwapOpen} 
                    onOpenChange={setIsSwapOpen} 
                    currentMealName={mealPlans.find(p => p.date === targetSlot.date && p.mealType === targetSlot.slot)?.foodName || ""}
                    onSelect={(newFood) => {
                        const existing = mealPlans.find(p => p.date === targetSlot.date && p.mealType === targetSlot.slot);
                        if (existing) updateMealPlan(existing.id, { foodName: newFood });
                        setIsSwapOpen(false);
                    }}
                />
            )}
        </div>
    );
}
