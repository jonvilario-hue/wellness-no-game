
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Gamepad2, Pen, Layers } from 'lucide-react';

export const PageNav = () => {
    const pathname = usePathname();
    const linkClass = (path: string) =>
      cn(
        "px-4 py-2.5 rounded-t-md text-sm font-medium transition-colors flex items-center gap-2 border-b-2",
        pathname.startsWith(path) && path !== '/' || pathname === path
          ? "border-primary text-primary"
          : "border-transparent text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
      );
  
    return (
      <div className="border-b bg-card">
        <nav className="flex space-x-2 justify-center -mb-px">
            <Link href="/" className={linkClass("/")}>
                <Gamepad2 className="w-4 h-4" />
                <span>Games</span>
            </Link>
            <Link href="/tools" className={linkClass("/tools")}>
                <Pen className="w-4 h-4" />
                <span>Tools</span>
            </Link>
            <Link href="/flashcards" className={linkClass("/flashcards")}>
                <Layers className="w-4 h-4" />
                <span>Flashcards</span>
            </Link>
        </nav>
      </div>
    );
};
