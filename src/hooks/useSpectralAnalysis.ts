'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Hook to perform spectral analysis on a microphone stream.
 * Returns spectral centroid (brightness) and frequency distribution data.
 */
export function useSpectralAnalysis(stream: MediaStream | null) {
  const [analysis, setAnalysis] = useState({
    spectralCentroid: 0,
    brightness: 0.5, // 0 (Dark) to 1 (Bright)
    frequencyData: new Float32Array(0)
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    if (!stream) return;

    const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
    const ctx = new AudioContextClass();
    audioContextRef.current = ctx;

    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);
    analyserRef.current = analyser;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    const sampleRate = ctx.sampleRate;

    const update = () => {
      if (!analyserRef.current) return;

      analyserRef.current.getFloatFrequencyData(dataArray);

      // Spectral Centroid Calculation
      // Centroid = sum(f * a) / sum(a)
      let weightedSum = 0;
      let totalAmplitude = 0;

      for (let i = 0; i < dataArray.length; i++) {
        // Convert dB amplitude to linear
        const amplitude = Math.pow(10, dataArray[i] / 20);
        const frequency = (i * sampleRate) / analyser.fftSize;

        weightedSum += frequency * amplitude;
        totalAmplitude += amplitude;
      }

      const centroid = totalAmplitude > 0 ? weightedSum / totalAmplitude : 0;

      // Normalize brightness for UI
      // Human voice brightness (centroid) typically ranges from ~500Hz (dark) to ~3500Hz (bright)
      const minCentroid = 400;
      const maxCentroid = 4000;
      const brightness = Math.max(0, Math.min(1, (centroid - minCentroid) / (maxCentroid - minCentroid)));

      setAnalysis({
        spectralCentroid: Math.round(centroid),
        brightness,
        frequencyData: dataArray
      });

      // Update at approx 15fps to save resources
      setTimeout(() => {
        requestRef.current = requestAnimationFrame(update);
      }, 1000 / 15);
    };

    update();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [stream]);

  return analysis;
}
