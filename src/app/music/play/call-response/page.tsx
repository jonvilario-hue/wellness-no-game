
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { GameShell } from '@/components/game/GameShell';
import { useInstrumentInput } from '@/hooks/useInstrumentInput';
import { useAudioEngine } from '@/hooks/useAudioEngine';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Music, Clock, Activity, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { initDB } from '@/lib/storage/db';

type SessionState = 'idle' | 'call' | 'response' | 'complete';

export default function CallResponsePage() {
  const [state, setState] = useState<SessionState>('idle');
  const [exchange, setExchange] = useState(1);
  const [score, setScore] = useState(0);
  
  const { engine, isReady, init: initAudio } = useAudioEngine();
  const input = useInstrumentInput();

  const handleStart = async () => {
    if (!isReady) await initAudio();
    setScore(0);
    setExchange(1);
    startCycle();
  };

  const startCycle = useCallback(async () => {
    setState('call');
    // Play "call" phrase
    engine.playSequence(['C4', 'E4', 'G4', 'C5'], '4n');
    
    await new Promise(r => setTimeout(r, 2000));
    
    setState('response');
    // Period for "response"
    await new Promise(r => setTimeout(r, 2000));

    if (exchange < 10) {
      setExchange(e => e + 1);
      startCycle();
    } else {
      setState('complete');
    }
  }, [engine, exchange]);

  return (
    <GameShell
      gameName="Call & Response"
      description="Trade musical phrases with the lab in real-time."
      instructions={[
        "Wait for the 'Call' — the lab plays a phrase.",
        "During the 'Response', play the exact phrase back.",
        "Stay in rhythm with the visual metronome.",
        "Scoring depends on both pitch and onset timing."
      ]}
      gameState={state === 'complete' ? 'complete' : state === 'idle' ? 'idle' : 'playing'}
      currentRound={exchange}
      totalRounds={10}
      score={score}
      onStart={handleStart}
      onPauseToggle={() => {}}
      backHref="/music/play"
      breadcrumb={["Music", "Play", "Call & Response"]}
    >
      <div className="w-full flex flex-col items-center gap-12">
        <div className="text-center space-y-4">
          <div className={cn(
            "p-12 rounded-full transition-all duration-500 border-8",
            state === 'call' ? "bg-primary/5 border-primary scale-110 shadow-2xl shadow-primary/20" : "bg-muted border-transparent"
          )}>
            <Music className={cn("w-20 h-20", state === 'call' ? "text-primary animate-pulse" : "text-muted-foreground/20")} />
          </div>
          <h2 className="text-4xl font-black uppercase tracking-widest">
            {state === 'call' ? 'LISTEN' : 'YOUR TURN'}
          </h2>
        </div>

        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-muted overflow-hidden">
              {state === 'response' && (
                <div className="h-full bg-primary animate-in slide-in-from-left duration-500" />
              )}
            </div>
          ))}
        </div>
      </div>
    </GameShell>
  );
}
