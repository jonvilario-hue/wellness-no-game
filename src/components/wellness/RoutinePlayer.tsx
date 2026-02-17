
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Play, Pause, ChevronRight, ChevronLeft, CheckCircle2, 
  X, RotateCcw, Activity, Brain, Waves, HeartPulse 
} from 'lucide-react';
import { movementExercises, mindfulnessPractices, type Exercise } from '@/data/exercises';
import { useWellnessData } from '@/hooks/use-wellness-data';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const allPractices = [...movementExercises, ...mindfulnessPractices];

interface RoutinePlayerProps {
  exerciseIds: string[];
  onClose: () => void;
  routineName?: string;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export function RoutinePlayer({ exerciseIds, onClose, routineName = "Active Routine" }: RoutinePlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const { addMovementLog, addStillnessLog, logCompletion } = useWellnessData();

  const currentExercise = useMemo(() => {
    const id = exerciseIds[currentIndex];
    return allPractices.find(p => p.id === id);
  }, [exerciseIds, currentIndex]);

  useEffect(() => {
    if (currentExercise) {
      setTimeLeft(currentExercise.duration);
      setIsActive(false);
    }
  }, [currentExercise]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      handleNext();
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const logCurrentStep = useCallback(() => {
    if (!currentExercise) return;
    
    const isMovement = ['Stretching', 'Strength', 'Energizer', 'Wakeup & Wind-Down'].includes(currentExercise.category);
    const duration = Math.ceil(currentExercise.duration / 60);
    const timestamp = new Date().toISOString();

    if (isMovement) {
      addMovementLog({
        exerciseId: currentExercise.id,
        exerciseName: currentExercise.name,
        duration,
        timestamp,
        difficulty: 3
      });
    } else {
      addStillnessLog({
        techniqueId: currentExercise.id,
        techniqueName: currentExercise.name,
        duration,
        timestamp,
        trigger: 'Proactive'
      });
    }
  }, [currentExercise, addMovementLog, addStillnessLog]);

  const handleNext = () => {
    logCurrentStep();
    if (currentIndex < exerciseIds.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
      setIsActive(false);
      logCompletion();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const totalProgress = ((currentIndex + (isActive ? (1 - timeLeft / (currentExercise?.duration || 1)) : 0)) / exerciseIds.length) * 100;

  if (isFinished) {
    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full">
          <Card className="text-center p-8 border-primary/20 shadow-2xl">
            <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Routine Complete!</h2>
            <p className="text-muted-foreground mb-8">You've successfully completed the "{routineName}" protocol. Your performance metrics have been updated.</p>
            <Button size="lg" className="w-full font-bold h-14" onClick={onClose}>
              Back to Dashboard
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (!currentExercise) return null;

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      <header className="p-4 border-b bg-card flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5" /></Button>
          <div>
            <h1 className="text-sm font-black uppercase tracking-widest">{routineName}</h1>
            <p className="text-[10px] text-muted-foreground font-bold">STEP {currentIndex + 1} OF {exerciseIds.length}</p>
          </div>
        </div>
        <div className="w-48">
          <Progress value={totalProgress} className="h-1.5" />
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        {/* Left Side: Instructions */}
        <div className="flex-1 p-6 md:p-12 overflow-y-auto space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <currentExercise.icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <Badge variant="outline" className="text-[10px] uppercase font-black tracking-tighter mb-1 border-primary/20 text-primary">
                  {currentExercise.category}
                </Badge>
                <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">{currentExercise.name}</h2>
              </div>
            </div>
            <p className="text-xl text-muted-foreground italic leading-relaxed">
              "{currentExercise.description}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <Activity className="w-3 h-3" /> The Sequence
              </h3>
              <ol className="space-y-4">
                {currentExercise.steps.map((step, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    <p className="text-lg font-medium">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-muted/30 rounded-3xl border border-primary/5 space-y-2">
                <h4 className="font-bold flex items-center gap-2 text-sm"><Waves className="w-4 h-4 text-primary" /> Intention</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{currentExercise.intention}</p>
              </div>
              <div className="p-6 bg-muted/30 rounded-3xl border border-primary/5 space-y-2">
                <h4 className="font-bold flex items-center gap-2 text-sm"><HeartPulse className="w-4 h-4 text-primary" /> Tip</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{currentExercise.modifications[0]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Timer & Controls */}
        <div className="w-full md:w-[400px] bg-muted/10 border-l p-8 flex flex-col items-center justify-center space-y-12">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="128" cy="128" r="120" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted/20" />
              <motion.circle 
                cx="128" cy="128" r="120" fill="none" stroke="currentColor" strokeWidth="8" 
                strokeDasharray={754} 
                animate={{ strokeDashoffset: 754 - (754 * (timeLeft / (currentExercise?.duration || 1))) }}
                strokeLinecap="round" 
                className="text-primary"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-7xl font-black tracking-tighter">{formatTime(timeLeft)}</span>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-2">Remaining</span>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full">
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-full" onClick={() => setTimeLeft(currentExercise.duration)}>
              <RotateCcw className="w-6 h-6" />
            </Button>
            <Button size="lg" className="flex-1 h-20 text-2xl font-black rounded-3xl gap-4 shadow-xl shadow-primary/20" onClick={() => setIsActive(!isActive)}>
              {isActive ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
              {isActive ? 'PAUSE' : 'START'}
            </Button>
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-full" onClick={handleNext}>
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex gap-2 w-full pt-4 border-t">
            {currentIndex > 0 && (
              <Button variant="ghost" className="flex-1 h-12 text-muted-foreground hover:text-foreground" onClick={handlePrev}>
                <ChevronLeft className="w-4 h-4 mr-2" /> Previous Step
              </Button>
            )}
            <Button variant="ghost" className="flex-1 h-12 text-primary font-black uppercase tracking-widest text-[10px]" onClick={handleNext}>
              {currentIndex === exerciseIds.length - 1 ? 'Finish Routine' : 'Skip to Next'} <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
