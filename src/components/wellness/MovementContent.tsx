
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const movementExercises = [
  {
    title: "Neck Rolls",
    duration: "30 sec",
    level: "Easy",
  },
  {
    title: "Chair Squats",
    duration: "1 min",
    level: "Medium",
  },
  {
    title: "Wall Sit",
    duration: "1 min",
    level: "Medium",
  },
  {
    title: "Jumping Jacks",
    duration: "30 sec",
    level: "Hard",
  },
  {
    title: "Spinal Twist",
    duration: "1 min",
    level: "Easy",
  },
]

export default function MovementContent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
      {movementExercises.map((exercise, i) => (
        <Card key={i} className="hover:shadow-lg">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-1">{exercise.title}</h3>
            <p className="text-sm text-muted-foreground">Duration: {exercise.duration}</p>
            <p className="text-sm text-muted-foreground">Level: {exercise.level}</p>
            <Button variant="outline" className="mt-3 w-full">Start</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
