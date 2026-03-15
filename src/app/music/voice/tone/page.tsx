
'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { GameShell } from '@/components/game/GameShell';
import { BrightnessDisplay } from '@/components/audio/BrightnessDisplay';
import { MicPermissionGate } from '@/components/audio/MicPermissionGate';
import { useMicrophone } from '@/hooks/useMicrophone';
import { useSpectralAnalysis } from '@/hooks/useSpectralAnalysis';
import { useRealtimePitch } from '@/hooks/useRealtimePitch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette, Play, CheckCircle2, Lightbulb, Clock, Info, ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { initDB } from '@/lib/storage/db';
import { motion, AnimatePresence } from 'framer-motion';

type GameState = 'idle' | 'prep' | 'running' | 'results';

const instructions = [
  { id: 'bright', title: 'BRIGHT and forward', target: 0.7, hint: "Smile slightly, think 'ee' vowel, and feel the resonance in your mask/nose." },
  { id: 'warm', title: 'WARM and round', target: 0.3, hint: "Round your lips like an 'oh', relax your jaw, and think of your voice as dark honey." },
  { id: 'neutral', title: 'NEUTRAL and balanced', target: 0.5, hint: "A natural, comfortable speaking tone without excessive brightness or warmth." }
];

export default function ToneShapingPage() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [round, setRound] = useState(1);
  const [activeTask, setActiveTask] = useState(instructions[0]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(6);
  const [inZoneTime, setInZoneTime] = useState(0);
  const [isShowingHint, setIsShowingHint] = useState(true);

  const { stream, requestPermission } = useMicrophone();
  const { brightness } = useSpectralAnalysis(stream);
  const { isDetecting } = useRealtimePitch(stream, 0.7);

  // Use refs for stable access in the timer interval to prevent hook dependencies from resetting the interval
  const brightnessRef = useRef(brightness);
  const isDetectingRef = useRef(isDetecting);
  const targetRef = useRef(activeTask.target);

  useEffect(() => { brightnessRef.current = brightness; }, [brightness]);
  useEffect(() => { isDetectingRef.current = isDetecting; }, [isDetecting]);
  useEffect(() => { targetRef.current = activeTask.target; }, [activeTask.target]);

  const generateRound = useCallback(() => {
    const next = instructions[Math.floor(Math.random() * instructions.length)];
    setActiveTask(next);
    setTimer(6);
    setInZoneTime(0);
    setIsShowingHint(true);
  }, []);

  const handleStart = async () => {
    if (!stream) await requestPermission();
    setRound(1);
    setScore(0);
    generateRound();
    setGameState('running');
  };

  // Stable Game Logic Effect - Interval is not cleared when audio updates
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'running' && !isShowingHint && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => {
          const next = parseFloat((t - 0.1).toFixed(1));
          return next <= 0 ? 0 : next;
        });
        
        if (isDetectingRef.current) {
          const diff = Math.abs(brightnessRef.current - targetRef.current);
          if (diff <= 0.15) {
            setInZoneTime(prev => prev + 0.1);
          }
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [gameState, isShowingHint]);

  // Round completion watcher
  useEffect(() => {
    if (gameState === 'running' && timer <= 0) {
      handleRoundEnd();
    }
  }, [timer, gameState]);

  const handleRoundEnd = async () => {
    const points = Math.round((inZoneTime / 6) * 100);
    const newScore = score + points;
    setScore(newScore);
    
    if (round < 6) {
      setTimeout(() => {
        setRound(r => r + 1);
        generateRound();
      }, 2000);
    } else {
      setGameState('results');
      try {
        const db = await initDB();
        await db.add('sessions', {
          gameName: 'voice-tone',
          date: new Date().toISOString(),
          score: newScore,
          difficulty: 'Advanced'
        });
      } catch (e) {}
    }
  };

  return (
    <GameShell
      gameName="Tone Shaping"
      description="Modify your vocal tract shape to control your timbre and color."
      instructions={[
        "Observe the tone target (Bright, Warm, or Neutral).",
        "Read the anatomical hint to adjust your vowel shape.",
        "Maintain the target color consistently for 6 seconds.",
        "The meter shows real-time 'Brightness' (Spectral Centroid)."
      ]}
      gameState={gameState === 'results' ? 'complete' : gameState === 'idle' ? 'idle' : 'playing'}
      currentRound={round}
      totalRounds={6}
      score={score}
      onStart={handleStart}
      onPauseToggle={() => {}}
      backHref="/skills?tab=music&sub=voice"
      breadcrumb={["Music", "Voice", "Tone Shaping"]}
    >
      <MicPermissionGate>
        <div className="w-full flex flex-col items-center gap-8">
          {gameState === 'running' && (
            <AnimatePresence mode="wait">
              {isShowingHint ? (
                <motion.div key="hint" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="max-w-md text-center space-y-8">
                  <div className="space-y-4">
                    <Badge variant="outline" className="uppercase font-black border-primary/20 text-primary">Protocol Guidance</Badge>
                    <h3 className="text-4xl font-black uppercase tracking-tight">Sing {activeTask.title}</h3>
                    <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 flex items-start gap-4 text-left">
                      <Lightbulb className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <p className="text-sm font-medium leading-relaxed">{activeTask.hint}</p>
                    </div>
                  </div>
                  <Button size="lg" className="px-12 h-14 font-black text-lg shadow-xl" onClick={() => setIsShowingHint(false)}>
                    Begin 6s Hold <ArrowRight className="ml-2" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div key="drill" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center gap-12">
                  <div className="w-full flex justify-between items-center max-w-md">
                    <Badge className="bg-primary text-white font-black uppercase py-1 px-3">{activeTask.id}</Badge>
                    <div className="flex items-center gap-2 text-primary">
                      <Clock className="w-4 h-4 animate-pulse" />
                      <span className="text-3xl font-black font-mono">{timer.toFixed(0)}s</span>
                    </div>
                  </div>

                  <BrightnessDisplay brightness={brightness} targetBrightness={activeTask.target} />

                  <div className={cn(
                    "px-8 py-4 rounded-full border-2 transition-all duration-300 font-black text-xs uppercase tracking-widest",
                    isDetecting ? "bg-primary/10 border-primary text-primary scale-110" : "bg-muted border-transparent text-muted-foreground"
                  )}>
                    {isDetecting ? "HOLDING TONE..." : "AWAITING SIGNAL"}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </MicPermissionGate>
    </GameShell>
  );
}
