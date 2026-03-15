
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { GameShell } from '@/components/game/GameShell';
import { MicPermissionGate } from '@/components/audio/MicPermissionGate';
import { useInstrumentInput } from '@/hooks/useInstrumentInput';
import { useNoteHistory } from '@/hooks/useNoteHistory';
import { useAudioEngine } from '@/hooks/useAudioEngine';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, RotateCcw, CheckCircle2, Music, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { initDB } from '@/lib/storage/db';

type GameState = 'idle' | 'listening' | 'playing' | 'feedback' | 'results';

export default function TranscriptionChallengePage() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [round, setRound] = useState(1);
  const [targetPhrase, setTargetPhrase] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [replaysUsed, setReplaysUsed] = useState(0);
  
  const { engine, isReady, init: initAudio } = useAudioEngine();
  const input = useInstrumentInput();
  const { noteHistory, isRecording, startRecording, stopRecording, clear } = useNoteHistory(
    input.currentNote, input.currentOctave, input.noteIsActive
  );

  const generatePhrase = useCallback(() => {
    const scale = ['C4', 'D4', 'E4', 'F4', 'G4'];
    const len = 4;
    const newPhrase = Array.from({ length: len }, () => scale[Math.floor(Math.random() * scale.length)]);
    setTargetPhrase(newPhrase);
    setReplaysUsed(0);
    clear();
  }, [clear]);

  const handleStart = async () => {
    if (!isReady) await initAudio();
    if (input.inputMode === 'mic') await input.requestPermission();
    setScore(0);
    setRound(1);
    setGameState('listening');
    generatePhrase();
  };

  const playPhrase = useCallback(() => {
    if (!isReady) return;
    engine.playSequence(targetPhrase, '4n');
    setReplaysUsed(p => p + 1);
  }, [isReady, targetPhrase, engine]);

  const startPerformance = () => {
    setGameState('playing');
    startRecording();
  };

  const finalizeRound = async () => {
    stopRecording();
    setGameState('feedback');
    
    // Simple comparison logic
    const correctCount = noteHistory.filter((n, i) => {
      const noteName = `${n.note}${n.octave}`;
      return noteName === targetPhrase[i];
    }).length;

    const roundScore = (correctCount * 10) - (replaysUsed * 5);
    setScore(s => s + Math.max(0, roundScore));

    setTimeout(() => {
      if (round < 8) {
        setRound(r => r + 1);
        setGameState('listening');
        generatePhrase();
      } else {
        finishGame();
      }
    }, 3000);
  };

  const finishGame = async () => {
    setGameState('results');
    const db = await initDB();
    await db.add('sessions', {
      gameName: 'play-transcription',
      date: new Date().toISOString(),
      score,
      accuracy: 0,
      duration: 0,
      difficulty: 'Intermediate',
      roundDetails: []
    });
  };

  return (
    <GameShell
      gameName="Transcription Challenge"
      description="Hear a hidden phrase, then play it back on your instrument."
      instructions={[
        "Listen to the 4-note phrase played by the lab.",
        "When ready, tap 'Start Performance' and play the notes back.",
        "The order and pitch of the notes must match exactly.",
        "Replays are limited and penalize your score."
      ]}
      gameState={gameState === 'results' ? 'complete' : gameState === 'idle' ? 'idle' : 'playing'}
      currentRound={round}
      totalRounds={8}
      score={score}
      onStart={handleStart}
      onPauseToggle={() => {}}
      backHref="/skills?tab=music&sub=play"
      breadcrumb={["Music", "Instrumentals", "Transcription"]}
    >
      <div className="w-full flex flex-col items-center space-y-12">
        {gameState === 'listening' && (
          <div className="text-center space-y-8 animate-in zoom-in-95">
            <div className="space-y-2">
              <Badge variant="secondary" className="uppercase font-black text-[10px]">Step 1: Internalize</Badge>
              <h3 className="text-4xl font-black">Hear the Phrase</h3>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Button size="lg" className="h-24 w-24 rounded-full shadow-2xl" onClick={playPhrase} disabled={replaysUsed >= 3}>
                <Play className="w-10 h-10 fill-current" />
              </Button>
              <p className="text-[10px] font-bold uppercase opacity-40">Replays: {replaysUsed}/3</p>
            </div>
            <Button size="lg" variant="outline" className="px-12 font-bold border-2" onClick={startPerformance}>
              I'm Ready to Play <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="w-full flex flex-col items-center space-y-12">
            <div className="text-center space-y-2">
              <Badge className="bg-primary text-white uppercase text-[10px] font-black">Performance Active</Badge>
              <h3 className="text-2xl font-bold uppercase tracking-tighter">Play the notes you heard</h3>
            </div>

            <div className="flex gap-4">
              {Array.from({ length: targetPhrase.length }).map((_, i) => (
                <div key={i} className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center border-4 transition-all",
                  noteHistory[i] ? "bg-primary/5 border-primary" : "bg-muted border-transparent"
                )}>
                  {noteHistory[i] ? <CheckCircle2 className="text-primary" /> : <Music className="opacity-20" />}
                </div>
              ))}
            </div>

            <Button size="lg" className="px-12 font-bold h-14" onClick={finalizeRound} disabled={noteHistory.length < targetPhrase.length}>
              Finalize Sequence
            </Button>
          </div>
        )}

        {gameState === 'feedback' && (
          <div className="text-center space-y-6">
            <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-3xl font-black uppercase">Captured</h3>
              <p className="text-muted-foreground">Analyzing your melodic accuracy...</p>
            </div>
          </div>
        )}
      </div>
    </GameShell>
  );
}
