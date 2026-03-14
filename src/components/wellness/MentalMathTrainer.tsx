'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Zap, Play, RotateCcw, Settings2, 
  CheckCircle2, XCircle, Trophy, Clock,
  Plus, Minus, X, Divide, ChevronRight
} from 'lucide-react';
import { useMathTrainerStore, type MathOperator } from '@/hooks/use-math-trainer-store';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function MentalMathTrainer() {
  const { settings, updateSettings, addSession, history, highScore } = useMathTrainerStore();
  
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'results'>('idle');
  const [timeLeft, setTimeLeft] = useState(settings.duration);
  const [score, setScore] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [currentProblem, setCurrentProblem] = useState({ a: 0, b: 0, op: '+' as MathOperator, answer: 0 });
  const [userInput, setUserInput] = useState('');
  const [lastFeedback, setLastFeedback] = useState<'correct' | 'incorrect' | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const generateProblem = useCallback(() => {
    const { minNumber, maxNumber, operators } = settings;
    const op = operators[Math.floor(Math.random() * operators.length)];
    let a = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    let b = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    let answer = 0;

    switch (op) {
      case '+': answer = a + b; break;
      case '-': 
        if (a < b) [a, b] = [b, a];
        answer = a - b; 
        break;
      case '*': answer = a * b; break;
      case '/':
        answer = a;
        a = a * b; // Ensure whole number division
        break;
    }

    setCurrentProblem({ a, b, op, answer });
    setUserInput('');
  }, [settings]);

  const startTraining = () => {
    setScore(0);
    setTotalAttempted(0);
    setTimeLeft(settings.duration);
    setGameState('playing');
    setLastFeedback(null);
    generateProblem();
  };

  const handleFinish = useCallback(() => {
    setGameState('results');
    const duration = settings.duration || 60; // fallback if infinite
    addSession({
      score,
      total: totalAttempted,
      wpm: Math.round((score / duration) * 60),
      duration: duration,
      operators: settings.operators
    });
  }, [score, totalAttempted, settings, addSession]);

  useEffect(() => {
    if (gameState === 'playing' && settings.duration > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, settings.duration, handleFinish]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserInput(val);

    const numVal = parseInt(val);
    if (!isNaN(numVal)) {
      if (numVal === currentProblem.answer) {
        setScore(prev => prev + 1);
        setTotalAttempted(prev => prev + 1);
        setLastFeedback('correct');
        setTimeout(() => setLastFeedback(null), 400);
        generateProblem();
      } else if (val.length >= currentProblem.answer.toString().length) {
        // Only mark incorrect if they've typed enough digits
        if (numVal !== currentProblem.answer) {
          setTotalAttempted(prev => prev + 1);
          setLastFeedback('incorrect');
          setTimeout(() => setLastFeedback(null), 400);
          generateProblem();
        }
      }
    }
  };

  const toggleOperator = (op: MathOperator) => {
    const newOps = settings.operators.includes(op)
      ? settings.operators.filter(o => o !== op)
      : [...settings.operators, op];
    if (newOps.length > 0) {
      updateSettings({ operators: newOps });
    }
  };

  if (gameState === 'playing') {
    return (
      <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
        <div className="w-full max-w-md flex justify-between items-center px-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-muted-foreground">Velocity</span>
            <span className="text-2xl font-black text-primary">{score}</span>
          </div>
          {settings.duration > 0 && (
            <div className="flex flex-col items-center">
              <Clock className="w-4 h-4 text-primary animate-pulse mb-1" />
              <span className="text-3xl font-mono font-bold">{timeLeft}s</span>
            </div>
          )}
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase text-muted-foreground">Accuracy</span>
            <span className="text-2xl font-black">{totalAttempted > 0 ? Math.round((score / totalAttempted) * 100) : 100}%</span>
          </div>
        </div>

        <Card className={cn(
          "w-full max-w-xl border-2 transition-all duration-300 shadow-2xl",
          lastFeedback === 'correct' ? "border-emerald-500 bg-emerald-500/5 scale-105" : 
          lastFeedback === 'incorrect' ? "border-destructive bg-destructive/5 shake" : "border-primary/20"
        )}>
          <CardContent className="p-12 flex flex-col items-center space-y-12">
            <div className="text-7xl md:text-8xl font-black tracking-tighter flex items-center gap-8">
              <span>{currentProblem.a}</span>
              <span className="text-primary opacity-50">
                {currentProblem.op === '+' && <Plus className="w-12 h-12" />}
                {currentProblem.op === '-' && <Minus className="w-12 h-12" />}
                {currentProblem.op === '*' && <X className="w-12 h-12" />}
                {currentProblem.op === '/' && <Divide className="w-12 h-12" />}
              </span>
              <span>{currentProblem.b}</span>
            </div>

            <div className="relative w-full max-w-[240px]">
              <Input
                ref={inputRef}
                type="number"
                value={userInput}
                onChange={handleInputChange}
                className="h-24 text-5xl text-center font-black bg-muted/30 border-none focus-visible:ring-offset-0 focus-visible:ring-primary/40 rounded-3xl"
                autoFocus
                placeholder="?"
              />
              <div className="absolute -bottom-8 left-0 right-0 text-center">
                <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest animate-pulse">Type answer to solve</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button variant="ghost" onClick={() => setGameState('idle')} className="text-muted-foreground hover:text-destructive">
          Abort Session
        </Button>
      </div>
    );
  }

  if (gameState === 'results') {
    const accuracy = totalAttempted > 0 ? Math.round((score / totalAttempted) * 100) : 0;
    return (
      <div className="max-w-md mx-auto space-y-6 animate-in zoom-in-95 duration-500">
        <Card className="border-primary/20 shadow-2xl overflow-hidden">
          <CardHeader className="bg-primary/5 text-center">
            <Trophy className="w-12 h-12 text-primary mx-auto mb-2" />
            <CardTitle className="text-3xl font-black uppercase tracking-tighter">Session Complete</CardTitle>
            <CardDescription>Hardware performance synchronized.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-2xl text-center">
                <p className="text-[10px] font-black uppercase text-muted-foreground">Correct</p>
                <p className="text-4xl font-black">{score}</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-2xl text-center">
                <p className="text-[10px] font-black uppercase text-muted-foreground">Accuracy</p>
                <p className="text-4xl font-black text-primary">{accuracy}%</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold uppercase">
                <span className="text-muted-foreground">Efficiency Rank</span>
                <span className="text-primary">{score > 40 ? 'Elite' : score > 20 ? 'Advanced' : 'Practitioner'}</span>
              </div>
              <Progress value={accuracy} className="h-2" />
            </div>
          </CardContent>
          <CardFooter className="bg-muted/10 p-4 gap-2">
            <Button className="flex-1 h-12 font-bold" onClick={startTraining}>Try Again</Button>
            <Button variant="outline" className="flex-1 h-12 font-bold" onClick={() => setGameState('idle')}>Back to Lab</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-2 border-primary/10">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><Zap className="w-5 h-5" /></div>
              <CardTitle className="text-xl">Arithmetic Sprint</CardTitle>
            </div>
            {highScore > 0 && (
              <Badge className="bg-primary text-primary-foreground font-black py-1 px-3">
                PB: {highScore}
              </Badge>
            )}
          </div>
          <CardDescription>High-velocity training to build numerical automaticity.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active Operations</Label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: '+', icon: Plus, label: 'Add' },
                { id: '-', icon: Minus, label: 'Sub' },
                { id: '*', icon: X, label: 'Mult' },
                { id: '/', icon: Divide, label: 'Div' }
              ].map(op => (
                <Button
                  key={op.id}
                  variant={settings.operators.includes(op.id as MathOperator) ? 'default' : 'outline'}
                  className="h-16 flex flex-col gap-1 border-primary/10"
                  onClick={() => toggleOperator(op.id as MathOperator)}
                >
                  <op.icon className="w-5 h-5" />
                  <span className="text-[9px] font-black uppercase">{op.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Number Range</Label>
                <span className="text-xs font-bold text-primary">{settings.minNumber} - {settings.maxNumber}</span>
              </div>
              <Slider 
                value={[settings.minNumber, settings.maxNumber]} 
                min={2} 
                max={200} 
                step={1} 
                onValueChange={([min, max]) => updateSettings({ minNumber: min, maxNumber: max })}
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Session Duration</Label>
                <span className="text-xs font-bold text-primary">{settings.duration}s</span>
              </div>
              <Slider 
                value={[settings.duration]} 
                min={30} 
                max={300} 
                step={30} 
                onValueChange={([v]) => updateSettings({ duration: v })}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/10 p-6 border-t border-primary/5">
          <Button onClick={startTraining} size="lg" className="w-full h-14 text-lg font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
            Initialize Sprint <Play className="ml-2 w-5 h-5 fill-current" />
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-6">
        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Local History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-80">
              <div className="divide-y divide-primary/5">
                {history.length === 0 ? (
                  <div className="p-8 text-center opacity-30 italic text-xs">No local logs yet.</div>
                ) : (
                  history.map(session => (
                    <div key={session.id} className="p-4 flex justify-between items-center hover:bg-muted/30 transition-colors">
                      <div>
                        <p className="text-sm font-bold">{session.score} Solved</p>
                        <p className="text-[9px] text-muted-foreground uppercase font-black">{session.wpm} PPM • {new Date(session.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-1">
                        {session.operators.map(op => <span key={op} className="text-[10px] font-mono opacity-40">{op}</span>)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-3">
          <Settings2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-[10px] text-muted-foreground leading-relaxed italic">
            "Speed drills build numerical automaticity, freeing up cognitive bandwidth for high-level strategy."
          </p>
        </div>
      </div>
    </div>
  );
}
