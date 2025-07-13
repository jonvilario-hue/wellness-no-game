
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { TrainingFocus } from './use-training-focus';

const TRAINING_OVERRIDE_KEY = 'trainingOverride';

// This hook uses sessionStorage to store an override for the training focus.
// The override is temporary and only lasts for the current browser tab session.
// This is being simplified as the individual override UI has been removed.
export const useTrainingOverride = () => {
  const [override, setOverrideState] = useState<TrainingFocus | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // This effect runs only on the client.
    setIsLoaded(true);
  }, []);

  const setOverride = useCallback((newOverride: TrainingFocus | null) => {
    // The override functionality has been removed from the UI,
    // but the hook is kept for potential future use and to avoid breaking dependencies.
    // For now, it doesn't need to do anything with storage.
    setOverrideState(newOverride);
  }, []);

  return { override, setOverride, isLoaded };
};

