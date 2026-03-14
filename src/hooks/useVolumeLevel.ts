'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Hook to analyze real-time volume levels from a microphone stream.
 * Returns RMS amplitude in dB and normalized (0-1) values.
 */
export function useVolumeLevel(stream: MediaStream | null, smoothing = 5) {
  const [volume, setVolume] = useState({
    volumeDb: -100,
    volumeNormalized: 0,
    isSilent: true
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const historyRef = useRef<number[]>([]);
  const requestRef = useRef<number>();

  useEffect(() => {
    if (!stream) {
      setVolume({ volumeDb: -100, volumeNormalized: 0, isSilent: true });
      return;
    }

    const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
    const ctx = new AudioContextClass();
    audioContextRef.current = ctx;

    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 1024;
    source.connect(analyser);
    analyserRef.current = analyser;

    const bufferLength = analyser.fftSize;
    const dataArray = new Float32Array(bufferLength);

    const update = () => {
      if (!analyserRef.current) return;

      analyserRef.current.getFloatTimeDomainData(dataArray);

      // Calculate RMS (Root Mean Square)
      let sumSquares = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sumSquares += dataArray[i] * dataArray[i];
      }
      const rms = Math.sqrt(sumSquares / dataArray.length);

      // Convert to decibels (ref 1.0)
      // We clamp at -100 to avoid -Infinity
      const db = rms > 0 ? 20 * Math.log10(rms) : -100;

      // Normalize for UI (assuming -60dB is silent and 0dB is max)
      const normalized = Math.max(0, Math.min(1, (db + 60) / 60));

      // Simple Moving Average smoothing
      historyRef.current.push(normalized);
      if (historyRef.current.length > smoothing) {
        historyRef.current.shift();
      }
      const smoothedNormalized = historyRef.current.reduce((a, b) => a + b, 0) / historyRef.current.length;

      setVolume({
        volumeDb: parseFloat(db.toFixed(1)),
        volumeNormalized: smoothedNormalized,
        isSilent: db < -50
      });

      requestRef.current = requestAnimationFrame(update);
    };

    update();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [stream, smoothing]);

  return volume;
}
