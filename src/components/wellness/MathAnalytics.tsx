'use client';

import { useMemo } from 'react';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  TrendingUp, Trophy, Brain, 
  Target, Sparkles, Activity, Info, Sigma,
  BrainCircuit
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { domains } from './MathComposureLab';

export function MathAnalytics() {
  const { user, firestore } = useFirebase();

  const sessionsQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return query(
      collection(firestore, 'users', user.uid, 'math-sessions'),
      orderBy('timestamp', 'desc')
    );
  }, [firestore, user?.uid]);

  const { data: sessions } = useCollection(sessionsQuery);

  const chartData = useMemo(() => {
    if (!sessions) return [];
    return [...sessions]
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .slice(-10)
      .map(l => ({
        date: l.timestamp.split('T')[0],
        problems: l.problemsAttempted || 0,
        name: domains.find(d => d.id === l.domainId)?.name || 'Unknown'
      }));
  }, [sessions]);

  const topDomains = useMemo(() => {
    if (!sessions) return [];
    const counts: Record<string, { name: string, totalProblems: number, count: number }> = {};
    
    sessions.forEach(l => {
      if (!counts[l.domainId]) {
        const dInfo = domains.find(d => d.id === l.domainId);
        counts[l.domainId] = { name: dInfo?.name || 'Unknown', totalProblems: 0, count: 0 };
      }
      counts[l.domainId].totalProblems += l.problemsAttempted || 0;
      counts[l.domainId].count++;
    });

    return Object.values(counts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }, [sessions]);

  const habitData = useMemo(() => {
    if (!sessions) return [];
    const habitCounts: Record<string, number> = {};
    sessions.forEach(s => {
      s.habitsOfMind?.forEach((h: string) => {
        habitCounts[h] = (habitCounts[h] || 0) + 1;
      });
    });
    return Object.entries(habitCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [sessions]);

  const strategyNudge = useMemo(() => {
    if (!sessions || sessions.length === 0) return null;
    const recent = sessions.slice(0, 3);
    const shakyCount = recent.filter(s => s.feeling === 'Shaky').length;
    
    if (shakyCount >= 2) {
      return {
        title: 'Composure Reset',
        body: 'Your recent sessions show high cognitive friction ("Shaky"). Try a "Slow Work" session in Number Sense to rebuild grounding before returning to speed drills.'
      };
    }
    return {
      title: 'Momentum Optimal',
      body: 'Your "Grounded" rating is consistent. This is the ideal time to push into "Steady Rhythm" mode for higher tiers.'
    };
  }, [sessions]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-primary/10 overflow-hidden">
          <CardHeader className="bg-primary/5 pb-4">
            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> Mathematical Velocity
            </CardTitle>
            <CardDescription>Tracks actual measurable improvement in your numerical throughput and speed over the last 10 logs.</CardDescription>
          </CardHeader>
          <CardContent className="h-64 pt-8">
            {!sessions || sessions.length < 2 ? (
              <div className="flex flex-col items-center justify-center h-full space-y-2 opacity-30 italic text-xs text-center px-10">
                <Activity className="w-8 h-8 mb-2" />
                <span>Complete more sessions to visualize your numerical throughput.</span>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="date" hide />
                  <YAxis fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="p-3 bg-background border rounded-xl shadow-xl space-y-1">
                            <p className="text-[10px] font-black uppercase text-muted-foreground">{payload[0].payload.date}</p>
                            <p className="text-xs font-bold">{payload[0].payload.name}</p>
                            <p className="text-xs text-primary font-black">Problems: {payload[0].value}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="problems" 
                    name="Problems" 
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
              <Trophy className="w-4 h-4 text-primary" /> Domain Hall of Fame
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topDomains.length === 0 ? (
              <div className="py-10 text-center opacity-30 italic text-xs">
                Complete sessions to rank your top domains here.
              </div>
            ) : (
              topDomains.map((domain, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase truncate max-w-[150px]">{domain.name}</span>
                    <span className="font-black text-[10px]">{domain.count} SESSIONS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${Math.min(100, (domain.count / 10) * 100)}%` }} 
                      />
                    </div>
                    <span className="text-[8px] font-bold text-muted-foreground uppercase">{domain.totalProblems} REPS</span>
                  </div>
                </div>
              ))
            )}
            
            <div className="pt-4 border-t border-primary/5">
              <div className="p-3 bg-primary/5 rounded-xl space-y-2">
                <h4 className="text-[10px] font-black uppercase text-primary flex items-center gap-2">
                  <Brain className="w-3 h-3" /> Composure Strategy
                </h4>
                <p className="text-[10px] leading-relaxed text-muted-foreground">
                  {strategyNudge?.body || 'Continue practicing to receive personalized neurological strategy nudges.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-primary/10 bg-primary/[0.02]">
          <CardHeader className="pb-4">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-primary" /> Habits You're Building
            </CardTitle>
            <CardDescription>Tracks your commitment to specific mathematical thinking protocols. Consistency in these habits builds long-term resilience.</CardDescription>
          </CardHeader>
          <CardContent className="h-64 pt-4">
            {habitData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={habitData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.05} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" fontSize={9} width={120} axisLine={false} tickLine={false} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px' }} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full opacity-30 italic text-xs">Complete a session to track habits</div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-muted/30 border-none shadow-none flex flex-col justify-center p-6 text-center">
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-3 opacity-40" />
          <h4 className="text-xs font-black uppercase tracking-widest mb-2">Meta-Cognitive Growth</h4>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Meta-cognitive growth refers to your developing ability to monitor, direct, and improve your own thinking processes. By naming your <b>Habits of Mind</b>, you move from reactive, automatic calculation to deliberate, high-level strategic reasoning. This reduces cognitive load and allows you to catch errors before they propagate through complex problems.
          </p>
        </Card>
      </div>
    </div>
  );
}
