
'use client';

import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format, isSameDay } from "date-fns";
import { useWellnessData } from "@/hooks/use-wellness-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, HeartPulse, Waves, History } from "lucide-react";
import { WellnessLogDialog } from "./WellnessLogDialog";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export function WellnessActivityCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { movementLogs, stillnessLogs } = useWellnessData();
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [logType, setLogType] = useState<'movement' | 'stillness'>('movement');

  const dayLogs = date ? [
    ...movementLogs.filter(l => isSameDay(new Date(l.timestamp), date)).map(l => ({ ...l, type: 'Movement' })),
    ...stillnessLogs.filter(l => isSameDay(new Date(l.timestamp), date)).map(l => ({ ...l, type: 'Stillness' }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) : [];

  const handleAddLog = (type: 'movement' | 'stillness') => {
    setLogType(type);
    setIsLogOpen(true);
  };

  const activityDates = [
    ...movementLogs.map(l => new Date(l.timestamp)),
    ...stillnessLogs.map(l => new Date(l.timestamp))
  ];

  const modifiers = {
    hasLog: (d: Date) => activityDates.some(ad => isSameDay(ad, d))
  };

  const modifiersStyles = {
    hasLog: {
      fontWeight: 'bold',
      textDecoration: 'underline',
      color: 'hsl(var(--primary))'
    }
  };

  return (
    <Card className="border-primary/10 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              Activity Calendar
            </CardTitle>
            <CardDescription>View your history and log past sessions.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1.5" onClick={() => handleAddLog('movement')}>
              <Plus className="w-3.5 h-3.5" /> Movement
            </Button>
            <Button size="sm" variant="outline" className="h-8 gap-1.5" onClick={() => handleAddLog('stillness')}>
              <Plus className="w-3.5 h-3.5" /> Stillness
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center border rounded-2xl p-4 bg-muted/10">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border-none p-0"
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
          />
        </div>
        
        <div className="flex flex-col h-full space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {date ? format(date, 'EEEE, MMMM d') : 'Select a date'}
            </h3>
            <Badge variant="secondary" className="text-[10px]">{dayLogs.length} Entries</Badge>
          </div>

          <ScrollArea className="flex-grow h-[250px] pr-4 -mr-4">
            <div className="space-y-3">
              {dayLogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-xl bg-muted/50">
                  <p className="text-xs text-muted-foreground italic">No activities logged for this day.</p>
                  <Button variant="link" size="sm" className="mt-2 text-primary text-xs" onClick={() => handleAddLog('movement')}>
                    Add one now
                  </Button>
                </div>
              ) : (
                dayLogs.map((log, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-muted/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "p-2.5 rounded-full transition-colors", 
                        log.type === 'Movement' ? 'bg-primary/10 text-primary' : 'bg-blue-400/10 text-blue-500'
                      )}>
                        {log.type === 'Movement' ? <HeartPulse className="w-4 h-4" /> : <Waves className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold leading-none">{('exerciseName' in log) ? log.exerciseName : log.techniqueName}</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-black mt-1.5 tracking-tighter">
                          {log.duration} MIN • {log.type}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
      <WellnessLogDialog 
        isOpen={isLogOpen} 
        onOpenChange={setIsLogOpen} 
        initialType={logType} 
        initialDate={date} 
      />
    </Card>
  );
}
