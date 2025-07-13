
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlarmClock, Loader2, Zap } from 'lucide-react';
import { DynamicSequenceTransformer } from '@/components/training/gwm/dynamic-sequence-transformer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function AlarmPage() {
  const [alarmState, setAlarmState] = useState('ringing'); // ringing, solving, dismissed
  const [showPuzzle, setShowPuzzle] = useState(false);
  
  // Use a ref to hold the audio object to avoid re-creation
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // This effect runs only on the client
    if (!audioRef.current) {
        audioRef.current = new Audio('/alarm.mp3'); 
        audioRef.current.loop = true;
    }
    
    const audio = audioRef.current;

    if (alarmState === 'ringing') {
        audio.play().catch(e => console.error("Audio playback failed:", e));
    } else {
        audio.pause();
        audio.currentTime = 0;
    }

    // Cleanup on component unmount
    return () => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }
  }, [alarmState]);


  const handleStartPuzzle = () => {
    setAlarmState('solving');
    setShowPuzzle(true);
  };
  
  const handleDismiss = () => {
    setAlarmState('dismissed');
  };

  return (
    <div className={cn(
        "flex flex-col min-h-screen bg-background text-foreground items-center justify-center transition-all duration-1000 p-4",
        alarmState === 'ringing' && 'bg-destructive animate-pulse'
    )}>
        <Card className="w-full max-w-2xl text-center">
             <CardHeader>
                <div className="flex justify-center mb-4">
                    <AlarmClock className={cn("h-16 w-16", alarmState === 'ringing' ? 'text-destructive-foreground' : 'text-primary')} />
                </div>
                <CardTitle className={cn("text-3xl", alarmState === 'ringing' && 'text-destructive-foreground')}>
                    {alarmState === 'ringing' ? "WAKE UP!" : "Cognitive Warm-up"}
                </CardTitle>
                <CardDescription className={cn(alarmState === 'ringing' && 'text-destructive-foreground/80')}>
                    {alarmState === 'ringing' 
                        ? "Time to start your day! Solve the puzzle to dismiss the alarm." 
                        : "Complete the challenge to silence the alarm."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {alarmState === 'ringing' && (
                    <Button onClick={handleStartPuzzle} size="lg" variant="secondary" className="text-lg">
                        Start Puzzle to Silence
                    </Button>
                )}

                {alarmState === 'solving' && !showPuzzle && <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />}
                
                {showPuzzle && alarmState === 'solving' && (
                   <div className="animate-in fade-in zoom-in-95">
                     <DynamicSequenceTransformer />
                     <Button onClick={handleDismiss} size="lg" variant="default" className="mt-4">
                        Dismiss Alarm
                     </Button>
                   </div>
                )}
                
                {alarmState === 'dismissed' && (
                    <div className="flex flex-col items-center gap-4 text-center animate-in fade-in">
                        <Zap className="h-16 w-16 text-green-500" />
                        <h1 className="text-3xl font-bold">Alarm Dismissed!</h1>
                        <p className="text-muted-foreground">Great work! Your mind is now activated for the day.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
