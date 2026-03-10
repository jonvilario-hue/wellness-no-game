
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { useMovementLogs, useStillnessLogs } from "@/hooks/use-wellness-data";
import { Scale, Info, Zap, Wind, AlertCircle } from "lucide-react";
import { useMemo } from "react";
import { startOfWeek, isAfter } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function WellnessBalance() {
  const movementLogs = useMovementLogs();
  const stillnessLogs = useStillnessLogs();

  const stats = useMemo(() => {
    // Week resets every Monday at midnight local time
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });

    const moveCount = (movementLogs || []).filter(log => 
      isAfter(new Date(log.timestamp), weekStart)
    ).length;

    const restCount = (stillnessLogs || []).filter(log => 
      isAfter(new Date(log.timestamp), weekStart)
    ).length;

    const total = moveCount + restCount;
    // Default to 50/50 if no data
    const movePercent = total > 0 ? Math.round((moveCount / total) * 100) : 50;
    const restPercent = 100 - movePercent;

    return { moveCount, restCount, movePercent, restPercent, total };
  }, [movementLogs, stillnessLogs]);

  const getStatus = () => {
    if (stats.total === 0) return null;
    if (stats.movePercent >= 40 && stats.movePercent <= 60) {
      return { label: "✓ Balanced", color: "text-emerald-500", bgColor: "bg-emerald-500" };
    }
    if (stats.movePercent > 60 && stats.movePercent < 75) {
      return { label: "Leaning Active", color: "text-amber-500", bgColor: "bg-amber-500" };
    }
    if (stats.restPercent > 60 && stats.restPercent < 75) {
      return { label: "Leaning Restful", color: "text-amber-500", bgColor: "bg-amber-500" };
    }
    return { label: "Out of Balance", color: "text-destructive", bgColor: "bg-destructive" };
  };

  const status = getStatus();

  const moveBarColor = useMemo(() => {
    if (stats.total === 0) return "bg-muted";
    if (stats.movePercent >= 75) return "bg-orange-500";
    return "bg-teal-500";
  }, [stats]);

  const restBarColor = useMemo(() => {
    if (stats.total === 0) return "bg-muted";
    if (stats.restPercent >= 75) return "bg-orange-500";
    return "bg-indigo-500";
  }, [stats]);

  const nudge = useMemo(() => {
    if (stats.total === 0 || (stats.movePercent >= 40 && stats.movePercent <= 60)) return null;
    
    const isHeavy = stats.movePercent > 60;
    const text = isHeavy 
      ? "You've moved a lot this week — try a Stillness session today"
      : "Lots of rest this week — try a Movement session today";
    
    const targetTab = isHeavy ? 'stillness' : 'movement';
    const isUrgent = stats.movePercent >= 75 || stats.restPercent >= 75;
    
    return { text, targetTab, isUrgent };
  }, [stats]);

  return (
    <Card className="bg-muted/30 border-none shadow-none">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Scale className="w-4 h-4" />
            Move / Rest Balance
          </h4>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <Info className="w-3.5 h-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-[250px] text-xs leading-relaxed">
                Shows how your logged Movement and Stillness sessions compare this week. A roughly even split keeps you active without burning out. Tap a session suggestion below the bar to rebalance.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center h-5">
            <span className={cn("text-[10px] font-black uppercase tracking-tighter", status?.color || "text-muted-foreground")}>
              {status?.label || "Standing By"}
            </span>
            <span className="text-[10px] font-bold opacity-60">
              {stats.total > 0 
                ? `Movement ${stats.movePercent}% · Stillness ${stats.restPercent}%` 
                : "No sessions this week"}
            </span>
          </div>

          <div className="h-2.5 w-full bg-muted/50 rounded-full overflow-hidden flex">
            <div 
              className={cn("h-full transition-all duration-1000", moveBarColor)} 
              style={{ width: `${stats.movePercent}%` }} 
            />
            <div 
              className={cn("h-full transition-all duration-1000", restBarColor)} 
              style={{ width: `${stats.restPercent}%` }} 
            />
          </div>

          <div className="flex justify-between text-[9px] font-black uppercase tracking-widest opacity-40">
            <span>Movement</span>
            <span>Stillness</span>
          </div>
        </div>

        {nudge && (
          <Link 
            href={`/exercises?tab=${nudge.targetTab}`}
            className={cn(
              "block mt-2 text-[10px] transition-colors hover:underline",
              nudge.isUrgent ? "font-bold text-foreground" : "text-muted-foreground"
            )}
          >
            {nudge.text} →
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
