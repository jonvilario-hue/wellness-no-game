
"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const allItems = [
  "Neck Rolls",
  "Chair Squats",
  "Box Breathing",
  "Wall Sit",
  "5-4-3-2-1 Grounding",
  "Spinal Twist",
  "Deep Breathing",
]

function SortableItem({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners} className="cursor-grab">
      <CardContent className="p-3">
        <p className="text-sm font-medium">{id}</p>
      </CardContent>
    </Card>
  )
}

export default function RoutineBuilderModal() {
  const [selected, setSelected] = useState<string[]>([])

  const toggleItem = (item: string) => {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    )
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setSelected((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
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

        {selected.length > 0 && (
          <div className="pt-6">
            <p className="text-sm font-semibold mb-2">Your Routine (Drag to Reorder):</p>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={selected} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {selected.map((item) => (
                    <SortableItem key={item} id={item} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        )}

        {selected.length > 0 && (
          <div className="pt-4">
            <p className="text-sm text-muted-foreground">Timer Preview (5 sec per item):</p>
            <RoutineTimer routine={selected} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function RoutineTimer({ routine }: { routine: string[] }) {
  const [index, setIndex] = useState(0)
  const [active, setActive] = useState(false)

  const start = () => {
    setActive(true)
    setIndex(0)
  }

  useEffect(() => {
    if (!active || index >= routine.length) return
    const timer = setTimeout(() => setIndex(index + 1), 5000) // 5 sec per item
    return () => clearTimeout(timer)
  }, [index, active, routine.length])

  return (
    <div className="mt-2">
      <Button variant="secondary" onClick={start}>Start Routine</Button>
      {active && index < routine.length && (
        <p className="mt-2 text-sm">Now doing: <strong>{routine[index]}</strong></p>
      )}
      {active && index >= routine.length && (
        <p className="mt-2 text-sm text-green-600">Routine complete! 🎉</p>
      )}
    </div>
  )
}
