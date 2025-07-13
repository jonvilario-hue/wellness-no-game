
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BookMarked,
} from 'lucide-react';
import { useCallback, useMemo, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useJournal, type JournalEntry, type ReflectionFrequency, getFrequencyForDate, type JournalCategory } from '@/hooks/use-journal';
import { JournalEditor } from '@/components/journal/journal-editor';
import { JournalSidebar } from '@/components/journal/journal-sidebar';


export function HabitJournal() {
  const { isLoaded, findOrCreateEntry, setSelectedEntry, selectedEntry, createNewEntry } = useJournal();
  
  // Memoize the initial entry to avoid re-running findOrCreateEntry on every render
  const initialEntry = useMemo(() => {
    if (isLoaded) {
      const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
      return findOrCreateEntry(today, 'Growth & Challenge Reflection', getFrequencyForDate(new Date(today)));
    }
    return null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  // Set the selected entry only once when the component is loaded or when the initial entry is ready
  useEffect(() => {
    if (initialEntry && !selectedEntry) {
      setSelectedEntry(initialEntry);
    }
  }, [initialEntry, selectedEntry, setSelectedEntry]);
  
  // Memoize active entry for editor to prevent re-renders
  const activeEntry = useMemo(() => {
    if (selectedEntry) return selectedEntry;
    if (isLoaded) return createNewEntry();
    return null;
  }, [selectedEntry, isLoaded, createNewEntry]);
  
  const { toast } = useToast();
  const { addEntry, updateEntry, deleteEntry, entries } = useJournal();

  const handleSelectFromList = useCallback((entry: JournalEntry) => {
    setSelectedEntry(entry);
  }, [setSelectedEntry]);

  const handleCategoryChange = useCallback((newCategory: JournalCategory) => {
    if (activeEntry) {
      const newEntry = findOrCreateEntry(activeEntry.date, newCategory, activeEntry.frequency);
      setSelectedEntry(newEntry);
    }
  }, [activeEntry, findOrCreateEntry, setSelectedEntry]);

  const handleFrequencyChange = useCallback((newFrequency: ReflectionFrequency) => {
    if (activeEntry) {
      const newEntry = findOrCreateEntry(activeEntry.date, activeEntry.category, newFrequency);
      setSelectedEntry(newEntry);
    }
  }, [activeEntry, findOrCreateEntry, setSelectedEntry]);
  
  const handleSave = useCallback((entryToSave: JournalEntry, options?: { isFinal?: boolean }) => {
    let savedEntry = entryToSave;
    const isNew = entryToSave.id.startsWith('new-');
    
    const hasContent = entryToSave.field1 || entryToSave.field2 || entryToSave.field3 || entryToSave.affirmations.some(a => a);
    if(isNew && !hasContent && !options?.isFinal) {
        return { success: false, entry: null };
    }
    
    if (isNew) {
      savedEntry = addEntry(entryToSave);
    } else {
      updateEntry(entryToSave.id, entryToSave);
    }
    
    if (activeEntry?.id === entryToSave.id || isNew) {
        setSelectedEntry(savedEntry);
    }
    return { success: true, entry: savedEntry };
  }, [addEntry, updateEntry, setSelectedEntry, activeEntry]);

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
            useJournal.getState().restoreEntry(id);
          }}
          variant="outline"
          size="sm"
        >
          Undo
        </Button>
      ) : undefined,
    });
    
    if (activeEntry?.id === id) {
       const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
       const newEntry = findOrCreateEntry(today, 'Growth & Challenge Reflection', getFrequencyForDate(new Date(today)));
       setSelectedEntry(newEntry);
    }
  }, [deleteEntry, toast, activeEntry, entries, findOrCreateEntry, setSelectedEntry]);

  
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
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[650px]">
            <JournalSidebar 
                onSelectEntry={handleSelectFromList} 
                onDeleteEntry={handleDelete}
                selectedEntry={activeEntry}
            />

          <div className="lg:col-span-2 bg-background rounded-lg border">
            {activeEntry ? (
              <JournalEditor 
                entry={activeEntry} 
                onSave={handleSave} 
                onDelete={handleDelete}
                onCategoryChange={handleCategoryChange}
                onFrequencyChange={handleFrequencyChange}
               />
            ) : (
              <div className="p-6 flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <BookMarked className="w-8 h-8 mb-2" />
                <p>Select an entry to view or edit, or create a new one.</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

HabitJournal.displayName = 'HabitJournal';
