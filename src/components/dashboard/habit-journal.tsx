
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookMarked, Save, Smile, Meh, Frown, Check, Clipboard, Download, Heart, ChevronLeft, ChevronRight, Wand2, PlusCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { useJournal, type JournalEntry } from '@/hooks/use-journal';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '../ui/carousel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';

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
    const { entries, addEntry, updateEntry } = useJournal();
    const [api, setApi] = useState<CarouselApi>();
    const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(null);
    const [isNewEntry, setIsNewEntry] = useState(false);
    
    const { toast } = useToast();
    
    useEffect(() => {
        if (!api) return;

        const today = new Date().toISOString().split('T')[0];
        const todayEntryIndex = entries.findIndex(e => e.date === today);

        if (todayEntryIndex !== -1) {
            api.scrollTo(todayEntryIndex);
            setCurrentEntry(entries[todayEntryIndex]);
            setIsNewEntry(false);
        } else {
            const newPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
            const newEntry: JournalEntry = {
                id: today,
                date: today,
                reflection: '',
                tags: '',
                effort: 7,
                prompt: newPrompt,
                mood: null,
                affirmation: '',
                habits: { sleep: null, exercise: null, meditation: null, reading: null },
                category: 'Daily Reflection'
            };
            setCurrentEntry(newEntry);
            setIsNewEntry(true);
            // If there are other entries, scroll to the end for the new one
            if (entries.length > 0) {
                 api.scrollTo(entries.length);
            }
        }

        api.on("select", () => {
             const selectedIndex = api.selectedScrollSnap();
             if (selectedIndex < entries.length) {
                setCurrentEntry(entries[selectedIndex]);
                setIsNewEntry(false);
             } else {
                // We are on the "new entry" slide
                 const todayEntry = entries.find(e => e.date === today);
                 if (!todayEntry) {
                     const newPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
                     setCurrentEntry({
                        id: today, date: today, reflection: '', tags: '', effort: 7,
                        prompt: newPrompt, mood: null, affirmation: '',
                        habits: { sleep: null, exercise: null, meditation: null, reading: null },
                        category: 'Daily Reflection'
                    });
                 }
                 setIsNewEntry(true);
             }
        });

    }, [api, entries]);

    const handleFieldChange = (field: keyof JournalEntry, value: any) => {
        if (!currentEntry) return;
        setCurrentEntry(prev => prev ? { ...prev, [field]: value } : null);
    };

    const handleHabitClick = (habitKey: string, state: HabitState) => {
        if (!currentEntry) return;
        const newHabits = { ...currentEntry.habits, [habitKey]: currentEntry.habits[habitKey] === state ? null : state };
        handleFieldChange('habits', newHabits);
    };

    const handleSave = () => {
        if (!currentEntry || !currentEntry.reflection.trim()) {
            toast({ title: 'Empty Journal', description: 'Please write something before saving.', variant: 'destructive' });
            return;
        }

        if (isNewEntry) {
            addEntry(currentEntry);
        } else {
            updateEntry(currentEntry.id, currentEntry);
        }
        
        toast({ title: 'Journal Entry Saved', description: 'Your thoughts have been logged.' });
    };

    const formatMarkdown = (entry: JournalEntry) => {
        const entryDate = new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const tagString = entry.tags.split(',').map(t => t.trim() ? `#${t.trim()}` : '').join(' ');
        let moodString = entry.mood ? `**Mood:** ${entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}\n\n` : '';
        let affirmationString = entry.affirmation.trim() ? `**Affirmation:** "${entry.affirmation.trim()}"\n\n` : '';
    
        return `## ${entryDate} - ${entry.category}\n\n` +
               moodString +
               affirmationString +
               `**Prompt:** ${entry.prompt}\n\n` +
               `**Reflection:**\n${entry.reflection}\n\n` +
               `**Effort/Focus:** ${entry.effort}/10\n` +
               `**Tags:** ${tagString}`;
    };

    const handleCopyToClipboard = () => {
        if (!currentEntry || !currentEntry.reflection.trim()) {
            toast({ title: 'Nothing to copy', description: 'Please write a reflection first.', variant: 'destructive' });
            return;
        }
        navigator.clipboard.writeText(formatMarkdown(currentEntry));
        toast({ title: 'Copied to Clipboard!', description: 'Your journal entry is ready to paste.' });
    };

    const handleExport = () => {
        if (!currentEntry || !currentEntry.reflection.trim()) {
            toast({ title: 'Nothing to export', description: 'Please write a reflection first.', variant: 'destructive' });
            return;
        }
        const blob = new Blob([formatMarkdown(currentEntry)], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `cognitive-journal-${currentEntry.date}.md`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast({ title: 'Export Successful', description: 'Your journal entry has been downloaded.' });
    };

    const EntryPage = ({ entry }: { entry: JournalEntry }) => (
        <div className="p-6 h-full flex flex-col">
            <h3 className="font-bold text-lg">{new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
            <p className="text-sm text-muted-foreground mb-2">{entry.category}</p>
            <Separator className="mb-4"/>
            <div className="prose prose-sm dark:prose-invert overflow-y-auto flex-grow">
                <p className="italic text-muted-foreground">{entry.prompt}</p>
                <p>{entry.reflection}</p>
                {entry.affirmation && <p><strong>Affirmation:</strong> {entry.affirmation}</p>}
                <p><strong>Effort:</strong> {entry.effort}/10</p>
                {entry.tags && <p><strong>Tags:</strong> {entry.tags}</p>}
            </div>
        </div>
    );
    
    const EditorPage = ({ entry }: { entry: JournalEntry | null }) => {
       if (!entry) return <div className="p-6">Loading...</div>;

       return (
            <div className="p-6 h-full flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">
                        {isNewEntry ? "Today's Entry" : `Editing: ${new Date(entry.date).toLocaleDateString()}`}
                    </h3>
                    <Select value={entry.category} onValueChange={(value) => handleFieldChange('category', value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Daily Reflection">Daily Reflection</SelectItem>
                            <SelectItem value="Cognitive Training">Cognitive Training</SelectItem>
                            <SelectItem value="Goal Setting">Goal Setting</SelectItem>
                            <SelectItem value="Freeform Note">Freeform Note</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <p className="text-sm font-medium text-muted-foreground italic min-h-[20px]">
                    {entry.prompt}
                </p>
                <Textarea
                    placeholder="Reflect on your day, your training, or anything on your mind..."
                    value={entry.reflection}
                    onChange={(e) => handleFieldChange('reflection', e.target.value)}
                    className="min-h-[120px] flex-grow"
                />
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="tags-input">Tags (comma-separated)</Label>
                        <Input
                            id="tags-input"
                            placeholder="e.g. Gwm, strategy, focus"
                            value={entry.tags}
                            onChange={(e) => handleFieldChange('tags', e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="effort-slider" className="flex justify-between">
                            <span>Effort / Focus</span>
                            <span>{entry.effort}/10</span>
                        </Label>
                        <Slider
                            id="effort-slider"
                            min={1} max={10} step={1}
                            value={[entry.effort]}
                            onValueChange={(value) => handleFieldChange('effort', value[0])}
                        />
                    </div>
                </div>
                <div className="flex-grow-0 pt-2">
                    <Button onClick={handleSave} className="w-full">
                        <Save className="mr-2 h-4 w-4" /> {isNewEntry ? 'Save Entry' : 'Update Entry'}
                    </Button>
                     <div className="grid grid-cols-2 gap-2 mt-2">
                        <Button onClick={handleCopyToClipboard} variant="outline">
                            <Clipboard className="mr-2 h-4 w-4" /> Copy
                        </Button>
                        <Button onClick={handleExport} variant="outline">
                            <Download className="mr-2 h-4 w-4" /> Export
                        </Button>
                    </div>
                </div>
            </div>
       )
    };
    
    // Add a slide for "New Entry" only if today's entry doesn't exist
    const todayEntryExists = entries.some(e => e.date === new Date().toISOString().split('T')[0]);

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 col-span-1 md:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <BookMarked className="w-5 h-5 text-primary" />
                    My Journal
                </CardTitle>
                <CardDescription>
                    Track reflections, habits, and cognitive strategies. Use arrows to navigate entries.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Carousel setApi={setApi} className="w-full">
                    <CarouselContent>
                        {entries.map((entry) => (
                            <CarouselItem key={entry.id}>
                                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                    <div className="bg-muted/30 rounded-l-lg border-r border-border">
                                        <EntryPage entry={entry} />
                                    </div>
                                    <div className="bg-card rounded-r-lg">
                                        <EditorPage entry={entry} />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                         {!todayEntryExists && (
                            <CarouselItem>
                                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                    <div className="bg-muted/30 rounded-l-lg border-r border-border p-6 flex flex-col items-center justify-center text-center">
                                       <PlusCircle className="w-16 h-16 text-muted-foreground/50 mb-4"/>
                                       <h3 className="font-bold text-lg">New Page</h3>
                                       <p className="text-sm text-muted-foreground">Fill out the page on the right to create today's entry.</p>
                                    </div>
                                    <div className="bg-card rounded-r-lg">
                                        <EditorPage entry={currentEntry} />
                                    </div>
                                </div>
                            </CarouselItem>
                        )}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2" />
                    <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2" />
                </Carousel>
            </CardContent>
        </Card>
    );
}

