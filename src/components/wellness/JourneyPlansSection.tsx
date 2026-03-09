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
import { useWellnessData } from '@/hooks/use-wellness-data';
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
    movementLogs, stillnessLogs, communicationLogs 
  } = useWellnessData();
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

  const hasLogs = logs.length > 0;
  const isDismissed = dismissedPlans[category] || false;

  // --- STATE 3: ACTIVE PLAN ---
  if (activePlan) {
    const completedCount = Object.values(planProgress[activePlan.id]).filter(Boolean).length;
    const progress = (completedCount / activePlan.durationDays) * 100;
    
    return (
      <div className="animate-in fade-in slide-in-from-top-2 duration-500 mb-6">
        <Link href={`/exercises/plans/${activePlan.id}`}>
          <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-all group">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                <Rocket className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold uppercase tracking-tight truncate">
                    Active Journey: {activePlan.title}
                  </p>
                  <Badge variant="outline" className="text-[8px] h-4 py-0 font-black border-primary/20">
                    DAY {completedCount + 1}/{activePlan.durationDays}
                  </Badge>
                </div>
                <div className="mt-1.5 w-full max-w-[200px]">
                  <Progress value={progress} className="h-1" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest ml-4">
              Continue <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // --- STATE 1: EMPTY STATE (NOT LOGGED AND NOT DISMISSED) ---
  if ((!hasLogs && !isDismissed) || isExpanded) {
    return (
      <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500 mb-8">
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              {isExpanded ? 'Guided Curricula' : 'Not sure where to start? Pick a journey:'}
            </h3>
            <AssistantTooltip text="Ascending Modules: Start with Day Zero to break inertia, then progress to deeper foundations.">
              <Info className="w-3 h-3 text-muted-foreground" />
            </AssistantTooltip>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
            onClick={() => isExpanded ? setIsExpanded(false) : setPlanDismissed(category, true)}
          >
            <ChevronUp className="w-4 h-4" />
            <span className="sr-only">Collapse</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tabPlans.map((plan) => (
            <Link key={plan.id} href={`/exercises/plans/${plan.id}`}>
              <Card className={cn(
                "hover:border-primary/50 transition-all h-full group bg-card border-primary/5",
                plan.durationDays === 1 && "border-primary/20 ring-1 ring-primary/10"
              )}>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={plan.durationDays === 1 ? "default" : "secondary"} className="uppercase font-black text-[8px] tracking-widest h-4">
                      {plan.durationDays === 1 ? 'RECOMMENDED' : `${plan.durationDays} DAYS`}
                    </Badge>
                    {plan.durationDays === 1 && <Zap className="w-3.5 h-3.5 text-primary fill-current" />}
                  </div>
                  <CardTitle className="text-base font-bold group-hover:text-primary transition-colors">{plan.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3">
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{plan.description}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
                    <Clock className="w-3 h-3" /> ~{plan.steps[0].estimatedMinutes}m daily
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 mt-auto">
                  <Button variant="ghost" size="sm" className="w-full h-8 text-[10px] font-black uppercase border border-primary/5 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    Start Protocol <ArrowRight className="ml-1 w-3 h-3" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // --- STATE 2: ACTIVE/DISMISSED (COMPACT ROW) ---
  return (
    <div className="animate-in fade-in duration-500 mb-6">
      <div className="flex items-center justify-between py-1 px-1 border-b border-primary/5">
        <div className="flex items-center gap-2 text-muted-foreground">
          <BookOpen className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            {category} Journeys Available · {tabPlans[0]?.title}
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 gap-1 text-[10px] font-black uppercase text-primary hover:bg-primary/5"
          onClick={() => setIsExpanded(true)}
        >
          View All <ChevronDown className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}