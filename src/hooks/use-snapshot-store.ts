
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Keys that are part of the portable "User Data"
export const ALL_STORAGE_KEYS = [
  'blueprint-store-local-v1',
  'calendar-plans-storage-v3',
  'flashcard-storage-v3',
  'srs-master-storage-v1',
  'journal-storage-v2',
  'wellness-data-storage-v2',
  'alarm-storage',
  'dashboard-settings-storage-v6',
  'motivation-storage',
  'cognitive-performance-storage',
  'playbook-storage-v2',
  'pomodoro-storage',
  'sleep-pro-storage',
  'stats-storage-v2',
  'library-storage',
  'polymath-lab-ui-settings',
  'calendar-completion-tracker',
  'focusBuilderState',
  'trainingFocus',
  'scholar-hub-storage'
];

export type DataSnapshot = {
  id: string;
  timestamp: string;
  data: Record<string, string | null>;
  label?: string;
};

interface SnapshotState {
  snapshots: DataSnapshot[];
  maxSnapshots: number;
  lastAutoSnapshotDate: string | null;
  isLoaded: boolean;
  
  setHasHydrated: (state: boolean) => void;
  setMaxSnapshots: (limit: number) => void;
  createSnapshot: (label?: string) => void;
  restoreSnapshot: (id: string) => void;
  deleteSnapshot: (id: string) => void;
  checkAutoSnapshot: () => void;
}

export const useSnapshotStore = create<SnapshotState>()(
  persist(
    (set, get) => ({
      snapshots: [],
      maxSnapshots: 10,
      lastAutoSnapshotDate: null,
      isLoaded: false,

      setHasHydrated: (state) => set({ isLoaded: state }),

      setMaxSnapshots: (maxSnapshots) => set({ maxSnapshots }),

      createSnapshot: (label) => {
        const { snapshots, maxSnapshots } = get();
        
        const data: Record<string, string | null> = {};
        ALL_STORAGE_KEYS.forEach(key => {
          data[key] = localStorage.getItem(key);
        });

        const newSnapshot: DataSnapshot = {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          data,
          label: label || 'Manual Snapshot'
        };

        // Rolling deletion logic
        const updatedSnapshots = [newSnapshot, ...snapshots].slice(0, maxSnapshots);
        
        set({ snapshots: updatedSnapshots });
      },

      restoreSnapshot: (id) => {
        const snapshot = get().snapshots.find(s => s.id === id);
        if (!snapshot) return;

        Object.entries(snapshot.data).forEach(([key, value]) => {
          if (value !== null) {
            localStorage.setItem(key, value);
          }
        });

        // Trigger a hard reload to re-hydrate all stores with the restored data
        window.location.reload();
      },

      deleteSnapshot: (id) => {
        set(state => ({
          snapshots: state.snapshots.filter(s => s.id !== id)
        }));
      },

      checkAutoSnapshot: () => {
        const { lastAutoSnapshotDate, createSnapshot } = get();
        const now = new Date();
        const lastDate = lastAutoSnapshotDate ? new Date(lastAutoSnapshotDate) : null;

        // Trigger every 7 days (weekly)
        const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
        
        if (!lastDate || (now.getTime() - lastDate.getTime() >= ONE_WEEK_MS)) {
          createSnapshot(`Auto-Weekly Backup`);
          set({ lastAutoSnapshotDate: now.toISOString() });
        }
      }
    }),
    {
      name: 'data-snapshot-storage-v1', // This store key is NOT in ALL_STORAGE_KEYS to prevent self-recursion and ensure persistence during imports
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);
