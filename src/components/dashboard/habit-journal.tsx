
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  BookMarked,
  Save,
  PlusCircle,
  Trash2,
  ArchiveRestore,
  Loader2,
  CheckCircle,
  Share,
  MinusCircle,
} from 'lucide-react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { useJournal, type JournalEntry, type ReflectionFrequency } from '@/hooks/use-journal';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { journalConfig, type JournalCategory, type HabitId, allHabits } from '@/lib/journal-config';

const categoryKeys = Object.keys(journalConfig) as JournalCategory[];
type ViewMode = 'entries' | 'trash';

export function HabitJournal() {
  const { entries, trashedEntries, addEntry, updateEntry, deleteEntry, restoreEntry, emptyTrash } = useJournal();
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('entries');
  const { toast } = useToast();
  
  const getDefaultFrequency = useCallback((): ReflectionFrequency => {
    const today = new Date();
    const dayOfMonth = today.getDate();
    const dayOfWeek = today.getDay(); // 0 = Sunday

    if (dayOfMonth === 1) {
      return 'monthly';
    }
    if (dayOfWeek === 0) {
      return 'weekly';
    }
    return 'daily';
  }, []);

  const createNewEntryObject = useCallback((): JournalEntry => {
    const defaultCategory: JournalCategory = 'Growth & Challenge Reflection';
    return {
      id: `new-${Date.now()}`,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .split('T')[0],
      category: defaultCategory,
      frequency: getDefaultFrequency(),
      field1: '',
      field2: '',
      field3: '',
      affirmations: [],
      tags: '',
      effort: 7,
      mood: null,
      habits: {},
    };
  }, [getDefaultFrequency]);

  const handleSelectEntry = (entry: JournalEntry) => {
    setViewMode('entries');
    setSelectedEntry(entry);
  }

  const handleNewEntry = useCallback(() => {
    setViewMode('entries');
    setSelectedEntry(createNewEntryObject());
  }, [createNewEntryObject]);

  // Set initial entry on load
  useEffect(() => {
    if (!selectedEntry && entries.length > 0) {
      setSelectedEntry(entries[0]);
    } else if (!selectedEntry && entries.length === 0) {
      handleNewEntry();
    }
  }, [entries, selectedEntry, handleNewEntry]);

  const handleSave = useCallback((entryToSave: JournalEntry) => {
    if (!entryToSave.field1.trim() && !entryToSave.field2.trim() && !entryToSave.field3.trim()) {
      if (entryToSave.id.startsWith('new-')) {
          toast({
            title: 'Empty Journal',
            description: 'Please write something before saving.',
            variant: 'destructive',
          });
      }
      return false;
    }
    const isNew = entryToSave.id.startsWith('new-');
    if (isNew) {
      const finalEntry = { ...entryToSave, id: `${entryToSave.date}-${Date.now()}` };
      addEntry(finalEntry);
      setSelectedEntry(finalEntry);
    } else {
      updateEntry(entryToSave.id, entryToSave);
    }
    return true;
  }, [addEntry, updateEntry, toast]);

  const handleDelete = (id: string) => {
    const entryToDeleteIndex = entries.findIndex(e => e.id === id);
    if (entryToDeleteIndex === -1) return;

    deleteEntry(id);
    toast({
      title: 'Entry Moved to Trash',
      description: 'You can restore it from the trash.',
      action: (
        <Button
          onClick={() => handleRestore(id)}
          variant="outline"
          size="sm"
        >
          Undo
        </Button>
      ),
    });
    
    // After deleting, select the next available entry or create a new one
    if (selectedEntry?.id === id) {
       const remainingEntries = entries.filter(e => e.id !== id);
       if (remainingEntries.length > 0) {
            // Try to select the next item, or the previous one if it was the last
            const newIndex = Math.min(entryToDeleteIndex, remainingEntries.length - 1);
            setSelectedEntry(remainingEntries[newIndex]);
        } else {
            handleNewEntry();
        }
    }
  };

  const handleRestore = (id: string) => {
    restoreEntry(id);
    toast({ title: 'Entry Restored' });
  };
  
  const EntryEditor = ({
    entry,
    onSave,
  }: {
    entry: JournalEntry;
    onSave: (entry: JournalEntry) => boolean;
  }) => {
    const [editorState, setEditorState] = useState<JournalEntry>(entry);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    useEffect(() => {
      setEditorState(entry);
      setSaveStatus('idle');
    }, [entry]);

    useEffect(() => {
        const isNew = editorState.id.startsWith('new-');
        if (isNew || JSON.stringify(entry) === JSON.stringify(editorState)) {
          return;
        }

        setSaveStatus('saving');
        const handler = setTimeout(() => {
          onSave(editorState);
          setSaveStatus('saved');
        }, 1500); // Debounce time for auto-save

        return () => {
            clearTimeout(handler);
        };
    }, [editorState, entry, onSave]);

    useEffect(() => {
        if (saveStatus === 'saved') {
            const timer = setTimeout(() => setSaveStatus('idle'), 2000);
            return () => clearTimeout(timer);
        }
    }, [saveStatus]);
    
    const getValidConfig = (category: JournalCategory | string) => {
        if (category && journalConfig[category as JournalCategory]) {
            return { config: journalConfig[category as JournalCategory], category: category as JournalCategory};
        }
        const defaultCategory = 'Growth & Challenge Reflection';
        return { config: journalConfig[defaultCategory], category: defaultCategory };
    }
    
    const { config, category } = getValidConfig(editorState.category);

    const isNewEntry = editorState.id.startsWith('new-');
    
    const handleManualSave = () => {
        if(onSave(editorState)) {
           setSaveStatus('saved');
           toast({ title: 'Journal Entry Saved' });
        }
    }

    const handleCategoryChange = (newCategory: JournalCategory) => {
      setEditorState(prevState => ({
        ...prevState,
        category: newCategory,
      }));
    };
    
    const handleFrequencyChange = (newFrequency: ReflectionFrequency) => {
        setEditorState(prevState => ({ ...prevState, frequency: newFrequency }));
    };

    const handleFieldChange = (
      field: keyof Omit<JournalEntry, 'id' | 'date'>,
      value: any
    ) => {
      setEditorState(prevState => ({ ...prevState, [field]: value }));
    };

    const handleHabitChange = (habitId: HabitId, checked: boolean) => {
      setEditorState(prevState => ({
        ...prevState,
        habits: { ...prevState.habits, [habitId]: checked ? 'done' : null },
      }));
    };

    const handleAffirmationChange = (index: number, value: string) => {
        const newAffirmations = [...editorState.affirmations];
        newAffirmations[index] = value;
        setEditorState(prevState => ({...prevState, affirmations: newAffirmations}));
    }

    const addAffirmation = () => {
        setEditorState(prevState => ({...prevState, affirmations: [...prevState.affirmations, '']}));
    }
    
    const removeLastAffirmation = () => {
        setEditorState(prevState => ({...prevState, affirmations: prevState.affirmations.slice(0, -1)}));
    }


    const exportAsMarkdown = (entry: JournalEntry) => {
        const entryConfig = journalConfig[entry.category];
        const prompts = entryConfig.prompts[entry.frequency] || entryConfig.prompts.daily;

        let markdown = `---
date: ${entry.date}
category: "${entry.category}"
frequency: ${entry.frequency}
effort: ${entry.effort}
tags: ${entry.tags}
---

# Journal Entry: ${new Date(entry.date + 'T00:00:00').toLocaleDateString()}

## ${entry.category} (${entry.frequency})

`;

        if (entry.field1) markdown += `### ${prompts[0]}\n${entry.field1}\n\n`;
        if (entry.field2) markdown += `### ${prompts[1]}\n${entry.field2}\n\n`;
        if (entry.field3) markdown += `### ${prompts[2]}\n${entry.field3}\n\n`;

        if (entry.affirmations && entry.affirmations.length > 0) {
            markdown += `### Affirmations\n${entry.affirmations.map(a => `> ${a}`).join('\n')}\n\n`;
        }
        
        const completedHabits = Object.keys(entry.habits)
            .filter(key => entry.habits[key as HabitId] === 'done')
            .map(key => allHabits[key as HabitId]?.label);

        if (completedHabits.length > 0) {
            markdown += `### Supporting Habits\n${completedHabits.map(h => `- [x] ${h}`).join('\n')}\n\n`;
        }

        const element = document.createElement("a");
        const file = new Blob([markdown], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = `journal-${entry.date}.md`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        document.body.removeChild(element);
    }
    
    const currentPrompts = config.prompts[editorState.frequency] || config.prompts.daily;


    return (
      <div className="p-4 h-full flex flex-col gap-2 relative">
          <div className="absolute top-0 left-0 right-0 p-2 z-10 text-center">
              {saveStatus !== 'idle' && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-sm font-semibold transition-all animate-in fade-in">
                    {saveStatus === 'saving' ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin"/>
                            <span>Saving...</span>
                        </>
                    ) : (
                        <>
                             <CheckCircle className="w-4 h-4 text-green-500"/>
                            <span>Saved</span>
                        </>
                    )}
                </div>
              )}
          </div>
        <div className="flex justify-between items-center pt-8">
          <h3 className="font-bold text-lg text-primary">
            {isNewEntry
              ? 'New Entry'
              : `Editing: ${new Date(
                  editorState.date + 'T00:00:00'
                ).toLocaleDateString()}`}
          </h3>
           <div className="flex items-center gap-2">
            {!isNewEntry && (
                <>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary" onClick={() => exportAsMarkdown(editorState)}>
                    <Share className="w-4 h-4"/>
                </Button>
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                            <Trash2 className="w-4 h-4"/>
                        </Button>
                    </AlertDialogTrigger>
                     <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Move to Trash?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will move the entry to the trash. You can restore it later.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(editorState.id)}>
                                Move to Trash
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                </>
            )}
            {isNewEntry && (
                <Button onClick={handleManualSave}>
                    <Save className="mr-2 h-4 w-4" /> Save Entry
                </Button>
            )}
           </div>
        </div>
        <Separator />
        <ScrollArea className="flex-grow pr-2 -mr-2">
          <div className="space-y-4 pr-2">
            <div>
              <Label className="mb-2 block">Journal Type</Label>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {categoryKeys.map(catKey => {
                  const CatIcon = journalConfig[catKey].icon;
                  return (
                    <Button
                      key={catKey}
                      variant={category === catKey ? 'default' : 'outline'}
                      onClick={() => handleCategoryChange(catKey)}
                      className="flex items-center justify-start gap-2 h-auto py-2"
                    >
                      <CatIcon className="w-4 h-4 shrink-0" />
                      <span className="text-xs text-left whitespace-normal leading-tight">
                        {journalConfig[catKey].title}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
            
             <div>
              <Label className="mb-2 block">Reflection Frequency</Label>
                <div className="flex items-center gap-2">
                    {(['daily', 'weekly', 'monthly'] as ReflectionFrequency[]).map(freq => (
                        <Button key={freq} variant={editorState.frequency === freq ? 'default' : 'outline'} onClick={() => handleFrequencyChange(freq)} className="capitalize flex-1">
                            {freq}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
              {config.guidance}
            </div>

            <Textarea
              placeholder={currentPrompts[0]}
              value={editorState.field1}
              onChange={e => handleFieldChange('field1', e.target.value)}
              className="min-h-[60px]"
            />
             <Textarea
              placeholder={currentPrompts[1]}
              value={editorState.field2}
              onChange={e => handleFieldChange('field2', e.target.value)}
              className="min-h-[60px]"
            />
             <Textarea
              placeholder={currentPrompts[2]}
              value={editorState.field3}
              onChange={e => handleFieldChange('field3', e.target.value)}
              className="min-h-[60px]"
            />
            
            <div className="space-y-2">
                 {editorState.affirmations.map((affirmation, index) => (
                    <div key={index} className="flex items-center gap-2">
                         <Textarea
                          placeholder={config.affirmationPrompt}
                          value={affirmation}
                          onChange={e => handleAffirmationChange(index, e.target.value)}
                          className="min-h-[60px] flex-grow"
                        />
                    </div>
                 ))}
                 <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={addAffirmation}>
                        <PlusCircle className="mr-2 h-4 w-4"/>
                        Add Affirmation
                    </Button>
                    {editorState.affirmations.length > 0 && (
                        <Button variant="ghost" size="sm" onClick={removeLastAffirmation}>
                            <MinusCircle className="mr-2 h-4 w-4"/>
                            Remove
                        </Button>
                    )}
                 </div>
            </div>
            
            <Separator/>
            
            <div>
                <Label htmlFor="tags-input">Tags (comma-separated)</Label>
                <Input
                  id="tags-input"
                  placeholder={config.suggestedTags}
                  value={editorState.tags}
                  onChange={e => handleFieldChange('tags', e.target.value)}
                />
            </div>

            {config.habits.length > 0 && (
              <div>
                <Label>Supporting Habits</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {config.habits.map(habitId => {
                    const habit = allHabits[habitId];
                    if (!habit) return null;
                    return (
                      <div
                        key={habit.id}
                        className="flex items-center space-x-2 p-2 bg-muted/50 rounded-md cursor-pointer hover:bg-muted"
                      >
                        <input
                          type="checkbox"
                          id={habit.id}
                          checked={!!editorState.habits[habit.id]}
                          onChange={e => handleHabitChange(habit.id, e.target.checked)}
                          className="form-checkbox h-4 w-4 rounded text-primary bg-background border-primary focus:ring-primary"
                        />
                        <Label
                          htmlFor={habit.id}
                          className="flex items-center gap-2 text-sm font-normal cursor-pointer"
                        >
                          <habit.icon className="w-4 h-4 text-muted-foreground" />{' '}
                          {habit.label}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
             <div>
              <Label
                htmlFor="effort-slider"
                className="flex justify-between"
              >
                <span>Effort / Focus</span>
                <span>{editorState.effort}/10</span>
              </Label>
              <Slider
                id="effort-slider"
                min={1}
                max={10}
                step={1}
                value={[editorState.effort]}
                onValueChange={value => handleFieldChange('effort', value[0])}
              />
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  };
  
  const ListView = () => (
    <div className='h-full flex flex-col'>
        <ScrollArea className="flex-grow pr-3 -mr-3">
            <div className="space-y-2 mt-2">
            {entries.map(entry => {
                const categoryTitle = journalConfig[entry.category as JournalCategory]?.title || entry.category;
                return (
                    <div key={entry.id} className="group flex items-center gap-2">
                        <button onClick={() => handleSelectEntry(entry)}
                            className={cn(
                                "flex-grow text-left p-2 rounded-md transition-colors",
                                selectedEntry?.id === entry.id ? 'bg-primary/10 text-primary-foreground' : 'hover:bg-muted'
                            )}>
                            <p className="font-semibold">{new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - <span className="text-sm font-normal text-muted-foreground">{categoryTitle}</span></p>
                            <p className="text-sm text-muted-foreground truncate">{entry.field1 || entry.field2 || entry.field3 || 'No reflection yet.'}</p>
                        </button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2 className="w-4 h-4 text-muted-foreground"/>
                                </Button>
                            </AlertDialogTrigger>
                             <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Move to Trash?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will move the entry to the trash. You can restore it later.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(entry.id)}>
                                        Move to Trash
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                );
            })}
            </div>
        </ScrollArea>
    </div>
  );

  const TrashView = () => (
     <div className='h-full flex flex-col'>
        <ScrollArea className="flex-grow pr-3 -mr-3">
            <div className="space-y-2 mt-2">
            {trashedEntries.length > 0 ? trashedEntries.map(entry => {
                return (
                  <div key={entry.id} className="group flex items-center gap-2 p-2 rounded-md bg-muted/50">
                      <div className='flex-grow'>
                          <p className="font-semibold">{new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - <span className="text-sm font-normal text-muted-foreground">{journalConfig[entry.category as JournalCategory]?.title || entry.category}</span></p>
                          <p className="text-sm text-muted-foreground truncate">{entry.field1 || entry.field2 || entry.field3 || 'No reflection yet.'}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => handleRestore(entry.id)}>
                          <ArchiveRestore className="w-4 h-4 text-muted-foreground"/>
                      </Button>
                  </div>
                );
            }) : (
                <div className="text-center text-muted-foreground pt-10">Trash is empty.</div>
            )}
            </div>
        </ScrollArea>
        {trashedEntries.length > 0 && (
            <div className="mt-2 flex-shrink-0">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                         <Button variant="destructive" className="w-full">Empty Trash</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete {trashedEntries.length} item(s).
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={emptyTrash}>
                                Yes, Empty Trash
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        )}
    </div>
  );

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <BookMarked className="w-5 h-5 text-primary" />
          My Journal
        </CardTitle>
        <CardDescription>
          A tool for reflection, goal-setting, and cognitive growth.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[650px]">
          <div className="lg:col-span-1 bg-muted/30 rounded-lg p-3 flex flex-col">
            <div className="flex justify-between items-center mb-2 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setViewMode('entries')} className={cn(viewMode === 'entries' && 'bg-background')}>Entries</Button>
                    <Button variant="ghost" size="sm" onClick={() => setViewMode('trash')} className={cn(viewMode === 'trash' && 'bg-background')}>Trash ({trashedEntries.length})</Button>
                </div>
              <Button variant="ghost" size="sm" onClick={handleNewEntry}>
                <PlusCircle className="mr-2 h-4 w-4" /> New
              </Button>
            </div>
            <Separator />
            <div className="flex-grow mt-2 min-h-0">
                {viewMode === 'entries' ? <ListView /> : <TrashView />}
            </div>
          </div>
          <div className="lg:col-span-2 bg-background rounded-lg border">
            {selectedEntry && viewMode === 'entries' ? (
              <EntryEditor entry={selectedEntry} onSave={handleSave} />
            ) : (
              <div className="p-6 flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                {viewMode === 'entries' ? (
                    <>
                        {entries.length === 0 && !selectedEntry ? (
                            <>
                                <PlusCircle className="w-8 h-8 mb-2" />
                                <p>Create your first journal entry.</p>
                            </>
                        ) : (
                             <>
                                <BookMarked className="w-8 h-8 mb-2" />
                                <p>Select an entry or create a new one.</p>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <Trash2 className="w-8 h-8 mb-2" />
                        <p>Items in the trash can be restored or permanently deleted.</p>
                    </>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

    
