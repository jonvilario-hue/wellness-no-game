
'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Forward, Settings, Check } from 'lucide-react';
import { usePomodoroStore, type PomodoroMode } from '@/hooks/use-pomodoro-store';
import { pomodoroPresets, type PomodoroPreset } from '@/data/pomodoro-presets';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};

export function PomodoroTimer() {
  const {
    preset,
    mode,
    timeLeft,
    cycles,
    isActive,
    setPreset,
    tick,
    toggleIsActive,
    resetTimer,
    skipMode
  } = usePomodoroStore();
  
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        tick();
      }, 1000);
    } else if (isActive && timeLeft <= 0) {
      skipMode();
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft, tick, skipMode]);
  
  const handlePresetChange = (presetName: string) => {
    const newPreset = pomodoroPresets.find(p => p.name === presetName);
    if(newPreset) {
      setPreset(newPreset);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>Pomodoro Timer</CardTitle>
                <CardDescription>Break down your work into focused intervals.</CardDescription>
            </div>
            <Select value={preset.name} onValueChange={handlePresetChange}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select a preset" />
                </SelectTrigger>
                <SelectContent>
                    {pomodoroPresets.map(p => (
                        <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 flex flex-col items-center">
        
        <div className="font-mono text-8xl md:text-9xl tracking-tighter w-full text-center py-4 rounded-lg">
            {formatTime(timeLeft)}
        </div>

        <div className="flex gap-4">
            <Button onClick={toggleIsActive} size="lg" className="w-40 text-2xl h-16 rounded-2xl">
                {isActive ? <Pause className="w-8 h-8"/> : <Play className="w-8 h-8"/>}
                <span className="ml-2">{isActive ? 'Pause' : 'Start'}</span>
            </Button>
            <Button onClick={resetTimer} variant="ghost" size="icon" className="h-16 w-16" title="Reset Timer">
                 <RotateCcw className="w-8 h-8 text-muted-foreground"/>
            </Button>
            <Button onClick={skipMode} variant="ghost" size="icon" className="h-16 w-16" title="Skip to next phase">
                <Forward className="w-8 h-8 text-muted-foreground"/>
            </Button>
        </div>
      </CardContent>
       <CardFooter className="flex-col gap-2 text-center text-muted-foreground">
        <p className="font-semibold">
          {cycles} / {preset.cyclesUntilLongBreak} focus sessions completed
        </p>
        <p className="text-sm">Current Mode: <span className="font-semibold capitalize text-primary">{mode === 'work' ? 'Focus' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}</span></p>
      </CardFooter>
    </Card>
  );
}
