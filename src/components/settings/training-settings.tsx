
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTrainingFocus } from '@/hooks/use-training-focus';
import { useMusicStore } from '@/hooks/use-music-store';
import { Brain, Music, Sliders, RotateCcw, Info } from 'lucide-react';
import { Separator } from '../ui/separator';
import { SigmaIcon } from '../icons';
import { Button } from '../ui/button';
import { InstrumentSelector, instruments } from '../audio/InstrumentSelector';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export function TrainingSettings() {
    const { focus, setFocus, isLoaded } = useTrainingFocus();
    const { selectedInstrument, calibratedInstruments, resetCalibration } = useMusicStore();
    const [isWhyOpen, setIsWhyOpen] = useState(false);

    const isCalibrated = calibratedInstruments.includes(selectedInstrument);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Game Training Preferences</CardTitle>
                    <CardDescription>
                        Adjust how your training sessions are configured and presented.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold">Training Focus</Label>
                      <p className="text-sm text-muted-foreground mb-4">Choose your primary focus to tailor the content of the games.</p>
                      <RadioGroup value={focus} onValueChange={(value) => setFocus(value as any)} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <div>
                            <Label htmlFor="core-thinking" className="flex items-start gap-4 p-4 rounded-lg border cursor-pointer has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary h-full">
                                 <RadioGroupItem value="neutral" id="core-thinking" className="mt-1"/>
                                 <div className="space-y-1">
                                    <div className="font-semibold flex items-center gap-2">
                                        <Brain className="w-5 h-5"/> Core Thinking
                                    </div>
                                    <p className="text-xs text-muted-foreground">Train cognitive skills with abstract, symbolic puzzles.</p>
                                 </div>
                            </Label>
                         </div>
                         <div>
                            <Label htmlFor="math-reasoning" className="flex items-start gap-4 p-4 rounded-lg border cursor-pointer has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary h-full">
                                 <RadioGroupItem value="math" id="math-reasoning" className="mt-1"/>
                                 <div className="space-y-1">
                                    <div className="font-semibold flex items-center gap-2">
                                        <SigmaIcon className="w-5 h-5"/> Math Reasoning
                                    </div>
                                    <p className="text-xs text-muted-foreground">Train cognitive skills and mathematical logic simultaneously.</p>
                                 </div>
                            </Label>
                         </div>
                         <div>
                            <Label htmlFor="music-cognition" className="flex items-start gap-4 p-4 rounded-lg border cursor-pointer has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary h-full">
                                 <RadioGroupItem value="music" id="music-cognition" className="mt-1"/>
                                 <div className="space-y-1">
                                    <div className="font-semibold flex items-center gap-2">
                                        <Music className="w-5 h-5"/> Music Cognition
                                    </div>
                                    <p className="text-xs text-muted-foreground">Train skills through auditory, rhythmic, and music theory challenges.</p>
                                 </div>
                            </Label>
                         </div>
                      </RadioGroup>
                    </div>

                    <Separator />
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <Label htmlFor="adaptive-difficulty-switch" className="font-medium">
                           Allow Adaptive Difficulty
                           <p className="text-xs text-muted-foreground font-normal">Automatically adjust puzzle difficulty based on your performance.</p>
                        </Label>
                        <Switch
                            id="adaptive-difficulty-switch"
                            defaultChecked
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="border-primary/10">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sliders className="w-5 h-5 text-primary" />
                        Instrument & Calibration
                    </CardTitle>
                    <CardDescription>Configure how the lab listens to your physical instruments.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6 p-4 bg-muted/20 rounded-xl border border-primary/5">
                        <div className="space-y-1 text-center sm:text-left">
                            <p className="text-sm font-bold uppercase tracking-tight">Active Hardware</p>
                            <p className="text-xs text-muted-foreground">Choose the instrument you use for performance drills.</p>
                        </div>
                        <InstrumentSelector />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl border border-dashed">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-bold uppercase">Calibration Status</p>
                                <Badge variant={isCalibrated ? 'success' : 'secondary'} className={cn("text-[8px] h-4 font-black uppercase", isCalibrated ? "bg-green-500/10 text-green-600" : "")}>
                                    {isCalibrated ? 'Tuned' : 'Pending'}
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">Calibration is stored per-instrument.</p>
                        </div>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-9 gap-2 font-bold"
                            onClick={() => resetCalibration(selectedInstrument)}
                            disabled={!isCalibrated}
                        >
                            <RotateCcw className="w-3.5 h-3.5" /> Force Reset
                        </Button>
                    </div>

                    <Collapsible open={isWhyOpen} onOpenChange={setIsWhyOpen} className="border-t pt-4">
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="w-full justify-between h-8 text-[10px] uppercase font-black text-muted-foreground">
                                <span>How detection works</span>
                                <Info className="w-3 h-3" />
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pt-4 space-y-4">
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                The Music Lab uses deterministic <b>Digital Signal Processing (DSP)</b>—not AI—to provide zero-latency feedback. We use mathematical <b>Autocorrelation</b> to find pitch and <b>RMS Thresholding</b> to detect rhythm.
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Every instrument has unique overtones and attack profiles. Calibration adjusts the math to ensure a violin's high partials or a piano's sharp strikes don't cause false detections.
                            </p>
                        </CollapsibleContent>
                    </Collapsible>
                </CardContent>
            </Card>
        </div>
    );
}
