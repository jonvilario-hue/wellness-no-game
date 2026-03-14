
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, Play, Trophy, Target, 
  Star, Flame, ArrowRight, ShieldCheck,
  Plus, Minus, X, Divide, RotateCcw
} from 'lucide-react';
import { useMathArcadeStore, type MathOperator } from '@/hooks/use-math-arcade-store';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function MathArcade() {
  const { totalXP, level, highScores, addXP, saveSession } = useMathArcadeStore();
  
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'results'>('idle');
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [currentProblem, setCurrentProblem] = useState({ a: 0, b: 0, op: '+' as MathOperator, answer: 0 });
  const [userInput, setUserInput] = useState('');
  const [operators, setOperators] = useState<MathOperator[]>(['+', '-']);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const generateProblem = useCallback(() => {
    const op = operators[Math.floor(Math.random() * operators.length)];
    let a, b, answer;

    // Scale difficulty with level
    const range = 10 + (level * 2);
    
    switch (op) {
      case '+':
        a = Math.floor(Math.random() * range) + 1;
        b = Math.floor(Math.random() * range) + 1;
        answer = a + b;
        break;
      case '-':
        a = Math.floor(Math.random() * range) + 5;
        b = Math.floor(Math.random() * a) + 1;
        answer = a - b;
        break;
      case '*':
        a = Math.floor(Math.random() * Math.min(range, 12)) + 2;
        b = Math.floor(Math.random() * 10) + 2;
        answer = a * b;
        break;
      case '/':
        b = Math.floor(Math.random() * 10) + 2;
        answer = Math.floor(Math.random() * 10) + 2;
        a = b * answer;
        break;
      default:
        a = 1; b = 1; answer = 2;
    }

    setCurrentProblem({ a, b, op, answer: answer! });
    setUserInput('');
  }, [operators, level]);

  const handleStart = () => {
    setScore(0);
    setTotalAttempted(0);
    setCombo(0);
    setMaxCombo(0);
    setTimeLeft(60);
    setGameState('playing');
    generateProblem();
  };

  const handleFinish = useCallback(() => {
    setGameState('results');
    const xpGained = score * 5 + maxCombo * 10;
    const accuracy = totalAttempted > 0 ? Math.round((score / totalAttempted) * 100) : 0;
    
    addXP(xpGained);
    saveSession({
      score,
      xpGained,
      maxCombo,
      accuracy,
      operators
    });
  }, [score, totalAttempted, maxCombo, operators, addXP, saveSession]);

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

    const numVal = parseInt(val);
    if (!isNaN(numVal)) {
      if (numVal === currentProblem.answer) {
        const newScore = score + 1;
        const newCombo = combo + 1;
        setScore(newScore);
        setTotalAttempted(t => t + 1);
        setCombo(newCombo);
        setMaxCombo(m => Math.max(m, newCombo));
        setFeedback('correct');
        setTimeout(() => { setFeedback(null); generateProblem(); }, 150);
      } else if (val.length >= currentProblem.answer.toString().length) {
        if (numVal !== currentProblem.answer) {
          setTotalAttempted(t => t + 1);
          setCombo(0);
          setFeedback('incorrect');
          setTimeout(() => { setFeedback(null); generateProblem(); }, 300);
        }
      }
    }
  };

  const toggleOperator = (op: MathOperator) => {
    if (operators.includes(op) && operators.length === 1) return;
    setOperators(prev => 
      prev.includes(op) ? prev.filter(o => o !== op) : [...prev, op]
    );
  };

  const currentOpKey = [...operators].sort().join(',');
  const highScore = highScores[currentOpKey] || 0;

  if (gameState === 'playing') {
    return (
      <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500 max-w-2xl mx-auto">
        <div className="w-full flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg text-primary"><Zap className="w-4 h-4" /></div>
            <span className="text-2xl font-black">{score}</span>
          </div>
          
          <div className="flex flex-col items-center w-32">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs font-bold font-mono">{timeLeft}s</span>
            </div>
            <Progress value={(timeLeft / 60) * 100} className="h-1.5" />
          </div>

          <AnimatePresence>
            {combo >= 2 && (
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                className="flex items-center gap-1 text-orange-500"
              >
                <Flame className="w-5 h-5 fill-current" />
                <span className="text-xl font-black">{combo}x</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Card className={cn(
          "w-full border-2 transition-all duration-200 shadow-2xl overflow-hidden bg-card",
          feedback === 'correct' ? "border-emerald-500 bg-emerald-500/5" : 
          feedback === 'incorrect' ? "border-destructive bg-destructive/5 shake" : "border-primary/10"
        )}>
          <CardContent className="p-16 flex flex-col items-center space-y-8">
            <motion.div 
              key={currentProblem.a + currentProblem.b + currentProblem.op}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-8xl font-black tracking-tighter"
            >
              {currentProblem.a} {currentProblem.op === '*' ? '×' : currentProblem.op === '/' ? '÷' : currentProblem.op} {currentProblem.b}
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
          Exit Blitz
        </Button>
      </div>
    );
  }

  if (gameState === 'results') {
    const accuracy = totalAttempted > 0 ? Math.round((score / totalAttempted) * 100) : 0;
    return (
      <div className="max-w-md mx-auto space-y-6 animate-in zoom-in-95 duration-500">
        <Card className="border-primary/20 shadow-2xl">
          <CardHeader className="text-center bg-primary/5">
            <Trophy className="w-12 h-12 text-primary mx-auto mb-2" />
            <CardTitle className="text-3xl font-black uppercase">Blitz Results</CardTitle>
            <CardDescription>Session synchronized with local XP.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-2xl text-center">
                <p className="text-[10px] font-black uppercase text-muted-foreground">Solved</p>
                <p className="text-4xl font-black">{score}</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-2xl text-center">
                <p className="text-[10px] font-black uppercase text-muted-foreground">Max Combo</p>
                <p className="text-4xl font-black text-orange-500">{maxCombo}x</p>
              </div>
            </div>
            
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-primary fill-current" />
                <span className="text-sm font-bold uppercase">XP Gained</span>
              </div>
              <span className="text-xl font-black">+{score * 5 + maxCombo * 10}</span>
            </div>

            <div className="text-center">
              <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Accuracy: {accuracy}%</p>
              <Progress value={accuracy} className="h-1.5" />
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
      <Card className="lg:col-span-2 border-primary/10 bg-card overflow-hidden">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><Zap className="w-5 h-5" /></div>
              <div>
                <CardTitle className="text-xl">Math Blitz Arcade</CardTitle>
                <CardDescription>High-speed calculations. Combos earn bonus XP.</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <Badge className="bg-primary text-white font-black px-3 py-1">RANK {level}</Badge>
              <p className="text-[10px] font-black text-muted-foreground mt-1 uppercase">{totalXP} TOTAL XP</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Select Operations</Label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: '+', icon: Plus, label: 'ADD' },
                { id: '-', icon: Minus, label: 'SUB' },
                { id: '*', icon: X, label: 'MULT' },
                { id: '/', icon: Divide, label: 'DIV' }
              ].map(op => (
                <Button
                  key={op.id}
                  variant={operators.includes(op.id as MathOperator) ? 'default' : 'outline'}
                  className={cn(
                    "h-16 flex flex-col gap-1 border-primary/10 transition-all",
                    operators.includes(op.id as MathOperator) && "ring-2 ring-primary/20"
                  )}
                  onClick={() => toggleOperator(op.id as MathOperator)}
                >
                  <op.icon className="w-5 h-5" />
                  <span className="text-[9px] font-black">{op.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-primary/5 rounded-3xl border border-dashed border-primary/20 text-center space-y-4">
            <div className="flex justify-center items-center gap-8">
              <div className="text-center">
                <p className="text-[10px] font-black uppercase text-muted-foreground">Personal Best</p>
                <p className="text-3xl font-black text-primary">{highScore}</p>
              </div>
              <div className="w-px h-10 bg-primary/10" />
              <div className="text-center">
                <p className="text-[10px] font-black uppercase text-muted-foreground">Time Limit</p>
                <p className="text-3xl font-black text-foreground">60s</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/10 p-6">
          <Button onClick={handleStart} size="lg" className="w-full h-14 text-lg font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
            Start Blitz Session <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-6">
        <Card className="border-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Arcade Mechanics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-muted/30 rounded-xl space-y-2">
              <p className="text-xs font-bold flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-orange-500" /> Combo Multiplier
              </p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Correct answers in rapid succession build your combo. Combos higher than 5x grant massive XP bonuses.
              </p>
            </div>
            <div className="p-3 bg-muted/30 rounded-xl space-y-2">
              <p className="text-xs font-bold flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-blue-500" /> Precision Scoring
              </p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                In Blitz mode, accuracy is your multiplier. One wrong answer breaks your combo and resets momentum.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary">Hall of Records</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(highScores).length > 0 ? (
              Object.entries(highScores).slice(0, 3).map(([ops, hs]) => (
                <div key={ops} className="flex justify-between items-center text-[10px]">
                  <span className="font-bold uppercase opacity-60">[{ops}]</span>
                  <span className="font-black text-primary">{hs} PTS</span>
                </div>
              ))
            ) : (
              <p className="text-[10px] italic text-muted-foreground text-center py-4">No records established.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
