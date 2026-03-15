'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { GraduationCap, Target, HeartPulse, BookMarked, Calendar, BrainCircuit } from 'lucide-react';
import { AssistantTooltip } from './assistant-tooltip';

const navLinks = [
    { 
      href: '/exercises', 
      icon: HeartPulse, 
      label: 'Health Check',
      tooltip: 'Manage your physical and emotional baseline. Track movement and stillness to support high cognitive output.'
    },
    { 
      href: '/skills', 
      icon: BrainCircuit, 
      label: 'Skill Builder',
      tooltip: 'Cognitive and interpersonal laboratory. Master speed reading, vocal presence, and persuasive dialogue through adaptive drills.'
    },
    { 
      href: '/study', 
      icon: GraduationCap, 
      label: 'Scholar Hub',
      tooltip: 'Your training center for active learning. Use spaced repetition, dual coding, and logic-based quizzes to build a polymathic memory.'
    },
    { 
      href: '/architecture', 
      icon: Target, 
      label: 'My Architecture',
      tooltip: 'Design and deconstruct your future. Map identity-driven goals into actionable blueprints using psychological frameworks.'
    },
    { 
      href: '/tools', 
      icon: BookMarked, 
      label: 'Reflections',
      tooltip: 'A digital laboratory for your thoughts and resources. Manage your notebook, nutritional intake, and financial health in one place.'
    },
    { 
      href: '/calendar', 
      icon: Calendar, 
      label: 'Calendar',
      tooltip: 'A unified view of your synchronized routine. Track your amalgamated schedule across wellness, study, and project milestones.'
    },
];

export const PageNav = () => {
    const pathname = usePathname();
    
    const isLinkActive = (href: string) => {
        return pathname.startsWith(href);
    };

    return (
      <div className="border-b bg-card">
        <nav className="flex space-x-2 justify-center -mb-px overflow-x-auto no-scrollbar">
            {navLinks.map(({ href, icon: Icon, label, tooltip }) => (
                <AssistantTooltip key={href} text={tooltip} side="bottom">
                  <Link 
                      href={href} 
                      className={cn(
                          "px-4 py-2.5 rounded-t-md text-sm font-medium transition-colors flex items-center gap-2 border-b-2 whitespace-nowrap",
                          isLinkActive(href)
                            ? "border-primary text-primary"
                            : "border-transparent text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
                      )}
                  >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                  </Link>
                </AssistantTooltip>
            ))}
        </nav>
      </div>
    );
};
