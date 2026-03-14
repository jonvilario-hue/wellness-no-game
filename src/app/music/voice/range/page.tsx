'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { GameShell } from '@/components/game/GameShell';
import { PitchMeter } from '@/components/audio/PitchMeter';
import { MicPermissionGate } from '@/components/audio/MicPermissionGate';
import { useMicrophone } from '@/hooks/useMicrophone';
import { useRealtimePitch } from '@/hooks/useRealtimePitch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Maximize, Play, CheckCircle2, History, TrendingUp, Music, ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { initDB } from '@/lib/storage/db';
import { motion, AnimatePresence } from 'framer-motion';

type Mode = 'find' | 'stretch';
type GameState = 'idle' | 'running' | 'results';

export default function RangeBuilderPage() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [mode, setMode] = useState<Mode>('find');
  const [lowestNote, setLowestNote] = useState<{ note: string, midi: number } | null>(null);
  const [highestNote, setHighestNote] = useState<{ note: string, midi: number } | null>(null);
  const [explorationStep, setStep] = useState<'comfortable' | 'low' | 'high'>('comfortable');

  const { stream, requestPermission } = useMicrophone();
  const pitchData = useRealtimePitch(stream, 0.85);

  const startMode = async (m: Mode) => {
    if (!stream) await requestPermission();
    setMode(m);
    setGameState('running');
    setStep('comfortable');
    setLowestNote(null);
    setHighestNote(null);
  };

  useEffect(() => {
    if (gameState === 'running' && mode === 'find' && pitchData.isDetecting) {
      const midi = pitchData.currentOctave * 12 + ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'].indexOf(pitchData.currentNote);
      
      if (explorationStep === 'low') {
        if (!lowestNote || midi < lowestNote.midi) {
          setLowestNote({ note: `${pitchData.currentNote}${pitchData.currentOctave}`, midi });
        }
      } else if (explorationStep === 'high') {
        if (!highestNote || midi > highestNote.midi) {
          setHighestNote({ note: `${pitchData.currentNote}${pitchData.currentOctave}`, midi });
        }
      }
    }
  }, [gameState, mode, explorationStep, pitchData, lowestNote, highestNote]);

  const finishFind = async () => {
    setGameState('results');
    if (lowestNote && highestNote) {
      const db = await initDB();
      await db.put('calibration', {
        key: 'vocalRange',
        lowest: lowestNote,
        highest: highestNote,
        span: highestNote.midi - lowestNote.midi,
        updatedAt: new Date().toISOString()
      });
    }
  };

  return (
    <GameShell
      gameName="Range Builder"
      description="Safely explore and expand your vocal tessitura."
      instructions={[
        "Start with 'Find Your Range' to establish your current baseline.",
        "Don't push your voice to the point of pain or strain.",
        "For low notes: keep your chin level and chest open.",
        "For high notes: imagine the sound arching over your head."
      ]}
      gameState={gameState === 'results' ? 'complete' : gameState === 'idle' ? 'idle' : 'playing'}
      currentRound={explorationStep === 'comfortable' ? 1 : explorationStep === 'low' ? 2 : 3}
      totalRounds={3}
      score={highestNote && lowestNote ? highestNote.midi - lowestNote.midi : 0}
      onStart={() => setGameState('idle')} // Manual trigger
      onPauseToggle={() => {}}
      backHref="/music/voice"
      breadcrumb={["Music", "Voice", "Range Builder"]}
    >
      <MicPermissionGate>
        <div className="w-full flex flex-col items-center gap-8">
          {gameState === 'idle' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
              <Button variant="outline" className="h-48 flex flex-col gap-4 border-2" onClick={() => startMode('find')}>
                <div className="p-4 bg-primary/10 rounded-full text-primary"><Music className="w-8 h-8" /></div>
                <div className="text-center">
                  <p className="font-black text-lg uppercase">Find Your Range</p>
                  <p className="text-xs opacity-60">Establish your baseline low and high notes.</p>
                </div>
              </Button>
              <Button variant="outline" className="h-48 flex flex-col gap-4 border-2 opacity-50 cursor-not-allowed">
                <div className="p-4 bg-muted rounded-full"><TrendingUp className="w-8 h-8" /></div>
                <div className="text-center">
                  <p className="font-black text-lg uppercase">Range Stretcher</p>
                  <p className="text-xs opacity-60">Safely expand your boundaries (Coming Soon).</p>
                </div>
              </Button>
            </div>
          )}

          {gameState === 'running' && mode === 'find' && (
            <div className="w-full flex flex-col items-center gap-12 animate-in fade-in">
              <div className="text-center space-y-4">
                <Badge className="bg-primary text-white uppercase text-xs font-black tracking-widest">
                  {explorationStep === 'comfortable' ? 'Step 1: Baseline' : explorationStep === 'low' ? 'Step 2: Descend' : 'Step 3: Ascend'}
                </Badge>
                <h3 className="text-3xl font-bold">
                  {explorationStep === 'comfortable' && "Sing any comfortable note..."}
                  {explorationStep === 'low' && "Slowly slide to your lowest note..."}
                  {explorationStep === 'high' && "Slowly slide to your highest note..."}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-8 w-full max-w-lg">
                <div className="p-6 rounded-3xl bg-muted/30 border-2 border-primary/5 text-center space-y-2">
                  <p className="text-[10px] font-black uppercase opacity-40">Current Lowest</p>
                  <p className="text-4xl font-black text-primary">{lowestNote?.note || '--'}</p>
                </div>
                <div className="p-6 rounded-3xl bg-muted/30 border-2 border-primary/5 text-center space-y-2">
                  <p className="text-[10px] font-black uppercase opacity-40">Current Highest</p>
                  <p className="text-4xl font-black text-primary">{highestNote?.note || '--'}</p>
                </div>
              </div>

              <PitchMeter 
                cents={pitchData.centsOff} 
                noteName={pitchData.currentNote} 
                octave={pitchData.currentOctave} 
                isDetecting={pitchData.isDetecting} 
              />

              <div className="flex gap-4">
                {explorationStep === 'comfortable' && <Button size="lg" className="px-12 font-bold h-14" onClick={() => setStep('low')}>Locked - Go Low <ArrowDown className="ml-2" /></Button>}
                {explorationStep === 'low' && <Button size="lg" className="px-12 font-bold h-14" onClick={() => setStep('high')}>Locked - Go High <ArrowUp className="ml-2" /></Button>}
                {explorationStep === 'high' && <Button size="lg" className="px-12 font-bold h-14" onClick={finishFind}>Finish & Save Range</Button>}
              </div>
            </div>
          )}
        </div>
      </MicPermissionGate>
    </GameShell>
  );
}
