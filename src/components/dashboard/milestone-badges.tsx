'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Award, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { badges } from '@/data/badges';
import { Button } from '../ui/button';
import Link from 'next/link';

export function MilestoneBadges() {
  const displayedBadges = badges.slice(0, 8);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Award className="w-5 h-5 text-primary" />
          Milestone Badges
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <TooltipProvider>
          <div className="grid grid-cols-4 gap-4 text-center">
            {displayedBadges.map((badge, index) => (
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
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
            <Link href="/badges">
                View All Badges <ArrowRight className="ml-2" />
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
