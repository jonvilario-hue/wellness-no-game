
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { TrainingFocus } from './use-training-focus';

const TRAINING_OVERRIDE_KEY = 'trainingOverride';

// This hook uses sessionStorage to store an override for the training focus.
// The override is temporary and only lasts for the current browser tab session.
export const useTrainingOverride = () => {
  const [override, setOverrideState] = useState<TrainingFocus | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // This effect runs only on the client.
    try {
      const savedOverride = window.sessionStorage.getItem(TRAINING_OVERRIDE_KEY) as TrainingFocus | null;
      if (savedOverride && ['neutral', 'math'].includes(savedOverride)) {
        setOverrideState(savedOverride);
      }
    } catch (error) {
      console.error("Failed to load training override from sessionStorage", error);
    }
    setIsLoaded(true);
  }, []);

  const setOverride = useCallback((newOverride: TrainingFocus | null) => {
    try {
      setOverrideState(newOverride);
      if (newOverride) {
        window.sessionStorage.setItem(TRAINING_OVERRIDE_KEY, newOverride);
      } else {
        window.sessionStorage.removeItem(TRAINING_OVERRIDE_KEY);
      }
    } catch (error) {
      console.error("Failed to save training override to sessionStorage", error);
    }
  }, []);

  // Clear the override after the first load to ensure it's only used once per session start.
  useEffect(() => {
    if (isLoaded && override) {
        // We don't clear it immediately, we let the training page use it,
        // and it will be cleared when the tab is closed.
        // Or we could clear it after a training session ends.
        // For now, letting it persist for the session is the simplest approach.
    }
  }, [isLoaded, override]);

  return { override, setOverride, isLoaded };
};
