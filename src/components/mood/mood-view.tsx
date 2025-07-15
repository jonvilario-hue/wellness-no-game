
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Textarea } from '@/components/ui/textarea';
import { useHydratedJournalStore as useJournal, type MoodState } from '@/hooks/use-journal';
import { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Smile, Save, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Bar, BarChart, CartesianGrid } from 'recharts';
import { ScrollArea } from '../ui/scroll-area';

const moodOptions = [
  { emoji: '😔', label: 'Very Low', value: 0 },
  { emoji: '😐', label: 'Low', value: 1 },
  { emoji: '🙂', label: 'Neutral', value: 2 },
  { emoji: '😊', label: 'Good', value: 3 },
  { emoji: '😄', label: 'Very Good', value: 4 },
];

const moodLabels = ['😔', '😐', '🙂', '😊', '😄'];
const moodColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];


const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const moodValue = payload[0].value;
    return (
      <div className="p-2 bg-background border rounded-lg shadow-lg">
        <p className="label">{`Date: ${label}`}</p>
        <p className="intro">{`Mood: ${moodLabels[moodValue]}`}</p>
      </div>
    );
  }
  return null;
};

const MoodTrendChart = ({ data }: { data: { date: string; mood: number }[] }) => {
  const formattedData = data.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-us', { month: 'short', day: 'numeric' }),
    mood: entry.mood,
  }));
  
  if (data.length < 2) {
    return (
      <div className="h-40 flex items-center justify-center text-muted-foreground text-sm">
        Log your mood for a few more days to see a trend chart.
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis domain={[0, 4]} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => moodLabels[val]} />
          <RechartsTooltip content={<CustomTooltip />} />
          <Bar dataKey="mood" radius={[4, 4, 0, 0]}>
             {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={moodColors[entry.mood]} />
            ))}
          </Bar>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


const MoodLogger = () => {
    const { findOrCreateEntry, updateEntry, hasHydrated } = useJournal();
    const [todayEntry, setTodayEntry] = useState(findOrCreateEntry({ date: new Date().toISOString().split('T')[0], category: 'Freeform Exploration', frequency: 'daily' }));
    const [mood, setMood] = useState<MoodState>(null);
    const [note, setNote] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const { toast } = useToast();
    
     useEffect(() => {
        if (hasHydrated) {
            const todayStr = new Date().toISOString().split('T')[0];
            const entry = findOrCreateEntry({ date: todayStr, category: 'Freeform Exploration', frequency: 'daily' });
            setTodayEntry(entry);
            if (entry.mood !== null) {
                setMood(entry.mood);
            }
            if (entry.moodNote) {
                setNote(entry.moodNote);
            }
        }
    }, [hasHydrated, findOrCreateEntry]);

    const handleSave = () => {
        updateEntry(todayEntry.id, { mood, moodNote: note });
        toast({
            title: 'Mood Saved',
            description: 'Your mood for today has been logged.',
        });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    const handleMoodSelect = (value: number) => {
        if (mood === value) {
            setMood(null); // Deselect
        } else {
            setMood(value);
        }
    }

    if (!hasHydrated) {
        return <Skeleton className="h-[250px] w-full" />
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>How are you feeling today?</CardTitle>
                <CardDescription>Log your mood once per day to see trends over time.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <TooltipProvider>
                    <div className="flex justify-around items-center p-2 rounded-lg bg-muted/50 mt-1">
                        {moodOptions.map(option => (
                            <Tooltip key={option.value} delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => handleMoodSelect(option.value)}
                                        className={cn(
                                            "text-4xl transition-transform duration-200 ease-in-out hover:scale-125",
                                            mood === option.value ? "scale-125" : "scale-100 opacity-50"
                                        )}
                                    >
                                        {option.emoji}
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{option.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                </TooltipProvider>
                <Textarea
                    placeholder="Optional: What influenced your mood today?"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                />
                 <Button onClick={handleSave} className="w-full" disabled={mood === null}>
                    {isSaved ? <Check className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                    {isSaved ? 'Saved!' : 'Save Mood'}
                 </Button>
            </CardContent>
        </Card>
    );
};


export function MoodView() {
    const { entries, hasHydrated } = useJournal();

    const moodData = useMemo(() => {
        return entries
            .filter(entry => entry.mood !== null)
            .map(entry => ({ date: entry.date, mood: entry.mood!, note: entry.moodNote, id: entry.id }))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [entries]);

    const last7DaysData = useMemo(() => {
        const last7DaysMap = new Map<string, number>();
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const entriesForDay = entries.filter(e => e.date === dateStr && e.mood !== null);
            if (entriesForDay.length > 0) {
                last7DaysMap.set(dateStr, entriesForDay[entriesForDay.length - 1].mood!);
            }
        }
        return Array.from(last7DaysMap.entries()).map(([date, mood]) => ({ date, mood }));
    }, [entries]);

    if (!hasHydrated) {
        return <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-[400px] w-full" />
        </div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MoodLogger />
            <Card>
                <CardHeader>
                    <CardTitle>Mood History</CardTitle>
                    <CardDescription>Your 7-day mood trend and recent entries.</CardDescription>
                </CardHeader>
                <CardContent>
                    <MoodTrendChart data={last7DaysData} />
                    <ScrollArea className="h-64 mt-4 pr-3 -mr-3">
                        <div className="space-y-3">
                        {moodData.map(entry => (
                             <div key={entry.id} className="p-3 bg-muted/50 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-sm mb-1">{new Date(entry.date).toLocaleDateString('en-us', { weekday: 'long', month: 'long', day: 'numeric'})}</p>
                                        {entry.note && <p className="text-xs text-muted-foreground italic truncate">
                                            "{entry.note}"
                                        </p>}
                                    </div>
                                     <span className="text-2xl">{moodLabels[entry.mood!]}</span>
                                </div>
                            </div>
                        ))}
                        {moodData.length === 0 && (
                            <p className="text-center text-muted-foreground pt-10">No mood entries yet.</p>
                        )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
