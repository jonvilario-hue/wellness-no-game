
'use client';

import { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Rocket, ArrowRight, Info, ChevronDown, ChevronUp, ChevronRight, 
  CheckCircle2, Circle, LayoutList, BookOpen, Zap, Clock
} from 'lucide-react';
import Link from 'next/link';
import { useWellnessData, useMovementLogs, useStillnessLogs, useCommunicationLogs } from '@/hooks/use-wellness-data';
import { useSpeedReadingStore } from '@/hooks/use-speedreading-store';
import { wellnessPlans, type WellnessPlan } from '@/data/wellness-plans';
import { AssistantTooltip } from '@/components/assistant-tooltip';
import { cn } from '@/lib/utils';

interface JourneyPlansSectionProps {
  category: "Movement" | "Stillness" | "Communication" | "Speed Reading";
}

export function JourneyPlansSection({ category }: JourneyPlansSectionProps) {
  const { 
    planProgress, dismissedPlans, setPlanDismissed,
  } = useWellnessData();
  
  const movementLogs = useMovementLogs();
  const stillnessLogs = useStillnessLogs();
  const communicationLogs = useCommunicationLogs();
  const { logs: readingLogs } = useSpeedReadingStore();
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tabPlans = useMemo(() => {
    return wellnessPlans.filter(p => p.category === category);
  }, [category]);

  const logs = useMemo(() => {
    switch(category) {
      case 'Movement': return movementLogs;
      case 'Stillness': return stillnessLogs;
      case 'Communication': return communicationLogs;
      case 'Speed Reading': return readingLogs;
      default: return [];
    }
  }, [category, movementLogs, stillnessLogs, communicationLogs, readingLogs]);

  const activePlan = useMemo(() => {
    return tabPlans.find(plan => {
      const progress = planProgress[plan.id];
      if (!progress) return false;
      const completedCount = Object.values(progress).filter(Boolean).length;
      return completedCount > 0 && completedCount < plan.durationDays;
    });
  }, [planProgress, tabPlans]);

  const nextRecommendedPlan = useMemo(() => {
    return tabPlans.find(plan => {
      const progress = planProgress[plan.id] || {};
      const completedCount = Object.values(progress).filter(Boolean).length;
      return completedCount < plan.durationDays;
    });
  }, [planProgress, tabPlans]);

  const allCompleted = useMemo(() => {
    if (tabPlans.length === 0) return true;
    return tabPlans.every(plan => {
      const progress = planProgress[plan.id];
      if (!progress) return false;
      return Object.values(progress).filter(Boolean).length === plan.durationDays;
    });
  }, [planProgress, tabPlans]);

  if (!mounted) return null;
  if (allCompleted) return null;

  const hasLogs = (logs || []).length > 0;
  const isDismissed = dismissedPlans[category] || false;

  // --- STATE 3: ACTIVE PLAN ---
  if (activePlan) {
    const completedCount = Object.values(planProgress[activePlan.id]).filter(Boolean).length;
    const progress = (completedCount / activePlan.durationDays) * 100;
    
    return (
      <div className="animate-in fade-in slide-in-from-top-2 duration-500">
        <Link href={`/exercises/plans/${activePlan.id}`}>
          <div className="flex items-center justify-between p-2 px-4 rounded-full bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-all group min-w-[280px]">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Rocket className="w-4 h-4 text-primary shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-tight truncate">
                    {activePlan.title}
                  </p>
                  <span className="text-[8px] font-black text-muted-foreground">
                    {completedCount + 1}/{activePlan.durationDays}
                  </span>
                </div>
                <div className="mt-1 w-full max-w-[100px]">
                  <Progress value={progress} className="h-0.5" />
                </div>
              </div>
            </div>
            <ChevronRight className="w-3 h-3 text-primary ml-2 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>
      </div>
    );
  }

  // --- STATE 1: EMPTY STATE OR EXPLICITLY EXPANDED ---
  if ((!hasLogs && !isDismissed) || isExpanded) {
    return (
      <div className="fixed inset-x-0 top-[180px] z-30 flex justify-center px-4 animate-in fade-in slide-in-from-top-2 duration-500 pointer-events-none">
        <div className="w-full max-w-7xl pointer-events-auto">
          <Card className="shadow-2xl border-primary/20 bg-background/95 backdrop-blur-md">
            <CardHeader className="p-4 flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <CardTitle className="text-sm font-black uppercase tracking-widest">
                  {category} Guided Curricula
                </CardTitle>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => isExpanded ? setIsExpanded(false) : setPlanDismissed(category, true)}
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tabPlans.map((plan) => (
                  <Link key={plan.id} href={`/exercises/plans/${plan.id}`}>
                    <Card className={cn(
                      "hover:border-primary/50 transition-all h-full group bg-card border-primary/5",
                      plan.durationDays === 1 && "border-primary/20 ring-1 ring-primary/10"
                    )}>
                      <CardHeader className="p-4 pb-2">
                        <Badge variant={plan.durationDays === 1 ? "default" : "secondary"} className="uppercase font-black text-[8px] tracking-widest h-4 w-fit mb-2">
                          {plan.durationDays === 1 ? 'RECOMMENDED' : `${plan.durationDays} DAYS`}
                        </Badge>
                        <CardTitle className="text-sm font-bold group-hover:text-primary transition-colors">{plan.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">{plan.description}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="ghost" size="sm" className="w-full h-7 text-[9px] font-black uppercase border border-primary/5 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          Start Protocol <ArrowRight className="ml-1 w-3 h-3" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // --- STATE 2: ACTIVE/DISMISSED (COMPACT BAR) ---
  return (
    <div className="animate-in fade-in duration-500">
      <div className={cn(
        "flex items-center gap-4 p-2 px-4 rounded-full border bg-background/50 backdrop-blur-sm transition-all",
        "border-primary/10 hover:border-primary/30"
      )}>
        <div className="flex items-center gap-2 text-muted-foreground">
          <BookOpen className="w-3.5 h-3.5" />
          <span className="text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
            {category} Curricula · Next: {nextRecommendedPlan?.title || 'All Complete!'}
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 gap-1 px-3 text-[9px] font-black uppercase text-primary hover:bg-primary/5 border border-primary/10 rounded-full"
          onClick={() => setIsExpanded(true)}
        >
          View Plans <ChevronDown className="w-2.5 h-2.5" />
        </Button>
      </div>
    </div>
  );
}
