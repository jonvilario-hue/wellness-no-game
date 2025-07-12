'use client';

import { DailyChallenge } from '@/components/dashboard/daily-challenge';
import { ChcDomainDashboard } from '@/components/dashboard/chc-domain-dashboard';
import { HabitTracker } from '@/components/dashboard/habit-tracker';
import { MilestoneBadges } from '@/components/dashboard/milestone-badges';
import { IqProxyProgress } from '@/components/dashboard/iq-proxy-progress';
import { CognitiveEnergyMeter } from '@/components/dashboard/cognitive-energy-meter';
import { WeakAreaRecommendations } from '@/components/dashboard/weak-area-recommendations';
import { AdaptiveDifficulty } from '@/components/dashboard/adaptive-difficulty';
import { HabitJournal } from '@/components/dashboard/habit-journal';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRef } from 'react';

function DashboardContent() {
  const journalRef = useRef<HTMLDivElement>(null);

  const handleNewNoteClick = () => {
    journalRef.current?.scrollIntoView({ behavior: 'smooth' });
    // The HabitJournal component itself will handle the logic
    // for creating a new note via its own "New" button.
  }

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <IqProxyProgress />
            <CognitiveEnergyMeter />
            <WeakAreaRecommendations />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" ref={journalRef}>
            <AdaptiveDifficulty />
            <HabitJournal />
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
