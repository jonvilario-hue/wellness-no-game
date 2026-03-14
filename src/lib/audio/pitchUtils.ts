
/**
 * @fileOverview Utilities for converting frequencies to musical notes and handling pitch math.
 * Standard A4 = 440Hz tuning is assumed.
 */

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function frequencyToNote(freq: number) {
  if (!freq || freq <= 0) return null;

  // MIDI number calculation: n = 12 * log2(freq / 440) + 69
  const n = 12 * Math.log2(freq / 440) + 69;
  const roundedN = Math.round(n);
  
  const centsOff = (n - roundedN) * 100;
  const noteIndex = (roundedN % 12 + 12) % 12;
  const octave = Math.floor(roundedN / 12) - 1;
  const noteName = NOTES[noteIndex];

  return {
    note: noteName,
    octave,
    centsOff: parseFloat(centsOff.toFixed(2)),
    midi: roundedN
  };
}

export function noteToFrequency(note: string, octave: number): number {
  const noteIndex = NOTES.indexOf(note.toUpperCase().replace('♭', 'b'));
  if (noteIndex === -1) return 440;
  
  const midi = (octave + 1) * 12 + noteIndex;
  // freq = 440 * 2^((n - 69) / 12)
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export function getIntervalFrequency(rootFreq: number, semitones: number): number {
  return rootFreq * Math.pow(2, semitones / 12);
}

export function isWithinCents(detectedFreq: number, targetFreq: number, threshold: number): boolean {
  if (!detectedFreq || !targetFreq) return false;
  const cents = 1200 * Math.log2(detectedFreq / targetFreq);
  return Math.abs(cents) <= threshold;
}

export function getCentsDifference(detectedFreq: number, targetFreq: number): number {
  if (!detectedFreq || !targetFreq) return 0;
  return 1200 * Math.log2(detectedFreq / targetFreq);
}
