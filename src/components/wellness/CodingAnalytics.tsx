'use client';

import { useMemo } from 'react';
import { useCodingStore } from '@/hooks/use-coding-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Cell } from 'recharts';
import { TrendingUp, Target, Brain, Activity, Layers, AlertCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export function CodingAnalytics() {
  const { logs, languageProgress, activeTrack } = useCodingStore();

  const currentTrackLangs = activeTrack === 'Foundation' 
    ? ['Python', 'TypeScript', 'SQL'] 
    : ['Rust', 'Bash', 'Swift', 'Go'];

  const conceptStats = useMemo(() => {
    const stats: Array<{ concept: string; lang: string; fails: number }> = [];
    Object.entries(languageProgress).forEach(([lang, prog]) => {
      if (!currentTrackLangs.includes(lang)) return;
      Object.entries(prog.conceptWeaknesses).forEach(([concept, count]) => {
        if (count > 0) stats.push({ concept, lang, fails: count });
      });
    });
    return stats.sort((a, b) => b.fails - a.fails).slice(0, 3);
  }, [languageProgress, currentTrackLangs]);

  const velocityData = useMemo(() => {
    return [...logs].reverse().slice(-20).map((l, i) => ({
      index: i,
      score: l.accuracy,
      lane: l.lane,
      date: l.date
    }));
  }, [logs]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-primary/10 overflow-hidden">
          <CardHeader className="bg-primary/5 pb-4">
            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> Velocity Trends
            </CardTitle>
            <CardDescription>Accuracy and throughput trends for the {activeTrack} track.</CardDescription>
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
              <AlertCircle className="w-4 h-4 text-primary" /> Structural Weaknesses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {conceptStats.length === 0 ? (
              <div className="py-10 text-center opacity-30 italic text-xs">No specific weaknesses identified yet. Keep drilling.</div>
            ) : (
              conceptStats.map((stat, idx) => (
                <div key={idx} className="p-3 bg-destructive/5 border border-destructive/10 rounded-xl space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-destructive">{stat.lang}</span>
                    <Badge variant="outline" className="text-[8px] h-4 border-destructive/20 text-destructive">{stat.fails} FAILS</Badge>
                  </div>
                  <p className="text-xs font-bold truncate capitalize">{stat.concept.replace('-', ' ')}</p>
                </div>
              ))
            )}
            
            <div className="pt-4 border-t border-primary/5">
              <div className="p-3 bg-primary/5 rounded-xl space-y-2">
                <h4 className="text-[10px] font-black uppercase text-primary flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> Adaptive Insight
                </h4>
                <p className="text-[10px] leading-relaxed text-muted-foreground">
                  {conceptStats.length > 0 
                    ? `We've noticed friction with ${conceptStats[0].concept}. Tomorrow's loop will prioritize Level 1 reinforcement drills for this topic.`
                    : "Your performance is balanced. The system will continue to scale difficulty across all active languages."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
