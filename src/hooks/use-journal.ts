
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { JournalCategory, HabitId } from '@/lib/journal-config';

export type MoodState = 'happy' | 'neutral' | 'sad' | null;
export type ReflectionFrequency = 'daily' | 'weekly' | 'monthly';

export type JournalEntry = {
    id: string; // Composite key: `${date}-${category}-${frequency}` for saved entries
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

export const getFrequencyForDate = (date: Date): ReflectionFrequency => {
    const d = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
    const dayOfMonth = d.getDate();
    const dayOfWeek = d.getDay(); // 0 = Sunday

    if (dayOfMonth === 1) return 'monthly';
    if (dayOfWeek === 0) return 'weekly';
    return 'daily';
};


const createSeedData = (): { entries: JournalEntry[], habits: DailyHabits } => {
    const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
    const category: JournalCategory = 'Growth & Challenge Reflection';
    const frequency = getFrequencyForDate(new Date());

    const seedHabits = new Set<HabitId>();
    seedHabits.add('reflect_challenge');
    seedHabits.add('learn_from_discomfort');

    return {
        entries: [
            {
                id: `${today}-${category}-${frequency}`,
                date: today,
                category: category,
                frequency: frequency,
                field1: 'My main challenge today was getting started with this new app and figuring out all its features!',
                field2: 'I learned that taking a moment to explore and read the descriptions helps a lot. It feels less overwhelming now.',
                field3: 'Next time I start something new, I\'ll give myself more time to just explore without pressure to be productive right away.',
                affirmations: ['I am capable of learning new things.'],
                tags: '#onboarding, #learning, #growth',
                effort: 7,
                mood: null,
            },
        ],
        habits: {
            [today]: seedHabits
        }
    };
};

let memoryState: {
    entries: JournalEntry[];
    trashedEntries: TrashedJournalEntry[];
    completedHabits: DailyHabits;
    selectedEntry: JournalEntry | null; // For external components to set the current entry
} = {
    entries: [],
    trashedEntries: [],
    completedHabits: {},
    selectedEntry: null,
};

const listeners: Set<Function> = new Set();
const subscribe = (callback: Function) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
}

const dispatch = (newState: Partial<typeof memoryState>) => {
    memoryState = { ...memoryState, ...newState };
    listeners.forEach(listener => listener(memoryState));
};

const useJournal = () => {
    const [state, setState] = useState(memoryState);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const unsubscribe = subscribe(setState);
        return unsubscribe;
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
            window.localStorage.setItem('journalInitialized', 'true');
        }

        dispatch({
            entries: savedEntries,
            trashedEntries: savedTrashedEntries,
            completedHabits: savedHabits,
        });

        setIsLoaded(true);

    }, []);

    const saveEntries = useCallback((newEntries: JournalEntry[]) => {
        try {
            const sortedEntries = newEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            dispatch({ entries: sortedEntries });
            window.localStorage.setItem('journalEntries', JSON.stringify(sortedEntries));
        } catch (error) {
            console.error("Failed to save entries to localStorage", error);
        }
    }, []);
    
    const saveTrashedEntries = useCallback((newTrashedEntries: TrashedJournalEntry[]) => {
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
    }, []);
    
    const saveCompletedHabits = useCallback((newHabits: DailyHabits) => {
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
    }, []);
    
    const createNewEntryObject = useCallback((date: string, category: JournalCategory, frequency: ReflectionFrequency): JournalEntry => {
        return {
          id: `new-${Date.now()}`,
          date,
          category,
          frequency,
          field1: '',
          field2: '',
          field3: '',
          affirmations: [],
          tags: '',
          effort: 7,
          mood: null,
        };
    }, []);

    const findOrCreateEntry = useCallback((date: string, category: JournalCategory, frequency: ReflectionFrequency): JournalEntry => {
        const existingEntry = memoryState.entries.find(
          (e) => e.date === date && e.category === category && e.frequency === frequency
        );
    
        if (existingEntry) {
          return existingEntry;
        }
    
        return createNewEntryObject(date, category, frequency);
    }, [createNewEntryObject]);


    const addEntry = useCallback((newEntry: JournalEntry) => {
        const finalId = `${newEntry.date}-${newEntry.category}-${newEntry.frequency}`;
        const entryWithFinalId = { ...newEntry, id: finalId };
        
        const newEntries = [...memoryState.entries.filter(e => e.id !== finalId), entryWithFinalId];
        saveEntries(newEntries);
        return entryWithFinalId;
    }, [saveEntries]);

    const updateEntry = useCallback((id: string, updatedEntry: JournalEntry) => {
        const newEntries = memoryState.entries.map(entry => (entry.id === id ? updatedEntry : entry));
        saveEntries(newEntries);
    }, [saveEntries]);

    const deleteEntry = useCallback((id: string) => {
        const entryToTrash = memoryState.entries.find(entry => entry.id === id);
        if (entryToTrash) {
            const newEntries = memoryState.entries.filter(entry => entry.id !== id);
            const trashedEntry: TrashedJournalEntry = { ...entryToTrash, deletedAt: Date.now() };
            const newTrashedEntries = [trashedEntry, ...memoryState.trashedEntries];
            saveEntries(newEntries);
            saveTrashedEntries(newTrashedEntries);
        }
    }, [saveEntries, saveTrashedEntries]);
    
    const restoreEntry = useCallback((id: string) => {
        const entryToRestore = memoryState.trashedEntries.find(entry => entry.id === id);
        if (entryToRestore) {
            const newTrashedEntries = memoryState.trashedEntries.filter(entry => entry.id !== id);
            const { deletedAt, ...originalEntry } = entryToRestore;
            const newEntries = [...memoryState.entries.filter(e => e.id !== originalEntry.id), originalEntry];
            saveTrashedEntries(newTrashedEntries);
            saveEntries(newEntries);
        }
    }, [saveEntries, saveTrashedEntries]);

    const deleteFromTrashPermanently = useCallback((id: string) => {
        const newTrashedEntries = memoryState.trashedEntries.filter(entry => entry.id !== id);
        saveTrashedEntries(newTrashedEntries);
    }, [saveTrashedEntries]);
    
    const emptyTrash = useCallback(() => {
        saveTrashedEntries([]);
    }, [saveTrashedEntries]);

    const toggleHabitForDay = useCallback((date: string, habitId: HabitId) => {
        const newHabits = { ...memoryState.completedHabits };
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
    }, [saveCompletedHabits]);

    const createNewEntry = useCallback(() => {
        const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
        const newEntry = createNewEntryObject(today, 'Growth & Challenge Reflection', getFrequencyForDate(new Date()));
        dispatch({ selectedEntry: newEntry });
        return newEntry;
    }, [createNewEntryObject]);

    const setSelectedEntry = useCallback((entry: JournalEntry) => {
        dispatch({ selectedEntry: entry });
    }, []);

    const stableFns = useMemo(() => ({
        addEntry,
        updateEntry,
        deleteEntry,
        restoreEntry,
        deleteFromTrashPermanently,
        emptyTrash,
        toggleHabitForDay,
        findOrCreateEntry,
        createNewEntry,
        setSelectedEntry,
    }), [addEntry, updateEntry, deleteEntry, restoreEntry, deleteFromTrashPermanently, emptyTrash, toggleHabitForDay, findOrCreateEntry, createNewEntry, setSelectedEntry]);


    return { ...state, ...stableFns, isLoaded };
};

useJournal.subscribe = subscribe;

export { useJournal };
