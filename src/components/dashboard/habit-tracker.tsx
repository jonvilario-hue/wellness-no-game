
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Zap, BrainCircuit, Lightbulb, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DomainStreak, type DomainStreakProps } from './domain-streak';
import { useState, useEffect } from 'react';

const overallStats = {
  totalSessions: 42,
  longestStreak: 14,
  currentStreak: 5,
};

const domainStreaksData: DomainStreakProps[] = [
    { domainKey: 'Gf', name: 'Fluid Reasoning', streak: 12, isTop: true },
    { domainKey: 'Gwm', name: 'Working Memory', streak: 8, isTop: false },
    { domainKey: 'Gs', name: 'Processing Speed', streak: 5, isTop: false },
    { domainKey: 'EF', name: 'Executive Function', streak: 3, isTop: false },
];

export function HabitTracker() {
    const [insight, setInsight] = useState('');

    useEffect(() => {
        const topStreak = domainStreaksData.find(d => d.isTop);
        if (topStreak) {
            setInsight(`Your ${topStreak.name} streak is on fire! This consistency sharpens your logical decision-making skills.`);
        }
    }, []);


  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Target className="w-5 h-5 text-primary" />
          Habit Tracker
        </CardTitle>
        <CardDescription>Track your consistency and build lasting cognitive habits.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="streaks">Domain Streaks</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 pt-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-primary" />
                        <span className="font-medium">Current Streak</span>
                    </div>
                    <span className="font-bold text-lg">{overallStats.currentStreak} Days</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Zap className="w-6 h-6 text-accent" />
                        <span className="font-medium">Total Sessions</span>
                    </div>
                    <span className="font-bold text-lg">{overallStats.totalSessions}</span>
                </div>
                 <div className="p-3 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-primary-foreground/80 flex items-start gap-2">
                        <Lightbulb className="w-5 h-5 mt-0.5 text-primary shrink-0"/> 
                        <span><span className="font-bold text-primary-foreground">Insight:</span> {insight}</span>
                    </p>
                </div>
            </TabsContent>
            <TabsContent value="streaks" className="space-y-3 pt-4">
                 {domainStreaksData.map(streak => (
                    <DomainStreak key={streak.domainKey} {...streak} />
                 ))}
            </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
