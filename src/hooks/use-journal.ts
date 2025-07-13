
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

// Share state across components that use this hook
let memoryState: {
    entries: JournalEntry[];
    trashedEntries: TrashedJournalEntry[];
    completedHabits: DailyHabits;
    selectedEntry: JournalEntry | null;
} = {
    entries: [],
    trashedEntries: [],
    completedHabits: {},
    selectedEntry: null,
};
const listeners: Set<Function> = new Set();

const useJournal = () => {
    const [state, setState] = useState(memoryState);
    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = (newState: Partial<typeof memoryState>) => {
        memoryState = { ...memoryState, ...newState };
        listeners.forEach(listener => listener(memoryState));
    }

    useEffect(() => {
        listeners.add(setState);
        return () => { listeners.delete(setState) };
    }, []);

    useEffect(() => {
        let savedEntries: JournalEntry[] = [];
        let savedTrashedEntries: TrashedJournalEntry[] = [];
        let savedHabits: DailyHabits = {};
        let entriesExist = false;

        try {
            const savedEntriesStr = window.localStorage.getItem('journalEntries');
            if (savedEntriesStr !== null) {
                entriesExist = true;
                const parsed = JSON.parse(savedEntriesStr);
                if (Array.isArray(parsed)) {
                    savedEntries = parsed;
                }
            }

            const savedTrashedEntriesStr = window.localStorage.getItem('journalTrashedEntries');
            if (savedTrashedEntriesStr) {
                 const parsed = JSON.parse(savedTrashedEntriesStr);
                 if (Array.isArray(parsed)) {
                    const thirtyDaysAgo = Date.now() - TRASH_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
                    savedTrashedEntries = parsed.filter((item: TrashedJournalEntry) => item.deletedAt > thirtyDaysAgo);
                }
            }
            
            const savedHabitsStr = window.localStorage.getItem('journalCompletedHabits');
            if (savedHabitsStr !== null) {
                const parsed = JSON.parse(savedHabitsStr);
                Object.keys(parsed).forEach(date => {
                    parsed[date] = new Set(parsed[date]);
                });
                savedHabits = parsed;
            }

        } catch (error) {
            console.error("Failed to load journal from localStorage", error);
        }
        
        if (!entriesExist && window.localStorage.getItem('journalInitialized') !== 'true') {
            const { entries: seedEntries, habits: seedHabits } = createSeedData();
            savedEntries = seedEntries;
            savedHabits = seedHabits;
            window.localStorage.setItem('journalEntries', JSON.stringify(seedEntries));
            const serializableHabits = { [Object.keys(seedHabits)[0]]: Array.from(Object.values(seedHabits)[0]) };
            window.localStorage.setItem('journalCompletedHabits', JSON.stringify(serializableHabits));
        }

        window.localStorage.setItem('journalInitialized', 'true');
        
        dispatch({
            entries: savedEntries,
            trashedEntries: savedTrashedEntries,
            completedHabits: savedHabits,
            selectedEntry: savedEntries.length > 0 ? savedEntries[0] : null
        });

        setIsLoaded(true);

    }, []);

    const saveEntries = (newEntries: JournalEntry[]) => {
        try {
            const sortedEntries = newEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            dispatch({ entries: sortedEntries });
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
            dispatch({ trashedEntries: updatedTrashedEntries });
            window.localStorage.setItem('journalTrashedEntries', JSON.stringify(updatedTrashedEntries));
        } catch (error) {
            console.error("Failed to save trashed entries to localStorage", error);
        }
    }
    
    const saveCompletedHabits = (newHabits: DailyHabits) => {
        try {
            dispatch({ completedHabits: newHabits });
            const serializableHabits: Record<string, HabitId[]> = {};
            for (const date in newHabits) {
                serializableHabits[date] = Array.from(newHabits[date]);
            }
            window.localStorage.setItem('journalCompletedHabits', JSON.stringify(serializableHabits));
        } catch (error) {
            console.error("Failed to save habits to localStorage", error);
        }
    };
    
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

    const createNewEntry = useCallback(() => {
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
        };
    }, [getDefaultFrequency]);

    const addEntry = (newEntry: JournalEntry) => {
        saveEntries([...state.entries, newEntry]);
    };

    const updateEntry = (id: string, updatedEntry: JournalEntry) => {
        const newEntries = state.entries.map(entry => (entry.id === id ? updatedEntry : entry));
        saveEntries(newEntries);
    };

    const deleteEntry = (id: string) => {
        const entryToTrash = state.entries.find(entry => entry.id === id);
        if (entryToTrash) {
            const newEntries = state.entries.filter(entry => entry.id !== id);
            const trashedEntry: TrashedJournalEntry = { ...entryToTrash, deletedAt: Date.now() };
            const newTrashedEntries = [trashedEntry, ...state.trashedEntries];
            saveEntries(newEntries);
            saveTrashedEntries(newTrashedEntries);
        }
    };
    
    const restoreEntry = (id: string) => {
        const entryToRestore = state.trashedEntries.find(entry => entry.id === id);
        if (entryToRestore) {
            const newTrashedEntries = state.trashedEntries.filter(entry => entry.id !== id);
            const { deletedAt, ...originalEntry } = entryToRestore;
            const newEntries = [...state.entries, originalEntry];
            saveTrashedEntries(newTrashedEntries);
            saveEntries(newEntries);
        }
    };
    
    const emptyTrash = () => {
        saveTrashedEntries([]);
    };

    const getEntry = (id: string) => {
        return state.entries.find(entry => entry.id === id);
    };

    const toggleHabitForDay = useCallback((date: string, habitId: HabitId) => {
        const newHabits = { ...state.completedHabits };
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
    }, [state.completedHabits]);

    const setSelectedEntry = (entry: JournalEntry | null) => {
        dispatch({ selectedEntry: entry });
    }

    return { ...state, addEntry, updateEntry, deleteEntry, getEntry, restoreEntry, emptyTrash, toggleHabitForDay, isLoaded, setSelectedEntry, createNewEntry };
};

export { useJournal };
