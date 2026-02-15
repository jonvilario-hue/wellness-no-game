
'use client';

import { useState, useEffect, useCallback } from 'react';

const CALENDAR_TRACKER_KEY = 'calendar-completion-tracker';

export const useCalendarTracker = () => {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedData = window.localStorage.getItem(CALENDAR_TRACKER_KEY);
      if (savedData) {
        setCompletedDays(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Failed to load calendar tracker data from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  const saveCompletedDays = useCallback((days: number[]) => {
    try {
      setCompletedDays(days);
      window.localStorage.setItem(CALENDAR_TRACKER_KEY, JSON.stringify(days));
    } catch (error) {
      console.error("Failed to save calendar tracker data to localStorage", error);
    }
  }, []);

  const toggleDayCompletion = useCallback((day: number) => {
    const newCompletedDays = completedDays.includes(day)
      ? completedDays.filter(d => d !== day)
      : [...completedDays, day];
    saveCompletedDays(newCompletedDays);
  }, [completedDays, saveCompletedDays]);

  return { completedDays, toggleDayCompletion, isLoaded };
};
