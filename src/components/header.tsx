
'use client';

import { BrainCircuit, Settings, CalendarDays, Clock, Sigma } from 'lucide-react';
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

export function Header() {
  const { focus, setFocus, isLoaded } = useTrainingFocus();
  const { setOverride } = useTrainingOverride();

  const handleFocusChange = (value: string) => {
    const newFocus = value as 'neutral' | 'math';
    setFocus(newFocus);
    setOverride(null); // Reset any session-specific overrides
  };

  return (
    <header className="px-4 sm:px-6 md:px-8 py-4 border-b bg-card">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex-1 flex justify-start items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!isLoaded}>
                  {focus === 'math' ? <Sigma className="h-5 w-5" /> : <BrainCircuit className="h-5 w-5" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Global Training Focus</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={focus} onValueChange={handleFocusChange}>
                  <DropdownMenuRadioItem value="neutral">Core Thinking</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="math">Math Reasoning</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
           <Button asChild variant="ghost" size="icon">
            <Link href="/time">
              <Clock className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <BrainCircuit className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold text-foreground font-headline tracking-tight">
            Cognitive Crucible
            </h1>
        </Link>
        <div className="flex-1 flex justify-end items-center gap-2">
           <Button asChild variant="ghost" size="icon">
            <Link href="/calendar">
              <CalendarDays className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <Link href="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
