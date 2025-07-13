
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export function Timer() {
    const [initialTime, setInitialTime] = useState(5 * 60); // 5 minutes
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isActive, setIsActive] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
      if (typeof window !== 'undefined' && !audioRef.current) {
        audioRef.current = new Audio('/alarm.mp3'); 
      }
    }, []);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            if(audioRef.current) {
                audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
            }
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, timeLeft]);

    const handleStartPause = () => {
        setIsActive(!isActive);
    };

    const handleReset = () => {
        setIsActive(false);
        setTimeLeft(initialTime);
        if (timerRef.current) clearInterval(timerRef.current);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };
    
    const adjustTime = (amount: number) => {
        if(isActive) return;
        const newTime = Math.max(0, initialTime + amount);
        setInitialTime(newTime);
        setTimeLeft(newTime);
    }

    const progress = (timeLeft / initialTime) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Countdown Timer</CardTitle>
        <CardDescription>Set a timer for a focused work session or a break.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 flex flex-col items-center">
        <div className="relative w-full flex items-center justify-center">
            {!isActive && (
                <Button onClick={() => adjustTime(-60)} variant="ghost" size="icon" className="absolute left-0">
                    <Minus className="w-6 h-6"/>
                </Button>
            )}
            <div className="font-mono text-7xl md:text-8xl tracking-tighter">
                {formatTime(timeLeft)}
            </div>
             {!isActive && (
                <Button onClick={() => adjustTime(60)} variant="ghost" size="icon" className="absolute right-0">
                    <Plus className="w-6 h-6"/>
                </Button>
            )}
        </div>
        
        <Progress value={progress} className="h-2"/>
        
        <div className="flex gap-4">
          <Button onClick={handleStartPause} size="lg" className="w-32">
            {isActive ? <><Pause className="mr-2" /> Pause</> : <><Play className="mr-2" /> Start</>}
          </Button>
          <Button onClick={handleReset} size="lg" variant="outline" className="w-32">
            <RotateCcw className="mr-2" /> Reset
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}
