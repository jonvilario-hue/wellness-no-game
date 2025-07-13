
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Bell, Puzzle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const alarms = [
    { time: '06:30', period: 'AM', label: 'Wake Up + Gwm Training', active: true, puzzle: true },
    { time: '09:00', period: 'AM', label: 'Start Deep Work Block', active: true, puzzle: false },
    { time: '08:00', period: 'PM', label: 'Wind Down', active: false, puzzle: false },
]

export function AlarmClock() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alarm Clock</CardTitle>
        <CardDescription>Set alarms to structure your day. Optionally, require a puzzle to dismiss.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alarms.map((alarm, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                    <span className="text-3xl font-bold">{alarm.time}</span>
                    <span className="ml-2 text-muted-foreground font-semibold">{alarm.period}</span>
                    <p className="text-sm text-muted-foreground">{alarm.label}</p>
                </div>
                <div className="flex items-center gap-4">
                    {alarm.puzzle && (
                        <Puzzle className="w-5 h-5 text-primary" title="Puzzle required"/>
                    )}
                    <Switch checked={alarm.active} aria-label={`Toggle alarm for ${alarm.time} ${alarm.period}`} />
                </div>
            </div>
        ))}

        <Button variant="outline" className="w-full border-dashed">
            <PlusCircle className="w-4 h-4 mr-2"/>
            Add New Alarm
        </Button>
      </CardContent>
       <CardFooter className="text-sm text-muted-foreground justify-center">
            <Bell className="w-4 h-4 mr-2"/>
            <span>Alarm settings are illustrative. This feature is in development.</span>
        </CardFooter>
    </Card>
  );
}
