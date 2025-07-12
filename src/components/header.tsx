import { BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  return (
    <header className="px-4 sm:px-6 md:px-8 py-4 border-b bg-card">
      <div className="mx-auto max-w-7xl flex items-center gap-3">
        <BrainCircuit className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-bold text-foreground font-headline tracking-tight">
          Cognitive Crucible
        </h1>
      </div>
    </header>
  );
}
