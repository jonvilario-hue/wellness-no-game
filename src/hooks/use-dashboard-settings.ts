
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const defaultSettings = {
  habitTracker: true,
  moodTracker: true,
  effortTracker: true,
  assistantMode: true,
};

export type DashboardSettings = typeof defaultSettings;

interface DashboardSettingsState {
  settings: DashboardSettings;
  isLoaded: boolean;
  toggleSetting: (component: keyof DashboardSettings) => void;
  setHasHydrated: (state: boolean) => void;
}

export const useDashboardSettings = create<DashboardSettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      isLoaded: false,
      setHasHydrated: (state) => set({ isLoaded: state }),
      toggleSetting: (component) =>
        set((state) => ({
          settings: {
            ...state.settings,
            [component]: !state.settings[component],
          },
        })),
    }),
    {
      name: 'dashboard-settings-storage-v6',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export const componentLabels: Record<keyof DashboardSettings, string> = {
  habitTracker: 'Habit Tracker',
  moodTracker: 'Mood Tracker',
  effortTracker: 'Focus Tracker',
  assistantMode: 'Assistant Mode',
};
