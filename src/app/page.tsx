import { AdaptiveDifficulty } from '@/components/dashboard/adaptive-difficulty';
import { ChcDomainDashboard } from '@/components/dashboard/chc-domain-dashboard';
import { CognitiveEnergyMeter } from '@/components/dashboard/cognitive-energy-meter';
import { DailyChallenge } from '@/components/dashboard/daily-challenge';
import { HabitTracker } from '@/components/dashboard/habit-tracker';
import { IqProxyProgress } from '@/components/dashboard/iq-proxy-progress';
import { MilestoneBadges } from '@/components/dashboard/milestone-badges';
import { WeakAreaRecommendations } from '@/components/dashboard/weak-area-recommendations';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <DailyChallenge />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ChcDomainDashboard />
            </div>

            <aside className="lg:col-span-1 flex flex-col gap-6">
              <HabitTracker />
              <MilestoneBadges />
            </aside>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <WeakAreaRecommendations />
              <AdaptiveDifficulty />
              <IqProxyProgress />
              <CognitiveEnergyMeter />
          </div>
        </div>
      </main>
    </div>
  );
}
