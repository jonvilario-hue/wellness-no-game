'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { GameShell } from '@/components/game/GameShell';
import { VolumeMeter } from '@/components/audio/VolumeMeter';
import { MicPermissionGate } from '@/components/audio/MicPermissionGate';
import { useMicrophone } from '@/hooks/useMicrophone';
import { useVolumeLevel } from '@/hooks/useVolumeLevel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wind, Play, RotateCcw, Clock, CheckCircle2, Activity, ListChecks } from 'lucide-react';
import { cn } from '@/lib/utils';
import { initDB } from '@/lib/storage/db';
import { motion, AnimatePresence } from 'framer-motion';

type SubMode = 'sustained' | 'cycles' | 'staccato';
type GameState = 'idle' | 'mode-select' | 'running' | 'results';

export default function BreathControlPage() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [subMode, setSubMode] = useState<SubMode>('sustained');
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [pb, setPb] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [history, setHistory] = useState<any[]>([]);

  const { stream, requestPermission } = useMicrophone();
  const { volumeDb, volumeNormalized, isSilent } = useVolumeLevel(stream, 3);

  // Load history/PBs
  useEffect(() => {
    async function load() {
      const db = await initDB();
      const logs = await db.getAll('sessions');
      const breathLogs = logs.filter(l => l.gameName === 'voice-breath');
      setHistory(breathLogs);
      
      const pbValue = Math.max(...breathLogs.filter(l => l.subMode === 'sustained').map(l => l.score), 0);
      setPb(pbValue);
    }
    load();
  }, []);

  const handleStart = async (mode: SubMode) => {
    if (!stream) await requestPermission();
    setSubMode(mode);
    setScore(0);
    setTimer(0);
    setCycle(1);
    setGameState('running');
  };

  // Sustained Mode Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'running' && subMode === 'sustained') {
      if (volumeDb > -35) {
        interval = setInterval(() => setTimer(t => t + 0.1), 100);
      } else if (timer > 0) {
        // Drop threshold logic
        const timeout = setTimeout(() => {
          if (volumeDb < -35) finishGame();
        }, 500);
        return () => clearTimeout(timeout);
      }
    }
    return () => clearInterval(interval);
  }, [gameState, subMode, volumeDb, timer]);

  // Cycles Mode Logic
  useEffect(() => {
    if (gameState === 'running' && subMode === 'cycles') {
      const runCycle = async () => {
        setPhase('inhale'); await new Promise(r => setTimeout(r, 4000));
        setPhase('hold'); await new Promise(r => setTimeout(r, 2000));
        setPhase('exhale'); await new Promise(r => setTimeout(r, 6000));
        setPhase('rest'); await new Promise(r => setTimeout(r, 2000));
        
        if (cycle < 5) {
          setCycle(c => c + 1);
        } else {
          finishGame();
        }
      };
      runCycle();
    }
  }, [gameState, subMode, cycle]);

  const finishGame = async () => {
    const finalScore = Math.round(timer * 10);
    setScore(finalScore);
    setGameState('results');

    const db = await initDB();
    await db.add('sessions', {
      gameName: 'voice-breath',
      subMode,
      date: new Date().toISOString(),
      score: finalScore,
      duration: timer,
      difficulty: 'Beginner',
      roundDetails: []
    });
  };

  return (
    <GameShell
      gameName="Breath Control"
      description="Train your physical engine for sustained, reliable vocal output."
      instructions={[
        "Choose a protocol: Sustained Tone, Breath Cycles, or Staccato Bursts.",
        "Ensure your environment is quiet for accurate detection.",
        "Power your voice from the diaphragm (belly), not the throat.",
        "Try to beat your personal best for sustained duration."
      ]}
      gameState={gameState === 'results' ? 'complete' : gameState === 'idle' ? 'idle' : 'playing'}
      currentRound={cycle}
      totalRounds={subMode === 'cycles' ? 5 : 1}
      score={score || Math.round(timer * 10)}
      onStart={() => setGameState('mode-select')}
      onPauseToggle={() => {}}
      backHref="/music/voice"
      breadcrumb={["Music", "Voice", "Breath Control"]}
    >
      <MicPermissionGate>
        <div className="w-full flex flex-col items-center gap-8">
          {gameState === 'mode-select' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {[
                { id: 'sustained', name: 'Sustained Tone', desc: 'Hold a note as long as possible.' },
                { id: 'cycles', name: 'Breath Cycles', desc: 'Timed inhale/hold/exhale loops.' },
                { id: 'staccato', name: 'Staccato Bursts', desc: 'Quick on-beat rhythmic pulses.' }
              ].map(m => (
                <Button key={m.id} variant="outline" className="h-32 flex flex-col gap-2 border-2" onClick={() => handleStart(m.id as SubMode)}>
                  <span className="font-bold">{m.name}</span>
                  <span className="text-[10px] opacity-60 text-center">{m.desc}</span>
                </Button>
              ))}
            </div>
          )}

          {gameState === 'running' && subMode === 'sustained' && (
            <div className="text-center space-y-12 animate-in fade-in">
              <div className="space-y-2">
                <Badge variant="secondary" className="uppercase font-black tracking-widest text-[10px]">Sustaining...</Badge>
                <h3 className="text-8xl font-black tabular-nums">{timer.toFixed(1)}s</h3>
                <p className="text-sm font-bold text-muted-foreground">PB: {(pb/10).toFixed(1)}s</p>
              </div>
              <div className="flex items-center justify-center gap-8">
                <VolumeMeter volumeNormalized={volumeNormalized} />
                <div className="text-left space-y-4">
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <p className="text-[10px] font-bold uppercase opacity-60">Status</p>
                    <p className="font-bold">{volumeDb > -35 ? 'ACTIVE' : 'AWAITING TONE'}</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <p className="text-[10px] font-bold uppercase opacity-60">Threshold</p>
                    <p className="font-bold">-35dB</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {gameState === 'running' && subMode === 'cycles' && (
            <div className="flex flex-col items-center gap-12 w-full max-w-md">
              <div className="text-center space-y-2">
                <Badge className="bg-primary text-white uppercase text-xs font-black">Cycle {cycle} / 5</Badge>
                <h3 className="text-4xl font-black uppercase tracking-tight text-primary">{phase}</h3>
              </div>

              <div className="relative w-64 h-64 flex items-center justify-center">
                <motion.div 
                  animate={{ 
                    scale: phase === 'inhale' ? 1.5 : phase === 'exhale' ? 0.8 : 1,
                    opacity: phase === 'rest' ? 0.3 : 1
                  }}
                  transition={{ duration: phase === 'inhale' ? 4 : phase === 'exhale' ? 6 : 2 }}
                  className="w-32 h-32 rounded-full bg-primary/20 border-4 border-primary shadow-[0_0_40px_rgba(var(--primary),0.3)]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Wind className="w-8 h-8 text-primary" />
                </div>
              </div>

              <VolumeMeter volumeNormalized={volumeNormalized} orientation="horizontal" className="h-8" />
            </div>
          )}
        </div>
      </MicPermissionGate>
    </GameShell>
  );
}
