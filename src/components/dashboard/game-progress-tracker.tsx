
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Award, Puzzle, TrendingUp, Zap, Calendar, Target, BrainCircuit, Info, Lightbulb, X, ArrowRight } from 'lucide-react';
import { Progress } from '../ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DomainStreak, type DomainStreakProps } from './domain-streak';
import { ScrollArea } from '../ui/scroll-area';
import { useTheme } from '@/hooks/use-theme';
import { GrowthDecoration } from '../ui/growth-decoration';

const progressData = {
  puzzlesToday: 12,
  puzzlesWeekly: 68,
  puzzlesGoal: 100,
  sessionStreak: 5,
  effortAverage: 7.8,
  topDomain: '(Gf)',
};

const domainStreaksData: DomainStreakProps[] = [
    { domainKey: 'Gf', name: '(Gf) Fluid Reasoning', streak: 12, isTop: true },
    { domainKey: 'Gwm', name: '(Gwm) Working Memory', streak: 8, isTop: false },
    { domainKey: 'Gs', name: '(Gs) Processing Speed', streak: 5, isTop: false },
    { domainKey: 'EF', name: '(EF) Executive Function', streak: 3, isTop: false },
    { domainKey: 'Gc', name: '(Gc) Crystallized Intelligence', streak: 7, isTop: false },
    { domainKey: 'Gv', name: '(Gv) Visual Processing', streak: 4, isTop: false },
    { domainKey: 'Ga', name: '(Ga) Auditory Processing', streak: 2, isTop: false },
    { domainKey: 'Glr', name: '(Glr) Long-Term Retrieval', streak: 9, isTop: false },
].sort((a, b) => b.streak - a.streak);

const INSIGHT_KEY = 'gameProgressInsightDismissed';

export function GameProgressTracker() {
  const weeklyProgress = (progressData.puzzlesWeekly / progressData.puzzlesGoal) * 100;
  const [insight, setInsight] = useState('');
  const [isInsightVisible, setIsInsightVisible] = useState(false);
  const { organicGrowth } = useTheme();

  useEffect(() => {
    const dismissed = localStorage.getItem(INSIGHT_KEY);
    if (dismissed !== 'true') {
      setIsInsightVisible(true);
    }
    const topStreak = domainStreaksData.find(d => d.isTop);
    if (topStreak) {
        setInsight(`Your ${topStreak.name} streak is on fire! This consistency sharpens your logical decision-making skills.`);
    }
  }, []);

  const handleDismissInsight = () => {
    setIsInsightVisible(false);
    localStorage.setItem(INSIGHT_KEY, 'true');
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col relative overflow-hidden">
      {organicGrowth && <GrowthDecoration />}
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Puzzle className="w-5 h-5 text-primary" />
          Game Progress
        </CardTitle>
        <CardDescription>Track your training performance and skill growth.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-grow">
        <Tabs defaultValue="progress">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="streaks">Streaks</TabsTrigger>
                <TabsTrigger value="insight">Insight</TabsTrigger>
            </TabsList>
            <TabsContent value="progress" className="pt-4">
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
            </TabsContent>
            <TabsContent value="streaks" className="pt-4">
                 <ScrollArea className="h-[200px] pr-3 -mr-3">
                      <div className="space-y-2">
                           {domainStreaksData.map((streak) => (
                              <DomainStreak key={streak.domainKey} {...streak} />
                           ))}
                      </div>
                  </ScrollArea>
            </TabsContent>
            <TabsContent value="insight" className="pt-4 min-h-[120px] flex items-center justify-center">
                {isInsightVisible && insight ? (
                    <div className="p-3 bg-primary/10 rounded-lg text-center relative">
                        <p className="text-sm flex items-start gap-2 pr-6">
                            <Lightbulb className="w-5 h-5 mt-0.5 text-primary shrink-0"/> 
                            <span className="text-foreground text-left"><span className="font-bold">Insight:</span> {insight}</span>
                        </p>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute top-1 right-1 h-6 w-6"
                            onClick={handleDismissInsight}
                            aria-label="Dismiss insight"
                        >
                            <X className="h-4 h-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground p-4">
                        <Lightbulb className="mx-auto h-6 w-6 mb-2"/>
                        <p className="font-semibold">No new insights right now.</p>
                        <p className="text-xs">Play more games to unlock personalized feedback.</p>
                    </div>
                )}
            </TabsContent>
        </Tabs>
      </CardContent>
       <CardFooter>
        <Button variant="outline" className="w-full" asChild>
            <Link href="/calendar">
                View Calendar <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
