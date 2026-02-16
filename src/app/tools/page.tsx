
'use client';

import { JournalModule } from '@/components/dashboard/journal-module';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { JournalCalendar } from '@/components/journal/journal-calendar';

export default function ToolsPage() {
  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Reflections & Journal</CardTitle>
            </CardHeader>
            <CardContent>
              <JournalModule />
            </CardContent>
          </Card>
          
          <JournalCalendar />
        </div>
      </main>
    </>
  );
}
