
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useJournal } from '@/hooks/use-journal';
import { allHabits, journalConfig, type JournalCategory, type HabitId, type Habit } from '@/lib/journal-config';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

const habitCategories = Object.keys(journalConfig) as JournalCategory[];

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
    const { completedHabits, toggleHabitForDay } = useJournal();

    const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
    const todaysHabits = completedHabits[today] || new Set();
    const allHabitList = Object.values(allHabits);


    const handleToggleHabit = (habitId: HabitId) => {
      toggleHabitForDay(today, habitId);
    };

    return (
      <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Target className="w-5 h-5 text-primary" />
            Habit Tracker
          </CardTitle>
          <CardDescription>Track your consistency and build lasting cognitive habits.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Today's Progress</h3>
                <p className="text-sm font-bold text-primary">{todaysHabits.size} / {allHabitList.length} Done</p>
            </div>
            <ScrollArea className="pr-3 -mr-3">
                <Accordion type="multiple" defaultValue={[]} className="w-full">
                {habitCategories.map(category => {
                    const categoryConfig = journalConfig[category];
                    const categoryHabits = categoryConfig.habits.map(habitId => allHabits[habitId]);
                    const completedInCategory = categoryHabits.filter(h => h && todaysHabits.has(h.id)).length;

                    if (!categoryHabits.length || categoryHabits.some(h => !h)) return null;

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
                            habit && <HabitItem 
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
        </CardContent>
      </Card>
    );
}
