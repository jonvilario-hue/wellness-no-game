
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mindfulnessPractices, type MindfulnessCategory } from "@/data/exercises"
import { ExerciseCard } from "../exercises/exercise-card"

const categories: MindfulnessCategory[] = ['Breathwork', 'Clarity & Focus', 'Grounding & Safety', 'Self-Compassion'];

export default function StillnessContent() {
    return (
     <div className="space-y-8">
        {categories.map(category => {
            const practices = mindfulnessPractices.filter(p => p.category === category);
            if(practices.length === 0) return null;
            return (
                <div key={category}>
                    <h2 className="text-2xl font-bold mb-4">{category}</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {practices.map((practice) => (
                            <ExerciseCard key={practice.id} exercise={practice} />
                        ))}
                    </div>
                </div>
            )
        })}
    </div>
  )
}
