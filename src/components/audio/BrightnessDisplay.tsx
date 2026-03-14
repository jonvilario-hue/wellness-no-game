'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BrightnessDisplayProps {
  brightness: number; // 0 to 1
  targetBrightness?: number;
  className?: string;
}

export function BrightnessDisplay({ 
  brightness, 
  targetBrightness, 
  className 
}: BrightnessDisplayProps) {
  return (
    <div className={cn("w-full max-w-md space-y-4", className)}>
      <div className="relative h-12 rounded-2xl overflow-hidden border-2 border-primary/5 bg-gradient-to-r from-orange-500/20 via-muted to-blue-500/20">
        
        {/* Target Indicator */}
        {targetBrightness !== undefined && (
          <div 
            className="absolute top-0 bottom-0 w-1 bg-primary/40 z-0 animate-pulse"
            style={{ left: `${targetBrightness * 100}%` }}
          />
        )}

        {/* Labels */}
        <div className="absolute inset-0 flex justify-between px-6 items-center opacity-40 text-[10px] font-black uppercase tracking-[0.2em] pointer-events-none text-foreground">
          <span>Dark/Warm</span>
          <span>Bright/Sharp</span>
        </div>

        {/* The Needle */}
        <motion.div 
          className="absolute top-0 bottom-0 w-1.5 bg-foreground z-10 shadow-lg"
          animate={{ left: `${brightness * 100}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-inherit rotate-45" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-inherit rotate-45" />
        </motion.div>
      </div>
      
      <div className="flex justify-between text-[9px] font-black uppercase text-muted-foreground tracking-widest px-2">
        <span>Sub-Vocal</span>
        {targetBrightness !== undefined && (
          <span className="text-primary font-bold">Target Match</span>
        )}
        <span>Nasal/Forward</span>
      </div>
    </div>
  );
}
