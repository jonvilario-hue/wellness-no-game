'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Award, Flame, Shuffle, Repeat, TrendingUp, ShieldCheck, Gem, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

const badges = [
  { icon: Flame, title: 'Neurogrit', description: 'Trained daily for 7 days in a row.', locked: false },
  { icon: Shuffle, title: 'Cognitive Flexer', description: 'Trained in 3+ different domains in a single day.', locked: false },
  { icon: Repeat, title: 'Retry Rebel', description: 'Replayed and improved on a previously challenging task.', locked: true },
  { icon: TrendingUp, title: 'Plateau Breaker', description: 'Achieved a new personal best after a performance plateau.', locked: false },
  { icon: ShieldCheck, title: 'Mistake Tamer', description: 'Recovered to a high score after 3+ early errors.', locked: true },
  { icon: Gem, title: 'Symbol Slayer', description: 'Mastered 5 Gs (Processing Speed) challenges.', locked: false },
  { icon: Compass, title: 'Curious Explorer', description: 'Tried every CHC domain at least once.', locked: false },
  { icon: Award, title: 'Balanced Brain', description: 'Maintained growth across 4+ domains this month.', locked: true },
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
                  <div className={cn(
                    "p-2 rounded-lg flex justify-center items-center aspect-square cursor-pointer transition-transform hover:scale-110",
                    badge.locked ? 'bg-muted/30' : 'bg-primary/10'
                  )}>
                    <badge.icon className={cn(
                      "w-8 h-8",
                      badge.locked ? 'text-muted-foreground/50' : 'text-primary'
                    )} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-bold">{badge.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {badge.locked ? `Hint: ${badge.description}` : badge.description}
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
