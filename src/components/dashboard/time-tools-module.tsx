
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlarmClock as AlarmClockIcon, Moon, BarChart2, Hourglass, Timer as TimerIcon, CirclePlay } from 'lucide-react';
import { AlarmClock } from '@/components/time/alarm-clock';
import { Stopwatch } from '@/components/time/stopwatch';
import { Timer } from '@/components/time/timer';
import { PomodoroTimer } from '@/components/time/pomodoro';
import { SleepCycleTracker } from '@/components/time/sleep-cycle-tracker';

export function TimeToolsModule() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clock Tools</CardTitle>
        <CardDescription>
            Access tools to structure your work, rest, and cognitive warm-ups.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pomodoro" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="pomodoro"><CirclePlay className="w-4 h-4 mr-2"/>Pomodoro</TabsTrigger>
                <TabsTrigger value="alarms"><AlarmClockIcon className="w-4 h-4 mr-2"/>Alarms</TabsTrigger>
                <TabsTrigger value="sleep-cycle"><BarChart2 className="w-4 h-4 mr-2"/>Sleep</TabsTrigger>
                <TabsTrigger value="timer"><TimerIcon className="w-4 h-4 mr-2"/>Timer</TabsTrigger>
                <TabsTrigger value="stopwatch"><Hourglass className="w-4 h-4 mr-2"/>Stopwatch</TabsTrigger>
            </TabsList>
            <TabsContent value="pomodoro" className="mt-6">
                <PomodoroTimer />
            </TabsContent>
            <TabsContent value="alarms" className="mt-6">
                <AlarmClock />
            </TabsContent>
            <TabsContent value="sleep-cycle" className="mt-6">
                <SleepCycleTracker />
            </TabsContent>
            <TabsContent value="timer" className="mt-6">
                <Timer />
            </TabsContent>
            <TabsContent value="stopwatch" className="mt-6">
                <Stopwatch />
            </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
