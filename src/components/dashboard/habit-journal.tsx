
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookMarked, Save, Smile, Meh, Frown, Check, Clipboard, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

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
  const [tags, setTags] = useState('');
  const [effort, setEffort] = useState(7);
  const [prompt, setPrompt] = useState('');
  const { toast } = useToast();
  const [habits, setHabits] = useState<Record<string, HabitState>>({ sleep: null, exercise: null, meditation: null, reading: null });

  useEffect(() => {
    // Select prompt on the client-side to avoid hydration mismatch
    setPrompt(journalPrompts[Math.floor(Math.random() * journalPrompts.length)]);
  }, []);

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

  const formatMarkdown = () => {
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const tagString = tags.split(',').map(t => t.trim() ? `#${t.trim()}` : '').join(' ');

    return `## ${today} - Cognitive Reflection\n\n` +
           `**Prompt:** ${prompt}\n\n` +
           `**Reflection:**\n${reflection}\n\n` +
           `**Effort/Focus:** ${effort}/10\n` +
           `**Tags:** ${tagString}`;
  };

  const handleCopyToClipboard = () => {
    if (!reflection.trim()) {
      toast({ title: 'Nothing to copy', description: 'Please write a reflection first.', variant: 'destructive' });
      return;
    }
    const markdown = formatMarkdown();
    navigator.clipboard.writeText(markdown);
    toast({ title: 'Copied to Clipboard!', description: 'Your journal entry is ready to paste.' });
  };
  
  const handleExport = () => {
     if (!reflection.trim()) {
      toast({ title: 'Nothing to export', description: 'Please write a reflection first.', variant: 'destructive' });
      return;
    }
    const markdown = formatMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const today = new Date().toISOString().split('T')[0];
    link.download = `cognitive-journal-${today}.md`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({ title: 'Export Successful', description: 'Your journal entry has been downloaded.' });
  }
  
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
            <div className="space-y-2">
              <Label htmlFor="tags-input">Tags (comma-separated)</Label>
              <Input 
                id="tags-input"
                placeholder="e.g. Gwm, strategy, focus"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="effort-slider" className="flex justify-between">
                <span>Effort / Focus Level</span>
                <span>{effort}/10</span>
              </Label>
              <Slider 
                id="effort-slider"
                min={1} max={10} step={1}
                value={[effort]}
                onValueChange={(value) => setEffort(value[0])}
              />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              <Button onClick={handleSave} className="lg:col-span-3">
                <Save className="mr-2 h-4 w-4" />
                Save Entry
              </Button>
              <Button onClick={handleCopyToClipboard} variant="outline">
                <Clipboard className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button onClick={handleExport} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export (.md)
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="habits" className="pt-4 space-y-3">
              {lifestyleHabits.map(({key, label}) => (
                <div key={key} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">{label}</span>
                  <div className="flex gap-1 sm:gap-2">
                    {key === 'sleep' ? (
                        <>
                            <Button variant={habits[key] === 'good' ? 'default' : 'outline'} size="icon" onClick={() => handleHabitClick(key, 'good')}><Smile className="h-4 w-4"/></Button>
                            <Button variant={habits[key] === 'neutral' ? 'default' : 'outline'} size="icon" onClick={() => handleHabitClick(key, 'neutral')}><Meh className="h-4 w-4"/></Button>
                            <Button variant={habits[key] === 'bad' ? 'default' : 'outline'} size="icon" onClick={() => handleHabitClick(key, 'bad')}><Frown className="h-4 w-4"/></Button>
                        </>
                    ) : (
                        <Button variant={habits[key] === 'done' ? 'default' : 'outline'} size="icon" onClick={() => handleHabitClick(key, 'done')}><Check className="h-4 w-4"/></Button>
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
