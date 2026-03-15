
'use client';

import { useState, useEffect, useCallback } from 'react';
import { GameShell } from '@/components/game/GameShell';
import { MicPermissionGate } from '@/components/audio/MicPermissionGate';
import { useMicrophone } from '@/hooks/useMicrophone';
import { useRecordAndPlayback } from '@/hooks/useRecordAndPlayback';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, RotateCcw, Activity, Sparkles, RefreshCw, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const WORDS = [
  'Blueprint', 'Static', 'Algorithm', 'Echo', 'Rhythm', 'Structure', 'Focus', 'Impact',
  'Velocity', 'Logic', 'Pattern', 'Silence', 'Frequency', 'Vibration', 'Canvas', 'Flow',
  'Nexus', 'Prism', 'Orbit', 'Pulse', 'Vertex', 'Signal', 'Glitch', 'Catalyst'
];

const RHYME_MODES = [
  'AABB (Couplets)', 'ABAB (Cross)', 'Free Verse', 'Internal Rhyme'
];

export default function LyricalSpontaneityPage() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'review'>('idle');
  const [currentWord, setCurrentWord] = useState(WORDS[0]);
  const [rhymeMode, setRhymeMode] = useState(RHYME_MODES[0]);
  const [timeLeft, setTimeLeft] = useState(60);
  
  const { stream, requestPermission } = useMicrophone();
  const { startRecording, stopRecording, playBack, isRecording, isPlaying } = useRecordAndPlayback(stream);

  const rotateWord = useCallback(() => {
    const next = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(next);
  }, []);

  const handleStart = async () => {
    if (!stream) await requestPermission();
    setGameState('playing');
    setTimeLeft(60);
    startRecording();
    rotateWord();
  };

  const handleStop = () => {
    stopRecording();
    setGameState('review');
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(t => t - 1);
        if (timeLeft % 10 === 0) rotateWord();
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleStop();
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, rotateWord]);

  return (
    <GameShell
      gameName="Lyrical Spontaneity"
      description="Respond to random word prompts and stay in motion."
      instructions={[
        "Select a rhyme mode and drop in.",
        "A new word appears every 10 seconds.",
        "Listen back to your flow once the timer ends."
      ]}
      variant="flow"
      gameState={gameState === 'review' ? 'complete' : gameState === 'idle' ? 'idle' : 'playing'}
      currentRound={1}
      totalRounds={1}
      score={0}
      onStart={handleStart}
      onPauseToggle={() => {}}
      backHref="/skills?tab=music&sub=freeflow"
      breadcrumb={["Music", "Freeflow", "Lyrical Spontaneity"]}
    >
      <MicPermissionGate>
        <div className="w-full flex flex-col items-center space-y-12 py-8">
          {gameState === 'playing' && (
            <div className="w-full space-y-12 text-center">
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="h-6 px-3">{rhymeMode}</Badge>
                <div className="font-mono text-3xl font-black text-primary">{timeLeft}s</div>
              </div>

              <div className="py-12 space-y-4 h-[300px] flex flex-col justify-center">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">Current Prompt</p>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentWord}
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 1.2, opacity: 0, y: -20 }}
                    className="text-7xl md:text-9xl font-black text-primary uppercase tracking-tighter"
                  >
                    {currentWord}
                  </motion.div>
                </AnimatePresence>
              </div>

              <Button variant="destructive" size="lg" className="w-full h-16 font-bold shadow-xl shadow-destructive/20" onClick={handleStop}>
                End Flow
              </Button>
            </div>
          )}

          {gameState === 'review' && (
            <div className="text-center space-y-8 animate-in zoom-in-95">
              <h3 className="text-2xl font-black uppercase">Session Recap</h3>
              <div className="flex gap-4">
                <Button size="lg" onClick={playBack} disabled={isPlaying} className="h-16 px-12 gap-3 font-bold shadow-lg">
                  {isPlaying ? <Activity className="animate-pulse" /> : <Play className="fill-current" />}
                  Listen Back
                </Button>
                <Button variant="outline" size="lg" onClick={() => setGameState('idle')} className="h-16 px-12 font-bold border-2">
                  <RotateCcw className="w-5 h-5 mr-2" /> New Take
                </Button>
              </div>
            </div>
          )}
        </div>
      </MicPermissionGate>
    </GameShell>
  );
}
