
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarView } from '../calendar/calendar-view';
import { CalendarDays, Expand } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

export function CognitiveCalendar() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 font-headline">
            <CalendarDays className="w-5 h-5 text-primary" />
            Training Log
          </CardTitle>
          <CardDescription>
            View your training history and journal entries.
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/calendar">
            <Expand className="w-4 h-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <CalendarView />
      </CardContent>
    </Card>
  );
}
