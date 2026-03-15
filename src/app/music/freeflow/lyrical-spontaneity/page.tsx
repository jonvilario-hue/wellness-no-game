
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
    <div className="container max-w-4xl mx-auto py-12 space-y-12 animate-in fade-in">
      <div className="text-center space-y-4">
        <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto text-primary">
          <MessageSquare className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter">Lyrical Spontaneity</h1>
        <p className="text-muted-foreground text-lg">Build lyrical agility through random word prompts and rhyme constraints.</p>
      </div>

      <MicPermissionGate>
        <Card className="overflow-hidden border-primary/10 shadow-2xl">
          <CardContent className="p-12 flex flex-col items-center gap-12 bg-card">
            {gameState === 'idle' && (
              <div className="w-full space-y-8 text-center">
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active Constraint</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {RHYME_MODES.map(mode => (
                      <Button 
                        key={mode} 
                        variant={rhymeMode === mode ? 'default' : 'outline'}
                        className="h-10 px-6 rounded-full font-bold"
                        onClick={() => setRhymeMode(mode)}
                      >
                        {mode}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button size="lg" className="h-20 w-20 rounded-full shadow-2xl" onClick={handleStart}>
                  <Play className="w-8 h-8 fill-current ml-1" />
                </Button>
              </div>
            )}

            {gameState === 'playing' && (
              <div className="w-full space-y-12 text-center">
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="h-6 px-3">{rhymeMode}</Badge>
                  <div className="font-mono text-3xl font-black text-primary">{timeLeft}s</div>
                </div>

                <div className="py-12 space-y-4">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">Current Prompt</p>
                  <motion.div 
                    key={currentWord}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-7xl md:text-9xl font-black text-primary uppercase tracking-tighter"
                  >
                    {currentWord}
                  </motion.div>
                </div>

                <Button variant="destructive" size="lg" className="w-full h-16 font-bold" onClick={handleStop}>
                  Stop Session
                </Button>
              </div>
            )}

            {gameState === 'review' && (
              <div className="text-center space-y-8 animate-in zoom-in-95">
                <h3 className="text-2xl font-black uppercase">Drill Synopsis</h3>
                <div className="flex gap-4">
                  <Button size="lg" onClick={playBack} disabled={isPlaying} className="h-16 px-12 gap-3 font-bold">
                    {isPlaying ? <Activity className="animate-pulse" /> : <Play className="fill-current" />}
                    Listen Back
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => setGameState('idle')} className="h-16 px-12 font-bold">
                    <RotateCcw className="w-5 h-5 mr-2" /> New Prompt
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </MicPermissionGate>
    </div>
  );
}
