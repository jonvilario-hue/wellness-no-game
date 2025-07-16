
'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BookMarked,
} from 'lucide-react';
import { useCallback, useEffect, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useHydratedJournalStore as useJournal, type JournalEntry, type ReflectionFrequency, getFrequencyForDate, type JournalCategory } from '@/hooks/use-journal';
import { JournalEditor } from '@/components/journal/journal-editor';
import { JournalSidebar } from '@/components/journal/journal-sidebar';
import { useTheme } from '@/hooks/use-theme';
import { GrowthDecoration } from '../ui/growth-decoration';


export function JournalModule() {
  const { 
    hasHydrated, 
    findOrCreateEntry, 
    selectedEntry,
    setSelectedEntry, 
    createNewEntry, 
    addEntry, 
    updateEntry, 
    deleteEntry,
    entries
  } = useJournal();
  
  const { organicGrowth } = useTheme();
  
  // Effect to set the initial entry on first load
  useEffect(() => {
    if (hasHydrated && !selectedEntry) {
      const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
      const initialEntry = findOrCreateEntry({
        date: today,
        category: 'Notebook',
        frequency: getFrequencyForDate(new Date(today))
      });
      setSelectedEntry(initialEntry);
    }
  }, [hasHydrated, selectedEntry, findOrCreateEntry, setSelectedEntry]);
  
  const { toast } = useToast();

  const handleSelectFromList = useCallback((entry: JournalEntry) => {
    setSelectedEntry(entry);
  }, [setSelectedEntry]);
  
  const handleNewEntry = useCallback(() => {
    const newEntry = createNewEntry();
    setSelectedEntry(newEntry);
  }, [setSelectedEntry, createNewEntry]);

  const handleCategoryChange = useCallback((newCategory: JournalCategory) => {
    if (selectedEntry) {
      const isNew = selectedEntry.id.startsWith('new-');
      const newEntry = findOrCreateEntry({
          date: selectedEntry.date, 
          category: newCategory, 
          frequency: selectedEntry.frequency,
          forceNew: isNew, // Force a new blank entry if we're in the new entry flow
      });
      setSelectedEntry(newEntry);
    }
  }, [selectedEntry, findOrCreateEntry, setSelectedEntry]);

  const handleFrequencyChange = useCallback((newFrequency: ReflectionFrequency) => {
    if (selectedEntry) {
      const isNew = selectedEntry.id.startsWith('new-');
      const newEntry = findOrCreateEntry({
          date: selectedEntry.date, 
          category: selectedEntry.category, 
          frequency: newFrequency,
          forceNew: isNew,
      });
      setSelectedEntry(newEntry);
    }
  }, [selectedEntry, findOrCreateEntry, setSelectedEntry]);
  
  const handleSave = useCallback((entryToSave: JournalEntry, options?: { isFinal?: boolean }) => {
    let savedEntry: JournalEntry;
    const isNew = entryToSave.id.startsWith('new-');
    
    const hasContent = entryToSave.field1 || entryToSave.field2 || entryToSave.field3 || entryToSave.affirmations.some(a => a);
    if(isNew && !hasContent && !options?.isFinal) {
        return { success: false, entry: null };
    }
    
    if (isNew) {
      savedEntry = addEntry(entryToSave);
    } else {
      updateEntry(entryToSave.id, entryToSave);
      savedEntry = entryToSave;
    }
    
    setSelectedEntry(savedEntry);
    return { success: true, entry: savedEntry };
  }, [addEntry, updateEntry, setSelectedEntry]);

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
    
    if (selectedEntry?.id === id) {
       const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
       const newEntry = findOrCreateEntry({date: today, category: 'Notebook', frequency: getFrequencyForDate(new Date(today))});
       setSelectedEntry(newEntry);
    }
  }, [deleteEntry, toast, selectedEntry?.id, entries, findOrCreateEntry, setSelectedEntry]);

  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 col-span-1 md:col-span-2 relative overflow-hidden">
      {organicGrowth && <GrowthDecoration />}
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[650px]">
            <JournalSidebar 
                onSelectEntry={handleSelectFromList} 
                onDeleteEntry={handleDelete}
                onNewEntry={handleNewEntry}
                selectedEntry={selectedEntry}
                onUpdateEntry={updateEntry}
            />

          <div className="lg:col-span-2 bg-background rounded-lg border">
            {selectedEntry ? (
              <JournalEditor 
                key={selectedEntry.id} // Add key to force re-mount on entry change
                entry={selectedEntry} 
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
