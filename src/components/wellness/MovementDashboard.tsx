
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { useWellnessData, calculateStreak } from "@/hooks/use-wellness-data";
import { Flame, Clock, Trophy, LineChart } from "lucide-react";
import { useMemo } from "react";
import { startOfWeek, isAfter } from "date-fns";

export function MovementDashboard() {
  const { movementLogs } = useWellnessData();

  const stats = useMemo(() => {
    const streak = calculateStreak(movementLogs);
    
    const weekStart = startOfWeek(new Date());
    const weekMinutes = movementLogs
      .filter(log => isAfter(new Date(log.timestamp), weekStart))
      .reduce((sum, log) => sum + log.duration, 0);
      
    const counts: Record<string, { name: string, count: number }> = {};
    movementLogs.forEach(log => {
      if (!counts[log.exerciseId]) counts[log.exerciseId] = { name: log.exerciseName, count: 0 };
      counts[log.exerciseId].count++;
    });
    
    const mostPracticed = Object.values(counts).sort((a, b) => b.count - a.count)[0]?.name || 'None yet';

    return { streak, weekMinutes, mostPracticed };
  }, [movementLogs]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <Card className="bg-primary/5 border-primary/10">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <Flame className="w-5 h-5 text-orange-500 mb-1" />
          <p className="text-2xl font-black">{stats.streak}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Day Streak</p>
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
          <Trophy className="w-5 h-5 text-yellow-500 mb-1" />
          <p className="text-sm font-bold truncate w-full">{stats.mostPracticed}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Most Practiced</p>
        </CardContent>
      </Card>
    </div>
  );
}
