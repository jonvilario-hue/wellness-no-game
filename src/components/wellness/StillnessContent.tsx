"use client"

import { useMemo } from "react"
import { mindfulnessPractices, type MindfulnessCategory } from "@/data/exercises"
import { PracticeInstructionCard } from "./PracticeInstructionCard"
import CategoryOverview from "./CategoryOverview"
import { stillnessCategoryDetails } from "@/data/wellness-categories"
import { ChevronDown, Waves, Wind, CheckCircle2, LayoutGrid, PlusCircle } from "lucide-react"
import { StillnessDashboard } from "./StillnessDashboard"
import { useWellnessData } from "@/hooks/use-wellness-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { WellnessActivityCalendar } from "./WellnessActivityCalendar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

const categories: MindfulnessCategory[] = ['Breathwork', 'Clarity & Focus', 'Grounding & Safety', 'Self-Compassion'];

export default function StillnessContent({ filterTags = [] }: { filterTags?: string[] }) {
    const { 
      lowEnergyMode, addStillnessLog, customPractices, 
      collapsedCategories, toggleCategoryCollapse 
    } = useWellnessData();
    const { toast } = useToast();

    const allPractices = useMemo(() => [
      ...mindfulnessPractices,
      ...customPractices.filter(p => ['Breathwork', 'Clarity & Focus', 'Grounding & Safety', 'Self-Compassion'].includes(p.category))
    ], [customPractices]);

    const handleMVDLog = () => {
      addStillnessLog({
        techniqueId: 'mvd_stillness',
        techniqueName: 'MVD Stillness (3 Breaths)',
        duration: 1,
        timestamp: new Date().toISOString(),
        trigger: 'Proactive'
      });
      toast({ title: "Stillness Logged", description: "System recalibrated. Streak preserved.", variant: 'success' });
    };

    const filteredPractices = useMemo(() => 
      allPractices.filter(p => filterTags.length === 0 || filterTags.every(t => p.tags.includes(t))),
      [allPractices, filterTags]
    );

    const openCategories = useMemo(() => {
      const list = [...categories, 'Custom'];
      return list.filter((cat, idx) => {
        const isCollapsed = collapsedCategories[cat];
        if (isCollapsed === undefined) return idx < 2; // Default first 2 open
        return !isCollapsed;
      });
    }, [collapsedCategories]);

    if (lowEnergyMode) {
      return (
        <div className="max-w-md mx-auto space-y-6 pt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="text-center p-8 bg-blue-500/5 border-blue-500/20 shadow-lg">
            <CardHeader>
              <Waves className="mx-auto h-12 w-12 text-blue-500 mb-2" />
              <CardTitle className="text-2xl font-black uppercase tracking-tight">MVD Stillness</CardTitle>
              <CardDescription className="font-medium text-blue-700/70">Minimum Viable Day mode active.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-background/50 rounded-xl border border-dashed border-blue-500/30 text-sm">
                <p className="italic text-muted-foreground">"Three intentional breaths are enough to reset the vagus nerve and maintain your habit chain."</p>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Quick Action</p>
                <Button 
                  onClick={handleMVDLog}
                  className="w-full h-16 text-lg font-bold gap-3 bg-blue-500 hover:bg-blue-600 text-white shadow-xl shadow-blue-500/20"
                >
                  <Wind className="w-5 h-5" />
                  Log 3-Breath Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
     <div className="space-y-8">
        <StillnessDashboard />

        {/* FILTERED RESULTS */}
        {filterTags.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Filtered Results</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPractices.map((practice) => (
                <div key={practice.id} id={`practice-${practice.id}`} className="scroll-mt-20">
                  <PracticeInstructionCard exercise={practice} />
                </div>
              ))}
            </div>
          </div>
        )}

        {filterTags.length === 0 && (
          <div className="space-y-8 pt-4">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 px-1">
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Stillness Library</h2>
                <p className="text-xs text-muted-foreground">Protocols for mental recovery and internal regulation.</p>
              </div>
            </div>

            <Accordion type="multiple" value={openCategories} onValueChange={(vals) => {
              const list = [...categories, 'Custom'];
              list.forEach(cat => {
                const isNowOpen = vals.includes(cat);
                const wasOpen = !collapsedCategories[cat];
                const effectivelyWasOpen = wasOpen || (collapsedCategories[cat] === undefined && list.indexOf(cat) < 2);
                if (isNowOpen !== effectivelyWasOpen) toggleCategoryCollapse(cat);
              });
            }}>
              {categories.map(category => {
                const practices = allPractices.filter(p => p.category === category);
                const details = stillnessCategoryDetails[category];
                if (!details) return null;
                const Icon = details.icon;

                return (
                  <AccordionItem key={category} value={category} className="border-b border-primary/5">
                    <AccordionTrigger className="hover:no-underline px-1">
                      <div className="flex items-center gap-4 text-left">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold uppercase tracking-tight">
                            {category} ({practices.length})
                          </h3>
                          <p className="text-[10px] text-muted-foreground italic line-clamp-1">"{details.tagline}"</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="mb-6">
                        <CategoryOverview
                          title={details.title}
                          purpose={details.purpose}
                          useWhen={details.useWhen}
                          includes={details.includes}
                          tagline={details.tagline}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {practices.map((practice) => (
                          <div key={practice.id} id={`practice-${practice.id}`} className="scroll-mt-20">
                            <PracticeInstructionCard exercise={practice} />
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        )}

        <WellnessActivityCalendar categoryFilter="Stillness" />
    </div>
  )
}