
/**
 * Utility functions for Speed Reading metrics and logic.
 */

export const calculateWPM = (wordCount: number, seconds: number): number => {
  if (seconds <= 0) return 0;
  return Math.round((wordCount / seconds) * 60);
};

export const calculateERR = (wpm: number, comprehensionScore: number): number => {
  return Math.round(wpm * (comprehensionScore / 100));
};

export const getSpeedRank = (wpm: number): { label: string; color: string } => {
  if (wpm >= 1000) return { label: 'Quantum', color: 'text-purple-500' };
  if (wpm >= 700) return { label: 'Elite', color: 'text-red-500' };
  if (wpm >= 500) return { label: 'Advanced', color: 'text-orange-500' };
  if (wpm >= 300) return { label: 'Proficient', color: 'text-green-500' };
  return { label: 'Foundational', color: 'text-muted-foreground' };
};

export const chunkText = (text: string, chunkSize: number): string[][] => {
  const words = text.split(/\s+/);
  const chunks: string[][] = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize));
  }
  return chunks;
};
