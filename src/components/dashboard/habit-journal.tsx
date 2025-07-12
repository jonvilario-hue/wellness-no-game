
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookMarked, Save, Clipboard, Download, PlusCircle, Smile, Meh, Frown, Bed, Dumbbell, Brain, BookOpen, UserCheck, Target, Lightbulb, Calendar, CheckSquare } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { useJournal, type JournalEntry, type MoodState, type HabitId } from '@/hooks/use-journal';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { Checkbox } from '../ui/checkbox';

type JournalCategory = 'Daily Reflection' | 'Cognitive Training' | 'Goal Setting' | 'Freeform Note';

type HabitOption = {
  id: HabitId;
  label: string;
  icon: React.ElementType;
};

const allHabits: HabitOption[] = [
  { id: 'sleep', label: 'Good Sleep', icon: Bed },
  { id: 'exercise', label: 'Exercise', icon: Dumbbell },
  { id: 'meditation', label: 'Meditation', icon: Brain },
  { id: 'reading', label: 'Reading', icon: BookOpen },
  { id: 'planning', label: 'Planning', icon: Calendar },
  { id: 'review', label: 'Review', icon: CheckSquare },
];

const journalConfig: Record<JournalCategory, {
  prompt: string;
  suggestedTags: string;
  habits: HabitId[];
  moods: { mood: MoodState, label: string, icon: React.ElementType }[];
  icon: React.ElementType;
}> = {
  'Daily Reflection': {
    prompt: "How did today go? What was a high point or a low point? What emotions did you notice?",
    suggestedTags: "e.g. gratitude, challenge, learning",
    habits: ['sleep', 'exercise', 'meditation', 'reading'],
    moods: [
      { mood: 'happy', label: 'Happy', icon: Smile },
      { mood: 'neutral', label: 'Neutral', icon: Meh },
      { mood: 'sad', label: 'Sad', icon: Frown },
    ],
    icon: Lightbulb,
  },
  'Cognitive Training': {
    prompt: "What task did you train today? What specific strategy did you use? How did your focus feel?",
    suggestedTags: "e.g. Gwm, focus, strategy, fatigue",
    habits: ['sleep', 'meditation'],
    moods: [
        { mood: 'happy', label: 'Focused', icon: Brain },
        { mood: 'neutral', label: 'Distracted', icon: Meh },
        { mood: 'sad', label: 'Fatigued', icon: Frown },
    ],
    icon: Brain,
  },
  'Goal Setting': {
    prompt: "What is your primary goal for this week? What is one action you can take tomorrow to move toward it?",
    suggestedTags: "e.g. planning, priority, confidence",
    habits: ['planning', 'review'],
    moods: [
      { mood: 'happy', label: 'Motivated', icon: Target },
      { mood: 'neutral', label: 'Unsure', icon: Meh },
      { mood: 'sad', label: 'Overwhelmed', icon: Frown },
    ],
    icon: Target,
  },
  'Freeform Note': {
    prompt: "What's on your mind? Capture any thought, idea, or observation here.",
    suggestedTags: "e.g. idea, reminder, observation",
    habits: [],
    moods: [],
    icon: BookMarked,
  }
};
const categoryKeys = Object.keys(journalConfig) as JournalCategory[];


export function HabitJournal() {
    const { entries, addEntry, updateEntry } = useJournal();
    const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
    const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(null);
    
    const { toast } = useToast();
    const today = new Date().toISOString().split('T')[0];

    const createNewEntryObject = (isToday: boolean): JournalEntry => {
        const dateToUse = isToday ? today : new Date().toISOString().split('T')[0];
        const defaultCategory: JournalCategory = 'Daily Reflection';
        const config = journalConfig[defaultCategory];

        return {
            id: `new-${Date.now()}`,
            date: dateToUse,
            reflection: '',
            tags: '',
            effort: 7,
            mood: null,
            habits: {},
            category: defaultCategory,
            prompt: config.prompt,
        };
    };

    // Effect to select today's entry or create a new one on load
    useEffect(() => {
        const todayEntry = entries.find(e => e.date === today);
        if (todayEntry) {
            setSelectedEntryId(todayEntry.id);
        } else {
            const newEntry = createNewEntryObject(true);
            setCurrentEntry(newEntry);
            setSelectedEntryId(newEntry.id);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entries, today]);
    
    // Effect to update the editor when a new entry is selected
    useEffect(() => {
        if (selectedEntryId) {
            const entry = entries.find(e => e.id === selectedEntryId);
            if (entry) {
                 setCurrentEntry(entry);
            } else if (selectedEntryId.startsWith('new-') && !currentEntry) {
                // If a new entry was selected but currentEntry is null, create it
                const newEntry = createNewEntryObject(selectedEntryId.includes(today));
                setCurrentEntry(newEntry);
            } else if (selectedEntryId.startsWith('new-') && currentEntry?.id !== selectedEntryId) {
                const newEntry = createNewEntryObject(false);
                setCurrentEntry(newEntry);
            }
        } else {
            setCurrentEntry(null);
        }
    }, [selectedEntryId, entries, currentEntry, today]);

    const handleNewEntry = useCallback(() => {
        const newEntry = createNewEntryObject(false);
        setCurrentEntry(newEntry);
        setSelectedEntryId(newEntry.id);
    }, []);

    const handleFieldChange = (field: keyof Omit<JournalEntry, 'id' | 'date' | 'habits'>, value: any) => {
        if (!currentEntry) return;

        let updatedEntry = { ...currentEntry, [field]: value };
        
        if (field === 'category') {
            const category = value as JournalCategory;
            const newConfig = journalConfig[category];
            updatedEntry = { ...updatedEntry, prompt: newConfig.prompt, mood: null }; // Reset mood when category changes
        }
        
        setCurrentEntry(updatedEntry);
    };
    
    const handleHabitChange = (habitId: HabitId, checked: boolean) => {
        if (!currentEntry) return;
        const newHabits = { ...currentEntry.habits, [habitId]: checked ? 'done' : null };
        setCurrentEntry({ ...currentEntry, habits: newHabits });
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
        
        let moodString = '';
        if (entry.mood) {
            const moodConfig = journalConfig[entry.category as JournalCategory]?.moods.find(m => m.mood === entry.mood);
            moodString = moodConfig ? `**Mood:** ${moodConfig.label}\n` : '';
        }

        const completedHabits = Object.entries(entry.habits).filter(([, state]) => state === 'done').map(([habitId]) => {
            const habit = allHabits.find(h => h.id === habitId as HabitId);
            return habit ? habit.label : habitId;
        }).join(', ');
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

    const EntryEditor = ({ entry, setEntry }: { entry: JournalEntry | null; setEntry: (entry: JournalEntry) => void; }) => {
       if (!entry) return (
            <div className="p-6 flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <PlusCircle className="w-8 h-8 mb-2" />
                <p>Select an entry from the list or create a new one.</p>
            </div>
       );

       const isNewEntry = entry.id.startsWith('new-');
       const category = (entry.category as JournalCategory) || 'Daily Reflection';
       const config = journalConfig[category];

       const handleCategoryChange = (newCategory: JournalCategory) => {
            const newConfig = journalConfig[newCategory];
            setEntry({
                ...entry,
                category: newCategory,
                prompt: newConfig.prompt,
                mood: null, // Reset mood when category changes
            });
        };
        
       const handleLocalFieldChange = (field: keyof Omit<JournalEntry, 'id' | 'date' | 'habits'>, value: any) => {
            setEntry({ ...entry, [field]: value });
        };
    
        const handleLocalHabitChange = (habitId: HabitId, checked: boolean) => {
            const newHabits = { ...entry.habits, [habitId]: checked ? 'done' : null };
            setEntry({ ...entry, habits: newHabits });
        };

       return (
            <div className="p-4 h-full flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-primary">
                        {isNewEntry ? "New Entry" : `Editing: ${new Date(entry.date + 'T00:00:00').toLocaleDateString()}`}
                    </h3>
                </div>
                <Separator/>
                <div className='space-y-4 flex-grow overflow-y-auto pr-2'>

                    <div>
                        <Label className="mb-2 block">Category</Label>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                            {categoryKeys.map((catKey) => {
                                const CatIcon = journalConfig[catKey].icon;
                                return (
                                    <Button
                                        key={catKey}
                                        variant={category === catKey ? 'default' : 'outline'}
                                        onClick={() => handleCategoryChange(catKey)}
                                        className="flex items-center justify-center gap-2 h-auto py-2"
                                    >
                                        <CatIcon className="w-4 h-4" />
                                        <span className="text-xs">{catKey}</span>
                                    </Button>
                                )
                            })}
                        </div>
                    </div>


                    <p className="text-sm font-medium text-muted-foreground italic min-h-[40px] text-center flex items-center justify-center">{entry.prompt}</p>
                    <Textarea
                        placeholder="Reflect on your day, your training, or anything on your mind..."
                        value={entry.reflection}
                        onChange={(e) => handleLocalFieldChange('reflection', e.target.value)}
                        className="min-h-[120px]"
                    />
                    <div>
                        <Label htmlFor="tags-input">Tags (comma-separated)</Label>
                        <Input id="tags-input" placeholder={config.suggestedTags} value={entry.tags} onChange={(e) => handleLocalFieldChange('tags', e.target.value)} />
                    </div>
                    {config.moods.length > 0 && <div>
                        <Label>Mood</Label>
                        <div className="flex gap-2 mt-1">
                            {config.moods.map(({mood, label, icon: MoodIcon}) => (
                                <Button key={mood} variant={entry.mood === mood ? 'default' : 'outline'} size="sm" onClick={() => handleLocalFieldChange('mood', entry.mood === mood ? null : mood)} className="flex-1">
                                    <MoodIcon className="mr-2 h-4 w-4" /> {label}
                                </Button>
                            ))}
                        </div>
                    </div>}
                    {config.habits.length > 0 && <div>
                        <Label>Supporting Habits</Label>
                        <div className='grid grid-cols-2 gap-2 mt-1'>
                            {allHabits.filter(h => config.habits.includes(h.id)).map(habit => (
                                <div key={habit.id} className="flex items-center space-x-2 p-2 bg-muted/50 rounded-md">
                                    <Checkbox id={habit.id} checked={!!entry.habits[habit.id]} onCheckedChange={(checked) => handleLocalHabitChange(habit.id, !!checked)} />
                                    <Label htmlFor={habit.id} className='flex items-center gap-2 text-sm font-normal cursor-pointer'>
                                        <habit.icon className="w-4 h-4 text-muted-foreground"/> {habit.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>}
                    <div>
                        <Label htmlFor="effort-slider" className="flex justify-between">
                            <span>Effort / Focus</span>
                            <span>{entry.effort}/10</span>
                        </Label>
                        <Slider id="effort-slider" min={1} max={10} step={1} value={[entry.effort]} onValueChange={(value) => handleLocalFieldChange('effort', value[0])}/>
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
                                    <p className="font-semibold">{new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - <span className="text-sm font-normal text-muted-foreground">{entry.category}</span></p>
                                    <p className="text-sm text-muted-foreground truncate">{entry.reflection || 'No reflection yet.'}</p>
                                </button>
                            ))}
                            </div>
                        </ScrollArea>
                    </div>

                    {/* Column 2: Editor */}
                    <div className="lg:col-span-2 bg-background rounded-lg border">
                         <EntryEditor entry={currentEntry} setEntry={setCurrentEntry} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
