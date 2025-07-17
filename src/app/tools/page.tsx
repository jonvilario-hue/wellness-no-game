
'use client';

import { CognitiveCalendar } from '@/components/dashboard/cognitive-calendar';
import { JournalModule } from '@/components/dashboard/journal-module';
import { MoodView } from '@/components/mood/mood-view';
import { HabitsView } from '@/components/habits/habits-view';
import { FocusView } from '@/components/focus/focus-view';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TimeToolsModule } from '@/components/dashboard/time-tools-module';
import { FlashcardDecks } from '@/components/flashcards/flashcard-decks';

export default function ToolsPage() {
  return (
    <div className="space-y-8">
      <FlashcardDecks />

      <Separator />

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
            <MoodView />
            <HabitsView />
            <FocusView />
        </CardContent>
      </Card>

      <Separator />

      <TimeToolsModule />
    </div>
  );
}
