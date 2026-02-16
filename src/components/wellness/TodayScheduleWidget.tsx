'use client';

import { useCalendarPlansStore } from "@/hooks/use-calendar-plans-store";
import { format } from "date-fns";
import { Calendar, CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlanCategory } from "@/types/calendar-plans";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TodayScheduleWidgetProps {
  category: PlanCategory;
}

export function TodayScheduleWidget({ category }: TodayScheduleWidgetProps) {
  const { activityInstances, updateActivityStatus, _hasHydrated } = useCalendarPlansStore();
  
  if (!_hasHydrated) return null;

  const today = format(new Date(), 'yyyy-MM-dd');
  const todaysActivities = (activityInstances[today] || []).filter(inst => {
    // In MVP we assume matching by title or simple category lookup
    // For now, we'll just filter by the fact that it's active
    return inst.planId !== 'adhoc'; // Only show planned items
  });

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

  return (
    <div className="space-y-2">
      <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1 flex items-center gap-2">
        <Calendar className="w-3 h-3" /> Scheduled Today
      </h4>
      <div className="space-y-2">
        {todaysActivities.map(inst => (
          <Card key={inst.id} className={cn("bg-card transition-all", inst.status === 'completed' && "opacity-60")}>
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-bold">{inst.activityName}</span>
                {inst.scheduledTime && (
                  <span className="text-[10px] text-muted-foreground">{inst.scheduledTime}</span>
                )}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 rounded-full gap-2 hover:bg-primary/10"
                onClick={() => updateActivityStatus(today, inst.id, inst.status === 'completed' ? 'not-started' : 'completed')}
              >
                {inst.status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="text-xs">{inst.status === 'completed' ? 'Done' : 'Log'}</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
