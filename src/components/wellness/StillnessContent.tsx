
"use client"

import { mindfulnessPractices, type MindfulnessCategory } from "@/data/exercises"
import { PracticeInstructionCard } from "./PracticeInstructionCard"
import CategoryOverview from "./CategoryOverview"
import { stillnessCategoryDetails } from "@/data/wellness-categories"
import { ChevronDown, Waves, Wind, CheckCircle2 } from "lucide-react"
import { StillnessDashboard } from "./StillnessDashboard"
import { useWellnessData } from "@/hooks/use-wellness-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { WellnessActivityCalendar } from "./WellnessActivityCalendar"

const categories: MindfulnessCategory[] = ['Breathwork', 'Clarity & Focus', 'Grounding & Safety', 'Self-Compassion'];

export default function StillnessContent({ filterTags = [] }: { filterTags?: string[] }) {
    const { lowEnergyMode, addStillnessLog } = useWellnessData();
    const { toast } = useToast();

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

    const filteredPractices = mindfulnessPractices.filter(p => 
      filterTags.length === 0 || filterTags.every(t => p.tags.includes(t))
    );

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
        {filteredPractices.length > 0 && filterTags.length > 0 && (
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

        {filterTags.length === 0 && categories.map(category => {
            const practices = mindfulnessPractices.filter(p => p.category === category);
            const details = stillnessCategoryDetails[category];
            if(practices.length === 0 || !details) return null;

            const CategoryIcon = details.icon;

            return (
                <details key={category} open className="group">
                    <summary className="list-none cursor-pointer flex justify-between items-start">
                        <div className="flex-grow">
                             <CategoryOverview
                                title={details.title}
                                icon={<CategoryIcon className="w-6 h-6 text-primary" />}
                                purpose={details.purpose}
                                useWhen={details.useWhen}
                                includes={details.includes}
                                tagline={details.tagline}
                            />
                        </div>
                        <ChevronDown className="w-5 h-5 m-6 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {practices.map((practice) => (
                             <div key={practice.id} id={`practice-${practice.id}`} className="scroll-mt-20">
                                <PracticeInstructionCard exercise={practice} />
                            </div>
                        ))}
                    </div>
                </details>
            )
        })}

        <WellnessActivityCalendar categoryFilter="Stillness" />
    </div>
  )
}
