
'use client';

import type { Milestone } from '@/hooks/use-blueprint-store';
import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import { useState } from 'react';
import { TaskList } from './task-list';
import { EditableLabel } from '../time/editable-label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Calendar, CheckCircle, Trash2 } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarPicker } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Progress } from '../ui/progress';

interface MilestoneCardProps {
  projectId: string;
  milestone: Milestone;
}

export function MilestoneCard({ projectId, milestone }: MilestoneCardProps) {
  const { updateMilestone, deleteMilestone } = useBlueprintStore();
  const [isOpen, setIsOpen] = useState(true);

  const calculateMilestoneProgress = (milestone: Milestone) => {
    if (milestone.tasks.length === 0) return 0;
    const completedTasks = milestone.tasks.filter((t) => t.done).length;
    return (completedTasks / milestone.tasks.length) * 100;
  };

  const progress = calculateMilestoneProgress(milestone);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateMilestone(projectId, milestone.id, { notes: e.target.value });
  };
  
  const handleDateSelect = (date: Date | undefined) => {
      if(date) {
        updateMilestone(projectId, milestone.id, { dueDate: date.toISOString() });
      }
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border rounded-lg p-4 space-y-3 bg-muted/30"
    >
      <div className="flex justify-between items-center">
        <div className="flex-grow mr-2">
            <EditableLabel
                initialValue={milestone.title}
                onSave={(newTitle) => updateMilestone(projectId, milestone.id, { title: newTitle })}
                className="!p-0 !min-h-0"
                inputClassName="font-semibold"
            />
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
             <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8">
                        <Calendar className="mr-2 h-4 w-4" />
                        {milestone.dueDate ? format(new Date(milestone.dueDate), "PPP") : "Set date"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <CalendarPicker
                        mode="single"
                        selected={milestone.dueDate ? new Date(milestone.dueDate) : undefined}
                        onSelect={handleDateSelect}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => deleteMilestone(projectId, milestone.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <span className="sr-only">Toggle</span>
              <CheckCircle className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>

       <Progress value={progress} className="h-1" />

      <CollapsibleContent className="space-y-4">
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground mb-1">Notes / Reflections</h4>
          <Textarea
            value={milestone.notes}
            onChange={handleNotesChange}
            placeholder="Add notes, ideas, or reflections for this milestone..."
            className="text-sm min-h-[60px]"
          />
        </div>
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground mb-1">Tasks</h4>
          <TaskList projectId={projectId} milestoneId={milestone.id} tasks={milestone.tasks} />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
