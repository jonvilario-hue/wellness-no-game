
'use client';

import React from 'react';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface AssistantTooltipProps {
  text: string;
  children: React.ReactNode;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
}

/**
 * A wrapper component that conditionally shows a tooltip based on the Assistant Mode setting.
 * Use this for explanation/helper text across the app.
 */
export function AssistantTooltip({ text, children, className, side = "top" }: AssistantTooltipProps) {
  const { settings, isLoaded } = useDashboardSettings();

  // If settings aren't loaded yet or assistant mode is off, just render children
  if (!isLoaded || !settings.assistantMode) {
    return <>{children}</>;
  }

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        {/* We wrap in a div to ensure there's a single child for TooltipTrigger 
            and to apply the cursor-help style consistently */}
        <div className={cn("inline-block cursor-help", className)}>
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent side={side} className="max-w-xs z-[100] bg-popover text-popover-foreground border border-border shadow-md">
        <p className="text-xs leading-relaxed">{text}</p>
      </TooltipContent>
    </Tooltip>
  );
}
