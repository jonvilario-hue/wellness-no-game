
'use client';

import { DailyChallenge } from '@/components/dashboard/daily-challenge';
import { AllGames } from '@/components/dashboard/all-games';
import { GameProgressTracker } from '@/components/dashboard/game-progress-tracker';
import { MilestoneBadges } from '@/components/dashboard/milestone-badges';
import { PerformanceInsights } from '@/components/dashboard/performance-insights';
import { WeakAreaRecommendations } from '@/components/dashboard/weak-area-recommendations';
import { AdaptiveDifficulty } from '@/components/dashboard/adaptive-difficulty';
import { MainDashboardView } from '@/components/dashboard/main-dashboard-view';
import { useDashboardSettings, dashboardLayoutKeys } from '@/hooks/use-dashboard-settings';
import { HyperfocusBuilder } from '@/components/dashboard/hyperfocus-builder';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { PageSpecificSettings } from '@/components/page-specific-settings';

export default function GamesPage() {
  const { settings } = useDashboardSettings();

  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="space-y-6">
          {settings.dailyChallenge && <DailyChallenge />}
          {settings.allGames && <AllGames />}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {settings.performanceOverview && <MainDashboardView />}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {settings.gameProgressTracker && <GameProgressTracker />}
                {settings.milestoneBadges && <MilestoneBadges />}
              </div>
              
              {settings.adaptiveDifficulty && <AdaptiveDifficulty />}
            </div>
            
            <aside className="lg:col-span-1 flex flex-col gap-6">
              {settings.performanceInsights && <PerformanceInsights />}
              {settings.hyperfocusBuilder && <HyperfocusBuilder />}
              {settings.weakAreaRecommendations && <WeakAreaRecommendations />}
            </aside>
          </div>
        </div>
      </main>
      <PageSpecificSettings settingsKeys={dashboardLayoutKeys} />
    </>
  );
}
