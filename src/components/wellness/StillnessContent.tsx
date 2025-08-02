
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const stillnessPractices = [
  {
    title: "Box Breathing",
    duration: "1 min",
    focus: "Calm",
  },
  {
    title: "5-4-3-2-1 Grounding",
    duration: "2 min",
    focus: "Anxiety Relief",
  },
  {
    title: "Body Scan Meditation",
    duration: "3 min",
    focus: "Awareness",
  },
  {
    title: "Gratitude Prompt",
    duration: "1 min",
    focus: "Positivity",
  },
  {
    title: "Deep Breathing",
    duration: "2 min",
    focus: "Focus",
  },
]

export default function StillnessContent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
      {stillnessPractices.map((practice, i) => (
        <Card key={i} className="hover:shadow-lg">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-1">{practice.title}</h3>
            <p className="text-sm text-muted-foreground">Duration: {practice.duration}</p>
            <p className="text-sm text-muted-foreground">Focus: {practice.focus}</p>
            <Button variant="outline" className="mt-3 w-full">Start</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
