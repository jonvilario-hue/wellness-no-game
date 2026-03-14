
'use client';

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Music, Piano, Guitar, User, Waves } from 'lucide-react';

const instruments = [
  { id: 'voice', name: 'Voice', icon: User },
  { id: 'piano', name: 'Piano / Keyboard', icon: Piano },
  { id: 'guitar', name: 'Guitar', icon: Guitar },
  { id: 'bass', name: 'Electric Bass', icon: Music },
  { id: 'violin', name: 'Violin', icon: Music },
  { id: 'cello', name: 'Cello', icon: Music },
  { id: 'flute', name: 'Flute', icon: Waves },
  { id: 'sax', name: 'Saxophone', icon: Music },
  { id: 'trumpet', name: 'Trumpet', icon: Music },
  { id: 'other', name: 'Other', icon: Music },
];

export function InstrumentSelector() {
  const [selected, setSelected] = useState('piano');

  useEffect(() => {
    const saved = localStorage.getItem('music-active-instrument');
    if (saved) setSelected(saved);
  }, []);

  const handleChange = (val: string) => {
    setSelected(val);
    localStorage.setItem('music-active-instrument', val);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Instrument Type</Label>
      <Select value={selected} onValueChange={handleChange}>
        <SelectTrigger className="w-[200px] h-10 border-primary/10 bg-background/50">
          <SelectValue placeholder="Instrument" />
        </SelectTrigger>
        <SelectContent>
          {instruments.map(inst => (
            <SelectItem key={inst.id} value={inst.id}>
              <div className="flex items-center gap-2">
                <inst.icon className="w-3.5 h-3.5 text-primary" />
                <span>{inst.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
