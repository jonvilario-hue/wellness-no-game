
'use client';

import { ArrowLeft, SlidersHorizontal, LayoutDashboard, Sliders, User, Palette, Moon, ExternalLink, Brain, Zap, Sun, Check, Music, PlusCircle, Trash2, CirclePlay, Timer as TimerIcon, Hourglass, BarChart2, ListChecks } from 'lucide-react';
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
import { SleepCycleTracker } from '@/components/time/sleep-cycle-tracker';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { TrackerSettings } from '@/components/settings/tracker-settings';

export default function SettingsPage() {
    return (
        <>
            <div className="sticky top-0 z-20">
                <Header />
                <PageNav />
            </div>
            <MotivationalMessage />
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
                             <TabsTrigger value="trackers" className="justify-start gap-2">
                            <ListChecks className="h-4 w-4"/> Trackers
                            </TabsTrigger>
                            <TabsTrigger value="appearance" className="justify-start gap-2">
                            <Palette className="h-4 w-4"/> Appearance
                            </TabsTrigger>
                            <TabsTrigger value="sleep" className="justify-start gap-2">
                            <BarChart2 className="h-4 w-4"/> Sleep
                            </TabsTrigger>
                            <TabsTrigger value="alarms" className="justify-start gap-2">
                            <Moon className="h-4 w-4"/> Alarms
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
                             <TabsContent value="trackers">
                            <TrackerSettings />
                            </TabsContent>
                            <TabsContent value="appearance">
                            <AppearanceSettings />
                            </TabsContent>
                            <TabsContent value="sleep">
                            <SleepCycleTracker />
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
        </>
      );
}
