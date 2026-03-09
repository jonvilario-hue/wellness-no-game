
'use client';

import { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Rocket, ArrowRight, Info, ChevronDown, ChevronRight, 
  CheckCircle2, Circle, LayoutList, BookOpen
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
      return completedCount > 0 && completedCount < plan.steps.length;
    });
  }, [planProgress, tabPlans]);

  const allCompleted = useMemo(() => {
    if (tabPlans.length === 0) return true;
    return tabPlans.every(plan => {
      const progress = planProgress[plan.id];
      if (!progress) return false;
      return Object.values(progress).filter(Boolean).length === plan.steps.length;
    });
  }, [planProgress, tabPlans]);

  if (!mounted) return null;
  if (allCompleted) return null;

  const hasLogs = logs.length > 0;
  const isDismissed = dismissedPlans[category] || false;

  // --- STATE 3: ACTIVE PLAN ---
  if (activePlan) {
    const completedCount = Object.values(planProgress[activePlan.id]).filter(Boolean).length;
    const progress = (completedCount / activePlan.steps.length) * 100;
    
    return (
      <div className="animate-in fade-in slide-in-from-top-2 duration-500">
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
                    DAY {completedCount + 1}/{activePlan.steps.length}
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
  if (!hasLogs && !isDismissed || isExpanded) {
    return (
      <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              {isExpanded ? 'All Guided Plans' : 'Not sure where to start? Pick a guided plan:'}
            </h3>
            {!isExpanded && (
              <AssistantTooltip text="Journey Plans are structured curricula (3-14 days) following a 'Ramping' logic: Phase 1 (Entry), Phase 2 (Capacity), and Phase 3 (Peak).">
                <Info className="w-3 h-3 text-muted-foreground" />
              </AssistantTooltip>
            )}
          </div>
          <button 
            onClick={() => isExpanded ? setIsExpanded(false) : setPlanDismissed(category, true)}
            className="text-[10px] font-bold uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            {isExpanded ? 'Close' : 'Maybe later'}
          </button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabPlans.map((plan) => (
            <Link key={plan.id} href={`/exercises/plans/${plan.id}`} className="min-w-[260px] sm:min-w-[280px]">
              <Card className="hover:border-primary/50 transition-all h-full group bg-card">
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
    );
  }

  // --- STATE 2: ACTIVE/DISMISSED (COMPACT ROW) ---
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between py-1 px-1 border-b border-primary/5">
        <div className="flex items-center gap-2 text-muted-foreground">
          <BookOpen className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Guided Plans available · {tabPlans[0]?.title}
          </span>
        </div>
        <button 
          onClick={() => setIsExpanded(true)}
          className="text-[10px] font-black uppercase text-primary flex items-center gap-1 hover:underline"
        >
          View All <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
