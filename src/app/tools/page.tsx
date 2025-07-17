
'use client';

import { CognitiveCalendar } from '@/components/dashboard/cognitive-calendar';
import { JournalModule } from '@/components/dashboard/journal-module';
import { MoodView } from '@/components/mood/mood-view';
import { HabitsView } from '@/components/habits/habits-view';
import { FocusView } from '@/components/focus/focus-view';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';

export default function ToolsPage() {
  const { settings } = useDashboardSettings();

  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Productivity Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <JournalModule />
              <CognitiveCalendar />
            </CardContent>
          </Card>
          
          <Separator />

          <Card>
            <CardHeader>
              <CardTitle>Wellness Trackers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {settings.moodTracker && <MoodView />}
                {settings.habitTracker && <HabitsView />}
                {settings.effortTracker && <FocusView />}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
