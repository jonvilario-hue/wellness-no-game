
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Lightbulb, TrendingUp, Zap, X } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import type { TrainingRecommendationOutput } from '@/ai/flows';
import { useState, useEffect, useTransition } from 'react';
import { getTrainingRecommendationAction } from '@/app/actions';
import { Skeleton } from '../ui/skeleton';
import { useTheme } from '@/hooks/use-theme';
import { GrowthDecoration } from '../ui/growth-decoration';
import { usePerformanceStore } from '@/hooks/use-performance-store';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';

const recommendationIcons = {
  weakArea: TrendingUp,
  performanceInsight: Lightbulb,
  momentumStarter: Zap,
};

export function PerformanceInsights() {
  const [recommendation, setRecommendation] = useState<TrainingRecommendationOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { organicGrowth } = useTheme();
  const { performance } = usePerformanceStore();
  const { settings } = useDashboardSettings();


  useEffect(() => {
    startTransition(async () => {
      const flatPerformanceData = Object.entries(performance).map(([domain, data]) => ({
        domain,
        score: data.neutral.score,
        trend: data.neutral.trend,
      })) as any;
      const result = await getTrainingRecommendationAction(flatPerformanceData);
      setRecommendation(result);
    });
  }, [performance]);

  const renderBody = () => {
    if (isPending || !recommendation) {
      return (
        <div className="flex-grow flex flex-col justify-center items-center text-center space-y-3">
          <Skeleton className="w-16 h-16 rounded-full" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
      );
    }

    const RecIcon = recommendationIcons[recommendation.recommendationType] || Sparkles;

    return (
      <div className="flex-grow flex flex-col justify-center items-center text-center space-y-3">
        <div className="p-3 bg-primary/10 rounded-full">
            <RecIcon className="w-8 h-8 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
            {recommendation.description}
        </p>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/training/${recommendation.domain}`}>{recommendation.title}</Link>
        </Button>
      </div>
    );
  };


  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col relative overflow-hidden">
      {organicGrowth && <GrowthDecoration />}
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Sparkles className="w-5 h-5 text-primary" />
          Procedural Insights
        </CardTitle>
        <CardDescription>
          Personalized tips based on your recent activity logs.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        {renderBody()}

        {settings.assistantMode && (
          <div className="p-3 bg-primary/10 rounded-lg text-center relative mt-2 animate-in fade-in slide-in-from-top-1">
            <p className="text-xs flex items-start gap-2 text-left">
              <Lightbulb className="w-4 h-4 mt-0.5 text-primary shrink-0" />
              <span className="text-foreground">
                <span className="font-bold">Logic Engine:</span> This card uses a deterministic decision tree. 
                Priority 1: Time of day (AM favors EF). 
                Priority 2: Momentum (returns after breaks favor strengths). 
                Priority 3: Growth (lowest score targeted). 
                <strong>No LLM used.</strong>
              </span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
