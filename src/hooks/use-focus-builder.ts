
'use client';

import { useState, useEffect, useCallback } from 'react';
import { chcDomains } from '@/types';
import type { CHCDomain } from '@/types';

const FOCUS_BUILDER_KEY = 'focusBuilderState';
const CYCLE_LENGTH = 30; // days

// The default rotation order of domains
const focusRotation: CHCDomain[] = ['Gwm', 'Gf', 'EF', 'Gs', 'Gc', 'Gv', 'Ga', 'Glr'];

type FocusBuilderState = {
  cycleStartDate: string; // ISO string for the start date of the current cycle
  manualOverrideDomain: CHCDomain | null; // If user manually selected a domain
};

export const useFocusBuilder = () => {
  const [state, setState] = useState<FocusBuilderState | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let storedState: FocusBuilderState | null = null;
    try {
      const item = window.localStorage.getItem(FOCUS_BUILDER_KEY);
      if (item) {
        storedState = JSON.parse(item);
      }
    } catch (error) {
      console.error('Failed to load focus builder state from localStorage', error);
    }
    
    const today = new Date();
    const cycleStartDate = storedState ? new Date(storedState.cycleStartDate) : new Date(0);
    const diffDays = (today.getTime() - cycleStartDate.getTime()) / (1000 * 3600 * 24);

    if (!storedState || diffDays >= CYCLE_LENGTH) {
      // If cycle is over, determine the next domain in the sequence
      const lastFocus = storedState?.manualOverrideDomain || getFocusDomainForDate(cycleStartDate);
      const lastIndex = focusRotation.indexOf(lastFocus);
      const nextIndex = (lastIndex + 1) % focusRotation.length;
      
      const newState: FocusBuilderState = {
        cycleStartDate: today.toISOString(),
        manualOverrideDomain: null, // Reset manual override on new cycle
      };
      setState(newState);
      try {
        window.localStorage.setItem(FOCUS_BUILDER_KEY, JSON.stringify(newState));
      } catch (error) {
         console.error('Failed to save focus builder state to localStorage', error);
      }
    } else {
      setState(storedState);
    }
    setIsLoaded(true);
  }, []);

  const getFocusDomainForDate = (date: Date): CHCDomain => {
    const monthIndex = date.getMonth(); // 0-11
    return focusRotation[monthIndex % focusRotation.length];
  };

  const setManualFocus = useCallback((domainKey: CHCDomain) => {
    // When a user manually selects a focus, we reset the cycle start date to today
    // and store their choice as the manual override.
    const newState: FocusBuilderState = {
      cycleStartDate: new Date().toISOString(),
      manualOverrideDomain: domainKey,
    };
    setState(newState);
    try {
      window.localStorage.setItem(FOCUS_BUILDER_KEY, JSON.stringify(newState));
    } catch (error) {
      console.error('Failed to save manual focus state', error);
    }
  }, []);

  const getAutomaticFocus = (startDate: Date): CHCDomain => {
     if (!state) return focusRotation[0];
     // Find the last domain to determine the next one
     const lastStoredState = state;
     const lastFocus = lastStoredState.manualOverrideDomain || getFocusDomainForDate(new Date(lastStoredState.cycleStartDate));
     const lastIndex = focusRotation.indexOf(lastFocus);
     const nextIndex = (lastIndex + 1) % focusRotation.length;
     return focusRotation[nextIndex];
  }

  const cycleStartDate = new Date(state?.cycleStartDate || Date.now());

  const currentFocusKey = state?.manualOverrideDomain || getAutomaticFocus(cycleStartDate);
  const currentFocus = chcDomains.find(d => d.key === currentFocusKey) || chcDomains[0];
  
  const today = new Date();
  const daysCompleted = Math.floor((today.getTime() - cycleStartDate.getTime()) / (1000 * 3600 * 24));
  const progress = Math.min(100, (daysCompleted / CYCLE_LENGTH) * 100);
  
  return {
    isLoaded,
    currentFocus,
    daysCompleted: Math.min(daysCompleted, CYCLE_LENGTH),
    cycleLength: CYCLE_LENGTH,
    progress,
    setManualFocus,
  };
};
