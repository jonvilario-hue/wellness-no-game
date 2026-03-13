
'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, BrainCircuit, Flame, Zap, ZapOff, Lightbulb, Play } from 'lucide-react';
import { useWellnessData, calculateStreak } from '@/hooks/use-wellness-data';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { AssistantTooltip } from '@/components/assistant-tooltip';
import { CommunicationDashboard } from '@/components/wellness/CommunicationDashboard';
import { SpeedReadingStats } from '@/components/wellness/SpeedReadingDashboard';
import { JourneyPlansSection } from '@/components/wellness/JourneyPlansSection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import CommunicationContent from '@/components/wellness/CommunicationContent';
import SpeedReadingContent from '@/components/wellness/SpeedReadingContent';
import { communicationPractices } from '@/data/communication-practices';
import { readingPassages } from '@/data/speedreading-passages';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

function SkillBuilderPageContent() {
  const [isOpen, setIsOpen] = useState(true);
  const [isCurriculaExpanded, setIsCurriculaExpanded] = useState(false);
  const searchParams = useSearchParams();
  
  const activeTab = searchParams.get('tab') || 'communication';
  const { lowEnergyMode, setLowEnergyMode, completions } = useWellnessData();

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

  const currentCategory = useMemo(() => {
    return activeTab === 'speedreading' ? 'Speed Reading' : 'Communication';
  }, [activeTab]);

  const mvdRecommendation = useMemo(() => {
    if (!lowEnergyMode) return null;
    
    if (activeTab === 'communication') {
      const rec = communicationPractices.find(e => e.tags.includes('quick')) || communicationPractices[0];
      return { ...rec, type: 'communication' };
    }
    if (activeTab === 'speedreading') {
      const rec = readingPassages.find(p => p.tier === 'Casual') || readingPassages[0];
      return { ...rec, type: 'speedreading', name: rec.title, description: `A ${rec.tier} drill to maintain velocity.` };
    }
    return null;
  }, [lowEnergyMode, activeTab]);

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
                            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">Adaptive cognitive training laboratory. Sharpen your mental and interpersonal hardware.</p>
                          </div>
                      </div>

                      <div className="w-full">
                        {activeTab === 'communication' && <CommunicationDashboard />}
                        {activeTab === 'speedreading' && <SpeedReadingStats />}
                      </div>
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

                {/* Global Action Bar */}
                <div className="flex flex-col gap-4 py-4 border-y border-primary/5 bg-muted/10 rounded-2xl">
                    <div className="flex flex-wrap items-center justify-center gap-4 px-4">
                        <AssistantTooltip text="MVD (Minimum Viable Day) Mode filters your library to show only 'zero-friction' drills.">
                          <div className={cn(
                              "flex items-center gap-3 px-4 py-2 rounded-full border transition-all h-11",
                              lowEnergyMode ? "bg-amber-500/10 border-amber-500/30" : "bg-background border-primary/10"
                          )}>
                              {lowEnergyMode ? <ZapOff className="w-4 h-4 text-amber-500" /> : <Zap className="w-4 h-4 text-primary" />}
                              <Label htmlFor="mvd-toggle" className="text-sm font-bold cursor-pointer whitespace-nowrap">
                                  MVD Mode
                              </Label>
                              <Switch 
                                  id="mvd-toggle" 
                                  checked={lowEnergyMode} 
                                  onCheckedChange={setLowEnergyMode}
                              />
                          </div>
                        </AssistantTooltip>

                        <JourneyPlansSection 
                          category={currentCategory as any} 
                          isExpanded={isCurriculaExpanded}
                          onToggle={() => setIsCurriculaExpanded(!isCurriculaExpanded)}
                          mode="trigger"
                        />
                    </div>

                    {isCurriculaExpanded && (
                      <div className="w-full pt-2 animate-in fade-in slide-in-from-top-2 duration-500">
                        <JourneyPlansSection 
                          category={currentCategory as any} 
                          isExpanded={isCurriculaExpanded}
                          onToggle={() => setIsCurriculaExpanded(!isCurriculaExpanded)}
                          mode="gallery"
                        />
                      </div>
                    )}
                </div>
            </div>
            
            <Tabs defaultValue={activeTab} className="w-full">
              <div className="flex justify-center mb-6">
                <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted/50 p-1">
                  <TabsTrigger value="communication" className="gap-2">
                    <MessageSquare className="w-4 h-4" /> Communication
                  </TabsTrigger>
                  <TabsTrigger value="speedreading" className="gap-2">
                    <Zap className="w-4 h-4" /> Speed Reading
                  </TabsTrigger>
                </TabsList>
              </div>

              {lowEnergyMode && mvdRecommendation && (
                <div className="mb-8 px-1 animate-in fade-in slide-in-from-top-2 duration-500">
                  <Card className="border-amber-500/20 bg-amber-500/5 overflow-hidden shadow-sm">
                    <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4 text-left">
                        <div className="p-3 bg-amber-500/10 rounded-xl shrink-0">
                          <Lightbulb className="w-5 h-5 text-amber-600" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <Badge className="bg-amber-500 text-white border-none text-[8px] font-black uppercase tracking-widest px-2 h-4">MVD Choice</Badge>
                            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-tighter">Zero Friction Drill</span>
                          </div>
                          <h4 className="font-bold text-sm truncate">{(mvdRecommendation as any).name}</h4>
                          <p className="text-[10px] text-muted-foreground line-clamp-1 italic">"{(mvdRecommendation as any).description}"</p>
                        </div>
                      </div>
                      <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700 text-white font-bold h-9 px-6 rounded-full shrink-0 shadow-sm transition-transform hover:scale-105 active:scale-95">
                        <Link href={activeTab === 'speedreading' ? '/skills?tab=speedreading' : `/skills?tab=${activeTab}#practice-${mvdRecommendation.id}`}>
                          Execute Now <Play className="ml-2 w-3 h-3 fill-current" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              <TabsContent value="communication" className="animate-in fade-in duration-300">
                <CommunicationContent />
              </TabsContent>
              <TabsContent value="speedreading" className="animate-in fade-in duration-300">
                <SpeedReadingContent />
              </TabsContent>
            </Tabs>
        </div>
      </main>
    </>
  );
}

export default function SkillBuilderPage() {
  return (
    <Suspense fallback={<div>Loading Skills...</div>}>
      <SkillBuilderPageContent />
    </Suspense>
  )
}

import { MessageSquare } from 'lucide-react';
