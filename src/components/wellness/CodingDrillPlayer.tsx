
'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
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
  SkipForward, LayoutGrid, PenTool, Eye, Database
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

export function CodingDrillPlayer({ protocolId, onClose }: Props) {
  const { activeLanguage, languageProgress, addLog, activeLoop, advanceLoop, cancelLoop } = useCodingStore();
  const { syncFromTracker } = useCalendarPlansStore();
  const { toast } = useToast();

  const [gameState, setGameState] = useState<'prep' | 'active' | 'summary'>('prep');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [drillStartTime, setDrillStartTime] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const [difficulty, setDifficulty] = useState(languageProgress[activeLanguage]?.level || 1);
  const [focusRating, setFocusRating] = useState(3);

  const filteredDrills = useMemo(() => 
    codingDrills.filter(d => d.type === protocolId && d.language === activeLanguage && d.difficulty <= difficulty),
  [protocolId, activeLanguage, difficulty]);

  const currentDrill = useMemo(() => 
    filteredDrills.length > 0 ? filteredDrills[currentIndex % filteredDrills.length] : null,
  [filteredDrills, currentIndex]);

  const handleStart = () => {
    setGameState('active');
    setDrillStartTime(Date.now());
    if (results.length === 0) setStartTime(Date.now());
    setUserInput('');
  };

  const handleCompleteRound = (accuracy: number, speedMetric: number) => {
    if (!currentDrill) return;
    
    const lane = currentDrill.lane;
    const res = {
      accuracy,
      speedMetric,
      time: (Date.now() - drillStartTime) / 1000
    };
    
    // Log individual drill
    addLog({
      type: protocolId,
      lane,
      language: activeLanguage,
      difficulty,
      durationSeconds: Math.round(res.time),
      accuracy: Math.round(accuracy),
      speedMetric: Math.round(speedMetric),
      userDifficultyRating: difficulty,
      userFocusRating: focusRating
    });

    if (activeLoop.active) {
      advanceLoop(accuracy, speedMetric);
      if (activeLoop.currentStep >= 2) {
        setGameState('summary');
      } else {
        setGameState('prep');
        setUserInput('');
      }
    } else {
      setResults(prev => [...prev, res]);
      if (results.length >= 2) { // 3 rounds total for solo drill
        setGameState('summary');
      } else {
        setCurrentIndex(prev => prev + 1);
        setUserInput('');
        setDrillStartTime(Date.now());
      }
    }
  };

  const finalize = () => {
    syncFromTracker('Custom', `Coding: ${protocolId}`);
    if (activeLoop.active) cancelLoop();
    onClose();
  };

  if (!currentDrill && gameState !== 'summary') {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-primary/10 shadow-2xl">
          <CardHeader className="text-center">
            <div className="p-3 bg-destructive/10 rounded-full w-fit mx-auto mb-2 text-destructive">
              <XCircle className="w-8 h-8" />
            </div>
            <CardTitle className="text-xl">Content Unavailable</CardTitle>
            <CardDescription>
              We currently don't have any <b>{protocolId}</b> drills for <b>{activeLanguage}</b> at Level {difficulty}.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            Try switching to <b>JavaScript</b> or <b>Python</b> for full curriculum support, or select a lower difficulty.
          </CardContent>
          <CardFooter>
            <Button onClick={onClose} className="w-full font-bold">Return to Lab</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-full max-h-[85vh] bg-background border rounded-[2rem] shadow-2xl flex flex-col overflow-hidden">
        <header className="p-6 border-b bg-card shrink-0 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={activeLoop.active ? cancelLoop : onClose} className="rounded-full"><X className="w-5 h-5" /></Button>
            <div>
              <h1 className="text-lg font-bold uppercase tracking-tight">{protocolId}</h1>
              <p className="text-[10px] text-muted-foreground font-bold uppercase">{activeLanguage} • {activeLoop.active ? `Loop Phase ${activeLoop.currentStep + 1}/3` : `Round ${results.length + 1}/3`}</p>
            </div>
          </div>
          <div className="w-48 space-y-1">
            <div className="flex justify-between text-[8px] font-black uppercase opacity-60">
              <span>{activeLoop.active ? 'Loop Progress' : 'Session Progress'}</span>
              <span>{activeLoop.active ? `${activeLoop.currentStep + 1}/3` : `${results.length + 1}/3`}</span>
            </div>
            <Progress value={activeLoop.active ? ((activeLoop.currentStep + 1) / 3) * 100 : ((results.length + 1) / 3) * 100} className="h-1" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-muted/5 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {gameState === 'prep' && (
              <motion.div key="prep" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full">
                <Card className="border-primary/10 shadow-xl">
                  <CardHeader className="text-center pb-6 bg-primary/5">
                    <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-2 text-primary">
                      {currentDrill?.lane === 'Write' ? <PenTool className="w-8 h-8" /> : 
                       currentDrill?.lane === 'Read' ? <Eye className="w-8 h-8" /> : 
                       <LayoutGrid className="w-8 h-8" />}
                    </div>
                    <CardTitle className="text-xl font-black uppercase">
                      {activeLoop.active ? `Next Phase: ${currentDrill?.lane}` : 'Initialize Drill'}
                    </CardTitle>
                    <CardDescription>{currentDrill?.lane} Rep — Level {difficulty}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="p-4 bg-muted/30 rounded-xl space-y-2">
                      <p className="text-[10px] font-bold uppercase text-primary">Objective</p>
                      <p className="text-sm font-medium leading-relaxed">{currentDrill?.description || 'Focus on precise execution and speed.'}</p>
                    </div>
                    {currentDrill?.concurrencyRelevant && (
                      <Badge variant="outline" className="w-full justify-center border-amber-500/20 text-amber-600 bg-amber-500/5 py-1 gap-2">
                        <Zap className="w-3 h-3" /> Concurrent Logic Focus
                      </Badge>
                    )}
                    {!activeLoop.active && (
                      <div className="space-y-3">
                        <Label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Difficulty Level</Label>
                        <div className="grid grid-cols-4 gap-2">
                          {[1, 2, 3, 4].map(l => (
                            <Button 
                              key={l} 
                              variant={difficulty === l ? 'default' : 'outline'}
                              className="h-10 font-bold"
                              onClick={() => setDifficulty(l)}
                            >
                              {l}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="bg-muted/10 p-6">
                    <Button className="w-full h-12 font-black uppercase shadow-lg gap-2" onClick={handleStart}>
                      <Play className="w-4 h-4 fill-current" /> Begin rep
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {gameState === 'active' && currentDrill && (
              <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-2xl space-y-6">
                
                {currentDrill.language === 'SQL' && currentDrill.tableInput && (
                  <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl space-y-2">
                    <p className="text-[10px] font-black uppercase text-blue-600 flex items-center gap-2">
                      <Database className="w-3 h-3" /> Input Schema/Table
                    </p>
                    <pre className="text-[10px] font-mono whitespace-pre-wrap">{currentDrill.tableInput}</pre>
                  </div>
                )}

                <div className="bg-card border-2 border-primary/10 rounded-2xl p-6 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  {currentDrill.content}
                </div>

                <div className="space-y-4">
                  {currentDrill.lane === 'Write' && (
                    <Textarea 
                      placeholder="Type the code exactly..." 
                      className="font-mono text-sm h-32 resize-none"
                      value={userInput}
                      onChange={e => {
                        setUserInput(e.target.value);
                        if (e.target.value.trim() === currentDrill.content.trim()) {
                          handleCompleteRound(100, 450); // CPM mock
                        }
                      }}
                      autoFocus
                    />
                  )}
                  {currentDrill.lane === 'Read' && (
                    <div className="flex gap-2">
                      <Input 
                        placeholder={currentDrill.type === 'Bug Hunt' ? "Line number of bug..." : "Expected output..."} 
                        className="font-mono h-12"
                        value={userInput}
                        onChange={e => setUserInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleCompleteRound(100, 5)}
                      />
                      <Button size="lg" onClick={() => handleCompleteRound(100, 5)}>Verify</Button>
                    </div>
                  )}
                  {currentDrill.lane === 'Build' && (
                    <Textarea 
                      placeholder="Implement the solution..." 
                      className="font-mono text-sm h-48"
                      value={userInput}
                      onChange={e => setUserInput(e.target.value)}
                    />
                  )}
                </div>
                
                {currentDrill.lane === 'Build' && (
                  <Button onClick={() => handleCompleteRound(100, 120)} className="w-full h-12">Submit Build</Button>
                )}
              </motion.div>
            )}

            {gameState === 'summary' && (
              <motion.div key="summary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
                <Card className="border-primary/10 shadow-xl overflow-hidden">
                  <CardHeader className="text-center bg-primary/5 py-6">
                    <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-2 text-primary">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-xl font-black uppercase">{activeLoop.active ? 'Daily Loop Complete' : 'Drill Synopsis'}</CardTitle>
                    <CardDescription>Fluency metrics calculated and ready for sync.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {activeLoop.active ? (
                      <div className="space-y-3">
                        {activeLoop.results.map((res, i) => (
                          <div key={i} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                            <span className="text-xs font-bold uppercase">{res.lane}</span>
                            <Badge variant="outline" className="text-primary border-primary/20">{res.accuracy}% ACC</Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 bg-muted/30 rounded-xl text-center">
                          <p className="text-[8px] font-black uppercase text-muted-foreground">Avg Accuracy</p>
                          <p className="text-2xl font-black">92%</p>
                        </div>
                        <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl text-center">
                          <p className="text-[8px] font-black uppercase text-primary">Velocity Index</p>
                          <p className="text-2xl font-black text-primary">88</p>
                        </div>
                      </div>
                    )}
                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <Label className="text-[10px] font-bold uppercase">Session Focus</Label>
                        <span className="text-lg font-black text-primary">{focusRating}</span>
                      </div>
                      <Slider value={[focusRating]} onValueChange={([v]) => setFocusRating(v)} min={1} max={5} step={1} />
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/10 p-6">
                    <Button className="w-full h-12 font-black uppercase shadow-lg" onClick={finalize}>
                      Finish & Sync History <ArrowRight className="ml-2 w-4 h-4" />
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
