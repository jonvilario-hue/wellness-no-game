'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getWeakAreaRecommendationsAction } from '@/app/actions';
import type { WeakAreaRecommendationOutput } from '@/ai/flows';
import { Lightbulb, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { domainIcons } from '../icons';
import { Separator } from '../ui/separator';

export function WeakAreaRecommendations() {
  const [isPending, startTransition] = useTransition();
  const [recommendations, setRecommendations] = useState<WeakAreaRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendations = () => {
    startTransition(async () => {
      setError(null);
      const result = await getWeakAreaRecommendationsAction();
      if (result) {
        setRecommendations(result);
      } else {
        setError('Failed to get recommendations. Please try again.');
      }
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Lightbulb className="w-5 h-5 text-primary" />
          Weak Area Targeting
        </CardTitle>
        <CardDescription>
          Let AI analyze your performance and suggest focus areas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="flex items-center justify-center h-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="ml-2">Analyzing performance...</p>
          </div>
        ) : recommendations ? (
          <div className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <h3 className="font-semibold">Your Training Plan:</h3>
            <ul className="space-y-4">
              {recommendations.recommendations.map((rec, index) => {
                const Icon = domainIcons[rec.domain];
                return (
                  <li key={index}>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-full mt-1">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{rec.exercise}</p>
                        <p className="text-sm text-muted-foreground">{rec.reason}</p>
                      </div>
                    </div>
                    {index < recommendations.recommendations.length -1 && <Separator className="my-3"/>}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <Button onClick={handleGetRecommendations} className="w-full">
            Get Recommendations
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
