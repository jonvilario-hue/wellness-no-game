'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Sparkles, ChefHat, CheckCircle2, AlertTriangle, ArrowRight, DollarSign, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useWellnessData, type MealPlan } from '@/hooks/use-wellness-data';
import { useToast } from '@/hooks/use-toast';
import { format, startOfWeek, addDays } from 'date-fns';
import { cn } from '@/lib/utils';

const STARTER_GUIDES = [
    {
        id: "guide-budget",
        name: "Budget Friendly Under $5/Day",
        description: "Nutrient-dense meals utilizing staples like oats, beans, and seasonal produce.",
        tags: ["budget", "frugal"],
        targetCalories: 2000,
        macroRatios: { p: 20, c: 50, f: 30 },
        costRange: { low: 3, high: 5 },
        templateDays: [
            { Breakfast: "Oatmeal with Apple", Lunch: "Bean & Cheese Burritos", Dinner: "Quinoa Bowl", Snacks: "Peanut Butter" }
        ]
    },
    {
        id: "guide-protein",
        name: "High-Protein Meal Prep",
        description: "Engineered for muscle synthesis and cognitive alertness.",
        tags: ["high-protein", "fitness"],
        targetCalories: 2400,
        macroRatios: { p: 40, c: 30, f: 30 },
        costRange: { low: 8, high: 12 },
        templateDays: [
            { Breakfast: "Greek Yogurt & Nuts", Lunch: "Chicken Breast & Broccoli", Dinner: "Grilled Salmon", Snacks: "Protein Shake" }
        ]
    },
    {
        id: "guide-vegetarian",
        name: "Vegetarian on a Budget",
        description: "Plant-based efficiency. Low cost, high micronutrient density.",
        tags: ["vegetarian", "budget"],
        targetCalories: 1800,
        macroRatios: { p: 25, c: 45, f: 30 },
        costRange: { low: 4, high: 6 },
        templateDays: [
            { Breakfast: "Egg Scramble", Lunch: "Lentil Soup", Dinner: "Sweet Potato Tacos", Snacks: "Fruit" }
        ]
    },
    {
        id: "guide-quick",
        name: "Quick Meals Under 15 Minutes",
        description: "Zero-friction nutrition for high-output workdays.",
        tags: ["quick", "productivity"],
        targetCalories: 2100,
        macroRatios: { p: 30, c: 40, f: 30 },
        costRange: { low: 6, high: 9 },
        templateDays: [
            { Breakfast: "Protein Smoothie", Lunch: "Tuna Wrap", Dinner: "Express Quinoa", Snacks: "Trail Mix" }
        ]
    },
    {
        id: "guide-heart",
        name: "Low-Sodium Heart Healthy",
        description: "Focused on cardiovascular resilience and blood pressure management.",
        tags: ["health", "low-sodium"],
        targetCalories: 1900,
        macroRatios: { p: 25, c: 50, f: 25 },
        costRange: { low: 7, high: 10 },
        templateDays: [
            { Breakfast: "Whole Grain Cereal", Lunch: "Hummus & Veggie Sandwich", Dinner: "Baked Cod", Snacks: "Unsalted Nuts" }
        ]
    }
];

export function MealGuideLibrary() {
    const [search, setSearch] = useState('');
    const { addMealPlan, mealPlans, dietaryProfile } = useWellnessData();
    const { toast } = useToast();

    const handleApplyGuide = (guide: typeof STARTER_GUIDES[0]) => {
        const weekStart = startOfWeek(new Date());
        let addedCount = 0;

        for (let i = 0; i < 7; i++) {
            const date = format(addDays(weekStart, i), 'yyyy-MM-dd');
            const dayTemplate = guide.templateDays[0]; // Simplification for MVP

            Object.entries(dayTemplate).forEach(([slot, food]) => {
                const existing = mealPlans.find(p => p.date === date && p.mealType === slot);
                if (!existing) {
                    addMealPlan({
                        date,
                        mealType: slot,
                        foodName: food as string,
                        logged: false
                    });
                    addedCount++;
                }
            });
        }

        toast({ 
            title: "Guide Applied", 
            description: `Generated ${addedCount} meal assignments for the current week.`,
            variant: 'success'
        });
    };

    const isCompatible = (guide: typeof STARTER_GUIDES[0]) => {
        if (!dietaryProfile?.dietaryPreference) return true;
        if (dietaryProfile.dietaryPreference === 'vegetarian' && guide.tags.includes('high-protein') && !guide.tags.includes('vegetarian')) return false;
        return true;
    };

    const filtered = STARTER_GUIDES.filter(g => 
        g.name.toLowerCase().includes(search.toLowerCase()) || 
        g.tags.some(t => t.includes(search.toLowerCase()))
    );

    return (
        <div className="space-y-8 animate-in fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search protocols (e.g. vegan, low carb)..." 
                        className="pl-10" 
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Badge variant="secondary" className="h-8">Budget Range: All</Badge>
                    <Badge variant="secondary" className="h-8">Macros: All</Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(guide => {
                    const compatible = isCompatible(guide);
                    return (
                        <Card key={guide.id} className={cn("flex flex-col group", !compatible && "border-amber-500/20")}>
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary"><ChefHat className="w-5 h-5" /></div>
                                    <div className="flex flex-wrap gap-1 justify-end">
                                        {guide.tags.map(t => <Badge key={t} variant="outline" className="text-[8px] uppercase">{t}</Badge>)}
                                    </div>
                                </div>
                                <CardTitle className="text-base group-hover:text-primary transition-colors">{guide.name}</CardTitle>
                                <CardDescription className="text-xs line-clamp-2">{guide.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow space-y-4">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="p-2 bg-muted/30 rounded-lg text-center">
                                        <p className="text-[8px] font-black uppercase text-muted-foreground">Calories</p>
                                        <p className="text-sm font-bold">{guide.targetCalories}</p>
                                    </div>
                                    <div className="p-2 bg-muted/30 rounded-lg text-center">
                                        <p className="text-[8px] font-black uppercase text-muted-foreground">Est. Cost</p>
                                        <p className="text-sm font-bold">${guide.costRange.low}-${guide.costRange.high}/d</p>
                                    </div>
                                </div>
                                
                                {!compatible && (
                                    <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center gap-2 text-[10px] text-amber-700">
                                        <AlertTriangle className="w-3 h-3" />
                                        <span>Possible conflict with your profile constraints.</span>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="pt-0">
                                <Button className="w-full font-bold gap-2" onClick={() => handleApplyGuide(guide)}>
                                    Apply Template <ArrowRight className="w-4 h-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}