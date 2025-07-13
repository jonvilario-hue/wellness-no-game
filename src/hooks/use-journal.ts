
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { JournalCategory, HabitId } from '@/lib/journal-config';

export type MoodState = 'happy' | 'neutral' | 'sad' | null;
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
};

export type TrashedJournalEntry = JournalEntry & {
    deletedAt: number; // UTC timestamp in milliseconds
};

export type DailyHabits = Record<string, Set<HabitId>>; // YYYY-MM-DD -> Set of completed habit IDs

const MAX_TRASH_ITEMS = 100;
const TRASH_EXPIRATION_DAYS = 30;

const createSeedData = (): { entries: JournalEntry[], habits: DailyHabits } => {
    const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .split('T')[0];
    
    const seedHabits = new Set<HabitId>();
    seedHabits.add('reflect_challenge');
    seedHabits.add('learn_from_discomfort');

    return {
        entries: [
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
            },
        ],
        habits: {
            [today]: seedHabits
        }
    };
};

const useJournal = () => {
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [trashedEntries, setTrashedEntries] = useState<TrashedJournalEntry[]>([]);
    const [completedHabits, setCompletedHabits] = useState<DailyHabits>({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let savedEntries: JournalEntry[] | null = null;
        let savedTrashedEntries: TrashedJournalEntry[] = [];
        let savedHabits: DailyHabits | null = null;

        try {
            // Load Journal Entries
            const savedEntriesStr = window.localStorage.getItem('journalEntries');
            if (savedEntriesStr) {
                const parsed = JSON.parse(savedEntriesStr);
                if (Array.isArray(parsed)) {
                    savedEntries = parsed;
                }
            }

            // Load Trashed Entries
            const savedTrashedEntriesStr = window.localStorage.getItem('journalTrashedEntries');
            if (savedTrashedEntriesStr) {
                 const parsed = JSON.parse(savedTrashedEntriesStr);
                 if (Array.isArray(parsed)) {
                    const thirtyDaysAgo = Date.now() - TRASH_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
                    savedTrashedEntries = parsed.filter((item: TrashedJournalEntry) => item.deletedAt > thirtyDaysAgo);
                }
            }
            
            // Load Completed Habits
            const savedHabitsStr = window.localStorage.getItem('journalCompletedHabits');
            if (savedHabitsStr) {
                const parsed = JSON.parse(savedHabitsStr);
                // Convert arrays back to Sets
                Object.keys(parsed).forEach(date => {
                    parsed[date] = new Set(parsed[date]);
                });
                savedHabits = parsed;
            }

        } catch (error) {
            console.error("Failed to load journal from localStorage", error);
        }
        
        const isFirstTimeUser = savedEntries === null && savedHabits === null;

        if (isFirstTimeUser) {
            const { entries: seedEntries, habits: seedHabits } = createSeedData();
            setEntries(seedEntries);
            setCompletedHabits(seedHabits);
            window.localStorage.setItem('journalEntries', JSON.stringify(seedEntries));
            // For habits, we need to convert Set to array for JSON serialization
            const serializableHabits = { [Object.keys(seedHabits)[0]]: Array.from(Object.values(seedHabits)[0]) };
            window.localStorage.setItem('journalCompletedHabits', JSON.stringify(serializableHabits));
        } else {
            setEntries(savedEntries || []);
            setCompletedHabits(savedHabits || {});
        }
        
        setTrashedEntries(savedTrashedEntries);
        setIsLoaded(true);

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
    
    const saveTrashedEntries = (newTrashedEntries: TrashedJournalEntry[]) => {
         try {
            let updatedTrashedEntries = [...newTrashedEntries];
            while (updatedTrashedEntries.length > MAX_TRASH_ITEMS) {
                updatedTrashedEntries.shift();
            }
            setTrashedEntries(updatedTrashedEntries);
            window.localStorage.setItem('journalTrashedEntries', JSON.stringify(updatedTrashedEntries));
        } catch (error) {
            console.error("Failed to save trashed entries to localStorage", error);
        }
    }
    
    const saveCompletedHabits = (newHabits: DailyHabits) => {
        try {
            setCompletedHabits(newHabits);
            // Convert sets to arrays for JSON serialization
            const serializableHabits: Record<string, HabitId[]> = {};
            for (const date in newHabits) {
                serializableHabits[date] = Array.from(newHabits[date]);
            }
            window.localStorage.setItem('journalCompletedHabits', JSON.stringify(serializableHabits));
        } catch (error) {
            console.error("Failed to save habits to localStorage", error);
        }
    };

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
            const trashedEntry: TrashedJournalEntry = { ...entryToTrash, deletedAt: Date.now() };
            const newTrashedEntries = [trashedEntry, ...trashedEntries];
            saveEntries(newEntries);
            saveTrashedEntries(newTrashedEntries);
        }
    };
    
    const restoreEntry = (id: string) => {
        const entryToRestore = trashedEntries.find(entry => entry.id === id);
        if (entryToRestore) {
            const newTrashedEntries = trashedEntries.filter(entry => entry.id !== id);
            const { deletedAt, ...originalEntry } = entryToRestore;
            const newEntries = [...entries, originalEntry];
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

    const toggleHabitForDay = useCallback((date: string, habitId: HabitId) => {
        const newHabits = { ...completedHabits };
        if (!newHabits[date]) {
            newHabits[date] = new Set();
        }
        
        const dateHabits = newHabits[date];
        if (dateHabits.has(habitId)) {
            dateHabits.delete(habitId);
        } else {
            dateHabits.add(habitId);
        }
        
        saveCompletedHabits(newHabits);
    }, [completedHabits]);


    return { entries, trashedEntries, addEntry, updateEntry, deleteEntry, getEntry, restoreEntry, emptyTrash, completedHabits, toggleHabitForDay, isLoaded };
};

export { useJournal };
