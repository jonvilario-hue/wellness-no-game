
'use client'

import type { Task } from '@/types/blueprint';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Repeat, Info, Calendar } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { format } from 'date-fns';

type TaskItemProps = {
  task: Task;
  onToggle: () => void;
};

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  const checkboxId = `task-${task.id}`;
  
  return (
    <div className="flex flex-col p-2 rounded-md hover:bg-muted/50 transition-colors group">
      <div className="flex items-start space-x-3">
        <Checkbox 
            id={checkboxId} 
            checked={task.completed} 
            onCheckedChange={onToggle} 
            className="mt-1"
        />
        <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2">
                <Label 
                    htmlFor={checkboxId} 
                    className={cn(
                        "text-sm font-medium leading-tight cursor-pointer",
                        task.completed && "text-muted-foreground line-through"
                    )}
                >
                    {task.title}
                </Label>
                {task.recurring && task.recurring !== 'None' && (
                    <Repeat className="w-3 h-3 text-primary opacity-60" />
                )}
            </div>
            
            {(task.notes || task.dueDate) && (
                <div className="flex items-center gap-3 mt-1">
                    {task.dueDate && (
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1 uppercase tracking-wider font-semibold">
                            <Calendar className="w-2.5 h-2.5" />
                            {format(new Date(task.dueDate), 'MMM d')}
                        </span>
                    )}
                    {task.notes && (
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <span className="text-[10px] text-primary/60 flex items-center gap-1 cursor-help hover:text-primary">
                                        <Info className="w-2.5 h-2.5" />
                                        Note
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="max-w-xs">
                                    <p className="text-xs whitespace-pre-wrap">{task.notes}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
