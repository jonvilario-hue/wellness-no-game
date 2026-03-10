'use client';

import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { BookOpenText, Target, CheckCircle, Download, Checkbox, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { calendarContent, getThemeForWeek, getDailyQuote, type CalendarDay } from '@/data/calendar-content';
import { useCalendarTracker } from '@/hooks/use-calendar-tracker';
import { Button } from '@/components/ui/button';
import { Label } from '../ui/label';

export function ProductivityCalendar() {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [isClient, setIsClient] = React.useState(false);
  const { completedDays, toggleDayCompletion } = useCalendarTracker();

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const today = new Date();
  const weekTheme = getThemeForWeek(today);
  const dailyQuote = getDailyQuote(today);

  const selectedDayContent = React.useMemo(() => {
    const day = selectedDate.getDate();
    return calendarContent.find(c => c.day === day) || null;
  }, [selectedDate]);

  const handleDayClick = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
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
    <div className="space-y-6">
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
            selected={selectedDate}
            onSelect={handleDayClick}
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
                        <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                            <Icon className="w-3 h-3 text-muted-foreground/70" />
                        </div>
                    )}
                    {isCompleted && (
                        <div className="absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4">
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

      {selectedDayContent && (
        <Card className="border-primary/10 animate-in fade-in slide-in-from-top-2">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <selectedDayContent.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm font-bold">Day {selectedDayContent.day}: {selectedDayContent.prompt}</CardTitle>
                  <CardDescription className="text-xs">{selectedDayContent.description}</CardDescription>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "gap-2 h-8 rounded-full",
                  completedDays.includes(selectedDayContent.day) ? "text-green-600 bg-green-500/10" : "text-muted-foreground hover:text-primary"
                )}
                onClick={() => handleToggleCompletion(selectedDayContent.day)}
              >
                {completedDays.includes(selectedDayContent.day) ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                <span className="text-[10px] font-black uppercase">{completedDays.includes(selectedDayContent.day) ? 'Completed' : 'Mark Done'}</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {selectedDayContent.toolType === 'text' && (
              <p className="p-4 bg-muted/30 rounded-xl border border-dashed text-xs italic text-muted-foreground leading-relaxed">
                {selectedDayContent.toolContent}
              </p>
            )}
            {selectedDayContent.toolType === 'embed' && (
              <div className="aspect-video w-full rounded-xl overflow-hidden border">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedDayContent.toolContent}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
            {selectedDayContent.toolType === 'link' && (
              <Button asChild className="w-full h-10 font-bold gap-2">
                <a href={selectedDayContent.toolContent} target="_blank" rel="noopener noreferrer">
                  Open External Tool <BookOpenText className="w-4 h-4" />
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
