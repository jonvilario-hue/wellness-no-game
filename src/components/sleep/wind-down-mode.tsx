
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Volume2, VolumeX, Wind, Play, Pause, RotateCcw, Brain, CheckCircle2 } from 'lucide-react';
import { useSleepProStore } from '@/hooks/use-sleep-pro-store';
import { Slider } from '@/components/ui/slider';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function WindDownMode() {
  const [isActive, setIsActive] = useState(false);
  const { settings, updateSettings, generateSimulatedNight } = useSleepProStore();
  const [volume, setVolume] = useState(50);
  const [breathingStep, setBreathingStep] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Hold' | null>(null);
  
  // Simulated breathing loop
  useEffect(() => {
    if (!isActive) {
      setBreathingStep(null);
      return;
    }
    
    let step = 0;
    const steps: ('Inhale' | 'Hold' | 'Exhale' | 'Hold')[] = ['Inhale', 'Hold', 'Exhale', 'Hold'];
    
    const interval = setInterval(() => {
      setBreathingStep(steps[step % 4]);
      step++;
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isActive]);

  const handleStartSleep = () => {
    setIsActive(true);
    // In a real app, this would start the sensor tracking
  };

  const handleWakeUp = () => {
    setIsActive(false);
    generateSimulatedNight();
  };

  return (
    <div className="relative">
      {/* Fullscreen Dimmer Overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[100] flex flex-col items-center justify-center p-6 text-white"
          >
            <div className="space-y-12 text-center max-w-md w-full">
              <div className="space-y-4">
                <Moon className="h-16 w-16 mx-auto text-primary animate-pulse" />
                <h2 className="text-3xl font-black">Rest Mode Active</h2>
                <p className="text-muted-foreground italic">Phone sensors are now monitoring your sleep architecture.</p>
              </div>

              {breathingStep && (
                <div className="space-y-6">
                  <motion.div 
                    key={breathingStep}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    className="text-4xl font-bold text-primary"
                  >
                    {breathingStep}
                  </motion.div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      key={breathingStep + "progress"}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4, ease: "linear" }}
                      className="bg-primary h-full"
                    />
                  </div>
                </div>
              )}

              <div className="pt-12">
                <Button variant="outline" size="lg" onClick={handleWakeUp} className="rounded-full px-12 border-white/20 hover:bg-white/10">
                  Wake Up & End Session
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-primary" />
              Pre-Sleep Environment
            </CardTitle>
            <CardDescription>Configure your auditory and visual wind-down tools.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Soundscape</label>
              <div className="grid grid-cols-3 gap-2">
                {['none', 'white', 'rain', 'waves', 'pink', 'brown'].map(type => (
                  <Button 
                    key={type} 
                    variant={settings.noiseType === type ? 'default' : 'outline'}
                    size="sm"
                    className="capitalize"
                    onClick={() => updateSettings({ noiseType: type as any })}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Volume</label>
                <span className="text-xs font-mono">{volume}%</span>
              </div>
              <div className="flex items-center gap-4">
                <VolumeX className="h-4 w-4 text-muted-foreground" />
                <Slider value={[volume]} onValueChange={([v]) => setVolume(v)} max={100} step={1} className="flex-grow" />
                <Volume2 className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full h-14 text-lg font-bold" onClick={handleStartSleep}>
              <Moon className="mr-2 h-5 w-5" /> Start Sleep Tracking
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Cognitive Cleanse
            </CardTitle>
            <CardDescription>Release the day's loops before closing your eyes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg space-y-3">
              <h4 className="font-bold text-sm">Suggested Journal Prompt:</h4>
              <p className="text-sm italic">"What is one thing that went better than expected today?"</p>
              <Button variant="link" className="p-0 h-auto text-primary" asChild>
                <a href="/journal">Go to Journal →</a>
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-sm">Device light filter active</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-sm">Smart Wake window set: 06:30 - 07:00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
