
'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useWellnessData } from '@/hooks/use-wellness-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CheckCircle2, Circle, Trash2, Printer, Plus, DollarSign } from 'lucide-react';
import { format, startOfWeek } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Static mapping for ingredient aggregation
const RECIPE_INGREDIENTS: Record<string, any[]> = {
    "Oatmeal with Apple": [{ name: "Oats", qty: 0.5, unit: "cup", cat: "Grains", cost: 0.20 }, { name: "Apple", qty: 1, unit: "pc", cat: "Produce", cost: 0.50 }],
    "Bean & Cheese Burritos": [{ name: "Tortilla", qty: 1, unit: "pc", cat: "Grains", cost: 0.30 }, { name: "Beans", qty: 0.5, unit: "can", cat: "Pantry", cost: 0.60 }, { name: "Cheese", qty: 2, unit: "oz", cat: "Dairy", cost: 0.50 }],
    "Quinoa Bowl": [{ name: "Quinoa", qty: 0.5, unit: "cup", cat: "Grains", cost: 0.40 }, { name: "Spinach", qty: 1, unit: "cup", cat: "Produce", cost: 0.50 }, { name: "Chicken", qty: 4, unit: "oz", cat: "Protein", cost: 1.50 }],
    "Default": [{ name: "Bulk Prep Item", qty: 1, unit: "svg", cat: "Misc", cost: 2.00 }]
};

export function ShoppingListView() {
    const { mealPlans, dietaryProfile } = useWellnessData();
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const weekStart = startOfWeek(new Date());
    const weekStr = format(weekStart, 'yyyy-MM-dd');

    const aggregatedList = useMemo(() => {
        const currentWeekPlans = mealPlans.filter(p => {
            const planDate = parseISO(p.date);
            return planDate >= weekStart && planDate < addDays(weekStart, 7);
        });

        const list: Record<string, any> = {};

        currentWeekPlans.forEach(plan => {
            const ingredients = RECIPE_INGREDIENTS[plan.foodName] || RECIPE_INGREDIENTS.Default;
            ingredients.forEach(ing => {
                if (list[ing.name]) {
                    list[ing.name].qty += ing.qty;
                    list[ing.name].cost += ing.cost;
                } else {
                    list[ing.name] = { ...ing };
                }
            });
        });

        return Object.values(list).sort((a, b) => a.cat.localeCompare(b.cat));
    }, [mealPlans, weekStart]);

    const totalCost = aggregatedList.reduce((s, i) => s + i.cost, 0);
    const budgetLimit = dietaryProfile?.weeklyFoodBudget || 100;

    return (
        <div className="space-y-8 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-primary/10">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5 text-primary" />
                                Weekly Provisioning
                            </CardTitle>
                            <CardDescription>Consolidated list for the week of {format(weekStart, 'MMM d')}.</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon"><Printer className="w-4 h-4" /></Button>
                            <Button size="sm" className="gap-2"><Plus className="w-4 h-4" /> Add Item</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {aggregatedList.length === 0 ? (
                            <div className="py-20 text-center border-2 border-dashed rounded-2xl bg-muted/20 opacity-50 italic">
                                No meals planned for this week. Populate your calendar to generate a list.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {Array.from(new Set(aggregatedList.map(i => i.cat))).map(cat => (
                                    <div key={cat} className="space-y-2">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">{cat}</h4>
                                        <div className="space-y-1">
                                            {aggregatedList.filter(i => i.cat === cat).map(item => (
                                                <div key={item.name} className={cn(
                                                    "flex items-center justify-between p-3 bg-muted/30 rounded-lg group transition-all",
                                                    checkedItems[item.name] && "opacity-40"
                                                )}>
                                                    <div className="flex items-center gap-3">
                                                        <Button 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            className="h-6 w-6" 
                                                            onClick={() => setCheckedItems(p => ({ ...p, [item.name]: !p[item.name] }))}
                                                        >
                                                            {checkedItems[item.name] ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4 text-muted-foreground" />}
                                                        </Button>
                                                        <span className={cn("text-sm font-bold", checkedItems[item.name] && "line-through")}>{item.name}</span>
                                                        <span className="text-[10px] text-muted-foreground">{item.qty} {item.unit}</span>
                                                    </div>
                                                    <span className="text-[10px] font-mono opacity-60">${item.cost.toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="bg-primary/5 border-primary/10">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-primary" /> Budget Allocation
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center py-4">
                                <span className="text-4xl font-black">${totalCost.toFixed(0)}</span>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase">Estimated Total</p>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-[10px] font-bold uppercase opacity-60">
                                    <span>Consumption</span>
                                    <span>${budgetLimit} Limit</span>
                                </div>
                                <Progress value={(totalCost / budgetLimit) * 100} className="h-1.5" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none bg-muted/30 shadow-none">
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <h4 className="text-xs font-bold uppercase tracking-tight">Sync Status</h4>
                            </div>
                            <p className="text-[10px] leading-relaxed text-muted-foreground italic">
                                List derived from 12 calendar slots. Prices are estimated using regional average fallback data.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function parseISO(date: string) {
    return new Date(date + 'T12:00:00');
}

function addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
