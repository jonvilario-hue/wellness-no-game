
'use client';

import { useState, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Loader2, Zap } from 'lucide-react';
import { getDailyCircuitAction } from '@/app/actions';
import type { DailyCircuitOutput } from '@/ai/flows';
import { gameComponents } from '@/components/training/game-components';
import { chcDomains } from '@/types';
import { Progress } from '@/components/ui/progress';

export default function DailyChallengePage() {
  const [circuit, setCircuit] = useState<DailyCircuitOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const [taskIndex, setTaskIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  useEffect(() => {
    startTransition(async () => {
      const result = await getDailyCircuitAction();
      if (result) {
        setCircuit(result);
      }
    });
  }, []);

  const handleNextTask = () => {
    if (circuit && taskIndex < circuit.segments.length - 1) {
      setTaskIndex(taskIndex + 1);
    } else {
      setCompleted(true);
    }
  };
  
  const currentSegment = circuit?.segments[taskIndex];
  const domainInfo = currentSegment ? chcDomains.find(d => d.key === currentSegment.domain) : null;
  const TaskComponent = domainInfo ? gameComponents[domainInfo.key] : null;

  if (isPending || !circuit) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }

  if (completed) {
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-center">
            <Zap className="h-16 w-16 text-green-500" />
            <h1 className="text-3xl font-bold">Daily Sequence Complete!</h1>
            <p className="text-muted-foreground">You've sharpened your mind for the day. Come back tomorrow!</p>
            <Button asChild>
                <Link href="/">Back to Dashboard</Link>
            </Button>
        </div>
      )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header className="px-4 sm:px-6 md:px-8 py-4 border-b bg-card sticky top-0 z-10">
            <div className="mx-auto max-w-7xl flex items-center justify-between">
            <div className="flex-1 flex justify-start">
                <Button asChild variant="outline">
                <Link href="/">
                    <ArrowLeft className="mr-2" />
                    Back to Dashboard
                </Link>
                </Button>
            </div>
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold text-foreground font-headline tracking-tight">
                    {circuit.circuitTitle}
                </h1>
                <p className="text-sm text-muted-foreground">Task {taskIndex + 1} of {circuit.segments.length}: {domainInfo?.name}</p>
            </div>
            <div className="flex-1 flex justify-end">
                {/* Timer could go here */}
            </div>
            </div>
            <Progress value={((taskIndex + 1) / circuit.segments.length) * 100} className="w-full h-1 mt-2" />
      </header>
       <main className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center gap-6">
        {TaskComponent ? <TaskComponent /> : <p>Loading task...</p>}
        <Button onClick={handleNextTask} size="lg">
          {taskIndex < circuit.segments.length - 1 ? 'Next Task' : 'Finish Sequence'}
        </Button>
      </main>
    </div>
  );
}
