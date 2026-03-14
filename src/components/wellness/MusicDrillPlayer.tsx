
'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { 
  Play, Pause, X, Check, ArrowRight,
  Music, Target, Brain, Activity, Clock,
  Sparkles, RotateCcw, CheckCircle2, XCircle
} from 'lucide-react';
import type { MusicDifficulty, MusicDrillQuestion, MusicDomain } from '@/types/music';
import { useMusicStore } from '@/hooks/use-music-store';
import { useCalendarPlansStore } from '@/hooks/use-calendar-plans-store';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { drillsData, DrillDefinition } from '@/data/music-drills';

interface Props {
  drillId: string;
  onClose: () => void;
}

export function MusicDrillPlayer({ drillId, onClose }: Props) {
  const [gameState, setGameState] = useState<'prep' | 'drill' | 'summary'>('prep');
  const [difficulty, setDifficulty] = useState<MusicDifficulty>('Beginner');
  const [focusLevel, setFocusLevel] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<MusicDrillQuestion[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(0);
  const [tapTimestamps, setTapTimestamps] = useState<number[]>([]);

  const drill = useMemo(() => drillsData.find(d => d.id === drillId) || drillsData[0], [drillId]);
  const currentQuestion = drill.questions[currentIndex % drill.questions.length];
  
  const { logDrill } = useMusicStore();
  const { syncFromTracker } = useCalendarPlansStore();
  const { toast } = useToast();

  const handleStart = () => {
    setGameState('drill');
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
    setCurrentIndex(0);
    setAnswers([]);
  };

  const handleResponse = (val: string) => {
    if (isAnswered) return;
    const now = Date.now();
    const time = now - questionStartTime;
    
    const isCorrect = val === currentQuestion.answer;
    const newAnswer: MusicDrillQuestion = {
      prompt: currentQuestion.prompt,
      userAnswer: val,
      correctAnswer: currentQuestion.answer,
      isCorrect,
      responseTimeMs: time
    };

    setAnswers(prev => [...prev, newAnswer]);
    setSelectedOption(val);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIndex >= 9) {
      setGameState('summary');
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setQuestionStartTime(Date.now());
      setTapTimestamps([]);
    }
  };

  const summaryData = useMemo(() => {
    if (answers.length === 0) return null;
    const score = answers.filter(a => a.isCorrect).length;
    const multiplier = difficulty === 'Beginner' ? 1.0 : difficulty === 'Intermediate' ? 1.5 : 2.0;
    const har = Math.round((score / 10) * multiplier * 100);
    const avgTime = Math.round(answers.reduce((s, a) => s + a.responseTimeMs, 0) / answers.length);
    const weakest = [...answers].filter(a => !a.isCorrect).sort((a,b) => a.responseTimeMs - b.responseTimeMs)[0];

    return { score, har, avgTime, weakest, multiplier };
  }, [answers, difficulty]);

  const finalizeSession = (effectiveness: number, context: any) => {
    if (!summaryData) return;
    
    logDrill({
      domain: drill.domain,
      drillName: drill.name,
      difficulty,
      difficultyMultiplier: summaryData.multiplier,
      focusLevel,
      score: summaryData.score,
      har: summaryData.har,
      averageResponseTime: summaryData.avgTime,
      effectivenessRating: effectiveness,
      context,
      durationMinutes: Math.ceil((Date.now() - startTime) / 60000),
      questions: answers
    });

    syncFromTracker('Communication', drill.name); // Using Comm as generic skill sync trigger
    toast({ title: "Session Synced", variant: 'success' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background z-[100] flex flex-col">
      <header className="p-4 border-b bg-card flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5" /></Button>
          <div>
            <h1 className="text-sm font-black uppercase tracking-widest">{drill.name}</h1>
            <p className="text-[10px] text-muted-foreground font-bold">{drill.domain}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Progress value={((currentIndex) / 10) * 100} className="w-32 h-1.5" />
          <Badge variant="outline" className="h-6 border-primary/20 text-primary uppercase font-black text-[9px]">
            {difficulty}
          </Badge>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 bg-muted/5 overflow-hidden">
        <AnimatePresence mode="wait">
          {gameState === 'prep' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full">
              <Card className="border-primary/20 shadow-2xl">
                <CardHeader className="text-center space-y-2">
                  <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-2">
                    <Music className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-black uppercase">Drill Calibration</CardTitle>
                  <CardDescription>Set parameters for this high-fidelity session.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 py-6">
                  <div className="space-y-4">
                    <Label className="text-[10px] font-bold uppercase tracking-widest">Difficulty Tier</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Beginner', 'Intermediate', 'Advanced'] as MusicDifficulty[]).map(d => (
                        <Button 
                          key={d} 
                          variant={difficulty === d ? 'default' : 'outline'} 
                          className="text-[10px] font-bold uppercase h-10"
                          onClick={() => setDifficulty(d)}
                        >
                          {d}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-[10px] font-bold uppercase tracking-widest">Initial Focus (1-5)</Label>
                      <span className="text-xl font-black text-primary">{focusLevel}</span>
                    </div>
                    <Slider value={[focusLevel]} onValueChange={([v]) => setFocusLevel(v)} min={1} max={5} step={1} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full h-14 text-lg font-black shadow-lg" onClick={handleStart}>
                    Initialize Drill <Play className="ml-2 w-5 h-5 fill-current" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {gameState === 'drill' && (
            <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-2xl w-full">
              <Card className="border-primary/20 shadow-2xl overflow-hidden">
                <CardHeader className="bg-primary/5">
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="outline" className="uppercase font-black text-[9px]">Challenge {currentIndex + 1} of 10</Badge>
                    <div className="flex items-center gap-2 text-xs font-mono opacity-60">
                      <Clock className="w-3 h-3" /> {Math.round((Date.now() - questionStartTime)/1000)}s
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold leading-snug">{currentQuestion.prompt}</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  {currentQuestion.type === 'multiple-choice' && (
                    <div className="grid gap-3">
                      {currentQuestion.options?.map((opt, i) => (
                        <button
                          key={i}
                          disabled={isAnswered}
                          onClick={() => handleResponse(opt)}
                          className={cn(
                            "w-full text-left p-5 rounded-2xl border-2 transition-all font-bold",
                            !isAnswered && "hover:border-primary/40 hover:bg-primary/[0.02] border-primary/5",
                            isAnswered && opt === currentQuestion.answer && "bg-emerald-500/10 border-emerald-500 text-emerald-700",
                            isAnswered && opt === selectedOption && opt !== currentQuestion.answer && "bg-destructive/5 border-destructive text-destructive"
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {currentQuestion.type === 'tap' && (
                    <div className="flex flex-col items-center gap-8 py-10">
                      <Button 
                        size="lg" 
                        className="w-48 h-48 rounded-full text-3xl font-black bg-primary/10 border-4 border-primary/20 text-primary hover:bg-primary/20 active:scale-90 transition-all"
                        onClick={() => setTapTimestamps(prev => [...prev, Date.now()])}
                      >
                        TAP
                      </Button>
                      <Button onClick={() => handleResponse("target: 90bpm")} className="font-bold">End Session</Button>
                    </div>
                  )}

                  {isAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-muted/50 border flex gap-4">
                      {selectedOption === currentQuestion.answer ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> : <XCircle className="w-5 h-5 text-destructive shrink-0" />}
                      <p className="text-sm italic leading-relaxed">{currentQuestion.explanation}</p>
                    </motion.div>
                  )}
                </CardContent>
                <CardFooter className="bg-muted/10 p-4 justify-end">
                  <Button disabled={!isAnswered} onClick={handleNext} className="gap-2 font-bold h-12 px-8 shadow-md">
                    {currentIndex === 9 ? 'Finalize Session' : 'Next Question'} <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {gameState === 'summary' && summaryData && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
              <Card className="border-primary/20 shadow-2xl">
                <CardHeader className="text-center bg-primary/5">
                  <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-2">
                    <Sparkles className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-black uppercase">Drill Synopsis</CardTitle>
                  <CardDescription>Session metrics synchronized successfully.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/30 rounded-2xl text-center">
                      <p className="text-[10px] font-black uppercase text-muted-foreground">Score</p>
                      <p className="text-4xl font-black text-foreground">{summaryData.score}/10</p>
                    </div>
                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl text-center">
                      <p className="text-[10px] font-black uppercase text-primary">HAR Index</p>
                      <p className="text-4xl font-black text-primary">{summaryData.har}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold uppercase">
                      <span className="text-muted-foreground">Avg Response Time</span>
                      <span className="text-foreground">{summaryData.avgTime}ms</span>
                    </div>
                    {summaryData.weakest && (
                      <div className="p-3 bg-destructive/5 rounded-xl border border-destructive/10">
                        <p className="text-[9px] font-black uppercase text-destructive flex items-center gap-2 mb-1">
                          <XCircle className="w-3 h-3" /> Potential Blindspot
                        </p>
                        <p className="text-xs italic line-clamp-1 opacity-70">"{summaryData.weakest.prompt}"</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <Label className="text-[10px] font-bold uppercase">Rate Session Productivity</Label>
                    <div className="flex justify-between gap-1">
                      {[1,2,3,4,5].map(n => (
                        <Button key={n} variant="outline" className="flex-1 h-10 font-bold" onClick={() => finalizeSession(n, 'Midday')}>
                          {n}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
