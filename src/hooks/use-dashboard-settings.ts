
'use client';

import { useState, useEffect, useCallback } from 'react';

const defaultSettings = {
  habitTracker: true,
  moodTracker: true,
  effortTracker: true,
  assistantMode: true,
};

export type DashboardSettings = typeof defaultSettings;

const DASHBOARD_SETTINGS_KEY = 'dashboardSettings-v5';

export const useDashboardSettings = () => {
  const [settings, setSettings] = useState<DashboardSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedSettingsStr = window.localStorage.getItem(DASHBOARD_SETTINGS_KEY);
      if (savedSettingsStr) {
        const savedSettings = JSON.parse(savedSettingsStr);
        setSettings({ ...defaultSettings, ...savedSettings });
      } else {
        setSettings(defaultSettings);
      }
    } catch (error) {
      console.error("Failed to load dashboard settings from localStorage", error);
      setSettings(defaultSettings);
    }
    setIsLoaded(true);
  }, []);

  const saveSettings = useCallback((newSettings: DashboardSettings) => {
    try {
      setSettings(newSettings);
      window.localStorage.setItem(DASHBOARD_SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error("Failed to save dashboard settings to localStorage", error);
    }
  }, []);

  const toggleSetting = useCallback((component: keyof DashboardSettings) => {
    saveSettings({
      ...settings,
      [component]: !settings[component],
    });
  }, [settings, saveSettings]);

  return { settings, toggleSetting, isLoaded };
};

export const componentLabels: Record<keyof DashboardSettings, string> = {
  habitTracker: 'Habit Tracker',
  moodTracker: 'Mood Tracker',
  effortTracker: 'Focus Tracker',
  assistantMode: 'Assistant Mode',
};
