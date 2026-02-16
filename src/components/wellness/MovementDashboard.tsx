
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { useWellnessData, calculateStreak } from "@/hooks/use-wellness-data";
import { Flame, Clock, Trophy, Scale } from "lucide-react";
import { useMemo } from "react";
import { startOfWeek, isAfter } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { TodayScheduleWidget } from "./TodayScheduleWidget";

export function MovementDashboard() {
  const { movementLogs, stillnessLogs } = useWellnessData();

  const stats = useMemo(() => {
    const streak = calculateStreak(movementLogs);
    
    const weekStart = startOfWeek(new Date());
    const weekMovementMins = movementLogs
      .filter(log => isAfter(new Date(log.timestamp), weekStart))
      .reduce((sum, log) => sum + log.duration, 0);

    const weekStillnessMins = stillnessLogs
      .filter(log => isAfter(new Date(log.timestamp), weekStart))
      .reduce((sum, log) => sum + log.duration, 0);
      
    const counts: Record<string, { name: string, count: number }> = {};
    movementLogs.forEach(log => {
      if (!counts[log.exerciseId]) counts[log.exerciseId] = { name: log.exerciseName, count: 0 };
      counts[log.exerciseId].count++;
    });
    
    const mostPracticed = Object.values(counts).sort((a, b) => b.count - a.count)[0]?.name || 'None yet';

    const totalMins = weekMovementMins + weekStillnessMins;
    const movementPercent = totalMins > 0 ? (weekMovementMins / totalMins) * 100 : 50;

    return { streak, weekMovementMins, mostPracticed, movementPercent, totalMins, weekStillnessMins };
  }, [movementLogs, stillnessLogs]);

  return (
    <div className="space-y-6 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Flame className="w-5 h-5 text-warning mb-1" />
            <p className="text-2xl font-black">{stats.streak}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
        
        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Clock className="w-5 h-5 text-primary mb-1" />
            <p className="text-2xl font-black">{stats.weekMovementMins}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Weekly Minutes</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Trophy className="w-5 h-5 text-primary opacity-80 mb-1" />
            <p className="text-sm font-bold truncate w-full">{stats.mostPracticed}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Top Choice</p>
          </CardContent>
        </Card>
      </div>

      <TodayScheduleWidget category="Movement" />

      <Card className="bg-muted/30 border-none">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Scale className="w-3 h-3" /> Wellness Balance
            </h4>
            <span className="text-[10px] font-medium text-muted-foreground italic">
              {stats.movementPercent > 70 ? "High Movement: Add Stillness" : stats.movementPercent < 30 ? "High Stillness: Add Movement" : "Optimal Balance Found"}
            </span>
          </div>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div className="relative h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 h-full bg-primary transition-all duration-1000" 
                    style={{ width: `${stats.movementPercent}%` }} 
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-[10px] space-y-1">
                  <p className="flex justify-between gap-4"><span>Movement:</span> <b>{stats.weekMovementMins}m</b></p>
                  <p className="flex justify-between gap-4"><span>Stillness:</span> <b>{stats.weekStillnessMins}m</b></p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex justify-between mt-1 text-[9px] font-bold uppercase text-muted-foreground">
            <span className="text-primary">Action</span>
            <span className="text-muted-foreground">Recovery</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
