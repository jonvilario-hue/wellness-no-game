
'use client';

import { useState, useEffect, useCallback } from 'react';

const defaultSettings = {
  dailyChallenge: true,
  allGames: true,
  mainDashboard: true,
  hyperfocusBuilder: true,
  habitTracker: true,
  gameProgressTracker: true,
  milestoneBadges: true,
  performanceInsights: true,
  weakAreaRecommendations: true,
  adaptiveDifficulty: true,
  cognitiveCalendar: true,
  moodTracker: false,
  effortTracker: false,
};

export type DashboardSettings = typeof defaultSettings;
export type DashboardComponent = keyof DashboardSettings;

const DASHBOARD_SETTINGS_KEY = 'dashboardSettings';

export const useDashboardSettings = () => {
  const [settings, setSettings] = useState<DashboardSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedSettingsStr = window.localStorage.getItem(DASHBOARD_SETTINGS_KEY);
      if (savedSettingsStr) {
        const savedSettings = JSON.parse(savedSettingsStr);
        // Merge with defaults to ensure new settings are included
        setSettings({ ...defaultSettings, ...savedSettings });
      } else {
        // No settings saved, use defaults
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

  const toggleSetting = useCallback((component: DashboardComponent) => {
    saveSettings({
      ...settings,
      [component]: !settings[component],
    });
  }, [settings, saveSettings]);

  const resetSettings = useCallback(() => {
    saveSettings(defaultSettings);
  }, [saveSettings]);

  return { settings, toggleSetting, resetSettings, isLoaded };
};

export const componentLabels: Record<DashboardComponent, string> = {
  dailyChallenge: 'Daily Training Sequence',
  allGames: 'All Training Games',
  mainDashboard: 'Main Dashboard (Performance/Strength)',
  hyperfocusBuilder: 'Hyperfocus Builder',
  habitTracker: 'Habit Tracker',
  gameProgressTracker: 'Game Progress Tracker',
  milestoneBadges: 'Milestone Badges',
  performanceInsights: 'Performance Insights',
  weakAreaRecommendations: 'Weak Area Targeting',
  adaptiveDifficulty: 'Adaptive Difficulty',
  cognitiveCalendar: 'Training Log',
  moodTracker: 'Mood Tracker',
  effortTracker: 'Focus / Effort Tracker',
};
