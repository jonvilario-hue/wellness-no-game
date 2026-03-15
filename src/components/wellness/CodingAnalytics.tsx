
'use client';

import { useMemo } from 'react';
import { useCodingStore } from '@/hooks/use-coding-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Cell } from 'recharts';
import { TrendingUp, Target, Brain, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CodingAnalytics() {
  const { logs, languageProgress } = useCodingStore();

  const velocityData = useMemo(() => {
    return [...logs].reverse().slice(-20).map((l, i) => ({
      index: i,
      score: l.accuracy,
      date: l.date
    }));
  }, [logs]);

  const langStats = useMemo(() => {
    return Object.entries(languageProgress).map(([name, data]) => ({
      name,
      level: data.level,
      accuracy: Math.round(data.avgAccuracy)
    }));
  }, [languageProgress]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-primary/10 overflow-hidden">
          <CardHeader className="bg-primary/5 pb-4">
            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> Fluency Velocity
            </CardTitle>
            <CardDescription>Accuracy and speed trends over your last 20 drill sessions.</CardDescription>
          </CardHeader>
          <CardContent className="h-64 pt-8">
            {velocityData.length < 2 ? (
              <div className="flex flex-col items-center justify-center h-full space-y-2 opacity-30 italic text-xs text-center">
                <Activity className="w-8 h-8 mb-2" />
                <span>Drill more languages to see your growth curve.</span>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={velocityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="index" hide />
                  <YAxis domain={[0, 100]} fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
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
              <Target className="w-4 h-4 text-primary" /> Language Levels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {langStats.length === 0 ? (
              <p className="text-center py-10 opacity-30 italic text-xs">No language data yet.</p>
            ) : (
              langStats.map(lang => (
                <div key={lang.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase">{lang.name}</span>
                    <span className="text-[10px] font-black text-primary">LEVEL {lang.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${lang.accuracy}%` }} />
                    </div>
                    <span className="text-[8px] font-bold text-muted-foreground uppercase">{lang.accuracy}%</span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
