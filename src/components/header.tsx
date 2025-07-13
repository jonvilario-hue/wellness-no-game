import { BrainCircuit, Settings } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export function Header() {
  return (
    <header className="px-4 sm:px-6 md:px-8 py-4 border-b bg-card">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex-1 flex justify-start">
          {/* Placeholder for left-aligned content if needed */}
        </div>
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <BrainCircuit className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold text-foreground font-headline tracking-tight">
            Cognitive Crucible
            </h1>
        </Link>
        <div className="flex-1 flex justify-end">
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
