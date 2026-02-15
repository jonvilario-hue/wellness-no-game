
'use client'

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
import { useState } from "react"
import { Calendar as CalendarIcon, Repeat } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { Task } from "@/types/blueprint"

type AddTaskDialogProps = {
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void
  children: React.ReactNode
}

export default function AddTaskDialog({ onAddTask, children }: AddTaskDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [notes, setNotes] = useState("")
  const [recurring, setRecurring] = useState<Task['recurring']>('None')
  const [date, setDate] = useState<Date | undefined>()

  const handleAdd = () => {
    if (!title) return
    const newTask = {
      title,
      notes,
      recurring,
      dueDate: date?.toISOString(),
    }
    onAddTask(newTask)
    setTitle("")
    setNotes("")
    setRecurring('None')
    setDate(undefined)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <Label>Task Title</Label>
            <Input
                placeholder="What needs to be done?"
                value={title}
                onChange={e => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
          </div>

          <div className="space-y-1">
            <Label>Notes (Optional)</Label>
            <Textarea
                placeholder="Add details, links, or instructions..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <Label>Due Date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PP") : "Pick date"}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="space-y-1">
                <Label>Recurrence</Label>
                <Select value={recurring} onValueChange={(v) => setRecurring(v as any)}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="None">None</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Quarterly">Quarterly</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleAdd}>Add Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
