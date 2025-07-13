
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
import { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp, Info, Minus } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface ChcDomainCardProps {
  domain: {
    key: CHCDomain;
    name: string;
    description: string;
    gameTitle: string;
  };
}

export function ChcDomainCard({ domain }: ChcDomainCardProps) {
  const Icon = domainIcons[domain.key];

  const [score, setScore] = useState(0);
  const [trend, setTrend] = useState(0);

  useEffect(() => {
    // This effect runs only once on the client after mounting
    const generatedScore = (domain.key.charCodeAt(0) * 3) % 40 + 50;
    const generatedTrendData = [
      { week: 'W1', score: generatedScore - 15 + Math.random() * 5 },
      { week: 'W2', score: generatedScore - 10 + Math.random() * 5 },
      { week: 'W3', score: generatedScore - 5 + Math.random() * 5 },
      { week: 'W4', score: generatedScore },
    ].map(d => ({ ...d, score: Math.max(0, Math.min(100, d.score)) }));
    
    setScore(generatedScore);

    const startScore = generatedTrendData[0].score;
    const endScore = generatedTrendData[generatedTrendData.length - 1].score;
    if(startScore > 0) {
        const pctChange = ((endScore - startScore) / startScore) * 100;
        setTrend(pctChange);
    }
  }, [domain.key]);

  const getTrendInfo = () => {
    if (trend > 2) {
      return { Icon: ArrowUp, color: 'text-green-500', text: 'Trending upward' };
    }
    if (trend < -2) {
      return { Icon: ArrowDown, color: 'text-muted-foreground', text: 'Natural fluctuation' };
    }
    return { Icon: Minus, color: 'text-primary', text: 'Holding steady' };
  };

  const { Icon: TrendIcon, color: trendColor, text: trendText } = getTrendInfo();


  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <CardTitle className="font-headline text-lg">{domain.gameTitle}</CardTitle>
          <CardDescription className="text-sm">{domain.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
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
            <span className="text-sm font-bold text-primary">{Math.round(score)}</span>
          </div>
          <Progress value={score} aria-label={`Score for ${domain.name} is ${score}`} />
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
                {trend.toFixed(1)}%
            </div>
        </div>
        </TooltipProvider>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/training/${domain.key}`}>Start Training</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
