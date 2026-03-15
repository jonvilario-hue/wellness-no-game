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

export default function VocalImprovPage() {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'summary'>('setup');
  const [config, setConfig] = useState({
    key: 'C',
    mode: 'major',
    backing: 'Loop',
    duration: 2
  });
  const [timeLeft, setTimeLeft] = useState(120);
  const [scoreData, setScoreData] = useState({ inKeyTime: 0, totalTime: 0 });

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
    setScoreData({ inKeyTime: 0, totalTime: 0 });
    
    // Start Backing
    if (config.backing === 'Loop') {
      audioEngine.playSequence([`${config.key}2`, `${config.key}3`], '4n');
    }
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(t => t - 1);
        
        if (pitchData.isDetecting) {
          const noteInScale = scaleNotes.includes(pitchData.currentNote);
          setScoreData(prev => ({
            totalTime: prev.totalTime + 1,
            inKeyTime: prev.inKeyTime + (noteInScale ? 1 : 0)
          }));
        }
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('summary');
    }
  }, [gameState, timeLeft, pitchData, scaleNotes]);

  const finish = async () => {
    const db = await initDB();
    await db.add('sessions', {
      gameName: 'create-vocal-improv',
      date: new Date().toISOString(),
      accuracy: Math.round((scoreData.inKeyTime / scoreData.totalTime) * 100) || 0,
      config
    });
    // Redirect logic would go here
  };

  if (gameState === 'setup') {
    return (
      <div className="container max-w-xl mx-auto py-12 px-4 space-y-8 animate-in fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black uppercase">Improv Architecture</h1>
          <p className="text-muted-foreground">Calibrate your sonic environment.</p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Root Key</Label>
              <Select value={config.key} onValueChange={v => setConfig({...config, key: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['C', 'G', 'D', 'F', 'Bb', 'A'].map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Modal Flavor</Label>
              <Select value={config.mode} onValueChange={v => setConfig({...config, mode: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['major', 'minor', 'dorian', 'mixolydian', 'blues'].map(m => <SelectItem key={m} value={m} className="capitalize">{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase">Duration: {config.duration} Minutes</Label>
            <Slider value={[config.duration]} onValueChange={([v]) => setConfig({...config, duration: v})} min={1} max={10} step={1} />
          </div>

          <Button size="lg" className="w-full h-14 font-bold text-lg" onClick={handleStart}>Initialize Lab</Button>
        </Card>
      </div>
    );
  }

  return (
    <GameShell
      gameName="Vocal Improv"
      description="Improvisational protocol active."
      instructions={["Sing freely over the backing track.", "Use the scale guide to find consonant landing notes."]}
      gameState={gameState === 'summary' ? 'complete' : 'playing'}
      currentRound={1}
      totalRounds={1}
      score={0}
      onStart={() => {}}
      onPauseToggle={() => {}}
      backHref="/music/create"
      breadcrumb={["Music", "Create", "Vocal Improv"]}
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
      </div>
    </GameShell>
  );
}
