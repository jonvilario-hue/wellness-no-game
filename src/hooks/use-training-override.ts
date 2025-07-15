
'use client';

import { useState } from 'react';
import type { TrainingFocus } from './use-training-focus';

// This hook uses sessionStorage to store an override for the training focus.
// The override is temporary and only lasts for the current browser tab session.
// This is being simplified as the individual override UI has been removed.
export const useTrainingOverride = () => {
  const [override, setOverride] = useState<TrainingFocus | null>(null);
  
  // No need for useEffect here since we want this to be a volatile, session-only state.
  // The default will always be null when a new session starts.
  const isLoaded = true;

  return { override, setOverride, isLoaded };
};
