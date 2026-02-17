"use client"

import { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Play, Plus, Trash2, GripVertical, Save, Search } from "lucide-react"
import { movementExercises, mindfulnessPractices, type Exercise } from "@/data/exercises"
import { useWellnessData } from "@/hooks/use-wellness-data"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const allPractices = [...movementExercises, ...mindfulnessPractices];

function SortableItem({ id, name, onRemove }: { id: string; name: string; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 group">
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 text-muted-foreground hover:text-foreground">
        <GripVertical className="w-4 h-4" />
      </div>
      <Card className="flex-grow">
        <CardContent className="p-3 flex items-center justify-between">
          <p className="text-sm font-medium">{name}</p>
          <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={onRemove}>
            <Trash2 className="w-3 h-3 text-destructive" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

interface RoutineBuilderModalProps {
  onStartRoutine?: (exerciseIds: string[]) => void;
}

export default function RoutineBuilderModal({ onStartRoutine }: RoutineBuilderModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [routineName, setRoutineName] = useState("")
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  
  const { addRoutine } = useWellnessData()
  const { toast } = useToast()

  const filteredPractices = useMemo(() => {
    return allPractices.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const toggleItem = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setSelectedIds((items) => {
        const oldIndex = items.indexOf(active.id as string)
        const newIndex = items.indexOf(over.id as string)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleSave = () => {
    if (!routineName.trim() || selectedIds.length === 0) return;
    
    addRoutine({
      name: routineName,
      exerciseIds: selectedIds
    });

    toast({ title: "Routine Saved!", variant: "success" });
    setOpen(false);
    reset();
  }

  const handleStart = () => {
    if (selectedIds.length === 0) return;
    if (onStartRoutine) {
      onStartRoutine(selectedIds);
      setOpen(false);
    }
  }

  const reset = () => {
    setSelectedIds([]);
    setRoutineName("");
    setSearch("");
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if(!o) reset(); }}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="gap-2">
          <Plus className="w-4 h-4" />
          Build a Routine
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6 bg-primary/5 border-b">
          <DialogTitle>Routine Architect</DialogTitle>
          <DialogDescription>
            Stack your favorite body and mind practices into a single guided session.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 flex-grow min-h-0">
          {/* Left Side: Library */}
          <div className="flex flex-col border-r">
            <div className="p-4 border-b space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search practices..." 
                  className="pl-8" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
            <ScrollArea className="flex-grow">
              <div className="p-4 space-y-2">
                {filteredPractices.map((p) => (
                  <Card 
                    key={p.id} 
                    className={cn(
                      "cursor-pointer hover:bg-muted/50 transition-colors border-primary/5",
                      selectedIds.includes(p.id) && "border-primary bg-primary/5 ring-1 ring-primary/20"
                    )}
                    onClick={() => toggleItem(p.id)}
                  >
                    <CardContent className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-background rounded-md border">
                          <p.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">{p.name}</p>
                          <p className="text-[10px] text-muted-foreground uppercase font-black">{p.category}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[9px]">{Math.round(p.duration / 60)}m</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Right Side: Sequence */}
          <div className="flex flex-col bg-muted/10">
            <div className="p-4 border-b space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Routine Identity</Label>
                <Input 
                  placeholder="e.g. Morning Focus Ritual" 
                  value={routineName}
                  onChange={e => setRoutineName(e.target.value)}
                />
              </div>
            </div>
            <ScrollArea className="flex-grow">
              <div className="p-4 space-y-3">
                {selectedIds.length === 0 ? (
                  <div className="py-20 text-center space-y-2 opacity-30">
                    <GripVertical className="w-8 h-8 mx-auto" />
                    <p className="text-sm font-bold uppercase tracking-widest">Build your stack</p>
                  </div>
                ) : (
                  <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={selectedIds} strategy={verticalListSortingStrategy}>
                      <div className="space-y-2">
                        {selectedIds.map((id) => {
                          const practice = allPractices.find(p => p.id === id);
                          if (!practice) return null;
                          return (
                            <SortableItem 
                              key={id} 
                              id={id} 
                              name={practice.name} 
                              onRemove={() => toggleItem(id)}
                            />
                          );
                        })}
                      </div>
                    </SortableContext>
                  </DndContext>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter className="p-4 border-t bg-muted/5 flex justify-between sm:justify-between items-center">
          <p className="text-[10px] font-bold uppercase text-muted-foreground">
            {selectedIds.length} Steps • {Math.round(selectedIds.reduce((sum, id) => sum + (allPractices.find(p => p.id === id)?.duration || 0), 0) / 60)} min total
          </p>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={handleSave} disabled={!routineName.trim() || selectedIds.length === 0}>
              <Save className="w-4 h-4" /> Save
            </Button>
            <Button className="gap-2 px-8" onClick={handleStart} disabled={selectedIds.length === 0}>
              <Play className="w-4 h-4 fill-current" /> Start Now
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
