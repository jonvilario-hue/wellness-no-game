
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface StaffNote {
  pitch: string; // e.g. "C4"
  duration: 'w' | 'h' | 'q' | 'e'; 
  status?: 'correct' | 'wrong' | 'current' | 'pending';
}

interface SimpleStaffProps {
  notes: StaffNote[];
  keySignature?: string;
  timeSignature?: string;
  className?: string;
}

const noteToStaffY = (pitch: string): number => {
  const notesMap = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const base = pitch.slice(0, -1);
  const octave = parseInt(pitch.slice(-1));
  
  const noteIndex = notesMap.indexOf(base);
  const totalSteps = (octave - 4) * 7 + noteIndex - 4; // 0 at G4
  
  return 70 - (totalSteps * 10);
};

export function SimpleStaff({ notes, keySignature = 'C', timeSignature = '4/4', className }: SimpleStaffProps) {
  return (
    <div className={cn("w-full bg-card p-8 rounded-3xl border-2 border-primary/5 shadow-inner", className)}>
      <svg viewBox="0 0 800 150" className="w-full h-full overflow-visible">
        {[30, 50, 70, 90, 110].map(y => (
          <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="currentColor" strokeWidth="1" className="text-muted-foreground/30" />
        ))}

        <text x="10" y="100" fontSize="80" className="text-primary opacity-80 font-serif">𝄞</text>

        <text x="80" y="70" fontSize="30" fontWeight="bold" className="text-primary">{timeSignature.split('/')[0]}</text>
        <text x="80" y="105" fontSize="30" fontWeight="bold" className="text-primary">{timeSignature.split('/')[1]}</text>

        {notes.map((note, i) => {
          const x = 150 + (i * 80);
          const y = noteToStaffY(note.pitch);
          const isCorrect = note.status === 'correct';
          const isWrong = note.status === 'wrong';
          const isCurrent = note.status === 'current';

          return (
            <g key={i} className="transition-all duration-500">
              {note.duration !== 'w' && (
                <line 
                  x1={x + 10} 
                  y1={y} 
                  x2={x + 10} 
                  y2={y - 40} 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className={cn(
                    isCorrect ? "text-green-500" : isWrong ? "text-destructive" : isCurrent ? "text-primary" : "text-muted-foreground"
                  )}
                />
              )}
              <ellipse 
                cx={x} 
                cy={y} 
                rx="12" 
                ry="8" 
                fill={note.duration === 'q' || note.duration === 'e' ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="3"
                className={cn(
                  "transition-all",
                  isCorrect ? "text-green-500" : isWrong ? "text-destructive" : isCurrent ? "text-primary animate-pulse" : "text-muted-foreground"
                )}
              />
              {y <= 10 && (
                <line x1={x-20} y1={10} x2={x+20} y2={10} stroke="currentColor" strokeWidth="1" className="text-muted-foreground/30" />
              )}
              {y >= 130 && (
                <line x1={x-20} y1={130} x2={x+20} y2={130} stroke="currentColor" strokeWidth="1" className="text-muted-foreground/30" />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
