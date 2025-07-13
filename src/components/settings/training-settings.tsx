
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function TrainingSettings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Training Preferences</CardTitle>
                <CardDescription>
                    Adjust how your training sessions are configured.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
