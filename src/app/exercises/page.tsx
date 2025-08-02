
'use client';

import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import WellnessTabs from '@/components/wellness/WellnessTabs';
import DailyPractice from '@/components/wellness/DailyPractice';
import WellnessHeatmap from '@/components/wellness/WellnessHeatmap';
import RoutineBuilderModal from '@/components/wellness/RoutineBuilderModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DailyPractice />
            <Card>
              <CardHeader>
                <CardTitle>Build Your Own Routine</CardTitle>
                <CardDescription>Create a personalized wellness routine by combining different movement and stillness practices.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <RoutineBuilderModal />
              </CardContent>
            </Card>
          </div>
          <WellnessTabs />
          <WellnessHeatmap activityData={mockActivityData} />
        </div>
      </main>
    </>
  );
}
