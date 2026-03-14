
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
      if (pattern[i]) drumKit.hihat();
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
    });
  };

  return (
    <GameShell
      gameName="Flow Trainer"
      description="Match the rhythmic pattern using your voice or claps."
      instructions={[
        "Observe the 16-step grid.",
        "Listen to the pattern during the reference bar.",
        "When the grid highlights, match the pattern in rhythm.",
        "Hit the marked cells and stay silent on the empty ones."
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
          <div className="text-center space-y-4">
            <Badge className="bg-primary text-white uppercase text-[10px] font-black">
              {gameState === 'listening' ? 'LISTEN' : 'YOUR TURN'}
            </Badge>
            {gameState === 'listening' && (
              <Button size="lg" onClick={runSequence}>Initialize Sequence</Button>
            )}
          </div>

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
