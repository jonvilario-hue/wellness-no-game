
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
  const [visibleComponents, setVisibleComponents] = useState<VisibilityState>(defaultVisibility);

  // This effect runs only on the client, after the initial render.
  // This prevents hydration mismatch.
  useEffect(() => {
    try {
      const item = window.localStorage.getItem('dashboardVisibility');
      if (item) {
        setVisibleComponents(JSON.parse(item));
      }
    } catch (error) {
      console.error("Failed to load visibility settings from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      // Avoid writing to localStorage on the very first render.
      if (JSON.stringify(visibleComponents) !== JSON.stringify(defaultVisibility)) {
        window.localStorage.setItem('dashboardVisibility', JSON.stringify(visibleComponents));
      }
    } catch (error) {
      console.error("Failed to save visibility settings to localStorage", error);
    }
  }, [visibleComponents]);
  
  const toggleComponent = (key: ComponentKey) => {
    setVisibleComponents((prev) => {
        const newState = {
            ...prev,
            [key]: !prev[key],
        };
        // Also save to localStorage immediately on toggle
        try {
            window.localStorage.setItem('dashboardVisibility', JSON.stringify(newState));
        } catch (error) {
            console.error("Failed to save visibility settings to localStorage on toggle", error);
        }
        return newState;
    });
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
