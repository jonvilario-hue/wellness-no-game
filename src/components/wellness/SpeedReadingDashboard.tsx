
'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSpeedReadingStore } from '@/hooks/use-speedreading-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Flame, Zap, Target, BarChart3, TrendingUp, 
  Trophy, Brain, Activity, Info
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { getSpeedRank } from '@/lib/speedreading-utils';
import { AssistantTooltip } from '../assistant-tooltip';
import { cn } from '@/lib/utils';

export function SpeedReadingStats() {
  const [mounted, setMounted] = useState(false);
  const { logs, getStreak } = useSpeedReadingStore();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const streak = getStreak();

  const aggregateStats = useMemo(() => {
    if (logs.length === 0) return { avgWpm: 0, avgErr: 0, topDrill: 'None yet' };
    
    const totalWpm = logs.reduce((s, l) => s + l.wpm, 0);
    const totalErr = logs.reduce((s, l) => s + l.err, 0);
    
    const counts: Record<string, number> = {};
    logs.forEach(l => {
      counts[l.drillType] = (counts[l.drillType] || 0) + 1;
    });
    
    const topDrill = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None yet';

    return {
      avgWpm: Math.round(totalWpm / logs.length),
      avgErr: Math.round(totalErr / logs.length),
      topDrill
    };
  }, [logs]);

  if (!mounted) {
    return <div className="h-32 w-full animate-pulse bg-muted/20 rounded-xl" />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AssistantTooltip text="Your current consecutive days of speed reading training. Developing higher reading velocity requires daily 're-calibration' of the eye-brain connection.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Flame className="w-5 h-5 text-orange-500 mb-1" />
              <p className="text-2xl font-black">{streak}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Reading Streak</p>
            </CardContent>
          </Card>
        </AssistantTooltip>
        
        <AssistantTooltip text="Your average raw words-per-minute (WPM) across all content tiers. The average reader reads at 200-250 WPM; higher numbers indicate reduced subvocalization and wider fixation spans.">
          <Card className="bg-primary/5 border-primary/10 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Zap className="w-5 h-5 text-primary mb-1" />
              <p className="text-2xl font-black">{aggregateStats.avgWpm}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Avg WPM</p>
            </CardContent>
          </Card>
        </AssistantTooltip>

        <AssistantTooltip text="The specific reading protocol you use most frequently. Specializing in one drill builds deep perceptual habits before layering on more complex techniques.">
          <Card className="bg-primary/5 border-primary/10 flex flex-col justify-center p-4 text-center h-full">
            <div className="space-y-1">
              <Trophy className="w-5 h-5 text-primary opacity-80 mx-auto mb-1" />
              <p className="text-sm font-bold truncate w-full">
                {aggregateStats.topDrill}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Top Drill</p>
            </div>
          </Card>
        </AssistantTooltip>
      </div>
    </div>
  );
}

export function SpeedReadingAnalytics() {
  const [mounted, setMounted] = useState(false);
  const { logs, achievements } = useSpeedReadingStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = useMemo(() => {
    return [...logs].reverse().slice(-10).map(l => ({
      date: l.date,
      wpm: l.wpm,
      err: l.err
    }));
  }, [logs]);

  const bestTier = useMemo(() => {
    const entries = Object.entries(achievements);
    if (entries.length === 0) return ['Casual', { highestERR: 0 }] as const;
    return entries.sort((a, b) => b[1].highestERR - a[1].highestERR)[0];
  }, [achievements]);

  if (!mounted) {
    return <div className="h-64 w-full animate-pulse bg-muted/20 rounded-xl" />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 border-primary/10 overflow-hidden">
        <CardHeader className="bg-primary/5 pb-4">
          <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Velocity Trends
          </CardTitle>
          <CardDescription>Raw WPM and Effective Reading Rate (ERR) over your last 10 drills.</CardDescription>
        </CardHeader>
        <CardContent className="h-64 pt-8">
          {logs.length < 2 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-2 opacity-30 italic text-xs">
              <BarChart3 className="w-8 h-8" />
              <span>Complete more drills to visualize progress</span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="date" hide />
                <YAxis fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="wpm" name="Raw WPM" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.05} strokeWidth={2} />
                <Area type="monotone" dataKey="err" name="Effective ERR" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card className="border-primary/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary" /> Achievement Vault
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(achievements).map(([tier, ach]) => (
            <div key={tier} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase">{tier}</span>
                <span className="text-[10px] font-black text-primary">{ach.highestWPM} WPM</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${Math.min(100, (ach.highestWPM / 800) * 100)}%` }} />
                </div>
                <span className="text-[9px] font-bold text-muted-foreground">{ach.highestERR} ERR</span>
              </div>
            </div>
          ))}
          
          <div className="pt-4 border-t border-primary/5">
            <div className="p-3 bg-primary/5 rounded-xl space-y-2">
              <h4 className="text-[10px] font-black uppercase text-primary flex items-center gap-2">
                <Brain className="w-3 h-3" /> Cognitive Cross-Load
              </h4>
              <p className="text-[10px] leading-relaxed text-muted-foreground">
                Your efficiency is highest on <b>{bestTier[0]}</b> content. Consider a "Stillness" reset before tasks in other domains to maintain this focus.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
