
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
  Search,
  ArrowDownUp,
  AlertTriangle,
} from 'lucide-react';
import { useState, useEffect, useCallback, useMemo, forwardRef, useImperativeHandle, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { useJournal, type JournalEntry, type ReflectionFrequency, getFrequencyForDate } from '@/hooks/use-journal';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';

type ViewMode = 'entries' | 'trash';
type SortMode = 'date-desc' | 'date-asc' | 'category';

const groupEntriesByDate = (entries: JournalEntry[]) => {
  return entries.reduce((acc, entry) => {
    const date = entry.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, JournalEntry[]>);
};

const EntryEditor = ({
  entry,
  onSave,
  onDelete,
  onCategoryChange,
  onFrequencyChange,
}: {
  entry: JournalEntry;
  onSave: (entry: JournalEntry, options?: { isFinal: boolean }) => { success: boolean; entry: JournalEntry | null };
  onDelete: (id: string) => void;
  onCategoryChange: (newCategory: JournalCategory) => void;
  onFrequencyChange: (newFrequency: ReflectionFrequency) => void;
}) => {
  const [editorState, setEditorState] = useState<JournalEntry>(entry);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const { toast } = useToast();
  const { completedHabits, toggleHabitForDay } = useJournal();
  const editorStateRef = useRef(editorState);

  const todaysHabits = completedHabits[editorState.date] || new Set();

  useEffect(() => {
    setEditorState(entry);
    setSaveStatus('idle');
  }, [entry]);
  
  useEffect(() => {
    editorStateRef.current = editorState;
  }, [editorState]);

  const handleSave = useCallback((options: { isFinal: boolean } = { isFinal: false }) => {
    const currentEntry = editorStateRef.current;
    // Don't save if it's a new, untouched entry
    const isNew = currentEntry.id.startsWith('new-');
    const hasContent = currentEntry.field1 || currentEntry.field2 || currentEntry.field3 || currentEntry.affirmations.some(a => a);
    if(isNew && !hasContent && !options.isFinal) return;
    
    setSaveStatus('saving');
    const result = onSave(currentEntry, options);
    if (result.success && result.entry) {
        setEditorState(prev => ({...result.entry!, affirmations: prev.affirmations}));
        setTimeout(() => setSaveStatus('saved'), 500);
    } else if (!result.success) {
        setSaveStatus('idle');
    }
  }, [onSave]);


  useEffect(() => {
    const hasChanged = JSON.stringify(entry) !== JSON.stringify(editorStateRef.current);
    if (!hasChanged) {
      setSaveStatus('idle');
      return;
    }

    const handler = setTimeout(() => {
      handleSave();
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [editorState, entry, handleSave]);


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
    handleSave({ isFinal: true });
    toast({ title: 'Journal Entry Saved' });
  }

  const handleCategoryButtonClick = (newCategory: JournalCategory) => {
    if (editorState.category !== newCategory) {
        handleSave({ isFinal: true });
        onCategoryChange(newCategory);
    }
  };
  
  const handleFrequencyButtonClick = (newFrequency: ReflectionFrequency) => {
    if (editorState.frequency !== newFrequency) {
        handleSave({ isFinal: true });
        onFrequencyChange(newFrequency);
    }
  };

  const handleFieldChange = (
    field: keyof Omit<JournalEntry, 'id' | 'date'>,
    value: any
  ) => {
    setEditorState(prevState => ({ ...prevState, [field]: value }));
  };

  const handleHabitChange = (habitId: HabitId, checked: boolean) => {
    toggleHabitForDay(editorState.date, habitId);
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


  const exportAsMarkdown = (entryToExport: JournalEntry) => {
      const entryConfig = journalConfig[entryToExport.category as JournalCategory];
      const prompts = entryConfig.prompts[entryToExport.frequency] || entryConfig.prompts.daily;

      let markdown = `---
date: ${entryToExport.date}
category: "${entryToExport.category}"
frequency: ${entryToExport.frequency}
effort: ${entryToExport.effort}
tags: ${entryToExport.tags}
---

# Journal Entry: ${new Date(entryToExport.date + 'T00:00:00').toLocaleDateString()}

## ${entryToExport.category} (${entryToExport.frequency})

`;

      if (entryToExport.field1) markdown += `### ${prompts[0]}\n${entryToExport.field1}\n\n`;
      if (entryToExport.field2) markdown += `### ${prompts[1]}\n${entryToExport.field2}\n\n`;
      if (entryToExport.field3) markdown += `### ${prompts[2]}\n${entryToExport.field3}\n\n`;

      if (entryToExport.affirmations && entryToExport.affirmations.length > 0) {
          markdown += `### Affirmations\n${entryToExport.affirmations.map(a => `> ${a}`).join('\n')}\n\n`;
      }
      
      const completedHabitsForEntry = Object.values(allHabits)
          .filter(habit => todaysHabits.has(habit.id))
          .map(h => h?.label);

      if (completedHabitsForEntry.length > 0) {
          markdown += `### Supporting Habits\n${completedHabitsForEntry.map(h => `- [x] ${h}`).join('\n')}\n\n`;
      }

      const element = document.createElement("a");
      const file = new Blob([markdown], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `journal-${entryToExport.date}.md`;
      document.body.appendChild(element); 
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
                          <span>Saved at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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
                              This entry will be moved to the trash and can be restored within 30 days.
                          </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onDelete(editorState.id)}>
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
                    onClick={() => handleCategoryButtonClick(catKey)}
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
                      <Button key={freq} variant={editorState.frequency === freq ? 'default' : 'outline'} onClick={() => handleFrequencyButtonClick(freq)} className="capitalize flex-1">
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
              <div className="space-y-1 mt-1">
                {config.habits.map(habitId => {
                  const habit = allHabits[habitId];
                  if (!habit) return null;
                  const habitCheckboxId = `habit-${habit.id}-${entry.id}`;
                  return (
                     <div key={habit.id} className="flex items-center">
                      <Label
                        htmlFor={habitCheckboxId}
                        className="flex items-center gap-2 text-sm font-normal cursor-pointer p-2 rounded-md flex-grow hover:bg-muted w-full"
                      >
                         <Checkbox 
                          id={habitCheckboxId}
                          checked={todaysHabits.has(habit.id)}
                          onCheckedChange={checked => handleHabitChange(habit.id, !!checked)}
                         />
                        <habit.icon className="w-4 h-4 text-muted-foreground" />
                        <span>{habit.label}</span>
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

const ListView = ({ entries, selectedEntry, onSelect, onDelete }: { entries: JournalEntry[], selectedEntry: JournalEntry | null, onSelect: (entry: JournalEntry) => void, onDelete: (id: string) => void }) => {
  const groupedEntries = groupEntriesByDate(entries);
  const sortedDates = Object.keys(groupedEntries).sort((a,b) => new Date(b).getTime() - new Date(a).getTime());
  
  return (
      <div className='h-full flex flex-col'>
          <ScrollArea className="flex-grow pr-3 -mr-3">
              <div className="space-y-4 mt-2">
                  {sortedDates.map(date => (
                      <div key={date}>
                          <h4 className="font-bold text-sm text-muted-foreground px-2">
                              {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </h4>
                          <Separator className="my-1"/>
                          <div className="space-y-1">
                              {groupedEntries[date].map(entry => {
                                  const isSelected = selectedEntry?.id === entry.id;
                                  const categoryTitle = journalConfig[entry.category as JournalCategory]?.title || entry.category;
                                  const preview = (entry.field1 || entry.field2 || entry.field3 || 'No reflection yet.').substring(0, 100);
                                  const tags = entry.tags.split(',').map(t => t.trim()).filter(Boolean);

                                  return (
                                      <div key={entry.id} className="group flex items-center gap-1">
                                          <button onClick={() => onSelect(entry)}
                                              className={cn(
                                                  "flex-grow text-left p-2 rounded-md transition-colors",
                                                  isSelected ? 'bg-primary/10' : 'hover:bg-muted'
                                              )}>
                                              <p className={cn(
                                                  "font-semibold text-sm",
                                                  isSelected ? "text-primary font-bold" : "text-foreground"
                                              )}>
                                                {categoryTitle}
                                              </p>
                                              <p className={cn(
                                                  "text-xs truncate",
                                                  isSelected ? "text-foreground/90" : "text-muted-foreground"
                                              )}>
                                                  {preview}{preview.length === 100 && '...'}
                                              </p>
                                              {tags.length > 0 && (
                                                  <div className="flex flex-wrap gap-1 mt-1">
                                                      {tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                                                  </div>
                                              )}
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
                                                      <AlertDialogAction onClick={() => onDelete(entry.id)}>
                                                          Move to Trash
                                                      </AlertDialogAction>
                                                  </AlertDialogFooter>
                                              </AlertDialogContent>
                                          </AlertDialog>
                                      </div>
                                  )
                              })}
                          </div>
                      </div>
                  ))}
              </div>
          </ScrollArea>
      </div>
  )
};

const TrashView = ({ 
  trashedEntries, 
  onRestore, 
  onDeletePermanently, 
  onEmptyTrash 
}: { 
  trashedEntries: JournalEntry[], 
  onRestore: (id: string) => void, 
  onDeletePermanently: (id: string) => void,
  onEmptyTrash: () => void 
}) => (
   <div className='h-full flex flex-col'>
      <ScrollArea className="flex-grow pr-3 -mr-3">
          <div className="space-y-2 mt-2">
          {trashedEntries.length > 0 ? trashedEntries.map(entry => {
              const config = journalConfig[entry.category as JournalCategory];
              const categoryTitle = config ? config.title : entry.category;
              return (
                <div key={entry.id} className="group flex items-center gap-1 p-2 rounded-md bg-muted/50">
                    <div className='flex-grow'>
                        <p className="font-semibold">{new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - <span className="text-sm font-normal text-muted-foreground">{categoryTitle}</span></p>
                        <p className="text-sm text-muted-foreground truncate">{entry.field1 || entry.field2 || entry.field3 || 'No reflection yet.'}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => onRestore(entry.id)} title="Restore">
                        <ArchiveRestore className="w-4 h-4 text-muted-foreground hover:text-primary"/>
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" title="Delete Permanently">
                                <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive"/>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Permanently?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this journal entry.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => onDeletePermanently(entry.id)} variant="destructive">
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
              );
          }) : (
              <div className="text-center text-muted-foreground pt-10">Trash is empty.</div>
          )}
          </div>
      </ScrollArea>
      {trashedEntries.length > 0 && (
          <div className="mt-2 pt-2 border-t flex-shrink-0">
              <AlertDialog>
                  <AlertDialogTrigger asChild>
                       <Button variant="outline" className="w-full">
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Empty Entire Trash
                        </Button>
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
                          <AlertDialogAction onClick={onEmptyTrash} variant="destructive">
                              Yes, Empty Trash
                          </AlertDialogAction>
                      </AlertDialogFooter>
                  </AlertDialogContent>
              </AlertDialog>
          </div>
      )}
  </div>
);

const categoryKeys = Object.keys(journalConfig) as JournalCategory[];

export const HabitJournal = forwardRef((props, ref) => {
  const { entries, trashedEntries, addEntry, updateEntry, deleteEntry, restoreEntry, deleteFromTrashPermanently, emptyTrash, findOrCreateEntry, isLoaded } = useJournal();
  const [viewMode, setViewMode] = useState<ViewMode>('entries');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('date-desc');
  const { toast } = useToast();
  
  // Editor state
  const [currentDate, setCurrentDate] = useState(new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0]);
  const [currentCategory, setCurrentCategory] = useState<JournalCategory>('Growth & Challenge Reflection');
  const [currentFrequency, setCurrentFrequency] = useState<ReflectionFrequency>('daily');
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  useImperativeHandle(ref, () => ({
    createNewEntry: () => {
        const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
        setCurrentDate(today);
        setCurrentCategory('Growth & Challenge Reflection');
        setCurrentFrequency(getFrequencyForDate(new Date()));
        setViewMode('entries');
    },
  }));
  
  useEffect(() => {
    if (isLoaded) {
      setCurrentFrequency(getFrequencyForDate(new Date(currentDate)));
    }
  }, [currentDate, isLoaded]);

  useEffect(() => {
    if(isLoaded) {
      const entry = findOrCreateEntry(currentDate, currentCategory, currentFrequency);
      setSelectedEntry(entry);
    }
  }, [isLoaded, currentDate, currentCategory, currentFrequency, findOrCreateEntry, entries]);


  const handleSelectFromList = useCallback((entry: JournalEntry) => {
    setViewMode('entries');
    setCurrentDate(entry.date);
    setCurrentCategory(entry.category);
    setCurrentFrequency(entry.frequency);
  }, []);
  
  const handleSave = useCallback((entryToSave: JournalEntry) => {
    if (!entryToSave.field1.trim() && !entryToSave.field2.trim() && !entryToSave.field3.trim() && !entryToSave.affirmations.some(a => a.trim())) {
      toast({
        title: 'Empty Journal',
        description: 'Please write something before saving.',
        variant: 'destructive',
      });
      return { success: false, entry: null };
    }
    
    let savedEntry = entryToSave;
    const isNew = entryToSave.id.startsWith('new-');
    
    if (isNew) {
      savedEntry = addEntry(entryToSave);
    } else {
      updateEntry(entryToSave.id, entryToSave);
    }
    
    setSelectedEntry(savedEntry);
    return { success: true, entry: savedEntry };
  }, [addEntry, updateEntry, toast, setSelectedEntry]);
  
  const handleRestore = useCallback((id: string) => {
    restoreEntry(id);
    toast({ title: 'Entry Restored' });
  }, [restoreEntry, toast]);
  
  const handleDeleteFromTrash = useCallback((id: string) => {
    deleteFromTrashPermanently(id);
    toast({ title: 'Entry Permanently Deleted', variant: 'destructive' });
  }, [deleteFromTrashPermanently, toast]);

  const handleDelete = useCallback((id: string) => {
    const entryData = entries.find(e => e.id === id);
    deleteEntry(id);
    
    toast({
      title: 'Entry Moved to Trash',
      description: 'You can restore it from the trash.',
      action: entryData ? (
        <Button
          onClick={(e) => {
            e.preventDefault();
            restoreEntry(id);
          }}
          variant="outline"
          size="sm"
        >
          Undo
        </Button>
      ) : undefined,
    });
    
    if (selectedEntry?.id === id) {
       const newEntry = findOrCreateEntry(currentDate, currentCategory, currentFrequency);
       setSelectedEntry(newEntry);
    }
  }, [deleteEntry, restoreEntry, toast, selectedEntry, entries, findOrCreateEntry, currentDate, currentCategory, currentFrequency]);

  const filteredAndSortedEntries = useMemo(() => {
    const filtered = entries.filter(entry => {
        if (entry.id.startsWith('new-')) return false; // Don't show unsaved drafts
        const query = searchQuery.toLowerCase();
        return (
            entry.category.toLowerCase().includes(query) ||
            entry.field1.toLowerCase().includes(query) ||
            entry.field2.toLowerCase().includes(query) ||
            entry.field3.toLowerCase().includes(query) ||
            entry.tags.toLowerCase().includes(query)
        );
    });

    return filtered.sort((a, b) => {
        switch (sortMode) {
            case 'date-asc':
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            case 'category':
                return a.category.localeCompare(b.category);
            case 'date-desc':
            default:
                return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
    });
  }, [entries, searchQuery, sortMode]);
  
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
            <div className="flex-shrink-0 space-y-2">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setViewMode('entries')} className={cn(viewMode === 'entries' && 'bg-background font-semibold')}>Entries</Button>
                        <Button variant="ghost" size="sm" onClick={() => setViewMode('trash')} className={cn(viewMode === 'trash' && 'bg-background font-semibold')}>Trash ({trashedEntries.length})</Button>
                    </div>
                </div>
                {viewMode === 'entries' && (
                    <div className='flex gap-2 items-center'>
                         <div className="relative flex-grow">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder="Search entries..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <ArrowDownUp className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={sortMode} onValueChange={(value) => setSortMode(value as SortMode)}>
                                    <DropdownMenuRadioItem value="date-desc">Date (Newest)</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="date-asc">Date (Oldest)</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="category">Category</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
            </div>
            <Separator className="my-2"/>
            <div className="flex-grow mt-2 min-h-0">
                {viewMode === 'entries' ? <ListView entries={filteredAndSortedEntries} selectedEntry={selectedEntry} onSelect={handleSelectFromList} onDelete={handleDelete} /> : <TrashView trashedEntries={trashedEntries} onRestore={handleRestore} onDeletePermanently={handleDeleteFromTrash} onEmptyTrash={emptyTrash} />}
            </div>
          </div>
          <div className="lg:col-span-2 bg-background rounded-lg border">
            {selectedEntry && viewMode === 'entries' ? (
              <EntryEditor 
                entry={selectedEntry} 
                onSave={handleSave} 
                onDelete={handleDelete}
                onCategoryChange={setCurrentCategory}
                onFrequencyChange={setCurrentFrequency}
               />
            ) : (
              <div className="p-6 flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                {viewMode === 'entries' ? (
                    <>
                        <BookMarked className="w-8 h-8 mb-2" />
                        <p>Select an entry to view or edit.</p>
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
});

HabitJournal.displayName = 'HabitJournal';
