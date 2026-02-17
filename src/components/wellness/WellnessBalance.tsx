'use client';

import { Card, CardContent } from "@/components/ui/card";
import { useWellnessData } from "@/hooks/use-wellness-data";
import { Scale } from "lucide-react";
import { useMemo } from "react";
import { startOfWeek, isAfter } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function WellnessBalance() {
  const { movementLogs, stillnessLogs } = useWellnessData();

  const stats = useMemo(() => {
    const weekStart = startOfWeek(new Date());
    const weekMovementMins = movementLogs
      .filter(log => isAfter(new Date(log.timestamp), weekStart))
      .reduce((sum, log) => sum + log.duration, 0);

    const weekStillnessMins = stillnessLogs
      .filter(log => isAfter(new Date(log.timestamp), weekStart))
      .reduce((sum, log) => sum + log.duration, 0);

    const totalMins = weekMovementMins + weekStillnessMins;
    const movementPercent = totalMins > 0 ? (weekMovementMins / totalMins) * 100 : 50;

    return { weekMovementMins, weekStillnessMins, movementPercent };
  }, [movementLogs, stillnessLogs]);

  return (
    <Card className="bg-muted/30 border-none shadow-none">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Scale className="w-3 h-3" /> System Balance
          </h4>
          <span className="text-[10px] font-medium text-muted-foreground italic">
            {stats.movementPercent > 70 ? "High Action: Add Recovery" : stats.movementPercent < 30 ? "High Recovery: Add Action" : "Optimal Equilibrium Found"}
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
                <p className="flex justify-between gap-4"><span>Action (Movement):</span> <b>{stats.weekMovementMins}m</b></p>
                <p className="flex justify-between gap-4"><span>Recovery (Stillness):</span> <b>{stats.weekStillnessMins}m</b></p>
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
  );
}
