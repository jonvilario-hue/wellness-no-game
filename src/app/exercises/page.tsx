
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import WellnessTabs from '@/components/wellness/WellnessTabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, HeartPulse, Zap, ZapOff, Flame, Rocket, ArrowRight, Info } from 'lucide-react';
import { useWellnessData, calculateStreak } from '@/hooks/use-wellness-data';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { format } from 'date-fns';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';
import { RoutinePlayer } from '@/components/wellness/RoutinePlayer';
import { wellnessPlans } from '@/data/wellness-plans';
import { WellnessBalance } from '@/components/wellness/WellnessBalance';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';

export default function ExercisesPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeRoutineIds, setActiveRoutineIds] = useState<string[] | null>(null);
  const [activeRoutineName, setActiveRoutineName] = useState<string>("");
  
  const { lowEnergyMode, setLowEnergyMode, movementLogs, stillnessLogs, completions, planProgress } = useWellnessData();
  const { settings } = useDashboardSettings();

  useEffect(() => {
    const savedState = localStorage.getItem('health-check-collapsible-state');
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState));
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    localStorage.setItem('health-check-collapsible-state', JSON.stringify(open));
  };

  const streak = useMemo(() => calculateStreak(completions), [completions]);

  const activePlan = useMemo(() => {
    return wellnessPlans.find(plan => {
      const progress = planProgress[plan.id];
      if (!progress) return false;
      const completedCount = Object.values(progress).filter(Boolean).length;
      return completedCount > 0 && completedCount < plan.steps.length;
    });
  }, [planProgress]);

  if (activeRoutineIds) {
    return (
      <RoutinePlayer 
        exerciseIds={activeRoutineIds} 
        routineName={activeRoutineName}
        onClose={() => setActiveRoutineIds(null)} 
      />
    );
  }

  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8 pb-24 overflow-x-hidden">
        <div className="mx-auto max-w-7xl space-y-8">
            
            {/* ACTIVE PLAN BANNER */}
            {activePlan && (
              <Link href={`/exercises/plans/${activePlan.id}`}>
                <Card className="bg-primary border-primary text-primary-foreground p-4 flex items-center justify-between group hover:opacity-90 transition-opacity">
                  <div className="flex items-center gap-3">
                    <Rocket className="w-5 h-5" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest opacity-80">Continue Journey</p>
                      <p className="font-black text-lg">{activePlan.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">
                      Day {Object.values(planProgress[activePlan.id]).filter(Boolean).length + 1} of {activePlan.steps.length}
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            )}

            <div className="flex flex-col gap-4">
                <Collapsible open={isOpen} onOpenChange={handleOpenChange} className="w-full relative">
                  <div className="absolute top-0 right-0 z-10">
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10">
                            {isOpen ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>
                  </div>

                  <CollapsibleContent className="space-y-8">
                      <div className="flex flex-col items-center text-center pb-4 px-10 space-y-4">
                          <div>
                            <HeartPulse className="mx-auto h-12 w-12 text-primary mb-2"/>
                            <h1 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight">Health Check</h1>
                            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">Actionable wellness for body and brain. Log your daily reps.</p>
                          </div>

                          {/* WELLNESS STREAK */}
                          <Card className="bg-primary/5 border-primary/10 rounded-full py-2 px-6 shadow-sm w-fit">
                              <div className="flex items-center gap-2">
                                  <Flame className="w-5 h-5 text-orange-500" />
                                  <span className="text-xl font-black">{streak}</span>
                                  <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Wellness Streak</span>
                              </div>
                          </Card>
                      </div>

                      {/* PLANS SECTION */}
                      <div className="space-y-3 overflow-hidden">
                        <div className="flex items-center justify-between px-1">
                          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Journey Plans</h3>
                          <TooltipProvider>
                            <Tooltip delayDuration={0}>
                              <TooltipTrigger asChild>
                                <button className="text-muted-foreground hover:text-primary transition-colors">
                                  <Info className="w-3.5 h-3.5" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-[250px] text-[10px] leading-relaxed">
                                Journey Plans are structured curricula (3-14 days) designed to build specific physiological foundations. 
                                They progress from low-friction starts to high-intensity practices.
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                          {wellnessPlans.map((plan) => (
                            <Link key={plan.id} href={`/exercises/plans/${plan.id}`} className="min-w-[260px] sm:min-w-[280px]">
                              <Card className="hover:border-primary/50 transition-all h-full group">
                                <CardHeader className="p-4">
                                  <CardTitle className="text-base">{plan.title}</CardTitle>
                                  <CardDescription className="text-[10px] uppercase font-black">{plan.steps.length} DAYS</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                  <p className="text-xs text-muted-foreground line-clamp-2">{plan.description}</p>
                                </CardContent>
                              </Card>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* GLOBAL BALANCE */}
                      <WellnessBalance />
                  </CollapsibleContent>

                  {!isOpen && (
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-xl font-bold font-headline tracking-tight">Health Check</h1>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-auto py-1 px-4 text-[10px] uppercase font-black text-muted-foreground hover:text-primary gap-1">
                          <ChevronDown className="h-3 w-3" /> Expand Insights
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  )}
                </Collapsible>

                <div className="flex flex-col items-center gap-4">
                    <div className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-full border transition-all",
                        lowEnergyMode ? "bg-amber-500/10 border-amber-500/30" : "bg-muted/50 border-transparent"
                    )}>
                        {lowEnergyMode ? <ZapOff className="w-4 h-4 text-amber-500" /> : <Zap className="w-4 h-4 text-primary" />}
                        <Label htmlFor="mvd-toggle" className="text-sm font-bold cursor-pointer">
                            Low Energy Mode (MVD)
                        </Label>
                        <Switch 
                            id="mvd-toggle" 
                            checked={lowEnergyMode} 
                            onCheckedChange={setLowEnergyMode}
                        />
                    </div>
                </div>
            </div>
            
            <WellnessTabs />
        </div>
      </main>
    </>
  );
}
