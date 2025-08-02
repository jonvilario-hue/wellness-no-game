
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { movementExercises, type ExerciseCategory } from "@/data/exercises"
import { ExerciseCard } from "../exercises/exercise-card"

const categories: ExerciseCategory[] = ['Stretching', 'Strength', 'Energizer', 'Wakeup & Wind-Down'];

export default function MovementContent() {
  return (
    <div className="space-y-8">
        {categories.map(category => {
            const exercises = movementExercises.filter(e => e.category === category);
            if(exercises.length === 0) return null;
            return (
                <div key={category}>
                    <h2 className="text-2xl font-bold mb-4">{category}</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {exercises.map((exercise) => (
                            <ExerciseCard key={exercise.id} exercise={exercise} />
                        ))}
                    </div>
                </div>
            )
        })}
    </div>
  )
}
