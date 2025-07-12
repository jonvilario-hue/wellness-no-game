
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookMarked, Save, Smile, Meh, Frown, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const journalPrompts = [
    "What cognitive strategy felt strongest today?",
    "Did you notice a real-world moment where your training helped?",
    "What was the biggest distraction during your sessions?",
    "How did your energy level affect your focus?",
];

const lifestyleHabits = [
    { key: 'sleep', label: 'Sleep Quality' },
    { key: 'exercise', label: 'Exercise' },
    { key: 'meditation', label: 'Meditation' },
    { key: 'reading', label: 'Reading' },
];

type HabitState = 'good' | 'neutral' | 'bad' | 'done' | null;

export function HabitJournal() {
  const [reflection, setReflection] = useState('');
  const [prompt, setPrompt] = useState('');
  const { toast } = useToast();
  const [habits, setHabits] = useState<Record<string, HabitState>>({ sleep: null, exercise: null, meditation: null, reading: null });

  useEffect(() => {
    // Select a random prompt only on the client-side after hydration
    setPrompt(journalPrompts[Math.floor(Math.random() * journalPrompts.length)]);
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleSave = () => {
    if (reflection.trim()) {
      toast({
        title: 'Journal Entry Saved',
        description: 'Your thoughts have been logged.',
      });
    } else {
        toast({
            title: 'Empty Journal',
            description: 'Please write something before saving.',
            variant: 'destructive'
        })
    }
  };
  
  const handleHabitClick = (habitKey: string, state: HabitState) => {
    setHabits(prev => ({ ...prev, [habitKey]: prev[habitKey] === state ? null : state }));
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <BookMarked className="w-5 h-5 text-primary" />
          Habit & Journal
        </CardTitle>
        <CardDescription>
          Connect training to daily life and track key lifestyle factors.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="journal">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="journal">Journal</TabsTrigger>
            <TabsTrigger value="habits">Lifestyle Habits</TabsTrigger>
          </TabsList>
          <TabsContent value="journal" className="pt-4 space-y-4">
            <p className="text-sm font-medium text-muted-foreground italic min-h-[20px]">
             {prompt}
            </p>
            <Textarea
              placeholder="For example: 'I used a chunking strategy in the memory game...' or 'I noticed I was less distracted at work after my EF training...'"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="min-h-[100px]"
            />
            <Button onClick={handleSave} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Journal Entry
            </Button>
          </TabsContent>
          <TabsContent value="habits" className="pt-4 space-y-3">
              {lifestyleHabits.map(({key, label}) => (
                <div key={key} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">{label}</span>
                  <div className="flex gap-2">
                    {key === 'sleep' ? (
                        <>
                            <Button variant={habits[key] === 'good' ? 'default' : 'outline'} size="icon" onClick={() => handleHabitClick(key, 'good')}><Smile/></Button>
                            <Button variant={habits[key] === 'neutral' ? 'default' : 'outline'} size="icon" onClick={() => handleHabitClick(key, 'neutral')}><Meh/></Button>
                            <Button variant={habits[key] === 'bad' ? 'default' : 'outline'} size="icon" onClick={() => handleHabitClick(key, 'bad')}><Frown/></Button>
                        </>
                    ) : (
                        <Button variant={habits[key] === 'done' ? 'default' : 'outline'} size="icon" onClick={() => handleHabitClick(key, 'done')}><Check/></Button>
                    )}
                  </div>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
