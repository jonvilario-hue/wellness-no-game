
'use client';

import { useState, useEffect } from 'react';
import type { JournalCategory, HabitId } from '@/lib/journal-config';

export type MoodState = 'happy' | 'neutral' | 'sad' | null;
export type HabitState = 'done' | null;
export type ReflectionFrequency = 'daily' | 'weekly' | 'monthly';

export type JournalEntry = {
    id: string;
    date: string; // YYYY-MM-DD
    category: JournalCategory;
    frequency: ReflectionFrequency;
    
    // Template fields
    field1: string;
    field2: string;
    field3: string;
    affirmations: string[];

    tags: string;
    effort: number;
    mood: MoodState;
    habits: Partial<Record<HabitId, HabitState>>;
};

const MAX_TRASH_ITEMS = 20;

const useJournal = () => {
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [trashedEntries, setTrashedEntries] = useState<JournalEntry[]>([]);

    useEffect(() => {
        try {
            const savedEntries = window.localStorage.getItem('journalEntries');
            if (savedEntries) {
                const parsed = JSON.parse(savedEntries);
                if (Array.isArray(parsed)) {
                    // Quick migration for old data structure
                    const migratedEntries = parsed.map(entry => {
                        if (typeof entry.affirmation === 'string') {
                            entry.affirmations = entry.hasAffirmation ? [entry.affirmation] : [];
                            delete entry.affirmation;
                            delete entry.hasAffirmation;
                        }
                        if (!entry.affirmations) {
                             entry.affirmations = [];
                        }
                        return entry;
                    });
                    setEntries(migratedEntries);
                }
            }
             const savedTrashedEntries = window.localStorage.getItem('journalTrashedEntries');
            if (savedTrashedEntries) {
                const parsed = JSON.parse(savedTrashedEntries);
                if (Array.isArray(parsed)) {
                    const migratedTrashed = parsed.map(entry => {
                         if (typeof entry.affirmation === 'string') {
                            entry.affirmations = entry.hasAffirmation ? [entry.affirmation] : [];
                            delete entry.affirmation;
                            delete entry.hasAffirmation;
                        }
                         if (!entry.affirmations) {
                             entry.affirmations = [];
                        }
                        return entry;
                    });
                    setTrashedEntries(migratedTrashed);
                }
            }
        } catch (error) {
            console.error("Failed to load journal entries from localStorage", error);
        }
    }, []);

    const saveEntries = (newEntries: JournalEntry[]) => {
        try {
            const sortedEntries = newEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setEntries(sortedEntries);
            window.localStorage.setItem('journalEntries', JSON.stringify(sortedEntries));
        } catch (error) {
            console.error("Failed to save entries to localStorage", error);
        }
    };
    
    const saveTrashedEntries = (newTrashedEntries: JournalEntry[]) => {
         try {
            // Enforce max trash size
            while (newTrashedEntries.length > MAX_TRASH_ITEMS) {
                newTrashedEntries.shift(); // Remove the oldest item
            }
            setTrashedEntries(newTrashedEntries);
            window.localStorage.setItem('journalTrashedEntries', JSON.stringify(newTrashedEntries));
        } catch (error) {
            console.error("Failed to save trashed entries to localStorage", error);
        }
    }

    const addEntry = (newEntry: JournalEntry) => {
        saveEntries([...entries, newEntry]);
    };

    const updateEntry = (id: string, updatedEntry: JournalEntry) => {
        const newEntries = entries.map(entry => (entry.id === id ? updatedEntry : entry));
        saveEntries(newEntries);
    };

    const deleteEntry = (id: string) => {
        const entryToTrash = entries.find(entry => entry.id === id);
        if (entryToTrash) {
            const newEntries = entries.filter(entry => entry.id !== id);
            const newTrashedEntries = [entryToTrash, ...trashedEntries];
            saveEntries(newEntries);
            saveTrashedEntries(newTrashedEntries);
        }
    };
    
    const restoreEntry = (id: string) => {
        const entryToRestore = trashedEntries.find(entry => entry.id === id);
        if (entryToRestore) {
            const newTrashedEntries = trashedEntries.filter(entry => entry.id !== id);
            const newEntries = [...entries, entryToRestore];
            saveTrashedEntries(newTrashedEntries);
            saveEntries(newEntries);
        }
    };
    
    const emptyTrash = () => {
        saveTrashedEntries([]);
    };


    const getEntry = (id: string) => {
        return entries.find(entry => entry.id === id);
    };

    return { entries, trashedEntries, addEntry, updateEntry, deleteEntry, getEntry, restoreEntry, emptyTrash };
};

export { useJournal };
