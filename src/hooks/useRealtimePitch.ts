
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { PitchDetector } from 'pitchy';

export function useRealtimePitch(clarityThreshold = 0.9) {
  const [pitch, setPitch] = useState<number | null>(null);
  const [clarity, setClarity] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const requestRef = useRef<number>();

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
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
      
      setIsCapturing(true);
      
      const update = () => {
        if (!analyserRef.current || !audioContextRef.current) return;
        
        analyserRef.current.getFloatTimeDomainData(input);
        const [p, c] = detector.findPitch(input, audioContextRef.current.sampleRate);
        
        if (c > clarityThreshold) {
          setPitch(p);
        } else {
          setPitch(null);
        }
        setClarity(c);
        
        requestRef.current = requestAnimationFrame(update);
      };
      
      update();
    } catch (err) {
      setError('Microphone access denied');
      setIsCapturing(false);
    }
  }, [clarityThreshold]);

  const stop = useCallback(() => {
    setIsCapturing(false);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setPitch(null);
    setClarity(0);
  }, []);

  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return { pitch, clarity, error, start, stop, isCapturing };
}
