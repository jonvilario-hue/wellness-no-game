'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useTransition } from 'react';
import { getDailyCircuitAction } from '@/app/actions';
import type { DailyCircuitOutput } from '@/ai/flows';
import { domainIcons } from '../icons';
import { Skeleton } from '../ui/skeleton';

export function DailyChallenge() {
  const [circuit, setCircuit] = useState<DailyCircuitOutput | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await getDailyCircuitAction();
      setCircuit(result);
    });
  }, []);

  if (isPending || !circuit) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-muted/50 p-4 flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-lg bg-primary/20" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-3/4 bg-primary/20" />
                  <Skeleton className="h-4 w-full bg-primary/20" />
                </div>
              </Card>
            ))}
          </div>
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    );
  }

  const firstGameDomain = circuit.segments[0].domain;

  return (
    <Card className="bg-primary/5 border-primary/20 hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-2xl flex items-center justify-center gap-2">
            <Zap className="w-6 h-6 text-primary"/>
            {circuit.circuitTitle}
        </CardTitle>
        <CardDescription>
          Your daily 3-part cognitive workout to sharpen your mind.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {circuit.segments.map((segment, index) => {
            const Icon = domainIcons[segment.domain];
            return (
              <Card key={index} className="bg-muted/30 p-4 flex flex-col items-center text-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className='flex-grow'>
                  <h4 className="font-bold text-lg text-foreground">{segment.title}</h4>
                  <p className="text-sm text-muted-foreground">{segment.transferAnchor}</p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                    <Link href={`/training/${segment.domain}`}>
                        Train: {segment.gameTitle}
                    </Link>
                </Button>
              </Card>
            );
          })}
        </div>
        <Button asChild size="lg" className="w-full">
          {/* This button could eventually launch a special "circuit" mode */}
          <Link href={`/training/${firstGameDomain}`}>
            Start Daily Circuit <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
