
'use client';

import { useState, useEffect } from 'react';
import { GameShell } from '@/components/game/GameShell';
import { MicPermissionGate } from '@/components/audio/MicPermissionGate';
import { useMicrophone } from '@/hooks/useMicrophone';
import { useRecordAndPlayback } from '@/hooks/useRecordAndPlayback';
import { useOnsetDetection } from '@/hooks/useOnsetDetection';
import { useVolumeLevel } from '@/hooks/useVolumeLevel';
import { WaveformDisplay } from '@/components/audio/WaveformDisplay';
import { VolumeMeter } from '@/components/audio/VolumeMeter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, X, RotateCcw, Activity, Mic, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FreestyleSandboxPage() {
  const [gameState, setGameState] = useState<'idle' | 'recording' | 'review'>('idle');
  
  const { stream, requestPermission } = useMicrophone();
  const { startRecording, stopRecording, playBack, isRecording, isPlaying, duration } = useRecordAndPlayback(stream);
  const { onsetCount } = useOnsetDetection(stream);
  const { volumeNormalized } = useVolumeLevel(stream);

  const handleStart = async () => {
    if (!stream) await requestPermission();
    setGameState('recording');
    startRecording();
  };

  const handleStop = () => {
    stopRecording();
    setGameState('review');
  };

  return (
    <div className="container max-w-4xl mx-auto py-12 space-y-12 animate-in fade-in">
      <div className="text-center space-y-4">
        <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto text-primary">
          <Sparkles className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter">Freestyle Sandbox</h1>
        <p className="text-muted-foreground text-lg">Open creative protocol with real-time biometric feedback.</p>
      </div>

      <MicPermissionGate>
        <Card className="overflow-hidden border-primary/10 shadow-2xl">
          <CardContent className="p-12 flex flex-col items-center gap-12 bg-card relative">
            {gameState === 'idle' && (
              <div className="text-center space-y-6">
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">No rules. No scoring. Just sound and space.</p>
                <Button size="lg" className="h-20 w-20 rounded-full shadow-2xl" onClick={handleStart}>
                  <Play className="w-8 h-8 fill-current" />
                </Button>
              </div>
            )}

            {gameState === 'recording' && (
              <div className="w-full space-y-12">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
                    <span className="text-sm font-black uppercase tracking-widest">Recording Pulse</span>
                  </div>
                  <Badge variant="outline" className="h-6 px-3">{onsetCount} ONSETS</Badge>
                </div>

                <div className="flex items-center gap-8 w-full">
                  <VolumeMeter volumeNormalized={volumeNormalized} className="h-64" />
                  <WaveformDisplay stream={stream} className="flex-1 h-64 bg-muted/20 rounded-3xl border border-primary/5" />
                </div>

                <Button variant="destructive" size="lg" className="w-full h-16 font-bold text-lg rounded-2xl" onClick={handleStop}>
                  End Session
                </Button>
              </div>
            )}

            {gameState === 'review' && (
              <div className="text-center space-y-8 animate-in zoom-in-95">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase">Capture Complete</h3>
                  <p className="text-muted-foreground text-sm">{Math.round(duration)}s recorded locally.</p>
                </div>
                
                <div className="flex gap-4">
                  <Button size="lg" onClick={playBack} disabled={isPlaying} className="h-16 px-12 gap-3 font-bold">
                    {isPlaying ? <Activity className="animate-pulse" /> : <Play className="fill-current" />}
                    Play Back
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => setGameState('idle')} className="h-16 px-12 font-bold border-2">
                    <RotateCcw className="w-5 h-5 mr-2" /> Start New
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
