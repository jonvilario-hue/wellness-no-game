
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Plus, Minus, PlusCircle, Trash2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Input } from '../ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Label } from '../ui/label';

type TimerState = {
    id: number;
    initialTime: number; // in seconds
    timeLeft: number; // in seconds
    isActive: boolean;
    label: string;
}

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

function TimerInstance({
    timer,
    updateTimer,
    removeTimer
}: {
    timer: TimerState,
    updateTimer: (id: number, newState: Partial<TimerState>) => void;
    removeTimer: (id: number) => void;
}) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && !audioRef.current) {
            audioRef.current = new Audio('/alarm.mp3');
        }
    }, []);

    useEffect(() => {
        if (timer.isActive && timer.timeLeft > 0) {
            timerRef.current = setInterval(() => {
                updateTimer(timer.id, { timeLeft: timer.timeLeft - 1 });
            }, 1000);
        } else if (timer.timeLeft <= 0 && timer.isActive) {
            updateTimer(timer.id, { isActive: false });
            if (audioRef.current) {
                audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
            }
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [timer.isActive, timer.timeLeft, timer.id, updateTimer]);

    const handleStartPause = () => {
        updateTimer(timer.id, { isActive: !timer.isActive });
    };

    const handleReset = () => {
        updateTimer(timer.id, { isActive: false, timeLeft: timer.initialTime });
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };
    
    const adjustTime = (amount: number) => {
        if(timer.isActive) return;
        const newTime = Math.max(0, timer.initialTime + amount);
        updateTimer(timer.id, { initialTime: newTime, timeLeft: newTime });
    }

    const progress = timer.initialTime > 0 ? (timer.timeLeft / timer.initialTime) * 100 : 0;

    return (
         <Card className="w-full">
            <CardContent className="pt-6 space-y-4 flex flex-col items-center">
                 <div className="flex justify-between items-center w-full">
                    <h3 className="font-semibold truncate pr-2">{timer.label || `Timer #${timer.id}`}</h3>
                    <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => removeTimer(timer.id)}>
                        <Trash2 className="w-4 h-4"/>
                    </Button>
                </div>
                <div className="relative w-full flex items-center justify-center">
                    {!timer.isActive && (
                        <Button onClick={() => adjustTime(-60)} variant="ghost" size="icon" className="absolute left-0">
                            <Minus className="w-6 h-6"/>
                        </Button>
                    )}
                    <div className="font-mono text-5xl tracking-tighter">
                        {formatTime(timer.timeLeft)}
                    </div>
                     {!timer.isActive && (
                        <Button onClick={() => adjustTime(60)} variant="ghost" size="icon" className="absolute right-0">
                            <Plus className="w-6 h-6"/>
                        </Button>
                    )}
                </div>
                <Progress value={progress} className="h-2 w-full"/>
                <div className="flex gap-4">
                  <Button onClick={handleStartPause} size="lg" className="w-32">
                    {timer.isActive ? <><Pause className="mr-2" /> Pause</> : <><Play className="mr-2" /> Start</>}
                  </Button>
                  <Button onClick={handleReset} size="lg" variant="outline" className="w-32">
                    <RotateCcw className="mr-2" /> Reset
                  </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export function Timer() {
    const [timers, setTimers] = useState<TimerState[]>([]);
    const nextId = useRef(1);
    const [newTimerLabel, setNewTimerLabel] = useState('');
    const [newTimerDuration, setNewTimerDuration] = useState(300); // 5 minutes in seconds

    const addTimer = () => {
        setTimers(prev => [...prev, {
            id: nextId.current++,
            initialTime: newTimerDuration,
            timeLeft: newTimerDuration,
            isActive: false,
            label: newTimerLabel || `Timer #${nextId.current -1}`
        }]);
        // Reset form
        setNewTimerLabel('');
        setNewTimerDuration(300);
    };

    const removeTimer = (id: number) => {
        setTimers(prev => prev.filter(t => t.id !== id));
    };

    const updateTimer = useCallback((id: number, newState: Partial<TimerState>) => {
        setTimers(prev => prev.map(t => t.id === id ? { ...t, ...newState } : t));
    }, []);


    return (
        <Card>
            <CardHeader>
                <CardTitle>Countdown Timer</CardTitle>
                <CardDescription>Set multiple timers for focused work sessions, breaks, or reminders.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" className="w-full border-dashed">
                            <PlusCircle className="mr-2" /> Add New Timer
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Add a New Timer</AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="timer-label">Label (optional)</Label>
                                <Input id="timer-label" type="text" placeholder="e.g., Study Session" value={newTimerLabel} onChange={e => setNewTimerLabel(e.target.value)}/>
                            </div>
                            <div>
                                <Label htmlFor="timer-duration">Duration (minutes)</Label>
                                <Input id="timer-duration" type="number" value={newTimerDuration / 60} onChange={e => setNewTimerDuration(Number(e.target.value) * 60)} min="1"/>
                            </div>
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={addTimer}>Add Timer</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {timers.length === 0 && (
                     <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                        Click "Add New Timer" to begin.
                    </div>
                )}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {timers.map(timer => (
                        <TimerInstance 
                            key={timer.id}
                            timer={timer}
                            updateTimer={updateTimer}
                            removeTimer={removeTimer}
                        />
                    ))}
                 </div>
            </CardContent>
        </Card>
    );
}
