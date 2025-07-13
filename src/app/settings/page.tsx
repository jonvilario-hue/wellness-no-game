
'use client';

import { useState } from 'react';
import { ArrowLeft, SlidersHorizontal, LayoutDashboard, Sliders, User, Palette, AlarmClock, ExternalLink, Brain, Zap, Moon, Check, Music } from 'lucide-react';
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
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cognitive Alarms</CardTitle>
        <CardDescription>
          Set alarms that require solving a puzzle to dismiss, turning your wake-up routine into a cognitive warm-up.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-8 bg-muted/50 rounded-lg text-center">
            <h3 className="font-semibold">Test the Alarm</h3>
            <p className="text-muted-foreground text-sm mb-4">
                Experience the puzzle-based alarm dismissal flow.
            </p>
            <Button asChild>
                <Link href="/alarm" target="_blank">
                    Simulate Alarm <ExternalLink className="w-4 h-4 ml-2"/>
                </Link>
            </Button>
        </div>
        
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

        <PlaceholderSettings title="Set New Alarm" description="This feature is in development. Soon you'll be able to set and customize your cognitive alarms here."/>
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
