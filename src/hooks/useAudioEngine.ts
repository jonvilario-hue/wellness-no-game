
'use client';

import { useState, useCallback } from 'react';
import { audioEngine } from '@/lib/audio/engine';

export function useAudioEngine() {
  const [isReady, setIsReady] = useState(false);

  const init = useCallback(async () => {
    try {
      await audioEngine.initialize();
      setIsReady(true);
    } catch (error) {
      console.error('Failed to init audio engine:', error);
    }
  }, []);

  return { isReady, init, engine: audioEngine };
}
