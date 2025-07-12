'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Award, Flame, Shuffle, Repeat, TrendingUp, ShieldCheck, Gem, Compass } from 'lucide-react';

const badges = [
  { icon: Flame, color: 'text-primary', title: 'Neurogrit', description: 'Trained daily for 7 days in a row.' },
  { icon: Shuffle, color: 'text-primary', title: 'Cognitive Flexer', description: 'Trained in 3+ different domains in a single day.' },
  { icon: Repeat, color: 'text-primary', title: 'Retry Rebel', description: 'Replayed and improved on a previously challenging task.' },
  { icon: TrendingUp, color: 'text-primary', title: 'Plateau Breaker', description: 'Achieved a new personal best after a performance plateau.' },
  { icon: ShieldCheck, color: 'text-primary', title: 'Mistake Tamer', description: 'Recovered to a high score after 3+ early errors.' },
  { icon: Gem, color: 'text-primary', title: 'Symbol Slayer', description: 'Mastered 5 Gs (Processing Speed) challenges.' },
  { icon: Compass, color: 'text-primary', title: 'Curious Explorer', description: 'Tried every CHC domain at least once.' },
  { icon: Award, color: 'text-primary', title: 'Balanced Brain', description: 'Maintained growth across 4+ domains this month.' },
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
