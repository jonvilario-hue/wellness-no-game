
'use client'

import type { Milestone, Task } from '@/types/blueprint';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { Calendar, Check, ChevronDown, MoreVertical } from 'lucide-react';
import TaskItem from './TaskItem';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

type MilestoneCardProps = {
  milestone: Milestone;
  onToggleTask: (taskId: string) => void;
};

export default function MilestoneCard({ milestone, onToggleTask }: MilestoneCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  const calculateMilestoneProgress = (m: Milestone) => {
    if (m.tasks.length === 0) return 0;
    const completedTasks = m.tasks.filter(t => t.completed).length;
    return (completedTasks / m.tasks.length) * 100;
  };

  const progress = calculateMilestoneProgress(milestone);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-lg p-4 bg-muted/30">
        <div className="flex justify-between items-center">
            <div className='flex items-center gap-2 flex-grow'>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                       <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                    </Button>
                </CollapsibleTrigger>
                <div className='flex-grow'>
                    <h4 className="font-semibold">{milestone.title}</h4>
                     {milestone.dueDate && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Due: {format(new Date(milestone.dueDate), 'PPP')}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant={milestone.status === 'Completed' ? 'default' : 'secondary'}>{milestone.status}</Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="w-4 h-4" /></Button>
            </div>
        </div>
      
        <Progress value={progress} className="my-2 h-1" />

        <CollapsibleContent className="space-y-3 mt-3">
            {milestone.description && <p className="text-sm text-muted-foreground">{milestone.description}</p>}
            
            <div className="space-y-2">
                {milestone.tasks.map(task => (
                    <TaskItem key={task.id} task={task} onToggle={() => onToggleTask(task.id)} />
                ))}
            </div>

            <Textarea 
                placeholder="Reflections and notes for this milestone..."
                defaultValue={milestone.reflection}
                className="mt-2"
            />
        </CollapsibleContent>
    </Collapsible>
  );
}
