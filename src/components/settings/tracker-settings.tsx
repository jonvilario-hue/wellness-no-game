
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Smile, Target, ClipboardCheck, Lightbulb, RefreshCcw, Download, Upload, ShieldAlert, Database } from 'lucide-react';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';
import { Button } from '../ui/button';
import { useJournal } from '@/hooks/use-journal';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

const STORAGE_KEYS = [
  'blueprint-store-local-v1',
  'calendar-plans-storage-v3',
  'flashcard-storage-v3',
  'srs-master-storage-v1',
  'journal-storage-v2',
  'wellness-data-storage-v2',
  'alarm-storage',
  'dashboard-settings-storage-v6',
  'motivation-storage',
  'cognitive-performance-storage',
  'playbook-storage-v2',
  'pomodoro-storage',
  'sleep-pro-storage',
  'stats-storage-v2',
  'library-storage',
  'polymath-lab-ui-settings',
  'calendar-completion-tracker',
  'focusBuilderState',
  'trainingFocus',
];

export function TrackerSettings() {
    const { settings, toggleSetting } = useDashboardSettings();
    const { migrateEntries } = useJournal();
    const { toast } = useToast();
    const [storageUsage, setStorageUsage] = useState<string>('Checking...');

    useEffect(() => {
        if (navigator.storage && navigator.storage.estimate) {
            navigator.storage.estimate().then(estimate => {
                if (estimate.usage !== undefined && estimate.quota !== undefined) {
                    const usageMB = (estimate.usage / (1024 * 1024)).toFixed(2);
                    const quotaMB = (estimate.quota / (1024 * 1024)).toFixed(0);
                    const percent = ((estimate.usage / estimate.quota) * 100).toFixed(1);
                    setStorageUsage(`${usageMB}MB / ${quotaMB}MB (${percent}%)`);
                }
            });
        } else {
            setStorageUsage('Not supported by browser');
        }
    }, []);

    const handleMigration = () => {
        migrateEntries();
        toast({ title: "Migration Complete", description: "All entries now have created and display dates." });
    };

    const handleExport = () => {
        const data: Record<string, string | null> = {};
        STORAGE_KEYS.forEach(key => {
            data[key] = localStorage.getItem(key);
        });
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `polymath-lab-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast({ title: "Export Successful", description: "Your data backup has been downloaded.", variant: "success" });
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target?.result as string);
                
                // Safety check: ensure it looks like a valid backup
                const keys = Object.keys(data);
                if (keys.length === 0) throw new Error("Empty backup file");

                // Write to localStorage
                Object.entries(data).forEach(([key, value]) => {
                    if (typeof value === 'string') {
                        localStorage.setItem(key, value);
                    }
                });

                toast({ title: "Import Successful", description: "Data restored. The application will now reload.", variant: "success" });
                
                // Force reload to re-hydrate all stores with new data
                setTimeout(() => window.location.reload(), 2000);
            } catch (err) {
                console.error("Import error:", err);
                toast({ title: "Import Failed", description: "The file was invalid or corrupted.", variant: "destructive" });
            }
        };
        reader.readAsText(file);
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
                    <CardTitle>Data Maintenance</CardTitle>
                    <CardDescription>Manage your local data, backups, and structural integrity.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-dashed bg-primary/[0.02]">
                        <div className="space-y-1">
                            <Label className="text-sm font-bold flex items-center gap-2">
                                <Database className="w-4 h-4 text-primary" />
                                Data Portability (Backup & Restore)
                            </Label>
                            <p className="text-xs text-muted-foreground">Download your entire history as a JSON file to use on another device.</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={handleExport} className="h-9 gap-2">
                                <Download className="w-4 h-4" />
                                Export
                            </Button>
                            <div className="relative">
                                <input 
                                    type="file" 
                                    accept=".json" 
                                    onChange={handleImport} 
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                                    aria-label="Import Data"
                                />
                                <Button variant="outline" size="sm" className="h-9 gap-2">
                                    <Upload className="w-4 h-4" />
                                    Import
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 rounded-lg bg-muted/30 space-y-1">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Local Storage Usage</Label>
                            <p className="text-sm font-bold">{storageUsage}</p>
                        </div>
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
                    </div>

                    <div className="p-3 bg-destructive/5 rounded-lg border border-destructive/20 flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                        <p className="text-xs text-destructive leading-relaxed">
                            <strong>Warning:</strong> Importing data will permanently overwrite your current local history. Ensure you have exported a backup of your current session if you wish to keep it.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
