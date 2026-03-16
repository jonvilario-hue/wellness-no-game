import { DrillHistoryEntry, Language, Lane, DrillType } from '@/types/drills';

const STORAGE_KEY = 'coding-drill-history-v1';
const MAX_HISTORY = 300;

export function getHistory(): DrillHistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addHistory(entry: DrillHistoryEntry): void {
  if (typeof window === 'undefined') return;
  try {
    const history = getHistory();
    const updated = [entry, ...history].slice(0, MAX_HISTORY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
}

export function recentlySeenHashes(windowSize = 60): Set<string> {
  const history = getHistory().slice(0, windowSize);
  return new Set(history.map(h => h.hash));
}

export function recentlySeenConcepts(
  language: Language, 
  lane: Lane, 
  type: DrillType, 
  windowSize = 20
): Set<string> {
  const history = getHistory()
    .filter(h => h.language === language && h.lane === lane && h.type === type)
    .slice(0, windowSize);
  return new Set(history.map(h => h.concept));
}
