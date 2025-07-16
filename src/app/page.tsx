
'use client';

import { DailyChallenge } from '@/components/dashboard/daily-challenge';
import { HabitTracker } from '@/components/dashboard/habit-tracker';
import { MilestoneBadges } from '@/components/dashboard/milestone-badges';
import { PerformanceInsights } from '@/components/dashboard/performance-insights';
import { WeakAreaRecommendations } from '@/components/dashboard/weak-area-recommendations';
import { AdaptiveDifficulty } from '@/components/dashboard/adaptive-difficulty';
import { Header } from '@/components/header';
import { MainDashboardView } from '@/components/dashboard/main-dashboard-view';
import { AllGames } from '@/components/dashboard/all-games';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';
import { GameProgressTracker } from '@/components/dashboard/game-progress-tracker';
import { HyperfocusBuilder } from '@/components/dashboard/hyperfocus-builder';
import { CognitiveCalendar } from '@/components/dashboard/cognitive-calendar';

function DashboardContent() {
  const { settings } = useDashboardSettings();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          {settings.dailyChallenge && <DailyChallenge />}

          {settings.allGames && <AllGames />}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {settings.mainDashboard && <MainDashboardView />}
              {settings.cognitiveCalendar && <CognitiveCalendar />}
            </div>
            <aside className="lg:col-span-1 flex flex-col gap-6">
              {settings.hyperfocusBuilder && <HyperfocusBuilder />}
              {settings.weakAreaRecommendations && <WeakAreaRecommendations />}
              {settings.gameProgressTracker && <GameProgressTracker />}
              {settings.adaptiveDifficulty && <AdaptiveDifficulty />}
            </aside>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {settings.performanceInsights && <PerformanceInsights />}
            {settings.milestoneBadges && <MilestoneBadges />}
          </div>

          <div className="grid grid-cols-1">
             {settings.habitTracker && <HabitTracker />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <DashboardContent />
  );
}
