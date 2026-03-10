
'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import WellnessTabs from '@/components/wellness/WellnessTabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, HeartPulse, Zap, ZapOff, Flame, Rocket, ArrowRight, Info, Lightbulb } from 'lucide-react';
import { useWellnessData, calculateStreak } from '@/hooks/use-wellness-data';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';
import { WellnessBalance } from '@/components/wellness/WellnessBalance';
import { AssistantTooltip } from '@/components/assistant-tooltip';
import { MovementDashboard } from '@/components/wellness/MovementDashboard';
import { StillnessDashboard } from '@/components/wellness/StillnessDashboard';
import { CommunicationDashboard } from '@/components/wellness/CommunicationDashboard';
import { SpeedReadingStats } from '@/components/wellness/SpeedReadingDashboard';

function ExercisesPageContent() {
  const [isOpen, setIsOpen] = useState(true);
  const searchParams = useSearchParams();
  
  const activeTab = searchParams.get('tab') || 'movement';
  const { lowEnergyMode, setLowEnergyMode, completions } = useWellnessData();
  const { settings } = useDashboardSettings();

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

  const streak = useMemo(() => calculateStreak(completions), [completions]);

  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8 pb-24 overflow-x-hidden">
        <div className="mx-auto max-w-7xl space-y-8">
            
            <div className="flex flex-col gap-4">
                <Collapsible open={isOpen} onOpenChange={handleOpenChange} className="w-full relative">
                  <div className="absolute top-0 right-0 z-10">
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10">
                            {isOpen ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>
                  </div>

                  <CollapsibleContent className="space-y-8">
                      <div className="flex flex-col items-center text-center pb-4 px-10 space-y-4">
                          <div>
                            <HeartPulse className="mx-auto h-12 w-12 text-primary mb-2"/>
                            <h1 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight text-foreground">Health Check</h1>
                            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">Actionable wellness for body and brain. Log your daily reps.</p>
                          </div>
                      </div>

                      <WellnessBalance />

                      {/* Dashboards */}
                      <div className="w-full">
                        {activeTab === 'movement' && <MovementDashboard />}
                        {activeTab === 'stillness' && <StillnessDashboard />}
                        {activeTab === 'communication' && <CommunicationDashboard />}
                        {activeTab === 'speedreading' && <SpeedReadingStats />}
                      </div>
                  </CollapsibleContent>

                  {!isOpen && (
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-xl font-bold font-headline tracking-tight text-foreground">Health Check</h1>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-auto py-1 px-4 text-[10px] uppercase font-black text-muted-foreground hover:text-primary gap-1">
                          <ChevronDown className="h-3 w-3" /> Expand Insights
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  )}
                </Collapsible>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <AssistantTooltip text="Your Global Wellness Streak tracks consecutive days where you completed at least one full routine or practice. Consistency is the primary driver of epigenetic and neurological adaptation.">
                      <Card className="bg-primary/5 border-primary/10 rounded-full py-2 px-6 shadow-sm w-fit">
                          <div className="flex items-center gap-2">
                              <Flame className="w-5 h-5 text-orange-500" />
                              <span className="text-xl font-black">{streak}</span>
                              <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Wellness Streak</span>
                          </div>
                      </Card>
                    </AssistantTooltip>

                    <AssistantTooltip text="MVD (Minimum Viable Day) Mode filters your entire library to show only 'zero-friction' practices. Use this when your cognitive or physical battery is low to maintain your habit streak without risking burnout.">
                      <div className={cn(
                          "flex items-center gap-3 px-4 py-2 rounded-full border transition-all",
                          lowEnergyMode ? "bg-amber-500/10 border-amber-500/30" : "bg-muted/50 border-transparent"
                      )}>
                          {lowEnergyMode ? <ZapOff className="w-4 h-4 text-amber-500" /> : <Zap className="w-4 h-4 text-primary" />}
                          <Label htmlFor="mvd-toggle" className="text-sm font-bold cursor-pointer">
                              Low Energy Mode (MVD)
                          </Label>
                          <Switch 
                              id="mvd-toggle" 
                              checked={lowEnergyMode} 
                              onCheckedChange={setLowEnergyMode}
                          />
                      </div>
                    </AssistantTooltip>
                </div>
            </div>
            
            <WellnessTabs />
        </div>
      </main>
    </>
  );
}

export default function ExercisesPage() {
  return (
    <Suspense fallback={<div>Loading Lab...</div>}>
      <ExercisesPageContent />
    </Suspense>
  )
}
