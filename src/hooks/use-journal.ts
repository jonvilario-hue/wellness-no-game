'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { JournalCategory } from '@/lib/journal-config';
import { allHabits as defaultHabits, journalConfig } from '@/lib/journal-config';

export type MoodState = number | null; // 0-4 scale, null if not set
export type ReflectionFrequency = 'daily' | 'weekly' | 'monthly';

export type HabitId = string;

export type Habit = {
  id: HabitId;
  label: string;
  category: JournalCategory;
};

export type JournalEntry = {
    id: string;
    label: string;
    date: string; // YYYY-MM-DD
    category: JournalCategory;
    frequency: ReflectionFrequency;
    field1: string;
    field2: string;
    field3: string;
    affirmations: string[];
    tags: string;
    effort: number; // Focus score: 0 = unrated, 1-5 = rated
    mood: MoodState;
    moodNote?: string;
    focusContext: string | null; 
    focusTags?: string[]; 
    bookmarked?: boolean;
};

export type TrashedJournalEntry = JournalEntry & {
    deletedAt: number; 
};

const MAX_TRASH_ITEMS = 100;
const TRASH_EXPIRATION_DAYS = 30;

export const getFrequencyForDate = (date: Date): ReflectionFrequency => {
    const d = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
    const dayOfMonth = d.getDate();
    const dayOfWeek = d.getDay(); 

    if (dayOfMonth === 1) return 'monthly';
    if (dayOfWeek === 0) return 'weekly';
    return 'daily';
};

const createSeedData = (): { entries: JournalEntry[], habits: Record<string, HabitId[]>, habitConfig: Habit[] } => {
    const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
    const category: JournalCategory = 'Notebook';
    const frequency = getFrequencyForDate(new Date());
    const initialHabits: Habit[] = Object.values(defaultHabits);

    return {
        entries: [
            {
                id: `${today}-${category}-${frequency}`,
                label: `Today's Notebook`,
                date: today,
                category: category,
                frequency: frequency,
                field1: '',
                field2: '',
                field3: '',
                affirmations: [],
                tags: '',
                effort: 0,
                mood: null,
                moodNote: '',
                focusContext: 'Initial entry',
                focusTags: [],
                bookmarked: false,
            },
        ],
        habits: {
            [today]: []
        },
        habitConfig: initialHabits,
    };
};

interface JournalState {
    entries: JournalEntry[];
    trashedEntries: TrashedJournalEntry[];
    habits: Habit[];
    completedHabits: Record<string, HabitId[]>;
    selectedEntry: JournalEntry | null;
    _hasHydrated: boolean;

    setHasHydrated: (hydrated: boolean) => void;
    findOrCreateEntry: (options: { date: string, category: JournalCategory, frequency: ReflectionFrequency, forceNew?: boolean }) => JournalEntry;
    addEntry: (newEntry: JournalEntry) => JournalEntry;
    updateEntry: (id: string, updatedEntry: Partial<JournalEntry>) => void;
    deleteEntry: (id: string) => void;
    restoreEntry: (id: string) => void;
    deleteFromTrashPermanently: (id: string) => void;
    emptyTrash: () => void;
    toggleHabitForDay: (date: string, habitId: HabitId) => void;
    toggleJournalBookmark: (id: string) => void;
    addHabit: (habitData: Omit<Habit, 'id'>) => void;
    updateHabit: (id: HabitId, habitData: Partial<Omit<Habit, 'id'>>) => void;
    removeHabit: (id: HabitId) => void;
    resetHabits: () => void;
    createNewEntry: () => JournalEntry;
    setSelectedEntry: (entry: JournalEntry | null) => void;
}

const createNewEntryObject = (date: string, category: JournalCategory, frequency: ReflectionFrequency): JournalEntry => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString().slice(-2);
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    const formattedDate = `${day}/${month}/${year}`;
    const timeStamp = `${hours}:${minutes}`;

    return {
        id: `new-${Date.now()}`,
        label: `Entry ${formattedDate} ${timeStamp}`,
        date,
        category,
        frequency,
        field1: '',
        field2: '',
        field3: '',
        affirmations: [],
        tags: '',
        effort: 0,
        mood: null,
        moodNote: '',
        focusContext: null,
        focusTags: [],
        bookmarked: false,
    };
};

export const useJournal = create<JournalState>()(
  persist(
    (set, get) => ({
        entries: [],
        trashedEntries: [],
        habits: [],
        completedHabits: {},
        selectedEntry: null,
        _hasHydrated: false,

        setHasHydrated: (hydrated) => set({ _hasHydrated: hydrated }),
        
        findOrCreateEntry: ({ date, category, frequency, forceNew = false }) => {
            if (forceNew) {
                return createNewEntryObject(date, category, frequency);
            }
            const existingEntry = get().entries.find(
                (e) => e.date === date && e.category === category && e.frequency === frequency
            );
            
            if (existingEntry) return existingEntry;
            
            return {
                id: `${date}-${category}-${frequency}`,
                label: journalConfig[category]?.title || 'New Entry',
                date,
                category,
                frequency,
                field1: '',
                field2: '',
                field3: '',
                affirmations: [],
                tags: '',
                effort: 0,
                mood: null,
                moodNote: '',
                focusContext: category,
                focusTags: [],
                bookmarked: false,
            };
        },

        addEntry: (newEntry) => {
            const finalId = `${newEntry.date}-${newEntry.category}-${newEntry.frequency}`;
            const entryWithFinalId = { ...newEntry, id: finalId, bookmarked: newEntry.bookmarked || false };
            set(state => ({
                entries: [...state.entries.filter(e => e.id !== finalId), entryWithFinalId].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            }));
            return entryWithFinalId;
        },

        updateEntry: (id, updatedEntry) => {
            set(state => ({
                entries: state.entries.map(entry => (entry.id === id ? { ...entry, ...updatedEntry } : entry))
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
            set(state => ({ trashedEntries: state.trashedEntries.filter(entry => entry.id !== id) }));
        },

        emptyTrash: () => set({ trashedEntries: [] }),

        toggleHabitForDay: (date, habitId) => {
            set(state => {
                const habitsForDay = new Set(state.completedHabits[date] || []);
                if (habitsForDay.has(habitId)) habitsForDay.delete(habitId);
                else habitsForDay.add(habitId);
                return {
                    completedHabits: {
                        ...state.completedHabits,
                        [date]: Array.from(habitsForDay)
                    }
                };
            });
        },
        
        toggleJournalBookmark: (id: string) => {
            set(state => ({
                entries: state.entries.map(entry =>
                    entry.id === id ? { ...entry, bookmarked: !entry.bookmarked } : entry
                ),
            }));
        },

        addHabit: (habitData) => {
            set(state => ({
                habits: [...state.habits, { ...habitData, id: `custom-${Date.now()}` }]
            }));
        },

        updateHabit: (id, habitData) => {
            set(state => ({
                habits: state.habits.map(h => h.id === id ? { ...h, ...habitData } : h)
            }));
        },

        removeHabit: (id) => {
            set(state => ({
                habits: state.habits.filter(h => h.id !== id)
            }));
        },

        resetHabits: () => {
            set({ habits: Object.values(defaultHabits) });
        },
        
        createNewEntry: () => {
            const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
            return createNewEntryObject(today, 'Notebook', getFrequencyForDate(new Date()));
        },

        setSelectedEntry: (entry) => set({ selectedEntry: entry }),
    }),
    {
      name: 'journal-storage-v2',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
          if (!state) return;
          if (!state.habits || state.habits.length === 0 || state.entries.length === 0) {
              const { entries, habits, habitConfig } = createSeedData();
              state.entries = entries;
              state.completedHabits = habits;
              state.habits = habitConfig;
          }
          const thirtyDaysAgo = Date.now() - TRASH_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
          state.trashedEntries = (state.trashedEntries || []).filter(item => item.deletedAt > thirtyDaysAgo);
          state.setHasHydrated(true);
      },
    }
  )
);

export const useHydratedJournalStore = () => {
    const store = useJournal();
    const hasHydrated = useJournal((s) => s._hasHydrated);
    return { ...store, hasHydrated };
};
