import { BrainCircuit, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="px-4 sm:px-6 md:px-8 py-4 border-b bg-card">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <div className="w-10"></div>
        <div className="flex items-center gap-3">
            <BrainCircuit className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold text-foreground font-headline tracking-tight">
            Cognitive Crucible
            </h1>
        </div>
        <Button variant="ghost" size="icon">
          <Settings />
        </Button>
      </div>
    </header>
  );
}
