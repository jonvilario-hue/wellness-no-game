
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { GameShell } from '@/components/game/GameShell';
import { VolumeMeter } from '@/components/audio/VolumeMeter';
import { MicPermissionGate } from '@/components/audio/MicPermissionGate';
import { useMicrophone } from '@/hooks/useMicrophone';
import { useVolumeLevel } from '@/hooks/useVolumeLevel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SlidersHorizontal, Play, CheckCircle2, XCircle, ArrowRight, Zap, Clock, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { initDB } from '@/lib/storage/db';
import { motion, AnimatePresence } from 'framer-motion';

type RoundType = 'match' | 'gradient' | 'jump';
type GameState = 'idle' | 'prep' | 'running' | 'results';

const dynamicMarkings: Record<string, { range: [number, number], label: string }> = {
  pp: { range: [0.1, 0.25], label: 'Pianissimo' },
  p: { range: [0.2, 0.4], label: 'Piano' },
  mp: { range: [0.35, 0.55], label: 'Mezzo-Piano' },
  mf: { range: [0.5, 0.7], label: 'Mezzo-Forte' },
  f: { range: [0.65, 0.85], label: 'Forte' },
  ff: { range: [0.8, 1.0], label: 'Fortissimo' }
};

export default function DynamicsPage() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [round, setRound] = useState(1);
  const [roundType, setRoundType] = useState<RoundType>('match');
  const [targetKey, setTargetKey] = useState('mf');
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(5);
  const [inZoneTime, setInZoneTime] = useState(0);
  const [lastResult, setLastResult] = useState<boolean | null>(null);

  const { stream, requestPermission } = useMicrophone();
  const { volumeNormalized } = useVolumeLevel(stream, 3);

  const generateRound = useCallback(() => {
    const keys = Object.keys(dynamicMarkings);
    const type: RoundType = Math.random() > 0.7 ? 'jump' : 'match'; 
    const target = keys[Math.floor(Math.random() * keys.length)];
    
    setRoundType(type);
    setTargetKey(target);
    setTimer(5);
    setInZoneTime(0);
    setLastResult(null);
  }, []);

  const handleStart = async () => {
    if (!stream) await requestPermission();
    setRound(1);
    setScore(0);
    generateRound();
    setGameState('running');
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'running' && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => parseFloat((t - 0.1).toFixed(1)));
        
        const zone = dynamicMarkings[targetKey].range;
        if (volumeNormalized >= zone[0] && volumeNormalized <= zone[1]) {
          setInZoneTime(prev => prev + 0.1);
        }
      }, 100);
    } else if (timer <= 0 && gameState === 'running') {
      handleRoundEnd();
    }
    return () => clearInterval(interval);
  }, [gameState, timer, targetKey, volumeNormalized]);

  const handleRoundEnd = () => {
    const success = inZoneTime >= 3; // Must stay in zone for at least 3s of the 5s
    setLastResult(success);
    if (success) setScore(s => s + 100);
    
    setTimeout(() => {
      if (round < 8) {
        setRound(r => r + 1);
        generateRound();
      } else {
        setGameState('results');
      }
    }, 2000);
  };

  return (
    <GameShell
      gameName="Dynamic Control"
      description="Master the full spectrum of vocal volume from a whisper to a roar."
      instructions={[
        "Follow the dynamic markings: pp (very soft) to ff (very loud).",
        "Maintain your volume within the highlighted target zone.",
        "Avoid vocal strain when practicing louder dynamics.",
        "Focus on steady support for softer dynamics."
      ]}
      gameState={gameState === 'results' ? 'complete' : gameState === 'idle' ? 'idle' : 'playing'}
      currentRound={round}
      totalRounds={8}
      score={score}
      onStart={handleStart}
      onPauseToggle={() => {}}
      backHref="/music/voice"
      breadcrumb={["Music", "Voice", "Dynamics"]}
    >
      <MicPermissionGate>
        <div className="w-full flex flex-col items-center gap-12">
          {gameState === 'running' && (
            <div className="w-full flex flex-col items-center gap-12 animate-in fade-in">
              <div className="flex justify-between w-full max-w-md">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-2xl">
                    <span className="text-3xl font-black text-primary italic">{targetKey}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-muted-foreground">Target</p>
                    <p className="text-lg font-bold">{dynamicMarkings[targetKey].label}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-primary">
                    <Clock className="w-4 h-4 animate-pulse" />
                    <span className="text-3xl font-black font-mono">{timer.toFixed(0)}s</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-12 w-full max-w-lg">
                <VolumeMeter 
                  volumeNormalized={volumeNormalized} 
                  targetZone={{ 
                    min: dynamicMarkings[targetKey].range[0], 
                    max: dynamicMarkings[targetKey].range[1] 
                  }} 
                  className="h-80 w-12"
                />
                
                <div className="flex-1 space-y-8">
                  <div className={cn(
                    "p-8 rounded-3xl border-4 transition-all duration-300 text-center",
                    lastResult === true ? "bg-emerald-500/10 border-emerald-500 scale-110" :
                    lastResult === false ? "bg-destructive/10 border-destructive" :
                    "bg-muted/30 border-primary/5"
                  )}>
                    {lastResult === true ? <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" /> :
                     lastResult === false ? <XCircle className="w-16 h-16 text-destructive mx-auto" /> :
                     <div className="py-4">
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Stability</div>
                        <Progress value={(inZoneTime / 3) * 100} className="h-3" />
                     </div>
                    }
                  </div>
                  
                  <p className="text-sm font-medium text-center text-muted-foreground leading-relaxed">
                    {roundType === 'match' ? "Steady your voice within the target zone." : "React quickly to the change!"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </MicPermissionGate>
    </GameShell>
  );
}
