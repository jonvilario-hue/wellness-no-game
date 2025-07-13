
'use client';

import { DailyChallenge } from '@/components/dashboard/daily-challenge';
import { HabitTracker } from '@/components/dashboard/habit-tracker';
import { MilestoneBadges } from '@/components/dashboard/milestone-badges';
import { PerformanceInsights } from '@/components/dashboard/performance-insights';
import { WeakAreaRecommendations } from '@/components/dashboard/weak-area-recommendations';
import { AdaptiveDifficulty } from '@/components/dashboard/adaptive-difficulty';
import { HabitJournal } from '@/components/dashboard/habit-journal';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRef } from 'react';
import { MainDashboardView } from '@/components/dashboard/main-dashboard-view';
import { AllGames } from '@/components/dashboard/all-games';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';
import { GameProgressTracker } from '@/components/dashboard/game-progress-tracker';
import { useJournal } from '@/hooks/use-journal';
import { CognitiveFocusBuilder } from '@/components/dashboard/cognitive-focus-builder';

function DashboardContent() {
  const journalRef = useRef<HTMLDivElement>(null);
  const { settings } = useDashboardSettings();
  const { setSelectedEntry, createNewEntry } = useJournal();


  const handleNewNoteClick = () => {
    journalRef.current?.scrollIntoView({ behavior: 'smooth' });
    setSelectedEntry(createNewEntry());
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          {settings.dailyChallenge && <DailyChallenge />}

          {settings.allGames && <AllGames />}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {settings.mainDashboard && <MainDashboardView />}
            </div>
            <aside className="lg:col-span-1 flex flex-col gap-6">
              {settings.cognitiveFocusBuilder && <CognitiveFocusBuilder />}
              {settings.habitTracker && <HabitTracker />}
              {settings.gameProgressTracker && <GameProgressTracker />}
              {settings.milestoneBadges && <MilestoneBadges />}
            </aside>
          </div>
          
          {(settings.performanceInsights || settings.weakAreaRecommendations) && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {settings.performanceInsights && <PerformanceInsights />}
              {settings.weakAreaRecommendations && <WeakAreaRecommendations />}
            </div>
          )}

          <div className="grid grid-cols-1 md:col-span-2 gap-6" ref={journalRef}>
            {settings.adaptiveDifficulty && <AdaptiveDifficulty />}
            {settings.habitJournal && <HabitJournal ref={journalRef} />}
          </div>
        </div>
      </main>
      <Button 
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        onClick={handleNewNoteClick}
        aria-label="Create new journal entry"
      >
        <Plus className="h-8 w-8" />
      </Button>
    </div>
  );
}

export default function Home() {
  return (
    <DashboardContent />
  );
}
