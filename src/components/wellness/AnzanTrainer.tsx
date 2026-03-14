
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Zap, Play, Eye, RotateCcw, 
  CheckCircle2, XCircle, Trophy, 
  Sparkles, Timer, ArrowRight, Activity
} from 'lucide-react';
import { useAnzanStore } from '@/hooks/use-anzan-store';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function AnzanTrainer() {
  const { settings, updateSettings, addSession, history, personalBests } = useAnzanStore();
  
  const [gameState, setGameState] = useState<'idle' | 'countdown' | 'flashing' | 'input' | 'results'>('idle');
  const [countdown, setCountdown] = useState(3);
  const [sequence, setSequence] = useState<number[]>([]);
  const [displayIndex, setDisplayIndex] = useState(-1);
  const [userAnswer, setUserAnswer] = useState('');
  const [correctSum, setCorrectSum] = useState(0);
  const [lastResult, setLastResult] = useState<boolean | null>(null);

  const startDrill = () => {
    const min = Math.pow(10, settings.digits - 1);
    const max = Math.pow(10, settings.digits) - 1;
    const newSeq = Array.from({ length: settings.count }, () => 
      Math.floor(Math.random() * (max - min + 1)) + min
    );
    const sum = newSeq.reduce((a, b) => a + b, 0);
    
    setSequence(newSeq);
    setCorrectSum(sum);
    setGameState('countdown');
    setCountdown(3);
    setDisplayIndex(-1);
    setUserAnswer('');
  };

  // Countdown effect
  useEffect(() => {
    if (gameState === 'countdown') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setGameState('flashing');
        setDisplayIndex(0);
      }
    }
  }, [gameState, countdown]);

  // Flashing effect
  useEffect(() => {
    if (gameState === 'flashing' && displayIndex >= 0) {
      const timer = setTimeout(() => {
        if (displayIndex < sequence.length - 1) {
          setDisplayIndex(displayIndex + 1);
        } else {
          setGameState('input');
        }
      }, settings.speed * 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState, displayIndex, sequence.length, settings.speed]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const isCorrect = parseInt(userAnswer) === correctSum;
    setLastResult(isCorrect);
    setGameState('results');
    
    addSession({
      digits: settings.digits,
      count: settings.count,
      speed: settings.speed,
      success: isCorrect
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      <Card className="lg:col-span-2 border-primary/10 overflow-hidden flex flex-col min-h-[500px]">
        <CardHeader className="bg-primary/5 border-b border-primary/5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><Eye className="w-5 h-5" /></div>
              <div>
                <CardTitle className="text-xl">Anzan: Visual Flash Sum</CardTitle>
                <CardDescription>Train your mind to sum numbers faster than you can say them.</CardDescription>
              </div>
            </div>
            {gameState !== 'idle' && (
              <Button variant="ghost" size="sm" onClick={() => setGameState('idle')} className="text-muted-foreground">
                <XCircle className="w-4 h-4 mr-2" /> Cancel
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-grow flex flex-col items-center justify-center p-12 relative">
          <AnimatePresence mode="wait">
            {gameState === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="text-center space-y-6"
              >
                <div className="p-6 bg-primary/5 rounded-full w-fit mx-auto">
                  <Zap className="w-16 h-16 text-primary animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-tight">Ready to Flash?</h3>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto">Configure your parameters on the right and initialize the sequence.</p>
                </div>
                <Button size="lg" className="h-14 px-12 text-lg font-black shadow-xl" onClick={startDrill}>
                  Initialize Sequence <Play className="ml-2 w-5 h-5 fill-current" />
                </Button>
              </motion.div>
            )}

            {gameState === 'countdown' && (
              <motion.div 
                key="countdown"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                className="text-9xl font-black text-primary"
              >
                {countdown}
              </motion.div>
            )}

            {gameState === 'flashing' && (
              <motion.div 
                key={`flash-${displayIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.1 }}
                className="text-9xl md:text-[12rem] font-black tracking-tighter tabular-nums"
              >
                {sequence[displayIndex]}
              </motion.div>
            )}

            {gameState === 'input' && (
              <motion.div 
                key="input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm space-y-6 text-center"
              >
                <div className="space-y-2">
                  <Badge variant="outline" className="uppercase font-black text-[10px] tracking-widest text-primary border-primary/20">Input Required</Badge>
                  <h3 className="text-2xl font-bold">What was the sum?</h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input 
                    type="number"
                    value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    className="h-24 text-6xl text-center font-black bg-muted/30 border-none focus-visible:ring-offset-0 focus-visible:ring-primary/40 rounded-3xl"
                    autoFocus
                    placeholder="???"
                  />
                  <Button type="submit" size="lg" className="w-full h-12 font-bold uppercase tracking-widest">Verify Calculation</Button>
                </form>
              </motion.div>
            )}

            {gameState === 'results' && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
              >
                <div className={cn(
                  "p-6 rounded-full w-fit mx-auto",
                  lastResult ? "bg-emerald-500/10 text-emerald-600" : "bg-destructive/10 text-destructive"
                )}>
                  {lastResult ? <CheckCircle2 className="w-20 h-20" /> : <XCircle className="w-20 h-20" />}
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-black uppercase tracking-tight">{lastResult ? 'Perfect!' : 'Not Quite'}</h3>
                  <p className="text-lg text-muted-foreground">
                    {lastResult ? `You correctly summed ${sequence.length} numbers.` : `The correct sum was ${correctSum}.`}
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" size="lg" onClick={() => setGameState('idle')} className="font-bold">Close</Button>
                  <Button size="lg" onClick={startDrill} className="font-bold px-8">Next Drill <ArrowRight className="ml-2 w-4 h-4" /></Button>
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
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-[10px] font-black uppercase text-muted-foreground">Number Length</Label>
                <span className="text-xs font-bold text-primary">{settings.digits} Digits</span>
              </div>
              <Slider 
                value={[settings.digits]} 
                min={1} 
                max={5} 
                step={1} 
                onValueChange={([v]) => updateSettings({ digits: v })}
                disabled={gameState !== 'idle'}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-[10px] font-black uppercase text-muted-foreground">Sequence Items</Label>
                <span className="text-xs font-bold text-primary">{settings.count} Numbers</span>
              </div>
              <Slider 
                value={[settings.count]} 
                min={3} 
                max={20} 
                step={1} 
                onValueChange={([v]) => updateSettings({ count: v })}
                disabled={gameState !== 'idle'}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-[10px] font-black uppercase text-muted-foreground">Display Speed</Label>
                <span className="text-xs font-bold text-primary">{settings.speed}s</span>
              </div>
              <Slider 
                value={[settings.speed]} 
                min={0.1} 
                max={2.0} 
                step={0.1} 
                onValueChange={([v]) => updateSettings({ speed: v })}
                disabled={gameState !== 'idle'}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/10 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5" /> Achievement Vault
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-background rounded-xl border border-primary/5 text-center">
                <p className="text-[8px] font-black uppercase text-muted-foreground">Max Digits</p>
                <p className="text-xl font-black">{personalBests.maxDigits}</p>
              </div>
              <div className="p-3 bg-background rounded-xl border border-primary/5 text-center">
                <p className="text-[8px] font-black uppercase text-muted-foreground">Min Speed</p>
                <p className="text-xl font-black">{personalBests.minSpeed}s</p>
              </div>
            </div>
            
            <div className="p-3 bg-background rounded-xl border border-primary/5 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><Sparkles className="w-4 h-4 text-primary" /></div>
              <div>
                <p className="text-[9px] font-black uppercase text-muted-foreground">Global Rank</p>
                <p className="text-xs font-bold">{settings.speed <= 0.5 ? 'Lightning Master' : 'Solid Practitioner'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="p-4 bg-muted/30 rounded-2xl border border-dashed flex items-start gap-3">
          <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p className="text-[10px] text-muted-foreground leading-relaxed italic">
            "Anzan training suppresses subvocalization by flashing numbers faster than your internal voice can speak them, forcing holistic processing."
          </p>
        </div>
      </div>
    </div>
  );
}

import { Settings2 } from 'lucide-react';
import { LayoutGrid } from 'lucide-react';
