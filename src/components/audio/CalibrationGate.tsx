
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMusicStore } from '@/hooks/use-music-store';
import { useMicrophone } from '@/hooks/useMicrophone';
import { useRealtimePitch } from '@/hooks/useRealtimePitch';
import { Mic, Music, CheckCircle2, Sliders, ChevronDown, Info } from 'lucide-react';
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

  const { stream, requestPermission } = useMicrophone();
  const pitchData = useRealtimePitch(stream);

  const isCalibrated = calibratedInstruments.includes(selectedInstrument);

  useEffect(() => {
    if (isCalibrating && pitchData.isDetecting) {
      setProgress(prev => {
        const next = prev + 5;
        if (next >= 100) {
          setCalibrated(selectedInstrument);
          setIsCalibrating(false);
          return 100;
        }
        return next;
      });
    }
  }, [isCalibrating, pitchData.isDetecting, selectedInstrument, setCalibrated]);

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
            Help the lab listen to your instrument correctly.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8 space-y-6">
          {!isCalibrating ? (
            <div className="space-y-6">
              <p className="text-sm text-center text-muted-foreground px-4">
                We need to adjust the sensors for your <b>{selectedInstrument}</b>. 
                This ensures the pitch and rhythm detection is accurate.
              </p>
              <Button onClick={startCal} className="w-full h-14 text-lg font-bold shadow-lg" size="lg">
                Start Calibration
              </Button>
            </div>
          ) : (
            <div className="space-y-8 py-4 text-center animate-in zoom-in-95">
              <div className="space-y-2">
                <h3 className="text-xl font-bold uppercase tracking-tight">Play any few notes...</h3>
                <p className="text-xs text-muted-foreground">Keep playing until the meter fills up.</p>
              </div>
              
              <div className="space-y-4">
                <Progress value={progress} className="h-3" />
                <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground px-1">
                  <span>Listening</span>
                  <span>{progress}%</span>
                </div>
              </div>

              <div className={cn(
                "p-6 rounded-2xl border-2 transition-all duration-500 flex flex-col items-center gap-2",
                pitchData.isDetecting ? "bg-primary/5 border-primary animate-pulse" : "bg-muted border-transparent"
              )}>
                {pitchData.isDetecting ? (
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                ) : (
                  <Mic className="w-10 h-10 text-muted-foreground/40" />
                )}
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {pitchData.isDetecting ? 'Signal Detected' : 'Waiting for Sound'}
                </span>
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
                  <Info className="w-4 h-4 text-primary shrink-0" />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Every instrument has a unique "Harmonic Signature." A violin produces high-frequency overtones that can confuse a standard listener, while a piano has a sharp "attack" when a note starts.
                  </p>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground pl-7 border-l-2 border-primary/10">
                  By calibrating, we adjust the <b>mathematical sensitivity</b> of our DSP engine to match your specific hardware, resulting in reliable real-time feedback.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  );
}
