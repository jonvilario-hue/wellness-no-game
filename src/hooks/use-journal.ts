
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { JournalCategory } from '@/lib/journal-config';
import { allHabits as defaultHabits } from '@/lib/journal-config';
import type { LucideIcon } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

export type MoodState = 'happy' | 'neutral' | 'sad' | null;
export type ReflectionFrequency = 'daily' | 'weekly' | 'monthly';

export type HabitId = string;

export type Habit = {
  id: HabitId;
  label: string;
  icon: LucideIcon;
  category: JournalCategory;
};

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

const createSeedData = (): { entries: JournalEntry[], habits: DailyHabits, habitConfig: Habit[] } => {
    const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
    const category: JournalCategory = 'Growth & Challenge Reflection';
    const frequency = getFrequencyForDate(new Date());

    const initialHabits: Habit[] = Object.values(defaultHabits);

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
        },
        habitConfig: initialHabits,
    };
};

// --- Zustand Store Definition ---

interface JournalState {
    entries: JournalEntry[];
    trashedEntries: TrashedJournalEntry[];
    habits: Habit[];
    completedHabits: DailyHabits;
    selectedEntry: JournalEntry | null;
    hasHydrated: boolean;

    // Actions
    setHasHydrated: (hydrated: boolean) => void;
    findOrCreateEntry: (date: string, category: JournalCategory, frequency: ReflectionFrequency) => JournalEntry;
    addEntry: (newEntry: JournalEntry) => JournalEntry;
    updateEntry: (id: string, updatedEntry: JournalEntry) => void;
    deleteEntry: (id: string) => void;
    restoreEntry: (id: string) => void;
    deleteFromTrashPermanently: (id: string) => void;
    emptyTrash: () => void;
    toggleHabitForDay: (date: string, habitId: HabitId) => void;
    addHabit: (habitData: Omit<Habit, 'id' | 'icon'>) => void;
    updateHabit: (id: HabitId, habitData: Partial<Omit<Habit, 'id' | 'icon'>>) => void;
    removeHabit: (id: HabitId) => void;
    resetHabits: () => void;
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
        habits: [],
        completedHabits: {},
        selectedEntry: null,
        hasHydrated: false,

        setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),
        
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
        
        addHabit: (habitData) => {
            set(state => {
                const newHabit: Habit = { 
                    ...habitData, 
                    id: `custom-${Date.now()}`,
                    icon: defaultHabits['reflect_challenge'].icon, // Placeholder, will be ignored in UI
                };
                return {
                    habits: [...state.habits, newHabit]
                };
            });
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
            return createNewEntryObject(today, 'Growth & Challenge Reflection', getFrequencyForDate(new Date()));
        },

        setSelectedEntry: (entry) => set({ selectedEntry: entry }),
    }),
    {
      name: 'journal-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
          if (!state) return;
          // Check if seed data needs to be added
          if (!state.habits || state.habits.length === 0) {
              const { entries, habits, habitConfig } = createSeedData();
              state.entries = entries;
              state.completedHabits = habits;
              state.habits = habitConfig;
          }
          
          // Cleanup expired trash
          const thirtyDaysAgo = Date.now() - TRASH_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
          state.trashedEntries = (state.trashedEntries || []).filter(item => item.deletedAt > thirtyDaysAgo);

          state.setHasHydrated(true);
      },
    }
  )
);

// Custom hook to safely access the store's state only after hydration
export const useHydratedJournalStore = () => {
    const store = useJournal();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
      setHydrated(true);
    }, []);

    const state = useMemo(() => {
      if (typeof window === "undefined" || !hydrated) {
        return {
            entries: [],
            trashedEntries: [],
            habits: [],
            completedHabits: {},
            selectedEntry: null,
            hasHydrated: false,
            // Return dummy functions to prevent errors during SSR
            setHasHydrated: () => {},
            findOrCreateEntry: (date: string, category: JournalCategory, frequency: ReflectionFrequency) => createNewEntryObject(date, category, frequency),
            addEntry: (entry: JournalEntry) => entry,
            updateEntry: () => {},
            deleteEntry: () => {},
            restoreEntry: () => {},
            deleteFromTrashPermanently: () => {},
            emptyTrash: () => {},
            toggleHabitForDay: () => {},
            addHabit: () => {},
            updateHabit: () => {},
            removeHabit: () => {},
            resetHabits: () => {},
            createNewEntry: () => createNewEntryObject(new Date().toISOString().split('T')[0], 'Growth & Challenge Reflection', 'daily'),
            setSelectedEntry: () => {},
        };
      }
      return store;
    }, [hydrated, store]);

    return state;
};
