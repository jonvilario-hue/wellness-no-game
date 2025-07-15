
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
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/hooks/use-theme';
import { GrowthDecoration } from '../ui/growth-decoration';

const moodOptions = [
  { emoji: '😔', label: 'Very Low', value: 0 },
  { emoji: '😐', label: 'Neutral', value: 1 },
  { emoji: '🙂', label: 'Okay', value: 2 },
  { emoji: '😊', label: 'Good', value: 3 },
  { emoji: '😄', label: 'Very Good', value: 4 },
];

const moodLabels = ['😔', '😐', '🙂', '😊', '😄'];

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
        Log mood for a few more days to see a trend.
      </div>
    );
  }

  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis domain={[0, 4]} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => moodLabels[val]} />
          <RechartsTooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="mood" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


export function MoodTrackerCard() {
    const { entries, findOrCreateEntry, updateEntry, hasHydrated } = useJournal();
    const [todayEntry, setTodayEntry] = useState(findOrCreateEntry({ date: new Date().toISOString().split('T')[0], category: 'Freeform Exploration', frequency: 'daily' }));
    const [mood, setMood] = useState<MoodState>(null);
    const [note, setNote] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const { toast } = useToast();
    const { organicGrowth } = useTheme();

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
    }, [hasHydrated, entries, findOrCreateEntry]);

    const handleSave = () => {
        updateEntry(todayEntry.id, { mood, moodNote: note });
        toast({
            title: 'Mood Saved',
            description: 'Your mood for today has been logged.',
        });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    const moodDataForChart = useMemo(() => {
        const last7Days = new Map<string, number>();
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const entriesForDay = entries.filter(e => e.date === dateStr && e.mood !== null);
            if (entriesForDay.length > 0) {
                // Use the mood from the last entry of the day if multiple exist
                last7Days.set(dateStr, entriesForDay[entriesForDay.length - 1].mood!);
            }
        }
        return Array.from(last7Days.entries()).map(([date, mood]) => ({ date, mood }));
    }, [entries]);

    if (!hasHydrated) {
        return <Card className="h-[400px] animate-pulse bg-muted" />;
    }

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col relative overflow-hidden">
            {organicGrowth && <GrowthDecoration />}
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Smile className="w-5 h-5 text-primary" />
                    Mood Tracker
                </CardTitle>
                <CardDescription>Log your mood once per day to see trends over time.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <TooltipProvider>
                    <div className="flex justify-around items-center p-2 rounded-lg bg-muted/50 mt-1">
                        {moodOptions.map(option => (
                            <Tooltip key={option.value} delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => setMood(mood === option.value ? null : option.value)}
                                        className={cn(
                                            "text-3xl transition-transform duration-200 ease-in-out hover:scale-125",
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
             <CardFooter className="flex flex-col">
                 <h4 className="text-sm font-semibold text-muted-foreground w-full text-left mb-2">7-Day Mood Trend</h4>
                <MoodTrendChart data={moodDataForChart} />
             </CardFooter>
        </Card>
    );
}
