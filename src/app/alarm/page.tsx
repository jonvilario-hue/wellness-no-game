
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { AlarmClock, Loader2, Zap, ThumbsUp, Sparkles, BrainCircuit } from 'lucide-react';
import { DynamicSequenceTransformer } from '@/components/training/gwm/dynamic-sequence-transformer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useSleepStore } from '@/hooks/use-sleep-store';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type AlarmState = 'ringing' | 'solving' | 'dismissed' | 'tagged';

const ReadinessGauge = ({ score }: { score: number }) => {
    const data = [
        { name: 'Score', value: score },
        { name: 'Remaining', value: 100 - score },
    ];
    const COLORS = ['hsl(var(--primary-hsl))', 'hsl(var(--muted-hsl))'];
    return (
        <div className="relative w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={0}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-primary">{score}</span>
                <span className="text-sm font-medium text-muted-foreground">Readiness</span>
            </div>
        </div>
    );
};

export default function AlarmPage() {
  const [alarmState, setAlarmState] = useState<AlarmState>('ringing');
  const [showPuzzle, setShowPuzzle] = useState(false);
  const { readinessScore, feedbackSummary, difficulty, generateNewSleepCycle } = useSleepStore();
  
  useEffect(() => {
    // Generate a new sleep cycle and readiness score when the page loads
    generateNewSleepCycle();
  }, [generateNewSleepCycle]);

  const handleStartPuzzle = () => {
    setAlarmState('solving');
    setTimeout(() => setShowPuzzle(true), 500); // Small delay for transition
  };
  
  const handleDismiss = () => {
    setAlarmState('dismissed');
  };

  const handleTaggingComplete = () => {
    setAlarmState('tagged');
  }

  const renderContent = () => {
    switch(alarmState) {
        case 'ringing':
            return (
                <CardContent>
                     <Button onClick={handleStartPuzzle} size="lg" variant="secondary" className="text-lg animate-pulse">
                        Start Puzzle to Silence
                    </Button>
                </CardContent>
            )
        case 'solving':
             return (
                <CardContent>
                    {!showPuzzle && <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />}
                    {showPuzzle && (
                        <div className="animate-in fade-in zoom-in-95">
                            <DynamicSequenceTransformer difficulty={difficulty} onComplete={handleDismiss}/>
                             <div className="flex flex-col items-center gap-2 mt-4">
                                <Button onClick={handleDismiss} variant="link" className="text-muted-foreground">
                                    Skip Puzzle
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
             )
        case 'dismissed':
            return (
                <>
                <CardContent className="space-y-6 animate-in fade-in flex flex-col items-center">
                    <ReadinessGauge score={readinessScore} />
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Today's Cognitive Readiness: {readinessScore}/100</h2>
                        <p className="text-muted-foreground max-w-md mx-auto">{feedbackSummary}</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleTaggingComplete} className="w-full">
                        Continue
                    </Button>
                </CardFooter>
                </>
            )
        case 'tagged':
            return (
                <CardContent className="text-center animate-in fade-in">
                     <ThumbsUp className="h-16 w-16 text-green-500 mx-auto" />
                    <h1 className="text-3xl font-bold mt-4">All Set for the Day!</h1>
                    <p className="text-muted-foreground">Have a great and productive day.</p>
                </CardContent>
            )
    }
  }

  return (
    <div className={cn(
        "flex flex-col min-h-screen bg-background text-foreground items-center justify-center transition-all duration-1000 p-4",
        alarmState === 'ringing' && 'bg-destructive'
    )}>
        <Card className="w-full max-w-2xl text-center">
             <CardHeader>
                <div className="flex justify-center mb-4">
                     {alarmState === 'dismissed' ? 
                        <BrainCircuit className="h-16 w-16 text-primary" /> :
                        <AlarmClock className={cn("h-16 w-16", alarmState === 'ringing' ? 'text-destructive-foreground' : 'text-primary')} />
                     }
                </div>
                <CardTitle className={cn("text-3xl", alarmState === 'ringing' && 'text-destructive-foreground')}>
                    {alarmState === 'ringing' && "WAKE UP!"}
                    {alarmState === 'solving' && "Cognitive Warm-up"}
                    {alarmState === 'dismissed' && "Cognitive Readiness"}
                    {alarmState === 'tagged' && "Ready to Go!"}
                </CardTitle>
                <CardDescription className={cn(alarmState === 'ringing' && 'text-destructive-foreground/80')}>
                    {alarmState === 'ringing' && "Time to start your day! Solve the puzzle to dismiss the alarm."}
                    {alarmState === 'solving' && `Complete the challenge to silence the alarm. Difficulty: ${difficulty}`}
                    {alarmState === 'dismissed' && "Here is your readiness score based on last night's simulated sleep."}
                    {alarmState === 'tagged' && "You're all set for a great day."}
                </CardDescription>
            </CardHeader>
            {renderContent()}
        </Card>
    </div>
  );
}
