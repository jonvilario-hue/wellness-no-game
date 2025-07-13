
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

export function CognitiveFocusBuilder() {
  // Static data for now. Will be replaced by dynamic logic later.
  const focusDomain = {
    name: 'Working Memory',
    key: 'Gwm'
  };
  const daysCompleted = 12;
  const cycleLength = 30;
  const progress = (daysCompleted / cycleLength) * 100;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <BrainCircuit className="w-5 h-5 text-primary" />
          Cognitive Focus Builder
        </CardTitle>
        <CardDescription>Train one skill deeply, 30 days at a time.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div>
            <p className="text-sm font-medium text-muted-foreground">This month's focus</p>
            <p className="text-lg font-bold text-primary">{focusDomain.name}</p>
        </div>
         <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-muted-foreground">
                    Cycle Progress
                </span>
                <span className="text-sm font-bold text-primary">{daysCompleted} / {cycleLength} days</span>
            </div>
            <Progress value={progress} aria-label={`${daysCompleted} of ${cycleLength} days completed in the focus cycle`} />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          {/* This will eventually link to the Focus Builder settings page */}
          <Link href="#"> 
            Adjust Focus <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
