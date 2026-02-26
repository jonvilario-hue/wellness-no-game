
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2, Brain, CheckCircle2, ChevronRight, Apple, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { useWellnessData } from '@/hooks/use-wellness-data';
import { generateAIPanAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export function NutritionArchitect() {
  const { dietaryProfile, calorieTarget, nutritionPlans, addNutritionPlan, deleteNutritionPlan, applyNutritionPlanToCalendar } = useWellnessData();
  const [isGenerating, setIsGenerating] = useState(false);
  const [healthGoal, setHealthGoal] = useState('Maintain health and cognitive focus');
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const plan = await generateAIPanAction({
        dietaryPreference: dietaryProfile.dietaryPreference,
        allergies: dietaryProfile.allergies,
        weeklyBudget: dietaryProfile.weeklyFoodBudget,
        calorieGoal: calorieTarget,
        healthGoal,
        householdSize: dietaryProfile.householdSize
      });

      addNutritionPlan({
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        goal: healthGoal,
        days: plan.days
      });

      toast({ title: "Architecture Synthesized", description: "Your 7-day meal plan is ready.", variant: 'success' });
    } catch (err) {
      console.error(err);
      toast({ title: "Synthesis Failed", description: "AI engine reached a constraint. Try again.", variant: 'destructive' });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Generator Config
            </CardTitle>
            <CardDescription>Customize the AI meal generator inputs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase text-muted-foreground">Primary Health Goal</Label>
              <Input 
                value={healthGoal} 
                onChange={e => setHealthGoal(e.target.value)} 
                placeholder="e.g. Muscle gain, Weight loss..."
              />
            </div>
            <div className="p-3 bg-background rounded-lg border border-primary/10 space-y-2">
              <p className="text-[10px] font-bold uppercase text-muted-foreground">Active Constraints</p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-[8px] uppercase">{dietaryProfile.dietaryPreference}</Badge>
                <Badge variant="secondary" className="text-[8px] uppercase">${dietaryProfile.weeklyFoodBudget} Budget</Badge>
                <Badge variant="secondary" className="text-[8px] uppercase">{calorieTarget} kcal</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full font-bold gap-2" onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
              Generate 7-Day Plan
            </Button>
          </CardFooter>
        </Card>

        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1">Recent Syntheses</h3>
          {nutritionPlans.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed rounded-2xl bg-muted/20 opacity-50">
              <Apple className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm font-bold">No generated plans yet.</p>
              <p className="text-xs">Run the generator to create a custom blueprint.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {nutritionPlans.map(plan => (
                <Card key={plan.id} className="border-primary/10 hover:border-primary/30 transition-all overflow-hidden">
                  <CardHeader className="p-4 bg-muted/30 flex flex-row justify-between items-center space-y-0">
                    <div>
                      <CardTitle className="text-sm font-bold">Plan: {plan.goal}</CardTitle>
                      <p className="text-[10px] text-muted-foreground uppercase font-black">Generated {new Date(plan.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => deleteNutritionPlan(plan.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ScrollArea className="h-40">
                      <div className="grid grid-cols-7 gap-2">
                        {plan.days.map(day => (
                          <div key={day.day} className="space-y-1">
                            <p className="text-[8px] font-black text-center text-muted-foreground uppercase">Day {day.day}</p>
                            <div className="space-y-1">
                              {day.meals.slice(0, 3).map((m, idx) => (
                                <div key={idx} className="p-1 bg-primary/5 rounded text-[8px] leading-tight truncate font-medium">
                                  {m.name}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="p-4 bg-primary/5 border-t border-primary/5">
                    <Button 
                      size="sm" 
                      className="w-full font-bold gap-2 h-9" 
                      onClick={() => applyNutritionPlanToCalendar(plan.id, new Date())}
                    >
                      <CalendarIcon className="w-3.5 h-3.5" />
                      Apply to Active Calendar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
