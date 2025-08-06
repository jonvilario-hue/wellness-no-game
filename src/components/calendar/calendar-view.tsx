
'use client';

import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { BookOpenText, Target, CheckCircle, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { calendarContent, getThemeForWeek, getDailyQuote, type CalendarDay } from '@/data/calendar-content';
import { DayDetailsDialog } from './day-details-dialog';
import { useCalendarTracker } from '@/hooks/use-calendar-tracker';
import { Button } from '@/components/ui/button';

export function ProductivityCalendar() {
  const [selectedDay, setSelectedDay] = React.useState<CalendarDay | null>(null);
  const [isClient, setIsClient] = React.useState(false);
  const { completedDays, toggleDayCompletion } = useCalendarTracker();

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const today = new Date();
  const weekTheme = getThemeForWeek(today);
  const dailyQuote = getDailyQuote(today);

  const handleDayClick = (date: Date | undefined) => {
    if (!date) return;
    const day = date.getDate();
    const content = calendarContent.find(c => c.day === day);
    if (content) {
      setSelectedDay(content);
    }
  };

  const handleDialogClose = () => {
    setSelectedDay(null);
  };

  const handleToggleCompletion = (day: number) => {
    toggleDayCompletion(day);
  };

  if (!isClient) {
    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Productivity Calendar</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] w-full bg-muted animate-pulse rounded-lg" />
            </CardContent>
        </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="text-center">
            <Badge variant="secondary" className="max-w-fit mx-auto mb-2">{weekTheme.theme}</Badge>
            <CardTitle className="text-2xl font-bold">Productivity Calendar</CardTitle>
            <CardDescription className="max-w-xl mx-auto">
              {dailyQuote}
            </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <Calendar
            mode="single"
            selected={selectedDay ? new Date(new Date().setDate(selectedDay.day)) : undefined}
            onDayClick={handleDayClick}
            className="rounded-md border p-4"
            components={{
              DayContent: ({ date, ...props }) => {
                const dayNumber = date.getDate();
                const isCompleted = completedDays.includes(dayNumber);
                const content = calendarContent.find(c => c.day === dayNumber);
                const Icon = content?.icon;

                return (
                  <div className="relative h-full w-full flex items-center justify-center">
                    <span>{date.getDate()}</span>
                    {Icon && (
                        <div className="absolute bottom-1 right-1">
                            <Icon className="w-3 h-3 text-muted-foreground" />
                        </div>
                    )}
                    {isCompleted && (
                        <div className="absolute top-1 left-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                        </div>
                    )}
                  </div>
                );
              },
            }}
          />
          <Button variant="outline" asChild>
            <a href="/placeholder-planner.pdf" download>
              <Download className="mr-2 h-4 w-4" /> Download Full Month Planner
            </a>
          </Button>
        </CardContent>
      </Card>
      {selectedDay && (
        <DayDetailsDialog 
            dayContent={selectedDay} 
            isOpen={!!selectedDay} 
            onClose={handleDialogClose}
            isCompleted={completedDays.includes(selectedDay.day)}
            onToggleCompletion={() => handleToggleCompletion(selectedDay.day)}
        />
      )}
    </>
  );
}
