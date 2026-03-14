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
  ArrowRight, Eye, MousePointer2, Sparkles
} from 'lucide-react';
import type { ReadingPassage, DrillType, ReadingTier, ReadingDifficulty } from '@/types/speedreading';
import { useSpeedReadingStore } from '@/hooks/use-speedreading-store';
import { useWellnessData } from '@/hooks/use-wellness-data';
import { useCalendarPlansStore } from '@/hooks/use-calendar-plans-store';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { SpeedReadingQuiz } from './SpeedReadingQuiz';
import { estimateDifficulty } from '@/lib/speedreading-utils';
import { cn } from '@/lib/utils';

interface Props {
  drillType: DrillType;
  passage: ReadingPassage;
  isCustomText?: boolean;
  onClose: () => void;
}

export function SpeedReadingDrillPlayer({ drillType, passage, isCustomText, onClose }: Props) {
  const [gameState, setGameState] = useState<'prep' | 'reading' | 'quiz' | 'summary'>('prep');
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [startTime, setStartTime] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  
  const [currentWpm, setCurrentWpm] = useState(300);
  const [preFocus, setPreFocus] = useState(3);
  const [postFatigue, setPostFatigue] = useState(3);
  const [comprehensionScore, setComprehensionScore] = useState(0);
  const [selfComprehensionRating, setSelfRating] = useState(3);

  const { addLog } = useSpeedReadingStore();
  const { markStudySessionComplete } = useCalendarPlansStore();
  const { toast } = useToast();
  const activeWordRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const words = useMemo(() => passage.content.split(/\s+/).filter(w => w.length > 0), [passage]);
  
  const estimatedTier = useMemo(() => 
    isCustomText ? estimateDifficulty(passage.content) : passage.tier, 
  [isCustomText, passage.content]);

  const units = words;

  const msPerUnit = useMemo(() => {
    return (60 / currentWpm) * 1000;
  }, [currentWpm]);

  const handleFinishedReading = useCallback(() => {
    setIsActive(false);
    const finalElapsed = (Date.now() - startTime) / 1000;
    setElapsedSeconds(finalElapsed);
    setGameState((isCustomText || !passage.quiz || passage.quiz.length === 0) ? 'summary' : 'quiz');
  }, [isCustomText, passage.quiz, startTime]);

  useEffect(() => {
    if (activeWordRef.current && containerRef.current) {
      const container = containerRef.current;
      const element = activeWordRef.current;
      
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      
      if (elementRect.bottom > containerRect.bottom - 150 || elementRect.top < containerRect.top + 150) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentIndex]);

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
  }, [isActive, gameState, msPerUnit, units.length, handleFinishedReading]);

  const handleStart = () => {
    setGameState('reading');
    setIsActive(true);
    setStartTime(Date.now());
    setCurrentIndex(0);
  };

  const handleQuizComplete = (score: number) => {
    setComprehensionScore(score);
    setGameState('summary');
  };

  const handleSaveAndExit = () => {
    const finalWpm = Math.round((words.length / elapsedSeconds) * 60);
    const finalComp = isCustomText ? (selfComprehensionRating * 20) : comprehensionScore;
    const err = Math.round(finalWpm * (finalComp / 100));

    addLog({
      drillType,
      passageId: passage.id,
      tier: estimatedTier,
      difficulty: passage.difficulty,
      wpm: finalWpm,
      comprehensionScore: finalComp,
      err,
      preFocus,
      postFatigue,
      durationSeconds: Math.round(elapsedSeconds),
      isCustomText,
      isSelfAssessed: isCustomText
    });

    markStudySessionComplete('Speed Reading', passage.id);
    toast({ title: "Results Synced", variant: 'success' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      <header className="p-4 border-b bg-card flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5" /></Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black uppercase tracking-widest">{drillType}</h1>
              {isCustomText && <Badge variant="outline" className="text-[8px] h-4 py-0 uppercase">Custom</Badge>}
            </div>
            <p className="text-[10px] text-muted-foreground font-bold">{passage.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[9px] font-black uppercase opacity-60">Pace</span>
            <span className="text-xs font-bold text-primary">{currentWpm} WPM</span>
          </div>
          <Progress value={(currentIndex / units.length) * 100} className="w-32 h-1.5" />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 bg-muted/5 overflow-hidden">
        <AnimatePresence mode="wait">
          {gameState === 'prep' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="max-w-md w-full">
              <Card className="border-primary/20 shadow-2xl">
                <CardHeader className="text-center space-y-2">
                  <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-2">
                    <Target className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-black uppercase">Pre-Drill Calibration</CardTitle>
                  <CardDescription>
                    {isCustomText ? `Difficulty Estimated: ${estimatedTier}` : `Author: ${passage.author}`}
                  </CardDescription>
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
                      <Label className="text-[10px] font-bold uppercase tracking-widest">Target Velocity (WPM)</Label>
                      <span className="text-xl font-black text-primary">{currentWpm}</span>
                    </div>
                    <Slider value={[currentWpm]} onValueChange={([v]) => setCurrentWpm(v)} min={100} max={1200} step={50} />
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full flex items-center justify-center">
              <div 
                ref={containerRef}
                className={cn(
                  "relative h-full max-h-[600px] w-full max-w-4xl flex flex-col items-center p-12 bg-background rounded-[40px] shadow-inner border-4 border-muted/20 overflow-y-auto no-scrollbar transition-all",
                  "justify-start pt-24"
                )}
              >
                <div className={cn(
                  "flex flex-wrap gap-x-2 gap-y-4 text-2xl md:text-3xl font-medium text-muted-foreground",
                  drillType === 'Peripheral Expansion' && "max-w-md mx-auto justify-center text-center"
                )}>
                  {units.map((unit, i) => {
                    const isCurrent = i === currentIndex;
                    const isPast = i < currentIndex;
                    
                    return (
                      <span
                        key={i}
                        ref={isCurrent ? activeWordRef : null}
                        className={cn(
                          "transition-all duration-200 rounded px-1",
                          isCurrent && "text-primary bg-primary/10 ring-2 ring-primary/20 scale-110 shadow-sm",
                          isPast && "text-foreground/40"
                        )}
                      >
                        {unit}
                      </span>
                    );
                  })}
                </div>
                <div className="sticky bottom-0 w-full flex justify-center pt-8 pb-4 bg-gradient-to-t from-background via-background to-transparent mt-auto">
                  <div className="flex gap-4">
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-full shadow-lg bg-background" onClick={() => setIsActive(!isActive)}>
                      {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </Button>
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-full shadow-lg bg-background" onClick={() => { setCurrentIndex(0); if(containerRef.current) containerRef.current.scrollTo(0,0); }}>
                      <RotateCcw className="w-6 h-6" />
                    </Button>
                  </div>
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
                  <CardTitle className="text-2xl font-black uppercase">Performance Analysis</CardTitle>
                  <CardDescription>Review your efficiency metrics before finalizing the session.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/30 rounded-2xl text-center space-y-1">
                      <p className="text-[10px] font-black uppercase text-muted-foreground">Raw Velocity</p>
                      <p className="text-2xl font-black">{Math.round((words.length / elapsedSeconds) * 60)} WPM</p>
                    </div>
                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl text-center space-y-1">
                      <p className="text-[10px] font-black uppercase text-primary">Efficiency (ERR)</p>
                      <p className="text-2xl font-black text-primary">
                        {Math.round(((words.length / elapsedSeconds) * 60) * ((isCustomText ? selfComprehensionRating * 20 : comprehensionScore) / 100))}
                      </p>
                    </div>
                  </div>

                  {isCustomText ? (
                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-[10px] font-bold uppercase flex items-center gap-2">
                          <Sparkles className="w-3 h-3" /> Self-Assessed Understanding (1-5)
                        </Label>
                        <span className="text-xl font-black text-primary">{selfComprehensionRating}</span>
                      </div>
                      <Slider value={[selfComprehensionRating]} onValueChange={([v]) => setSelfRating(v)} min={1} max={5} step={1} />
                    </div>
                  ) : (
                    <div className="p-4 bg-muted/20 rounded-2xl flex justify-between items-center">
                      <span className="text-sm font-bold">Comprehension Quiz Score</span>
                      <Badge variant="secondary" className="font-black text-sm">{comprehensionScore}%</Badge>
                    </div>
                  )}

                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <Label className="text-[10px] font-bold uppercase tracking-widest">Cognitive Fatigue (1-5)</Label>
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
