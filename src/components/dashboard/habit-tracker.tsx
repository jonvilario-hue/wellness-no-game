
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Zap, TrendingUp, Lightbulb, CheckSquare, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DomainStreak, type DomainStreakProps } from './domain-streak';
import { useState, useEffect } from 'react';
import { useJournal } from '@/hooks/use-journal';
import { allHabits, journalConfig, type Habit, type JournalCategory } from '@/lib/journal-config';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

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

const habitCategories = Object.keys(journalConfig) as JournalCategory[];
const INSIGHT_KEY = 'habitTrackerInsightDismissed';

const HabitItem = ({ habit, isDone, onToggle }: { habit: Habit; isDone: boolean, onToggle: (checked: boolean) => void }) => {
  const Icon = habit.icon;
  const checkboxId = `habit-tracker-${habit.id}`;
  return (
    <div className="flex items-center">
      <Label
        htmlFor={checkboxId}
        className={cn(
          "flex items-center gap-3 p-2 rounded-lg transition-all w-full cursor-pointer",
          isDone ? 'bg-primary/10 hover:bg-primary/20' : 'bg-muted/50 hover:bg-muted'
        )}
      >
        <Checkbox id={checkboxId} checked={isDone} onCheckedChange={onToggle} />
        <div className={cn("p-1.5 rounded-md", isDone ? 'bg-primary/20' : 'bg-background/50')}>
          <Icon className={cn("w-5 h-5", isDone ? 'text-primary' : 'text-muted-foreground')} />
        </div>
        <span className={cn("flex-grow font-medium text-sm", isDone ? 'text-foreground' : 'text-muted-foreground')}>
          {habit.label}
        </span>
      </Label>
    </div>
  );
};

export function HabitTracker() {
    const [insight, setInsight] = useState('');
    const [isInsightVisible, setIsInsightVisible] = useState(false);
    const { completedHabits, toggleHabitForDay } = useJournal();

    const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
    const todaysHabits = completedHabits[today] || new Set();
    const allHabitList = Object.values(allHabits);

    useEffect(() => {
        const topStreak = domainStreaksData.find(d => d.isTop);
        if (topStreak) {
            setInsight(`Your ${topStreak.name} streak is on fire! This consistency sharpens your logical decision-making skills.`);
        }
        const dismissed = localStorage.getItem(INSIGHT_KEY);
        if (dismissed !== 'true') {
            setIsInsightVisible(true);
        }
    }, []);

    const handleToggleHabit = (habitId: string) => {
      toggleHabitForDay(today, habitId);
    };

    const handleDismissInsight = () => {
      setIsInsightVisible(false);
      localStorage.setItem(INSIGHT_KEY, 'true');
    };

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
                      <p className="text-sm font-bold text-primary">{todaysHabits.size} / {allHabitList.length} Done</p>
                  </div>
                   <ScrollArea className="h-64 pr-3 -mr-3">
                      <Accordion type="multiple" defaultValue={habitCategories} className="w-full">
                        {habitCategories.map(category => {
                          const categoryConfig = journalConfig[category];
                          const categoryHabits = categoryConfig.habits.map(habitId => allHabits[habitId]);
                          const completedInCategory = categoryHabits.filter(h => todaysHabits.has(h.id)).length;

                          return (
                            <AccordionItem value={category} key={category}>
                              <AccordionTrigger>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center gap-2">
                                    <categoryConfig.icon className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-semibold">{category}</span>
                                  </div>
                                  <span className="text-sm text-muted-foreground font-medium pr-2">{completedInCategory} / {categoryHabits.length}</span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-2 pl-2">
                                  {categoryHabits.map(habit => (
                                    <HabitItem 
                                      key={habit.id} 
                                      habit={habit}
                                      isDone={todaysHabits.has(habit.id)}
                                      onToggle={() => handleToggleHabit(habit.id)}
                                    />
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          )
                        })}
                      </Accordion>
                  </ScrollArea>
                  {todaysHabits.size === allHabitList.length && (
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
                  {isInsightVisible && (
                     <div className="p-3 bg-primary/10 rounded-lg text-center relative">
                        <p className="text-sm flex items-start gap-2 pr-6">
                            <Lightbulb className="w-5 h-5 mt-0.5 text-primary shrink-0"/> 
                            <span className="text-foreground text-left"><span className="font-bold">Insight:</span> {insight}</span>
                        </p>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute top-1 right-1 h-6 w-6"
                            onClick={handleDismissInsight}
                            aria-label="Dismiss insight"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                  )}
              </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
}
