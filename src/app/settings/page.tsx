
'use client';

import { useState } from 'react';
import { ArrowLeft, SlidersHorizontal, LayoutDashboard, Sliders, User, Palette, AlarmClock as AlarmClockIcon, ExternalLink, Brain, Zap, Moon, Check, Music, PlusCircle, Trash2, CirclePlay, Timer as TimerIcon, Hourglass } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardLayoutSettings } from '@/components/settings/dashboard-layout-settings';
import { TrainingSettings } from '@/components/settings/training-settings';
import { AppearanceSettings } from '@/components/settings/appearance-settings';
import { PomodoroTimer } from '@/components/time/pomodoro';
import { Timer } from '@/components/time/timer';
import { Stopwatch } from '@/components/time/stopwatch';
import { AlarmClock } from '@/components/time/alarm-clock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
                           <LayoutDashboard className="h-4 w-4"/> Dashboard
                        </TabsTrigger>
                        <TabsTrigger value="training" className="justify-start gap-2">
                           <Sliders className="h-4 w-4"/> Training
                        </TabsTrigger>
                         <TabsTrigger value="appearance" className="justify-start gap-2">
                           <Palette className="h-4 w-4"/> Appearance
                        </TabsTrigger>
                         <TabsTrigger value="alarms" className="justify-start gap-2">
                           <AlarmClockIcon className="h-4 w-4"/> Alarms
                        </TabsTrigger>
                        <TabsTrigger value="pomodoro" className="justify-start gap-2">
                           <CirclePlay className="h-4 w-4"/> Pomodoro
                        </TabsTrigger>
                        <TabsTrigger value="timer" className="justify-start gap-2">
                           <TimerIcon className="h-4 w-4"/> Timer
                        </TabsTrigger>
                        <TabsTrigger value="stopwatch" className="justify-start gap-2">
                           <Hourglass className="h-4 w-4"/> Stopwatch
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
                           <AlarmClock />
                        </TabsContent>
                        <TabsContent value="pomodoro">
                           <PomodoroTimer />
                        </TabsContent>
                        <TabsContent value="timer">
                           <Timer />
                        </TabsContent>
                        <TabsContent value="stopwatch">
                           <Stopwatch />
                        </TabsContent>
                         <TabsContent value="account">
                           <Card>
                                <CardHeader>
                                    <CardTitle>Account Settings</CardTitle>
                                    <CardDescription>Manage your profile, subscription, and data.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Account settings are not yet implemented.</p>
                                </CardContent>
                           </Card>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
          </main>
        </div>
      );
}
