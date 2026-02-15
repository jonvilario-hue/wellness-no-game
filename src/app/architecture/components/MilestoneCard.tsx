
'use client'

import type { Milestone, Task } from '@/types/blueprint';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import { Calendar, ChevronDown, Edit, Plus } from 'lucide-react';
import TaskItem from './TaskItem';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import ReflectionTextarea from './ReflectionTextarea';
import AddTaskDialog from './AddTaskDialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AddMilestoneDialog from './AddMilestoneDialog';

type MilestoneCardProps = {
  milestone: Milestone;
  onToggleTask: (taskId: string) => void;
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  onUpdateMilestoneStatus: (status: Milestone['status']) => void;
  onUpdateMilestone: (updates: Partial<Milestone>) => void;
};

export default function MilestoneCard({ milestone, onToggleTask, onAddTask, onUpdateMilestoneStatus, onUpdateMilestone }: MilestoneCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
                     {milestone.dueDate && isClient && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Due: {format(new Date(milestone.dueDate), 'PPP')}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2">
                 <Select
                    value={milestone.status}
                    onValueChange={(value) => onUpdateMilestoneStatus(value as Milestone["status"])}
                >
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                        <SelectValue placeholder="Set status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Not Started">Not Started</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Paused">Paused</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
                <AddMilestoneDialog onSave={onUpdateMilestone} milestoneToEdit={milestone}>
                   <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                </AddMilestoneDialog>
            </div>
        </div>
      
        <Progress value={progress} className="my-2 h-1" />

        <CollapsibleContent className="space-y-3 mt-3">
            {milestone.description && <p className="text-sm text-muted-foreground">{milestone.description}</p>}
            
            <div className="space-y-2">
                {milestone.tasks.map(task => (
                    <TaskItem key={task.id} task={task} onToggle={() => onToggleTask(task.id)} />
                ))}
                 <AddTaskDialog onAddTask={onAddTask}>
                    <Button size="sm" variant="ghost" className="w-full justify-start mt-1">
                        <Plus className="w-4 h-4 mr-2"/>
                        Add Task
                    </Button>
                </AddTaskDialog>
            </div>

            <ReflectionTextarea
                initialText={milestone.reflection}
                onSave={(newText) => onUpdateMilestone({ reflection: newText })}
            />
        </CollapsibleContent>
    </Collapsible>
  );
}
