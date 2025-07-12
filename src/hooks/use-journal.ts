
'use client';

import { useState, useEffect } from 'react';

type MoodState = 'happy' | 'neutral' | 'sad' | null;
type HabitState = 'good' | 'neutral' | 'bad' | 'done' | null;

export type JournalEntry = {
    id: string;
    date: string; // YYYY-MM-DD
    reflection: string;
    tags: string;
    effort: number;
    prompt: string;
    mood: MoodState;
    affirmation: string;
    habits: Record<string, HabitState>;
    category: string;
};

const useJournal = () => {
    const [entries, setEntries] = useState<JournalEntry[]>([]);

    useEffect(() => {
        try {
            const savedEntries = window.localStorage.getItem('journalEntries');
            if (savedEntries) {
                setEntries(JSON.parse(savedEntries));
            }
        } catch (error) {
            console.error("Failed to load journal entries from localStorage", error);
        }
    }, []);

    const saveEntries = (newEntries: JournalEntry[]) => {
        try {
            // Sort entries by date before saving
            const sortedEntries = newEntries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            setEntries(sortedEntries);
            window.localStorage.setItem('journalEntries', JSON.stringify(sortedEntries));
        } catch (error) {
            console.error("Failed to save journal entries to localStorage", error);
        }
    };

    const addEntry = (newEntry: JournalEntry) => {
        saveEntries([...entries, newEntry]);
    };

    const updateEntry = (id: string, updatedEntry: JournalEntry) => {
        const newEntries = entries.map(entry => (entry.id === id ? updatedEntry : entry));
        saveEntries(newEntries);
    };

    const getEntry = (id: string) => {
        return entries.find(entry => entry.id === id);
    };

    return { entries, addEntry, updateEntry, getEntry };
};

export { useJournal };
