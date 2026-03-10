
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Keys that are part of the portable "User Data"
export const ALL_STORAGE_KEYS = [
  'blueprint-store-local-vachievement-v2',
  'calendar-plans-storage-v3',
  'flashcard-storage-v4',
  'srs-master-storage-v1',
  'journal-storage-v2',
  'wellness-data-storage-v6',
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
  isQuotaExceeded: boolean;
  
  setHasHydrated: (state: boolean) => void;
  setMaxSnapshots: (limit: number) => void;
  createSnapshot: (label?: string) => void;
  restoreSnapshot: (id: string) => void;
  deleteSnapshot: (id: string) => void;
  clearAllSnapshots: () => void;
  checkAutoSnapshot: () => void;
}

export const useSnapshotStore = create<SnapshotState>()(
  persist(
    (set, get) => ({
      snapshots: [],
      maxSnapshots: 2, // Reduced to save space
      lastAutoSnapshotDate: null,
      isLoaded: false,
      isQuotaExceeded: false,

      setHasHydrated: (state) => set({ isLoaded: state }),

      setMaxSnapshots: (maxSnapshots) => set({ maxSnapshots }),

      createSnapshot: (label) => {
        const { snapshots, maxSnapshots } = get();
        
        const data: Record<string, string | null> = {};
        ALL_STORAGE_KEYS.forEach(key => {
          try {
            data[key] = localStorage.getItem(key);
          } catch (e) {
            data[key] = null;
          }
        });

        const newSnapshot: DataSnapshot = {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          data,
          label: label || 'Manual Snapshot'
        };

        const updatedSnapshots = [newSnapshot, ...snapshots].slice(0, maxSnapshots);
        
        try {
          set({ snapshots: updatedSnapshots, isQuotaExceeded: false });
        } catch (e) {
          console.warn("Storage quota exceeded. Purging old snapshots to make room...");
          
          // Try with just the NEW snapshot (clearing all others)
          try {
            set({ snapshots: [newSnapshot], isQuotaExceeded: false });
          } catch (e2) {
            // If even 1 snapshot is too big, the data itself is too large.
            console.error("Data too large for local snapshots. Please export your backup manually.");
            set({ snapshots: [], isQuotaExceeded: true });
          }
        }
      },

      restoreSnapshot: (id) => {
        const snapshot = get().snapshots.find(s => s.id === id);
        if (!snapshot) return;

        Object.entries(snapshot.data).forEach(([key, value]) => {
          if (value !== null) {
            localStorage.setItem(key, value);
          }
        });

        window.location.reload();
      },

      deleteSnapshot: (id) => {
        set(state => ({
          snapshots: state.snapshots.filter(s => s.id !== id),
          isQuotaExceeded: false
        }));
      },

      clearAllSnapshots: () => {
        set({ snapshots: [], isQuotaExceeded: false });
      },

      checkAutoSnapshot: () => {
        const { lastAutoSnapshotDate, createSnapshot, isQuotaExceeded } = get();
        if (isQuotaExceeded) return; 

        const now = new Date();
        const lastDate = lastAutoSnapshotDate ? new Date(lastAutoSnapshotDate) : null;
        const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
        
        if (!lastDate || (now.getTime() - lastDate.getTime() >= ONE_WEEK_MS)) {
          // Use a small timeout to avoid blocking initial hydration/render
          setTimeout(() => {
            createSnapshot(`Auto-Weekly Backup`);
            set({ lastAutoSnapshotDate: now.toISOString() });
          }, 2000);
        }
      }
    }),
    {
      name: 'data-snapshot-storage-v1', 
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);
