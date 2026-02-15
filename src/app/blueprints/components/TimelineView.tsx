
'use client'

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export type TimelineMilestone = {
  milestoneId: string
  milestoneTitle: string
  projectTitle: string
  dueDate: string // ISO string
  status: "Not Started" | "In Progress" | "Paused" | "Completed"
}

type TimelineViewProps = {
  milestones: TimelineMilestone[]
}

export default function TimelineView({ milestones }: TimelineViewProps) {
  if (milestones.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">No milestones with due dates.</p>
        <p className="text-sm text-muted-foreground">Add milestones with dates to see them on the timeline.</p>
      </div>
    );
  }

  const sorted = [...milestones].sort((a, b) =>
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  )

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="border-l-2 border-primary/20 pl-6 space-y-8">
        {sorted.map((item, i) => (
          <div key={item.milestoneId} className="relative">
            <div className="absolute -left-[1.65rem] top-1.5 w-6 h-6 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                 <div className="w-2 h-2 bg-primary rounded-full" />
            </div>

            <div className="space-y-1 ml-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarIcon className="w-3 h-3" />
                    {format(new Date(item.dueDate), "PPP")}
                </div>
                <p className="font-semibold">{item.milestoneTitle}</p>
                <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground italic">
                        in {item.projectTitle}
                    </span>
                    <Badge variant={item.status === 'Completed' ? 'default' : 'secondary'}>{item.status}</Badge>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
