
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Bell, Puzzle, Trash2, ExternalLink, Edit } from 'lucide-react';
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
import { useState, useEffect } from 'react';
import { useAlarmStore, type Alarm } from '@/hooks/use-alarm-store';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { EditableLabel } from './editable-label';

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

const AlarmDialog = ({ 
    open,
    onOpenChange,
    onSave,
    alarmToEdit
}: { 
    open: boolean, 
    onOpenChange: (open: boolean) => void,
    onSave: (alarm: Omit<Alarm, 'id'>, id?: number) => void,
    alarmToEdit: Alarm | null
}) => {
    const [time, setTime] = useState('07:30');
    const [label, setLabel] = useState('');
    const [puzzle, setPuzzle] = useState(true);
    const [repeat, setRepeat] = useState(false);
    const [days, setDays] = useState<number[]>([]);

    useEffect(() => {
        if (alarmToEdit && open) {
            const [hour, minute] = alarmToEdit.time.split(':');
            let hour24 = parseInt(hour, 10);
            if(alarmToEdit.period === 'PM' && hour24 !== 12) hour24 += 12;
            if(alarmToEdit.period === 'AM' && hour24 === 12) hour24 = 0;
            
            setTime(`${hour24.toString().padStart(2, '0')}:${minute}`);
            setLabel(alarmToEdit.label);
            setPuzzle(alarmToEdit.puzzle);
            setRepeat(alarmToEdit.repeatWeekly);
            setDays(alarmToEdit.repeatDays || []);
        } else {
            // Reset for new alarm
            setTime('07:30');
            setLabel('');
            setPuzzle(true);
            setRepeat(false);
            setDays([]);
        }
    }, [alarmToEdit, open]);

    const handleSave = () => {
        const [hours, minutes] = time.split(':');
        let period = 'AM';
        let hour = parseInt(hours, 10);

        if (hour >= 12) {
            period = 'PM';
            if (hour > 12) hour -= 12;
        }
        if (hour === 0) hour = 12;

        const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes}`;

        onSave({
            time: formattedTime,
            period: period as 'AM' | 'PM',
            label: label || 'Alarm',
            active: alarmToEdit?.active ?? true,
            puzzle: puzzle,
            repeatWeekly: repeat,
            repeatDays: days,
        }, alarmToEdit?.id);
        
        onOpenChange(false);
    };

     const handleToggleDay = (dayIndex: number) => {
        setDays(prev => 
            prev.includes(dayIndex) ? prev.filter(d => d !== dayIndex) : [...prev, dayIndex]
        );
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{alarmToEdit ? 'Edit Alarm' : 'Add New Alarm'}</AlertDialogTitle>
                    <AlertDialogDescription>Configure your alarm below.</AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="alarm-time">Time</Label>
                        <Input id="alarm-time" type="time" value={time} onChange={e => setTime(e.target.value)} />
                    </div>
                     <div>
                        <Label htmlFor="alarm-label">Label</Label>
                        <Input id="alarm-label" type="text" placeholder="e.g., Wake Up" value={label} onChange={e => setLabel(e.target.value)}/>
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="puzzle-switch">Require Puzzle to Dismiss</Label>
                        <Switch id="puzzle-switch" checked={puzzle} onCheckedChange={setPuzzle} />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="repeat-switch">Repeat Weekly</Label>
                        <Switch id="repeat-switch" checked={repeat} onCheckedChange={setRepeat} />
                    </div>
                    {repeat && (
                        <div>
                             <Label className="mb-2 block text-center">On these days</Label>
                            <DaySelector selectedDays={days} onDayToggle={handleToggleDay} />
                        </div>
                    )}
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export function AlarmClock() {
  const { alarms, addAlarm, toggleAlarm, removeAlarm, toggleAlarmPuzzle, updateAlarm } = useAlarmStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alarmToEdit, setAlarmToEdit] = useState<Alarm | null>(null);

  const handleOpenDialog = (alarm: Alarm | null) => {
      setAlarmToEdit(alarm);
      setIsDialogOpen(true);
  };
  
  const handleSave = (alarmData: Omit<Alarm, 'id'>, id?: number) => {
      if (id) {
          updateAlarm(id, alarmData);
      } else {
          addAlarm(alarmData);
      }
  };

  const handleToggleRepeatDay = (alarmId: number, dayIndex: number) => {
    const alarm = alarms.find(a => a.id === alarmId);
    if (!alarm) return;
    const newDays = alarm.repeatDays.includes(dayIndex)
      ? alarm.repeatDays.filter(d => d !== dayIndex)
      : [...alarm.repeatDays, dayIndex];
    updateAlarm(alarmId, { repeatDays: newDays });
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
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-grow">
                             <EditableLabel
                                initialValue={alarm.label}
                                onSave={(newLabel) => updateAlarm(alarm.id, { label: newLabel })}
                                placeholder="Add a label"
                                className="!p-0 !min-h-0"
                                inputClassName="text-base font-semibold"
                            />
                            <div>
                                <span className="text-3xl font-bold">{alarm.time}</span>
                                <span className="ml-2 text-muted-foreground font-semibold">{alarm.period}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
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
                            
                            <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenDialog(alarm)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeAlarm(alarm.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
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

        <Button variant="outline" className="w-full border-dashed" onClick={() => handleOpenDialog(null)}>
            <PlusCircle className="w-4 h-4 mr-2"/>
            Add New Alarm
        </Button>
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
      <AlarmDialog 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSave}
        alarmToEdit={alarmToEdit}
      />
    </Card>
  );
}
