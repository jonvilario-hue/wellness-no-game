
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Bell, Puzzle, Trash2, ExternalLink } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
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
import { useState } from 'react';
import { useAlarmStore, type Alarm } from '@/hooks/use-alarm-store';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const DaySelector = ({ 
    selectedDays = [], 
    onDayToggle,
    disabled = false,
}: { 
    selectedDays?: number[]; 
    onDayToggle: (dayIndex: number) => void;
    disabled?: boolean;
}) => {
    return (
        <div className="flex justify-center gap-2">
            {daysOfWeek.map((day, index) => (
                <Button
                    key={index}
                    variant={selectedDays.includes(index) ? 'default' : 'outline'}
                    size="icon"
                    className={cn(
                        "w-8 h-8 rounded-full",
                        selectedDays.includes(index) && 'bg-primary text-primary-foreground'
                    )}
                    onClick={() => onDayToggle(index)}
                    disabled={disabled}
                >
                    {day}
                </Button>
            ))}
        </div>
    );
};

export function AlarmClock() {
  const { alarms, addAlarm, toggleAlarm, removeAlarm, toggleAlarmPuzzle, updateAlarm } = useAlarmStore();
  const [newAlarmTime, setNewAlarmTime] = useState('07:30');
  const [newAlarmLabel, setNewAlarmLabel] = useState('');
  const [newAlarmPuzzle, setNewAlarmPuzzle] = useState(true);
  const [newAlarmRepeat, setNewAlarmRepeat] = useState(false);
  const [newAlarmDays, setNewAlarmDays] = useState<number[]>([]);

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
        puzzle: newAlarmPuzzle,
        repeatWeekly: newAlarmRepeat,
        repeatDays: newAlarmDays,
    });

    // Reset form
    setNewAlarmTime('07:30');
    setNewAlarmLabel('');
    setNewAlarmPuzzle(true);
    setNewAlarmRepeat(false);
    setNewAlarmDays([]);
  };

  const handleToggleRepeatDay = (alarmId: number, dayIndex: number) => {
    const alarm = alarms.find(a => a.id === alarmId);
    if (!alarm) return;
    const newDays = alarm.repeatDays.includes(dayIndex)
      ? alarm.repeatDays.filter(d => d !== dayIndex)
      : [...alarm.repeatDays, dayIndex];
    updateAlarm(alarmId, { repeatDays: newDays });
  };
  
  const handleToggleNewRepeatDay = (dayIndex: number) => {
    setNewAlarmDays(prev => 
        prev.includes(dayIndex) ? prev.filter(d => d !== dayIndex) : [...prev, dayIndex]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alarm Clock</CardTitle>
        <CardDescription>Set alarms to structure your day. Optionally, require a puzzle to dismiss.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alarms.length === 0 && (
          <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
            No alarms set.
          </div>
        )}
        <TooltipProvider>
            {alarms.map((alarm) => (
                <div key={alarm.id} className="p-4 rounded-lg bg-muted/50 group space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-3xl font-bold">{alarm.time}</span>
                            <span className="ml-2 text-muted-foreground font-semibold">{alarm.period}</span>
                            <p className="text-sm text-muted-foreground">{alarm.label}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => toggleAlarmPuzzle(alarm.id)}>
                                        <Puzzle className={cn("w-5 h-5", alarm.puzzle ? 'text-primary' : 'text-muted-foreground/50')} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{alarm.puzzle ? 'Puzzle is required' : 'Puzzle is optional'}. Click to toggle.</p>
                                </TooltipContent>
                            </Tooltip>
                            
                            <Switch checked={alarm.active} onCheckedChange={() => toggleAlarm(alarm.id)} aria-label={`Toggle alarm for ${alarm.time} ${alarm.period}`} />
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100" onClick={() => removeAlarm(alarm.id)}>
                                <Trash2 className="w-4 h-4 text-muted-foreground" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor={`repeat-switch-${alarm.id}`} className="text-sm font-medium">Repeat weekly</Label>
                        <Switch id={`repeat-switch-${alarm.id}`} checked={alarm.repeatWeekly} onCheckedChange={(checked) => updateAlarm(alarm.id, { repeatWeekly: checked })} />
                    </div>
                    {alarm.repeatWeekly && (
                       <DaySelector
                            selectedDays={alarm.repeatDays}
                            onDayToggle={(dayIndex) => handleToggleRepeatDay(alarm.id, dayIndex)}
                        />
                    )}
                </div>
            ))}
        </TooltipProvider>

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
                    <div className="flex items-center justify-between">
                        <Label htmlFor="repeat-switch">Repeat Weekly</Label>
                        <Switch id="repeat-switch" checked={newAlarmRepeat} onCheckedChange={setNewAlarmRepeat} />
                    </div>
                    {newAlarmRepeat && (
                        <div>
                             <Label className="mb-2 block text-center">On these days</Label>
                            <DaySelector selectedDays={newAlarmDays} onDayToggle={handleToggleNewRepeatDay} />
                        </div>
                    )}
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleAddAlarm}>Add Alarm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
         <div className="p-4 bg-muted/50 rounded-lg text-center">
            <h3 className="font-semibold">Test the Alarm Dismissal Flow</h3>
            <p className="text-muted-foreground text-sm mb-4">
                Experience how a cognitive puzzle is used to dismiss an alarm.
            </p>
            <Button asChild>
                <Link href="/alarm" target="_blank">
                    Simulate Alarm <ExternalLink className="w-4 h-4 ml-2"/>
                </Link>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
