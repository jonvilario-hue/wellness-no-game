'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Award, Star, Trophy, BrainCircuit, BookOpen, View, Ear, Goal, Archive } from 'lucide-react';
import { domainIcons } from '../icons';

const badges = [
  { icon: domainIcons.Gf, color: 'text-amber-400', title: 'Gf Adept', description: 'Mastered 10 Gf puzzles' },
  { icon: domainIcons.Gc, color: 'text-sky-400', title: 'Gc Scholar', description: 'Reached level 5 in Crystallized Intelligence' },
  { icon: domainIcons.Gwm, color: 'text-rose-400', title: 'Gwm Specialist', description: 'Completed 20 Gwm sessions' },
  { icon: domainIcons.Gs, color: 'text-violet-400', title: 'Gs Sprinter', description: 'Achieved a top 10% score in a Gs task' },
  { icon: domainIcons.Gv, color: 'text-emerald-400', title: 'Gv Visionary', description: 'Solved 15 visual processing challenges' },
  { icon: domainIcons.Ga, color: 'text-orange-400', title: 'Ga Listener', description: 'Perfected 5 auditory puzzles in a row' },
  { icon: domainIcons.Glr, color: 'text-teal-400', title: 'Glr Archivist', description: 'Recalled over 50 items in retrieval tasks' },
  { icon: domainIcons.EF, color: 'text-cyan-400', title: 'EF Captain', description: 'Maintained high focus for 3 consecutive EF sessions' },
];

export function MilestoneBadges() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Award className="w-5 h-5 text-primary" />
          Milestone Badges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="grid grid-cols-4 gap-4 text-center">
            {badges.map((badge, index) => (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <div className="p-2 bg-muted/50 rounded-lg flex justify-center items-center aspect-square cursor-pointer transition-transform hover:scale-110">
                    <badge.icon className={`w-8 h-8 ${badge.color}`} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-bold">{badge.title}</p>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
