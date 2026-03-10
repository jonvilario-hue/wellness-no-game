'use client';

import { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Rocket, ArrowRight, ChevronDown, ChevronUp, 
  CheckCircle2, BookOpen, X
} from 'lucide-react';
import Link from 'next/link';
import { useWellnessData, useMovementLogs, useStillnessLogs, useCommunicationLogs } from '@/hooks/use-wellness-data';
import { useSpeedReadingStore } from '@/hooks/use-speedreading-store';
import { wellnessPlans } from '@/data/wellness-plans';
import { cn } from '@/lib/utils';

interface JourneyPlansSectionProps {
  category: "Movement" | "Stillness" | "Communication" | "Speed Reading";
}

export function JourneyPlansSection({ category }: JourneyPlansSectionProps) {
  const { 
    planProgress,
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
      const progress = planProgress[plan.id] || {};
      return Object.values(progress).filter(Boolean).length === plan.durationDays;
    });
  }, [planProgress, tabPlans]);

  if (!mounted) return null;
  if (allCompleted) return null;

  const handleToggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <>
      <div className="animate-in fade-in duration-500">
        <div className={cn(
          "flex items-center gap-4 p-2 px-4 rounded-full border bg-background/50 backdrop-blur-sm transition-all h-11",
          "border-primary/10 hover:border-primary/30",
          isExpanded && "border-primary/30 bg-primary/5"
        )}>
          <div className="flex items-center gap-3">
            {activePlan ? (
              <Rocket className="w-4 h-4 text-primary shrink-0 animate-pulse" />
            ) : (
              <BookOpen className="w-4 h-4 text-muted-foreground shrink-0" />
            )}
            
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60 leading-none mb-0.5">
                Guided Curricula
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-tight whitespace-nowrap">
                  {activePlan ? `Active: ${activePlan.title}` : `Next: ${nextRecommendedPlan?.title || 'Finish Up'}`}
                </span>
                {activePlan && (
                  <span className="text-[8px] font-black text-primary">
                    {Object.values(planProgress[activePlan.id]).filter(Boolean).length}/{activePlan.durationDays}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 border-l border-primary/10 pl-3 ml-1">
            {activePlan && (
              <Button asChild variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase px-3 hover:bg-primary/10 text-primary">
                <Link href={`/exercises/plans/${activePlan.id}`}>Resume</Link>
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "h-7 gap-1 px-3 text-[9px] font-black uppercase rounded-full transition-all",
                isExpanded ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-primary hover:bg-primary/5"
              )}
              onClick={handleToggleExpand}
            >
              {isExpanded ? 'Hide' : 'View Plans'}
              {isExpanded ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
            </Button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="w-full animate-in fade-in slide-in-from-top-2 duration-500 mt-2">
          <Card className="border-primary/20 bg-background/50 backdrop-blur-sm shadow-xl">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <CardTitle className="text-sm font-black uppercase tracking-widest">
                  {category} Guided Curricula
                </CardTitle>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsExpanded(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tabPlans.map((plan) => {
                  const progress = planProgress[plan.id] || {};
                  const done = Object.values(progress).filter(Boolean).length;
                  const isFinished = done === plan.durationDays;
                  const isCurrent = activePlan?.id === plan.id;

                  return (
                    <Link key={plan.id} href={`/exercises/plans/${plan.id}`}>
                      <Card className={cn(
                        "hover:border-primary/50 transition-all h-full group bg-card border-primary/5",
                        isCurrent && "border-primary/30 ring-1 ring-primary/10 bg-primary/5",
                        isFinished && "opacity-60"
                      )}>
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between items-start mb-2">
                            <Badge variant={isCurrent ? "default" : "secondary"} className="uppercase font-black text-[8px] tracking-widest h-4 w-fit">
                              {isCurrent ? 'ACTIVE' : isFinished ? 'COMPLETE' : `${plan.durationDays} DAYS`}
                            </Badge>
                            {isFinished && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                          </div>
                          <CardTitle className="text-sm font-bold group-hover:text-primary transition-colors">{plan.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">{plan.description}</p>
                          {done > 0 && !isFinished && (
                            <div className="mt-3 space-y-1">
                              <div className="flex justify-between text-[8px] font-bold text-primary">
                                <span>Progress</span>
                                <span>{done}/{plan.durationDays}</span>
                              </div>
                              <Progress value={(done/plan.durationDays)*100} className="h-0.5" />
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button variant="ghost" size="sm" className="w-full h-7 text-[9px] font-black uppercase border border-primary/5 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            {isCurrent ? 'Continue' : isFinished ? 'Review' : 'Start'} <ArrowRight className="ml-1 w-3 h-3" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
