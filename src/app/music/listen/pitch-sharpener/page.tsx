
'use client';

import { useState, useEffect, useCallback } from 'react';
import { GameShell } from '@/components/game/GameShell';
import { PitchMeter } from '@/components/game/PitchMeter';
import { MicPermissionGate } from '@/components/audio/MicPermissionGate';
import { useRealtimePitch } from '@/hooks/useRealtimePitch';
import { useAudioEngine } from '@/hooks/useAudioEngine';
import { Note } from '@tonaljs/tonal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, Mic, Activity, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

type PitchGameState = 'idle' | 'listening' | 'performing' | 'results';

export default function PitchSharpenerPage() {
  const [gameState, setGameState] = useState<PitchGameState>('idle');
  const [currentRound, setCurrentRound] = useState(1);
  const [totalRounds] = useState(10);
  const [score, setScore] = useState(0);
  const [targetNote, setTargetNote] = useState('C4');
  const [targetFreq, setTargetFreq] = useState(261.63);
  const [centsDeviation, setCentsDeviation] = useState(0);
  const [isStable, setIsStable] = useState(false);
  const [stabilityCounter, setStabilityCounter] = useState(0);

  const { engine, isReady, init: initAudio } = useAudioEngine();
  const { pitch, clarity, start: startMic, stop: stopMic, isCapturing } = useRealtimePitch(0.92);

  const generateNewTarget = useCallback(() => {
    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const randomNote = `${notes[Math.floor(Math.random() * notes.length)]}4`;
    setTargetNote(randomNote);
    setTargetFreq(Note.freq(randomNote) || 261.63);
    setIsStable(false);
    setStabilityCounter(0);
  }, []);

  const handleStart = async () => {
    if (!isReady) await initAudio();
    setScore(0);
    setCurrentRound(1);
    generateNewTarget();
    setGameState('listening');
  };

  const playReference = () => {
    if (!isReady) return;
    engine.playNote(targetNote, '2n');
  };

  useEffect(() => {
    if (gameState === 'performing' && pitch) {
      const diff = 1200 * Math.log2(pitch / targetFreq);
      setCentsDeviation(diff);
      
      if (Math.abs(diff) < 15) {
        setStabilityCounter(prev => prev + 1);
      } else {
        setStabilityCounter(0);
      }
    } else {
      setCentsDeviation(0);
    }
  }, [pitch, targetFreq, gameState]);

  useEffect(() => {
    if (stabilityCounter >= 30) { // Approx 0.5s of stable pitch
      setIsStable(true);
      setTimeout(() => {
        setScore(s => s + 10);
        if (currentRound < totalRounds) {
          setCurrentRound(r => r + 1);
          generateNewTarget();
          setGameState('listening');
          stopMic();
        } else {
          setGameState('results');
          stopMic();
        }
      }, 500);
    }
  }, [stabilityCounter, currentRound, totalRounds, generateNewTarget, stopMic]);

  return (
    <GameShell
      gameName="Pitch Sharpener"
      description="Match your voice to the reference pitch with sub-hertz precision."
      instructions={[
        "Listen to the reference note played by the lab.",
        "When the microphone activates, hum or sing the same note.",
        "Use the meter to adjust your pitch—aim for the center.",
        "Hold the correct pitch for a brief moment to win the round."
      ]}
      gameState={gameState === 'results' ? 'complete' : gameState === 'idle' ? 'idle' : 'playing'}
      currentRound={currentRound}
      totalRounds={totalRounds}
      score={score}
      onStart={handleStart}
      onPauseToggle={() => {}}
      backHref="/music/listen"
      breadcrumb={["Music", "Listen", "Pitch Sharpener"]}
    >
      <MicPermissionGate onGranted={() => {}}>
        <div className="w-full flex flex-col items-center space-y-12 py-8">
          {gameState === 'listening' && (
            <div className="text-center space-y-8 animate-in zoom-in-95 duration-500">
              <div className="space-y-2">
                <Badge variant="secondary" className="uppercase font-black tracking-widest text-[10px]">Reference Stage</Badge>
                <h3 className="text-4xl font-black">{targetNote}</h3>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Button size="lg" className="h-20 w-20 rounded-full shadow-xl" onClick={playReference}>
                  <Volume2 className="w-8 h-8" />
                </Button>
                <p className="text-muted-foreground text-sm font-bold uppercase tracking-tight">Click to listen</p>
              </div>
              <Button size="lg" variant="outline" className="px-12 font-bold border-2" onClick={() => {
                setGameState('performing');
                startMic();
              }}>
                I'm Ready to Match <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}

          {gameState === 'performing' && (
            <div className="w-full flex flex-col items-center space-y-12">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg animate-pulse">
                    <Mic className="w-5 h-5 text-primary" />
                  </div>
                  <Badge variant="outline" className="uppercase font-black text-[10px] tracking-widest border-primary/30">Live Capture</Badge>
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tighter">Match the Reference</h3>
              </div>

              <PitchMeter cents={centsDeviation} />

              <div className={cn(
                "p-6 rounded-3xl border-2 transition-all duration-500 flex flex-col items-center gap-2",
                isStable ? "bg-green-500/10 border-green-500 scale-110" : "bg-muted/30 border-transparent"
              )}>
                {isStable ? (
                  <>
                    <CheckCircle2 className="w-12 h-12 text-green-500 animate-bounce" />
                    <span className="font-black text-xs uppercase tracking-widest">Locked In!</span>
                  </>
                ) : (
                  <>
                    <Activity className={cn("w-12 h-12", pitch ? "text-primary animate-pulse" : "text-muted-foreground")} />
                    <span className="font-bold text-[10px] uppercase opacity-40">Awaiting Signal...</span>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => { stopMic(); setGameState('listening'); }}>
                  <RotateCcw className="w-4 h-4 mr-2" /> Re-listen
                </Button>
              </div>
            </div>
          )}
        </div>
      </MicPermissionGate>
    </GameShell>
  );
}
