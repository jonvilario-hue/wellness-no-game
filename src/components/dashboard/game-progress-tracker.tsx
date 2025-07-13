
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Puzzle, TrendingUp, Zap, Calendar, Target, BrainCircuit, Info } from 'lucide-react';
import { Progress } from '../ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const progressData = {
  puzzlesToday: 12,
  puzzlesWeekly: 68,
  puzzlesGoal: 100,
  sessionStreak: 5,
  effortAverage: 7.8,
  topDomain: 'Fluid Reasoning',
};

export function GameProgressTracker() {
  const weeklyProgress = (progressData.puzzlesWeekly / progressData.puzzlesGoal) * 100;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Puzzle className="w-5 h-5 text-primary" />
          Game Progress
        </CardTitle>
        <CardDescription>Track your training performance and skill growth.</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
