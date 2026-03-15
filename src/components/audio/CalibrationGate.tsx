
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMusicStore } from '@/hooks/use-music-store';
import { useMicrophone } from '@/hooks/useMicrophone';
import { useRealtimePitch } from '@/hooks/useRealtimePitch';
import { useVolumeLevel } from '@/hooks/useVolumeLevel';
import { Mic, Music, CheckCircle2, Sliders, ChevronDown, Info, ShieldAlert, VolumeX, Volume2, Zap } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface CalibrationGateProps {
  children: React.ReactNode;
}

export function CalibrationGate({ children }: CalibrationGateProps) {
  const { selectedInstrument, calibratedInstruments, setCalibrated } = useMusicStore();
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const { stream, requestPermission, error: micError } = useMicrophone();
  const { volumeNormalized, volumeDb } = useVolumeLevel(stream);
  const pitchData = useRealtimePitch(stream);

  const isCalibrated = calibratedInstruments.includes(selectedInstrument);

  // Environmental checks
  const isTooQuiet = isCalibrating && !pitchData.isDetecting && volumeDb < -45 && volumeDb > -100;
  const isTooNoisy = isCalibrating && !pitchData.isDetecting && volumeDb > -20;
  const isClipping = isCalibrating && volumeDb > -2;

  useEffect(() => {
    if (isCalibrating && pitchData.isDetecting && !isClipping && !isTooNoisy) {
      setProgress(prev => {
        const next = prev + 4;
        if (next >= 100) {
          setCalibrated(selectedInstrument);
          setIsCalibrating(false);
          return 100;
        }
        return next;
      });
    }
  }, [isCalibrating, pitchData.isDetecting, selectedInstrument, setCalibrated, isClipping, isTooNoisy]);

  if (isCalibrated) {
    return <>{children}</>;
  }

  const startCal = async () => {
    if (!stream) await requestPermission();
    setIsCalibrating(true);
    setProgress(0);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 animate-in fade-in duration-500">
      <Card className="border-primary/20 shadow-2xl overflow-hidden">
        <CardHeader className="bg-primary/5 text-center pb-8">
          <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
            <Sliders className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-black uppercase tracking-tight">Quick Tune</CardTitle>
          <CardDescription>
            Tuning the lab to your {selectedInstrument}.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-8 space-y-6">
          {!isCalibrating ? (
            <div className="space-y-6">
              <p className="text-sm text-center text-muted-foreground px-4 leading-relaxed">
                Play a few notes so we can tune the listener to your instrument. This ensures the best response time during your practice.
              </p>
              <Button onClick={startCal} className="w-full h-14 text-lg font-bold shadow-lg" size="lg">
                Start Tuning
              </Button>
            </div>
          ) : (
            <div className="space-y-8 py-4 text-center animate-in zoom-in-95">
              <div className="space-y-2">
                <h3 className="text-xl font-bold uppercase tracking-tight">
                  {progress < 100 ? "Play a few notes..." : "Tuning Complete!"}
                </h3>
                <p className="text-xs text-muted-foreground">Keep playing until the meter fills up.</p>
              </div>
              
              <div className="space-y-4">
                <Progress value={progress} className="h-3" />
                <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground px-1">
                  <span>Listening</span>
                  <span>{progress}%</span>
                </div>
              </div>

              {/* Environmental Feedback */}
              <div className="min-h-[80px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {micError ? (
                    <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-xl flex items-start gap-3 text-left">
                      <ShieldAlert className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                      <p className="text-xs font-medium text-destructive">Microphone Access Required. Please enable it in your browser settings to continue.</p>
                    </div>
                  ) : isClipping ? (
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-3 text-left animate-pulse">
                      <Volume2 className="w-5 h-5 text-amber-600 shrink-0" />
                      <p className="text-xs font-bold text-amber-700 uppercase">Audio clipping. Turn down your volume or move away from the mic.</p>
                    </div>
                  ) : isTooNoisy ? (
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-3 text-left">
                      <Volume2 className="w-5 h-5 text-amber-600 shrink-0" />
                      <p className="text-xs font-bold text-amber-700 uppercase">High background noise detected. Find a quieter space.</p>
                    </div>
                  ) : isTooQuiet && progress > 0 ? (
                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl flex items-center gap-3 text-left">
                      <VolumeX className="w-5 h-5 text-primary shrink-0" />
                      <p className="text-xs font-bold text-primary uppercase">Signal too low. Move closer or turn up your instrument.</p>
                    </div>
                  ) : (
                    <div className={cn(
                      "p-6 w-full rounded-2xl border-2 transition-all duration-500 flex flex-col items-center gap-2",
                      pitchData.isDetecting ? "bg-primary/5 border-primary animate-pulse" : "bg-muted border-transparent"
                    )}>
                      {pitchData.isDetecting ? (
                        <>
                          <CheckCircle2 className="w-10 h-10 text-primary" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary">Signal Detected: {pitchData.currentNote}{pitchData.currentOctave}</span>
                        </>
                      ) : (
                        <>
                          <Mic className="w-10 h-10 text-muted-foreground/40" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Waiting for Sound</span>
                        </>
                      )}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          <Collapsible open={isHelpOpen} onOpenChange={setIsHelpOpen} className="border-t pt-4">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-between h-8 text-[10px] uppercase font-black text-muted-foreground">
                <span>Why does this matter?</span>
                <ChevronDown className={cn("w-3 h-3 transition-transform", isHelpOpen && "rotate-180")} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <div className="p-4 bg-muted/30 rounded-xl space-y-3">
                <div className="flex gap-3">
                  <Zap className="w-4 h-4 text-primary shrink-0" />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Every instrument creates sound differently. By tuning the lab, we adjust our sensors to match your specific hardware.
                  </p>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground pl-7 border-l-2 border-primary/10">
                  This results in <b>faster response times</b> and fewer "false" notes caused by background noise or complex room echoes.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  );
}
