
'use client';

import { useMemo } from 'react';

/**
 * Hook to calculate timing accuracy relative to a constant BPM.
 */
export interface BeatAccuracy {
  onsetTime: number;
  expectedBeatTime: number;
  offsetMs: number;
}

export function useBeatTracking(onsets: { timestamp: number }[], bpm: number, startTime: number) {
  const beatInterval = (60000 / bpm);

  const beatAccuracies = useMemo(() => {
    return onsets.map(onset => {
      const relativeTime = onset.timestamp - startTime;
      const beatNumber = Math.round(relativeTime / beatInterval);
      const expectedTime = beatNumber * beatInterval;
      const offset = relativeTime - expectedTime;

      return {
        onsetTime: onset.timestamp,
        expectedBeatTime: startTime + expectedTime,
        offsetMs: offset
      };
    });
  }, [onsets, bpm, startTime, beatInterval]);

  const stats = useMemo(() => {
    if (beatAccuracies.length === 0) return { averageOffsetMs: 0, percentOnBeat: 0 };

    const sumOffset = beatAccuracies.reduce((acc, curr) => acc + Math.abs(curr.offsetMs), 0);
    const onBeatCount = beatAccuracies.filter(a => Math.abs(a.offsetMs) <= 80).length;

    return {
      averageOffsetMs: Math.round(sumOffset / beatAccuracies.length),
      percentOnBeat: Math.round((onBeatCount / beatAccuracies.length) * 100)
    };
  }, [beatAccuracies]);

  return { beatAccuracies, ...stats };
}
