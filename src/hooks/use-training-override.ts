
'use client';

import { useState } from 'react';
import type { TrainingFocus } from './use-training-focus';

// This hook uses sessionStorage to store an override for the training focus.
// The override is temporary and only lasts for the current browser tab session.
export const useTrainingOverride = () => {
  const [override, setOverride] = useState<TrainingFocus | null>(null);
  const isLoaded = true; // This hook's state is not persisted, so it's always "loaded".

  return { override, setOverride, isLoaded };
};
