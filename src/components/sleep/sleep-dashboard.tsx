
'use client';

import { useSleepProStore, type NightlyLog } from '@/hooks/use-sleep-pro-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import { Info, Zap, RefreshCw, Trophy, AlertCircle, Moon, Clock, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

export function SleepDashboard() {
  const { logs, generateSimulatedNight } = useSleepProStore();

  const lastNight = logs[0];
  
  const weeklyData = useMemo(() => {
    return [...logs].reverse().slice(-7).map(log => ({
      name: new Date(log.date).toLocaleDateString('en-US', { weekday: 'short' }),
      score: log.score,
      duration: log.totalDuration / 60
    }));
  }, [logs]);

  const hypnogramData = useMemo(() => {
    if (!lastNight) return [];
    // Simulate a nightly sequence of phases for visualization
    const phases = ['Deep', 'Light', 'REM', 'Light', 'Deep', 'Light', 'REM', 'Wake'];
    return phases.map((phase, i) => ({
      time: i,
      phase: phase === 'Wake' ? 4 : phase === 'REM' ? 3 : phase === 'Light' ? 2 : 1,
      name: phase
    }));
  }, [lastNight]);

  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 bg-muted/20 rounded-xl border-2 border-dashed">
        <Moon className="h-12 w-12 text-muted-foreground opacity-50" />
        <div className="space-y-2">
          <h3 className="text-xl font-bold">No Sleep Data Yet</h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Start a Wind Down session tonight to begin tracking your recovery.
          </p>
        </div>
        <Button onClick={generateSimulatedNight}>
          <RefreshCw className="mr-2 h-4 w-4" /> Simulate Last Night
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Primary Score Card */}
      <Card className="md:col-span-1 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Last Night
            <span className="text-xs font-normal text-muted-foreground">{new Date(lastNight.date).toLocaleDateString()}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
              <circle 
                cx="96" 
                cy="96" 
                r="88" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="12" 
                strokeDasharray={552} 
                strokeDashoffset={552 - (552 * lastNight.score) / 100} 
                strokeLinecap="round" 
                className="text-primary transition-all duration-1000" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-primary">{lastNight.score}</span>
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Score</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="p-3 bg-background rounded-lg border text-center">
              <p className="text-xs text-muted-foreground mb-1 uppercase font-bold">Duration</p>
              <p className="text-xl font-bold">{Math.floor(lastNight.totalDuration / 60)}h {lastNight.totalDuration % 60}m</p>
            </div>
            <div className="p-3 bg-background rounded-lg border text-center">
              <p className="text-xs text-muted-foreground mb-1 uppercase font-bold">Efficiency</p>
              <p className="text-xl font-bold">{lastNight.efficiency}%</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full p-3 bg-primary/10 rounded-lg flex items-start gap-3">
            <Zap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm">
              <strong>Insight:</strong> Your Deep Sleep was 12% higher than average. Expect high clarity today.
            </p>
          </div>
        </CardFooter>
      </Card>

      {/* Phase Breakdown & Hypnogram */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Sleep Architecture</CardTitle>
          <CardDescription>Nightly phase transitions and duration balance.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hypnogramData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="time" hide />
                <YAxis 
                  domain={[0, 5]} 
                  ticks={[1, 2, 3, 4]} 
                  tickFormatter={(val) => val === 1 ? 'Deep' : val === 2 ? 'Light' : val === 3 ? 'REM' : 'Wake'}
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  labelStyle={{ display: 'none' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                />
                <Area 
                  type="stepAfter" 
                  dataKey="phase" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.2} 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold flex items-center gap-2">
              <Clock className="h-4 w-4" /> Phase Balance
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(lastNight.phases).map(([phase, mins]) => (
                <div key={phase} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="capitalize font-semibold">{phase} Sleep</span>
                    <span className="text-muted-foreground">{mins} min</span>
                  </div>
                  <Progress value={(mins / lastNight.totalDuration) * 100} className={cn(
                    phase === 'deep' ? 'bg-blue-900/20 [&>div]:bg-blue-500' :
                    phase === 'rem' ? 'bg-purple-900/20 [&>div]:bg-purple-500' :
                    phase === 'wake' ? 'bg-red-900/20 [&>div]:bg-red-500' :
                    'bg-slate-900/20 [&>div]:bg-slate-400'
                  )} />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Trends */}
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Recovery Trends</CardTitle>
          <CardDescription>Your sleep performance over the last 7 days.</CardDescription>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip 
                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {weeklyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.score > 80 ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
