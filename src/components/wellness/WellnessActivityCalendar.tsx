
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format, isSameDay } from "date-fns";
import { useWellnessData } from "@/hooks/use-wellness-data";
import { useSpeedReadingStore } from "@/hooks/use-speedreading-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, HeartPulse, Waves, History, Utensils, Wallet, Trash2, MessageSquare, Zap } from "lucide-react";
import { WellnessLogDialog } from "./WellnessLogDialog";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from '@/hooks/use-toast';

interface WellnessActivityCalendarProps {
  categoryFilter?: 'Movement' | 'Stillness' | 'Nutrition' | 'Finance' | 'Communication' | 'Speed Reading';
}

export function WellnessActivityCalendar({ categoryFilter }: WellnessActivityCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [mounted, setMounted] = useState(false);
  const { 
    movementLogs, stillnessLogs, mealLogs, transactions, communicationLogs,
    deleteMovementLog, deleteStillnessLog, deleteMealLog, deleteTransaction, deleteCommunicationLog
  } = useWellnessData();
  const { logs: readingLogs } = useSpeedReadingStore();
  
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [logType, setLogType] = useState<'movement' | 'stillness' | 'nutrition' | 'finance' | 'communication'>('movement');
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    setDate(new Date());
  }, []);

  const dayLogs = useMemo(() => {
    if (!date) return [];
    
    const logs = [];
    
    if (!categoryFilter || categoryFilter === 'Movement') {
      logs.push(...movementLogs.filter(l => isSameDay(new Date(l.timestamp), date)).map(l => ({ ...l, type: 'Movement' })));
    }
    if (!categoryFilter || categoryFilter === 'Stillness') {
      logs.push(...stillnessLogs.filter(l => isSameDay(new Date(l.timestamp), date)).map(l => ({ ...l, type: 'Stillness' })));
    }
    if (!categoryFilter || categoryFilter === 'Communication') {
      logs.push(...communicationLogs.filter(l => isSameDay(new Date(l.timestamp), date)).map(l => ({ ...l, type: 'Communication', label: l.practiceName })));
    }
    if (!categoryFilter || categoryFilter === 'Nutrition') {
      logs.push(...mealLogs.filter(l => isSameDay(new Date(l.date + 'T12:00:00'), date)).map(l => ({ ...l, type: 'Nutrition', label: l.mealType, detail: `${l.calories} kcal` })));
    }
    if (!categoryFilter || categoryFilter === 'Finance') {
      logs.push(...transactions.filter(l => isSameDay(new Date(l.date + 'T12:00:00'), date)).map(l => ({ ...l, type: 'Finance', label: l.merchant, detail: `$${l.amount}` })));
    }
    if (!categoryFilter || categoryFilter === 'Speed Reading') {
      logs.push(...readingLogs.filter(l => isSameDay(new Date(l.timestamp), date)).map(l => ({ 
        ...l, 
        type: 'Speed Reading', 
        label: `${l.drillType}`, 
        detail: `${l.wpm} WPM / ${l.err} ERR` 
      })));
    }

    return logs.sort((a, b) => {
      const timeA = 'timestamp' in a ? new Date(a.timestamp).getTime() : 0;
      const timeB = 'timestamp' in b ? new Date(b.timestamp).getTime() : 0;
      return timeB - timeA;
    });
  }, [date, movementLogs, stillnessLogs, mealLogs, transactions, communicationLogs, readingLogs, categoryFilter]);

  const handleAddLog = (type: typeof logType) => {
    setLogType(type);
    setIsLogOpen(true);
  };

  const handleDelete = (log: any) => {
    switch (log.type) {
      case 'Movement':
        deleteMovementLog(log.id);
        break;
      case 'Stillness':
        deleteStillnessLog(log.id);
        break;
      case 'Communication':
        deleteCommunicationLog(log.id);
        break;
      case 'Nutrition':
        deleteMealLog(log.id);
        break;
      case 'Finance':
        deleteTransaction(log.id);
        break;
      case 'Speed Reading':
        toast({ title: "Drill logs cannot be deleted from here.", variant: 'destructive' });
        return;
    }
    toast({ title: "Log Deleted", variant: 'default' });
  };

  const activityDates = useMemo(() => {
    const dates = [];
    if (!categoryFilter || categoryFilter === 'Movement') dates.push(...movementLogs.map(l => new Date(l.timestamp)));
    if (!categoryFilter || categoryFilter === 'Stillness') dates.push(...stillnessLogs.map(l => new Date(l.timestamp)));
    if (!categoryFilter || categoryFilter === 'Communication') dates.push(...communicationLogs.map(l => new Date(l.timestamp)));
    if (!categoryFilter || categoryFilter === 'Nutrition') dates.push(...mealLogs.map(l => new Date(l.date + 'T12:00:00')));
    if (!categoryFilter || categoryFilter === 'Finance') dates.push(...transactions.map(l => new Date(l.date + 'T12:00:00')));
    if (!categoryFilter || categoryFilter === 'Speed Reading') dates.push(...readingLogs.map(l => new Date(l.timestamp)));
    return dates;
  }, [movementLogs, stillnessLogs, mealLogs, transactions, communicationLogs, readingLogs, categoryFilter]);

  const modifiers = {
    hasLog: (d: Date) => activityDates.some(ad => isSameDay(ad, d))
  };

  const modifiersStyles = {
    hasLog: {
      fontWeight: 'bold',
      color: 'hsl(var(--primary))',
      backgroundColor: 'hsl(var(--primary) / 0.1)',
      borderRadius: '100%'
    }
  };

  if (!mounted) return null;

  const defaultType = categoryFilter === 'Speed Reading' ? 'movement' : (categoryFilter?.toLowerCase() as any || 'movement');

  return (
    <Card className="border-primary/10 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              {categoryFilter ? `${categoryFilter} History` : 'Wellness Calendar'}
            </CardTitle>
            <CardDescription>View your synchronized activity history.</CardDescription>
          </div>
          {(categoryFilter !== 'Communication' && categoryFilter !== 'Speed Reading') && (
            <Button size="sm" variant="outline" className="h-8 gap-1.5" onClick={() => handleAddLog(defaultType)}>
              <Plus className="w-3.5 h-3.5" /> Log {categoryFilter || 'Activity'}
            </Button>
          )}
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
                  <p className="text-xs text-muted-foreground italic">No {categoryFilter?.toLowerCase() || 'activities'} logged for this day.</p>
                </div>
              ) : (
                dayLogs.map((log, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-muted/30 transition-all group relative">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "p-2.5 rounded-full transition-colors", 
                        log.type === 'Movement' ? 'bg-primary/10 text-primary' : 
                        log.type === 'Stillness' ? 'bg-blue-400/10 text-blue-500' :
                        log.type === 'Communication' ? 'bg-purple-400/10 text-purple-500' :
                        log.type === 'Nutrition' ? 'bg-orange-400/10 text-orange-500' :
                        log.type === 'Speed Reading' ? 'bg-amber-400/10 text-amber-600' :
                        'bg-green-400/10 text-green-600'
                      )}>
                        {log.type === 'Movement' ? <HeartPulse className="w-4" /> : 
                         log.type === 'Stillness' ? <Waves className="w-4" /> : 
                         log.type === 'Communication' ? <MessageSquare className="w-4" /> :
                         log.type === 'Nutrition' ? <Utensils className="w-4" /> :
                         log.type === 'Speed Reading' ? <Zap className="w-4" /> :
                         <Wallet className="w-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold leading-none">
                          {(log as any).exerciseName || (log as any).techniqueName || (log as any).label}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase font-black mt-1.5 tracking-tighter">
                          {(log as any).duration ? `${(log as any).duration} MIN • ` : ''}{(log as any).detail ? `${(log as any).detail} • ` : ''}{log.type}
                        </p>
                      </div>
                    </div>
                    {log.type !== 'Speed Reading' && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition-all"
                        onClick={() => handleDelete(log)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
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
        initialType={logType === 'communication' ? 'movement' : logType as any} 
        initialDate={date} 
      />
    </Card>
  );
}
