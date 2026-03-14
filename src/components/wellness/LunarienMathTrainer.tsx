
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Zap, Play, RotateCcw, Trophy, 
  Clock, Target, ArrowRight, ShieldCheck,
  Brain, Star, ChevronRight, Settings2
} from 'lucide-react';
import { useLunarienStore, type LunarienDifficulty } from '@/hooks/use-lunarien-store';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function LunarienMathTrainer() {
  const { settings, updateSettings, addSession, stats, history } = useLunarienStore();
  
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'results'>('idle');
  const [timeLeft, setTimeLeft] = useState(settings.duration);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentProblem, setCurrentProblem] = useState({ text: '', answer: 0 });
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout>(null);

  const generateProblem = useCallback(() => {
    const { difficulty, includeSquares, includePercentages } = settings;
    
    // Choose mode
    const modes = ['basic'];
    if (includeSquares) modes.push('square');
    if (includePercentages) modes.push('percent');
    
    const mode = modes[Math.floor(Math.random() * modes.length)];

    if (mode === 'square') {
      const n = Math.floor(Math.random() * 25) + 2;
      setCurrentProblem({ text: `${n}²`, answer: n * n });
    } else if (mode === 'percent') {
      const percs = [5, 10, 15, 20, 25, 50];
      const p = percs[Math.floor(Math.random() * percs.length)];
      const n = (Math.floor(Math.random() * 20) + 1) * 10;
      setCurrentProblem({ text: `${p}% of ${n}`, answer: (p / 100) * n });
    } else {
      let a, b, op;
      const ops = ['+', '-', '*'];
      
      switch (difficulty) {
        case 'Apprentice':
          a = Math.floor(Math.random() * 12) + 1;
          b = Math.floor(Math.random() * 12) + 1;
          op = ops[Math.floor(Math.random() * 2)]; // Just + and -
          break;
        case 'Practitioner':
          a = Math.floor(Math.random() * 50) + 10;
          b = Math.floor(Math.random() * 50) + 10;
          op = ops[Math.floor(Math.random() * 3)];
          break;
        case 'Master':
          a = Math.floor(Math.random() * 100) + 20;
          b = Math.floor(Math.random() * 100) + 20;
          op = ops[Math.floor(Math.random() * 3)];
          break;
        case 'God':
          a = Math.floor(Math.random() * 500) + 50;
          b = Math.floor(Math.random() * 500) + 50;
          op = '*';
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
    }
    setUserInput('');
  }, [settings]);

  const handleStart = () => {
    setScore(0);
    setTotal(0);
    setTimeLeft(settings.duration);
    setGameState('playing');
    generateProblem();
  };

  const handleFinish = useCallback(() => {
    setGameState('results');
    const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;
    const ppm = Math.round((score / settings.duration) * 60);
    addSession({ score, accuracy, ppm, difficulty: settings.difficulty });
  }, [score, total, settings, addSession]);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, timeLeft, handleFinish]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserInput(val);

    const numVal = parseFloat(val);
    if (!isNaN(numVal)) {
      if (numVal === currentProblem.answer) {
        setScore(s => s + 1);
        setTotal(t => t + 1);
        setFeedback('correct');
        setTimeout(() => { setFeedback(null); generateProblem(); }, 200);
      } else if (val.length >= currentProblem.answer.toString().length) {
        if (numVal !== currentProblem.answer) {
          setTotal(t => t + 1);
          setFeedback('incorrect');
          setTimeout(() => { setFeedback(null); generateProblem(); }, 400);
        }
      }
    }
  };

  if (gameState === 'playing') {
    return (
      <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500 max-w-2xl mx-auto">
        <div className="w-full flex justify-between items-center px-4">
          <Badge variant="outline" className="border-primary/20 text-primary font-black uppercase text-[10px] tracking-widest h-6">
            {settings.difficulty} Tier
          </Badge>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-3xl font-black font-mono">{timeLeft}s</span>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase text-muted-foreground">Score</p>
            <p className="text-2xl font-black text-primary">{score}</p>
          </div>
        </div>

        <Card className={cn(
          "w-full border-2 transition-all duration-300 shadow-2xl overflow-hidden",
          feedback === 'correct' ? "border-emerald-500 bg-emerald-500/5" : 
          feedback === 'incorrect' ? "border-destructive bg-destructive/5 shake" : "border-primary/10"
        )}>
          <CardContent className="p-16 flex flex-col items-center space-y-12">
            <motion.div 
              key={currentProblem.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-8xl font-black tracking-tighter"
            >
              {currentProblem.text}
            </motion.div>

            <Input 
              type="number"
              value={userInput}
              onChange={handleInput}
              className="h-24 text-6xl text-center font-black bg-muted/30 border-none focus-visible:ring-offset-0 focus-visible:ring-primary/40 rounded-3xl"
              autoFocus
              placeholder="?"
            />
          </CardContent>
        </Card>

        <Button variant="ghost" size="sm" onClick={() => setGameState('idle')} className="text-muted-foreground">
          Abort Session
        </Button>
      </div>
    );
  }

  if (gameState === 'results') {
    const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div className="max-w-md mx-auto space-y-6 animate-in zoom-in-95 duration-500">
        <Card className="border-primary/20 shadow-2xl">
          <CardHeader className="text-center">
            <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-2">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-black uppercase">Tier Results</CardTitle>
            <CardDescription>{settings.difficulty} Session complete.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
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
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold uppercase tracking-tight">Velocity</span>
              </div>
              <span className="text-xl font-black">{Math.round((score / settings.duration) * 60)} PPM</span>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/10 p-4 gap-2">
            <Button className="flex-1 h-12 font-bold" onClick={handleStart}>Play Again</Button>
            <Button variant="outline" className="flex-1 h-12 font-bold" onClick={() => setGameState('idle')}>Close</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      <Card className="lg:col-span-2 border-primary/10">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><Brain className="w-5 h-5" /></div>
              <div>
                <CardTitle className="text-xl">Lunarien Mental Math</CardTitle>
                <CardDescription>Structured difficulty tiers for elite calculation speed.</CardDescription>
              </div>
            </div>
            <Badge className="bg-primary text-white font-black py-1 px-3">LEVEL {stats.currentLevel}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(['Apprentice', 'Practitioner', 'Master', 'God'] as LunarienDifficulty[]).map(d => (
              <Button
                key={d}
                variant={settings.difficulty === d ? 'default' : 'outline'}
                className="h-16 flex flex-col gap-1 border-primary/10"
                onClick={() => updateSettings({ difficulty: d })}
              >
                <span className="text-[10px] font-black uppercase">{d}</span>
                <span className="text-[8px] opacity-60 font-bold">
                  {d === 'Apprentice' ? '1-12' : d === 'Practitioner' ? '10-50' : d === 'Master' ? '20-100' : '50-500'}
                </span>
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Session Duration</Label>
              <div className="flex justify-between text-xs font-bold text-primary mb-1">
                <span>Time Limit</span>
                <span>{settings.duration}s</span>
              </div>
              <Slider 
                value={[settings.duration]} 
                min={30} 
                max={300} 
                step={30} 
                onValueChange={([v]) => updateSettings({ duration: v })}
              />
            </div>
            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Special Modes</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl border bg-muted/20">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold">Perfect Squares</span>
                  </div>
                  <Switch checked={settings.includeSquares} onCheckedChange={v => updateSettings({ includeSquares: v })} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl border bg-muted/20">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold">Percentage Logic</span>
                  </div>
                  <Switch checked={settings.includePercentages} onCheckedChange={v => updateSettings({ includePercentages: v })} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/10 p-6 border-t border-primary/5">
          <Button onClick={handleStart} size="lg" className="w-full h-14 text-lg font-black shadow-xl">
            Launch Drill <Play className="ml-2 w-5 h-5 fill-current" />
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-6">
        <Card className="border-primary/10 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Global Standing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-background rounded-xl border border-primary/5 text-center">
                <p className="text-[8px] font-black uppercase text-muted-foreground">Total Solved</p>
                <p className="text-xl font-black">{stats.totalSolved}</p>
              </div>
              <div className="p-3 bg-background rounded-xl border border-primary/5 text-center">
                <p className="text-[8px] font-black uppercase text-muted-foreground">Highest PPM</p>
                <p className="text-xl font-black">{stats.highestPPM}</p>
              </div>
            </div>
            <div className="p-4 bg-background/50 rounded-xl border border-dashed flex items-start gap-3">
              <Settings2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                "Tiered practice builds structural resilience. Master the Practitioner tier before attempting God mode to ensure neural stability."
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/10">
          <CardHeader className="pb-2"><CardTitle className="text-xs font-bold uppercase opacity-60">Recent Drills</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {history.slice(0, 5).map(s => (
              <div key={s.id} className="flex justify-between items-center p-2 rounded-lg bg-muted/30 text-[10px] border border-transparent hover:border-primary/5 transition-all">
                <div>
                  <p className="font-bold">{s.score} Correct • {s.difficulty}</p>
                  <p className="opacity-60">{format(parseISO(s.date), 'MMM d, h:mm a')}</p>
                </div>
                <Badge variant="outline" className="h-5 text-[8px] font-black">{s.ppm} PPM</Badge>
              </div>
            ))}
            {history.length === 0 && <p className="text-center py-8 text-xs text-muted-foreground italic">No history yet.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { format, parseISO } from 'date-fns';
