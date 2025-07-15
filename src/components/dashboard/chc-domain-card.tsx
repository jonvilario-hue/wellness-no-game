
'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { domainIcons } from '@/components/icons';
import type { CHCDomain } from '@/types';
import { useState, useEffect, memo } from 'react';
import { ArrowDown, ArrowUp, Info, Minus, BrainCircuit, Sigma } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { useTrainingFocus } from '@/hooks/use-training-focus';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

interface ChcDomainCardProps {
  domain: {
    key: CHCDomain;
    name: string;
    description: string;
    gameTitle: string;
    tasks: string[];
    supportsMath: boolean;
  };
}

const ChcDomainCardComponent = ({ domain }: ChcDomainCardProps) => {
  const Icon = domainIcons[domain.key];
  const [data, setData] = useState<{ score: number; trend: number } | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { focus: globalFocus, isLoaded: isGlobalFocusLoaded } = useTrainingFocus();

  useEffect(() => {
    setIsClient(true);

    const keySeed = domain.key.charCodeAt(0) + domain.key.charCodeAt(1);
    const pseudoRandom = (seed: number) => {
        let x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    };

    const generatedScore = 50 + ((keySeed * 13) % 40);
    const randomFactor1 = pseudoRandom(keySeed + 1) * 5;
    const randomFactor2 = pseudoRandom(keySeed + 2) * 5;
    
    const startScore = generatedScore - 10 + randomFactor1;
    const endScore = generatedScore + randomFactor2;
    
    let trend = 0;
    if(startScore > 0) {
        trend = ((endScore - startScore) / startScore) * 100;
    }
    setData({ score: Math.round(generatedScore), trend });
  }, [domain.key]);


  const getTrendInfo = () => {
    if (!data) return { Icon: Minus, color: 'text-primary', text: 'Calculating...' };
    if (data.trend > 2) {
      return { Icon: ArrowUp, color: 'text-green-500', text: 'Trending upward' };
    }
    if (data.trend < -2) {
      return { Icon: ArrowDown, color: 'text-muted-foreground', text: 'Natural fluctuation' };
    }
    return { Icon: Minus, color: 'text-primary', text: 'Holding steady' };
  };

  const { Icon: TrendIcon, color: trendColor, text: trendText } = getTrendInfo();
  
  const isLoaded = isGlobalFocusLoaded;
  
  const isMathMode = isLoaded && globalFocus === 'math' && domain.supportsMath;
  const ModeIcon = isMathMode ? Sigma : BrainCircuit;

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2 flex-grow">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <CardTitle className="font-headline text-base">{domain.name}</CardTitle>
          <CardDescription className="text-xs">{domain.description}</CardDescription>
        </div>
        {isLoaded && domain.supportsMath && (
           <TooltipProvider>
             <Tooltip delayDuration={0}>
               <TooltipTrigger>
                  <ModeIcon className={cn("w-5 h-5", isMathMode ? "text-energize" : "text-muted-foreground")} />
               </TooltipTrigger>
               <TooltipContent>
                 <p>Mode: {isMathMode ? 'Math Reasoning' : 'Core Thinking'}</p>
               </TooltipContent>
             </Tooltip>
           </TooltipProvider>
        )}
      </CardHeader>
      <CardContent className="space-y-4 py-4 flex-grow">
        {!isClient || !data ? (
          <div className="space-y-3 pt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <TooltipProvider>
            <div>
              <div className="flex justify-between items-center mb-1">
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <span className="text-sm font-medium text-muted-foreground flex items-center gap-1 cursor-help">
                        Current Score <Info className="w-3 h-3"/>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Adaptive skill rating (50 = average, 100 = high mastery)</p>
                    </TooltipContent>
                  </Tooltip>
                <span className="text-sm font-bold text-primary">{Math.round(data.score)}</span>
              </div>
              <Progress value={data.score} />
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <span className="flex items-center gap-1 cursor-help">
                      Weekly Trend <Info className="w-3 h-3"/>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{trendText}</p>
                  </TooltipContent>
                </Tooltip>
                <div className={`flex items-center font-bold ${trendColor}`}>
                    <TrendIcon className="w-4 h-4 mr-1"/>
                    {data.trend.toFixed(1)}%
                </div>
            </div>
          </TooltipProvider>
        )}
      </CardContent>
      <CardFooter className="flex items-center gap-2 pt-0">
        <Button asChild className="w-full">
          <Link href={`/training/${domain.key}`}>{domain.gameTitle}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export const ChcDomainCard = memo(ChcDomainCardComponent);
