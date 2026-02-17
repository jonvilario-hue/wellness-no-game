
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import WellnessTabs from '@/components/wellness/WellnessTabs';
import WellnessHeatmap from '@/components/wellness/WellnessHeatmap';
import RoutineBuilderModal from '@/components/wellness/RoutineBuilderModal';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, HeartPulse, Zap, ZapOff, Flame, InfoIcon, Lightbulb, Play, Trash2, Rocket, ArrowRight } from 'lucide-react';
import { useWellnessData, calculateStreak } from '@/hooks/use-wellness-data';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { QuickLogBar } from '@/components/wellness/QuickLogBar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';
import { RoutinePlayer } from '@/components/wellness/RoutinePlayer';
import { wellnessLibrary } from '@/data/wellness-library';
import { wellnessPlans } from '@/data/wellness-plans';
import Link from 'next/link';

const QUICK_PICKS = [
  { label: "Neck & Shoulders", tags: ["neck"] },
  { label: "Hips & Low Back", tags: ["hips", "low-back"] },
  { label: "Desk Reset", tags: ["desk"] },
  { label: "Low Energy", tags: ["low-energy"] },
  { label: "Morning", tags: ["morning"] },
  { label: "Before Sleep", tags: ["sleep"] },
  { label: "Under 3 Min", tags: ["quick"] },
  { label: "Feeling Anxious", tags: ["anxiety"] },
];

export default function ExercisesPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeRoutineIds, setActiveRoutineIds] = useState<string[] | null>(null);
  const [activeRoutineName, setActiveRoutineName] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const { lowEnergyMode, setLowEnergyMode, movementLogs, stillnessLogs, routines, deleteRoutine, completions, planProgress } = useWellnessData();
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

  const activityData = useMemo(() => {
    const combined = [...movementLogs, ...stillnessLogs];
    const counts: Record<string, number> = {};
    combined.forEach(l => {
        const d = format(new Date(l.timestamp), 'yyyy-MM-dd');
        counts[d] = (counts[d] || 0) + 1;
    });
    return Object.entries(counts).map(([date, count]) => ({ date, count }));
  }, [movementLogs, stillnessLogs]);

  const handleStartRoutine = (ids: string[], name: string = "Custom Routine") => {
    setActiveRoutineIds(ids);
    setActiveRoutineName(name);
  };

  const toggleTag = (tags: string[]) => {
    setSelectedTags(prev => {
      const allTags = new Set(prev);
      const isPresent = tags.every(t => allTags.has(t));
      if (isPresent) {
        tags.forEach(t => allTags.delete(t));
      } else {
        tags.forEach(t => allTags.add(t));
      }
      return Array.from(allTags);
    });
  };

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
      <main className="flex-1 p-4 sm:p-6 md:p-8 pb-24">
        <div className="mx-auto max-w-7xl space-y-8">
            
            {/* STREAK WIDGET */}
            <div className="flex justify-center">
              <Card className="bg-primary/5 border-primary/10 rounded-full py-2 px-6 shadow-sm">
                  <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-500" />
                      <span className="text-xl font-black">{streak}</span>
                      <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Wellness Streak</span>
                  </div>
                  </div>
              </Card>
            </div>

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
                <Collapsible open={isOpen} onOpenChange={handleOpenChange} className="w-full">
                  <div className="flex justify-between items-start">
                      <div className="flex-grow">
                        <CollapsibleContent>
                            <div className="flex flex-col items-center text-center pb-4">
                                <HeartPulse className="mx-auto h-12 w-12 text-primary mb-2"/>
                                <h1 className="text-4xl font-bold font-headline tracking-tight">Health Check</h1>
                                <p className="text-lg text-muted-foreground">Actionable wellness for body and brain. Log your daily reps.</p>
                            </div>
                        </CollapsibleContent>
                      </div>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon">
                            {isOpen ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>
                  </div>
                </Collapsible>

                {/* QUICK PICKS BAR */}
                <div className="w-full overflow-x-auto no-scrollbar pb-2">
                  <div className="flex gap-2 w-max">
                    {QUICK_PICKS.map((pick) => {
                      const isActive = pick.tags.every(t => selectedTags.includes(t));
                      return (
                        <Button
                          key={pick.label}
                          variant={isActive ? "default" : "outline"}
                          size="sm"
                          className={cn("rounded-full font-bold transition-all", isActive && "shadow-md")}
                          onClick={() => toggleTag(pick.tags)}
                        >
                          {pick.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* PLANS SECTION */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Journey Plans</h3>
                  <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                    {wellnessPlans.map((plan) => (
                      <Link key={plan.id} href={`/exercises/plans/${plan.id}`} className="min-w-[280px]">
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
            
            <WellnessTabs filterTags={selectedTags} />

            <div className="space-y-8 pt-8 border-t border-primary/5">
              <WellnessHeatmap activityData={activityData} />
            </div>
        </div>
      </main>
      <QuickLogBar />
    </>
  );
}
