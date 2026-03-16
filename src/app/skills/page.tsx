
'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, BrainCircuit, Lightbulb, Play, MessageSquare, Zap, ZapOff, Sigma, Music, Code2, Pencil } from 'lucide-react';
import { useWellnessData } from '@/hooks/use-wellness-data';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { AssistantTooltip } from '@/components/assistant-tooltip';
import { CommunicationDashboard } from '@/components/wellness/CommunicationDashboard';
import { SpeedReadingStats } from '@/components/wellness/SpeedReadingDashboard';
import { MathDashboard } from '@/components/wellness/MathDashboard';
import { MusicGlobalHeader } from '@/components/wellness/MusicDashboard';
import { CodingDashboard } from '@/components/wellness/CodingDashboard';
import { JourneyPlansSection } from '@/components/wellness/JourneyPlansSection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import CommunicationContent from '@/components/wellness/CommunicationContent';
import SpeedReadingContent from '@/components/wellness/SpeedReadingContent';
import MusicContent from '@/components/wellness/MusicContent';
import CodingContent from '@/components/wellness/CodingContent';
import DrawingContent from '@/components/wellness/DrawingContent';
import { MathComposureLab } from '@/components/wellness/MathComposureLab';
import { communicationPractices } from '@/data/communication-practices';
import { readingPassages } from '@/data/speedreading-passages';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

function SkillBuilderPageContent() {
  const [isOpen, setIsOpen] = useState(true);
  const [isCurriculaExpanded, setIsCurriculaExpanded] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const activeTab = searchParams.get('tab') || 'communication';
  const { lowEnergyMode, setLowEnergyMode } = useWellnessData();

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

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const currentCategory = useMemo(() => {
    if (activeTab === 'speedreading') return 'Speed Reading';
    if (activeTab === 'math') return 'Math';
    if (activeTab === 'music') return 'Music';
    if (activeTab === 'coding' || activeTab === 'drawing') return 'Custom'; 
    return 'Communication';
  }, [activeTab]);

  return (
    <div className="space-y-8">
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
                        <h1 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight text-foreground uppercase tracking-tighter">Skill Builder</h1>
                        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">Adaptive cognitive training laboratory. Sharpen your mental and interpersonal hardware.</p>
                      </div>
                  </div>

                  <div className="w-full">
                    {activeTab === 'communication' && <CommunicationDashboard />}
                    {activeTab === 'speedreading' && <SpeedReadingStats />}
                    {activeTab === 'math' && <MathDashboard />}
                    {activeTab === 'music' && <MusicGlobalHeader />}
                    {activeTab === 'coding' && <CodingDashboard />}
                  </div>
              </CollapsibleContent>

              {!isOpen && (
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-xl font-bold font-headline tracking-tight text-foreground uppercase tracking-tighter">Skill Builder</h1>
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

                    {activeTab !== 'coding' && activeTab !== 'drawing' && (
                      <JourneyPlansSection 
                        category={currentCategory as any} 
                        isExpanded={isCurriculaExpanded}
                        onToggle={() => setIsCurriculaExpanded(!isCurriculaExpanded)}
                        mode="trigger"
                      />
                    )}
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
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-cols-2 w-full max-w-2xl h-auto bg-muted/50 p-1 gap-1">
              {/* Row 1: Perception & Interaction */}
              <TabsTrigger value="communication" className="gap-2 px-4 py-2 font-bold whitespace-nowrap">
                <MessageSquare className="w-4 h-4" /> Communication
              </TabsTrigger>
              <TabsTrigger value="speedreading" className="gap-2 px-4 py-2 font-bold whitespace-nowrap">
                <Zap className="w-4 h-4" /> Speed Reading
              </TabsTrigger>
              
              {/* Row 2: Artistic & Auditory */}
              <TabsTrigger value="music" className="gap-2 px-4 py-2 font-bold whitespace-nowrap">
                <Music className="w-4 h-4" /> Music
              </TabsTrigger>
              <TabsTrigger value="drawing" className="gap-2 px-4 py-2 font-bold whitespace-nowrap">
                <Pencil className="w-4 h-4" /> Drawing
              </TabsTrigger>

              {/* Row 3: Logical & Numerical */}
              <TabsTrigger value="math" className="gap-2 px-4 py-2 font-bold whitespace-nowrap">
                <Sigma className="w-4 h-4" /> Arithmetic
              </TabsTrigger>
              <TabsTrigger value="coding" className="gap-2 px-4 py-2 font-bold whitespace-nowrap">
                <Code2 className="w-4 h-4" /> Coding
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="communication" className="animate-in fade-in duration-300">
            <CommunicationContent />
          </TabsContent>
          <TabsContent value="speedreading" className="animate-in fade-in duration-300">
            <SpeedReadingContent />
          </TabsContent>
          <TabsContent value="music" className="animate-in fade-in duration-300">
            <MusicContent />
          </TabsContent>
          <TabsContent value="math" className="animate-in fade-in duration-300">
            <MathComposureLab />
          </TabsContent>
          <TabsContent value="coding" className="animate-in fade-in duration-300">
            <CodingContent />
          </TabsContent>
          <TabsContent value="drawing" className="animate-in fade-in duration-300">
            <DrawingContent />
          </TabsContent>
        </Tabs>
    </div>
  );
}

export default function SkillBuilderPage() {
  return (
    <Suspense fallback={<div>Loading Lab...</div>}>
      <SkillBuilderPageContent />
    </Suspense>
  )
}
