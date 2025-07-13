
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, SlidersHorizontal, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useDashboardSettings, type DashboardComponent } from '@/hooks/use-dashboard-settings';
import { Separator } from '@/components/ui/separator';

const componentLabels: Record<DashboardComponent, string> = {
  dailyChallenge: 'Daily Challenge',
  allGames: 'All Training Games',
  mainDashboard: 'Main Dashboard (Efficiency/Strength)',
  habitTracker: 'Habit Tracker',
  milestoneBadges: 'Milestone Badges',
  performanceInsights: 'Performance Insights',
  weakAreaRecommendations: 'Weak Area Targeting',
  adaptiveDifficulty: 'Adaptive Difficulty',
  habitJournal: 'Habit Journal',
};

export default function SettingsPage() {
    const { settings, toggleSetting, resetSettings } = useDashboardSettings();

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
           <header className="px-4 sm:px-6 md:px-8 py-4 border-b bg-card sticky top-0 z-10">
            <div className="mx-auto max-w-7xl flex items-center justify-between">
                <div className="flex-1 flex justify-start">
                  <Button asChild variant="outline">
                      <Link href="/">
                      <ArrowLeft className="mr-2" />
                      Back to Dashboard
                      </Link>
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                    <SlidersHorizontal className="h-7 w-7 text-primary" />
                    <h1 className="text-2xl font-bold text-foreground font-headline tracking-tight">
                    Settings
                    </h1>
                </div>
                 <div className="flex-1 flex justify-end">
                    <Button variant="ghost" onClick={resetSettings}>
                        <RefreshCw className="mr-2 h-4 w-4"/>
                        Reset Layout
                    </Button>
                 </div>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 md:p-8">
            <div className="mx-auto max-w-2xl space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customize Dashboard</CardTitle>
                  <CardDescription>
                    Toggle the visibility of components on your main dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.keys(settings).map((key) => {
                      const componentKey = key as DashboardComponent;
                      return (
                        <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <Label htmlFor={`switch-${key}`} className="font-medium">
                            {componentLabels[componentKey]}
                          </Label>
                          <Switch
                            id={`switch-${key}`}
                            checked={settings[componentKey]}
                            onCheckedChange={() => toggleSetting(componentKey)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      );
}
