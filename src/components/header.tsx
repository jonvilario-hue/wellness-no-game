
'use client';

import { Brain, Settings, CalendarDays, Clock, Smile, BookMarked, Music } from 'lucide-react';
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
import { useTrainingOverride } from '@/hooks/use-training-override';
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

const CheckHexagonIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="9 12 11 14 15 10" />
    </svg>
);


export function Header() {
  const { focus, setFocus, isLoaded } = useTrainingFocus();
  const { setOverride } = useTrainingOverride();

  const handleFocusChange = (value: string) => {
    const newFocus = value as 'neutral' | 'math' | 'music';
    setFocus(newFocus);
    // This is the key change: Reset any session-specific overrides
    // when the global master switch is used.
    setOverride(null); 
  };
  
  const focusInfo = {
    neutral: { Icon: Brain, label: 'Core Thinking' },
    math: { Icon: SigmaIcon, label: 'Math Reasoning' },
    music: { Icon: Music, label: 'Music Cognition' },
  }

  const { Icon, label } = focusInfo[focus] || focusInfo.neutral;

  return (
    <header className="px-4 sm:px-6 md:px-8 py-4 border-b bg-card">
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
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <Brain className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold text-foreground font-headline tracking-tight">
            Polymath Lab
            </h1>
        </Link>
        <TooltipProvider>
        <div className="flex-1 flex justify-end items-center gap-1">
           <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button asChild variant="ghost" size="icon">
                  <Link href="/mood">
                    <Smile className="h-5 w-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mood Tracker</p>
              </TooltipContent>
            </Tooltip>
           <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button asChild variant="ghost" size="icon">
                  <Link href="/habits">
                    <CheckHexagonIcon className="h-5 w-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Habit Tracker</p>
              </TooltipContent>
            </Tooltip>
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
