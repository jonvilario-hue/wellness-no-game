
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { useWellnessData } from "@/hooks/use-wellness-data";
import { Scale, Info, Zap, Wind } from "lucide-react";
import { useMemo } from "react";
import { startOfWeek, isAfter } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

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

    return { weekMovementMins, weekStillnessMins, movementPercent, totalMins };
  }, [movementLogs, stillnessLogs]);

  const getStatus = () => {
    if (stats.totalMins === 0) return { label: "Equilibrium Standing By", color: "text-muted-foreground", icon: Scale };
    if (stats.movementPercent > 70) return { label: "High Action: Add Recovery", color: "text-orange-500", icon: Zap };
    if (stats.movementPercent < 30) return { label: "High Recovery: Add Action", color: "text-blue-500", icon: Wind };
    return { label: "Optimal Equilibrium Found", color: "text-primary", icon: Scale };
  };

  const status = getStatus();

  return (
    <Card className="bg-muted/30 border-none shadow-none">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <status.icon className={cn("w-4 h-4", status.color)} />
            System Balance
          </h4>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <Info className="w-3.5 h-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-[250px] text-[10px] leading-relaxed">
                This counter tracks the ratio between <b>Action (Movement)</b> and <b>Recovery (Stillness)</b>. 
                Maintaining a balanced ratio ensures your nervous system stays regulated for high-performance study sessions.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className={cn("text-[10px] font-black uppercase tracking-tighter", status.color)}>
              {status.label}
            </span>
            <span className="text-[10px] font-mono opacity-60">{Math.round(stats.movementPercent)}% / {Math.round(100 - stats.movementPercent)}%</span>
          </div>

          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div className="relative h-2.5 w-full bg-primary/10 rounded-full overflow-hidden cursor-help">
                  <div 
                    className="absolute left-0 top-0 h-full bg-primary transition-all duration-1000 ease-in-out" 
                    style={{ width: `${stats.movementPercent}%` }} 
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-[10px] space-y-1 p-1">
                  <p className="flex justify-between gap-6"><span>Movement (Action):</span> <b>{stats.weekMovementMins}m</b></p>
                  <p className="flex justify-between gap-6"><span>Stillness (Recovery):</span> <b>{stats.weekStillnessMins}m</b></p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex justify-between text-[9px] font-black uppercase tracking-widest opacity-40">
            <span>Action Stance</span>
            <span>Recovery Stance</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
