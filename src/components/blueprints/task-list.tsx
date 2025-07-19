
'use client';

import { useState } from 'react';
import type { Task } from '@/hooks/use-blueprint-store';
import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import { EditableLabel } from '../time/editable-label';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Trash2 } from 'lucide-react';

interface TaskListProps {
  projectId: string;
  milestoneId: string;
  tasks: Task[];
}

export function TaskList({ projectId, milestoneId, tasks }: TaskListProps) {
  const { addTask, updateTask, deleteTask } = useBlueprintStore();
  const [newTaskName, setNewTaskName] = useState('');

  const handleAddTask = () => {
    if (newTaskName.trim()) {
      addTask(projectId, milestoneId, newTaskName.trim());
      setNewTaskName('');
    }
  };

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center gap-2 group p-1 rounded-md hover:bg-muted">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.done}
            onCheckedChange={(checked) => updateTask(projectId, milestoneId, task.id, { done: !!checked })}
          />
          <div className="flex-grow">
             <EditableLabel
                initialValue={task.name}
                onSave={(newName) => updateTask(projectId, milestoneId, task.id, { name: newName })}
                className="!p-0 !min-h-0 text-sm"
                inputClassName="text-sm font-normal"
            />
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100" onClick={() => deleteTask(projectId, milestoneId, task.id)}>
            <Trash2 className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      ))}
       <div className="flex items-center gap-2 pt-2">
          <Input 
            placeholder="Add a new task..." 
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            className="h-8 text-sm"
          />
          <Button onClick={handleAddTask} size="sm" variant="ghost">Add Task</Button>
        </div>
    </div>
  );
}
