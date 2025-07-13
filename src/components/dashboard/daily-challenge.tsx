
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, TrendingUp, Zap, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useTransition } from 'react';
import { getTrainingRecommendationAction } from '@/app/actions';
import type { TrainingRecommendationOutput } from '@/ai/flows';
import { domainIcons } from '../icons';
import { Skeleton } from '../ui/skeleton';

const recommendationIcons = {
  weakArea: TrendingUp,
  performanceInsight: Lightbulb,
  momentumStarter: Zap,
};

export function DailyChallenge() {
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
             <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <Skeleton className="h-12 w-12 rounded-lg bg-primary/20" />
                       <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px] bg-primary/20" />
                            <Skeleton className="h-4 w-[200px] bg-primary/20" />
                       </div>
                    </div>
                    <Skeleton className="h-10 w-32 rounded-md bg-primary/20" />
                </CardContent>
            </Card>
        )
    }

    const RecIcon = recommendationIcons[recommendation.recommendationType];

    return (
        <Card className="bg-primary/10 border-primary/20 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                        <RecIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-foreground">{recommendation.title}</h3>
                        <p className="text-muted-foreground">{recommendation.description}</p>
                    </div>
                </div>
                <Button asChild>
                    <Link href={`/training/${recommendation.domain}`}>
                        Start Training <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}
