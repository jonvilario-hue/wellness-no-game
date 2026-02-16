
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Smile, 
  Target, 
  ClipboardCheck, 
  Lightbulb, 
  RefreshCcw,
} from 'lucide-react';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';
import { Button } from '../ui/button';
import { useJournal } from '@/hooks/use-journal';
import { useToast } from '@/hooks/use-toast';

export function TrackerSettings() {
    const { settings, toggleSetting } = useDashboardSettings();
    const { migrateEntries } = useJournal();
    const { toast } = useToast();

    const handleMigration = () => {
        migrateEntries();
        toast({ title: "Migration Complete", description: "All entries now have created and display dates." });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Trackers & Assistance</CardTitle>
                    <CardDescription>
                        Enable or disable specific tracking modules and the contextual assistant.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <Label htmlFor="assistant-mode-switch" className="flex items-center gap-3 font-medium">
                            <Lightbulb className="w-5 h-5 text-primary" />
                            <div>
                                Assistant Mode
                                <p className="text-xs text-muted-foreground font-normal">Show "How it works" explanations and tooltips across the app.</p>
                            </div>
                        </Label>
                        <Switch
                            id="assistant-mode-switch"
                            checked={settings.assistantMode}
                            onCheckedChange={() => toggleSetting('assistantMode')}
                        />
                    </div>
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

            <Card>
                <CardHeader>
                    <CardTitle>Maintenance Tools</CardTitle>
                    <CardDescription>Internal utilities for data health.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="space-y-1">
                            <Label className="text-xs font-bold">Migration Tool</Label>
                            <p className="text-[10px] text-muted-foreground">Sync historical entry timestamps.</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleMigration} className="h-8">
                            <RefreshCcw className="w-3.5 h-3.5 mr-1.5" />
                            Migrate
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
