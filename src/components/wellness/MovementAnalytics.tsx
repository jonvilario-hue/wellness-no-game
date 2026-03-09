
'use client';

import { useMemo } from 'react';
import { useWellnessData } from '@/hooks/use-wellness-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  TrendingUp, Trophy, Dumbbell, Brain, 
  Target, Sparkles, Activity, Info 
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function MovementAnalytics() {
  const { movementLogs } = useWellnessData();

  const chartData = useMemo(() => {
    return [...movementLogs]
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .slice(-10)
      .map(l => ({
        date: l.timestamp.split('T')[0],
        difficulty: l.difficulty || 0,
        name: l.exerciseName
      }));
  }, [movementLogs]);

  const topPerformers = useMemo(() => {
    const skills: Record<string, { name: string, totalDifficulty: number, count: number }> = {};
    
    movementLogs.forEach(l => {
      if (!skills[l.exerciseId]) {
        skills[l.exerciseId] = { name: l.exerciseName, totalDifficulty: 0, count: 0 };
      }
      if (l.difficulty !== undefined) {
        skills[l.exerciseId].totalDifficulty += l.difficulty;
        skills[l.exerciseId].count++;
      }
    });

    return Object.values(skills)
      .filter(s => s.count >= 2)
      .map(s => ({
        name: s.name,
        avg: parseFloat((s.totalDifficulty / s.count).toFixed(1)),
        count: s.count
      }))
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 3);
  }, [movementLogs]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-700">
      <Card className="lg:col-span-2 border-primary/10 overflow-hidden">
        <CardHeader className="bg-primary/5 pb-4">
          <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Physical Intensity Curve
          </CardTitle>
          <CardDescription>Difficulty ratings (1-5) over your last 10 movement sessions.</CardDescription>
        </CardHeader>
        <CardContent className="h-64 pt-8">
          {chartData.length < 2 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-2 opacity-30 italic text-xs text-center px-10">
              <Activity className="w-8 h-8 mb-2" />
              <span>Log more workouts to visualize your physical output and intensity trends.</span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="date" hide />
                <YAxis domain={[0, 5]} fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-3 bg-background border rounded-xl shadow-xl space-y-1">
                          <p className="text-[10px] font-black uppercase text-muted-foreground">{payload[0].payload.date}</p>
                          <p className="text-xs font-bold">{payload[0].payload.name}</p>
                          <p className="text-xs text-primary font-black">Intensity: {payload[0].value}/5</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="difficulty" 
                  name="Intensity" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.1} 
                  strokeWidth={3} 
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card className="border-primary/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary" /> Performance Hall of Fame
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topPerformers.length === 0 ? (
            <div className="py-10 text-center opacity-30 italic text-xs">
              Complete 2+ sessions of an exercise to rank it here.
            </div>
          ) : (
            topPerformers.map((skill, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase truncate max-w-[150px]">{skill.name}</span>
                  <Badge variant="secondary" className="text-[9px] font-black">{skill.avg}/5 AVG</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${(skill.avg / 5) * 100}%` }} 
                    />
                  </div>
                  <span className="text-[8px] font-bold text-muted-foreground uppercase">{skill.count} LOGS</span>
                </div>
              </div>
            ))
          )}
          
          <div className="pt-4 border-t border-primary/5">
            <div className="p-3 bg-primary/5 rounded-xl space-y-2">
              <h4 className="text-[10px] font-black uppercase text-primary flex items-center gap-2">
                <Brain className="w-3 h-3" /> Somatic Strategy
              </h4>
              <p className="text-[10px] leading-relaxed text-muted-foreground">
                Your highest intensity performance is in <b>{topPerformers[0]?.name || 'Strength'}</b>. Use this type of movement after heavy analytical tasks to "flush" cognitive fatigue.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
