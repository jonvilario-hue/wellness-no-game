
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  X, Check, ArrowRight, Lightbulb, 
  RotateCcw, Info, Sparkles, Brain, 
  Target, ShieldCheck, HeartPulse, Zap
} from 'lucide-react';
import { useFirebase } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { MathDomain } from './MathComposureLab';

interface Props {
  domain: MathDomain;
  mode: 'Slow Work' | 'Steady Rhythm' | 'Real Life';
  onClose: () => void;
}

const HABITS = [
  "Metacognitive Check",
  "Ballpark Estimation",
  "Pattern Recognition",
  "Rigorous Logic",
  "Flexible Strategy",
  "Managing Frustration"
];

// Simple procedural problem generator for the demo
const getProblem = (domainId: string, isApplied: boolean) => {
  if (isApplied) {
    const scenarios = [
      { q: "A $84.50 restaurant bill with an 18% tip. What is the approximate total?", a: "100", hint: "Rounding 84.5 to 85, then 10% is 8.5, 20% is 17. 18% is a bit less than 17. 85 + 15 = 100." },
      { q: "A 35% discount on a $120 item. What is the approximate new price?", a: "78", hint: "10% is 12. 30% is 36. 5% is 6. 35% is 42. 120 - 42 = 78." },
      { q: "If a recipe calls for 3/4 cup of sugar for 4 servings, how much for 6?", a: "1.125", hint: "6 is 1.5 times 4. 0.75 * 1.5 = 1.125." }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  }
  
  const a = Math.floor(Math.random() * 50) + 10;
  const b = Math.floor(Math.random() * 20) + 5;
  
  switch(domainId) {
    case 'sense': return { q: `Estimate: ${a} × ${b}`, a: (a*b).toString(), hint: "Round to nearest 10s and multiply." };
    case 'ratio': return { q: `What is ${b}% of ${a * 10}?`, a: (a * 10 * (b/100)).toString(), hint: "Move the decimal for 10% then multiply." };
    case 'prob': return { q: "Odds of flipping 3 heads in a row?", a: "0.125", hint: "0.5 * 0.5 * 0.5 = 0.125" };
    case 'logic': return { q: "All A are B. All B are C. Are all A necessarily C?", a: "Yes", hint: "This is a transitive syllogism." };
    default: return { q: `${a} + ${b} - ${Math.floor(a/2)}`, a: (a+b-Math.floor(a/2)).toString(), hint: "Solve step by step." };
  }
};

export function MathSessionPlayer({ domain, mode, onClose }: Props) {
  const { user, firestore } = useFirebase();
  const [gameState, setGameState] = useState<'reading' | 'reflection'>('reading');
  const [currentProblem, setCurrentProblem] = useState(() => getProblem(domain.id, mode === 'Real Life'));
  const [userInput, setUserAnswer] = useState('');
  const [showSolution, setShowSolution] = useState(mode === 'Slow Work');
  const [problemsDone, setProblemsDone] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // Reflection fields
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  const [feeling, setFeeling] = useState<'Grounded' | 'Shaky' | null>(null);

  useEffect(() => {
    if (mode === 'Steady Rhythm' && gameState === 'reading') {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setGameState('reflection');
            return 100;
          }
          return p + (100 / (8 * 60)); // 8 minutes to fill
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [mode, gameState]);

  const handleNext = () => {
    setProblemsDone(p => p + 1);
    setCurrentProblem(getProblem(domain.id, mode === 'Real Life'));
    setUserAnswer('');
    setShowSolution(mode === 'Slow Work');
  };

  const handleFinish = async () => {
    if (!user || !feeling) return;
    
    await addDoc(collection(firestore, 'users', user.uid, 'math-sessions'), {
      userId: user.uid,
      domainId: domain.id,
      mode,
      timestamp: new Date().toISOString(),
      problemsAttempted: problemsDone,
      habitsOfMind: selectedHabits,
      feeling,
      isApplied: mode === 'Real Life'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {gameState === 'reading' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl w-full space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5" /></Button>
                <div>
                  <h2 className="text-sm font-black uppercase tracking-widest">{domain.name}</h2>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">{mode}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="font-bold border-primary/20 h-8" onClick={() => setGameState('reflection')}>Finish Session</Button>
            </div>

            {mode === 'Steady Rhythm' && (
              <div className="space-y-1">
                <Progress value={progress} className="h-1 bg-primary/10" />
                <p className="text-[8px] font-black uppercase text-center opacity-40">Steady Pace Protocol: 8 Minutes</p>
              </div>
            )}

            <Card className="border-primary/20 shadow-2xl bg-card">
              <CardContent className="p-12 space-y-8 text-center">
                <p className="text-3xl font-bold leading-relaxed">{currentProblem.q}</p>
                <div className="flex flex-col items-center gap-4">
                  <input 
                    className="bg-transparent border-b-2 border-primary/20 text-4xl text-center font-mono focus:outline-none focus:border-primary w-40 transition-all"
                    value={userInput}
                    onChange={e => setUserAnswer(e.target.value)}
                    placeholder="?"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setShowSolution(!showSolution)} className="text-[10px] font-black uppercase text-primary/60">
                      {showSolution ? 'Hide Walkthrough' : 'View Walkthrough'}
                    </Button>
                  </div>
                </div>

                <AnimatePresence>
                  {showSolution && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pt-6 border-t border-primary/10 overflow-hidden">
                      <div className="p-4 bg-primary/5 rounded-xl text-left flex gap-3">
                        <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground leading-relaxed italic">"{currentProblem.hint}"</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
              <CardFooter className="bg-muted/10 p-4 justify-center">
                <Button onClick={handleNext} className="w-full h-14 text-lg font-black shadow-lg">
                  Next Scenario <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full">
            <Card className="border-primary/20 shadow-2xl">
              <CardHeader className="text-center">
                <div className="p-4 bg-emerald-500/10 rounded-full w-fit mx-auto mb-2">
                  <ShieldCheck className="w-10 h-10 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl font-black uppercase">Session Summary</CardTitle>
                <CardDescription>Reflect on your composure before logging.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-widest">Habits of Mind Present</Label>
                  <div className="flex flex-wrap gap-2">
                    {HABITS.map(h => (
                      <button
                        key={h}
                        onClick={() => setSelectedHabits(prev => prev.includes(h) ? prev.filter(i => i !== h) : [...prev, h])}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-[10px] font-bold uppercase border transition-all",
                          selectedHabits.includes(h) ? "bg-primary text-primary-foreground border-primary" : "border-primary/10 text-muted-foreground hover:bg-primary/5"
                        )}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-widest">Post-Session State</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant={feeling === 'Grounded' ? 'default' : 'outline'}
                      className="h-12 uppercase font-black text-xs"
                      onClick={() => setFeeling('Grounded')}
                    >
                      Grounded
                    </Button>
                    <Button 
                      variant={feeling === 'Shaky' ? 'default' : 'outline'}
                      className="h-12 uppercase font-black text-xs"
                      onClick={() => setFeeling('Shaky')}
                    >
                      Shaky
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full h-14 text-lg font-black shadow-lg" disabled={!feeling} onClick={handleFinish}>
                  Sync to Firestore <Check className="ml-2 w-5 h-5" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
