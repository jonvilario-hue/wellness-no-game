
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Moon, BarChart3, Wind, Settings, Brain } from 'lucide-react';
import { SleepDashboard } from '@/components/sleep/sleep-dashboard';
import { WindDownMode } from '@/components/sleep/wind-down-mode';
import { SleepSettings } from '@/components/sleep/sleep-settings';
import { ChronotypeAssessment } from '@/components/sleep/chronotype-assessment';
import { useSleepProStore } from '@/hooks/use-sleep-pro-store';
import { useEffect, useState } from 'react';

export default function SleepModePage() {
  const { logs } = useSleepProStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [logs.length]);

  if (!mounted) return null;

  return (
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
  );
}
