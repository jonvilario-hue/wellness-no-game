
'use client';

import { useParams } from 'next/navigation';
import { wellnessPlans, type WellnessPlan } from '@/data/wellness-plans';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useWellnessData } from '@/hooks/use-wellness-data';
import { Progress } from '@/components/ui/progress';
import { Play, CheckCircle2, ChevronRight, Target, Brain, Activity } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function PlanDetailPage() {
  const params = useParams();
  const planId = params.planId as string;
  const plan = wellnessPlans.find(p => p.id === planId);

  const { planProgress, togglePlanDay } = useWellnessData();

  const progress = useMemo(() => {
    if (!plan) return 0;
    const currentProgress = planProgress[planId] || {};
    const completedCount = Object.values(currentProgress).filter(Boolean).length;
    return (completedCount / plan.steps.length) * 100;
  }, [plan, planProgress, planId]);

  if (!plan) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Plan Not Found</h1>
        <p className="text-muted-foreground">The requested wellness plan could not be found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-3xl mx-auto py-6 space-y-8">
          <div className="space-y-4">
            <div className="space-y-1">
              <Badge variant="secondary" className="uppercase font-black text-[9px] tracking-widest">{plan.category} Journey</Badge>
              <h1 className="text-4xl font-black uppercase tracking-tighter">{plan.title}</h1>
              <p className="text-xl text-muted-foreground italic">“{plan.tagline}”</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Progress Architecture</span>
                <span className="text-xs font-bold">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Sequence Pathway</h3>
            {plan.steps.map((day) => {
              const isCompleted = planProgress[planId]?.[day.day] || false;
              const isPhaseHeader = day.title.includes('Phase');
              
              return (
                <Card key={day.day} className={cn(
                  "transition-all border-primary/10", 
                  isCompleted && "opacity-60 bg-muted/20",
                  !isCompleted && isPhaseHeader && "ring-1 ring-primary/20 shadow-sm"
                )}>
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 p-4">
                      <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-primary/5 text-primary">
                        <span className="text-[10px] font-black uppercase">Day</span>
                        <span className="text-lg font-black leading-none">{day.day}</span>
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-lg truncate">{day.title}</h4>
                          {isPhaseHeader && !isCompleted && <Badge className="h-4 text-[8px] bg-primary/20 text-primary border-none">ACTIVE PHASE</Badge>}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {day.practices.map((p, idx) => (
                            <Badge key={idx} variant="secondary" className="text-[9px] uppercase tracking-tighter">
                              {p.type}: {p.title}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          id={`day-${day.day}`} 
                          checked={isCompleted} 
                          onCheckedChange={() => togglePlanDay(planId, day.day)}
                          className="w-6 h-6 border-2"
                        />
                      </div>
                    </div>
                    {!isCompleted && (
                      <div className="px-4 pb-4 flex gap-2">
                        {day.practices.map((p, idx) => {
                          const tab = p.type === 'Speed Reading' ? 'speedreading' : p.type.toLowerCase();
                          return (
                            <Button key={idx} variant="outline" size="sm" asChild className="h-8 text-xs font-bold gap-2">
                              <Link href={`/exercises?tab=${tab}`}>
                                Launch {p.type} <ChevronRight className="w-3 h-3" />
                              </Link>
                            </Button>
                          )
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="pt-8 flex flex-col items-center gap-4">
            <div className="p-6 bg-muted/30 rounded-2xl border border-dashed text-center max-w-md">
              <Lightbulb className="w-6 h-6 text-primary mx-auto mb-2" />
              <h5 className="font-bold text-sm">How these are selected</h5>
              <p className="text-xs text-muted-foreground mt-1">
                Practices are chosen to ramp metabolic and cognitive demand. Phase 1 targets neural accessibility, Phase 2 builds structural endurance, and Phase 3 focuses on mastery integration.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
