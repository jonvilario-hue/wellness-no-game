
'use client';

import { useState, useEffect, useCallback } from 'react';
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

const createSeedData = (): JournalEntry[] => {
    const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .split('T')[0];

    return [
        {
            id: `seed-${Date.now()}`,
            date: today,
            category: 'Growth & Challenge Reflection',
            frequency: 'daily',
            field1: 'My main challenge today was getting started with this new app and figuring out all its features!',
            field2: 'I learned that taking a moment to explore and read the descriptions helps a lot. It feels less overwhelming now.',
            field3: 'Next time I start something new, I\'ll give myself more time to just explore without pressure to be productive right away.',
            affirmations: ['I am capable of learning new things.'],
            tags: '#onboarding, #learning, #growth',
            effort: 5,
            mood: null,
            habits: {
                reflect_challenge: 'done',
                learn_from_discomfort: 'done',
            },
        },
    ];
};

const useJournal = () => {
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [trashedEntries, setTrashedEntries] = useState<JournalEntry[]>([]);

    useEffect(() => {
        try {
            const savedEntries = window.localStorage.getItem('journalEntries');
            const savedTrashedEntries = window.localStorage.getItem('journalTrashedEntries');

            if (savedEntries) {
                const parsed = JSON.parse(savedEntries);
                 if (Array.isArray(parsed)) {
                    setEntries(parsed);
                }
            } else {
                // If no entries, create and save seed data
                const seedEntries = createSeedData();
                saveEntries(seedEntries);
            }

            if (savedTrashedEntries) {
                const parsed = JSON.parse(savedTrashedEntries);
                if (Array.isArray(parsed)) {
                    setTrashedEntries(parsed);
                }
            }
        } catch (error) {
            console.error("Failed to load journal entries from localStorage", error);
            // If loading fails, start with seed data as a fallback
            if (entries.length === 0) {
                 const seedEntries = createSeedData();
                 saveEntries(seedEntries);
            }
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
            let updatedTrashedEntries = [...newTrashedEntries];
            while (updatedTrashedEntries.length > MAX_TRASH_ITEMS) {
                updatedTrashedEntries.shift(); // Remove the oldest item
            }
            setTrashedEntries(updatedTrashedEntries);
            window.localStorage.setItem('journalTrashedEntries', JSON.stringify(updatedTrashedEntries));
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
    
    const getCompletedHabitsForDay = useCallback((date: string): Set<string> => {
        const completed = new Set<string>();
        entries.forEach(entry => {
            if (entry.date === date) {
                for (const habitId in entry.habits) {
                    if (entry.habits[habitId as HabitId] === 'done') {
                        completed.add(habitId);
                    }
                }
            }
        });
        return completed;
    }, [entries]);

    return { entries, trashedEntries, addEntry, updateEntry, deleteEntry, getEntry, restoreEntry, emptyTrash, getCompletedHabitsForDay };
};

export { useJournal };
