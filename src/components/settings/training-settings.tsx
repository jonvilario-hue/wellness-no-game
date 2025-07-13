
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTrainingFocus } from '@/hooks/use-training-focus';
import { BrainCircuit, Sigma } from 'lucide-react';
import { Separator } from '../ui/separator';

export function TrainingSettings() {
    const { focus, setFocus, isLoaded } = useTrainingFocus();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Training Preferences</CardTitle>
                <CardDescription>
                    Adjust how your training sessions are configured and presented.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <Label className="font-medium">Training Focus</Label>
                    <p className="text-xs text-muted-foreground font-normal mb-2">Select a content overlay to adapt games for specific skill transfer.</p>
                     <RadioGroup 
                        value={isLoaded ? focus : 'neutral'} 
                        onValueChange={(value) => setFocus(value as 'neutral' | 'math')} 
                        className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                        disabled={!isLoaded}
                    >
                        <Label htmlFor="neutral-mode" className="flex items-start space-x-2 p-3 rounded-lg bg-muted/50 border-2 border-transparent has-[:checked]:border-primary cursor-pointer">
                            <RadioGroupItem value="neutral" id="neutral-mode" className="mt-1" />
                            <div className='-mt-1'>
                                <div className="font-semibold flex items-center gap-2">
                                    <BrainCircuit className="w-4 h-4" />
                                    Core Thinking
                                </div>
                                <p className="text-xs text-muted-foreground">Classic abstract and symbolic puzzles to train core cognitive functions.</p>
                            </div>
                        </Label>
                        <Label htmlFor="math-mode" className="flex items-start space-x-2 p-3 rounded-lg bg-muted/50 border-2 border-transparent has-[:checked]:border-primary cursor-pointer">
                            <RadioGroupItem value="math" id="math-mode" className="mt-1" />
                             <div className='-mt-1'>
                                <div className="font-semibold flex items-center gap-2">
                                     <Sigma className="w-4 h-4" />
                                    Math Reasoning
                                </div>
                                <p className="text-xs text-muted-foreground">Adapt games to use number patterns and logic to train both cognition and math skills.</p>
                            </div>
                        </Label>
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
                
                <div>
                    <Label className="font-medium">Default Session Length</Label>
                    <RadioGroup defaultValue="standard" className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted/50">
                            <RadioGroupItem value="short" id="short" />
                            <Label htmlFor="short">Short (~5 mins)</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted/50">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard">Standard (~10 mins)</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted/50">
                            <RadioGroupItem value="long" id="long" />
                            <Label htmlFor="long">Long (~15 mins)</Label>
                        </div>
                    </RadioGroup>
                </div>
            </CardContent>
        </Card>
    );
}
