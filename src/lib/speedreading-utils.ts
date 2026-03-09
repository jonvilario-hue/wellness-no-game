
import type { ReadingTier } from '@/types/speedreading';

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
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const chunks: string[][] = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize));
  }
  return chunks;
};

/**
 * Estimates difficulty using a simplified Fog Index approximation
 */
export function estimateDifficulty(text: string): ReadingTier {
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  if (words.length === 0 || sentences.length === 0) return 'Casual';

  const avgSentenceLength = words.length / sentences.length;
  const complexWords = words.filter(w => w.length > 7).length; // Heuristic for multi-syllable
  const percentComplex = (complexWords / words.length) * 100;

  // Simple Thresholds
  if (percentComplex > 25 || avgSentenceLength > 20) return 'Dense Data';
  if (percentComplex > 15 || avgSentenceLength > 15) return 'Technical';
  return 'Casual';
}
