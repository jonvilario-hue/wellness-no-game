
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { calculateStreak, useMovementLogs } from "@/hooks/use-wellness-data";
import { Flame, Clock, Trophy } from "lucide-react";
import { startOfWeek, isAfter } from "date-fns";
import { AssistantTooltip } from "../assistant-tooltip";

export function MovementDashboard() {
  const movementLogs = useMovementLogs();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = useMemo(() => {
    const streak = calculateStreak(movementLogs);
    
    const weekStart = startOfWeek(new Date());
    const weekMovementMins = movementLogs
      .filter(log => isAfter(new Date(log.timestamp), weekStart))
      .reduce((sum, log) => sum + log.duration, 0);
      
    const counts: Record<string, { name: string, count: number }> = {};
    movementLogs.forEach(log => {
      if (!counts[log.exerciseId]) counts[log.exerciseId] = { name: log.exerciseName, count: 0 };
      counts[log.exerciseId].count++;
    });
    
    const mostPracticed = Object.values(counts).sort((a, b) => b.count - a.count)[0]?.name || 'None yet';

    return { streak, weekMovementMins, mostPracticed };
  }, [movementLogs]);

  if (!mounted) {
    return <div className="h-32 w-full animate-pulse bg-muted/20 rounded-xl" />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AssistantTooltip text="Your current consecutive days of movement. Daily physical activity signals the body to maintain higher metabolic efficiency and brain-derived neurotrophic factor (BDNF) levels.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Flame className="w-5 h-5 text-warning mb-1" />
              <p className="text-2xl font-black">{stats.streak}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>
        </AssistantTooltip>
        
        <AssistantTooltip text="Total minutes spent in active movement this week. Aim for at least 150 minutes of moderate activity per week for optimal cardiovascular and cognitive health.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Clock className="w-5 h-5 text-primary mb-1" />
              <p className="text-2xl font-black">{stats.weekMovementMins}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Weekly Minutes</p>
            </CardContent>
          </Card>
        </AssistantTooltip>

        <AssistantTooltip text="The physical drill you return to most frequently. Mastering one form deeply builds significant neuromuscular efficiency compared to constant variety.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Trophy className="w-5 h-5 text-primary opacity-80 mb-1" />
              <p className="text-sm font-bold truncate w-full">{stats.mostPracticed}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Top Choice</p>
            </CardContent>
          </Card>
        </AssistantTooltip>
      </div>
    </div>
  );
}
