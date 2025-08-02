
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';
import type { Exercise, MindfulnessPractice } from '@/data/exercises';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ExerciseCardProps {
  exercise: Exercise | MindfulnessPractice;
}

const formatTime = (totalSeconds: number): string => {
  if (totalSeconds < 0) return '00:00';
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exercise.duration);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      // Optional: Add a completion sound or visual cue
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const toggleTimer = useCallback(() => {
    if (timeLeft === 0) { // If timer finished, reset and start
        setTimeLeft(exercise.duration);
    }
    setIsActive(!isActive);
  }, [isActive, timeLeft, exercise.duration]);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(exercise.duration);
  }, [exercise.duration]);

  const progress = (timeLeft / exercise.duration) * 100;
  const ExerciseIcon = exercise.icon;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
                <ExerciseIcon className="w-5 h-5 text-primary" />
            </div>
            {exercise.name}
        </CardTitle>
        <CardDescription>{exercise.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-center gap-4">
        <div className="relative w-32 h-32">
            <motion.svg
                className="absolute inset-0"
                width="128"
                height="128"
                viewBox="0 0 100 100"
            >
                <circle cx="50" cy="50" r="45" className="stroke-muted" strokeWidth="8" fill="transparent" />
                <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    className="stroke-primary"
                    strokeWidth="8"
                    fill="transparent"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    style={{ pathLength: 1, pathOffset: 1 }}
                    animate={{ pathOffset: 1 - progress / 100 }}
                    transition={{ duration: 0.5, ease: 'linear' }}
                />
            </motion.svg>
            <div className="absolute inset-0 flex items-center justify-center">
                 <p className="font-mono text-3xl font-bold">{formatTime(timeLeft)}</p>
            </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button onClick={toggleTimer} size="lg">
          {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isActive ? 'Pause' : timeLeft === 0 ? 'Start Over' : 'Start'}
        </Button>
        <Button onClick={resetTimer} variant="outline" size="lg">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
};
