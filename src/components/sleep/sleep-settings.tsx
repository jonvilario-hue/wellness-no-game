
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { useSleepProStore } from '@/hooks/use-sleep-pro-store';
import { Clock, Bell, Shield, Smartphone } from 'lucide-react';

export function SleepSettings() {
  const { goals, updateGoals, settings, updateSettings } = useSleepProStore();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sleep Goals</CardTitle>
          <CardDescription>Define your ideal recovery window.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Clock className="h-4 w-4"/> Target Bedtime</Label>
              <Input 
                type="time" 
                value={goals.bedtime} 
                onChange={(e) => updateGoals({ bedtime: e.target.value })} 
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Clock className="h-4 w-4"/> Target Wake Time</Label>
              <Input 
                type="time" 
                value={goals.waketime} 
                onChange={(e) => updateGoals({ waketime: e.target.value })} 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Smart Features</CardTitle>
          <CardDescription>Advanced tools for better wakefulness and dream recall.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="space-y-0.5">
              <Label className="text-base">Smart Wake Alarm</Label>
              <p className="text-sm text-muted-foreground">Wakes you during light sleep phases.</p>
            </div>
            <Switch 
              checked={settings.smartAlarm} 
              onCheckedChange={(checked) => updateSettings({ smartAlarm: checked })} 
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="space-y-0.5">
              <Label className="text-base">Dream Journal Reminder</Label>
              <p className="text-sm text-muted-foreground">Alerts you to log your dreams immediately upon waking.</p>
            </div>
            <Switch 
              checked={settings.dreamJournalReminder} 
              onCheckedChange={(checked) => updateSettings({ dreamJournalReminder: checked })} 
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="space-y-0.5">
              <Label className="text-base">Privacy Shield</Label>
              <p className="text-sm text-muted-foreground">Keep all audio and sensor data device-local.</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
