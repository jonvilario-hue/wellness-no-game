
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const movementOptions = [
  "Wall Sit (1 min)",
  "Jumping Jacks (30 sec)",
  "Chair Squats (1 min)",
  "Spinal Twist (1 min)",
]

const stillnessOptions = [
  "Box Breathing (1 min)",
  "5-4-3-2-1 Grounding",
  "Body Scan Meditation",
  "Deep Breathing (2 min)",
]

export default function DailyPractice() {
  const [movement, setMovement] = useState("")
  const [stillness, setStillness] = useState("")

  const generatePractice = () => {
    setMovement(movementOptions[Math.floor(Math.random() * movementOptions.length)])
    setStillness(stillnessOptions[Math.floor(Math.random() * stillnessOptions.length)])
  }

  useEffect(() => {
    generatePractice()
  }, [])

  return (
    <Card className="w-full mb-4">
      <CardContent className="py-4 space-y-3">
        <h2 className="text-lg font-semibold">Today’s Practice</h2>
        <div className="text-sm">
          <strong>Movement:</strong> {movement}
          <br />
          <strong>Stillness:</strong> {stillness}
        </div>
        <Button variant="outline" onClick={generatePractice}>
          New Suggestion
        </Button>
      </CardContent>
    </Card>
  )
}
