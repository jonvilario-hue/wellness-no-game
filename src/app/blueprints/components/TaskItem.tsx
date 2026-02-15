
'use client'

import type { Task } from '@/types/blueprint';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type TaskItemProps = {
  task: Task;
  onToggle: () => void;
};

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  const checkboxId = `task-${task.id}`;
  return (
    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
      <Checkbox id={checkboxId} checked={task.completed} onCheckedChange={onToggle} />
      <Label htmlFor={checkboxId} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {task.title}
      </Label>
    </div>
  );
}
