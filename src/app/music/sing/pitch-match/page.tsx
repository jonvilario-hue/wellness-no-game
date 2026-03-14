'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { GameShell } from '@/components/game/GameShell';
import { PitchMeter } from '@/components/audio/PitchMeter';
import { MicPermissionGate } from '@/components/audio/MicPermissionGate';
import { useRealtimePitch } from '@/hooks/useRealtimePitch';
import { useAudioEngine } from '@/hooks/useAudioEngine';
import { useMicrophone } from '@/hooks/useMicrophone';
import { noteToFrequency, frequencyToNote, getCentsDifference } from '@/lib/audio/pitchUtils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, CheckCircle2, AlertCircle, Music, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTimer } from '@/hooks/useTimer';
import { useMusicStore } from '@/hooks/use-music-store';

type GameState = 'idle' | 'listening' | 'performing' | 'feedback' | 'results';

export default function PitchMatchPage() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [round, setRound] = useState(1);
  const [targetFreq, setTargetFreq] = useState(0);
  const [targetNoteName, setTargetNoteName] = useState('');
  const [stabilityCounter, setStabilityCounter] = useState(0);
  const [lastRoundResult, setLastResult] = useState<{ correct: boolean; score: number } | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [roundQuestions, setRoundQuestions] = useState<any[]>([]);

  const { engine, isReady, init: initAudio } = useAudioEngine();
  const { stream, requestPermission } = useMicrophone();
  const pitchData = useRealtimePitch(stream, 0.9);
  const { timeLeft, startTimer, stopTimer, resetTimer } = useTimer(8);
  const { logDrill } = useMusicStore();

  const generateTarget = useCallback(() => {
    const naturalNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const note = naturalNotes[Math.floor(Math.random() * naturalNotes.length)];
    const octave = 3 + Math.floor(Math.random() * 2); 
    const freq = noteToFrequency(note, octave);
    setTargetFreq(freq);
    setTargetNoteName(`${note}${octave}`);
    setStabilityCounter(0);
    resetTimer(8);
  }, [resetTimer]);

  const handleStart = async () => {
    if (!isReady) await initAudio();
    if (!stream) await requestPermission();
    setTotalScore(0);
    setRound(1);
    setRoundQuestions([]);
    setGameState('listening');
    generateTarget();
  };

  const playTarget = () => {
    if (!isReady) return;
    engine.playNote(targetNoteName, '2n');
  };

  const startPerforming = () => {
    setGameState('performing');
    startTimer();
  };

  const handleCorrect = useCallback((cents: number) => {
    stopTimer();
    const abs = Math.abs(cents);
    let points = 0;
    if (abs <= 5) points = 100;
    else if (abs <= 15) points = 75;
    else if (abs <= 25) points = 50;

    setTotalScore(s => s + points);
    setLastResult({ correct: true, score: points });
    setRoundQuestions(prev => [...prev, {
      prompt: `Match ${targetNoteName}`,
      userAnswer: pitchData.currentNote,
      correctAnswer: targetNoteName,
      isCorrect: true,
      responseTimeMs: (8 - timeLeft) * 1000
    }]);
    setGameState('feedback');

    setTimeout(() => {
      if (round < 10) {
        setRound(r => r + 1);
        setGameState('listening');
        generateTarget();
      } else {
        finishGame();
      }
    }, 2500);
  }, [round, generateTarget, stopTimer, targetNoteName, pitchData.currentNote, timeLeft]);

  const handleTimeout = useCallback(() => {
    setLastResult({ correct: false, score: 0 });
    setRoundQuestions(prev => [...prev, {
      prompt: `Match ${targetNoteName}`,
      userAnswer: 'None',
      correctAnswer: targetNoteName,
      isCorrect: false,
      responseTimeMs: 8000
    }]);
    setGameState('feedback');
    setTimeout(() => {
      if (round < 10) {
        setRound(r => r + 1);
        setGameState('listening');
        generateTarget();
      } else {
        finishGame();
      }
    }, 2500);
  }, [round, generateTarget, targetNoteName]);

  const finishGame = async () => {
    setGameState('results');
    const score = roundQuestions.filter(q => q.isCorrect).length;
    
    await logDrill({
      domain: 'Vocal Mechanics',
      drillName: 'Pitch Match',
      difficulty: 'Beginner',
      difficultyMultiplier: 1.0,
      focusLevel: 3,
      score: score,
      har: Math.round((score / 10) * 100),
      averageResponseTime: 4000,
      effectivenessRating: 4,
      context: 'Midday',
      durationMinutes: 5,
      questions: roundQuestions
    });
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
        const diff = getCentsDifference(pitchData.currentFrequency, targetFreq);
        handleCorrect(diff);
      }

      if (timeLeft === 0) {
        handleTimeout();
      }
    }
  }, [gameState, pitchData, targetFreq, stabilityCounter, timeLeft, handleCorrect, handleTimeout]);

  return (
    <GameShell
      gameName="Pitch Match"
      description="Match the note you hear by ear."
      instructions={[
        "Listen to the reference note played by the lab.",
        "When ready, tap 'Start Singing' and match that pitch.",
        "Hold the correct pitch for 1 second to clear the round.",
        "Score more points for higher precision (within 5 cents)."
      ]}
      gameState={gameState === 'results' ? 'complete' : gameState === 'idle' ? 'idle' : 'playing'}
      currentRound={round}
      totalRounds={10}
      score={totalScore}
      onStart={handleStart}
      onPauseToggle={() => {}}
      backHref="/skills?tab=music"
      breadcrumb={["Music", "Sing", "Pitch Match"]}
    >
      <MicPermissionGate>
        <div className="w-full flex flex-col items-center space-y-12">
          {gameState === 'listening' && (
            <div className="text-center space-y-8 animate-in zoom-in-95 duration-500">
              <div className="space-y-2">
                <Badge variant="secondary" className="uppercase font-black tracking-widest text-[10px]">Reference Stage</Badge>
                <h3 className="text-4xl font-black">Hear the Note</h3>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Button size="lg" className="h-24 w-24 rounded-full shadow-2xl hover:scale-105 transition-transform" onClick={playTarget}>
                  <Volume2 className="w-10 h-10" />
                </Button>
                <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest">Click to listen</p>
              </div>
              <Button size="lg" variant="outline" className="px-12 font-bold border-2" onClick={startPerforming}>
                I'm Ready to Match <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}

          {gameState === 'performing' && (
            <div className="w-full flex flex-col items-center space-y-12">
              <div className="w-full flex justify-between items-center max-w-md">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg animate-pulse">
                    <Music className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest opacity-60">Live Matching</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <Clock className="w-4 h-4" />
                  <span className="text-2xl font-black font-mono">{timeLeft}s</span>
                </div>
              </div>

              <PitchMeter 
                cents={pitchData.centsOff} 
                noteName={pitchData.currentNote} 
                octave={pitchData.currentOctave} 
                isDetecting={pitchData.isDetecting}
              />

              <div className="flex items-center gap-4">
                <div className={cn(
                  "px-6 py-3 rounded-full border-2 transition-all duration-500 font-black text-xs uppercase tracking-widest",
                  stabilityCounter > 0 ? "bg-green-500/10 border-green-500 text-green-600 scale-110" : "bg-muted border-transparent text-muted-foreground"
                )}>
                  {stabilityCounter > 0 ? `LOCKING IN: ${Math.round((stabilityCounter/30)*100)}%` : "WAITING FOR PITCH"}
                </div>
              </div>
            </div>
          )}

          {gameState === 'feedback' && (
            <div className="text-center space-y-6 animate-in zoom-in-95">
              {lastRoundResult?.correct ? (
                <>
                  <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto" />
                  <div className="space-y-1">
                    <h3 className="text-4xl font-black text-green-600">CORRECT!</h3>
                    <p className="text-xl font-bold">The note was {targetNoteName}</p>
                    <Badge variant="outline" className="text-green-600 border-green-200 mt-2">+{lastRoundResult.score} PTS</Badge>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-24 h-24 text-destructive mx-auto" />
                  <div className="space-y-1">
                    <h3 className="text-4xl font-black text-destructive">TIME UP</h3>
                    <p className="text-xl font-bold text-muted-foreground">The note was {targetNoteName}</p>
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
