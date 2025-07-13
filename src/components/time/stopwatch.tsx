
'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Flag, PlusCircle, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

type StopwatchState = {
  id: number;
  time: number;
  isActive: boolean;
  laps: number[];
  startTime: number;
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60000).toString().padStart(2, '0');
  const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
  const milliseconds = (time % 1000).toString().padStart(3, '0').slice(0, 2);
  return `${minutes}:${seconds}.${milliseconds}`;
};

function StopwatchInstance({ 
    stopwatch,
    updateStopwatch,
    removeStopwatch
} : {
    stopwatch: StopwatchState;
    updateStopwatch: (id: number, newState: Partial<StopwatchState>) => void;
    removeStopwatch: (id: number) => void;
}) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (stopwatch.isActive) {
            timerRef.current = setInterval(() => {
                updateStopwatch(stopwatch.id, { time: Date.now() - stopwatch.startTime });
            }, 10);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [stopwatch.isActive, stopwatch.id, stopwatch.startTime, updateStopwatch]);

    const handleStartPause = () => {
        if(stopwatch.isActive) {
            updateStopwatch(stopwatch.id, { isActive: false });
        } else {
            updateStopwatch(stopwatch.id, { isActive: true, startTime: Date.now() - stopwatch.time });
        }
    };
    
    const handleReset = () => {
        updateStopwatch(stopwatch.id, { isActive: false, time: 0, laps: [] });
    };

    const handleLap = () => {
        if (stopwatch.isActive) {
            updateStopwatch(stopwatch.id, { laps: [...stopwatch.laps, stopwatch.time] });
        }
    };

    return (
        <Card className="w-full">
            <CardContent className="pt-6 space-y-4">
                 <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Stopwatch #{stopwatch.id}</h3>
                    <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => removeStopwatch(stopwatch.id)}>
                        <Trash2 className="w-4 h-4"/>
                    </Button>
                </div>
                <div className="font-mono text-5xl tracking-tighter w-full text-center bg-muted/50 py-2 rounded-lg">
                    {formatTime(stopwatch.time)}
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <Button onClick={handleStartPause} size="lg">
                        {stopwatch.isActive ? <Pause /> : <Play />}
                    </Button>
                    <Button onClick={handleLap} variant="outline" disabled={!stopwatch.isActive}>
                        <Flag /> Lap
                    </Button>
                    <Button onClick={handleReset} variant="outline">
                        <RotateCcw /> Reset
                    </Button>
                </div>
                {stopwatch.laps.length > 0 && (
                    <ScrollArea className="h-32 w-full">
                        <ul className="space-y-2 pr-4">
                            {stopwatch.laps.map((lap, index) => (
                                <li key={index} className="flex justify-between p-2 rounded-md bg-muted/50 font-mono text-sm">
                                    <span>Lap {stopwatch.laps.length - index}</span>
                                    <span>{formatTime(lap - (stopwatch.laps[index-1] || 0))}</span>
                                    <span>{formatTime(lap)}</span>
                                </li>
                            )).reverse()}
                        </ul>
                    </ScrollArea>
                )}
            </CardContent>
        </Card>
    );
}


export function Stopwatch() {
    const [stopwatches, setStopwatches] = useState<StopwatchState[]>([]);
    const nextId = useRef(1);

    const addStopwatch = () => {
        setStopwatches(prev => [...prev, {
            id: nextId.current++,
            time: 0,
            isActive: false,
            laps: [],
            startTime: 0
        }]);
    };

    const removeStopwatch = (id: number) => {
        setStopwatches(prev => prev.filter(sw => sw.id !== id));
    };

    const updateStopwatch = useCallback((id: number, newState: Partial<StopwatchState>) => {
        setStopwatches(prev => prev.map(sw => sw.id === id ? { ...sw, ...newState } : sw));
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Stopwatch</CardTitle>
                <CardDescription>Measure elapsed time with precision. Add multiple stopwatches to track different tasks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button onClick={addStopwatch} variant="outline" className="w-full border-dashed">
                    <PlusCircle className="mr-2" /> Add Stopwatch
                </Button>
                {stopwatches.length === 0 && (
                     <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                        Click "Add Stopwatch" to begin.
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {stopwatches.map(sw => (
                        <StopwatchInstance 
                            key={sw.id}
                            stopwatch={sw}
                            updateStopwatch={updateStopwatch}
                            removeStopwatch={removeStopwatch}
                        />
                   ))}
                </div>
            </CardContent>
        </Card>
    );
}
