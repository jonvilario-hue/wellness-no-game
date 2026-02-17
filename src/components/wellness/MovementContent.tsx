"use client"

import { movementExercises, type ExerciseCategory } from "@/data/exercises"
import CategoryOverview from "./CategoryOverview"
import { movementCategoryDetails } from "@/data/wellness-categories"
import { PracticeInstructionCard } from "./PracticeInstructionCard"
import { ChevronDown, HeartPulse, Zap, Play } from "lucide-react"
import { MovementDashboard } from "./MovementDashboard"
import { useWellnessData } from "@/hooks/use-wellness-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { kits } from "@/data/wellness-kits"
import { Badge } from "@/components/ui/badge"

const categories: ExerciseCategory[] = ['Stretching', 'Strength', 'Energizer', 'Wakeup & Wind-Down'];

export default function MovementContent({ filterTags = [] }: { filterTags?: string[] }) {
  const { lowEnergyMode, addMovementLog } = useWellnessData();
  const { toast } = useToast();

  const handleMVDLog = () => {
    addMovementLog({
      exerciseId: 'mvd_movement',
      exerciseName: 'MVD Movement (Maintenance)',
      duration: 1,
      timestamp: new Date().toISOString(),
      difficulty: 1,
      energyLevel: 'Low'
    });
    toast({ title: "Movement Logged", description: "Streak preserved. Rest is progress.", variant: 'success' });
  };

  const filteredExercises = movementExercises.filter(e => 
    filterTags.length === 0 || filterTags.every(t => e.tags.includes(t))
  );

  const filteredKits = kits.filter(k => 
    filterTags.length === 0 || filterTags.every(t => k.tags.includes(t))
  );

  if (lowEnergyMode) {
    return (
      <div className="max-w-md mx-auto space-y-6 pt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="text-center p-8 bg-amber-500/5 border-amber-500/20 shadow-lg">
          <CardHeader>
            <HeartPulse className="mx-auto h-12 w-12 text-amber-500 mb-2" />
            <CardTitle className="text-2xl font-black uppercase tracking-tight">MVD Movement</CardTitle>
            <CardDescription className="font-medium text-amber-700/70">Minimum Viable Day mode active.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-background/50 rounded-xl border border-dashed border-amber-500/30 text-sm">
              <p className="italic text-muted-foreground">"One minute of mindful movement is enough to keep the neural pathways active."</p>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Quick Action</p>
              <Button 
                onClick={handleMVDLog}
                className="w-full h-16 text-lg font-bold gap-3 bg-amber-500 hover:bg-amber-600 text-white shadow-xl shadow-amber-500/20"
              >
                <Zap className="w-5 h-5 fill-current" />
                Log 1-Min Movement
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
        <MovementDashboard />
        
        {/* MIXED LIST: KITS + EXERCISES */}
        {(filteredExercises.length > 0 || filteredKits.length > 0) && (
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Filtered Results</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredKits.map(kit => (
                <Card key={kit.id} className="border-primary/20 bg-primary/5 hover:border-primary/40 transition-all flex flex-col group relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-primary text-primary-foreground font-bold text-[8px] uppercase tracking-widest">Session</Badge>
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{kit.emoji}</span>
                      <CardTitle className="text-base">{kit.title}</CardTitle>
                    </div>
                    <CardDescription className="text-xs line-clamp-2 mt-1">{kit.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-2 mt-auto">
                    <Button className="w-full h-8 text-xs font-bold gap-2">
                      <Play className="w-3 h-3 fill-current" /> Start Session ({kit.estimatedMinutes}m)
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              {filteredExercises.map(exercise => (
                <div key={exercise.id} id={`practice-${exercise.id}`} className="scroll-mt-20">
                  <PracticeInstructionCard exercise={exercise} />
                </div>
              ))}
            </div>
          </div>
        )}

        {filterTags.length === 0 && categories.map(category => {
            const exercises = movementExercises.filter(e => e.category === category);
            const details = movementCategoryDetails[category];
            if(exercises.length === 0 || !details) return null;
            
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
                        {exercises.map((exercise) => (
                            <div key={exercise.id} id={`practice-${exercise.id}`} className="scroll-mt-20">
                                <PracticeInstructionCard exercise={exercise} />
                            </div>
                        ))}
                    </div>
                </details>
            )
        })}
    </div>
  )
}
