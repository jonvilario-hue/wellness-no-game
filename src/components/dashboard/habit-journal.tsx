
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
import { useCallback, useMemo, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useHydratedJournalStore as useJournal, type JournalEntry, type ReflectionFrequency, getFrequencyForDate, type JournalCategory } from '@/hooks/use-journal';
import { JournalEditor } from '@/components/journal/journal-editor';
import { JournalSidebar } from '@/components/journal/journal-sidebar';
import { useTheme } from '@/hooks/use-theme';
import { GrowthDecoration } from '../ui/growth-decoration';


export function HabitJournal() {
  const { hasHydrated, findOrCreateEntry, setSelectedEntry, selectedEntry, createNewEntry, entries, addEntry, updateEntry, deleteEntry } = useJournal();
  const { organicGrowth } = useTheme();
  const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);

  // Effect to set the initial or selected entry
  useEffect(() => {
    if (hasHydrated) {
      if (selectedEntry) {
        setActiveEntry(selectedEntry);
      } else {
        // If no entry is selected, find or create one for today
        const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
        const initialEntry = findOrCreateEntry({
          date: today,
          category: 'Growth & Challenge Reflection',
          frequency: getFrequencyForDate(new Date(today))
        });
        setActiveEntry(initialEntry);
        // Optionally set this as the globally selected one if it's the first load
        if (!selectedEntry) {
           setSelectedEntry(initialEntry);
        }
      }
    }
  }, [hasHydrated, selectedEntry, findOrCreateEntry, setSelectedEntry]);
  
  const { toast } = useToast();

  const handleSelectFromList = useCallback((entry: JournalEntry) => {
    setSelectedEntry(entry);
  }, [setSelectedEntry]);
  
  const handleNewEntry = useCallback(() => {
    const newEntry = createNewEntry();
    setSelectedEntry(newEntry);
    setActiveEntry(newEntry);
  }, [setSelectedEntry, createNewEntry]);

  const handleCategoryChange = useCallback((newCategory: JournalCategory) => {
    if (activeEntry) {
      const isNew = activeEntry.id.startsWith('new-');
      const newEntry = findOrCreateEntry({
          date: activeEntry.date, 
          category: newCategory, 
          frequency: activeEntry.frequency,
          forceNew: isNew, // Force a new blank entry if we're in the new entry flow
      });
      setSelectedEntry(newEntry);
    }
  }, [activeEntry, findOrCreateEntry, setSelectedEntry]);

  const handleFrequencyChange = useCallback((newFrequency: ReflectionFrequency) => {
    if (activeEntry) {
      const isNew = activeEntry.id.startsWith('new-');
      const newEntry = findOrCreateEntry({
          date: activeEntry.date, 
          category: activeEntry.category, 
          frequency: newFrequency,
          forceNew: isNew,
      });
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
        setActiveEntry(savedEntry);
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
       const newEntry = findOrCreateEntry({date: today, category: 'Growth & Challenge Reflection', frequency: getFrequencyForDate(new Date(today))});
       setSelectedEntry(newEntry);
    }
  }, [deleteEntry, toast, activeEntry, entries, findOrCreateEntry, setSelectedEntry]);

  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 col-span-1 md:col-span-2 relative overflow-hidden">
      {organicGrowth && <GrowthDecoration />}
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
                onNewEntry={handleNewEntry}
                selectedEntry={activeEntry}
                onUpdateEntry={updateEntry}
            />

          <div className="lg:col-span-2 bg-background rounded-lg border">
            {activeEntry ? (
              <JournalEditor 
                key={activeEntry.id} // Add key to force re-mount on entry change
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
