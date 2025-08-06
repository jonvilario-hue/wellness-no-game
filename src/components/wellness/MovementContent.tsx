
"use client"

import { movementExercises, type ExerciseCategory } from "@/data/exercises"
import CategoryOverview from "./CategoryOverview"
import { movementCategoryDetails } from "@/data/wellness-categories"
import { PracticeInstructionCard } from "./PracticeInstructionCard"
import { ChevronDown } from "lucide-react"

const categories: ExerciseCategory[] = ['Stretching', 'Strength', 'Energizer', 'Wakeup & Wind-Down'];

export default function MovementContent() {
  return (
    <div className="space-y-8">
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
