
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import WellnessTabs from '@/components/wellness/WellnessTabs';
import WellnessHeatmap from '@/components/wellness/WellnessHeatmap';
import RoutineBuilderModal from '@/components/wellness/RoutineBuilderModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, HeartPulse } from 'lucide-react';


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
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const savedState = localStorage.getItem('health-check-collapsible-state');
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState));
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    localStorage.setItem('health-check-collapsible-state', JSON.stringify(open));
  };


  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
            <Collapsible open={isOpen} onOpenChange={handleOpenChange} className="w-full">
              <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <CollapsibleContent>
                        <div className="flex flex-col items-center text-center pb-4">
                            <HeartPulse className="mx-auto h-12 w-12 text-primary mb-2"/>
                            <h1 className="text-4xl font-bold font-headline">Health Check</h1>
                            <p className="text-lg text-muted-foreground">Wellness practices for body and mind.</p>
                        </div>
                    </CollapsibleContent>
                  </div>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon">
                        {isOpen ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>
              </div>
            </Collapsible>

            <div className="flex justify-center">
                <RoutineBuilderModal />
            </div>
            
            <WellnessTabs />
            <WellnessHeatmap activityData={mockActivityData} />
        </div>
      </main>
    </>
  );
}
