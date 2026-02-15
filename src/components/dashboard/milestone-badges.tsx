
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Award, ArrowRight, Lightbulb, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { badges } from '@/data/badges';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { GrowthDecoration } from '../ui/growth-decoration';

const top8BadgeKeys = [
  'neurogrit',
  'cognitive-flexer',
  'blindspot-breaker',
  'growth-mapper',
  'mistake-tamer',
  'focus-hero',
  'flow-seeker',
  'curious-explorer',
];

const INSIGHT_KEY = 'milestoneBadgesInsightDismissed';

export function MilestoneBadges() {
  const [isInsightVisible, setIsInsightVisible] = useState(false);
  const { organicGrowth } = useTheme();

  useEffect(() => {
    const dismissed = localStorage.getItem(INSIGHT_KEY);
    if (dismissed !== 'true') {
      setIsInsightVisible(true);
    }
  }, []);

  const handleDismissInsight = () => {
    setIsInsightVisible(false);
    localStorage.setItem(INSIGHT_KEY, 'true');
  };

  const displayedBadges = useMemo(() => {
    return top8BadgeKeys.map(key => badges.find(b => b.key === key)).filter(Boolean);
  }, []);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col relative overflow-hidden">
      {organicGrowth && <GrowthDecoration />}
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Award className="w-5 h-5 text-primary" />
          Milestone Badges
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <TooltipProvider>
          <div className="grid grid-cols-4 gap-4 text-center">
            {displayedBadges.map((badge, index) => (
              <Tooltip key={badge?.key || index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <div className={cn(
                    "p-2 rounded-lg flex justify-center items-center aspect-square cursor-pointer transition-transform hover:scale-110",
                    badge?.locked ? 'bg-muted/30' : 'bg-primary/10'
                  )}>
                    {badge && <badge.icon className={cn(
                      "w-8 h-8",
                      badge.locked ? 'text-muted-foreground/50' : 'text-primary'
                    )} />}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-bold">{badge?.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {badge?.description}
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
        {isInsightVisible && (
          <div className="p-3 bg-primary/10 rounded-lg text-center relative mt-4">
              <p className="text-sm flex items-start gap-2 pr-6">
                  <Lightbulb className="w-5 h-5 mt-0.5 text-primary shrink-0"/> 
                  <span className="text-foreground text-left"><span className="font-bold">Insight:</span> Earn badges by completing streaks, trying new games, and hitting training milestones.</span>
              </p>
              <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-1 right-1 h-6 w-6"
                  onClick={handleDismissInsight}
                  aria-label="Dismiss insight"
              >
                  <X className="h-4 w-4" />
              </Button>
          </div>
        )}
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
