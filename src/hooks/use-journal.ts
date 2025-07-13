
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { JournalCategory, HabitId } from '@/lib/journal-config';

export type MoodState = 'happy' | 'neutral' | 'sad' | null;
export type ReflectionFrequency = 'daily' | 'weekly' | 'monthly';

export type JournalEntry = {
    id: string;
    date: string; // YYYY-MM-DD
    category: JournalCategory;
    frequency: ReflectionFrequency;
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

export type DailyHabits = Record<string, HabitId[]>; // YYYY-MM-DD -> Array of completed habit IDs

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
            [today]: ['reflect_challenge', 'learn_from_discomfort']
        }
    };
};

// --- Zustand Store Definition ---

interface JournalState {
    entries: JournalEntry[];
    trashedEntries: TrashedJournalEntry[];
    completedHabits: DailyHabits;
    selectedEntry: JournalEntry | null;
    isLoaded: boolean;

    // Actions
    setLoaded: (loaded: boolean) => void;
    findOrCreateEntry: (date: string, category: JournalCategory, frequency: ReflectionFrequency) => JournalEntry;
    addEntry: (newEntry: JournalEntry) => JournalEntry;
    updateEntry: (id: string, updatedEntry: JournalEntry) => void;
    deleteEntry: (id: string) => void;
    restoreEntry: (id: string) => void;
    deleteFromTrashPermanently: (id: string) => void;
    emptyTrash: () => void;
    toggleHabitForDay: (date: string, habitId: HabitId) => void;
    createNewEntry: () => JournalEntry;
    setSelectedEntry: (entry: JournalEntry | null) => void;
}

const createNewEntryObject = (date: string, category: JournalCategory, frequency: ReflectionFrequency): JournalEntry => ({
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
});

export const useJournal = create<JournalState>()(
    persist(
        (set, get) => ({
            entries: [],
            trashedEntries: [],
            completedHabits: {},
            selectedEntry: null,
            isLoaded: false,

            setLoaded: (loaded) => set({ isLoaded: loaded }),
            
            findOrCreateEntry: (date, category, frequency) => {
                const state = get();
                const existingEntry = state.entries.find(
                    (e) => e.date === date && e.category === category && e.frequency === frequency
                );
                return existingEntry || createNewEntryObject(date, category, frequency);
            },

            addEntry: (newEntry) => {
                const finalId = `${newEntry.date}-${newEntry.category}-${newEntry.frequency}`;
                const entryWithFinalId = { ...newEntry, id: finalId };
                set(state => ({
                    entries: [...state.entries.filter(e => e.id !== finalId), entryWithFinalId].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                }));
                return entryWithFinalId;
            },

            updateEntry: (id, updatedEntry) => {
                set(state => ({
                    entries: state.entries.map(entry => (entry.id === id ? updatedEntry : entry))
                }));
            },

            deleteEntry: (id) => {
                const entryToTrash = get().entries.find(entry => entry.id === id);
                if (entryToTrash) {
                    const trashedEntry: TrashedJournalEntry = { ...entryToTrash, deletedAt: Date.now() };
                    set(state => ({
                        entries: state.entries.filter(entry => entry.id !== id),
                        trashedEntries: [trashedEntry, ...state.trashedEntries].slice(0, MAX_TRASH_ITEMS)
                    }));
                }
            },

            restoreEntry: (id) => {
                const entryToRestore = get().trashedEntries.find(entry => entry.id === id);
                if (entryToRestore) {
                    const { deletedAt, ...originalEntry } = entryToRestore;
                    set(state => ({
                        trashedEntries: state.trashedEntries.filter(entry => entry.id !== id),
                        entries: [...state.entries.filter(e => e.id !== originalEntry.id), originalEntry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    }));
                }
            },

            deleteFromTrashPermanently: (id) => {
                set(state => ({
                    trashedEntries: state.trashedEntries.filter(entry => entry.id !== id)
                }));
            },

            emptyTrash: () => set({ trashedEntries: [] }),

            toggleHabitForDay: (date, habitId) => {
                set(state => {
                    const habitsForDay = new Set(state.completedHabits[date] || []);
                    if (habitsForDay.has(habitId)) {
                        habitsForDay.delete(habitId);
                    } else {
                        habitsForDay.add(habitId);
                    }
                    return {
                        completedHabits: {
                            ...state.completedHabits,
                            [date]: Array.from(habitsForDay)
                        }
                    };
                });
            },
            
            createNewEntry: () => {
                const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
                return createNewEntryObject(today, 'Growth & Challenge Reflection', getFrequencyForDate(new Date()));
            },

            setSelectedEntry: (entry) => set({ selectedEntry: entry }),
        }),
        {
            name: 'journal-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    // Check if seed data needs to be added
                    if (state.entries.length === 0 && !localStorage.getItem('journalInitialized')) {
                        const { entries, habits } = createSeedData();
                        state.entries = entries;
                        state.completedHabits = habits;
                        localStorage.setItem('journalInitialized', 'true');
                    }
                    
                    // Cleanup expired trash
                    const thirtyDaysAgo = Date.now() - TRASH_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
                    state.trashedEntries = state.trashedEntries.filter(item => item.deletedAt > thirtyDaysAgo);

                    state.setLoaded(true);
                }
            },
        }
    )
);
