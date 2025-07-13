
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
    // This provides a consistent rotation based on the month
    const monthIndex = date.getMonth(); // 0-11
    return focusRotation[monthIndex % focusRotation.length];
  };

  const setManualFocus = useCallback((domainKey: CHCDomain) => {
    const newState: FocusBuilderState = {
      // Keep the original cycle start date unless we want to reset the timer on manual change
      cycleStartDate: state?.cycleStartDate || new Date().toISOString(),
      manualOverrideDomain: domainKey,
    };
    setState(newState);
    try {
      window.localStorage.setItem(FOCUS_BUILDER_KEY, JSON.stringify(newState));
    } catch (error) {
      console.error('Failed to save manual focus state', error);
    }
  }, [state?.cycleStartDate]);


  const currentFocusKey = state?.manualOverrideDomain || getFocusDomainForDate(new Date(state?.cycleStartDate || Date.now()));
  const currentFocus = chcDomains.find(d => d.key === currentFocusKey) || chcDomains[0];
  
  const today = new Date();
  const cycleStartDate = new Date(state?.cycleStartDate || Date.now());
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
