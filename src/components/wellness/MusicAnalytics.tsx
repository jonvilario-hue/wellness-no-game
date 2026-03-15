
'use client';

import { useMemo } from 'react';
import { useMusicStore } from '@/hooks/use-music-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, Activity, Brain, Target, Lightbulb, ChevronRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Link from 'next/link';
import { AssistantTooltip } from '../assistant-tooltip';

export function MusicAnalytics() {
  const { logs } = useMusicStore();

  const chartData = useMemo(() => {
    return [...logs]
      .reverse()
      .slice(-10)
      .map(l => ({
        date: l.timestamp.split('T')[0],
        har: l.har,
        name: l.drillName
      }));
  }, [logs]);

  const conceptPerformance = useMemo(() => {
    const concepts: Record<string, boolean[]> = {};
    logs.slice(0, 20).forEach(log => {
      log.questions.forEach(q => {
        const key = q.prompt.substring(0, 20); // Use prompt snippet as key
        if (!concepts[key]) concepts[key] = [];
        concepts[key].push(q.isCorrect);
      });
    });
    return Object.entries(concepts).slice(0, 8);
  }, [logs]);

  const strategyNudge = useMemo(() => {
    if (logs.length < 5) return null;
    
    // Find domain with lowest avg HAR
    const domainAverages: Record<string, { sum: number, count: number }> = {};
    logs.forEach(l => {
      if (!domainAverages[l.domain]) domainAverages[l.domain] = { sum: 0, count: 0 };
      domainAverages[l.domain].sum += l.har;
      domainAverages[l.domain].count++;
    });

    const weakest = Object.entries(domainAverages)
      .map(([name, data]) => ({ name, avg: data.sum / data.count }))
      .sort((a,b) => a.avg - b.avg)[0];

    return {
      text: `Your ${weakest.name} accuracy has dropped. Try a training session to re-stabilize your harmonic base.`,
      target: weakest.name
    };
  }, [logs]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-primary/10 overflow-hidden">
          <CardHeader className="bg-primary/5 pb-4">
            <AssistantTooltip text="Harmonic Accuracy Rate (HAR) tracks your performance adjusted for difficulty. Higher numbers reflect mastery at higher tiers.">
              <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> Sonic Velocity
              </CardTitle>
            </AssistantTooltip>
            <CardDescription>Weighted Harmonic Accuracy Rate (HAR) over your last 10 sessions.</CardDescription>
          </CardHeader>
          <CardContent className="h-64 pt-8">
            {chartData.length < 2 ? (
              <div className="flex flex-col items-center justify-center h-full opacity-30 italic text-xs text-center px-10">
                <Activity className="w-8 h-8 mb-2" />
                <span>Complete more drills to visualize your auditory growth curve.</span>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="date" hide />
                  <YAxis domain={[0, 200]} fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="p-3 bg-background border rounded-xl shadow-xl space-y-1">
                            <p className="text-[10px] font-black uppercase text-muted-foreground">{payload[0].payload.date}</p>
                            <p className="text-xs font-bold">{payload[0].payload.name}</p>
                            <p className="text-xs text-primary font-black">HAR: {payload[0].value}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area type="monotone" dataKey="har" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.1} strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="border-primary/10">
          <CardHeader className="pb-2">
            <AssistantTooltip text="Visualization of your accuracy across specific musical topics. Aim for a consistent green streak to indicate consolidation.">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" /> Concept Map
              </CardTitle>
            </AssistantTooltip>
            <CardDescription>Accuracy per musical concept.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {conceptPerformance.length === 0 ? (
              <div className="py-10 text-center opacity-30 italic text-xs">No concept data mapped yet.</div>
            ) : (
              <div className="space-y-3">
                {conceptPerformance.map(([concept, results], i) => (
                  <div key={i} className="flex items-center justify-between gap-4">
                    <span className="text-[9px] font-bold uppercase truncate flex-1">{concept}...</span>
                    <div className="flex gap-1">
                      {results.slice(-5).map((res, j) => (
                        <div key={j} className={cn(
                          "w-2 h-2 rounded-sm",
                          res ? "bg-emerald-500" : "bg-destructive"
                        )} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {strategyNudge && (
        <Card className="border-none bg-primary/5 animate-in slide-in-from-bottom-2">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-full shrink-0">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Practice Strategy</h4>
              <p className="text-sm font-medium">{strategyNudge.text}</p>
            </div>
            <Button variant="link" asChild className="p-0 h-auto text-primary font-black uppercase text-[10px] gap-1">
              <Link href="/skills?tab=music">Open Library <ChevronRight className="w-3 h-3" /></Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
