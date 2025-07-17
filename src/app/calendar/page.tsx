
'use client';

import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CalendarView } from '@/components/calendar/calendar-view';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';

export default function CalendarPage() {
    return (
        <>
            <div className="sticky top-0 z-20">
                <Header />
                <PageNav />
            </div>
            <MotivationalMessage />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <div className="mx-auto max-w-5xl">
                    <CalendarView />
                </div>
            </main>
        </>
      );
}
