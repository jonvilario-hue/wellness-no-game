
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Award, Puzzle, TrendingUp, Zap, Calendar, Target, BrainCircuit, Info, Lightbulb, X, ArrowRight } from 'lucide-react';
import { Progress } from '../ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

const progressData = {
  puzzlesToday: 12,
  puzzlesWeekly: 68,
  puzzlesGoal: 100,
  sessionStreak: 5,
  effortAverage: 7.8,
  topDomain: 'Fluid Reasoning',
};

const INSIGHT_KEY = 'gameProgressInsightDismissed';

export function GameProgressTracker() {
  const weeklyProgress = (progressData.puzzlesWeekly / progressData.puzzlesGoal) * 100;
  const [isInsightVisible, setIsInsightVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(INSIGHT_KEY);
    if (dismissed !== 'true') {
      setIsInsightVisible(true);
    }
  }, []);

  const handleDismissInsight = () => {
    setIsInsightVisible(false);
    localStorage.setItem(INSIGHT_KEY, 'true');
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Puzzle className="w-5 h-5 text-primary" />
          Game Progress
        </CardTitle>
        <CardDescription>Track your training performance and skill growth.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-grow">
        <TooltipProvider>
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1 cursor-help">
                                Weekly Goal <Info className="w-3 h-3"/>
                            </span>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>Puzzles completed this week towards your goal of {progressData.puzzlesGoal}.</p>
                            </TooltipContent>
                        </Tooltip>
                        <span className="text-sm font-bold text-primary">{progressData.puzzlesWeekly} / {progressData.puzzlesGoal}</span>
                    </div>
                    <Progress value={weeklyProgress} aria-label={`Weekly puzzle progress: ${progressData.puzzlesWeekly} of ${progressData.puzzlesGoal}`} />
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4"/>
                            <span className="font-medium">Today</span>
                        </div>
                        <span className="font-bold">{progressData.puzzlesToday} puzzles</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Zap className="w-4 h-4"/>
                            <span className="font-medium">Streak</span>
                        </div>
                        <span className="font-bold">{progressData.sessionStreak} days</span>
                    </div>
                     <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Target className="w-4 h-4"/>
                            <span className="font-medium">Avg. Effort</span>
                        </div>
                        <span className="font-bold">{progressData.effortAverage.toFixed(1)}/10</span>
                    </div>
                     <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <BrainCircuit className="w-4 h-4"/>
                            <span className="font-medium">Top Domain</span>
                        </div>
                        <span className="font-bold truncate">{progressData.topDomain}</span>
                    </div>
                </div>

            </div>
        </TooltipProvider>
        {isInsightVisible && (
            <div className="p-3 bg-primary/10 rounded-lg text-center relative mt-2">
                <p className="text-sm flex items-start gap-2 pr-6">
                    <Lightbulb className="w-5 h-5 mt-0.5 text-primary shrink-0"/> 
                    <span className="text-foreground text-left"><span className="font-bold">Insight:</span> This panel tracks your performance, like weekly goals and session streaks.</span>
                </p>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-1 right-1 h-6 w-6"
                    onClick={handleDismissInsight}
                    aria-label="Dismiss insight"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        )}
      </CardContent>
       <CardFooter>
        <Button variant="outline" className="w-full" asChild>
            <Link href="/calendar">
                View Calendar <ArrowRight className="ml-2" />
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
