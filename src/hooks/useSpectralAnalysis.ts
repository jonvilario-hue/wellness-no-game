
'use client';

import { useState, useEffect, useRef } from 'react';
import Meyda from 'meyda';

/**
 * Hook to perform spectral analysis using Meyda for high-fidelity timbre metrics.
 */
export function useSpectralAnalysis(stream: MediaStream | null) {
  const [analysis, setAnalysis] = useState({
    spectralCentroid: 0,
    brightness: 0.5, // 0 (Dark) to 1 (Bright)
    frequencyData: new Float32Array(0)
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const analyzerRef = useRef<any | null>(null);

  useEffect(() => {
    if (!stream) return;

    const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
    const ctx = new AudioContextClass();
    audioContextRef.current = ctx;

    const source = ctx.createMediaStreamSource(stream);
    sourceRef.current = source;

    const analyzer = Meyda.createMeydaAnalyzer({
      audioContext: ctx,
      source: source,
      bufferSize: 2048,
      featureExtractors: ['spectralCentroid', 'amplitudeSpectrum'],
      callback: (features) => {
        const centroid = features.spectralCentroid;
        // Normalize centroid for UI: human voice is typically 400Hz to 4000Hz
        const minC = 400;
        const maxC = 4000;
        const brightness = Math.max(0, Math.min(1, (centroid - minC) / (maxC - minC)));

        setAnalysis({
          spectralCentroid: Math.round(centroid),
          brightness,
          frequencyData: features.amplitudeSpectrum
        });
      }
    });

    analyzerRef.current = analyzer;
    analyzer.start();

    return () => {
      if (analyzerRef.current) analyzerRef.current.stop();
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [stream]);

  return analysis;
}
