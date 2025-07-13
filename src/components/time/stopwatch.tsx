
'use client';

import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60000).toString().padStart(2, '0');
  const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
  const milliseconds = (time % 1000).toString().padStart(3, '0').slice(0, 2);
  return `${minutes}:${seconds}.${milliseconds}`;
};

export function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const countRef = useRef<NodeJS.Timeout | null>(null);

    const handleStart = useCallback(() => {
        setIsActive(true);
        countRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 10);
        }, 10);
    }, []);

    const handlePause = useCallback(() => {
        setIsActive(false);
        if (countRef.current) {
            clearInterval(countRef.current);
        }
    }, []);

    const handleReset = useCallback(() => {
        setIsActive(false);
        if (countRef.current) {
            clearInterval(countRef.current);
        }
        setTime(0);
        setLaps([]);
    }, []);
    
    const handleLap = useCallback(() => {
        if(isActive) {
           setLaps((prevLaps) => [...prevLaps, time]);
        }
    }, [isActive, time]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stopwatch</CardTitle>
        <CardDescription>Measure elapsed time with precision. Use laps to mark intervals.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 flex flex-col items-center">
        <div className="font-mono text-7xl md:text-8xl tracking-tighter w-full text-center bg-muted/50 py-4 rounded-lg">
            {formatTime(time)}
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {!isActive ? (
             <Button onClick={handleStart} size="lg" className="lg:col-span-2">
                <Play className="mr-2" /> Start
            </Button>
          ) : (
            <Button onClick={handlePause} size="lg" variant="secondary" className="lg:col-span-2">
                <Pause className="mr-2" /> Pause
            </Button>
          )}
          <Button onClick={handleLap} size="lg" variant="outline" disabled={!isActive}>
            <Flag className="mr-2" /> Lap
          </Button>
          <Button onClick={handleReset} size="lg" variant="outline">
            <RotateCcw className="mr-2" /> Reset
          </Button>
        </div>

        {laps.length > 0 && (
            <div className="w-full space-y-2 pt-4 border-t">
                <h3 className="font-semibold text-center">Laps</h3>
                <ScrollArea className="h-48 w-full">
                    <ul className="space-y-2 pr-4">
                        {laps.map((lap, index) => (
                            <li key={index} className="flex justify-between p-2 rounded-md bg-muted/50 font-mono">
                                <span>Lap {laps.length - index}</span>
                                <span>{formatTime(lap - (laps[index-1] || 0))}</span>
                                <span>{formatTime(lap)}</span>
                            </li>
                        )).reverse()}
                    </ul>
                </ScrollArea>
            </div>
        )}

      </CardContent>
    </Card>
  );
}
