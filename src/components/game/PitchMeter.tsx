
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export function PitchMeter({ cents }: { cents: number }) {
  // cents is the deviation from target pitch (-50 to 50)
  const clampedCents = Math.max(-50, Math.min(50, cents));
  const isCorrect = Math.abs(clampedCents) < 10;

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="relative h-16 bg-muted rounded-2xl overflow-hidden border-2 border-primary/5">
        {/* Center range indicator */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[20%] bg-green-500/10 -translate-x-1/2 z-0" />
        
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary/20 -translate-x-1/2 z-10" />
        
        {/* Tick marks */}
        <div className="absolute inset-0 flex justify-between px-[10%] items-center opacity-10 pointer-events-none">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-px h-full bg-foreground" />
          ))}
        </div>

        {/* Labels */}
        <div className="absolute inset-0 flex justify-between px-6 items-center opacity-30 text-[10px] font-black uppercase tracking-[0.2em] pointer-events-none">
          <span>Flat</span>
          <span>Sharp</span>
        </div>

        {/* The Needle */}
        <div 
          className={cn(
            "absolute top-0 bottom-0 w-2 transition-all duration-75 ease-out z-20",
            isCorrect ? "bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.6)]" : "bg-primary"
          )}
          style={{ 
            left: `${50 + (clampedCents)}%`, 
            transform: 'translateX(-50%)' 
          }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-inherit rotate-45" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-inherit rotate-45" />
        </div>
      </div>
      
      <div className="flex justify-between text-[10px] font-black uppercase text-muted-foreground tracking-widest px-2">
        <span>-50c</span>
        <span className={cn(
          "transition-colors duration-300",
          isCorrect ? "text-green-500 scale-110" : ""
        )}>
          {isCorrect ? "IN TUNE" : `${Math.round(clampedCents)} cents`}
        </span>
        <span>+50c</span>
      </div>
    </div>
  );
}
