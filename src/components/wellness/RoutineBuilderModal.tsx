
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const allItems = [
  "Neck Rolls",
  "Chair Squats",
  "Box Breathing",
  "Wall Sit",
  "5-4-3-2-1 Grounding",
  "Spinal Twist",
  "Deep Breathing",
]

export default function RoutineBuilderModal() {
  const [selected, setSelected] = useState<string[]>([])

  const toggleItem = (item: string) => {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Build a Routine</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Your Routine</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {allItems.map((item, index) => (
            <Card
              key={index}
              onClick={() => toggleItem(item)}
              className={`cursor-pointer ${selected.includes(item) ? "border-primary ring-2 ring-primary" : ""}`}
            >
              <CardContent className="p-3">
                <p className="text-sm font-medium">{item}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="pt-4">
          <p className="text-sm text-muted-foreground">Selected:</p>
          <ul className="list-disc list-inside text-sm">
            {selected.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
