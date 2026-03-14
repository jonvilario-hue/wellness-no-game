
import { Interval, Note } from '@tonaljs/tonal';

export type IntervalQuality = 'P' | 'M' | 'm' | 'd' | 'A';

export function getIntervalName(note1: string, note2: string): string {
  return Interval.distance(note1, note2);
}

export function getSecondNote(root: string, interval: string): string {
  return Note.transpose(root, interval);
}

export const COMMON_INTERVALS = [
  '1P', 'm2', '2M', 'm3', '3M', '4P', '4A', '5P', 'm6', '6M', 'm7', '7M', '8P'
];
