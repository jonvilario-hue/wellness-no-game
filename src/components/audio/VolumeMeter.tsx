'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface VolumeMeterProps {
  volumeNormalized: number; // 0 to 1
  targetZone?: { min: number; max: number };
  className?: string;
  orientation?: 'vertical' | 'horizontal';
}

export function VolumeMeter({ 
  volumeNormalized, 
  targetZone, 
  className,
  orientation = 'vertical' 
}: VolumeMeterProps) {
  const isVertical = orientation === 'vertical';
  
  return (
    <div className={cn(
      "relative bg-muted rounded-full overflow-hidden border border-primary/10",
      isVertical ? "w-6 h-64" : "w-full h-6",
      className
    )}>
      {/* Target Zone Highlight */}
      {targetZone && (
        <div 
          className="absolute bg-primary/20 z-0 transition-all duration-500"
          style={{
            [isVertical ? 'bottom' : 'left']: `${targetZone.min * 100}%`,
            [isVertical ? 'height' : 'width']: `${(targetZone.max - targetZone.min) * 100}%`,
            [isVertical ? 'width' : 'height']: '100%'
          }}
        />
      )}

      {/* The Level Bar */}
      <div 
        className={cn(
          "absolute transition-all duration-75 ease-out z-10",
          volumeNormalized > 0.8 ? "bg-destructive" : volumeNormalized > 0.5 ? "bg-yellow-500" : "bg-emerald-500"
        )}
        style={{
          [isVertical ? 'bottom' : 'left']: '0',
          [isVertical ? 'height' : 'width']: `${volumeNormalized * 100}%`,
          [isVertical ? 'width' : 'height']: '100%'
        }}
      />

      {/* Tick Marks */}
      <div className={cn(
        "absolute inset-0 flex justify-between pointer-events-none opacity-20",
        isVertical ? "flex-col py-4 px-1" : "px-4 py-1"
      )}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={cn("bg-foreground", isVertical ? "h-px w-full" : "w-px h-full")} />
        ))}
      </div>
    </div>
  );
}
