
'use client';

import { useState, useCallback } from 'react';
import { GameShell } from '@/components/game/GameShell';
import { useInstrumentInput } from '@/hooks/useInstrumentInput';
import { useNoteHistory } from '@/hooks/useNoteHistory';
import { useAudioEngine } from '@/hooks/useAudioEngine';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Music, Target, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { initDB } from '@/lib/storage/db';

type GameState = 'idle' | 'prep' | 'playing' | 'results';

export default function ScaleDrillPage() {
  const [state, setState] = useState<GameState>('idle');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [targetScale, setTargetScale] = useState({ name: 'C Major', notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'] });

  const input = useInstrumentInput();
  const { noteHistory, startRecording, stopRecording, clear } = useNoteHistory(
    input.currentNote, input.currentOctave, input.noteIsActive
  );

  const handleStart = () => {
    setScore(0);
    setRound(1);
    setState('prep');
  };

  const startDrill = () => {
    setState('playing');
    clear();
    startRecording();
  };

  const finalize = () => {
    stopRecording();
    const correct = noteHistory.filter((n, i) => `${n.note}${n.octave}` === targetScale.notes[i]).length;
    setScore(s => s + correct * 10);
    
    if (round < 8) {
      setRound(r => r + 1);
      setState('prep');
    } else {
      setState('results');
    }
  };

  return (
    <GameShell
      gameName="Scale Drill"
      description="Perform specific scales and chords on demand."
      instructions={[
        "Observe the requested scale/chord name.",
        "Tap 'Start Drill' and play the notes in order.",
        "Accuracy is checked against the standard tuning.",
        "Advanced tier adds a strict time limit."
      ]}
      gameState={state === 'results' ? 'complete' : state === 'idle' ? 'idle' : 'playing'}
      currentRound={round}
      totalRounds={8}
      score={score}
      onStart={handleStart}
      onPauseToggle={() => {}}
      backHref="/skills?tab=music&sub=play"
      breadcrumb={["Music", "Instrumentals", "Scale Drill"]}
    >
      <div className="w-full flex flex-col items-center gap-12">
        {state === 'prep' && (
          <div className="text-center space-y-8 animate-in fade-in">
            <div className="space-y-2">
              <Badge variant="secondary" className="uppercase font-black">Challenge</Badge>
              <h3 className="text-5xl font-black text-primary">{targetScale.name}</h3>
            </div>
            <Button size="lg" className="h-16 px-12 text-xl font-black" onClick={startDrill}>
              Start Drill
            </Button>
          </div>
        )}

        {state === 'playing' && (
          <div className="w-full flex flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center gap-2 max-w-md">
              {targetScale.notes.map((n, i) => (
                <div key={i} className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center border-2",
                  noteHistory[i] ? "border-primary bg-primary/10" : "border-muted opacity-40"
                )}>
                  <span className="text-[10px] font-bold">{noteHistory[i] ? `${noteHistory[i].note}${noteHistory[i].octave}` : n}</span>
                </div>
              ))}
            </div>
            <Button size="lg" onClick={finalize} disabled={noteHistory.length < targetScale.notes.length}>Submit Sequence</Button>
          </div>
        )}
      </div>
    </GameShell>
  );
}
