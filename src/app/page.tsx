import { AdaptiveDifficulty } from '@/components/dashboard/adaptive-difficulty';
import { ChcDomainDashboard } from '@/components/dashboard/chc-domain-dashboard';
import { HabitTracker } from '@/components/dashboard/habit-tracker';
import { MilestoneBadges } from '@/components/dashboard/milestone-badges';
import { WeakAreaRecommendations } from '@/components/dashboard/weak-area-recommendations';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 xl:col-span-9">
            <ChcDomainDashboard />
          </div>
          <aside className="lg:col-span-4 xl:col-span-3 flex flex-col gap-6">
            <HabitTracker />
            <MilestoneBadges />
            <WeakAreaRecommendations />
            <AdaptiveDifficulty />
          </aside>
        </div>
      </main>
    </div>
  );
}
