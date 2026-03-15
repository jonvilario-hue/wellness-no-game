
'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { 
  X, Play, Zap, Clock, Brain, Check,
  ChevronRight, ArrowRight, Terminal, 
  Target, Sparkles, CheckCircle2, XCircle,
  SkipForward, LayoutGrid, PenTool, Eye, Database, Info, Lightbulb
} from 'lucide-react';
import { useCodingStore } from '@/hooks/use-coding-store';
import { useCalendarPlansStore } from '@/hooks/use-calendar-plans-store';
import { useToast } from '@/hooks/use-toast';
import { codingDrills } from '@/data/coding-drills';
import type { CodingDrillType, CodingLanguage, CodingLane } from '@/types/coding';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  protocolId: CodingDrillType;
  onClose: () => void;
}

/**
 * Normalizes code for comparison by stripping comments, 
 * standardizing whitespace, and handling common syntax variations.
 */
function normalizeCode(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '') // Strip comments
    .replace(/['"]/g, '"') // Standardize quotes
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/;\s*/g, ';') // Normalize semicolons
    .replace(/\(\s+/g, '(').replace(/\s+\)/g, ')') // Parens
    .replace(/\{\s+/g, '{').replace(/\s+\}/g, '}') // Braces
    .trim();
}

/**
 * Structural Probe: Checks if required logical tokens exist in sequence.
 */
function checkStructuralProbe(input: string, tokens: string[]): boolean {
  const normalized = normalizeCode(input).toLowerCase();
  let lastIdx = -1;
  for (const token of tokens) {
    const idx = normalized.indexOf(token.toLowerCase(), lastIdx + 1);
    if (idx === -1) return false;
    lastIdx = idx;
  }
  return true;
}

export function CodingDrillPlayer({ protocolId, onClose }: Props) {
  const { activeLanguage, languageProgress, addLog, activeLoop, advanceLoop, cancelLoop } = useCodingStore();
  const { syncFromTracker } = useCalendarPlansStore();
  const { toast } = useToast();

  const [gameState, setGameState] = useState<'prep' | 'active' | 'feedback' | 'summary'>('prep');
  const [difficulty, setDifficulty] = useState(languageProgress[activeLanguage]?.level || 1);
  const [focusRating, setFocusRating] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [drillStartTime, setDrillStartTime] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const [roundAccuracy, setRoundAccuracy] = useState(0);

  const filteredDrills = useMemo(() => 
    codingDrills.filter(d => d.type === protocolId && d.language === activeLanguage),
  [protocolId, activeLanguage]);

  const currentDrill = useMemo(() => 
    filteredDrills.length > 0 ? filteredDrills[currentIndex % filteredDrills.length] : null,
  [filteredDrills, currentIndex]);

  const handleStart = () => {
    setGameState('active');
    setDrillStartTime(Date.now());
    if (results.length === 0) setStartTime(Date.now());
    setUserInput('');
  };

  const handleVerifyAnswer = () => {
    if (!currentDrill) return;
    
    let accuracy = 0;
    const cleanInput = userInput.trim();
    const normalizedInput = normalizeCode(cleanInput);
    const normalizedContent = normalizeCode(currentDrill.content);

    // CRITICAL UPGRADE: Logic-Aware Evaluation
    if (currentDrill.type === 'Output Prediction') {
      // Direct result check
      accuracy = cleanInput.toLowerCase() === currentDrill.expectedOutput?.trim().toLowerCase() ? 100 : 0;
    } else if (currentDrill.type === 'Bug Hunt') {
      // Line number check
      accuracy = parseInt(cleanInput) === currentDrill.bugs?.[0].line ? 100 : 0;
    } else if (currentDrill.requiredTokens) {
      // Structural Probe check (Handles variations in formatting/syntax)
      accuracy = checkStructuralProbe(cleanInput, currentDrill.requiredTokens) ? 100 : 0;
    } else {
      // Fallback: Normalized string match
      accuracy = normalizedInput === normalizedContent ? 100 : 0;
    }

    setRoundAccuracy(accuracy);
    setGameState('feedback');
  };

  const handleCompleteRound = () => {
    if (!currentDrill) return;
    
    const accuracy = roundAccuracy;
    const speedMetric = Math.round((Date.now() - drillStartTime) / 1000);
    
    addLog({
      type: protocolId,
      lane: currentDrill.lane,
      language: activeLanguage,
      difficulty: currentDrill.difficulty,
      durationSeconds: speedMetric,
      accuracy: Math.round(accuracy),
      speedMetric: speedMetric,
      userDifficultyRating: difficulty,
      userFocusRating: focusRating
    });

    if (activeLoop.active) {
      const stepBeforeAdvance = activeLoop.currentStep;
      advanceLoop(accuracy, speedMetric);
      if (stepBeforeAdvance >= 2) {
        setGameState('summary');
      } else {
        setGameState('prep');
        setUserInput('');
      }
    } else {
      setResults(prev => [...prev, { accuracy, speed: speedMetric }]);
      if (results.length >= 0) { // For standalone, we allow summary after 1 rep
        setGameState('summary');
      } else {
        setCurrentIndex(prev => prev + 1);
        setUserInput('');
        setGameState('prep');
      }
    }
  };

  const finalize = () => {
    syncFromTracker('Custom', `Coding: ${protocolId}`);
    if (activeLoop.active) cancelLoop();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-full max-h-[85vh] bg-background border rounded-[2rem] shadow-2xl flex flex-col overflow-hidden">
        <header className="p-6 border-b bg-card shrink-0 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={activeLoop.active ? cancelLoop : onClose} className="rounded-full"><X className="w-5 h-5" /></Button>
            <div>
              <h1 className="text-lg font-bold uppercase tracking-tight">{protocolId}</h1>
              <p className="text-[10px] text-muted-foreground font-bold uppercase">{activeLanguage} • Step {activeLoop.active ? activeLoop.currentStep + 1 : results.length + 1}</p>
            </div>
          </div>
          <div className="w-48 space-y-1">
            <Progress value={activeLoop.active ? ((activeLoop.currentStep + 1) / 3) * 100 : ((results.length + 1) / 2) * 100} className="h-1" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-muted/5 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {gameState === 'prep' && (
              <motion.div key="prep" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="max-w-md w-full">
                <Card className="border-primary/10 shadow-xl">
                  <CardHeader className="text-center pb-6 bg-primary/5">
                    <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-2 text-primary">
                      {currentDrill?.lane === 'Write' ? <PenTool className="w-8 h-8" /> : 
                       currentDrill?.lane === 'Read' ? <Eye className="w-8 h-8" /> : 
                       <LayoutGrid className="w-8 h-8" />}
                    </div>
                    <CardTitle className="text-xl font-black uppercase">{currentDrill?.lane} Practice</CardTitle>
                    <CardDescription>{currentDrill?.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="p-4 bg-muted/30 rounded-xl space-y-2">
                      <p className="text-[10px] font-bold uppercase text-primary">Drill Objective</p>
                      <p className="text-sm font-medium leading-relaxed">{currentDrill?.description || currentDrill?.explanation}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full h-12 font-black uppercase shadow-lg gap-2" onClick={handleStart}>
                      <Play className="w-4 h-4 fill-current" /> Begin rep
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {gameState === 'active' && currentDrill && (
              <motion.div key="active" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-2xl space-y-6">
                {currentDrill.language === 'SQL' && currentDrill.tableInput && (
                  <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl space-y-2">
                    <p className="text-[10px] font-black uppercase text-blue-600 flex items-center gap-2">
                      <Database className="w-3 h-3" /> Schema / Context
                    </p>
                    <pre className="text-[10px] font-mono whitespace-pre-wrap">{currentDrill.tableInput}</pre>
                  </div>
                )}

                <div className="bg-card border-2 border-primary/10 rounded-2xl p-6 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap relative group">
                  {currentDrill.content}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-40 transition-opacity">
                    <Terminal className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Your Response</Label>
                  {currentDrill.lane === 'Write' || currentDrill.lane === 'Build' ? (
                    <Textarea 
                      placeholder="Type your implementation..." 
                      className="font-mono text-sm h-48 resize-none"
                      value={userInput}
                      onChange={e => setUserInput(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <Input 
                      placeholder={currentDrill.type === 'Bug Hunt' ? "Line number of the bug..." : "Exact expected output..."} 
                      className="font-mono h-12"
                      value={userInput}
                      onChange={e => setUserInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleVerifyAnswer()}
                      autoFocus
                    />
                  )}
                  <Button onClick={handleVerifyAnswer} className="w-full h-12 font-bold uppercase">Verify Result</Button>
                </div>
              </motion.div>
            )}

            {gameState === 'feedback' && currentDrill && (
              <motion.div key="feedback" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl w-full">
                <Card className={cn("border-2 shadow-xl overflow-hidden", roundAccuracy === 100 ? "border-emerald-500/30" : "border-amber-500/30")}>
                  <CardHeader className={cn("text-center py-6", roundAccuracy === 100 ? "bg-emerald-500/5" : "bg-amber-500/5")}>
                    <div className="flex justify-center mb-2">
                      {roundAccuracy === 100 ? <CheckCircle2 className="w-12 h-12 text-emerald-500" /> : <XCircle className="w-12 h-12 text-amber-500" />}
                    </div>
                    <CardTitle className="text-xl font-black uppercase">{roundAccuracy === 100 ? 'Analysis Correct' : 'Adjustment Needed'}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-primary">
                        <Lightbulb className="w-5 h-5" />
                        <h4 className="text-sm font-bold uppercase tracking-tight">The Pattern to Notice</h4>
                      </div>
                      <p className="text-sm font-medium leading-relaxed p-4 bg-muted/30 rounded-xl border border-primary/5 italic">
                        "{currentDrill.patternToNotice}"
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Info className="w-5 h-5" />
                        <h4 className="text-sm font-bold uppercase tracking-tight">Technical Reasoning</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {currentDrill.explanation}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/10 p-6">
                    <Button onClick={handleCompleteRound} className="w-full h-12 font-black uppercase">
                      Continue <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {gameState === 'summary' && (
              <motion.div key="summary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
                <Card className="border-primary/10 shadow-xl overflow-hidden">
                  <CardHeader className="text-center bg-primary/5 py-6">
                    <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-2 text-primary">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-xl font-black uppercase">Session Sync</CardTitle>
                    <CardDescription>Fluency metrics computed and ready for ledger.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-muted/30 rounded-xl text-center">
                        <p className="text-[8px] font-black uppercase text-muted-foreground">Avg Accuracy</p>
                        <p className="text-2xl font-black">
                          {Math.round((activeLoop.active ? activeLoop.results.reduce((s,r) => s+r.accuracy, 0) / activeLoop.results.length : results.reduce((s,r) => s+r.accuracy, 0) / results.length) || 100)}%
                        </p>
                      </div>
                      <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl text-center">
                        <p className="text-[8px] font-black uppercase text-primary">Total Time</p>
                        <p className="text-2xl font-black text-primary">{Math.round((Date.now() - startTime)/1000)}s</p>
                      </div>
                    </div>
                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <Label className="text-[9px] font-bold uppercase">Reported Focus (1-5)</Label>
                        <span className="text-lg font-black text-primary">{focusRating}</span>
                      </div>
                      <Slider value={[focusRating]} onValueChange={([v]) => setFocusRating(v)} min={1} max={5} step={1} />
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/10 p-6">
                    <Button className="w-full h-12 font-black uppercase shadow-lg" onClick={finalize}>
                      Finish & Sync <ArrowRight className="ml-2 w-4 h-4" />
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
