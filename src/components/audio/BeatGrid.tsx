
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface BeatGridProps {
  beatsPerBar?: number;
  subdivisions?: number; // total cells (e.g. 16 for one bar of 16ths)
  currentCell: number;
  pattern: boolean[]; // target cells
  userHits: number[]; // indices where user hit correctly
  className?: string;
}

export function BeatGrid({ 
  beatsPerBar = 4, 
  subdivisions = 16, 
  currentCell, 
  pattern, 
  userHits,
  className 
}: BeatGridProps) {
  return (
    <div className={cn("grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-16 gap-2 w-full", className)}>
      {Array.from({ length: subdivisions }).map((_, i) => {
        const isTarget = pattern[i];
        const isHit = userHits.includes(i);
        const isActive = currentCell === i;
        const isBeat = i % (subdivisions / beatsPerBar) === 0;

        return (
          <div
            key={i}
            className={cn(
              "h-12 rounded-lg border-2 transition-all duration-100 flex items-center justify-center relative",
              isBeat ? "border-primary/20" : "border-transparent",
              isTarget ? "bg-muted/50" : "bg-transparent",
              isActive && "ring-2 ring-primary ring-offset-2 z-10 scale-105",
              isTarget && isHit && "bg-emerald-500 border-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.4)]",
              !isTarget && isHit && "bg-destructive/40 border-destructive",
              isTarget && !isHit && isActive === false && i < currentCell && "bg-destructive/10 border-destructive/20"
            )}
          >
            {isTarget && !isHit && <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />}
            {isTarget && isHit && <Check className="w-4 h-4 text-white" />}
          </div>
        );
      })}
    </div>
  );
}
