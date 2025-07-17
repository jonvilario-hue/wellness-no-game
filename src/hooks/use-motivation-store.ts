
'use client';

import { create } from 'zustand';
import { messages, type MessageTrigger } from '@/data/motivational-messages';
import type { JournalEntry, HabitId } from './use-journal';

type MotivationState = {
  message: string | null;
  isVisible: boolean;
  selectMessage: (data: {
    journalEntries: JournalEntry[];
    completedHabits: Record<string, HabitId[]>;
    pomodoroCycles: number;
  }) => void;
  hideMessage: () => void;
  showMessage: (message: string) => void;
};

const getRandomMessage = (trigger: MessageTrigger): string => {
  const categoryMessages = messages[trigger];
  return categoryMessages[Math.floor(Math.random() * categoryMessages.length)];
};

// Determines the most relevant message based on a data-driven priority
const determineMessageTrigger = (data: {
  journalEntries: JournalEntry[];
  completedHabits: Record<string, HabitId[]>;
  pomodoroCycles: number;
}): MessageTrigger => {
  const todayStr = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
  const yesterdayStr = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
  
  // 1. Check Mood
  const todayMoodEntry = data.journalEntries.find(e => e.date === todayStr && e.mood !== null);
  if (todayMoodEntry) {
    if (todayMoodEntry.mood! < 2) return 'low_mood';
    if (todayMoodEntry.mood! > 2) return 'high_mood';
  }

  // 2. Check Habit Streaks
  const todaysHabits = data.completedHabits[todayStr]?.length || 0;
  const yesterdaysHabits = data.completedHabits[yesterdayStr]?.length || 0;
  if (todaysHabits > 0 && yesterdaysHabits > 0) return 'habit_streak';
  if (todaysHabits === 0 && yesterdaysHabits > 0) return 'missed_habit';

  // 3. Check Focus Timer Usage
  if (data.pomodoroCycles > 0) return 'focus_used';

  // 4. Check Journal Usage
  const todayJournal = data.journalEntries.find(e => e.date === todayStr && (e.field1 || e.field2 || e.field3));
  if (todayJournal) return 'journal_used';

  // 5. Time of Day
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour > 18) return 'evening';
  
  // 6. Default Fallback
  return 'no_activity';
};

export const useMotivationStore = create<MotivationState>((set, get) => ({
  message: null,
  isVisible: false,
  
  selectMessage: (data) => {
    // Only show a new message if the current one is not visible
    if (!get().isVisible) {
      const trigger = determineMessageTrigger(data);
      const newMessage = getRandomMessage(trigger);
      set({ message: newMessage, isVisible: true });
    }
  },

  hideMessage: () => {
    set({ isVisible: false });
  },

  showMessage: (message) => {
    set({ message, isVisible: true });
  },
}));
