
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRealtimePitch } from './useRealtimePitch';
import { useMicrophone } from './useMicrophone';

export type InputMode = 'mic' | 'midi' | 'auto';

interface UseInstrumentInputProps {
  inputMode?: InputMode;
}

export function useInstrumentInput({ inputMode = 'auto' }: UseInstrumentInputProps = {}) {
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [currentOctave, setCurrentOctave] = useState<number | null>(null);
  const [noteIsActive, setNoteIsActive] = useState(false);
  const [availableMidiDevices, setAvailableMidiDevices] = useState<string[]>([]);
  const [activeMidiInput, setActiveMidiInput] = useState<MIDIInput | null>(null);
  const [effectiveMode, setEffectiveMode] = useState<InputMode>('mic');

  const { stream, requestPermission } = useMicrophone();
  const pitchData = useRealtimePitch(stream);

  // --- MIDI Setup ---
  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.requestMIDIAccess) return;

    let midiAccess: MIDIAccess;

    const onMIDISuccess = (access: MIDIAccess) => {
      midiAccess = access;
      const inputs = Array.from(access.inputs.values());
      setAvailableMidiDevices(inputs.map(i => i.name || 'Unknown MIDI Device'));

      if (inputMode === 'auto' || inputMode === 'midi') {
        const first = inputs[0];
        if (first) {
          setActiveMidiInput(first);
          setEffectiveMode('midi');
        } else {
          setEffectiveMode('mic');
        }
      } else {
        setEffectiveMode('mic');
      }
    };

    navigator.requestMIDIAccess().then(onMIDISuccess).catch(() => setEffectiveMode('mic'));

    return () => {
      if (activeMidiInput) {
        activeMidiInput.onmidimessage = null;
      }
    };
  }, [inputMode, activeMidiInput]);

  useEffect(() => {
    if (effectiveMode === 'midi' && activeMidiInput) {
      activeMidiInput.onmidimessage = (event: MIDIMessageEvent) => {
        const [status, note, velocity] = event.data;
        const type = status & 0xf0;

        if (type === 144 && velocity > 0) { // Note ON
          const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
          setCurrentNote(noteNames[note % 12]);
          setCurrentOctave(Math.floor(note / 12) - 1);
          setNoteIsActive(true);
        } else if (type === 128 || (type === 144 && velocity === 0)) { // Note OFF
          setNoteIsActive(false);
        }
      };
    }
  }, [effectiveMode, activeMidiInput]);

  // --- Mic Fallback ---
  useEffect(() => {
    if (effectiveMode === 'mic') {
      setCurrentNote(pitchData.currentNote);
      setCurrentOctave(pitchData.currentOctave);
      setNoteIsActive(pitchData.isDetecting);
    }
  }, [effectiveMode, pitchData]);

  return {
    currentNote,
    currentOctave,
    noteIsActive,
    inputMode: effectiveMode,
    availableMidiDevices,
    requestPermission
  };
}
