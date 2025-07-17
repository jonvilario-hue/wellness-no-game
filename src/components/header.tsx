
'use client';

import { Brain, Settings, CalendarDays, BookMarked, Music, FlaskConical, Clock } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTrainingFocus } from '@/hooks/use-training-focus';
import { useTrainingOverride } from '@/hooks/use-training-override.tsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const SigmaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 7H6l6 5-6 5h12" />
  </svg>
);
  
export function Header() {
  const { focus, setFocus, isLoaded } = useTrainingFocus();
  const { setOverride } = useTrainingOverride();

  const handleFocusChange = (value: string) => {
    const newFocus = value as 'neutral' | 'math' | 'music';
    setFocus(newFocus);
    setOverride(null); 
  };
  
  const focusInfo = {
    neutral: { Icon: Brain, label: 'Core Thinking' },
    math: { Icon: SigmaIcon, label: 'Math Reasoning' },
    music: { Icon: Music, label: 'Music Cognition' },
  }

  const { Icon, label } = focusInfo[focus] || focusInfo.neutral;

  return (
    <header className="px-4 sm:px-6 md:px-8 py-2 border-b bg-card">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <TooltipProvider>
            <div className="flex-1 flex justify-start items-center gap-1">
                <DropdownMenu>
                  <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!isLoaded}>
                              <Icon className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                      </TooltipTrigger>
                       <TooltipContent>
                          <p>Global Training Focus: {label}</p>
                       </TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Global Training Focus</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={focus} onValueChange={handleFocusChange}>
                      <DropdownMenuRadioItem value="neutral" className="gap-2">
                        <Brain className="w-4 h-4"/> Core Thinking
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="math" className="gap-2">
                         <SigmaIcon className="w-4 h-4"/> Math Reasoning
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="music" className="gap-2">
                         <Music className="w-4 h-4"/> Music Cognition
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                      <Button asChild variant="ghost" size="icon">
                        <Link href="/calendar">
                          <CalendarDays className="h-5 w-5" />
                        </Link>
                      </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Training Calendar</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button asChild variant="ghost" size="icon">
                      <Link href="/journal">
                        <BookMarked className="h-5 w-5" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>My Journal</p>
                  </TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>

        <div className="flex items-center gap-2">
             <FlaskConical className="h-7 w-7 text-primary" />
             <h1 className="text-xl font-bold text-foreground tracking-tight">Polymath Lab</h1>
        </div>
        
        <TooltipProvider>
            <div className="flex-1 flex justify-end items-center gap-1">
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button asChild variant="ghost" size="icon">
                    <Link href="/time">
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
