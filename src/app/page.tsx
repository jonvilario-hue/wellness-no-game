
'use client';

import { DailyChallenge } from '@/components/dashboard/daily-challenge';
import { AllGames } from '@/components/dashboard/all-games';
import { GameProgressTracker } from '@/components/dashboard/game-progress-tracker';
import { MilestoneBadges } from '@/components/dashboard/milestone-badges';
import { PerformanceInsights } from '@/components/dashboard/performance-insights';
import { WeakAreaRecommendations } from '@/components/dashboard/weak-area-recommendations';
import { AdaptiveDifficulty } from '@/components/dashboard/adaptive-difficulty';
import { MainDashboardView } from '@/components/dashboard/main-dashboard-view';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';
import { HyperfocusBuilder } from '@/components/dashboard/hyperfocus-builder';
import { HabitTracker } from '@/components/dashboard/habit-tracker';
import { Header } from '@/components/header';

export default function GamesPage() {
  const { settings } = useDashboardSettings();

  return (
    <div className="space-y-6">
      {settings.dailyChallenge && <DailyChallenge />}
      {settings.allGames && <AllGames />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {settings.mainDashboard && <MainDashboardView />}
        </div>
        <aside className="lg:col-span-1 flex flex-col gap-6">
          {settings.weakAreaRecommendations && <WeakAreaRecommendations />}
          {settings.adaptiveDifficulty && <AdaptiveDifficulty />}
          {settings.hyperfocusBuilder && <HyperfocusBuilder />}
        </aside>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settings.gameProgressTracker && <GameProgressTracker />}
        {settings.milestoneBadges && <MilestoneBadges />}
        {settings.performanceInsights && <PerformanceInsights />}
      </div>
    </div>
  );
}
