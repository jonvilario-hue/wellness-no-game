
'use client';

import { useState, useEffect, useRef } from 'react';
import { PitchDetector } from 'pitchy';
import { frequencyToNote } from '@/lib/audio/pitchUtils';

/**
 * Hook to analyze real-time pitch from a microphone stream.
 * Uses mathematical Autocorrelation (YIN-like) via the pitchy library.
 * No AI models are used to ensure sub-millisecond processing.
 */
export function useRealtimePitch(stream: MediaStream | null, clarityThreshold = 0.8) {
  const [pitchData, setPitchData] = useState({
    currentFrequency: 0,
    currentNote: '',
    currentOctave: 0,
    centsOff: 0,
    clarity: 0,
    isDetecting: false
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    if (!stream) {
      setPitchData(prev => ({ ...prev, isDetecting: false }));
      return;
    }

    const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
    const ctx = new AudioContextClass();
    audioContextRef.current = ctx;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    // FFT size affects resolution vs latency. 2048 is a good middle ground for real-time.
    analyser.fftSize = 2048; 
    source.connect(analyser);
    analyserRef.current = analyser;

    const detector = PitchDetector.forFloat32Array(analyser.fftSize);
    const input = new Float32Array(detector.inputLength);

    // Get selected instrument from localStorage to adjust clarity threshold
    const selectedInstrument = typeof window !== 'undefined' ? localStorage.getItem('music-active-instrument') : 'piano';
    
    // Calibration adjustment: Instruments like Violin have more "noise" (harmonics) 
    // and need a slightly lower clarity threshold than clean sine-like instruments.
    const adjustedThreshold = selectedInstrument === 'violin' || selectedInstrument === 'voice' 
      ? Math.max(0.65, clarityThreshold - 0.1) 
      : clarityThreshold;

    const update = () => {
      if (!analyserRef.current || !audioContextRef.current) return;

      analyserRef.current.getFloatTimeDomainData(input);
      const [freq, clarity] = detector.findPitch(input, audioContextRef.current.sampleRate);

      // Filtering out background noise and frequencies outside human musical range
      if (clarity > adjustedThreshold && freq > 50 && freq < 2000) {
        const noteInfo = frequencyToNote(freq);
        if (noteInfo) {
          setPitchData({
            currentFrequency: freq,
            currentNote: noteInfo.note,
            currentOctave: noteInfo.octave,
            centsOff: noteInfo.centsOff,
            clarity,
            isDetecting: true
          });
        }
      } else {
        setPitchData(prev => ({ ...prev, isDetecting: false, clarity }));
      }

      requestRef.current = requestAnimationFrame(update);
    };

    update();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [stream, clarityThreshold]);

  return pitchData;
}
