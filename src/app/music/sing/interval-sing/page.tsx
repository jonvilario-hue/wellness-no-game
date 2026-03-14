
'use client';

import { useState, useEffect, useCallback } from 'react';
import { GameShell } from '@/components/game/GameShell';
import { PitchMeter } from '@/components/audio/PitchMeter';
import { MicPermissionGate } from '@/components/audio/MicPermissionGate';
import { useRealtimePitch } from '@/hooks/useRealtimePitch';
import { useAudioEngine } from '@/hooks/useAudioEngine';
import { useMicrophone } from '@/hooks/useMicrophone';
import { noteToFrequency, frequencyToNote, getIntervalFrequency, getCentsDifference } from '@/lib/audio/pitchUtils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Music, CheckCircle2, AlertCircle, ArrowRight, Play, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTimer } from '@/hooks/useTimer';
import { initDB } from '@/lib/storage/db';

type GameState = 'idle' | 'prep' | 'performing' | 'feedback' | 'results';

const intervals = [
  { name: 'Minor 2nd', semitones: 1 },
  { name: 'Major 2nd', semitones: 2 },
  { name: 'Minor 3rd', semitones: 3 },
  { name: 'Major 3rd', semitones: 4 },
  { name: 'Perfect 4th', semitones: 5 },
  { name: 'Tritone', semitones: 6 },
  { name: 'Perfect 5th', semitones: 7 },
  { name: 'Minor 6th', semitones: 8 },
  { name: 'Major 6th', semitones: 9 },
  { name: 'Minor 7th', semitones: 10 },
  { name: 'Major 7th', semitones: 11 },
  { name: 'Octave', semitones: 12 },
];

export default function IntervalSingPage() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [round, setRound] = useState(1);
  const [rootNote, setRootNote] = useState('');
  const [targetNote, setTargetNote] = useState('');
  const [targetFreq, setTargetFreq] = useState(0);
  const [currentInterval, setCurrentInterval] = useState(intervals[0]);
  const [stabilityCounter, setStabilityCounter] = useState(0);
  const [lastResult, setLastResult] = useState<{ correct: boolean; score: number } | null>(null);
  const [totalScore, setTotalScore] = useState(0);

  const { engine, isReady, init: initAudio } = useAudioEngine();
  const { stream, requestPermission } = useMicrophone();
  const pitchData = useRealtimePitch(stream, 0.9);
  const { timeLeft, startTimer, stopTimer, resetTimer } = useTimer(10);

  const generateTask = useCallback(() => {
    const naturalNotes = ['C', 'D', 'E', 'F', 'G']; 
    const note = naturalNotes[Math.floor(Math.random() * naturalNotes.length)];
    const octave = 3 + Math.floor(Math.random() * 2);
    const root = `${note}${octave}`;
    const rootFreq = noteToFrequency(note, octave);
    
    const interval = intervals[Math.floor(Math.random() * intervals.length)];
    const targetF = getIntervalFrequency(rootFreq, interval.semitones);
    const targetN = frequencyToNote(targetF);

    setRootNote(root);
    setCurrentInterval(interval);
    setTargetFreq(targetF);
    setTargetNote(targetN ? `${targetN.note}${targetN.octave}` : '');
    setStabilityCounter(0);
    resetTimer(10);
  }, [resetTimer]);

  const handleStart = async () => {
    if (!isReady) await initAudio();
    if (!stream) await requestPermission();
    setTotalScore(0);
    setRound(1);
    setGameState('prep');
    generateTask();
  };

  const playRoot = () => {
    if (!isReady) return;
    engine.playNote(rootNote, '2n');
  };

  const startPerforming = () => {
    setGameState('performing');
    startTimer();
  };

  const handleCorrect = useCallback((cents: number) => {
    stopTimer();
    const abs = Math.abs(cents);
    const points = abs <= 5 ? 100 : abs <= 15 ? 75 : 50;
    setTotalScore(s => s + points);
    setLastResult({ correct: true, score: points });
    setGameState('feedback');

    setTimeout(() => {
      if (round < 10) {
        setRound(r => r + 1);
        setGameState('prep');
        generateTask();
      } else {
        finishGame();
      }
    }, 2500);
  }, [round, generateTask, stopTimer]);

  const handleTimeout = useCallback(() => {
    setLastResult({ correct: false, score: 0 });
    setGameState('feedback');
    setTimeout(() => {
      if (round < 10) {
        setRound(r => r + 1);
        setGameState('prep');
        generateTask();
      } else {
        finishGame();
      }
    }, 2500);
  }, [round, generateTask]);

  const finishGame = async () => {
    setGameState('results');
    try {
      const db = await initDB();
      await db.add('sessions', {
        gameName: 'interval-sing',
        date: new Date().toISOString(),
        score: totalScore,
        accuracy: 0,
        duration: 0,
        difficulty: 'Intermediate',
        roundDetails: [],
        maxStreak: 0
      });
    } catch (e) {}
  };

  useEffect(() => {
    if (gameState === 'performing') {
      if (pitchData.isDetecting) {
        const diff = getCentsDifference(pitchData.currentFrequency, targetFreq);
        if (Math.abs(diff) <= 15) {
          setStabilityCounter(prev => prev + 1);
        } else {
          setStabilityCounter(0);
        }
      } else {
        setStabilityCounter(0);
      }

      if (stabilityCounter >= 30) {
        handleCorrect(getCentsDifference(pitchData.currentFrequency, targetFreq));
      }

      if (timeLeft === 0) {
        handleTimeout();
      }
    }
  }, [gameState, pitchData, targetFreq, stabilityCounter, timeLeft, handleCorrect, handleTimeout]);

  return (
    <GameShell
      gameName="Interval Sing-Back"
      description="Sing specific intervals from a root note."
      instructions={[
        "Listen to the root note provided by the lab.",
        "Observe the interval requested (e.g., Major 3rd UP).",
        "Tap 'Sing Target' and perform that interval using your voice.",
        "Hold the pitch for 1 second to pass the round."
      ]}
      gameState={gameState === 'results' ? 'complete' : gameState === 'idle' ? 'idle' : 'playing'}
      currentRound={round}
      totalRounds={10}
      score={totalScore}
      onStart={handleStart}
      onPauseToggle={() => {}}
      backHref="/music/sing"
      breadcrumb={["Music", "Sing", "Interval Sing"]}
    >
      <MicPermissionGate>
        <div className="w-full flex flex-col items-center space-y-12">
          {gameState === 'prep' && (
            <div className="text-center space-y-8 animate-in zoom-in-95">
              <div className="space-y-4">
                <Badge variant="secondary" className="uppercase font-black tracking-widest text-[10px]">Challenge</Badge>
                <div className="space-y-1">
                  <h3 className="text-5xl font-black text-primary">{currentInterval.name}</h3>
                  <p className="text-xl font-bold text-muted-foreground">Sing this interval UP from root</p>
                </div>
              </div>
              <Card className="bg-muted p-6 border-none inline-flex flex-col items-center gap-2">
                <p className="text-[10px] font-black uppercase opacity-40">Root Note</p>
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-black">{rootNote}</span>
                  <Button size="icon" className="h-12 w-12 rounded-full shadow-lg" onClick={playRoot}>
                    <Play className="fill-current" />
                  </Button>
                </div>
              </Card>
              <div className="pt-4">
                <Button size="lg" className="px-12 font-bold h-14 text-lg shadow-xl" onClick={startPerforming}>
                  Sing Target <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {gameState === 'performing' && (
            <div className="w-full flex flex-col items-center space-y-12">
              <div className="w-full flex justify-between items-center max-w-md">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary text-white border-none uppercase text-[10px] font-black">{currentInterval.name}</Badge>
                  <span className="text-[10px] font-black uppercase opacity-40">Target: {targetNote}</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <Clock className="w-4 h-4" />
                  <span className="text-2xl font-black font-mono">{timeLeft}s</span>
                </div>
              </div>

              <PitchMeter 
                cents={getCentsDifference(pitchData.currentFrequency, targetFreq)} 
                noteName={pitchData.currentNote} 
                octave={pitchData.currentOctave} 
                isDetecting={pitchData.isDetecting}
                targetNote={targetNote}
              />

              <div className={cn(
                "px-6 py-3 rounded-full border-2 transition-all duration-500 font-black text-xs uppercase tracking-widest",
                stabilityCounter > 0 ? "bg-green-500/10 border-green-500 text-green-600 scale-110" : "bg-muted border-transparent text-muted-foreground"
              )}>
                {stabilityCounter > 0 ? "LOCKING IN..." : "SING THE TARGET"}
              </div>
            </div>
          )}

          {gameState === 'feedback' && (
            <div className="text-center space-y-6 animate-in zoom-in-95">
              {lastResult?.correct ? (
                <>
                  <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto" />
                  <div className="space-y-1">
                    <h3 className="text-4xl font-black text-green-600">LOCKED!</h3>
                    <p className="text-xl font-bold">Target was {targetNote}</p>
                    <Badge variant="outline" className="text-green-600 border-green-200 mt-2">+{lastResult.score} PTS</Badge>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-24 h-24 text-destructive mx-auto" />
                  <div className="space-y-1">
                    <h3 className="text-4xl font-black text-destructive">MISSED</h3>
                    <p className="text-xl font-bold text-muted-foreground">The note was {targetNote}</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </MicPermissionGate>
    </GameShell>
  );
}
