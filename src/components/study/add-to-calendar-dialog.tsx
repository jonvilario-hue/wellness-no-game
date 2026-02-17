
'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { useCalendarPlansStore } from '@/hooks/use-calendar-plans-store';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface AddToCalendarDialogProps {
  toolId: string;
  resourceId: string;
  resourceName: string;
  buttonVariant?: "ghost" | "outline" | "default";
  buttonSize?: "icon" | "sm" | "default";
  className?: string;
  children?: React.ReactNode;
}

export function AddToCalendarDialog({ 
  toolId, 
  resourceId, 
  resourceName,
  buttonVariant = "ghost",
  buttonSize = "icon",
  className,
  children
}: AddToCalendarDialogProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('09:00');
  const [duration, setDuration] = useState('30');
  const [customName, setCustomName] = useState(resourceName);
  const { addStudySessionEvent } = useCalendarPlansStore();
  const { toast } = useToast();

  const handleSchedule = () => {
    if (!date) return;
    
    const dateStr = format(date, 'yyyy-MM-dd');
    addStudySessionEvent(
      dateStr,
      toolId,
      resourceId,
      customName || resourceName,
      time
    );

    toast({
      title: "Scheduled!",
      description: `Study session added to ${format(date, 'MMM d')}.`,
      variant: 'success'
    });
  };

  const isAdhoc = resourceId === 'manual-entry';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize} className={cn("text-primary hover:bg-primary/10", className)}>
          {children || <CalendarIcon className="h-4 w-4" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 space-y-4 z-[100]">
        <div className="space-y-1">
          <h4 className="font-bold text-sm">{isAdhoc ? 'Schedule Custom Session' : 'Schedule Session'}</h4>
          {isAdhoc ? (
            <Input 
              value={customName} 
              onChange={e => setCustomName(e.target.value)} 
              placeholder="What are you studying?"
              className="h-8 text-xs mt-2"
            />
          ) : (
            <p className="text-xs text-muted-foreground truncate">"{resourceName}"</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Select Date</Label>
          <div className="border rounded-md p-1 bg-muted/20">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="p-0 pointer-events-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase text-muted-foreground">Start Time</Label>
            <Input 
              type="time" 
              value={time} 
              onChange={e => setTime(e.target.value)}
              className="h-8 text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase text-muted-foreground">Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 min</SelectItem>
                <SelectItem value="30">30 min</SelectItem>
                <SelectItem value="45">45 min</SelectItem>
                <SelectItem value="60">1 hr</SelectItem>
                <SelectItem value="120">2 hr</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className="w-full h-9 gap-2" onClick={handleSchedule} disabled={!date}>
          <CheckCircle2 className="h-4 w-4" />
          Create Calendar Event
        </Button>
      </PopoverContent>
    </Popover>
  );
}
