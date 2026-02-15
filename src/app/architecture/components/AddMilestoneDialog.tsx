
'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar as CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState, useEffect } from "react"
import type { Milestone } from "@/types/blueprint"

type AddMilestoneDialogProps = {
  onSave: (milestone: Omit<Milestone, 'id'>) => void;
  milestoneToEdit?: Milestone | null;
  children: React.ReactNode;
}

export default function AddMilestoneDialog({ onSave, milestoneToEdit, children }: AddMilestoneDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState<Date | undefined>()

  useEffect(() => {
    if (milestoneToEdit && open) {
      setTitle(milestoneToEdit.title);
      setDescription(milestoneToEdit.description || '');
      setDate(milestoneToEdit.dueDate ? new Date(milestoneToEdit.dueDate) : undefined);
    } else if (open) {
      setTitle('');
      setDescription('');
      setDate(undefined);
    }
  }, [milestoneToEdit, open]);


  const handleSave = () => {
    if (!title) return;
    const newMilestone: Omit<Milestone, 'id'> = {
      title,
      description,
      dueDate: date?.toISOString() || undefined,
      status: milestoneToEdit?.status || "Not Started",
      tasks: milestoneToEdit?.tasks || [],
      reflection: milestoneToEdit?.reflection || '',
    }
    onSave(newMilestone)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{milestoneToEdit ? 'Edit Milestone' : 'Add Milestone'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <Input
            placeholder="Milestone title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a due date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Milestone</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
