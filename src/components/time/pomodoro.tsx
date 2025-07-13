
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Forward, Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type PomodoroMode = 'work' | 'shortBreak' | 'longBreak';

export function PomodoroTimer() {
    const [mode, setMode] = useState<PomodoroMode>('work');
    const [cycles, setCycles] = useState(0);
    const [isActive, setIsActive] = useState(false);
    
    const timeForMode: Record<PomodoroMode, number> = {
        work: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60,
    };
    
    const [timeLeft, setTimeLeft] = useState(timeForMode[mode]);
    
    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pomodoro Timer</CardTitle>
        <CardDescription>Break down your work into focused intervals, separated by short breaks.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 flex flex-col items-center">
        
         <Tabs value={mode} onValueChange={(value) => setMode(value as PomodoroMode)} className="w-full max-w-sm">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="work">Focus</TabsTrigger>
                <TabsTrigger value="shortBreak">Short Break</TabsTrigger>
                <TabsTrigger value="longBreak">Long Break</TabsTrigger>
            </TabsList>
        </Tabs>

        <div className="font-mono text-8xl md:text-9xl tracking-tighter w-full text-center py-4 rounded-lg">
            {formatTime(timeLeft)}
        </div>

        <div className="flex gap-4">
            <Button onClick={() => setIsActive(!isActive)} size="lg" className="w-40 text-2xl h-16 rounded-2xl">
                {isActive ? <Pause className="w-8 h-8"/> : <Play className="w-8 h-8"/>}
                <span className="ml-2">{isActive ? 'Pause' : 'Start'}</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-16 w-16" title="Skip to next phase">
                <Forward className="w-8 h-8 text-muted-foreground"/>
            </Button>
        </div>
      </CardContent>
       <CardFooter className="flex-col gap-2 text-center text-muted-foreground">
        <p>You've completed {cycles} focus sessions today.</p>
        <p className="text-xs">This feature is in development. Pomodoro cycles are not yet automated.</p>
      </CardFooter>
    </Card>
  );
}
