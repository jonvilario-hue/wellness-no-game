'use client';

import { useState, useTransition, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getWeakAreaRecommendationsAction } from '@/app/actions';
import type { WeakAreaRecommendationOutput } from '@/ai/flows';
import { Lightbulb, Loader2, Info, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { domainIcons } from '../icons';
import { chcDomains } from '@/types';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';

export function WeakAreaRecommendations() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<WeakAreaRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startTransition(async () => {
      const res = await getWeakAreaRecommendationsAction();
      if (res) {
        setResult(res);
      } else {
        setError('Failed to get recommendations. Please try again.');
      }
    });
  }, []);

  const renderContent = () => {
    if (isPending) {
      return (
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-full mt-2" />
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }

    if (result) {
      if (result.message && result.recommendations.length === 0) {
        return (
          <Alert>
             <Info className="h-4 w-4" />
            <AlertTitle>Not Enough Data Yet</AlertTitle>
            <AlertDescription>
              {result.message} Try a few different training games first.
            </AlertDescription>
          </Alert>
        );
      }

      if (result.recommendations.length > 0) {
        const weakestDomainRec = result.recommendations[0];
        const domainInfo = chcDomains.find(d => d.key === weakestDomainRec.domain);
        const Icon = domainIcons[weakestDomainRec.domain];

        return (
          <div className="space-y-3 text-center">
             <div className="p-3 bg-primary/10 rounded-full inline-block">
                <Icon className="w-8 h-8 text-primary" />
            </div>
            <p className="font-semibold text-lg">
              Today's Growth Focus: {domainInfo?.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {weakestDomainRec.reason}
            </p>
            <Button asChild className="w-full">
              <Link href={`/training/${weakestDomainRec.domain}`}>
                Train {domainInfo?.name} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        );
      }
    }
    
    return <p className="text-muted-foreground text-sm">Could not load recommendation.</p>;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Lightbulb className="w-5 h-5 text-primary" />
          Weak Area Targeting
        </CardTitle>
        <CardDescription>
          AI-driven suggestions to turn your weaknesses into strengths.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}
