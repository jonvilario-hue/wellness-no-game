
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
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface ChcDomainCardProps {
  domain: {
    key: CHCDomain;
    name: string;
    description: string;
  };
}

export function ChcDomainCard({ domain }: ChcDomainCardProps) {
  const Icon = domainIcons[domain.key];

  const [score, setScore] = useState(0);
  const [trendData, setTrendData] = useState<{ week: string; score: number }[]>([]);
  const [trend, setTrend] = useState(0);
  const [isClient, setIsClient] = useState(false);

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
    setTrendData(generatedTrendData);

    const startScore = generatedTrendData[0].score;
    const endScore = generatedTrendData[generatedTrendData.length - 1].score;
    if(startScore > 0) {
        const pctChange = ((endScore - startScore) / startScore) * 100;
        setTrend(pctChange);
    }
    
    setIsClient(true);
  }, [domain.key]);

  if (!isClient) {
    // Render a placeholder or skeleton while waiting for client-side rendering
    return (
      <Card className="flex flex-col h-full">
        <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
           <div className="p-3 bg-primary/10 rounded-lg">
             <Icon className="w-6 h-6 text-primary" />
           </div>
           <div>
             <CardTitle className="font-headline text-lg">{domain.name}</CardTitle>
             <CardDescription>{domain.description}</CardDescription>
           </div>
         </CardHeader>
        <CardContent className="flex-grow space-y-2">
          <div className="animate-pulse bg-muted/50 rounded-md h-8 w-full"></div>
          <div className="animate-pulse bg-muted/50 rounded-md h-16 w-full"></div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled>Start Training</Button>
        </CardFooter>
      </Card>
    );
  }

  const TrendIcon = trend >= 0 ? ArrowUp : ArrowDown;
  const trendColor = trend >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <CardTitle className="font-headline text-lg">{domain.name}</CardTitle>
          <CardDescription>{domain.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-muted-foreground">
              Current Score
            </span>
            <span className="text-sm font-bold text-primary">{Math.round(score)}</span>
          </div>
          <Progress value={score} aria-label={`Score for ${domain.name} is ${score}`} />
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Weekly Trend</span>
            <div className={`flex items-center font-bold ${trendColor}`}>
                <TrendIcon className="w-4 h-4 mr-1"/>
                {Math.abs(trend).toFixed(1)}%
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/training/${domain.key}`}>Start Training</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
