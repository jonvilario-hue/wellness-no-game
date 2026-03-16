'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Play, Pause, X, Check, ArrowRight,
  Music, Target, Brain, Activity, Clock,
  Sparkles, RotateCcw, CheckCircle2, XCircle,
  Type as TextIcon,
  ChevronRight
} from 'lucide-react';
import type { MusicDifficulty, MusicDrillQuestion, MusicDomain } from '@/types/music';
import { useMusicStore } from '@/hooks/use-music-store';
import { useCalendarPlansStore } from '@/hooks/use-calendar-plans-store';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { drillsData } from '@/data/music-drills';

interface Props {
  drillId: string;
  onClose: () => void;
  subtab?: string;
}

export function MusicDrillPlayer({ drillId, onClose, subtab = 'Listen' }: Props) {
  const [gameState, setGameState] = useState<'prep' | 'drill' | 'summary'>('prep');
  const [difficulty, setDifficulty] = useState<MusicDifficulty>('Beginner');
  const [focusLevel, setFocusLevel] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<MusicDrillQuestion[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [constructionInput, setConstructionInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(0);
  const [tapTimestamps, setTapTimestamps] = useState<number[]>([]);

  const drill = useMemo(() => {
    const found = drillsData.find(d => d.id === drillId || d.name === drillId);
    return found || drillsData[0];
  }, [drillId]);

  const currentQuestion = useMemo(() => {
    const qList = drill.questions;
    return qList[currentIndex % qList.length];
  }, [drill, currentIndex]);
  
  const { logDrill } = useMusicStore();
  const { syncFromTracker } = useCalendarPlansStore();
  const { toast } = useToast();

  // Exit on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleStart = () => {
    setGameState('drill');
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
    setCurrentIndex(0);
    setAnswers([]);
  };

  const handleRestart = () => {
    setGameState('prep');
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setConstructionInput('');
    setIsAnswered(false);
  };

  const handleResponse = (val: string) => {
    if (isAnswered) return;
    const now = Date.now();
    const time = now - questionStartTime;
    
    const isCorrect = val.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim() || currentQuestion.type === 'text';
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
      setConstructionInput('');
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

    syncFromTracker('Music', drill.name);
    toast({ title: "Performance Synced", variant: 'success' });
    onClose();
  };

  const subtabDisplay = useMemo(() => {
    const lookup: Record<string, string> = {
      play: 'Instrumentals',
      sing: 'Sing',
      listen: 'Listen',
      freeflow: 'Freeflow'
    };
    return lookup[subtab.toLowerCase()] || subtab;
  }, [subtab]);

  return (
    <div 
      className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl h-full max-h-[90vh] bg-background border rounded-[2rem] shadow-2xl flex flex-col overflow-hidden relative cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-6 border-b bg-card shrink-0">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 mb-4">
            <span>Music</span>
            <ChevronRight className="w-2 h-2" />
            <span>{subtabDisplay}</span>
            <ChevronRight className="w-2 h-2" />
            <span>{drill.name}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full"><X className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" onClick={handleRestart} className="rounded-full text-muted-foreground hover:text-primary"><RotateCcw className="w-4 h-4" /></Button>
              <div>
                <h1 className="text-lg font-bold tracking-tight truncate max-w-[200px]">{drill.name}</h1>
                <p className="text-[10px] text-muted-foreground font-bold uppercase">{drill.domain}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[8px] font-black uppercase opacity-60">Session Progress</span>
                <Progress value={((currentIndex) / 10) * 100} className="w-24 h-1 mt-1" />
              </div>
              <Badge variant="outline" className="h-6 border-primary/20 text-primary uppercase font-black text-[10px] px-3">
                {difficulty}
              </Badge>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-y-auto bg-muted/5">
          <AnimatePresence mode="wait">
            {gameState === 'prep' && (
              <motion.div key="prep" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="max-w-sm w-full mx-auto">
                <Card className="border-primary/10 shadow-xl overflow-hidden">
                  <CardHeader className="text-center space-y-1 bg-primary/5 pb-6">
                    <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-2">
                      <Music className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-black uppercase tracking-tight">Initialize Drill</CardTitle>
                    <CardDescription className="text-xs">
                      Calibrate difficulty and focus for this protocol.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 py-6">
                    <div className="space-y-3">
                      <Label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Difficulty Tier</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Beginner', 'Intermediate', 'Advanced'] as MusicDifficulty[]).map(d => (
                          <Button 
                            key={d} 
                            variant={difficulty === d ? 'default' : 'outline'} 
                            className="text-[9px] font-bold uppercase h-8"
                            onClick={() => setDifficulty(d)}
                          >
                            {d}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Pre-Drill Focus (1-5)</Label>
                        <span className="text-lg font-black text-primary">{focusLevel}</span>
                      </div>
                      <Slider value={[focusLevel]} onValueChange={([v]) => setFocusLevel(v)} min={1} max={5} step={1} />
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/10">
                    <Button className="w-full h-12 text-sm font-black shadow-md" onClick={handleStart}>
                      Start Session <Play className="ml-2 w-4 h-4 fill-current" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {gameState === 'drill' && (
              <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-xl w-full mx-auto">
                <Card className="border-primary/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-primary/5 py-4">
                    <div className="flex justify-between items-center mb-1">
                      <Badge variant="outline" className="uppercase font-black text-[8px] h-4">Step {currentIndex + 1} of 10</Badge>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono opacity-60">
                        <Clock className="w-2.5 h-2.5" /> {Math.round((Date.now() - questionStartTime)/1000)}s
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold leading-tight">{currentQuestion.prompt}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {currentQuestion.type === 'multiple-choice' && (
                      <div className="grid gap-2">
                        {currentQuestion.options?.map((opt, i) => (
                          <button
                            key={i}
                            disabled={isAnswered}
                            onClick={() => handleResponse(opt)}
                            className={cn(
                              "w-full text-left p-4 rounded-xl border-2 transition-all font-bold text-sm",
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

                    {currentQuestion.type === 'construction' && (
                      <div className="space-y-3">
                        <Input 
                          placeholder="Enter sequence (e.g. C D E...)" 
                          value={constructionInput}
                          onChange={e => setConstructionInput(e.target.value)}
                          disabled={isAnswered}
                          className="h-12 text-base font-bold"
                          onKeyDown={e => e.key === 'Enter' && handleResponse(constructionInput)}
                        />
                        <Button className="w-full h-10 font-bold" onClick={() => handleResponse(constructionInput)} disabled={isAnswered || !constructionInput}>Verify Sequence</Button>
                      </div>
                    )}

                    {currentQuestion.type === 'tap' && (
                      <div className="flex flex-col items-center gap-6 py-6">
                        <Button 
                          size="lg" 
                          disabled={isAnswered}
                          className="w-32 h-32 rounded-full text-2xl font-black bg-primary/10 border-4 border-primary/20 text-primary hover:bg-primary/20 active:scale-90 transition-all"
                          onClick={() => setTapTimestamps(prev => [...prev, Date.now()])}
                        >
                          {tapTimestamps.length > 0 ? tapTimestamps.length : 'TAP'}
                        </Button>
                        <Button onClick={handleNext} disabled={isAnswered} variant="secondary" className="font-bold text-xs h-9">End Sequence</Button>
                      </div>
                    )}

                    {currentQuestion.type === 'text' && (
                      <div className="space-y-3">
                        <Label className="text-[9px] font-bold uppercase opacity-60">Self-Evaluation Required</Label>
                        <Button className="w-full h-12 text-base font-black" onClick={() => handleResponse("completed")}>Mark Done</Button>
                      </div>
                    )}

                    {isAnswered && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-muted/50 border flex gap-3">
                        {currentQuestion.type === 'text' ? (
                          <Sparkles className="w-4 h-4 text-primary shrink-0" />
                        ) : selectedOption?.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim() ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-destructive shrink-0" />
                        )}
                        <div className="space-y-0.5">
                          {currentQuestion.type !== 'text' && <p className="text-[10px] font-bold uppercase">Correct: {currentQuestion.answer}</p>}
                          <p className="text-[11px] italic leading-relaxed text-muted-foreground">{currentQuestion.explanation}</p>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                  <CardFooter className="bg-muted/10 p-3 justify-end">
                    <Button disabled={!isAnswered} onClick={handleNext} className="gap-2 font-bold h-10 px-6 text-xs">
                      {currentIndex === 9 ? 'Synopsis' : 'Next Step'} <ArrowRight className="w-3 h-3" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {gameState === 'summary' && summaryData && (
              <motion.div key="summary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm w-full mx-auto">
                <Card className="border-primary/20 shadow-xl overflow-hidden">
                  <CardHeader className="text-center bg-primary/5 py-6">
                    <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-2">
                      <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-black uppercase">Drill Synopsis</CardTitle>
                    <CardDescription className="text-xs">Metrics synchronized successfully.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-muted/30 rounded-xl text-center">
                        <p className="text-[8px] font-black uppercase text-muted-foreground">Accuracy</p>
                        <p className="text-2xl font-black">{summaryData.score}/10</p>
                      </div>
                      <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl text-center">
                        <p className="text-[8px] font-black uppercase text-primary">HAR Index</p>
                        <p className="text-2xl font-black text-primary">{summaryData.har}</p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                        <span className="text-muted-foreground">Avg Response</span>
                        <span>{summaryData.avgTime}ms</span>
                      </div>
                      {summaryData.weakest && (
                        <div className="p-2.5 bg-destructive/5 rounded-xl border border-destructive/10">
                          <p className="text-[8px] font-black uppercase text-destructive flex items-center gap-1.5 mb-0.5">
                            <XCircle className="w-2.5 h-2.5" /> Blindspot
                          </p>
                          <p className="text-[10px] italic truncate opacity-70">"{summaryData.weakest.prompt}"</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 pt-4 border-t">
                      <Label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Session Effectiveness</Label>
                      <div className="flex justify-between gap-1">
                        {[1,2,3,4,5].map(n => (
                          <Button key={n} variant="outline" className="flex-1 h-8 font-bold text-xs" onClick={() => finalizeSession(n, 'Midday')}>
                            {n}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/10 p-6 flex gap-3">
                    <Button variant="outline" className="flex-1 h-12 font-bold uppercase" onClick={handleRestart}>
                      <RotateCcw className="mr-2 h-4 w-4" /> Try Again
                    </Button>
                    <Button className="flex-1 h-12 font-black uppercase shadow-lg" onClick={() => { syncFromTracker('Music', drill.name); onClose(); }}>
                      Finish <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
