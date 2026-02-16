
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { useWellnessData, calculateStreak } from "@/hooks/use-wellness-data";
import { Sparkles, Clock, Heart, Wind } from "lucide-react";
import { useMemo } from "react";
import { startOfWeek, isAfter } from "date-fns";

export function StillnessDashboard() {
  const { stillnessLogs } = useWellnessData();

  const stats = useMemo(() => {
    const streak = calculateStreak(stillnessLogs);
    
    const weekStart = startOfWeek(new Date());
    const weekMinutes = stillnessLogs
      .filter(log => isAfter(new Date(log.timestamp), weekStart))
      .reduce((sum, log) => sum + log.duration, 0);
      
    const counts: Record<string, { name: string, count: number }> = {};
    stillnessLogs.forEach(log => {
      if (!counts[log.techniqueId]) counts[log.techniqueId] = { name: log.techniqueName, count: 0 };
      counts[log.techniqueId].count++;
    });
    
    const mostUsed = Object.values(counts).sort((a, b) => b.count - a.count)[0]?.name || 'None yet';

    return { streak, weekMinutes, mostUsed };
  }, [stillnessLogs]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <Card className="bg-primary/5 border-primary/10">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <Sparkles className="w-5 h-5 text-blue-400 mb-1" />
          <p className="text-2xl font-black">{stats.streak}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Zen Streak</p>
        </CardContent>
      </Card>
      
      <Card className="bg-primary/5 border-primary/10">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <Clock className="w-5 h-5 text-primary mb-1" />
          <p className="text-2xl font-black">{stats.weekMinutes}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Weekly Minutes</p>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/10">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <Wind className="w-5 h-5 text-teal-500 mb-1" />
          <p className="text-sm font-bold truncate w-full">{stats.mostUsed}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Top Technique</p>
        </CardContent>
      </Card>
    </div>
  );
}
