
'use client';

import { ArrowLeft, Clock, AlarmClock as AlarmClockIcon, Timer as TimerIcon, Hourglass, CirclePlay, Settings, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlarmClock } from '@/components/time/alarm-clock';
import { Stopwatch } from '@/components/time/stopwatch';
import { Timer } from '@/components/time/timer';
import { PomodoroTimer } from '@/components/time/pomodoro';

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
                    Time Tools
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
                        <TabsTrigger value="alarm"><AlarmClockIcon className="w-4 h-4 mr-2"/>Alarm</TabsTrigger>
                        <TabsTrigger value="stopwatch"><Hourglass className="w-4 h-4 mr-2"/>Stopwatch</TabsTrigger>
                        <TabsTrigger value="timer"><TimerIcon className="w-4 h-4 mr-2"/>Timer</TabsTrigger>
                        <TabsTrigger value="pomodoro"><CirclePlay className="w-4 h-4 mr-2"/>Pomodoro</TabsTrigger>
                    </TabsList>
                    <TabsContent value="alarm" className="mt-6">
                       <AlarmClock />
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
