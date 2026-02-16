
'use client';

import { useState, useEffect, useCallback } from 'react';

const defaultSettings = {
  performanceOverview: true,
  dailyChallenge: true,
  allGames: true,
  weakAreaRecommendations: true,
  adaptiveDifficulty: true,
  hyperfocusBuilder: true,
  gameProgressTracker: true,
  milestoneBadges: true,
  performanceInsights: true,
  habitTracker: true,
  moodTracker: true,
  effortTracker: true,
  assistantMode: true, // New: Controls feature explanations
};

export type DashboardSettings = typeof defaultSettings;
export type DashboardComponent = keyof Omit<DashboardSettings, 'habitTracker' | 'moodTracker' | 'effortTracker' | 'assistantMode'>;

const DASHBOARD_SETTINGS_KEY = 'dashboardSettings-v4';

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
  performanceOverview: 'Performance Overview',
  dailyChallenge: 'Daily Challenge',
  allGames: 'All Training Games',
  hyperfocusBuilder: 'Hyperfocus Builder',
  gameProgressTracker: 'Game Progress',
  milestoneBadges: 'Milestone Badges',
  performanceInsights: 'Performance Insights',
  weakAreaRecommendations: 'Weak Area Targeting',
  adaptiveDifficulty: 'Adaptive Difficulty',
  habitTracker: 'Habit Tracker',
  moodTracker: 'Mood Tracker',
  effortTracker: 'Focus Tracker',
  assistantMode: 'Assistant Mode',
};
