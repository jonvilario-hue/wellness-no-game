
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { AlarmClock, Loader2, Zap, ThumbsUp, ThumbsDown } from 'lucide-react';
import { DynamicSequenceTransformer } from '@/components/training/gwm/dynamic-sequence-transformer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

type AlarmState = 'ringing' | 'solving' | 'dismissed' | 'tagged';
type Wakefulness = 'Groggy' | 'Clear' | 'Focused';
const wakefulnessOptions: Wakefulness[] = ['Groggy', 'Clear', 'Focused'];

export default function AlarmPage() {
  const [alarmState, setAlarmState] = useState<AlarmState>('ringing');
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [sleepQuality, setSleepQuality] = useState([3]);
  const [selectedWakefulness, setSelectedWakefulness] = useState<Wakefulness | null>(null);

  const handleStartPuzzle = () => {
    setAlarmState('solving');
    setTimeout(() => setShowPuzzle(true), 500); // Small delay for transition
  };
  
  const handleDismiss = () => {
    setAlarmState('dismissed');
  };

  const handleTaggingComplete = () => {
    // Here you would typically save the data (sleepQuality, selectedWakefulness)
    console.log({
        sleepQuality: sleepQuality[0],
        wakefulness: selectedWakefulness
    });
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
                            <DynamicSequenceTransformer />
                             <div className="flex flex-col items-center gap-2 mt-4">
                                <Button onClick={handleDismiss} size="lg" variant="default" className="w-full sm:w-auto">
                                    Dismiss Alarm
                                </Button>
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
                <CardContent className="space-y-6 animate-in fade-in">
                    <div className="text-center">
                        <Zap className="h-12 w-12 text-green-500 mx-auto mb-2" />
                        <h2 className="text-2xl font-bold">Alarm Dismissed!</h2>
                        <p className="text-muted-foreground">Great work! Your mind is activated.</p>
                    </div>
                    <div className="space-y-4 text-left">
                        <div>
                            <label className="font-semibold">How did you sleep?</label>
                            <div className="flex items-center gap-4 mt-2">
                                <ThumbsDown className="text-muted-foreground" />
                                <Slider value={sleepQuality} onValueChange={setSleepQuality} max={5} step={1} className="flex-1"/>
                                <ThumbsUp className="text-muted-foreground" />
                            </div>
                        </div>
                        <div>
                            <label className="font-semibold">How do you feel now?</label>
                            <div className="flex justify-center gap-2 mt-2">
                                {wakefulnessOptions.map(option => (
                                    <Button 
                                        key={option} 
                                        variant={selectedWakefulness === option ? 'default' : 'secondary'}
                                        onClick={() => setSelectedWakefulness(option)}
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleTaggingComplete} disabled={!selectedWakefulness} className="w-full">
                        Save & Finish
                    </Button>
                </CardFooter>
                </>
            )
        case 'tagged':
            return (
                <CardContent className="text-center animate-in fade-in">
                     <ThumbsUp className="h-16 w-16 text-green-500 mx-auto" />
                    <h1 className="text-3xl font-bold mt-4">All Set for the Day!</h1>
                    <p className="text-muted-foreground">Your feedback helps track what works best for you.</p>
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
                    <AlarmClock className={cn("h-16 w-16", alarmState === 'ringing' ? 'text-destructive-foreground' : 'text-primary')} />
                </div>
                <CardTitle className={cn("text-3xl", alarmState === 'ringing' && 'text-destructive-foreground')}>
                    {alarmState === 'ringing' && "WAKE UP!"}
                    {alarmState === 'solving' && "Cognitive Warm-up"}
                    {alarmState === 'dismissed' && "Log Your Morning"}
                    {alarmState === 'tagged' && "Ready to Go!"}
                </CardTitle>
                <CardDescription className={cn(alarmState === 'ringing' && 'text-destructive-foreground/80')}>
                    {alarmState === 'ringing' && "Time to start your day! Solve the puzzle to dismiss the alarm."}
                    {alarmState === 'solving' && "Complete the challenge to silence the alarm."}
                    {alarmState === 'dismissed' && "A quick log helps track cognitive transfer."}
                    {alarmState === 'tagged' && "Have a great day!"}
                </CardDescription>
            </CardHeader>
            {renderContent()}
        </Card>
    </div>
  );
}
