
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookMarked, Save, Clipboard, Download, PlusCircle, Smile, Meh, Frown, Bed, Dumbbell, Brain, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { useJournal, type JournalEntry, type MoodState, type HabitState } from '@/hooks/use-journal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { Checkbox } from '../ui/checkbox';

const journalPrompts = [
    "What cognitive strategy felt strongest today?",
    "Did you notice a real-world moment where your training helped?",
    "What was the biggest distraction during your sessions?",
    "How did your energy level affect your focus?",
    "What's one thing you learned or realized today?",
    "Describe a problem you solved. What was your approach?",
];

const habitOptions = [
    { id: 'sleep', label: 'Good Sleep', icon: Bed },
    { id: 'exercise', label: 'Exercise', icon: Dumbbell },
    { id: 'meditation', label: 'Meditation', icon: Brain },
    { id: 'reading', label: 'Reading', icon: BookOpen },
] as const;
type HabitId = typeof habitOptions[number]['id'];

export function HabitJournal() {
    const { entries, addEntry, updateEntry } = useJournal();
    const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
    const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(null);
    
    const { toast } = useToast();
    const today = new Date().toISOString().split('T')[0];

    // Effect to select today's entry or create a new one on load
    useEffect(() => {
        const todayEntry = entries.find(e => e.date === today);
        if (todayEntry) {
            setSelectedEntryId(todayEntry.id);
        } else {
            handleNewEntry();
        }
    }, [entries, today]);
    
    // Effect to update the editor when a new entry is selected
    useEffect(() => {
        if (selectedEntryId) {
            const entry = entries.find(e => e.id === selectedEntryId);
            setCurrentEntry(entry || null);
        } else {
            // This case handles when 'new entry' is clicked
            handleNewEntry();
        }
    }, [selectedEntryId, entries]);

    const handleNewEntry = () => {
        setSelectedEntryId(null); // Deselect any existing entry
        const newPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
        setCurrentEntry({
            id: `new-${Date.now()}`,
            date: today,
            reflection: '',
            tags: '',
            effort: 7,
            prompt: newPrompt,
            mood: null,
            affirmation: '',
            habits: { sleep: null, exercise: null, meditation: null, reading: null },
            category: 'Daily Reflection'
        });
    };

    const handleFieldChange = (field: keyof JournalEntry, value: any) => {
        setCurrentEntry(prev => prev ? { ...prev, [field]: value } : null);
    };

    const handleHabitChange = (habitId: HabitId, checked: boolean) => {
        setCurrentEntry(prev => {
            if (!prev) return null;
            const newHabits = { ...prev.habits, [habitId]: checked ? 'done' : null };
            return { ...prev, habits: newHabits };
        });
    };

    const handleSave = () => {
        if (!currentEntry || !currentEntry.reflection.trim()) {
            toast({ title: 'Empty Journal', description: 'Please write something before saving.', variant: 'destructive' });
            return;
        }

        const isNew = currentEntry.id.startsWith('new-');
        if (isNew) {
            const finalEntry = { ...currentEntry, id: `${currentEntry.date}-${Date.now()}` };
            addEntry(finalEntry);
            setSelectedEntryId(finalEntry.id);
            toast({ title: 'Journal Entry Saved', description: 'Your thoughts have been logged.' });
        } else {
            updateEntry(currentEntry.id, currentEntry);
            toast({ title: 'Journal Entry Updated', description: 'Your changes have been saved.' });
        }
    };

    const formatMarkdown = (entry: JournalEntry) => {
        const entryDate = new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const tagString = entry.tags.split(',').map(t => t.trim() ? `#${t.trim()}` : '').join(' ');
        let moodString = entry.mood ? `**Mood:** ${entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}\n` : '';
        const completedHabits = Object.entries(entry.habits).filter(([, state]) => state === 'done').map(([habit]) => habit).join(', ');
        let habitString = completedHabits ? `**Habits:** ${completedHabits}\n\n` : '';

        return `## ${entryDate} - ${entry.category}\n\n` +
               moodString + habitString +
               `**Prompt:** ${entry.prompt}\n\n` +
               `**Reflection:**\n${entry.reflection}\n\n` +
               `**Effort/Focus:** ${entry.effort}/10\n` +
               `**Tags:** ${tagString}`;
    };

    const handleCopyToClipboard = () => {
        if (!currentEntry || !currentEntry.reflection.trim()) {
            toast({ title: 'Nothing to copy', description: 'Please select an entry and write a reflection first.', variant: 'destructive' });
            return;
        }
        navigator.clipboard.writeText(formatMarkdown(currentEntry));
        toast({ title: 'Copied to Clipboard!', description: 'Your journal entry is ready to paste.' });
    };

    const handleExport = () => {
        if (!currentEntry || !currentEntry.reflection.trim()) {
            toast({ title: 'Nothing to export', description: 'Please select an entry and write a reflection first.', variant: 'destructive' });
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

    const EntryEditor = ({ entry }: { entry: JournalEntry | null }) => {
       if (!entry) return (
            <div className="p-6 flex items-center justify-center h-full text-center text-muted-foreground">
                <PlusCircle className="w-8 h-8 mb-2" />
                <p>Select an entry from the list or create a new one.</p>
            </div>
       );

       const isNewEntry = entry.id.startsWith('new-');

       return (
            <div className="p-4 h-full flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-primary">
                        {isNewEntry ? "Today's Entry" : `Editing: ${new Date(entry.date + 'T00:00:00').toLocaleDateString()}`}
                    </h3>
                </div>
                <Separator/>
                <div className='space-y-4 flex-grow overflow-y-auto pr-2'>
                    <Select value={entry.category} onValueChange={(value) => handleFieldChange('category', value)}>
                        <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Daily Reflection">Daily Reflection</SelectItem>
                            <SelectItem value="Cognitive Training">Cognitive Training</SelectItem>
                            <SelectItem value="Goal Setting">Goal Setting</SelectItem>
                            <SelectItem value="Freeform Note">Freeform Note</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-sm font-medium text-muted-foreground italic min-h-[20px]">{entry.prompt}</p>
                    <Textarea
                        placeholder="Reflect on your day, your training, or anything on your mind..."
                        value={entry.reflection}
                        onChange={(e) => handleFieldChange('reflection', e.target.value)}
                        className="min-h-[120px]"
                    />
                    <div>
                        <Label htmlFor="tags-input">Tags (comma-separated)</Label>
                        <Input id="tags-input" placeholder="e.g. Gwm, strategy, focus" value={entry.tags} onChange={(e) => handleFieldChange('tags', e.target.value)} />
                    </div>
                     <div>
                        <Label>Mood</Label>
                        <div className="flex gap-2 mt-1">
                            {(['happy', 'neutral', 'sad'] as MoodState[]).map(mood => (
                                <Button key={mood} variant={entry.mood === mood ? 'default' : 'outline'} size="icon" onClick={() => handleFieldChange('mood', mood)}>
                                    {mood === 'happy' && <Smile />}
                                    {mood === 'neutral' && <Meh />}
                                    {mood === 'sad' && <Frown />}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Label>Supporting Habits</Label>
                        <div className='grid grid-cols-2 gap-2 mt-1'>
                            {habitOptions.map(habit => (
                                <div key={habit.id} className="flex items-center space-x-2 p-2 bg-muted/50 rounded-md">
                                    <Checkbox id={habit.id} checked={entry.habits[habit.id] === 'done'} onCheckedChange={(checked) => handleHabitChange(habit.id, !!checked)} />
                                    <Label htmlFor={habit.id} className='flex items-center gap-2 text-sm font-normal'>
                                        <habit.icon className="w-4 h-4 text-muted-foreground"/> {habit.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="effort-slider" className="flex justify-between">
                            <span>Effort / Focus</span>
                            <span>{entry.effort}/10</span>
                        </Label>
                        <Slider id="effort-slider" min={1} max={10} step={1} value={[entry.effort]} onValueChange={(value) => handleFieldChange('effort', value[0])}/>
                    </div>
                </div>

                <Separator/>
                
                <div className="flex-grow-0 pt-2 space-y-2">
                    <Button onClick={handleSave} className="w-full">
                        <Save className="mr-2 h-4 w-4" /> {isNewEntry ? 'Save Entry' : 'Update Entry'}
                    </Button>
                     <div className="grid grid-cols-2 gap-2">
                        <Button onClick={handleCopyToClipboard} variant="outline"><Clipboard className="mr-2 h-4 w-4" /> Copy</Button>
                        <Button onClick={handleExport} variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
                    </div>
                </div>
            </div>
       )
    };
    
    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 col-span-1 md:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <BookMarked className="w-5 h-5 text-primary" />
                    My Journal
                </CardTitle>
                <CardDescription>
                    Track reflections, habits, and cognitive strategies. Select an entry to edit or create a new one.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[500px]">
                    {/* Column 1: Entry List */}
                    <div className="lg:col-span-1 bg-muted/30 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">Entries</h3>
                            <Button variant="ghost" size="sm" onClick={handleNewEntry}>
                                <PlusCircle className="mr-2 h-4 w-4"/> New
                            </Button>
                        </div>
                        <Separator />
                        <ScrollArea className="h-[420px] pr-3">
                            <div className="space-y-2 mt-2">
                            {entries.map(entry => (
                                <button key={entry.id} onClick={() => setSelectedEntryId(entry.id)}
                                    className={cn(
                                        "w-full text-left p-2 rounded-md transition-colors",
                                        selectedEntryId === entry.id ? 'bg-primary/10 text-primary-foreground' : 'hover:bg-muted'
                                    )}>
                                    <p className="font-semibold">{new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                    <p className="text-sm text-muted-foreground truncate">{entry.reflection || 'No reflection yet.'}</p>
                                </button>
                            ))}
                            </div>
                        </ScrollArea>
                    </div>

                    {/* Column 2: Editor */}
                    <div className="lg:col-span-2 bg-background rounded-lg border">
                         <EntryEditor entry={currentEntry} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
