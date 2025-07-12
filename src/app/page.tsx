'use client';

import { DailyChallenge } from '@/components/dashboard/daily-challenge';
import { ChcDomainDashboard } from '@/components/dashboard/chc-domain-dashboard';
import { HabitTracker } from '@/components/dashboard/habit-tracker';
import { MilestoneBadges } from '@/components/dashboard/milestone-badges';
import { IqProxyProgress } from '@/components/dashboard/iq-proxy-progress';
import { CognitiveEnergyMeter } from '@/components/dashboard/cognitive-energy-meter';
import { WeakAreaRecommendations } from '@/components/dashboard/weak-area-recommendations';
import { AdaptiveDifficulty } from '@/components/dashboard/adaptive-difficulty';
import { WeeklyReflection } from '@/components/dashboard/weekly-reflection';
import { Header } from '@/components/header';
import { VisibilityProvider, useVisibility } from '@/contexts/VisibilityContext';

function DashboardContent() {
  const { visibleComponents } = useVisibility();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          {visibleComponents.dailyChallenge && <DailyChallenge />}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {visibleComponents.chcDomainDashboard && <ChcDomainDashboard />}
            </div>
            <aside className="lg:col-span-1 flex flex-col gap-6">
              {visibleComponents.habitTracker && <HabitTracker />}
              {visibleComponents.milestoneBadges && <MilestoneBadges />}
            </aside>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleComponents.iqProxyProgress && <IqProxyProgress />}
            {visibleComponents.cognitiveEnergyMeter && <CognitiveEnergyMeter />}
            {visibleComponents.weakAreaRecommendations && <WeakAreaRecommendations />}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleComponents.adaptiveDifficulty && <AdaptiveDifficulty />}
            {visibleComponents.weeklyReflection && <WeeklyReflection />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <VisibilityProvider>
      <DashboardContent />
    </VisibilityProvider>
  );
}
