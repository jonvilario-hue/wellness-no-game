
'use client';

import { useMemo } from 'react';
import { useCodingStore } from '@/hooks/use-coding-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Cell } from 'recharts';
import { TrendingUp, Target, Brain, Activity, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CodingAnalytics() {
  const { logs, laneProgress } = useCodingStore();

  const velocityData = useMemo(() => {
    return [...logs].reverse().slice(-20).map((l, i) => ({
      index: i,
      score: l.accuracy,
      lane: l.lane,
      date: l.date
    }));
  }, [logs]);

  const laneStats = useMemo(() => {
    return Object.entries(laneProgress).map(([name, data]) => ({
      name,
      level: data.level,
      accuracy: Math.round(data.avgAccuracy),
      sessions: data.totalSessions
    }));
  }, [laneProgress]);

  const strongestLane = useMemo(() => {
    return laneStats.sort((a, b) => b.accuracy - a.accuracy)[0];
  }, [laneStats]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-primary/10 overflow-hidden">
          <CardHeader className="bg-primary/5 pb-4">
            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> 3-Lane Fluency Velocity
            </CardTitle>
            <CardDescription>Accuracy and throughput trends across Write, Read, and Build.</CardDescription>
          </CardHeader>
          <CardContent className="h-64 pt-8">
            {velocityData.length < 2 ? (
              <div className="flex flex-col items-center justify-center h-full space-y-2 opacity-30 italic text-xs text-center">
                <Activity className="w-8 h-8 mb-2" />
                <span>Complete more daily loops to visualize your growth curve.</span>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={velocityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="index" hide />
                  <YAxis domain={[0, 100]} fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="p-3 bg-background border rounded-xl shadow-xl space-y-1">
                            <p className="text-[10px] font-black uppercase text-muted-foreground">{data.date}</p>
                            <p className="text-xs font-bold">{data.lane} Phase</p>
                            <p className="text-xs text-primary font-black">Accuracy: {data.score}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.1} strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="border-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" /> Lane Mastery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {laneStats.map(lane => (
              <div key={lane.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase">{lane.name}</span>
                  <span className="text-[10px] font-black text-primary">LVL {lane.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${lane.accuracy}%` }} />
                  </div>
                  <span className="text-[8px] font-bold text-muted-foreground uppercase">{lane.accuracy}%</span>
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t border-primary/5">
              <div className="p-3 bg-primary/5 rounded-xl space-y-2">
                <h4 className="text-[10px] font-black uppercase text-primary flex items-center gap-2">
                  <Brain className="w-3 h-3" /> System Strategy
                </h4>
                <p className="text-[10px] leading-relaxed text-muted-foreground">
                  Your strongest lane is <b className="text-foreground">{strongestLane?.name}</b>. The daily loop will prioritize extra friction in the other lanes to balance your profile.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
