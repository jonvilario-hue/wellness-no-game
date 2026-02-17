
'use client';

import { useMemo } from 'react';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { useStudyDashboardStore } from '@/hooks/use-study-dashboard-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, addDays, startOfDay, parseISO, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function ForecastView() {
  const { cards, decks } = useFlashcardStore();
  const { tasks } = useStudyDashboardStore();

  const forecastData = useMemo(() => {
    const data = [];
    const today = startOfDay(new Date());

    for (let i = 0; i < 7; i++) {
      const date = addDays(today, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      
      const reviews = cards.filter(c => {
        const due = startOfDay(new Date(c.dueDate));
        return isSameDay(due, date);
      }).length;

      const dailyTasks = tasks.filter(t => t.date === dateStr).length;
      
      // Basic forecast logic: sum of deck's newCardsPerDay for future dates
      const newCards = i > 0 ? decks.reduce((acc, d) => acc + d.settings.newCardsPerDay, 0) : 0;

      data.push({
        name: format(date, 'EEE'),
        fullDate: format(date, 'MMM do'),
        reviews,
        newCards,
        tasks: dailyTasks,
        total: reviews + newCards + dailyTasks,
        isToday: i === 0
      });
    }
    return data;
  }, [cards, decks, tasks]);

  const maxTotal = Math.max(...forecastData.map(d => d.total), 1);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            Workload Forecast
          </CardTitle>
          <CardDescription>Predicted cognitive load for the next 7 days.</CardDescription>
        </CardHeader>
        <CardContent className="h-80 pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={forecastData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.05} />
              <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} stroke="hsl(var(--muted-foreground))" />
              <YAxis fontSize={10} axisLine={false} tickLine={false} stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-3 bg-background border rounded-xl shadow-xl space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{data.fullDate}</p>
                        <div className="space-y-1">
                          <p className="text-xs font-bold flex justify-between gap-4"><span>Reviews:</span> <span className="text-primary">{data.reviews}</span></p>
                          <p className="text-xs font-bold flex justify-between gap-4"><span>New:</span> <span className="text-blue-400">{data.newCards}</span></p>
                          <p className="text-xs font-bold flex justify-between gap-4"><span>Tasks:</span> <span className="text-orange-400">{data.tasks}</span></p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="reviews" stackId="a" fill="hsl(var(--primary))" radius={[0, 0, 0, 0]} />
              <Bar dataKey="newCards" stackId="a" fill="hsl(var(--blue-400))" radius={[0, 0, 0, 0]} />
              <Bar dataKey="tasks" stackId="a" fill="hsl(var(--energize))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-7 gap-2">
        {forecastData.map((day, i) => {
          const loadColor = day.total > 100 ? 'bg-destructive' : day.total > 50 ? 'bg-orange-500' : 'bg-primary';
          return (
            <div key={i} className="space-y-2">
              <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
                <div 
                  className={cn("h-full transition-all duration-1000", loadColor)} 
                  style={{ width: `${(day.total / maxTotal) * 100}%` }} 
                />
              </div>
              <p className={cn("text-[9px] font-black uppercase text-center", day.isToday ? "text-primary" : "text-muted-foreground opacity-60")}>
                {day.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
