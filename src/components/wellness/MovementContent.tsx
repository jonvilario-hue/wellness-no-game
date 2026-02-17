
"use client"

import { movementExercises, type ExerciseCategory } from "@/data/exercises"
import CategoryOverview from "./CategoryOverview"
import { movementCategoryDetails } from "@/data/wellness-categories"
import { PracticeInstructionCard } from "./PracticeInstructionCard"
import { ChevronDown, HeartPulse, Zap } from "lucide-react"
import { MovementDashboard } from "./MovementDashboard"
import { useWellnessData } from "@/hooks/use-wellness-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { WellnessActivityCalendar } from "./WellnessActivityCalendar"

const categories: ExerciseCategory[] = ['Stretching', 'Strength', 'Energizer', 'Wakeup & Wind-Down'];

export default function MovementContent() {
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
          <div className="pt-4 opacity-50 text-[10px] font-bold uppercase tracking-[0.2em]">
            Streak Preservation Active
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
        <MovementDashboard />
        
        <WellnessActivityCalendar categoryFilter="Movement" />

        {categories.map(category => {
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
