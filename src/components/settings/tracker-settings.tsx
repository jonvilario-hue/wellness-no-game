
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RefreshCw, Smile, Target, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';

export function TrackerSettings() {
    const { settings, toggleSetting } = useDashboardSettings();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Trackers</CardTitle>
                <CardDescription>
                    Enable or disable specific tracking modules within your journal entries and tools.
                </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <Label htmlFor="habit-tracker-switch" className="flex items-center gap-3 font-medium">
                        <ClipboardCheck className="w-5 h-5 text-primary" />
                        <div>
                            Enable Habit Tracker
                            <p className="text-xs text-muted-foreground font-normal">Track daily habits and consistency.</p>
                        </div>
                    </Label>
                    <Switch
                        id="habit-tracker-switch"
                        checked={settings.habitTracker}
                        onCheckedChange={() => toggleSetting('habitTracker')}
                    />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <Label htmlFor="mood-tracker-switch" className="flex items-center gap-3 font-medium">
                        <Smile className="w-5 h-5 text-primary" />
                        <div>
                            Enable Mood Tracker
                            <p className="text-xs text-muted-foreground font-normal">Log your mood with each journal entry.</p>
                        </div>
                    </Label>
                    <Switch
                        id="mood-tracker-switch"
                        checked={settings.moodTracker}
                        onCheckedChange={() => toggleSetting('moodTracker')}
                    />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <Label htmlFor="effort-tracker-switch" className="flex items-center gap-3 font-medium">
                        <Target className="w-5 h-5 text-primary" />
                        <div>
                            Enable Effort/Focus Tracker
                            <p className="text-xs text-muted-foreground font-normal">Rate your focus level for each entry.</p>
                        </div>
                    </Label>
                    <Switch
                        id="effort-tracker-switch"
                        checked={settings.effortTracker}
                        onCheckedChange={() => toggleSetting('effortTracker')}
                    />
                </div>
              </div>
            </CardContent>
        </Card>
    );
}
