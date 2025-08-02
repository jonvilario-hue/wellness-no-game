
'use client';

import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import WellnessTabs from '@/components/wellness/WellnessTabs';
import DailyPractice from '@/components/wellness/DailyPractice';
import WellnessHeatmap from '@/components/wellness/WellnessHeatmap';

const mockActivityData = [
  { date: '2024-07-01', count: 1 },
  { date: '2024-07-03', count: 2 },
  { date: '2024-07-04', count: 3 },
  { date: '2024-07-06', count: 1 },
  { date: '2024-07-08', count: 2 },
  { date: '2024-07-09', count: 1 },
  { date: '2024-07-11', count: 3 },
  { date: '2024-07-12', count: 2 },
  { date: '2024-07-13', count: 1 },
  { date: '2024-07-15', count: 2 },
  { date: '2024-07-17', count: 1 },
];

export default function ExercisesPage() {
  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <DailyPractice />
          <WellnessTabs />
          <WellnessHeatmap activityData={mockActivityData} />
        </div>
      </main>
    </>
  );
}
