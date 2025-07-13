
'use client';

import { useState } from 'react';
import { ArrowLeft, SlidersHorizontal, LayoutDashboard, Sliders, User, Palette, AlarmClock, ExternalLink, Brain, Zap, Moon, Check, Music, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardLayoutSettings } from '@/components/settings/dashboard-layout-settings';
import { TrainingSettings } from '@/components/settings/training-settings';
import { PlaceholderSettings } from '@/components/settings/placeholder-settings';
import { AppearanceSettings } from '@/components/settings/appearance-settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAlarmStore } from '@/hooks/use-alarm-store';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

type AlarmPreset = 'quick' | 'deep' | 'gentle';

const presets: { id: AlarmPreset, title: string, icon: LucideIcon, description: string, sound: string }[] = [
    { id: 'quick', title: 'Quick Boost', icon: Zap, description: '1 short EF puzzle, low fallback time.', sound: 'Digital' },
    { id: 'deep', title: 'Deep Wake', icon: Brain, description: '2 puzzles, no skip, XP bonus for completion.', sound: 'Classic' },
    { id: 'gentle', title: 'Gentle Start', icon: Moon, description: 'Warm-up puzzle, soft tone, feedback delay.', sound: 'Chimes' },
];

const alarmSounds = [
    { id: 'classic', name: 'Classic' },
    { id: 'digital', name: 'Digital' },
    { id: 'chimes', name: 'Chimes' },
    { id: 'nature', name: 'Nature' },
]

const AlarmSettings = () => {
  const [selectedPreset, setSelectedPreset] = useState<AlarmPreset>('quick');
  const { alarms, addAlarm, toggleAlarm, removeAlarm } = useAlarmStore();
  const [newAlarmTime, setNewAlarmTime] = useState('07:30');
  const [newAlarmLabel, setNewAlarmLabel] = useState('');
  const [newAlarmPuzzle, setNewAlarmPuzzle] = useState(true);

  const handleAddAlarm = () => {
    const [hours, minutes] = newAlarmTime.split(':');
    let period = 'AM';
    let hour = parseInt(hours, 10);

    if (hour >= 12) {
        period = 'PM';
        if (hour > 12) {
            hour -= 12;
        }
    }
    if (hour === 0) {
        hour = 12;
    }
    
    const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes}`;

    addAlarm({
        id: Date.now(),
        time: formattedTime,
        period: period as 'AM' | 'PM',
        label: newAlarmLabel || 'Alarm',
        active: true,
        puzzle: newAlarmPuzzle
    });

    // Reset form
    setNewAlarmTime('07:30');
    setNewAlarmLabel('');
    setNewAlarmPuzzle(true);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cognitive Alarms</CardTitle>
        <CardDescription>
          Configure alarm presets, manage your alarms, and test the cognitive dismissal flow.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-muted/50 rounded-lg text-center">
            <h3 className="font-semibold">Test the Alarm Dismissal</h3>
            <p className="text-muted-foreground text-sm mb-4">
                Experience the puzzle-based alarm flow.
            </p>
            <Button asChild>
                <Link href="/alarm" target="_blank">
                    Simulate Alarm <ExternalLink className="w-4 h-4 ml-2"/>
                </Link>
            </Button>
        </div>

        <div className="space-y-4">
            <h3 className="font-semibold text-lg">My Alarms</h3>
            <div className="space-y-3">
              {alarms.length === 0 && (
                <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                  No alarms set.
                </div>
              )}
              {alarms.map((alarm) => (
                  <div key={alarm.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 group">
                      <div>
                          <span className="text-2xl font-bold">{alarm.time}</span>
                          <span className="ml-2 text-muted-foreground font-semibold">{alarm.period}</span>
                          <p className="text-sm text-muted-foreground">{alarm.label}</p>
                      </div>
                      <div className="flex items-center gap-3">
                          {alarm.puzzle && (
                              <AlarmClock className="w-5 h-5 text-primary" title="Puzzle required"/>
                          )}
                          <Switch checked={alarm.active} onCheckedChange={() => toggleAlarm(alarm.id)} aria-label={`Toggle alarm for ${alarm.time} ${alarm.period}`} />
                          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100" onClick={() => removeAlarm(alarm.id)}>
                              <Trash2 className="w-4 h-4 text-muted-foreground" />
                          </Button>
                      </div>
                  </div>
              ))}
              <AlertDialog>
                  <AlertDialogTrigger asChild>
                      <Button variant="outline" className="w-full border-dashed">
                          <PlusCircle className="w-4 h-4 mr-2"/>
                          Add New Alarm
                      </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                      <AlertDialogHeader>
                          <AlertDialogTitle>Add a New Alarm</AlertDialogTitle>
                          <AlertDialogDescription>Configure your new alarm below.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="space-y-4">
                          <div>
                              <Label htmlFor="alarm-time">Time</Label>
                              <Input id="alarm-time" type="time" value={newAlarmTime} onChange={e => setNewAlarmTime(e.target.value)} />
                          </div>
                          <div>
                              <Label htmlFor="alarm-label">Label</Label>
                              <Input id="alarm-label" type="text" placeholder="e.g., Wake Up" value={newAlarmLabel} onChange={e => setNewAlarmLabel(e.target.value)}/>
                          </div>
                          <div className="flex items-center justify-between">
                              <Label htmlFor="puzzle-switch">Require Puzzle to Dismiss</Label>
                              <Switch id="puzzle-switch" checked={newAlarmPuzzle} onCheckedChange={setNewAlarmPuzzle} />
                          </div>
                      </div>
                      <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleAddAlarm}>Add Alarm</AlertDialogAction>
                      </AlertDialogFooter>
                  </AlertDialogContent>
              </AlertDialog>
            </div>
        </div>

        <Separator />
        
        <div>
            <h3 className="font-semibold text-lg mb-2">Alarm Mode Presets</h3>
            <p className="text-muted-foreground text-sm mb-4">
                Choose a preset to quickly configure your alarm's behavior. (Feature in development)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {presets.map((preset) => {
                    const isActive = selectedPreset === preset.id;
                    return (
                        <Card 
                            key={preset.id} 
                            onClick={() => setSelectedPreset(preset.id)}
                            className={cn(
                                "cursor-pointer transition-all relative",
                                isActive ? 'border-primary ring-2 ring-primary' : 'hover:border-muted-foreground/50'
                            )}
                        >
                            {isActive && (
                                <div className="absolute top-2 right-2 p-1 bg-primary rounded-full text-primary-foreground">
                                    <Check className="h-3 w-3" />
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <preset.icon className="w-4 h-4 text-primary"/>
                                    {preset.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-muted-foreground">
                               {preset.description}
                               <div className="flex items-center gap-2 mt-2 text-xs font-semibold">
                                 <Music className="w-3 h-3" />
                                 <span>{preset.sound}</span>
                               </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>

         <div className="space-y-2">
            <Label htmlFor="alarm-sound">Default Alarm Sound</Label>
            <Select defaultValue="classic">
              <SelectTrigger id="alarm-sound">
                <SelectValue placeholder="Select a sound" />
              </SelectTrigger>
              <SelectContent>
                {alarmSounds.map(sound => (
                    <SelectItem key={sound.id} value={sound.id}>{sound.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
      </CardContent>
    </Card>
  )
}

export default function SettingsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
           <header className="px-4 sm:px-6 md:px-8 py-4 border-b bg-card sticky top-0 z-10">
            <div className="mx-auto max-w-7xl flex items-center justify-between">
                <div className="flex-1 flex justify-start">
                  <Button asChild variant="outline">
                      <Link href="/">
                      <ArrowLeft className="mr-2" />
                      Back to Dashboard
                      </Link>
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                    <SlidersHorizontal className="h-7 w-7 text-primary" />
                    <h1 className="text-2xl font-bold text-foreground font-headline tracking-tight">
                    Settings
                    </h1>
                </div>
                 <div className="flex-1 flex justify-end">
                    {/* Placeholder for future actions */}
                 </div>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 md:p-8">
            <div className="mx-auto max-w-5xl">
                <Tabs defaultValue="layout" orientation="vertical" className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <TabsList className="flex flex-col h-auto justify-start items-stretch p-2 space-y-1 bg-muted/50 rounded-lg w-full">
                        <TabsTrigger value="layout" className="justify-start gap-2">
                           <LayoutDashboard className="h-4 w-4"/> Dashboard Layout
                        </TabsTrigger>
                        <TabsTrigger value="training" className="justify-start gap-2">
                           <Sliders className="h-4 w-4"/> Training
                        </TabsTrigger>
                         <TabsTrigger value="appearance" className="justify-start gap-2">
                           <Palette className="h-4 w-4"/> Appearance
                        </TabsTrigger>
                        <TabsTrigger value="alarms" className="justify-start gap-2">
                           <AlarmClock className="h-4 w-4"/> Alarms
                        </TabsTrigger>
                        <TabsTrigger value="account" className="justify-start gap-2" disabled>
                           <User className="h-4 w-4"/> Account
                        </TabsTrigger>
                    </TabsList>

                    <div className="col-span-1 md:col-span-3">
                        <TabsContent value="layout">
                           <DashboardLayoutSettings />
                        </TabsContent>
                        <TabsContent value="training">
                           <TrainingSettings />
                        </TabsContent>
                         <TabsContent value="appearance">
                           <AppearanceSettings />
                        </TabsContent>
                         <TabsContent value="alarms">
                           <AlarmSettings />
                        </TabsContent>
                         <TabsContent value="account">
                           <PlaceholderSettings title="Account Settings" description="Manage your profile, subscription, and data."/>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
          </main>
        </div>
      );
}
