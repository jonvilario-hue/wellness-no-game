
'use client';

import { useCalendarPlansStore } from "@/hooks/use-calendar-plans-store";
import { presetPlans } from "@/data/preset-calendar-plans";
import { format, parseISO, isSameDay } from "date-fns";
import { Calendar, CheckCircle2, Circle, ArrowRight, Play, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlanCategory } from "@/types/calendar-plans";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AssistantTooltip } from "../assistant-tooltip";
import { useWellnessData } from "@/hooks/use-wellness-data";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface TodayScheduleWidgetProps {
  category: PlanCategory;
}

export function TodayScheduleWidget({ category }: TodayScheduleWidgetProps) {
  const { activityInstances, customPlans, deletedPresetIds, updateActivityStatus, _hasHydrated } = useCalendarPlansStore();
  const { logExerciseById } = useWellnessData();
  const { toast } = useToast();
  
  const today = useMemo(() => new Date(), []);
  const todayStr = useMemo(() => format(today, 'yyyy-MM-dd'), [today]);

  const todaysActivities = useMemo(() => {
    if (!_hasHydrated) return [];

    const dayOfWeek = today.getDay();
    const dayOfMonth = today.getDate();

    const availablePlans = [
      ...presetPlans.filter(p => !deletedPresetIds.includes(p.id)),
      ...customPlans
    ];

    // 1. Calculate planned tasks based on recurrence
    const planned = availablePlans.flatMap(plan => 
      plan.activities
        .filter(act => act.category === category)
        .filter(act => {
          if (act.recurrence === 'daily') return true;
          if (act.recurrence === 'weekly') {
            const start = parseISO(plan.startDate);
            return start.getDay() === dayOfWeek;
          }
          if (act.recurrence === 'monthly') {
            const start = parseISO(plan.startDate);
            return start.getDate() === dayOfMonth;
          }
          return true;
        })
        .map(act => {
          const existing = (activityInstances[todayStr] || []).find(i => i.activityId === act.id);
          return {
            id: existing?.id || `v-${plan.id}-${act.id}-${todayStr}`,
            activityId: act.id,
            activityName: act.name,
            scheduledTime: act.timeOfDay,
            status: existing?.status || 'not-started',
            linkedTracker: act.linkedTracker
          };
        })
    );

    // 2. Filter persisted overrides/study sessions for today that match this category
    const persisted = (activityInstances[todayStr] || [])
      .filter(inst => {
        // Study sessions are marked as Study/Learning
        if (category === 'Study/Learning' && inst.planId === 'study-sessions') return true;
        // Categorized calendar events
        return inst.category === category;
      })
      // Ensure we don't duplicate planned items already found
      .filter(inst => !planned.some(p => p.activityId === inst.activityId))
      .map(inst => ({
        id: inst.id,
        activityId: inst.activityId,
        activityName: inst.activityName,
        scheduledTime: inst.scheduledTime,
        status: inst.status,
        linkedTracker: inst.studyToolId || inst.linkedTracker
      }));

    return [...planned, ...persisted].sort((a, b) => (a.scheduledTime || '').localeCompare(b.scheduledTime || ''));
  }, [category, today, todayStr, _hasHydrated, customPlans, deletedPresetIds, activityInstances]);

  if (!_hasHydrated) return null;

  if (todaysActivities.length === 0) {
    return (
      <Card className="bg-muted/20 border-dashed">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <Calendar className="w-4 h-4" />
            <span>No {category.toLowerCase()} scheduled today</span>
          </div>
          <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs font-bold">
            <Link href="/calendar">Add One <ArrowRight className="w-3 h-3 ml-1" /></Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleQuickLog = (inst: any) => {
    if (inst.linkedTracker) {
      logExerciseById(inst.linkedTracker);
      updateActivityStatus(todayStr, inst.id, 'completed');
      toast({ title: "Quick Log Successful", description: `${inst.activityName} metrics synced to history.` });
    }
  };

  return (
    <div className="space-y-2">
      <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1 flex items-center gap-2">
        <Calendar className="w-3 h-3" /> Scheduled Today
      </h4>
      <div className="space-y-2">
        {todaysActivities.map(inst => (
          <Card key={inst.id} className={cn("bg-card transition-all group", inst.status === 'completed' && "opacity-60")}>
            <CardContent className="p-3 flex items-center justify-between gap-4">
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold truncate">{inst.activityName}</span>
                {inst.scheduledTime && (
                  <span className="text-[10px] text-muted-foreground">{inst.scheduledTime}</span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                {inst.status !== 'completed' ? (
                  <>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <AssistantTooltip text="Quickly log baseline metrics.">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={() => handleQuickLog(inst)}>
                          <ClipboardCheck className="w-3.5 h-3.5" />
                        </Button>
                      </AssistantTooltip>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 rounded-full gap-2 hover:bg-primary/10"
                      onClick={() => updateActivityStatus(todayStr, inst.id, 'completed')}
                    >
                      <Circle className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs">Log</span>
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-2 px-3 h-8 bg-green-500/10 text-green-600 rounded-full">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase">Synced</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
