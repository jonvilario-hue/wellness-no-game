
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
  Undo,
  ArchiveRestore,
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { useJournal, type JournalEntry } from '@/hooks/use-journal';
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
import { journalConfig, type JournalCategory, type HabitId } from '@/lib/journal-config';

const categoryKeys = Object.keys(journalConfig) as JournalCategory[];
type ViewMode = 'entries' | 'trash';

export function HabitJournal() {
  const { entries, trashedEntries, addEntry, updateEntry, deleteEntry, restoreEntry, emptyTrash } = useJournal();
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('entries');
  const { toast } = useToast();
  const today = new Date().toISOString().split('T')[0];

  const createNewEntryObject = (): JournalEntry => {
    const defaultCategory: JournalCategory = 'Growth & Challenge Reflection';
    const config = journalConfig[defaultCategory];
    return {
      id: `new-${Date.now()}`,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .split('T')[0],
      category: defaultCategory,
      field1: '',
      field2: '',
      field3: '',
      affirmation: '',
      tags: '',
      effort: 7,
      mood: null,
      habits: {},
      hasAffirmation: false,
    };
  };

  useEffect(() => {
    if (viewMode === 'entries') {
      const todayEntry = entries.find(e => e.date === today);
      if (todayEntry && selectedEntry?.id !== todayEntry.id) {
        setSelectedEntry(todayEntry);
      } else if (!todayEntry && (!selectedEntry || !selectedEntry.id.startsWith('new-'))) {
        setSelectedEntry(createNewEntryObject());
      } else if (entries.length > 0 && !selectedEntry) {
         setSelectedEntry(entries[0]);
      } else if (entries.length === 0 && !selectedEntry) {
        setSelectedEntry(createNewEntryObject());
      }
    } else {
        setSelectedEntry(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries, today, viewMode]);

  const handleSelectEntry = (entry: JournalEntry) => {
    setViewMode('entries');
    setSelectedEntry(entry);
  }

  const handleNewEntry = useCallback(() => {
    setViewMode('entries');
    setSelectedEntry(createNewEntryObject());
  }, []);

  const handleSave = (entryToSave: JournalEntry) => {
    if (!entryToSave.field1.trim() && !entryToSave.field2.trim() && !entryToSave.field3.trim()) {
      toast({
        title: 'Empty Journal',
        description: 'Please write something before saving.',
        variant: 'destructive',
      });
      return;
    }
    const isNew = entryToSave.id.startsWith('new-');
    if (isNew) {
      const finalEntry = { ...entryToSave, id: `${entryToSave.date}-${Date.now()}` };
      addEntry(finalEntry);
      setSelectedEntry(finalEntry);
      toast({ title: 'Journal Entry Saved' });
    } else {
      updateEntry(entryToSave.id, entryToSave);
      toast({ title: 'Journal Entry Updated' });
    }
  };

  const handleDelete = (id: string) => {
    const entryToDelete = entries.find(e => e.id === id);
    if (!entryToDelete) return;

    deleteEntry(id);
    toast({
      title: 'Entry Moved to Trash',
      description: 'You can restore it from the trash.',
      action: (
        <button
          onClick={() => handleRestore(id)}
          className="bg-transparent border border-white/50 text-white rounded-md px-3 py-1.5 text-sm hover:bg-white/10"
        >
          Undo
        </button>
      ),
    });

    const remainingEntries = entries.filter(e => e.id !== id);
    if (selectedEntry?.id === id) {
       if (remainingEntries.length > 0) {
            const entryIndex = entries.findIndex(e => e.id === id);
            setSelectedEntry(remainingEntries[Math.max(0, entryIndex - 1)]);
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
    onSave: (entry: JournalEntry) => void;
  }) => {
    const [editorState, setEditorState] = useState<JournalEntry>(entry);

    useEffect(() => {
      setEditorState(entry);
    }, [entry]);

    const isNewEntry = editorState.id.startsWith('new-');
    const category = (editorState.category as JournalCategory);
    const config = journalConfig[category];

    const handleCategoryChange = (newCategory: JournalCategory) => {
      const newConfig = journalConfig[newCategory];
      setEditorState(prevState => ({
        ...prevState,
        category: newCategory,
        mood: null, // Reset mood when category changes
        hasAffirmation: false,
      }));
    };

    const handleFieldChange = (
      field: keyof Omit<JournalEntry, 'id' | 'date' | 'habits'>,
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

    return (
      <div className="p-4 h-full flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-primary">
            {isNewEntry
              ? 'New Entry'
              : `Editing: ${new Date(
                  editorState.date + 'T00:00:00'
                ).toLocaleDateString()}`}
          </h3>
          <Button onClick={() => onSave(editorState)}>
            <Save className="mr-2 h-4 w-4" />{' '}
            {isNewEntry ? 'Save Entry' : 'Update Entry'}
          </Button>
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
            
            <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
              {config.purpose}
            </div>

            <Textarea
              placeholder={config.templateFields[0]}
              value={editorState.field1}
              onChange={e => handleFieldChange('field1', e.target.value)}
              className="min-h-[60px]"
            />
             <Textarea
              placeholder={config.templateFields[1]}
              value={editorState.field2}
              onChange={e => handleFieldChange('field2', e.target.value)}
              className="min-h-[60px]"
            />
             <Textarea
              placeholder={config.templateFields[2]}
              value={editorState.field3}
              onChange={e => handleFieldChange('field3', e.target.value)}
              className="min-h-[60px]"
            />
            
            <div>
                 <Button variant="ghost" size="sm" onClick={() => handleFieldChange('hasAffirmation', !editorState.hasAffirmation)}>
                    <PlusCircle className={cn("mr-2 h-4 w-4 transition-transform", editorState.hasAffirmation && "rotate-45")}/>
                    {editorState.hasAffirmation ? 'Remove Affirmation' : 'Add Affirmation'}
                 </Button>

                {editorState.hasAffirmation && (
                    <Textarea
                      placeholder={config.templateFields[3]}
                      value={editorState.affirmation}
                      onChange={e => handleFieldChange('affirmation', e.target.value)}
                      className="mt-2 min-h-[60px]"
                    />
                )}
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
                  {config.habits.map(habit => (
                    <div
                      key={habit.id}
                      className="flex items-center space-x-2 p-2 bg-muted/50 rounded-md"
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
                  ))}
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
            {entries.map(entry => (
                <div key={entry.id} className="group flex items-center gap-2">
                    <button onClick={() => handleSelectEntry(entry)}
                        className={cn(
                            "flex-grow text-left p-2 rounded-md transition-colors",
                            selectedEntry?.id === entry.id ? 'bg-primary/10 text-primary-foreground' : 'hover:bg-muted'
                        )}>
                        <p className="font-semibold">{new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - <span className="text-sm font-normal text-muted-foreground">{journalConfig[entry.category as JournalCategory]?.title || entry.category}</span></p>
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
            ))}
            </div>
        </ScrollArea>
    </div>
  );

  const TrashView = () => (
     <div className='h-full flex flex-col'>
        <ScrollArea className="flex-grow pr-3 -mr-3">
            <div className="space-y-2 mt-2">
            {trashedEntries.length > 0 ? trashedEntries.map(entry => (
                <div key={entry.id} className="group flex items-center gap-2 p-2 rounded-md bg-muted/50">
                    <div className='flex-grow'>
                        <p className="font-semibold">{new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - <span className="text-sm font-normal text-muted-foreground">{journalConfig[entry.category as JournalCategory]?.title || entry.category}</span></p>
                        <p className="text-sm text-muted-foreground truncate">{entry.field1 || entry.field2 || entry.field3 || 'No reflection yet.'}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => handleRestore(entry.id)}>
                        <ArchiveRestore className="w-4 h-4 text-muted-foreground"/>
                    </Button>
                </div>
            )) : (
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
                        <PlusCircle className="w-8 h-8 mb-2" />
                        <p>Select an entry or create a new one.</p>
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
