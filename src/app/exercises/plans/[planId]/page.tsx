'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { wellnessPlans, type WellnessPlan } from '@/data/wellness-plans';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useWellnessData } from '@/hooks/use-wellness-data';
import { Progress } from '@/components/ui/progress';
import { Play, CheckCircle2, ChevronRight, Target, Brain, Activity, Lightbulb, ListChecks, ArrowLeft } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { AssistantTooltip } from '@/components/assistant-tooltip';

export default function PlanDetailPage({ params }: { params: Promise<{ planId: string }> }) {
  const { planId } = React.use(params);
  const router = useRouter();
  const plan = wellnessPlans.find(p => p.id === planId);

  const { planProgress, markPlanDayComplete } = useWellnessData();

  const progress = useMemo(() => {
    if (!plan) return 0;
    const currentProgress = planProgress[planId] || {};
    const completedCount = Object.values(currentProgress).filter(Boolean).length;
    return (completedCount / plan.durationDays) * 100;
  }, [plan, planProgress, planId]);

  if (!plan) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Plan Not Found</h1>
        <p className="text-muted-foreground">The requested wellness plan could not be found.</p>
      </div>
    );
  }

  const handleDayComplete = (day: number) => {
    markPlanDayComplete(planId, day);
    const completedCount = Object.values(planProgress[planId] || {}).filter(Boolean).length + 1;
    if (completedCount === plan.durationDays) {
      // Logic to suggest next plan or return
      router.push(`/exercises?tab=${plan.category.toLowerCase().replace(' ', '')}`);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-3xl mx-auto py-6 space-y-8">
          <div className="flex justify-between items-start">
            <Button variant="ghost" size="sm" asChild className="p-0 hover:bg-transparent text-muted-foreground hover:text-primary">
              <Link href={`/exercises?tab=${plan.category.toLowerCase().replace(' ', '')}`}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Lab
              </Link>
            </Button>
            <Badge variant="outline" className="uppercase font-black text-[9px] border-primary/20 text-primary bg-primary/5 px-3">
              {plan.durationDays} Day Program
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <h1 className="text-4xl font-black uppercase tracking-tighter">{plan.title}</h1>
              <p className="text-xl text-muted-foreground italic">“{plan.tagline}”</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Module Saturation</span>
                <span className="text-xs font-bold">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">The Protocol Sequence</h3>
              <AssistantTooltip text="Ascending Modules: Day Zero establish entry, 3-Day builds momentum, 5-Day provides breadth, and Week One locks in the sustainable rhythm.">
                <div className="p-1.5 bg-primary/10 rounded-full text-primary hover:bg-primary/20 transition-colors cursor-help">
                  <Lightbulb className="w-4 h-4" />
                </div>
              </AssistantTooltip>
            </div>

            {plan.steps.map((day) => {
              const isCompleted = planProgress[planId]?.[day.day] || false;
              const isAvailable = day.day === 1 || planProgress[planId]?.[day.day - 1];
              
              return (
                <Card key={day.day} className={cn(
                  "transition-all border-primary/10 overflow-hidden", 
                  isCompleted && "opacity-60 bg-muted/20",
                  !isCompleted && isAvailable && "ring-1 ring-primary/30 shadow-md",
                  !isAvailable && "opacity-40 grayscale"
                )}>
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 p-6">
                      <div className={cn(
                        "flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-colors shrink-0",
                        isCompleted ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground shadow-lg"
                      )}>
                        <span className="text-[10px] font-black uppercase opacity-70">Day</span>
                        <span className="text-2xl font-black leading-none">{day.day}</span>
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-3">
                          <h4 className="font-black text-xl truncate uppercase tracking-tight">{day.title}</h4>
                          {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          <Activity className="w-3 h-3" /> {day.actions.length} DRILLS • {day.estimatedMinutes} MIN
                        </div>
                      </div>
                    </div>

                    {!isCompleted && isAvailable && (
                      <div className="px-6 pb-6 space-y-6 animate-in fade-in slide-in-from-top-2">
                        <div className="space-y-3">
                          <p className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                            <ListChecks className="w-3.5 h-3.5" /> Action Requirements
                          </p>
                          <div className="grid gap-2">
                            {day.actions.map((action, idx) => (
                              <Button key={idx} variant="outline" asChild className="justify-between h-12 rounded-xl group border-primary/10 hover:bg-primary/[0.02]">
                                <Link href={action.link}>
                                  <span className="font-bold">{action.label}</span>
                                  <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                                </Link>
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        <Button onClick={() => handleDayComplete(day.day)} className="w-full h-12 font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20">
                          Mark Day {day.day} Complete
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="pt-8 flex flex-col items-center gap-4">
            <div className="p-6 bg-muted/30 rounded-3xl border border-dashed text-center max-w-md">
              <Lightbulb className="w-6 h-6 text-primary mx-auto mb-2" />
              <h5 className="font-bold text-sm uppercase tracking-tight">Ramping Logic</h5>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                We select these practices to ensure a neurological "soft landing." Day Zero is purely for accessibility. 3-Day builds capacity. 5-Day introduces variety. 7-Day establishes the sustainable weekly protocol.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
