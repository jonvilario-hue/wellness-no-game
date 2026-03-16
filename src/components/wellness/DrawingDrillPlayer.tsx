
'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  X, Play, Pause, RotateCcw, Clock, 
  Target, Zap, Sparkles, CheckCircle2,
  ChevronRight, ArrowRight, Eye, Info,
  Camera, SlidersHorizontal, Star
} from 'lucide-react';
import { useDrawingStore } from '@/hooks/use-drawing-store';
import { useCalendarPlansStore } from '@/hooks/use-calendar-plans-store';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { DrawingDrill, DrawingDifficulty, DrawingMedium } from '@/types/drawing';
import Image from 'next/image';
import placeholderData from '@/app/lib/placeholder-images.json';

interface Props {
  drill: DrawingDrill;
  onClose: () => void;
}

export function DrawingDrillPlayer({ drill, onClose }: Props) {
  const [gameState, setGameState] = useState<'prep' | 'active' | 'survey' | 'summary'>('prep');
  const [difficulty, setDifficulty] = useState<DrawingDifficulty>('Developing');
  const [timeLeft, setTimeLeft] = useState(drill.defaultTimerSeconds || 0);
  const [isActive, setIsActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(0);
  
  // Survey State
  const [satisfaction, setSatisfaction] = useState(3);
  const [focusRating, setFocusRating] = useState(3);
  const [difficultyFelt, setDifficultyFelt] = useState<'Too Easy' | 'Just Right' | 'Too Hard'>('Just Right');
  const [medium, setMedium] = useState<DrawingMedium>('Pencil');

  const { addLog } = useDrawingStore();
  const { syncFromTracker } = useCalendarPlansStore();
  const { toast } = useToast();

  const referenceImage = useMemo(() => {
    const cat = drill.referenceCategory.toLowerCase().replace(' ', '_') as keyof typeof placeholderData.drawing_references;
    const pool = (placeholderData.drawing_references as any)[cat] || placeholderData.drawing_references.abstract;
    return pool[Math.floor(Math.random() * pool.length)];
  }, [drill]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (isActive && timeLeft === 0 && drill.defaultTimerSeconds) {
      handleFinish();
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, drill.defaultTimerSeconds]);

  const handleStart = () => {
    setGameState('active');
    setIsActive(true);
    setSessionStartTime(Date.now());
  };

  const handleFinish = () => {
    setIsActive(false);
    setGameState('survey');
  };

  const handleSaveAndExit = () => {
    const duration = Math.ceil((Date.now() - sessionStartTime) / 60000) || 1;
    
    addLog({
      discipline: drill.discipline,
      drillName: drill.name,
      difficulty,
      durationMinutes: duration,
      satisfactionRating: satisfaction,
      focusRating,
      difficultyFelt,
      medium
    });

    syncFromTracker('Custom', `Drawing: ${drill.name}`);
    toast({ title: "Session Synchronized", variant: 'success' });
    onClose();
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-full max-h-[90vh] bg-background border rounded-[2rem] shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        <header className="p-6 border-b bg-card shrink-0 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full"><X className="w-5 h-5" /></Button>
            <div>
              <h1 className="text-lg font-bold uppercase tracking-tight">{drill.name}</h1>
              <p className="text-[10px] text-muted-foreground font-bold uppercase">{drill.discipline}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {drill.defaultTimerSeconds && gameState === 'active' && (
              <div className="flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary">
                <Clock className="w-4 h-4" />
                <span className="font-mono text-lg font-black">{formatTime(timeLeft)}</span>
              </div>
            )}
            <Badge variant="outline" className="h-6 border-primary/20 text-primary uppercase font-black text-[10px] px-3">
              {difficulty}
            </Badge>
          </div>
        </header>

        <main className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            {gameState === 'prep' && (
              <motion.div key="prep" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex-1 flex items-center justify-center p-8">
                <Card className="max-w-md w-full border-primary/10 shadow-xl overflow-hidden">
                  <CardHeader className="text-center pb-6 bg-primary/5">
                    <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-2">
                      <Target className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-black uppercase tracking-tight">The Brief</CardTitle>
                    <CardDescription className="text-xs">Objective: {drill.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                        <Info className="w-3.5 h-3.5" /> Instructions
                      </h4>
                      <ol className="space-y-3">
                        {drill.brief.map((step, i) => (
                          <li key={i} className="flex gap-3 text-xs leading-relaxed">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">{i + 1}</span>
                            <p className="flex-1 pt-0.5">{step}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="pt-4 border-t space-y-4">
                      <Label className="text-[9px] font-bold uppercase tracking-widest">Select Starting Tier</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Foundation', 'Developing', 'Advanced'] as DrawingDifficulty[]).map(d => (
                          <Button key={d} variant={difficulty === d ? 'default' : 'outline'} size="sm" className="text-[8px] h-8 uppercase font-bold" onClick={() => setDifficulty(d)}>
                            {d}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full h-12 font-black uppercase shadow-lg gap-2" onClick={handleStart}>
                      <Play className="w-4 h-4 fill-current" /> Initialize Drill
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {gameState === 'active' && (
              <motion.div key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col md:flex-row min-h-0">
                <div className="flex-1 relative bg-black flex items-center justify-center p-4">
                  <Image 
                    src={referenceImage.url} 
                    alt="Reference" 
                    fill 
                    className="object-contain" 
                    data-ai-hint={referenceImage.hint}
                  />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-black/60 backdrop-blur-md text-white border-none uppercase text-[8px] font-black tracking-widest px-3">
                      Reference: {drill.referenceCategory}
                    </Badge>
                  </div>
                </div>
                <div className="w-full md:w-80 border-l bg-card p-6 flex flex-col gap-6">
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Protocol Active</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed italic">"Focus on the connection between your eyes and hand. Speed and accuracy are secondary to the quality of observation."</p>
                  </div>
                  
                  <div className="flex-grow" />
                  
                  <div className="space-y-2">
                    <Button className="w-full h-14 text-lg font-black uppercase shadow-lg" onClick={handleFinish}>
                      Finalize Study <CheckCircle2 className="ml-2 w-5 h-5" />
                    </Button>
                    <p className="text-[9px] text-center text-muted-foreground uppercase font-bold">Press ESC to cancel at any time</p>
                  </div>
                </div>
              </motion.div>
            )}

            {gameState === 'survey' && (
              <motion.div key="survey" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex items-center justify-center p-8">
                <Card className="max-w-md w-full border-primary/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-primary/5 text-center py-6">
                    <CardTitle className="text-xl font-black uppercase tracking-tight">Perceptual Audit</CardTitle>
                    <CardDescription>Metrics feed the adaptive strategy engine.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-[10px] font-bold uppercase tracking-widest">Satisfaction (1-5)</Label>
                        <span className="text-lg font-black text-primary">{satisfaction}</span>
                      </div>
                      <Slider value={[satisfaction]} onValueChange={([v]) => setSatisfaction(v)} min={1} max={5} step={1} />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-[10px] font-bold uppercase tracking-widest">Focus Intensity (1-5)</Label>
                        <span className="text-lg font-black text-primary">{focusLevel}</span>
                      </div>
                      <Slider value={[focusLevel]} onValueChange={([v]) => setFocusLevel(v)} min={1} max={5} step={1} />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest">Difficulty Felt</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Too Easy', 'Just Right', 'Too Hard'].map(lvl => (
                          <Button key={lvl} variant={difficultyFelt === lvl ? 'default' : 'outline'} size="sm" className="text-[8px] h-8 uppercase font-bold" onClick={() => setDifficultyFelt(lvl as any)}>
                            {lvl}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest">Medium Used</Label>
                      <Select value={medium} onValueChange={(v: DrawingMedium) => setMedium(v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {['Pencil', 'Pen', 'Charcoal', 'Digital', 'Other'].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/10">
                    <Button className="w-full h-12 font-black uppercase shadow-lg" onClick={handleSaveAndExit}>
                      Sync Session <ArrowRight className="ml-2 w-4 h-4" />
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
