'use client';

import { Settings, Clock, Library, Moon, Lightbulb, LightbulbOff, FlaskConical } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { DopamineMenu } from './dopamine-menu';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
  
export function Header() {
  const { settings, toggleSetting } = useDashboardSettings();
  const [mounted, setMounted] = useState(false);

  // Fix for Radix UI hydration mismatches with dynamic IDs
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <header className="px-4 sm:px-6 md:px-8 py-2 border-b bg-card">
      <div className="mx-auto max-w-7xl flex items-center justify-between h-10">
        <div className="flex-1" />
        <div className="flex items-center gap-2">
             <FlaskConical className="h-7 w-7 text-primary" />
             <h1 className="text-xl font-bold text-foreground tracking-tight">Polymath Lab</h1>
        </div>
        <div className="flex-1" />
      </div>
    </header>
  );

  return (
    <header className="px-4 sm:px-6 md:px-8 py-2 border-b bg-card">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <TooltipProvider>
            <div className="flex-1 flex justify-start items-center gap-1">
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button asChild variant="ghost" size="icon">
                      <Link href="/library">
                        <Library className="h-5 w-5" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Library</p>
                  </TooltipContent>
                </Tooltip>
                <DopamineMenu />
                
                <div className="w-[1px] h-4 bg-border mx-1" />

                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => toggleSetting('assistantMode')}
                      className={cn(settings.assistantMode ? "text-primary" : "text-muted-foreground")}
                    >
                      {settings.assistantMode ? <Lightbulb className="h-5 w-5" /> : <LightbulbOff className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{settings.assistantMode ? 'Disable Assistant Mode' : 'Enable Assistant Mode'}</p>
                  </TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>

        <Link href="/skills" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
             <FlaskConical className="h-7 w-7 text-primary" />
             <h1 className="text-xl font-bold text-foreground tracking-tight">Polymath Lab</h1>
        </Link>
        
        <TooltipProvider>
            <div className="flex-1 flex justify-end items-center gap-1">
              <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button asChild variant="ghost" size="icon">
                      <Link href="/sleep">
                        <Moon className="h-5 w-5" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sleep Pro</p>
                  </TooltipContent>
                </Tooltip>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button asChild variant="ghost" size="icon">
                    <Link href="/settings?tab=time">
                      <Clock className="h-5 w-5" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clock Tools</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button asChild variant="ghost" size="icon">
                      <Link href="/settings">
                        <Settings className="h-5 w-5" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
      </div>
    </header>
  );
}
