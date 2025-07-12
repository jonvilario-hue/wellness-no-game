
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const componentKeys = [
  'dailyChallenge',
  'chcDomainDashboard',
  'habitTracker',
  'milestoneBadges',
  'iqProxyProgress',
  'cognitiveEnergyMeter',
  'weakAreaRecommendations',
  'adaptiveDifficulty',
  'habitJournal',
] as const;

export type ComponentKey = typeof componentKeys[number];

type VisibilityState = Record<ComponentKey, boolean>;

const defaultVisibility: VisibilityState = {
  dailyChallenge: true,
  chcDomainDashboard: true,
  habitTracker: true,
  milestoneBadges: true,
  iqProxyProgress: true,
  cognitiveEnergyMeter: true,
  weakAreaRecommendations: true,
  adaptiveDifficulty: true,
  habitJournal: true,
};

interface VisibilityContextType {
  visibleComponents: VisibilityState;
  toggleComponent: (key: ComponentKey) => void;
}

const VisibilityContext = createContext<VisibilityContextType | undefined>(undefined);

export const VisibilityProvider = ({ children }: { children: ReactNode }) => {
  const [visibleComponents, setVisibleComponents] = useState<VisibilityState>(() => {
    if (typeof window === 'undefined') {
      return defaultVisibility;
    }
    try {
      const item = window.localStorage.getItem('dashboardVisibility');
      return item ? JSON.parse(item) : defaultVisibility;
    } catch (error) {
      console.error("Failed to load visibility settings from localStorage", error);
      return defaultVisibility;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('dashboardVisibility', JSON.stringify(visibleComponents));
    } catch (error) {
      console.error("Failed to save visibility settings to localStorage", error);
    }
  }, [visibleComponents]);
  
  const toggleComponent = (key: ComponentKey) => {
    setVisibleComponents((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <VisibilityContext.Provider value={{ visibleComponents, toggleComponent }}>
      {children}
    </VisibilityContext.Provider>
  );
};

export const useVisibility = () => {
  const context = useContext(VisibilityContext);
  if (context === undefined) {
    throw new Error('useVisibility must be used within a VisibilityProvider');
  }
  return context;
};
