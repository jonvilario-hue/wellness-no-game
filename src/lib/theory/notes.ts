
import { Note } from '@tonaljs/tonal';

export const OCTAVES = [3, 4, 5];
export const NOTES = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];

export function getRandomNote(octaveMin = 3, octaveMax = 5): string {
  const note = NOTES[Math.floor(Math.random() * NOTES.length)];
  const octave = Math.floor(Math.random() * (octaveMax - octaveMin + 1)) + octaveMin;
  return `${note}${octave}`;
}

export function simplifyNote(noteName: string): string {
  return Note.simplify(noteName);
}
