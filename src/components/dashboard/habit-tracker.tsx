
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Zap, TrendingUp, Lightbulb, CheckSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DomainStreak, type DomainStreakProps } from './domain-streak';
import { useState, useEffect } from 'react';
import { useJournal } from '@/hooks/use-journal';
import { allHabits, type Habit } from '@/lib/journal-config';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

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
    { domainKey: 'Gc', name: 'Crystallized Intelligence', streak: 7, isTop: false },
    { domainKey: 'Gv', name: 'Visual Processing', streak: 4, isTop: false },
    { domainKey: 'Ga', name: 'Auditory Processing', streak: 2, isTop: false },
    { domainKey: 'Glr', name: 'Long-Term Retrieval', streak: 9, isTop: false },
].sort((a, b) => b.streak - a.streak);


const HabitItem = ({ habit, isDone }: { habit: Habit; isDone: boolean }) => {
  const Icon = habit.icon;
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-lg transition-all",
      isDone ? 'bg-primary/10' : 'bg-muted/50'
    )}>
      <div className={cn(
        "p-1.5 rounded-md",
        isDone ? 'bg-primary/20' : 'bg-background/50'
      )}>
        <Icon className={cn("w-5 h-5", isDone ? 'text-primary' : 'text-muted-foreground')} />
      </div>
      <span className={cn(
        "flex-grow font-medium text-sm",
        isDone ? 'text-primary-foreground' : 'text-muted-foreground'
      )}>{habit.label}</span>
      {isDone && <CheckSquare className="w-5 h-5 text-primary shrink-0"/>}
    </div>
  );
};


export function HabitTracker() {
    const [insight, setInsight] = useState('');
    const { getCompletedHabitsForDay } = useJournal();
    const [completedToday, setCompletedToday] = useState(new Set<string>());

    const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];

    useEffect(() => {
        setCompletedToday(getCompletedHabitsForDay(today));
    }, [getCompletedHabitsForDay, today]);

    useEffect(() => {
        const topStreak = domainStreaksData.find(d => d.isTop);
        if (topStreak) {
            setInsight(`Your ${topStreak.name} streak is on fire! This consistency sharpens your logical decision-making skills.`);
        }
    }, []);

    const allHabitList = Object.values(allHabits);
    const habitsDone = allHabitList.filter(h => completedToday.has(h.id));
    const habitsToDo = allHabitList.filter(h => !completedToday.has(h.id));


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
        <Tabs defaultValue="today">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="today">Today's Habits</TabsTrigger>
                <TabsTrigger value="streaks">Domain Streaks</TabsTrigger>
                <TabsTrigger value="insight">Insight</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="pt-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Today's Progress</h3>
                    <p className="text-sm font-bold text-primary">{habitsDone.length} / {allHabitList.length} Done</p>
                </div>
                 <ScrollArea className="h-64 pr-3 -mr-3">
                    <div className="space-y-2">
                        {habitsDone.map(habit => <HabitItem key={habit.id} habit={habit} isDone={true} />)}
                        {habitsToDo.map(habit => <HabitItem key={habit.id} habit={habit} isDone={false} />)}
                    </div>
                </ScrollArea>
                {habitsDone.length === allHabitList.length && (
                    <p className="text-center text-green-500 font-bold mt-4">All habits completed for today!</p>
                )}
            </TabsContent>

            <TabsContent value="streaks" className="space-y-3 pt-4">
                 <ScrollArea className="h-64 pr-3 -mr-3">
                    <div className="space-y-2">
                         {domainStreaksData.map((streak, index) => (
                            <DomainStreak key={index} {...streak} />
                         ))}
                    </div>
                </ScrollArea>
            </TabsContent>

            <TabsContent value="insight" className="space-y-4 pt-4">
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
        </Tabs>
      </CardContent>
    </Card>
  );
}

    