
"use client"

import { movementExercises, type ExerciseCategory } from "@/data/exercises"
import { ExerciseCard } from "../exercises/exercise-card"
import CategoryOverview from "./CategoryOverview"
import { movementCategoryDetails } from "@/data/wellness-categories"

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
                <div key={category}>
                    <CategoryOverview
                        title={details.title}
                        icon={<CategoryIcon className="w-6 h-6 text-primary" />}
                        purpose={details.purpose}
                        useWhen={details.useWhen}
                        includes={details.includes}
                        tagline={details.tagline}
                    />
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {exercises.map((exercise) => (
                            <div key={exercise.id} id={`practice-${exercise.id}`} className="scroll-mt-20">
                                <ExerciseCard exercise={exercise} />
                            </div>
                        ))}
                    </div>
                </div>
            )
        })}
    </div>
  )
}
