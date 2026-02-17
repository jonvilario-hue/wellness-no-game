'use client';

import { Card, CardContent } from "@/components/ui/card";
import { useWellnessData, calculateStreak } from "@/hooks/use-wellness-data";
import { Flame, Clock, Trophy, MessageSquare } from "lucide-react";
import { useMemo } from "react";
import { startOfWeek, isAfter } from "date-fns";
import { TodayScheduleWidget } from "./TodayScheduleWidget";

export function CommunicationDashboard() {
  const { communicationLogs } = useWellnessData();

  const stats = useMemo(() => {
    // We treat communication as a daily ritual for streak purposes
    const streak = calculateStreak(
      communicationLogs.reduce((acc, log) => ({ ...acc, [log.timestamp.split('T')[0]]: true }), {})
    );
    
    const weekStart = startOfWeek(new Date());
    const weekMinutes = communicationLogs
      .filter(log => isAfter(new Date(log.timestamp), weekStart))
      .reduce((sum, log) => sum + log.duration, 0);
      
    const counts: Record<string, { name: string, count: number }> = {};
    communicationLogs.forEach(log => {
      if (!counts[log.practiceId]) counts[log.practiceId] = { name: log.practiceName, count: 0 };
      counts[log.practiceId].count++;
    });
    
    const mostPracticed = Object.values(counts).sort((a, b) => b.count - a.count)[0]?.name || 'None yet';

    return { streak, weekMinutes, mostPracticed };
  }, [communicationLogs]);

  return (
    <div className="space-y-6 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Flame className="w-5 h-5 text-orange-500 mb-1" />
            <p className="text-2xl font-black">{stats.streak}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Persuasion Streak</p>
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
            <Trophy className="w-5 h-5 text-primary opacity-80 mb-1" />
            <p className="text-sm font-bold truncate w-full">{stats.mostPracticed}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Top Skill</p>
          </CardContent>
        </Card>
      </div>

      <TodayScheduleWidget category="Communication" />
    </div>
  );
}
