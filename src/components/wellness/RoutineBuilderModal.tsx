
"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Play } from "lucide-react"

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
  const [open, setOpen] = useState(false)

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

  const handleStartRoutine = () => {
    // This would trigger the routine timer or save the routine.
    // For now, it can just close the modal.
    console.log("Starting routine:", selected)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Build a Routine</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Your Routine</DialogTitle>
          <DialogDescription>
            Select practices from the list, then drag and drop to reorder them.
          </DialogDescription>
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
        <DialogFooter className="mt-4">
          <Button
            onClick={handleStartRoutine}
            disabled={selected.length === 0}
            className="w-full"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Routine ({selected.length} steps)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
