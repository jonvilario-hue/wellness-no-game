
'use client';

import { ArrowLeft, Clock, AlarmClock as AlarmClockIcon, Timer as TimerIcon, Hourglass, CirclePlay, Settings, CalendarDays, ExternalLink, Moon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlarmClock } from '@/components/time/alarm-clock';
import { Stopwatch } from '@/components/time/stopwatch';
import { Timer } from '@/components/time/timer';
import { PomodoroTimer } from '@/components/time/pomodoro';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function AlarmTabContent() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Moon className="w-5 h-5 text-primary"/>
                    Cognitive Alarms
                </CardTitle>
                <CardDescription>
                    Set puzzle-based alarms to wake up your mind or structure your day.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <h3 className="font-semibold">Test the Alarm Dismissal</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                        Experience the puzzle-based alarm dismissal flow.
                    </p>
                    <Button asChild>
                        <Link href="/alarm" target="_blank">
                            Simulate Alarm <ExternalLink className="w-4 h-4 ml-2"/>
                        </Link>
                    </Button>
                </div>
                <AlarmClock />
            </CardContent>
        </Card>
    );
}

export default function TimePage() {
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
                    <Clock className="h-7 w-7 text-primary" />
                    <h1 className="text-2xl font-bold text-foreground font-headline tracking-tight">
                    Time & Sleep Tools
                    </h1>
                </div>
                 <div className="flex-1 flex justify-end items-center gap-2">
                    <Button asChild variant="ghost" size="icon">
                        <Link href="/calendar">
                        <CalendarDays className="h-5 w-5" />
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon">
                        <Link href="/settings">
                        <Settings className="h-5 w-5" />
                        </Link>
                    </Button>
                 </div>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 md:p-8 flex justify-center">
            <div className="w-full max-w-4xl">
                <Tabs defaultValue="alarm" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="alarm"><Moon className="w-4 h-4 mr-2"/>Sleep & Alarms</TabsTrigger>
                        <TabsTrigger value="stopwatch"><Hourglass className="w-4 h-4 mr-2"/>Stopwatch</TabsTrigger>
                        <TabsTrigger value="timer"><TimerIcon className="w-4 h-4 mr-2"/>Timer</TabsTrigger>
                        <TabsTrigger value="pomodoro"><CirclePlay className="w-4 h-4 mr-2"/>Pomodoro</TabsTrigger>
                    </TabsList>
                    <TabsContent value="alarm" className="mt-6">
                       <AlarmTabContent />
                    </TabsContent>
                    <TabsContent value="stopwatch" className="mt-6">
                       <Stopwatch />
                    </TabsContent>
                    <TabsContent value="timer" className="mt-6">
                       <Timer />
                    </TabsContent>
                    <TabsContent value="pomodoro" className="mt-6">
                        <PomodoroTimer />
                    </TabsContent>
                </Tabs>
            </div>
          </main>
        </div>
      );
}
