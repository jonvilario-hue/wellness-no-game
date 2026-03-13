
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, BrainCircuit } from 'lucide-react';
import { DailyChallenge } from '@/components/dashboard/daily-challenge';
import { AllGames } from '@/components/dashboard/all-games';
import { HyperfocusBuilder } from '@/components/dashboard/hyperfocus-builder';
import { WeakAreaRecommendations } from '@/components/dashboard/weak-area-recommendations';
import { PerformanceInsights } from '@/components/dashboard/performance-insights';
import { MainDashboardView } from '@/components/dashboard/main-dashboard-view';

export default function SkillBuilderPage() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const savedState = localStorage.getItem('skill-builder-collapsible-state');
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState));
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    localStorage.setItem('skill-builder-collapsible-state', JSON.stringify(open));
  };

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
                            <div className="p-3 bg-primary/10 rounded-full mb-3 mx-auto w-fit">
                                <BrainCircuit className="h-10 w-10 text-primary"/>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight text-foreground">Skill Builder</h1>
                            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">Adaptive cognitive training across 8 core domains. Sharpen your mental hardware.</p>
                          </div>
                      </div>

                      <MainDashboardView />
                  </CollapsibleContent>

                  {!isOpen && (
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-xl font-bold font-headline tracking-tight text-foreground">Skill Builder</h1>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-auto py-1 px-4 text-[10px] uppercase font-black text-muted-foreground hover:text-primary gap-1">
                          <ChevronDown className="h-3 w-3" /> Expand Insights
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  )}
                </Collapsible>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <DailyChallenge />
                    <AllGames />
                </div>
                <div className="space-y-8">
                    <WeakAreaRecommendations />
                    <HyperfocusBuilder />
                    <PerformanceInsights />
                </div>
            </div>
        </div>
      </main>
    </>
  );
}
