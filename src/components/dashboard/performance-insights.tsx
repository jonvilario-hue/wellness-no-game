'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Sun, Lightbulb, TrendingUp, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import type { TrainingRecommendationOutput } from '@/ai/flows';
import { useState, useEffect, useTransition } from 'react';
import { getTrainingRecommendationAction } from '@/app/actions';
import { Skeleton } from '../ui/skeleton';
import { domainIcons } from '../icons';

const recommendationIcons = {
  weakArea: TrendingUp,
  performanceInsight: Lightbulb,
  momentumStarter: Zap,
};

export function PerformanceInsights() {
  const [recommendation, setRecommendation] = useState<TrainingRecommendationOutput | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await getTrainingRecommendationAction();
      setRecommendation(result);
    });
  }, []);

  if (isPending || !recommendation) {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Sparkles className="w-5 h-5 text-primary" />
            Performance Insights
          </CardTitle>
          <CardDescription>
            Personalized tips based on your training habits.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-center items-center text-center space-y-3">
          <Skeleton className="w-16 h-16 rounded-full" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </CardContent>
      </Card>
    );
  }

  const RecIcon = recommendationIcons[recommendation.recommendationType] || Sparkles;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Sparkles className="w-5 h-5 text-primary" />
          Performance Insights
        </CardTitle>
        <CardDescription>
          Personalized tips based on your training habits.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center items-center text-center space-y-3">
        <div className="p-3 bg-primary/10 rounded-full">
            <RecIcon className="w-8 h-8 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
            {recommendation.description}
        </p>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/training/${recommendation.domain}`}>{recommendation.title}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
