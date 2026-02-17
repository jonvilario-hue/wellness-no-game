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
import { Play, Plus, Trash2, GripVertical, Save, Search, X } from "lucide-react"
import { movementExercises, mindfulnessPractices } from "@/data/exercises"
import { useWellnessData } from "@/hooks/use-wellness-data"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const allPractices = [...movementExercises, ...mindfulnessPractices];

function SortableItem({ id, name, onRemove }: { id: string; name: string; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
  }

  return (
    <div ref={setNodeRef} style={style} className={cn("flex items-center gap-2 group", isDragging && "opacity-50")}>
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-2 text-muted-foreground hover:text-foreground">
        <GripVertical className="w-4 h-4" />
      </div>
      <Card className="flex-grow border-primary/5">
        <CardContent className="p-3 flex items-center justify-between">
          <p className="text-sm font-medium truncate">{name}</p>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={(e) => { e.stopPropagation(); onRemove(); }}>
            <X className="w-3 h-3" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

interface RoutineBuilderModalProps {
  onStartRoutine?: (exerciseIds: string[], name: string) => void;
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
      onStartRoutine(selectedIds, routineName || "Custom Routine");
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
        <Button variant="secondary" className="gap-2 font-bold shadow-sm">
          <Plus className="w-4 h-4" />
          Build a Routine
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] md:h-[80vh] flex flex-col p-0 overflow-hidden border-primary/10">
        <DialogHeader className="p-6 bg-primary/5 border-b shrink-0">
          <DialogTitle className="text-xl font-black uppercase tracking-tight">Routine Architect</DialogTitle>
          <DialogDescription>
            Stack your favorite body and mind practices into a single guided session.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">
          {/* Left Side: Library */}
          <div className="flex flex-col flex-1 border-r min-h-0">
            <div className="p-4 border-b space-y-4 bg-background">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search practices..." 
                  className="pl-8 h-9 text-xs" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-2">
                {filteredPractices.map((p) => (
                  <Card 
                    key={p.id} 
                    className={cn(
                      "cursor-pointer hover:bg-muted/50 transition-all border-primary/5",
                      selectedIds.includes(p.id) && "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm"
                    )}
                    onClick={() => toggleItem(p.id)}
                  >
                    <CardContent className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-1.5 rounded-md border",
                          selectedIds.includes(p.id) ? "bg-primary text-white border-primary" : "bg-background text-primary border-primary/10"
                        )}>
                          <p.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">{p.name}</p>
                          <p className="text-[9px] text-muted-foreground uppercase font-black tracking-tighter">{p.category}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[9px] h-5">{Math.round(p.duration / 60)}m</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Right Side: Sequence */}
          <div className="flex flex-col flex-1 bg-muted/10 min-h-0">
            <div className="p-4 border-b space-y-4 bg-background/50">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Routine Identity</Label>
                <Input 
                  placeholder="e.g. Morning Focus Ritual" 
                  value={routineName}
                  onChange={e => setRoutineName(e.target.value)}
                  className="h-9 font-bold"
                />
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-3">
                {selectedIds.length === 0 ? (
                  <div className="py-20 text-center space-y-2 opacity-30 flex flex-col items-center">
                    <div className="p-4 rounded-full border-2 border-dashed border-muted-foreground mb-2">
                      <GripVertical className="w-8 h-8" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Build your stack</p>
                    <p className="text-xs max-w-[180px] mx-auto leading-relaxed">Select practices from the left to create your sequence.</p>
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

        <DialogFooter className="p-4 border-t bg-muted/5 flex flex-row justify-between items-center shrink-0">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">
              {selectedIds.length} Steps Active
            </p>
            <p className="text-[9px] font-bold text-muted-foreground uppercase">
              ~{Math.round(selectedIds.reduce((sum, id) => sum + (allPractices.find(p => p.id === id)?.duration || 0), 0) / 60)} MIN TOTAL
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              type="button"
              variant="outline" 
              className="gap-2 h-10 px-4 border-primary/20 font-bold" 
              onClick={handleSave} 
              disabled={!routineName.trim() || selectedIds.length === 0}
            >
              <Save className="w-4 h-4" /> Save
            </Button>
            <Button 
              type="button"
              className="gap-2 px-8 h-10 font-bold shadow-lg shadow-primary/20" 
              onClick={handleStart} 
              disabled={selectedIds.length === 0}
            >
              <Play className="w-4 h-4 fill-current" /> Start Now
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
