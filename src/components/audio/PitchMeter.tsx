
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface PitchMeterProps {
  cents: number;
  noteName: string;
  octave: number;
  isDetecting: boolean;
  targetNote?: string;
}

export function PitchMeter({ cents, noteName, octave, isDetecting, targetNote }: PitchMeterProps) {
  const clampedCents = Math.max(-50, Math.min(50, cents));
  
  const getStatusColor = () => {
    if (!isDetecting) return "bg-muted-foreground/20";
    const abs = Math.abs(clampedCents);
    if (abs <= 10) return "bg-green-500";
    if (abs <= 25) return "bg-yellow-500";
    return "bg-destructive";
  };

  const statusColor = getStatusColor();

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center space-y-1">
        <div className="flex items-baseline justify-center gap-1">
          <span className={cn(
            "text-7xl font-black tabular-nums transition-colors duration-300",
            isDetecting ? "text-primary" : "text-muted-foreground/30"
          )}>
            {isDetecting ? noteName : "--"}
          </span>
          <span className="text-2xl font-bold text-muted-foreground opacity-50">
            {isDetecting ? octave : ""}
          </span>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
          {isDetecting ? `${Math.round(clampedCents)} cents` : "Awaiting signal"}
        </p>
      </div>

      <div className="relative h-12 bg-muted rounded-2xl overflow-hidden border-2 border-primary/5">
        <div className="absolute left-1/2 top-0 bottom-0 w-[20%] bg-green-500/10 -translate-x-1/2 z-0" />
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary/20 -translate-x-1/2 z-10" />
        
        <div className="absolute inset-0 flex justify-between px-6 items-center opacity-30 text-[10px] font-black uppercase tracking-[0.2em] pointer-events-none">
          <span>Flat</span>
          <span>Sharp</span>
        </div>

        <motion.div 
          className={cn(
            "absolute top-0 bottom-0 w-2 z-20 shadow-lg",
            statusColor
          )}
          initial={false}
          animate={{ 
            left: `${50 + clampedCents}%`,
            opacity: isDetecting ? 1 : 0.3
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-inherit rotate-45" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-inherit rotate-45" />
        </motion.div>
      </div>
      
      <div className="flex justify-between text-[10px] font-black uppercase text-muted-foreground tracking-widest px-2">
        <span>-50c</span>
        <span className="text-primary font-bold">{targetNote ? `TARGET: ${targetNote}` : "0"}</span>
        <span>+50c</span>
      </div>
    </div>
  );
}
