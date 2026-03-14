
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { GameShell } from '@/components/game/GameShell';
import { PitchMeter } from '@/components/audio/PitchMeter';
import { MicPermissionGate } from '@/components/audio/MicPermissionGate';
import { useRealtimePitch } from '@/hooks/useRealtimePitch';
import { useAudioEngine } from '@/hooks/useAudioEngine';
import { useMicrophone } from '@/hooks/useMicrophone';
import { noteToFrequency, getCentsDifference } from '@/lib/audio/pitchUtils';
import { SimpleStaff } from '@/components/music/SimpleStaff';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Activity, Clock, CheckCircle2, ChevronRight, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { initDB } from '@/lib/storage/db';

type GameState = 'idle' | 'study' | 'performing' | 'results_round' | 'complete';

const BPM = 80;
const BEAT_MS = (60 / BPM) * 1000;

export default function SightSingingPage() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [round, setRound] = useState(1);
  const [phrase, setPhrase] = useState<{ pitch: string; duration: 'q'; status: 'correct' | 'wrong' | 'pending' | 'current' }[]>([]);
  const [studyTime, setStudyTime] = useState(5);
  const [totalScore, setTotalScore] = useState(0);
  const [beatIndex, setBeatIndex] = useState(-1);

  const { engine, isReady, init: initAudio } = useAudioEngine();
  const { stream, requestPermission } = useMicrophone();
  const pitchData = useRealtimePitch(stream, 0.85);

  const generatePhrase = useCallback(() => {
    const scale = ['C4', 'D4', 'E4', 'F4', 'G4'];
    const newPhrase = Array.from({ length: 4 }, () => ({
      pitch: scale[Math.floor(Math.random() * scale.length)],
      duration: 'q' as const,
      status: 'pending' as const
    }));
    setPhrase(newPhrase);
    setBeatIndex(-1);
    setStudyTime(5);
  }, []);

  const handleStart = async () => {
    if (!isReady) await initAudio();
    if (!stream) await requestPermission();
    setTotalScore(0);
    setRound(1);
    setGameState('study');
    generatePhrase();
  };

  useEffect(() => {
    if (gameState === 'study' && studyTime > 0) {
      const timer = setTimeout(() => setStudyTime(studyTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'study' && studyTime === 0) {
      startPerformance();
    }
  }, [gameState, studyTime]);

  const startPerformance = async () => {
    setGameState('performing');
    
    for (let i = 0; i < 4; i++) {
      engine.playMetronomeClick();
      await new Promise(r => setTimeout(r, BEAT_MS));
    }

    const updatedPhrase = [...phrase];
    
    for (let i = 0; i < phrase.length; i++) {
      engine.playMetronomeClick();
      setBeatIndex(i);
      updatedPhrase[i].status = 'current';
      setPhrase([...updatedPhrase]);
      
      await new Promise(r => setTimeout(r, BEAT_MS));
      
      const targetFreq = noteToFrequency(phrase[i].pitch.slice(0, -1), parseInt(phrase[i].pitch.slice(-1)));
      const cents = getCentsDifference(pitchData.currentFrequency, targetFreq);
      const isCorrect = pitchData.isDetecting && Math.abs(cents) <= 30;
      
      updatedPhrase[i].status = isCorrect ? 'correct' : 'wrong';
      setPhrase([...updatedPhrase]);
    }
    
    setBeatIndex(-1);
    setGameState('results_round');
  };

  const handleNextRound = () => {
    const roundCorrect = phrase.filter(p => p.status === 'correct').length;
    setTotalScore(s => s + (roundCorrect * 50));
    
    if (round < 6) {
      setRound(r => r + 1);
      setGameState('study');
      generatePhrase();
    } else {
      finishGame();
    }
  };

  const finishGame = async () => {
    setGameState('complete');
    const db = await initDB();
    await db.add('sessions', {
      gameName: 'sight-singing',
      date: new Date().toISOString(),
      score: totalScore,
      accuracy: 0,
      duration: 0,
      difficulty: 'Advanced',
      roundDetails: [],
      maxStreak: 0
    });
  };

  return (
    <GameShell
      gameName="Sight-Singing"
      description="Perform phrases from notation."
      instructions={[
        "Observe the 4-note phrase on the staff.",
        "You have 5 seconds to study the notes.",
        "After the count-in, sing each note on the beat.",
        "Aim for perfect pitch and rhythmic precision."
      ]}
      gameState={gameState === 'complete' ? 'complete' : gameState === 'idle' ? 'idle' : 'playing'}
      currentRound={round}
      totalRounds={6}
      score={totalScore}
      onStart={handleStart}
      onPauseToggle={() => {}}
      backHref="/music/sing"
      breadcrumb={["Music", "Sing", "Sight-Singing"]}
    >
      <MicPermissionGate>
        <div className="w-full flex flex-col items-center space-y-12">
          {gameState === 'study' && (
            <div className="w-full flex flex-col items-center space-y-8 animate-in fade-in">
              <div className="flex items-center gap-4">
                <Badge className="bg-primary text-white border-none uppercase text-xs font-black tracking-widest px-4 h-8">Study Phase</Badge>
                <div className="flex items-center gap-2 text-primary">
                  <Clock className="w-5 h-5" />
                  <span className="text-3xl font-black font-mono">{studyTime}s</span>
                </div>
              </div>
              <SimpleStaff notes={phrase} className="max-w-xl" />
              <p className="text-muted-foreground font-bold uppercase text-xs tracking-[0.2em] animate-pulse">Internalize the melody</p>
            </div>
          )}

          {gameState === 'performing' && (
            <div className="w-full flex flex-col items-center space-y-12">
              <div className="w-full flex justify-between items-center max-w-md">
                <Badge className="bg-destructive text-white border-none uppercase text-[10px] font-black tracking-widest animate-pulse">Recording Live</Badge>
                <span className="text-[10px] font-black uppercase opacity-40">Beat {beatIndex + 1} / 4</span>
              </div>

              <SimpleStaff notes={phrase} className="max-w-xl" />

              <PitchMeter 
                cents={pitchData.centsOff} 
                noteName={pitchData.currentNote} 
                octave={pitchData.currentOctave} 
                isDetecting={pitchData.isDetecting}
              />
            </div>
          )}

          {gameState === 'results_round' && (
            <div className="w-full max-w-xl space-y-8 text-center animate-in slide-in-from-bottom-4">
              <h3 className="text-3xl font-black uppercase tracking-tight">Performance Audit</h3>
              <SimpleStaff notes={phrase} />
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-2xl">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Precision</p>
                  <p className="text-3xl font-black">{phrase.filter(p => p.status === 'correct').length} / 4</p>
                </div>
                <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl">
                  <p className="text-[10px] font-bold text-primary uppercase mb-1">Points</p>
                  <p className="text-3xl font-black text-primary">+{phrase.filter(p => p.status === 'correct').length * 50}</p>
                </div>
              </div>
              <Button size="lg" className="w-full font-bold h-14 text-lg" onClick={handleNextRound}>
                Continue to Round {round + 1} <ChevronRight className="ml-2" />
              </Button>
            </div>
          )}
        </div>
      </MicPermissionGate>
    </GameShell>
  );
}
