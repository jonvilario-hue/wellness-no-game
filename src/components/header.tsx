import { BrainCircuit, Settings } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export function Header() {
  return (
    <header className="px-4 sm:px-6 md:px-8 py-4 border-b bg-card">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <div className="w-10"></div>
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <BrainCircuit className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold text-foreground font-headline tracking-tight">
            Cognitive Crucible
            </h1>
        </Link>
        <div className="w-10"></div>
      </div>
    </header>
  );
}
