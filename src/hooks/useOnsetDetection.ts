
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook to detect percussive onsets (peaks) in an audio stream.
 * Uses a sliding window RMS threshold method.
 */
export function useOnsetDetection(stream: MediaStream | null, sensitivity = 2.5) {
  const [onsets, setOnsets] = useState<{ timestamp: number }[]>([]);
  const [lastOnsetTime, setLastOnsetTime] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const requestRef = useRef<number>();
  
  const historyRef = useRef<number[]>([]);
  const lastDetectionRef = useRef(0);

  const resetOnsets = useCallback(() => setOnsets([]), []);

  useEffect(() => {
    if (!stream) return;

    const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
    const ctx = new AudioContextClass();
    audioContextRef.current = ctx;

    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    source.connect(analyser);
    analyserRef.current = analyser;

    const dataArray = new Float32Array(analyser.fftSize);

    const update = () => {
      if (!analyserRef.current) return;
      analyserRef.current.getFloatTimeDomainData(dataArray);

      let sumSquares = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sumSquares += dataArray[i] * dataArray[i];
      }
      const rms = Math.sqrt(sumSquares / dataArray.length);

      // Rolling average for adaptive thresholding
      historyRef.current.push(rms);
      if (historyRef.current.length > 20) historyRef.current.shift();
      const avgRms = historyRef.current.reduce((a, b) => a + b, 0) / historyRef.current.length;

      const now = Date.now();
      // Onset detection: spike > average * sensitivity AND above noise floor
      if (rms > avgRms * sensitivity && rms > 0.03 && (now - lastDetectionRef.current > 80)) {
        const onset = { timestamp: now };
        setOnsets(prev => [...prev, onset].slice(-50)); // Keep last 50 for performance
        setLastOnsetTime(now);
        lastDetectionRef.current = now;
      }

      requestRef.current = requestAnimationFrame(update);
    };

    update();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [stream, sensitivity]);

  return { onsets, onsetCount: onsets.length, lastOnsetTime, resetOnsets };
}
