'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sigma, Flame, Target, Box, 
  BrainCircuit, Scale, Calculator, 
  Activity, CalendarDays, History, 
  ArrowRight, Info, Sparkles, CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { format, startOfWeek, isAfter, subDays, parseISO } from 'date-fns';
import { MathSessionPlayer } from './MathSessionPlayer';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { cn } from '@/lib/utils';
import WellnessHeatmap from './WellnessHeatmap';

export type MathDomain = {
  id: string;
  name: string;
  philosophy: string;
  icon: any;
};

const domains: MathDomain[] = [
  { id: 'sense', name: 'Number Sense & Estimation', philosophy: 'Intuition over exactness.', icon: BrainCircuit },
  { id: 'ratio', name: 'Percentage & Ratio Fluency', philosophy: 'The language of comparison.', icon: Scale },
  { id: 'arithmetic', name: 'Mental Arithmetic Composure', philosophy: 'Calm speed under pressure.', icon: Calculator },
  { id: 'prob', name: 'Probabilistic Thinking', philosophy: 'Navigating uncertainty.', icon: Activity },
  { id: 'logic', name: 'Logical Structure', philosophy: 'The geometry of thought.', icon: Sigma },
];

export function MathComposureLab() {
  const { user, firestore } = useFirebase();
  const [activeSession, setActiveSession] = useState<{ domainId: string; mode: string } | null>(null);

  const sessionsQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return query(
      collection(firestore, 'users', user.uid, 'math-sessions'),
      orderBy('timestamp', 'desc')
    );
  }, [firestore, user?.uid]);

  const { data: sessions, isLoading } = useCollection(sessionsQuery);

  const stats = useMemo(() => {
    if (!sessions) return { streak: 0, weekDomains: 0, practicalLogged: 0 };
    
    // Streak
    const dates = new Set(sessions.map(s => format(parseISO(s.timestamp), 'yyyy-MM-dd')));
    let streak = 0;
    let checkDate = new Date();
    while (dates.has(format(checkDate, 'yyyy-MM-dd'))) {
      streak++;
      checkDate = subDays(checkDate, 1);
    }

    // Weekly Domains
    const weekStart = startOfWeek(new Date());
    const weekSessions = sessions.filter(s => isAfter(parseISO(s.timestamp), weekStart));
    const uniqueDomains = new Set(weekSessions.map(s => s.domainId));

    // Practical Logged
    const practical = sessions.filter(s => s.isApplied).length;

    return { streak, weekDomains: uniqueDomains.size, practicalLogged: practical };
  }, [sessions]);

  const habitData = useMemo(() => {
    if (!sessions) return [];
    const habitCounts: Record<string, number> = {};
    sessions.forEach(s => {
      s.habitsOfMind?.forEach((h: string) => {
        habitCounts[h] = (habitCounts[h] || 0) + 1;
      });
    });
    return Object.entries(habitCounts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [sessions]);

  const heatmapData = useMemo(() => {
    if (!sessions) return [];
    const counts: Record<string, number> = {};
    sessions.forEach(s => {
      const d = format(parseISO(s.timestamp), 'yyyy-MM-dd');
      counts[d] = (counts[d] || 0) + 1;
    });
    return Object.entries(counts).map(([date, count]) => ({ date, count }));
  }, [sessions]);

  if (activeSession) {
    return (
      <MathSessionPlayer 
        domain={domains.find(d => d.id === activeSession.domainId)!} 
        mode={activeSession.mode as any}
        onClose={() => setActiveSession(null)}
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <Flame className="w-6 h-6 text-orange-500 mb-2" />
            <p className="text-3xl font-black">{stats.streak}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Composure Streak</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={cn(
                  "w-3 h-3 rounded-full border-2",
                  i < stats.weekDomains ? "bg-primary border-primary" : "border-primary/20"
                )} />
              ))}
            </div>
            <p className="text-xl font-black">{stats.weekDomains} / 5</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Domains This Week</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="w-6 h-6 text-primary mb-2" />
            <p className="text-3xl font-black">{stats.practicalLogged}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Practical Math Logged</p>
          </CardContent>
        </Card>
      </div>

      {/* DOMAINS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map(domain => {
          const domainSessions = sessions?.filter(s => s.domainId === domain.id) || [];
          const weekStart = startOfWeek(new Date());
          const weekCount = domainSessions.filter(s => isAfter(parseISO(s.timestamp), weekStart)).length;
          const lastDate = domainSessions[0] ? format(parseISO(domainSessions[0].timestamp), 'MMM d') : 'Never';

          return (
            <Card key={domain.id} className="group hover:border-primary/50 transition-all border-primary/5 overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <domain.icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-sm font-bold truncate">{domain.name}</CardTitle>
                </div>
                <CardDescription className="text-xs italic leading-relaxed h-8">"{domain.philosophy}"</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground">Sessions this week</p>
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className={cn("w-1.5 h-1.5 rounded-full", i < weekCount ? "bg-primary" : "bg-muted")} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] font-bold text-muted-foreground">Last: {lastDate}</p>
                </div>
              </CardContent>
              <CardFooter className="pt-0 border-t border-primary/5 p-0 overflow-hidden">
                <div className="grid grid-cols-3 w-full h-10">
                  {['Slow Work', 'Steady Rhythm', 'Real Life'].map(mode => (
                    <button 
                      key={mode}
                      onClick={() => setActiveSession({ domainId: domain.id, mode })}
                      className="text-[9px] font-black uppercase hover:bg-primary hover:text-primary-foreground transition-all border-r border-primary/5 last:border-none"
                    >
                      {mode === 'Steady Rhythm' ? 'Steady' : mode}
                    </button>
                  ))}
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Habits You're Building</h3>
          </div>
          <Card className="border-primary/10 bg-primary/[0.02]">
            <CardContent className="h-64 pt-8">
              {habitData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={habitData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" fontSize={10} width={100} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px' }} />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full opacity-30 italic text-xs">Complete a session to track habits</div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <CalendarDays className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Practice History</h3>
          </div>
          <WellnessHeatmap activityData={heatmapData} />
        </div>
      </div>
    </div>
  );
}