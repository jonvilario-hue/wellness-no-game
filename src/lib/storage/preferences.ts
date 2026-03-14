
'use client';

export type UserPreferences = {
  theme: 'light' | 'dark' | 'system';
  volume: number;
  muted: boolean;
  defaultRounds: number;
  instrument: string;
  hasSeenInstructions: Record<string, boolean>;
};

const PREF_KEY = 'ear-training-preferences';

const DEFAULT_PREFS: UserPreferences = {
  theme: 'system',
  volume: 0.8,
  muted: false,
  defaultRounds: 20,
  instrument: 'piano',
  hasSeenInstructions: {},
};

export function getPreferences(): UserPreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFS;
  const stored = localStorage.getItem(PREF_KEY);
  if (!stored) return DEFAULT_PREFS;
  try {
    return { ...DEFAULT_PREFS, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function savePreferences(prefs: Partial<UserPreferences>) {
  if (typeof window === 'undefined') return;
  const current = getPreferences();
  const updated = { ...current, ...prefs };
  localStorage.setItem(PREF_KEY, JSON.stringify(updated));
}

export function markInstructionsSeen(gameName: string) {
  const prefs = getPreferences();
  savePreferences({
    hasSeenInstructions: { ...prefs.hasSeenInstructions, [gameName]: true },
  });
}
