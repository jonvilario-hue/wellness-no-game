
'use client';

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Mic, Keyboard } from 'lucide-react';

export type InputMethod = 'mic' | 'midi';

export function InputSelector() {
  const [method, setMethod] = useState<InputMethod>('mic');
  const [midiDevices, setMidiDevices] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('music-input-method') as InputMethod;
    if (saved) setMethod(saved);

    // Guard against browsers where requestMIDIAccess is missing or blocked by security
    if (typeof navigator !== 'undefined' && navigator.requestMIDIAccess) {
      try {
        navigator.requestMIDIAccess()
          .then(access => {
            setMidiDevices(Array.from(access.inputs.values()).map(i => i.name || 'Unknown MIDI Device'));
          })
          .catch(() => {
            // Silently fail - MIDI options will simply not appear
          });
      } catch (err) {
        // Handle synchronous SecurityErrors (common in Firefox without the MIDI add-on)
      }
    }
  }, []);

  const handleChange = (val: InputMethod) => {
    setMethod(val);
    localStorage.setItem('music-input-method', val);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Input Method</Label>
      <Select value={method} onValueChange={handleChange}>
        <SelectTrigger className="w-[200px] h-10 border-primary/10 bg-background/50">
          <SelectValue placeholder="Select Input" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mic" className="gap-2">
            <div className="flex items-center gap-2">
              <Mic className="w-3.5 h-3.5 text-primary" />
              <span>Microphone</span>
            </div>
          </SelectItem>
          {midiDevices.length > 0 ? (
            <SelectItem value="midi">
              <div className="flex items-center gap-2">
                <Keyboard className="w-3.5 h-3.5 text-primary" />
                <span>MIDI Device</span>
              </div>
            </SelectItem>
          ) : (
            <SelectItem value="none" disabled>No MIDI Found</SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
