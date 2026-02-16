
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Check, Sparkles, SlidersHorizontal, Info, Goal, ClipboardCheck } from 'lucide-react';
import type { Exercise } from '@/data/exercises';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { useWellnessData } from '@/hooks/use-wellness-data';
import { useToast } from '@/hooks/use-toast';

const formatTime = (totalSeconds: number): string => {
  if (totalSeconds < 0) return '00:00';
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const PracticeInstructionCard = ({ exercise }: { exercise: Exercise }) => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exercise.duration);
  const [isComplete, setIsComplete] = useState(false);
  const { addMovementLog, addStillnessLog } = useWellnessData();
  const { toast } = useToast();
  
  const ExerciseIcon = exercise.icon;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsComplete(true);
      handleQuickLog();
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const handleQuickLog = () => {
    const isMovement = ['Stretching', 'Strength', 'Energizer', 'Wakeup & Wind-Down'].includes(exercise.category);
    if (isMovement) {
      addMovementLog({
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        duration: Math.ceil(exercise.duration / 60),
        timestamp: new Date().toISOString()
      });
    } else {
      addStillnessLog({
        techniqueId: exercise.id,
        techniqueName: exercise.name,
        duration: Math.ceil(exercise.duration / 60),
        timestamp: new Date().toISOString()
      });
    }
    toast({ title: "Session Recorded!", variant: 'success' });
  };

  const toggleTimer = useCallback(() => {
    if (isComplete || timeLeft === 0) {
        setTimeLeft(exercise.duration);
        setIsComplete(false);
    }
    setIsActive(!isActive);
  }, [isActive, timeLeft, exercise.duration, isComplete]);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setIsComplete(false);
    setTimeLeft(exercise.duration);
  }, [exercise.duration]);

  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300 h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
                <ExerciseIcon className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>{exercise.name}</CardTitle>
        </div>
        <CardDescription className="flex-grow min-h-[40px] pt-2">{exercise.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        
        <div className="p-3 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-sm flex items-center gap-2"><Goal className="w-4 h-4"/>Intention</h4>
            <p className="text-xs text-muted-foreground">{exercise.intention}</p>
        </div>

        <ol className="list-decimal list-inside space-y-2 text-sm">
            {exercise.steps.map((step, index) => (
                <li key={index}>{step}</li>
            ))}
        </ol>

        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="setup">
                <AccordionTrigger className="text-sm font-semibold">Quick Setup</AccordionTrigger>
                <AccordionContent>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                        {exercise.setup.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </AccordionContent>
            </AccordionItem>
             <AccordionItem value="modifications">
                <AccordionTrigger className="text-sm font-semibold">Modifications</AccordionTrigger>
                <AccordionContent>
                     <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                        {exercise.modifications.map((mod, i) => <li key={i}>{mod}</li>)}
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

      </CardContent>
      <CardFooter className="flex-col gap-3">
          <div className="w-full h-8 text-center text-sm font-semibold">
            <AnimatePresence>
              {isComplete ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-green-600">
                    <Check className="w-4 h-4" /> Practice Complete!
                  </motion.div>
              ) : (
                  <div className="italic text-muted-foreground">{exercise.completionCue}</div>
              )}
            </AnimatePresence>
          </div>
          <div className="w-full grid grid-cols-2 gap-2">
            <Button onClick={toggleTimer} size="lg">
            {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isActive ? formatTime(timeLeft) : 'Start'}
            </Button>
            <Button onClick={handleQuickLog} variant="outline" size="lg">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Log Only
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
