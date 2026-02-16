
'use client';

import { useMemo } from 'react';
import { format, isBefore, startOfDay, parseISO } from 'date-fns';
import { useCalendarPlansStore } from '@/hooks/use-calendar-plans-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Play, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function StudyScheduleView() {
  const { activityInstances, updateActivityStatus, _hasHydrated } = useCalendarPlansStore();

  const scheduledSessions = useMemo(() => {
    if (!_hasHydrated) return [];
    
    const sessions = [];
    const today = startOfDay(new Date());

    for (const [date, instances] of Object.entries(activityInstances)) {
      const studyItems = instances.filter(inst => inst.planId === 'study-sessions');
      for (const item of studyItems) {
        const itemDate = startOfDay(parseISO(date));
        const isOverdue = isBefore(itemDate, today) && item.status !== 'completed';
        
        sessions.push({
          ...item,
          date,
          isOverdue
        });
      }
    }

    return sessions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [activityInstances, _hasHydrated]);

  if (!_hasHydrated) return null;

  if (scheduledSessions.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/20">
        <CalendarDays className="mx-auto h-12 w-12 text-muted-foreground opacity-20 mb-4" />
        <p className="text-xl font-bold text-muted-foreground">No Study Sessions Scheduled</p>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
          Add specific topics or decks to your calendar from the individual tools.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scheduledSessions.map((session) => (
          <Card key={session.id} className={cn(
            "transition-all relative group border-primary/10 hover:border-primary/30 shadow-sm",
            session.isOverdue && "border-destructive/30 bg-destructive/[0.02]",
            session.status === 'completed' && "opacity-60 grayscale-[0.5]"
          )}>
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start mb-1">
                <Badge variant="outline" className="text-[9px] uppercase tracking-tighter h-4">
                  {session.activityId}
                </Badge>
                {session.isOverdue && (
                  <Badge variant="destructive" className="text-[9px] h-4 gap-1">
                    <AlertCircle className="h-3 w-3" /> Overdue
                  </Badge>
                )}
                {session.status === 'completed' && (
                  <Badge variant="success" className="text-[9px] h-4 gap-1 bg-green-500/10 text-green-600 border-none">
                    <CheckCircle2 className="h-3 w-3" /> Done
                  </Badge>
                )}
              </div>
              <CardTitle className="text-sm font-bold truncate pr-6">{session.activityName}</CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1">
                <CalendarDays className="h-3 w-3" />
                {format(parseISO(session.date), 'EEEE, MMM d')}
                {session.scheduledTime && (
                  <>
                    <span className="opacity-30">•</span>
                    <Clock className="h-3 w-3" />
                    {session.scheduledTime}
                  </>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="flex gap-2">
                <Button asChild size="sm" className="flex-1 h-8 text-[11px] font-bold gap-2">
                  <Link href={`/study/session?deckId=${session.studyResourceId}`}>
                    <Play className="h-3 w-3 fill-current" /> Start Session
                  </Link>
                </Button>
                {session.status !== 'completed' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 w-8 p-0 border-primary/20 text-primary"
                    onClick={() => updateActivityStatus(session.date, session.id, 'completed', 'calendar')}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
