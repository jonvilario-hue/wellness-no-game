
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface NoteEvent {
  note: string;
  octave: number;
  startTime: number;
  endTime?: number;
  duration?: number;
}

export function useNoteHistory(currentNote: string | null, currentOctave: number | null, noteIsActive: boolean) {
  const [noteHistory, setNoteHistory] = useState<NoteEvent[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const activeNoteRef = useRef<NoteEvent | null>(null);
  const lastNoteChangeRef = useRef<number>(0);

  const startRecording = useCallback(() => {
    setNoteHistory([]);
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    if (activeNoteRef.current) {
      const now = Date.now();
      activeNoteRef.current.endTime = now;
      activeNoteRef.current.duration = now - activeNoteRef.current.startTime;
      setNoteHistory(prev => [...prev, activeNoteRef.current!]);
      activeNoteRef.current = null;
    }
  }, []);

  const clear = useCallback(() => setNoteHistory([]), []);

  useEffect(() => {
    if (!isRecording) return;

    const now = Date.now();
    const debounceMs = 100; // Filter noise shorter than 100ms

    if (noteIsActive && currentNote && currentOctave !== null) {
      // If we don't have an active note OR the note changed
      if (!activeNoteRef.current || activeNoteRef.current.note !== currentNote || activeNoteRef.current.octave !== currentOctave) {
        
        // Finalize old note if it existed and was long enough
        if (activeNoteRef.current && (now - activeNoteRef.current.startTime) > debounceMs) {
          const finishedNote = { ...activeNoteRef.current, endTime: now, duration: now - activeNoteRef.current.startTime };
          setNoteHistory(prev => [...prev, finishedNote]);
        }

        // Start new note tracking
        activeNoteRef.current = { note: currentNote, octave: currentOctave, startTime: now };
      }
    } else {
      // Note released or lost
      if (activeNoteRef.current) {
        if ((now - activeNoteRef.current.startTime) > debounceMs) {
          const finishedNote = { ...activeNoteRef.current, endTime: now, duration: now - activeNoteRef.current.startTime };
          setNoteHistory(prev => [...prev, finishedNote]);
        }
        activeNoteRef.current = null;
      }
    }
  }, [currentNote, currentOctave, noteIsActive, isRecording]);

  return { noteHistory, isRecording, startRecording, stopRecording, clear };
}
