
'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { 
  Play, Pause, RotateCcw, X, Check, 
  Target, Zap, Brain, Activity, Clock,
  ArrowRight
} from 'lucide-react';
import type { ReadingPassage, DrillType, ReadingLog } from '@/types/speedreading';
import { useSpeedReadingStore } from '@/hooks/use-speedreading-store';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { SpeedReadingQuiz } from './SpeedReadingQuiz';
import { cn } from '@/lib/utils';

interface Props {
  drillType: DrillType;
  passage: ReadingPassage;
  onClose: () => void;
}

export function SpeedReadingDrillPlayer({ drillType, passage, onClose }: Props) {
  const [gameState, setGameState] = useState<'prep' | 'reading' | 'quiz' | 'summary'>('prep');
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Index of word or chunk
  const [startTime, setStartTime] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  
  // Logic params
  const [currentWpm, setCurrentWpm] = useState(300);
  const [preFocus, setPreFocus] = useState(3);
  const [postFatigue, setPostFatigue] = useState(3);
  const [comprehensionScore, setComprehensionScore] = useState(0);

  const { addLog } = useSpeedReadingStore();
  const { toast } = useToast();

  const words = useMemo(() => passage.content.split(/\s+/), [passage]);
  
  const chunks = useMemo(() => {
    if (drillType === 'Chunk Training') {
      const size = 3;
      const res = [];
      for (let i = 0; i < words.length; i += size) {
        res.push(words.slice(i, i + size).join(' '));
      }
      return res;
    }
    return words;
  }, [words, drillType]);

  const units = drillType === 'Chunk Training' ? chunks : words;

  // Interval calculation based on WPM
  const msPerUnit = useMemo(() => {
    const wordsPerUnit = drillType === 'Chunk Training' ? 3 : 1;
    return (60 / currentWpm) * 1000 * wordsPerUnit;
  }, [currentWpm, drillType]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && gameState === 'reading') {
      timer = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev >= units.length - 1) {
            handleFinishedReading();
            return prev;
          }
          return prev + 1;
        });
      }, msPerUnit);
    }
    return () => clearInterval(timer);
  }, [isActive, gameState, msPerUnit, units.length]);

  const handleStart = () => {
    setGameState('reading');
    setIsActive(true);
    setStartTime(Date.now());
    setCurrentIndex(0);
  };

  const handleFinishedReading = () => {
    setIsActive(false);
    setElapsedSeconds((Date.now() - startTime) / 1000);
    setGameState('quiz');
  };

  const handleQuizComplete = (score: number) => {
    setComprehensionScore(score);
    setGameState('summary');
  };

  const handleSaveAndExit = () => {
    const finalWpm = Math.round((words.length / elapsedSeconds) * 60);
    const err = Math.round(finalWpm * (comprehensionScore / 100));

    addLog({
      drillType,
      passageId: passage.id,
      tier: passage.tier,
      wpm: finalWpm,
      comprehensionScore,
      err,
      preFocus,
      postFatigue,
      durationSeconds: Math.round(elapsedSeconds)
    });

    toast({ title: "Drill Results Synchronized", variant: 'success' });
    onClose();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      <header className="p-4 border-b bg-card flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5" /></Button>
          <div>
            <h1 className="text-sm font-black uppercase tracking-widest">{drillType}</h1>
            <p className="text-[10px] text-muted-foreground font-bold">{passage.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[9px] font-black uppercase opacity-60">Target Velocity</span>
            <span className="text-xs font-bold text-primary">{currentWpm} WPM</span>
          </div>
          <Progress value={(currentIndex / units.length) * 100} className="w-32 h-1.5" />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 bg-muted/5">
        <AnimatePresence mode="wait">
          {gameState === 'prep' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="max-w-md w-full">
              <Card className="border-primary/20 shadow-2xl">
                <CardHeader className="text-center space-y-2">
                  <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-2">
                    <Target className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-black uppercase">Pre-Drill Readiness</CardTitle>
                  <CardDescription>Calibrate your focus before we engage the pacer.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 py-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-[10px] font-bold uppercase tracking-widest">Initial Focus (1-5)</Label>
                      <span className="text-xl font-black text-primary">{preFocus}</span>
                    </div>
                    <Slider value={[preFocus]} onValueChange={([v]) => setPreFocus(v)} min={1} max={5} step={1} />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-[10px] font-bold uppercase tracking-widest">Pace Calibration (WPM)</Label>
                      <span className="text-xl font-black text-primary">{currentWpm}</span>
                    </div>
                    <Slider value={[currentWpm]} onValueChange={([v]) => setCurrentWpm(v)} min={100} max={1000} step={50} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full h-14 text-lg font-black shadow-lg" onClick={handleStart}>
                    Engage Drill <Play className="ml-2 w-5 h-5 fill-current" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {gameState === 'reading' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl w-full">
              <div className="relative min-h-[300px] flex flex-col items-center justify-center p-12 bg-background rounded-[40px] shadow-inner border-4 border-muted/20">
                
                {drillType === 'Peripheral Expansion' ? (
                  <div className="max-w-[300px] text-center space-y-4 text-2xl font-medium leading-relaxed opacity-40">
                    {words.slice(Math.max(0, currentIndex - 10), currentIndex).join(' ')}
                    <span className="text-primary font-black scale-110 inline-block px-2 bg-primary/5 rounded">
                      {words[currentIndex]}
                    </span>
                    {words.slice(currentIndex + 1, currentIndex + 11).join(' ')}
                  </div>
                ) : (
                  <div className="text-center">
                    <span className="text-5xl md:text-7xl font-black tracking-tight text-primary animate-in zoom-in-95 duration-75">
                      {units[currentIndex]}
                    </span>
                  </div>
                )}

                {drillType === 'Regression Eliminator' && (
                  <div className="absolute inset-0 pointer-events-none opacity-5">
                    <div className="w-full h-full bg-grid-slate-200" />
                  </div>
                )}

                <div className="absolute bottom-8 flex gap-4">
                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full" onClick={() => setIsActive(!isActive)}>
                    {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full" onClick={() => setCurrentIndex(0)}>
                    <RotateCcw className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {gameState === 'quiz' && (
            <SpeedReadingQuiz 
              passage={passage} 
              onComplete={handleQuizComplete} 
            />
          )}

          {gameState === 'summary' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
              <Card className="border-primary/20 shadow-2xl">
                <CardHeader className="text-center">
                  <div className="p-4 bg-emerald-500/10 rounded-full w-fit mx-auto mb-2">
                    <Check className="w-10 h-10 text-emerald-600" />
                  </div>
                  <CardTitle className="text-2xl font-black uppercase">Analysis Complete</CardTitle>
                  <CardDescription>Review your efficiency metrics before saving.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/30 rounded-2xl text-center space-y-1">
                      <p className="text-[10px] font-black uppercase text-muted-foreground">Raw Speed</p>
                      <p className="text-2xl font-black">{Math.round((words.length / elapsedSeconds) * 60)} WPM</p>
                    </div>
                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl text-center space-y-1">
                      <p className="text-[10px] font-black uppercase text-primary">Efficiency (ERR)</p>
                      <p className="text-2xl font-black text-primary">{Math.round(((words.length / elapsedSeconds) * 60) * (comprehensionScore / 100))}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/20 rounded-2xl flex justify-between items-center">
                    <span className="text-sm font-bold">Comprehension</span>
                    <Badge variant="secondary" className="font-black text-sm">{comprehensionScore}%</Badge>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <Label className="text-[10px] font-bold uppercase tracking-widest">Post-Drill Fatigue (1-5)</Label>
                      <span className="text-xl font-black text-primary">{postFatigue}</span>
                    </div>
                    <Slider value={[postFatigue]} onValueChange={([v]) => setPostFatigue(v)} min={1} max={5} step={1} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full h-14 text-lg font-black shadow-lg" onClick={handleSaveAndExit}>
                    Sync to History <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
