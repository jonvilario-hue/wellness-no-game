'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Gamepad2, Pen, Layers, ClipboardCheck, Library, GraduationCap, Target, HeartPulse } from 'lucide-react';

const navLinks = [
    { href: '/', icon: Gamepad2, label: 'PuzzleMaster' },
    { href: '/tools', icon: ClipboardCheck, label: 'Reflections' },
    { href: '/exercises', icon: HeartPulse, label: 'Exercises' },
    { href: '/study', icon: GraduationCap, label: 'Scholar Hub' },
    { href: '/blueprints', icon: Target, label: 'Architect Lab' },
];

export const PageNav = () => {
    const pathname = usePathname();
    
    const isLinkActive = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    return (
      <div className="border-b bg-card">
        <nav className="flex space-x-2 justify-center -mb-px">
            {navLinks.map(({ href, icon: Icon, label }) => (
                <Link 
                    key={href} 
                    href={href} 
                    className={cn(
                        "px-4 py-2.5 rounded-t-md text-sm font-medium transition-colors flex items-center gap-2 border-b-2",
                        isLinkActive(href)
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
                    )}
                >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                </Link>
            ))}
        </nav>
      </div>
    );
};
