
'use client';

import { useState, useEffect, useRef } from 'react';
import { PitchDetector } from 'pitchy';
import { frequencyToNote } from '@/lib/audio/pitchUtils';

export function useRealtimePitch(stream: MediaStream | null, clarityThreshold = 0.85) {
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

    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);
    analyserRef.current = analyser;

    const detector = PitchDetector.forFloat32Array(analyser.fftSize);
    const input = new Float32Array(detector.inputLength);

    const update = () => {
      if (!analyserRef.current || !audioContextRef.current) return;

      analyserRef.current.getFloatTimeDomainData(input);
      const [freq, clarity] = detector.findPitch(input, audioContextRef.current.sampleRate);

      if (clarity > clarityThreshold && freq > 50 && freq < 2000) {
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
