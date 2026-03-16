'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { 
  X, Play, Zap, Clock, Check,
  ChevronRight, ArrowRight, CheckCircle2, XCircle,
  PenTool, Eye, LayoutGrid, Sparkles, Info, Star, Loader2
} from 'lucide-react';
import { useCodingStore } from '@/hooks/use-coding-store';
import { useCalendarPlansStore } from '@/hooks/use-calendar-plans-store';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getNextDrill } from '@/engine/getNextDrill';
import { gradeAnswer } from '@/engine/grading';
import { GeneratedDrill, Lane } from '@/types/drills';

interface Props {
  protocolId: string;
  onClose: () => void;
}

const mapProtocolToLane = (id: string): Lane => {
  if (id === 'Syntax Sprints' || id === 'Code Reconstruction') return 'Write';
  if (id === 'Output Prediction' || id === 'Bug Hunt') return 'Read';
  return 'Build';
};

export function CodingDrillPlayer({ protocolId, onClose }: Props) {
  const { activeLanguage, addLog, activeLoop, advanceLoop, cancelLoop } = useCodingStore();
  const { syncFromTracker } = useCalendarPlansStore();
  const { toast } = useToast();

  const [gameState, setGameState] = useState<'prep' | 'active' | 'feedback' | 'summary'>('prep');
  const [focusRating, setFocusRating] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [drillStartTime, setDrillStartTime] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gradingFeedback, setGradingFeedback] = useState<string | undefined>();
  const [currentDrill, setCurrentDrill] = useState<GeneratedDrill | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const lane = useMemo(() => mapProtocolToLane(protocolId), [protocolId]);

  const fetchDrill = useCallback(async () => {
    setIsGenerating(true);
    try {
      // Simulate procedural generation cost
      await new Promise(r => setTimeout(r, 100));
      const drill = getNextDrill(
        activeLanguage.toLowerCase() as any,
        lane,
        protocolId as any
      );
      setCurrentDrill(drill);
      setGameState('prep');
      setUserInput('');
      setGradingFeedback(undefined);
    } catch (e) {
      setCurrentDrill(null);
    } finally {
      setIsGenerating(false);
    }
  }, [activeLanguage, lane, protocolId]);

  useEffect(() => {
    fetchDrill();
  }, [fetchDrill]);

  const handleStart = () => {
    if (!currentDrill) return;
    setGameState('active');
    setDrillStartTime(Date.now());
  };

  const handleVerifyAnswer = () => {
    if (!currentDrill) return;
    const result = gradeAnswer(userInput, currentDrill.answer);
    setIsCorrect(result.isCorrect);
    setGradingFeedback(result.feedback);
    setGameState('feedback');
  };

  const handleCompleteRound = () => {
    if (!currentDrill) return;
    
    const accuracy = isCorrect ? 100 : 0;
    const speedMetric = Math.round((Date.now() - drillStartTime) / 1000);
    
    addLog({
      type: currentDrill.type as any,
      lane: currentDrill.lane as any,
      language: activeLanguage,
      difficulty: currentDrill.difficulty,
      durationSeconds: speedMetric,
      accuracy: Math.round(accuracy),
      speedMetric: speedMetric,
      userDifficultyRating: currentDrill.difficulty,
      userFocusRating: focusRating,
      concept: currentDrill.concept
    });

    if (activeLoop.active) {
      advanceLoop(accuracy, speedMetric);
      if (activeLoop.currentStep >= activeLoop.steps.length - 1) {
        setGameState('summary');
      } else {
        fetchDrill();
      }
    } else {
      setGameState('summary');
    }
  };

  if (isGenerating) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground animate-pulse">Compiling Procedural Rep...</p>
        </div>
      </div>
    );
  }

  if (!currentDrill) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-primary/10 shadow-2xl">
          <CardHeader className="text-center">
            <XCircle className="w-12 h-12 text-destructive mx-auto mb-2" />
            <CardTitle>Library Expansion Required</CardTitle>
            <CardDescription>
              We're currently populating the {protocolId} modules for {activeLanguage}. Try another category or language!
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={onClose} className="w-full">Return to Lab</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="w-full max-w-4xl h-full max-h-[85vh] bg-background border rounded-[2rem] shadow-2xl flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <header className="p-6 border-b bg-card shrink-0 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={activeLoop.active ? cancelLoop : onClose} className="rounded-full"><X className="w-5 h-5" /></Button>
            <div>
              <h1 className="text-lg font-bold uppercase tracking-tight">{protocolId}</h1>
              <p className="text-[10px] text-muted-foreground font-bold uppercase">{activeLanguage} • Procedural</p>
            </div>
          </div>
          <div className="w-48">
            <Progress value={activeLoop.active ? ((activeLoop.currentStep + 1) / activeLoop.steps.length) * 100 : 100} className="h-1" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-muted/5 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {gameState === 'prep' && (
              <motion.div key="prep" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="max-w-md w-full">
                <Card className="border-primary/10 shadow-xl">
                  <CardHeader className="text-center pb-6 bg-primary/5">
                    <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-2 text-primary">
                      {currentDrill.lane === 'Write' ? <PenTool className="w-8 h-8" /> : 
                       currentDrill.lane === 'Read' ? <Eye className="w-8 h-8" /> : 
                       <LayoutGrid className="w-8 h-8" />}
                    </div>
                    <div className="flex justify-center gap-1 mb-2">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className={cn("w-3 h-3", i < currentDrill.difficulty ? "text-primary fill-current" : "text-muted-foreground opacity-30")} />
                      ))}
                    </div>
                    <CardTitle className="text-xl font-black uppercase">{currentDrill.lane} Logic</CardTitle>
                    <div className="flex justify-center flex-wrap gap-1 mt-2">
                      {currentDrill.conceptTags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-[8px] h-4 py-0 uppercase">{tag}</Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 text-center">
                    <p className="text-sm font-medium leading-relaxed">{currentDrill.prompt}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full h-12 font-black uppercase shadow-lg gap-2" onClick={handleStart}>
                      <Play className="w-4 h-4 fill-current" /> Initialize Rep
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {gameState === 'active' && (
              <motion.div key="active" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-2xl space-y-6">
                <div className="bg-card border-2 border-primary/10 rounded-2xl p-6 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap relative">
                  <div className="absolute top-2 right-4 text-[10px] font-bold text-muted-foreground opacity-40 uppercase tracking-tighter">Compiler View</div>
                  {currentDrill.code}
                </div>

                <div className="space-y-4">
                  {currentDrill.answer.mode === 'multipleChoice' ? (
                    <div className="grid grid-cols-2 gap-3">
                      {currentDrill.answer.options.map((opt, i) => (
                        <Button key={i} variant="outline" className="h-14 font-mono text-sm" onClick={() => { setUserInput(opt); handleVerifyAnswer(); }}>
                          {opt}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <>
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Your Submission</Label>
                      {currentDrill.lane === 'Write' ? (
                        <Textarea placeholder="Type code here..." className="font-mono text-sm h-48 resize-none bg-background/50" value={userInput} onChange={e => setUserInput(e.target.value)} autoFocus />
                      ) : (
                        <Input placeholder="Answer..." className="font-mono h-12" value={userInput} onChange={e => setUserInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleVerifyAnswer()} autoFocus />
                      )}
                      <Button onClick={handleVerifyAnswer} className="w-full h-12 font-bold uppercase shadow-lg">Verify Logic</Button>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {gameState === 'feedback' && (
              <motion.div key="feedback" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl w-full">
                <Card className={cn("border-2 shadow-xl", isCorrect ? "border-emerald-500/30" : "border-amber-500/30")}>
                  <CardHeader className={cn("text-center py-6", isCorrect ? "bg-emerald-500/5" : "bg-amber-500/5")}>
                    <div className="flex justify-center mb-2">
                      {isCorrect ? <CheckCircle2 className="w-12 h-12 text-emerald-500" /> : <XCircle className="w-12 h-12 text-amber-500" />}
                    </div>
                    <CardTitle className="text-xl font-black uppercase">{isCorrect ? 'Verified' : 'Review Required'}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 text-center space-y-4">
                    {gradingFeedback && (
                      <div className="p-4 bg-background border border-primary/10 rounded-xl flex items-start gap-3 text-left animate-in fade-in">
                        <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm font-medium">{gradingFeedback}</p>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground leading-relaxed pt-2">
                      Targeted Concept: <strong>{currentDrill.concept.replace('-', ' ')}</strong>. This is a foundational pattern in {activeLanguage}.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleCompleteRound} className="w-full h-12 font-black uppercase">Continue Loop <ArrowRight className="ml-2 w-4 h-4" /></Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {gameState === 'summary' && summaryData && (
              <motion.div key="summary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
                <Card className="border-primary/10 shadow-xl overflow-hidden">
                  <CardHeader className="text-center bg-primary/5 py-6">
                    <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-2 text-primary"><Sparkles className="w-8 h-8" /></div>
                    <CardTitle className="text-xl font-black uppercase">Session Synopsis</CardTitle>
                    <CardDescription>Metrics synchronized successfully.</CardDescription>
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

                    <div className="space-y-3 pt-4 border-t">
                      <Label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Rate Focus Intensity (1-5)</Label>
                      <Slider value={[focusRating]} onValueChange={([v]) => setFocusLevel(v)} min={1} max={5} step={1} />
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/10 p-6">
                    <Button className="w-full h-12 font-black uppercase shadow-lg" onClick={() => { syncFromTracker('Custom', `Coding: ${protocolId}`); onClose(); }}>Return to Lab <ArrowRight className="ml-2 w-4 h-4" /></Button>
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
