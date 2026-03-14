
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  Zap, Play, Trophy, Target, 
  Brain, Star, ArrowRight, ShieldCheck,
  ChevronRight, Settings2, Clock, CheckCircle2,
  XCircle, RotateCcw, Sparkles
} from 'lucide-react';
import { useArithmentorStore, type ArithmentorDifficulty, type ArithmentorMode } from '@/hooks/use-arithmentor-store';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function ArithmentorTrainer() {
  const { settings, updateSettings, addSession, stats, history } = useArithmentorStore();
  
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'results'>('idle');
  const [timeLeft, setTimeLeft] = useState(60);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [currentProblem, setCurrentProblem] = useState({ text: '', answer: 0 });
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState(0);

  const generateProblem = useCallback(() => {
    const { difficulty } = settings;
    let a, b, op;
    const ops = ['+', '-', '*'];
    
    switch (difficulty) {
      case 'Apprentice':
        a = Math.floor(Math.random() * 20) + 1;
        b = Math.floor(Math.random() * 20) + 1;
        op = ops[Math.floor(Math.random() * 2)];
        break;
      case 'Sage':
        a = Math.floor(Math.random() * 100) + 10;
        b = Math.floor(Math.random() * 50) + 5;
        op = ops[Math.floor(Math.random() * 3)];
        break;
      case 'Architect':
        a = Math.floor(Math.random() * 500) + 50;
        b = Math.floor(Math.random() * 100) + 10;
        op = ops[Math.floor(Math.random() * 3)];
        break;
      case 'Titan':
        a = Math.floor(Math.random() * 1000) + 100;
        b = Math.floor(Math.random() * 1000) + 100;
        op = ops[Math.floor(Math.random() * 3)];
        break;
    }

    let text = '';
    let answer = 0;
    if (op === '+') { text = `${a} + ${b}`; answer = a + b; }
    else if (op === '-') { 
      if (a < b) [a, b] = [b, a];
      text = `${a} - ${b}`; 
      answer = a - b; 
    }
    else { text = `${a} × ${b}`; answer = a * b; }

    setCurrentProblem({ text, answer });
    setUserInput('');
  }, [settings]);

  const handleStart = () => {
    setSessionScore(0);
    setSessionTotal(0);
    setTimeLeft(60);
    setSessionStartTime(Date.now());
    setGameState('playing');
    generateProblem();
  };

  const handleFinish = useCallback(() => {
    setGameState('results');
    const elapsed = (Date.now() - sessionStartTime) / 1000;
    const pace = sessionScore > 0 ? elapsed / sessionScore : 0;
    const accuracy = sessionTotal > 0 ? Math.round((sessionScore / sessionTotal) * 100) : 0;
    
    addSession({ 
      solved: sessionScore, 
      accuracy, 
      avgTimePerProblem: parseFloat(pace.toFixed(2)), 
      difficulty: settings.difficulty 
    });
  }, [sessionScore, sessionTotal, sessionStartTime, settings.difficulty, addSession]);

  // Handle timer countdown
  useEffect(() => {
    if (gameState === 'playing' && settings.mode === 'Sprint' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, timeLeft, settings.mode]);

  // Handle completion when time hits 0
  useEffect(() => {
    if (gameState === 'playing' && settings.mode === 'Sprint' && timeLeft === 0) {
      handleFinish();
    }
  }, [gameState, timeLeft, settings.mode, handleFinish]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserInput(val);

    const numVal = parseInt(val);
    if (!isNaN(numVal)) {
      if (numVal === currentProblem.answer) {
        setSessionScore(s => s + 1);
        setSessionTotal(t => t + 1);
        setFeedback('correct');
        setTimeout(() => { setFeedback(null); generateProblem(); }, 150);
      } else if (val.length >= currentProblem.answer.toString().length) {
        if (numVal !== currentProblem.answer) {
          setSessionTotal(t => t + 1);
          setFeedback('incorrect');
          setTimeout(() => { setFeedback(null); generateProblem(); }, 300);
        }
      }
    }
  };

  const todayProgress = Math.min(100, (stats.solvedToday / settings.dailyGoal) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      <Card className="lg:col-span-2 border-primary/10 overflow-hidden flex flex-col min-h-[500px]">
        <CardHeader className="bg-primary/5 border-b border-primary/5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><Target className="w-5 h-5" /></div>
              <div>
                <CardTitle className="text-xl">Daily Goal: {stats.solvedToday} / {settings.dailyGoal}</CardTitle>
                <CardDescription>Achieve your numerical quota to maintain composure.</CardDescription>
              </div>
            </div>
            {gameState !== 'idle' && (
              <Button variant="ghost" size="icon" onClick={() => setGameState('idle')} className="text-muted-foreground">
                <XCircle className="w-4 h-4 mr-2" /> Stop
              </Button>
            )}
          </div>
          <Progress value={todayProgress} className="h-1.5 mt-4" />
        </CardHeader>

        <CardContent className="flex-grow flex flex-col items-center justify-center p-12 relative">
          <AnimatePresence mode="wait">
            {gameState === 'idle' && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6">
                <div className="p-6 bg-primary/5 rounded-full w-fit mx-auto">
                  <Brain className="w-16 h-16 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase">Ready for your quest?</h3>
                  <p className="text-muted-foreground text-sm">Choose your mode and difficulty on the right.</p>
                </div>
                <Button size="lg" className="h-14 px-12 text-lg font-black shadow-xl" onClick={handleStart}>
                  Start Training <Play className="ml-2 w-5 h-5 fill-current" />
                </Button>
              </motion.div>
            )}

            {gameState === 'playing' && (
              <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center space-y-12">
                <div className="w-full flex justify-between items-center mb-4">
                  <Badge variant="outline" className="font-black uppercase text-[10px] tracking-widest">{settings.difficulty}</Badge>
                  {settings.mode === 'Sprint' && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary animate-pulse" />
                      <span className="text-3xl font-black font-mono">{timeLeft}s</span>
                    </div>
                  )}
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-muted-foreground">Session Solves</p>
                    <p className="text-2xl font-black text-primary">{sessionScore}</p>
                  </div>
                </div>

                <div className={cn(
                  "w-full max-w-lg p-16 rounded-3xl border-2 transition-all duration-200 text-center space-y-12",
                  feedback === 'correct' ? "border-emerald-500 bg-emerald-500/5 scale-105" : 
                  feedback === 'incorrect' ? "border-destructive bg-destructive/5 shake" : "border-primary/10"
                )}>
                  <div className="text-8xl font-black tracking-tighter">{currentProblem.text}</div>
                  <Input 
                    type="number"
                    value={userInput}
                    onChange={handleInput}
                    className="h-24 text-6xl text-center font-black bg-muted/30 border-none focus-visible:ring-offset-0 focus-visible:ring-primary/40 rounded-3xl"
                    autoFocus
                    placeholder="?"
                  />
                </div>
                
                {settings.mode === 'Zen' && (
                  <Button variant="outline" className="font-bold h-12 px-8" onClick={handleFinish}>Finish & Sync</Button>
                )}
              </motion.div>
            )}

            {gameState === 'results' && (
              <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8">
                <div className="p-6 bg-emerald-500/10 text-emerald-600 rounded-full w-fit mx-auto">
                  <CheckCircle2 className="w-20 h-20" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-black uppercase tracking-tight">Sync Complete</h3>
                  <p className="text-lg text-muted-foreground">You solved {sessionScore} problems in this session.</p>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" size="lg" onClick={() => setGameState('idle')} className="font-bold">Close</Button>
                  <Button size="lg" onClick={handleStart} className="font-bold px-8">Next Session <ArrowRight className="ml-2 w-4 h-4" /></Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="border-primary/10">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-primary" /> Calibration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-muted-foreground">Difficulty Tier</Label>
              <div className="grid grid-cols-2 gap-2">
                {(['Apprentice', 'Sage', 'Architect', 'Titan'] as ArithmentorDifficulty[]).map(d => (
                  <Button 
                    key={d} 
                    variant={settings.difficulty === d ? 'default' : 'outline'} 
                    size="sm" 
                    className="text-[10px] font-black uppercase h-9"
                    onClick={() => updateSettings({ difficulty: d })}
                  >
                    {d}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-muted-foreground">Training Mode</Label>
              <div className="grid grid-cols-2 gap-2">
                {(['Zen', 'Sprint'] as ArithmentorMode[]).map(m => (
                  <Button 
                    key={m} 
                    variant={settings.mode === m ? 'default' : 'outline'} 
                    size="sm" 
                    className="text-[10px] font-black uppercase h-9"
                    onClick={() => updateSettings({ mode: m })}
                  >
                    {m}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <Label className="text-[10px] font-black uppercase text-muted-foreground">Daily Quota</Label>
                <span className="text-xs font-bold text-primary">{settings.dailyGoal} Solves</span>
              </div>
              <Slider 
                value={[settings.dailyGoal]} 
                min={10} 
                max={200} 
                step={10} 
                onValueChange={([v]) => updateSettings({ dailyGoal: v })}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/10 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5" /> Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-background rounded-xl border border-primary/5 text-center">
                <p className="text-[8px] font-black uppercase text-muted-foreground">Total Reps</p>
                <p className="text-xl font-black">{stats.totalSolved}</p>
              </div>
              <div className="p-3 bg-background rounded-xl border border-primary/5 text-center">
                <p className="text-[8px] font-black uppercase text-muted-foreground">Best Pace</p>
                <p className="text-xl font-black">{stats.bestPace}s</p>
              </div>
            </div>
            
            <div className="p-4 bg-background/50 rounded-xl border border-dashed space-y-2">
              <p className="text-xs font-bold flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-amber-500" /> Goal Insight</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                {todayProgress >= 100 
                  ? "Daily quest complete. Your numerical hardware is primed." 
                  : `You are ${settings.dailyGoal - stats.solvedToday} solves away from your daily intention.`}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
