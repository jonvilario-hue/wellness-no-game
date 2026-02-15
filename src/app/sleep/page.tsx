
'use client';

import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Moon, BarChart3, Wind, Settings, Sparkles, Brain, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SleepDashboard } from '@/components/sleep/sleep-dashboard';
import { WindDownMode } from '@/components/sleep/wind-down-mode';
import { SleepSettings } from '@/components/sleep/sleep-settings';
import { ChronotypeAssessment } from '@/components/sleep/chronotype-assessment';
import { useSleepProStore } from '@/hooks/use-sleep-pro-store';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function SleepModePage() {
  const { logs, generateSimulatedNight } = useSleepProStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Ensure at least some data exists for the walkthrough
    if (logs.length === 0) {
      // generateSimulatedNight();
    }
  }, [logs.length]);

  if (!mounted) return null;

  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col items-center text-center space-y-2 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Moon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold font-headline">Sleep Mode Pro</h1>
            <p className="text-muted-foreground max-w-2xl">
              Optimize your recovery to fuel your cognitive performance. 
              Track cycles, manage wind-down routines, and wake up refreshed.
            </p>
          </div>

          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
              <TabsTrigger value="dashboard"><BarChart3 className="w-4 h-4 mr-2"/>Dashboard</TabsTrigger>
              <TabsTrigger value="wind-down"><Wind className="w-4 h-4 mr-2"/>Wind Down</TabsTrigger>
              <TabsTrigger value="assessment"><Brain className="w-4 h-4 mr-2"/>Chronotype</TabsTrigger>
              <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2"/>Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="mt-6">
              <SleepDashboard />
            </TabsContent>

            <TabsContent value="wind-down" className="mt-6">
              <WindDownMode />
            </TabsContent>

            <TabsContent value="assessment" className="mt-6">
              <ChronotypeAssessment />
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <SleepSettings />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
