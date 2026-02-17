
'use client';

import { useMemo, useState } from 'react';
import { useStudyDashboardStore } from '@/hooks/use-study-dashboard-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { subDays, format, parseISO } from 'date-fns';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { Brain, Clock, Zap, Target, TrendingUp } from 'lucide-react';

export function ActivityView() {
  const { activity, getStreak } = useStudyDashboardStore();
  const streak = getStreak();

  const heatmapValues = useMemo(() => {
    return Object.entries(activity).map(([date, data]) => ({
      date,
      count: data.cardsReviewed + (data.tasksCompleted * 10), // Weight tasks for intensity
      ...data
    }));
  }, [activity]);

  const stats = useMemo(() => {
    const allDays = Object.values(activity);
    const totalReviewed = allDays.reduce((s, d) => s + d.cardsReviewed, 0);
    const totalTime = allDays.reduce((s, d) => s + d.minutesStudied, 0);
    const learned = allDays.reduce((s, d) => s + d.cardsLearned, 0);
    
    return {
      totalReviewed,
      avgTime: allDays.length > 0 ? Math.round(totalTime / allDays.length) : 0,
      learned
    };
  }, [activity]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-primary/5 border-primary/10 flex flex-col justify-center p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Streak</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-primary">{streak.current}</span>
            <span className="text-[10px] font-bold">DAYS</span>
          </div>
        </Card>
        <Card className="bg-primary/5 border-primary/10 flex flex-col justify-center p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Longest Streak</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-foreground">{streak.longest}</span>
            <span className="text-[10px] font-bold">DAYS</span>
          </div>
        </Card>
        <Card className="bg-primary/5 border-primary/10 flex flex-col justify-center p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Reviews Logged</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-foreground">{stats.totalReviewed}</span>
            <span className="text-[10px] font-bold">TOTAL</span>
          </div>
        </Card>
        <Card className="bg-primary/5 border-primary/10 flex flex-col justify-center p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Avg Session</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-foreground">{stats.avgTime}</span>
            <span className="text-[10px] font-bold">MIN/DAY</span>
          </div>
        </Card>
      </div>

      <Card className="border-primary/10 overflow-hidden">
        <CardHeader className="bg-primary/5 pb-6">
          <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Consistency Map
          </CardTitle>
          <CardDescription>Daily study intensity over the last 6 months.</CardDescription>
        </CardHeader>
        <CardContent className="pt-10">
          <div className="px-4">
            <CalendarHeatmap
              startDate={subDays(new Date(), 180)}
              endDate={new Date()}
              values={heatmapValues}
              classForValue={(value) => {
                if (!value || value.count === 0) return 'color-empty';
                if (value.count < 20) return 'color-scale-1';
                if (value.count < 50) return 'color-scale-2';
                return 'color-scale-3';
              }}
              tooltipDataAttrs={(value: any) => ({
                'data-tooltip-id': 'activity-tooltip',
                'data-tooltip-content': value.date 
                  ? `${format(parseISO(value.date), 'MMM d')}: ${value.cardsReviewed} reviews, ${value.minutesStudied}m studied`
                  : 'No activity',
              })}
            />
            <ReactTooltip id="activity-tooltip" className="z-50" />
          </div>
          <div className="flex justify-end items-center gap-4 mt-6 text-[9px] font-bold uppercase text-muted-foreground opacity-60">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-sm bg-muted/30" />
              <div className="w-2.5 h-2.5 rounded-sm bg-primary/30" />
              <div className="w-2.5 h-2.5 rounded-sm bg-primary/60" />
              <div className="w-2.5 h-2.5 rounded-sm bg-primary/90" />
            </div>
            <span>More</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
