
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { GameShell } from '@/components/game/GameShell';
import { PitchMeter } from '@/components/audio/PitchMeter';
import { MicPermissionGate } from '@/components/audio/MicPermissionGate';
import { useRealtimePitch } from '@/hooks/useRealtimePitch';
import { useAudioEngine } from '@/hooks/useAudioEngine';
import { useMicrophone } from '@/hooks/useMicrophone';
import { noteToFrequency, getCentsDifference } from '@/lib/audio/pitchUtils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, Play, Activity, Clock, CheckCircle2, ChevronRight, Music } from 'lucide-react';
import { cn } from '@/lib/utils';
import { initDB } from '@/lib/storage/db';

type GameState = 'idle' | 'listening' | 'ready' | 'performing' | 'results_round' | 'complete';

const BPM = 80;
const BEAT_MS = (60 / BPM) * 1000;

export default function MelodyEchoPage() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [round, setRound] = useState(1);
  const [melody, setMelody] = useState<{ note: string; octave: number }[]>([]);
  const [capturedPitches, setCapturedPitches] = useState<{ note: string; cents: number; isCorrect: boolean }[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [beatIndex, setBeatIndex] = useState(-1);

  const { engine, isReady, init: initAudio } = useAudioEngine();
  const { stream, requestPermission } = useMicrophone();
  const pitchData = useRealtimePitch(stream, 0.85);

  const generateMelody = useCallback(() => {
    const scale = ['C', 'D', 'E', 'F', 'G'];
    const len = 4;
    const newMelody = Array.from({ length: len }, () => ({
      note: scale[Math.floor(Math.random() * scale.length)],
      octave: 4
    }));
    setMelody(newMelody);
    setCapturedPitches([]);
    setBeatIndex(-1);
  }, []);

  const handleStart = async () => {
    if (!isReady) await initAudio();
    if (!stream) await requestPermission();
    setTotalScore(0);
    setRound(1);
    setGameState('listening');
    generateMelody();
  };

  const playMelody = useCallback(async () => {
    if (!isReady) return;
    setGameState('listening');
    for (let i = 0; i < melody.length; i++) {
      setBeatIndex(i);
      engine.playNote(`${melody[i].note}${melody[i].octave}`, '4n');
      await new Promise(r => setTimeout(r, BEAT_MS));
    }
    setBeatIndex(-1);
    setGameState('ready');
  }, [isReady, melody, engine]);

  useEffect(() => {
    if (gameState === 'listening' && melody.length > 0 && beatIndex === -1) {
      playMelody();
    }
  }, [gameState, melody, playMelody, beatIndex]);

  const startEcho = async () => {
    setGameState('performing');
    setCapturedPitches([]);
    
    for (let i = 0; i < melody.length; i++) {
      engine.playMetronomeClick();
      setBeatIndex(i);
      
      await new Promise(r => setTimeout(r, BEAT_MS));
      
      const targetFreq = noteToFrequency(melody[i].note, melody[i].octave);
      const currentFreq = pitchData.currentFrequency;
      const cents = getCentsDifference(currentFreq, targetFreq);
      const isCorrect = pitchData.isDetecting && Math.abs(cents) <= 25;
      
      setCapturedPitches(prev => [...prev, {
        note: pitchData.currentNote || '?',
        cents: cents,
        isCorrect
      }]);
    }
    
    setBeatIndex(-1);
    setGameState('results_round');
  };

  const handleNextRound = () => {
    const roundCorrect = capturedPitches.filter(p => p.isCorrect).length;
    setTotalScore(s => s + (roundCorrect * 25));
    
    if (round < 8) {
      setRound(r => r + 1);
      setGameState('listening');
      generateMelody();
    } else {
      finishGame();
    }
  };

  const finishGame = async () => {
    setGameState('complete');
    const db = await initDB();
    await db.add('sessions', {
      gameName: 'melody-echo',
      date: new Date().toISOString(),
      score: totalScore,
      accuracy: 0,
      duration: 0,
      difficulty: 'Beginner',
      roundDetails: [],
      maxStreak: 0
    });
  };

  return (
    <GameShell
      gameName="Melody Echo"
      description="Sing back the melody from memory."
      instructions={[
        "Listen to the 4-note melody played by the lab.",
        "When ready, tap 'Start Echo' and wait for the metronome clicks.",
        "Sing each note on the beat.",
        "Accuracy is tracked per-note based on pitch precision."
      ]}
      gameState={gameState === 'complete' ? 'complete' : gameState === 'idle' ? 'idle' : 'playing'}
      currentRound={round}
      totalRounds={8}
      score={totalScore}
      onStart={handleStart}
      onPauseToggle={() => {}}
      backHref="/music/sing"
      breadcrumb={["Music", "Sing", "Melody Echo"]}
    >
      <MicPermissionGate>
        <div className="w-full flex flex-col items-center space-y-12">
          {gameState === 'listening' && (
            <div className="text-center space-y-8 animate-in fade-in">
              <div className="space-y-2">
                <Badge variant="secondary" className="uppercase font-black tracking-widest text-[10px]">Phase 1</Badge>
                <h3 className="text-4xl font-black">Listen...</h3>
              </div>
              <div className="flex justify-center gap-4">
                {melody.map((_, i) => (
                  <div key={i} className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all border-2",
                    beatIndex === i ? "bg-primary text-primary-foreground scale-110 border-primary" : "bg-muted border-transparent"
                  )}>
                    <Music className={cn("w-6 h-6", beatIndex === i ? "animate-pulse" : "opacity-20")} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {gameState === 'ready' && (
            <div className="text-center space-y-8 animate-in zoom-in-95">
              <div className="p-6 bg-primary/5 rounded-3xl border-2 border-primary/10">
                <h3 className="text-2xl font-black uppercase mb-2">Melody Captured</h3>
                <p className="text-muted-foreground text-sm">Tap below to sing it back on the beat.</p>
              </div>
              <Button size="lg" className="h-16 px-12 text-xl font-black shadow-2xl" onClick={startEcho}>
                Start Echo <ChevronRight className="ml-2" />
              </Button>
            </div>
          )}

          {gameState === 'performing' && (
            <div className="w-full flex flex-col items-center space-y-12">
              <div className="w-full flex justify-between items-center max-w-md">
                <Badge className="bg-primary text-white border-none uppercase text-[10px] font-black tracking-widest">Recording Echo</Badge>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-[10px] font-black uppercase opacity-40">Beat {beatIndex + 1} / 4</span>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                {melody.map((m, i) => (
                  <div key={i} className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center transition-all border-4",
                    beatIndex === i ? "border-primary bg-primary/5 scale-110" : "border-transparent bg-muted/30"
                  )}>
                    <Music className={cn("w-8 h-8", beatIndex === i ? "text-primary animate-bounce" : "text-muted-foreground/20")} />
                  </div>
                ))}
              </div>

              <PitchMeter 
                cents={pitchData.centsOff} 
                noteName={pitchData.currentNote} 
                octave={pitchData.currentOctave} 
                isDetecting={pitchData.isDetecting}
              />
            </div>
          )}

          {gameState === 'results_round' && (
            <div className="w-full max-w-md space-y-8 text-center animate-in slide-in-from-bottom-4">
              <h3 className="text-2xl font-black uppercase tracking-tight">Round Recap</h3>
              <div className="grid grid-cols-4 gap-3">
                {melody.map((m, i) => {
                  const cap = capturedPitches[i];
                  return (
                    <div key={i} className="space-y-2">
                      <div className={cn(
                        "h-24 rounded-2xl flex flex-col items-center justify-center border-2",
                        cap?.isCorrect ? "bg-emerald-500/10 border-emerald-500 text-emerald-700" : "bg-destructive/5 border-destructive text-destructive"
                      )}>
                        <span className="text-[8px] font-black uppercase opacity-60">Target: {m.note}</span>
                        <span className="text-xl font-black">{cap?.note}</span>
                        {cap?.isCorrect ? <CheckCircle2 className="w-4 h-4 mt-1" /> : <span className="text-[10px] font-bold mt-1">MISS</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button size="lg" className="w-full font-bold h-14" onClick={handleNextRound}>
                Continue to Round {round + 1}
              </Button>
            </div>
          )}
        </div>
      </MicPermissionGate>
    </GameShell>
  );
}
