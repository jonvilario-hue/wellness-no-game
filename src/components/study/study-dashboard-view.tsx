
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useStudyDashboardStore } from '@/hooks/use-study-dashboard-store';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Flame, Calendar, Clock, CheckCircle2, Circle, 
  ArrowRight, Plus, RefreshCw, BarChart3, Target, AlertCircle
} from 'lucide-react';
import { format, isToday, parseISO } from 'date-fns';
import Link from 'next/link';
import { TaskDialog } from './dashboard/task-dialog';
import { DeadlineDialog } from './dashboard/deadline-dialog';
import { TodayPlan } from './dashboard/today-view';
import { ActivityView } from './dashboard/activity-view';
import { ForecastView } from './dashboard/forecast-view';
import { useSrsUser } from '@/lib/game/srs';

export function StudyDashboardView() {
  const { tasks, deadlines, getStreak } = useStudyDashboardStore();
  const { decks, cards } = useFlashcardStore();
  const { user } = useSrsUser();
  
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isDeadlineOpen, setIsDeadlineOpen] = useState(false);
  const [view, setView] = useState<'today' | 'activity' | 'forecast'>('today');
  
  const [greeting, setGreeting] = useState('Welcome');
  const [todayDate, setTodayDate] = useState('');
  const [streak, setStreak] = useState({ current: 0, longest: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening');
    setTodayDate(format(new Date(), 'EEEE, MMMM do'));
    setStreak(getStreak());
  }, [getStreak]);

  const upcomingDeadline = useMemo(() => {
    if (!isMounted) return null;
    return [...deadlines]
      .filter(d => !isToday(parseISO(d.date)) && new Date(d.date) > new Date())
      .sort((a, b) => a.date.localeCompare(b.date))[0];
  }, [deadlines, isMounted]);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
            {greeting}, Scholar
            <Badge variant="outline" className="h-6 px-3 bg-primary/10 text-primary border-primary/20 gap-1.5 font-black text-[10px]">
              <Flame className="w-3 h-3 fill-current text-orange-500" />
              {streak.current}-Day Streak
            </Badge>
          </h2>
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">
            {todayDate || '...'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="h-9 border-primary/20 font-bold" onClick={() => setIsDeadlineOpen(true)}>
            Add Exam
          </Button>
          <Button size="sm" className="h-9 font-bold shadow-md" onClick={() => setIsTaskOpen(true)}>
            <Plus className="w-4 h-4 mr-1.5" /> New Task
          </Button>
        </div>
      </div>

      {upcomingDeadline && (
        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-bold">{upcomingDeadline.name} coming up!</p>
              <p className="text-[10px] uppercase font-black opacity-60">Scheduled for {format(parseISO(upcomingDeadline.date), 'MMM do')}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase border-destructive/20 hover:bg-destructive/10">Adjust Pace</Button>
        </div>
      )}

      <Tabs value={view} onValueChange={(v: any) => setView(v)} className="w-full">
        <TabsList className="bg-muted/50 p-1 h-10 mb-6">
          <TabsTrigger value="today" className="px-8 font-bold">Today</TabsTrigger>
          <TabsTrigger value="activity" className="px-8 font-bold">Activity</TabsTrigger>
          <TabsTrigger value="forecast" className="px-8 font-bold">Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-0">
          <TodayPlan />
        </TabsContent>

        <TabsContent value="activity" className="mt-0">
          <ActivityView />
        </TabsContent>

        <TabsContent value="forecast" className="mt-0">
          <ForecastView />
        </TabsContent>
      </Tabs>

      <TaskDialog open={isTaskOpen} onOpenChange={setIsTaskOpen} />
      <DeadlineDialog open={isDeadlineOpen} onOpenChange={setIsDeadlineOpen} />
    </div>
  );
}
