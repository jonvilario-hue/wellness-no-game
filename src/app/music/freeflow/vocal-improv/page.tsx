
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { GameShell } from '@/components/game/GameShell';
import { MicPermissionGate } from '@/components/audio/MicPermissionGate';
import { useMicrophone } from '@/hooks/useMicrophone';
import { useRealtimePitch } from '@/hooks/useRealtimePitch';
import { PitchMeter } from '@/components/audio/PitchMeter';
import { WaveformDisplay } from '@/components/audio/WaveformDisplay';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { audioEngine } from '@/lib/audio/engine';
import { Scale, Note } from '@tonaljs/tonal';
import { cn } from '@/lib/utils';
import { initDB } from '@/lib/storage/db';
import { Play, Sparkles } from 'lucide-react';

export default function VocalImprovPage() {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'summary'>('setup');
  const [config, setConfig] = useState({
    key: 'C',
    mode: 'major',
    backing: 'Loop',
    duration: 2
  });
  const [timeLeft, setTimeLeft] = useState(120);

  const { stream, requestPermission } = useMicrophone();
  const pitchData = useRealtimePitch(stream);

  const scaleNotes = useMemo(() => {
    return Scale.get(`${config.key} ${config.mode}`).notes;
  }, [config.key, config.mode]);

  const handleStart = async () => {
    await audioEngine.initialize();
    if (!stream) await requestPermission();
    setTimeLeft(config.duration * 60);
    setGameState('playing');
    
    // Start Backing
    if (config.backing === 'Loop') {
      audioEngine.playSequence([`${config.key}2`, `${config.key}3`], '4n');
    }
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('summary');
    }
  }, [gameState, timeLeft]);

  const finish = async () => {
    const db = await initDB();
    await db.add('sessions', {
      gameName: 'freeflow-vocal-improv',
      date: new Date().toISOString(),
      score: 0,
      config
    });
    setGameState('setup');
  };

  if (gameState === 'setup') {
    return (
      <div className="container max-w-xl mx-auto py-12 px-4 space-y-8 animate-in fade-in">
        <div className="text-center space-y-2">
          <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto text-primary mb-2">
            <Sparkles className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Melodic Freeflow</h1>
          <p className="text-muted-foreground">No right notes. Just ride the harmony.</p>
        </div>

        <Card className="p-6 space-y-6 border-primary/10 shadow-xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Root Key</Label>
              <Select value={config.key} onValueChange={v => setConfig({...config, key: v})}>
                <SelectTrigger className="h-10 font-bold"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['C', 'G', 'D', 'F', 'Bb', 'A'].map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Modal Flavor</Label>
              <Select value={config.mode} onValueChange={v => setConfig({...config, mode: v})}>
                <SelectTrigger className="h-10 font-bold"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['major', 'minor', 'dorian', 'mixolydian', 'blues'].map(m => <SelectItem key={m} value={m} className="capitalize">{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Duration</Label>
              <span className="text-xs font-black text-primary">{config.duration}m</span>
            </div>
            <Slider value={[config.duration]} onValueChange={([v]) => setConfig({...config, duration: v})} min={1} max={10} step={1} />
          </div>

          <Button size="lg" className="w-full h-14 font-black text-lg shadow-lg shadow-primary/20" onClick={handleStart}>
            Launch Flow <Play className="ml-2 w-4 h-4 fill-current" />
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <GameShell
      gameName="Melodic Freeflow"
      description="Improvisational protocol active. No grading."
      instructions={["Sing or hum freely over the backing track.", "Use the scale guide to find landing notes."]}
      variant="flow"
      gameState={gameState === 'summary' ? 'complete' : 'playing'}
      currentRound={1}
      totalRounds={1}
      score={0}
      onStart={() => {}}
      onPauseToggle={() => {}}
      backHref="/skills?tab=music&sub=freeflow"
      breadcrumb={["Music", "Freeflow", "Melodic Freeflow"]}
    >
      <div className="w-full flex flex-col items-center gap-12">
        <div className="flex flex-wrap justify-center gap-2">
          {scaleNotes.map(n => (
            <Badge 
              key={n} 
              variant={pitchData.currentNote === n ? 'default' : 'outline'}
              className={cn(
                "text-lg px-4 py-1 transition-all",
                pitchData.currentNote === n && "scale-110 shadow-lg"
              )}
            >
              {n}
            </Badge>
          ))}
        </div>

        <PitchMeter cents={pitchData.centsOff} noteName={pitchData.currentNote} octave={pitchData.currentOctave} isDetecting={pitchData.isDetecting} />
        
        <WaveformDisplay stream={stream} className="h-32 w-full bg-muted/20 rounded-3xl border border-primary/5" />

        <div className="text-center font-mono text-4xl font-black">
          {Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2, '0')}
        </div>
        
        {gameState === 'summary' && (
          <Button onClick={finish} size="lg" className="mt-4 font-bold h-12 px-12">Return to Hub</Button>
        )}
      </div>
    </GameShell>
  );
}
