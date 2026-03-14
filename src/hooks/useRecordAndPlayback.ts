
'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Hook to manage temporary in-memory audio recordings.
 */
export function useRecordAndPlayback(stream: MediaStream | null) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [duration, setDuration] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startTimeRef = useRef<number>(0);

  const startRecording = useCallback(() => {
    if (!stream) return;
    
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
      setAudioBlob(blob);
      setDuration((Date.now() - startTimeRef.current) / 1000);
    };

    startTimeRef.current = Date.now();
    recorder.start();
    setIsRecording(true);
  }, [stream]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const playBack = useCallback(() => {
    if (!audioBlob) return;
    
    const url = URL.createObjectURL(audioBlob);
    const audio = new Audio(url);
    audioRef.current = audio;
    
    audio.onended = () => {
      setIsPlaying(false);
      URL.revokeObjectURL(url);
    };

    setIsPlaying(true);
    audio.play();
  }, [audioBlob]);

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  return { startRecording, stopRecording, playBack, audioBlob, isRecording, isPlaying, duration };
}
