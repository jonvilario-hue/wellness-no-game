'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { GameShell } from '@/components/game/GameShell';
import { MicPermissionGate } from '@/components/audio/MicPermissionGate';
import { useMicrophone } from '@/hooks/useMicrophone';
import { useVolumeLevel } from '@/hooks/useVolumeLevel';
import { useSpectralAnalysis } from '@/hooks/useSpectralAnalysis';
import { useOnsetDetection } from '@/hooks/useOnsetDetection';
import { WaveformDisplay } from '@/components/audio/WaveformDisplay';
import { BrightnessDisplay } from '@/components/audio/BrightnessDisplay';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { drumKit } from '@/lib/audio/drums';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Drum, Play, Info, Sparkles, CheckCircle2 } from 'lucide-react';

const sounds = [
  { id: 'kick', name: 'Kick', desc: 'Punch of air ("B")', tip: 'Burst lips open' },
  { id: 'snare', name: 'Snare', desc: 'Sharp snap ("Pff")', tip: 'Tongue against palate' },
  { id: 'hihat', name: 'Hi-hat', desc: 'Teeth click ("Ts")', tip: 'Short burst of air' },
];

export default function BeatboxLabPage() {
  const [activeSoundId, setActiveId] = useState('kick');
  const [detectedType, setDetectedType] = useState<string | null>(null);
  
  const { stream, requestPermission } = useMicrophone();
  const { volumeDb, isSilent } = useVolumeLevel(stream);
  const { brightness, spectralCentroid } = useSpectralAnalysis(stream);
  const { lastOnsetTime } = useOnsetDetection(stream);

  useEffect(() => {
    if (lastOnsetTime > 0) {
      // Heuristic Classification
      if (spectralCentroid > 3000) setDetectedType('Hat/Crash');
      else if (spectralCentroid < 1200) setDetectedType('Kick');
      else setDetectedType('Snare');
      
      const timer = setTimeout(() => setDetectedType(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [lastOnsetTime, spectralCentroid]);

  const playRef = () => {
    drumKit.init();
    if (activeSoundId === 'kick') drumKit.kick();
    if (activeSoundId === 'snare') drumKit.snare();
    if (activeSoundId === 'hihat') drumKit.hihat();
  };

  return (
    <GameShell
      gameName="Beatbox Lab"
      description="Practice individual drum sounds and build your vocal percussion kit."
      instructions={[
        "Choose a sound to practice from the list.",
        "Listen to the reference sample.",
        "Try to mimic the sound using your mouth.",
        "The lab will categorize your sound based on its brightness and impact."
      ]}
      gameState="playing"
      currentRound={1}
      totalRounds={1}
      score={0}
      onStart={() => {}}
      onPauseToggle={() => {}}
      backHref="/music/create"
      breadcrumb={["Music", "Create", "Beatbox Lab"]}
    >
      <MicPermissionGate>
        <div className="w-full flex flex-col items-center gap-12">
          <div className="grid grid-cols-3 gap-4 w-full">
            {sounds.map(s => (
              <Button 
                key={s.id} 
                variant={activeSoundId === s.id ? 'default' : 'outline'}
                className="h-24 flex flex-col gap-1 border-2"
                onClick={() => setActiveId(s.id)}
              >
                <span className="font-bold">{s.name}</span>
                <span className="text-[10px] opacity-60">{s.desc}</span>
              </Button>
            ))}
          </div>

          <Card className="w-full border-primary/10 bg-primary/5 p-8 text-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold uppercase tracking-tight">Practice: {activeSoundId}</h3>
              <p className="text-sm text-muted-foreground italic">"{sounds.find(s => s.id === activeSoundId)?.tip}"</p>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button size="lg" className="rounded-full h-16 w-16" onClick={playRef}>
                <Play className="fill-current" />
              </Button>
            </div>
          </Card>

          <div className="w-full space-y-8">
            <WaveformDisplay stream={stream} className="h-24 w-full bg-muted/30 rounded-2xl border border-primary/5" />
            
            <div className="flex flex-col items-center gap-4">
              <AnimatePresence>
                {detectedType && (
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.2, opacity: 0 }}>
                    <Badge className="bg-primary text-white text-lg py-2 px-6 rounded-full shadow-lg">
                      Detected: {detectedType}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
              <BrightnessDisplay brightness={brightness} />
            </div>
          </div>
        </div>
      </MicPermissionGate>
    </GameShell>
  );
}
