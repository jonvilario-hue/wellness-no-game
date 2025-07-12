
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { VisibilityProvider, useVisibility, type ComponentKey } from '@/contexts/VisibilityContext';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const componentLabels: Record<ComponentKey, string> = {
  dailyChallenge: 'Daily Challenge Banner',
  chcDomainDashboard: 'Cognitive Domains Dashboard',
  habitTracker: 'Habit Tracker',
  milestoneBadges: 'Milestone Badges',
  iqProxyProgress: 'Cognitive Efficiency (IQ Proxy)',
  cognitiveEnergyMeter: 'Performance Insights',
  weakAreaRecommendations: 'Weak Area Targeting',
  adaptiveDifficulty: 'Adaptive Difficulty',
  habitJournal: 'Habit & Journal',
};

function SettingsContent() {
  const { visibleComponents, toggleComponent } = useVisibility();

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
             <div className="flex-1"></div>
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
            <CardContent className="space-y-4">
              {Object.keys(visibleComponents).map((key) => (
                <div key={key} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <Label htmlFor={key} className="font-medium">
                    {componentLabels[key as ComponentKey]}
                  </Label>
                  <Switch
                    id={key}
                    checked={visibleComponents[key as ComponentKey]}
                    onCheckedChange={() => toggleComponent(key as ComponentKey)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function SettingsPage() {
    return (
        <VisibilityProvider>
            <SettingsContent />
        </VisibilityProvider>
    )
}
