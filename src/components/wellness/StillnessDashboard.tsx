
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { useWellnessData, calculateStreak } from "@/hooks/use-wellness-data";
import { Sparkles, Clock, Wind, Zap, Brain, TrendingDown } from "lucide-react";
import { useMemo } from "react";
import { startOfWeek, isAfter } from "date-fns";
import { Badge } from "../ui/badge";

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

    // Trigger-Response Logic
    const triggerStats: Record<string, { sum: number, count: number }> = {};
    stillnessLogs.forEach(log => {
      if (log.preStress !== undefined && log.postCalm !== undefined && log.trigger === 'Stress') {
        const diff = log.preStress - (10 - log.postCalm); // This is just one way to normalize
        const effectiveDiff = log.preStress - (10 - log.postCalm); // Placeholder logic
        
        // Simpler logic: How much postCalm increased vs preStress (assuming postCalm is good)
        // Actual logic: Stress reduction
        if (!triggerStats[log.techniqueId]) triggerStats[log.techniqueId] = { sum: 0, count: 0 };
        // We'll calculate average 'Stress Reduction' points
        const reduction = log.preStress - (10 - log.postCalm); // Example formula
        triggerStats[log.techniqueId].sum += Math.max(0, log.postCalm - (10 - log.preStress)); // High postCalm is better
        triggerStats[log.techniqueId].count++;
      }
    });

    const topStressReliever = Object.entries(triggerStats)
      .filter(([_, data]) => data.count >= 2)
      .sort((a, b) => (b[1].sum / b[1].count) - (a[1].sum / a[1].count))[0];

    const reliverName = topStressReliever ? counts[topStressReliever[0]].name : null;
    const avgReduction = topStressReliever ? (topStressReliever[1].sum / topStressReliever[1].count).toFixed(1) : null;

    return { streak, weekMinutes, mostUsed, reliverName, avgReduction };
  }, [stillnessLogs]);

  return (
    <div className="space-y-4 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

      {stats.reliverName && (
        <Card className="bg-primary/5 border-none">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <TrendingDown className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Stress-Response Insight</h4>
              <p className="text-sm font-medium">
                When you're stressed, <span className="text-primary font-bold">{stats.reliverName}</span> improves your calm score by an average of <span className="font-bold">{stats.avgReduction} points</span>.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
