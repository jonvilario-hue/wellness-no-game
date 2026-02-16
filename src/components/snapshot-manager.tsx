
'use client';

import { useEffect } from 'react';
import { useSnapshotStore } from '@/hooks/use-snapshot-store';

/**
 * Ambient component that handles automatic weekly snapshots.
 * Included in the root layout to ensure it runs whenever the app is active.
 */
export function SnapshotManager() {
  const { isLoaded, checkAutoSnapshot } = useSnapshotStore();

  useEffect(() => {
    if (isLoaded) {
      checkAutoSnapshot();
    }
  }, [isLoaded, checkAutoSnapshot]);

  return null;
}
