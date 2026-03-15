
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { GameShell } from '@/components/game/GameShell';
import { MicPermissionGate } from '@/components/audio/MicPermissionGate';
import { useMicrophone } from '@/hooks/useMicrophone';
import { useOnsetDetection } from '@/hooks/useOnsetDetection';
import { useBeatTracking } from '@/hooks/useBeatTracking';
import { BeatGrid } from '@/components/audio/BeatGrid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { drumKit } from '@/lib/audio/drums';
import * as Tone from 'tone';
import { initDB } from '@/lib/storage/db';
import { cn } from '@/lib/utils';

const PATTERNS = {
  Beginner: [
    [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false]
  ],
  Intermediate: [
    [true, false, false, true, false, false, true, false, false, false, true, false, true, false, false, false],
    [true, false, true, false, false, true, false, true, true, false, true, false, false, true, false, false]
  ],
  Advanced: [
    [false, true, false, true, true, false, false, true, false, false, true, false, true, true, false, true],
    [true, false, false, false, false, true, true, false, false, true, false, false, false, false, true, true]
  ]
};

export default function FlowTrainerPage() {
  const [gameState, setGameState] = useState<'idle' | 'listening' | 'performing' | 'results'>('idle');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [isPercussiveMode, setIsPercussiveMode] = useState(false);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [pattern, setPattern] = useState<boolean[]>([]);
  const [currentCell, setCurrentCell] = useState(-1);
  const [userHits, setUserHits] = useState<number[]>([]);
  const [bpm, setBpm] = useState(90);
  const [startTime, setStartTime] = useState(0);

  const { stream, requestPermission } = useMicrophone();
  const { onsets, lastOnsetTime, resetOnsets } = useOnsetDetection(stream);

  const handleStart = async () => {
    await drumKit.init();
    if (!stream) await requestPermission();
    setScore(0);
    setRound(1);
    nextRound();
  };

  const nextRound = useCallback(() => {
    const tier = PATTERNS[difficulty];
    setPattern(tier[Math.floor(Math.random() * tier.length)]);
    setUserHits([]);
    setCurrentCell(-1);
    setGameState('listening');
    resetOnsets();
  }, [difficulty, resetOnsets]);

  // Record hits during performance
  useEffect(() => {
    if (gameState === 'performing' && lastOnsetTime > 0) {
      setUserHits(prev => [...new Set([...prev, currentCell])]);
    }
  }, [lastOnsetTime, gameState, currentCell]);

  const runSequence = async () => {
    const cellDuration = (60 / bpm / 4) * 1000;
    
    // 1. Listening Phase
    for (let i = 0; i < 16; i++) {
      setCurrentCell(i);
      if (pattern[i]) {
        if (isPercussiveMode) drumKit.kick();
        else drumKit.hihat();
      }
      await new Promise(r => setTimeout(r, cellDuration));
    }

    // 2. Prep
    setCurrentCell(-1);
    await new Promise(r => setTimeout(r, 1000));
    
    // 3. Performance Phase
    setGameState('performing');
    setStartTime(Date.now());
    for (let i = 0; i < 16; i++) {
      setCurrentCell(i);
      drumKit.hihat(undefined); // Metronome click
      await new Promise(r => setTimeout(r, cellDuration));
    }

    // 4. Score
    calculateScore();
  };

  const calculateScore = () => {
    let roundCorrect = 0;
    for (let i = 0; i < 16; i++) {
      if (pattern[i] === userHits.includes(i)) roundCorrect++;
    }
    const roundScore = Math.round((roundCorrect / 16) * 100);
    setScore(s => s + roundScore);

    setTimeout(() => {
      if (round < 10) {
        setRound(r => r + 1);
        nextRound();
      } else {
        finishGame();
      }
    }, 2000);
  };

  const finishGame = async () => {
    setGameState('results');
    const db = await initDB();
    await db.add('sessions', {
      gameName: 'create-flow-trainer',
      date: new Date().toISOString(),
      score: Math.round(score / 10),
      difficulty,
      mode: isPercussiveMode ? 'percussive' : 'standard'
    });
  };

  return (
    <GameShell
      gameName="Flow Trainer"
      description="Lock your rhythm to the beat grid using your voice, vocal percussion, or body percussion."
      instructions={[
        "Observe the 16-step grid.",
        "Listen to the pattern during the reference bar.",
        "When the grid highlights, match the pattern in rhythm.",
        isPercussiveMode ? "Percussive Mode: Use kicks, snaps, claps, or vocal drums." : "Standard Mode: Use your voice or hum the rhythm."
      ]}
      gameState={gameState === 'results' ? 'complete' : gameState === 'idle' ? 'idle' : 'playing'}
      currentRound={round}
      totalRounds={10}
      score={score}
      onStart={handleStart}
      onPauseToggle={() => {}}
      backHref="/music/create"
      breadcrumb={["Music", "Create", "Flow Trainer"]}
    >
      <MicPermissionGate>
        <div className="w-full flex flex-col items-center space-y-12">
          {gameState === 'idle' && (
            <div className="flex flex-col gap-6 items-center bg-muted/30 p-8 rounded-[2rem] border border-primary/5 w-full max-w-md">
              <div className="space-y-2 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Input Protocol</p>
                <div className="flex gap-2">
                  <Button 
                    variant={!isPercussiveMode ? 'default' : 'outline'} 
                    className="flex-1 h-12 font-bold"
                    onClick={() => setIsPercussiveMode(false)}
                  >
                    Standard (Voice)
                  </Button>
                  <Button 
                    variant={isPercussiveMode ? 'default' : 'outline'} 
                    className="flex-1 h-12 font-bold"
                    onClick={() => setIsPercussiveMode(true)}
                  >
                    Percussive Mode
                  </Button>
                </div>
              </div>
            </div>
          )}

          {gameState !== 'idle' && (
            <div className="text-center space-y-4">
              <Badge className="bg-primary text-white uppercase text-[10px] font-black px-4 h-6">
                {gameState === 'listening' ? 'LISTEN' : 'YOUR TURN'}
              </Badge>
              {gameState === 'listening' && (
                <Button size="lg" onClick={runSequence} className="px-12 h-14 font-black text-lg shadow-xl">Initialize Sequence</Button>
              )}
            </div>
          )}

          <BeatGrid 
            pattern={pattern} 
            currentCell={currentCell} 
            userHits={userHits} 
          />
        </div>
      </MicPermissionGate>
    </GameShell>
  );
}
