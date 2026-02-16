
'use client'

import { useState, useEffect } from 'react';
import type { Milestone, Task, ReflectionEntry } from '@/types/blueprint';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import { Calendar, ChevronDown, Edit, Link2, Plus, MessageSquare, History, Sparkles } from 'lucide-react';
import TaskItem from './TaskItem';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ReflectionTextarea from './ReflectionTextarea';
import AddTaskDialog from './AddTaskDialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AddMilestoneDialog from './AddMilestoneDialog';
import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type MilestoneCardProps = {
  projectId: string;
  milestone: Milestone;
  onToggleTask: (taskId: string) => void;
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  onUpdateMilestoneStatus: (status: Milestone['status']) => void;
  onUpdateMilestone: (updates: Partial<Milestone>) => void;
};

const statusPrompts: Record<Milestone['status'], string[]> = {
  'In Progress': ["What's working well so far?", "What's the biggest blocker right now?", "Are you on track for your due date?"],
  'Completed': ["What did you learn?", "What would you do differently?", "How does this change your approach to the next milestone?"],
  'Paused': ["Why was this milestone paused?", "What would need to happen to resume?", "Is the priority still accurate?"],
  'Not Started': ["What is the very first step?", "What tools do you need?", "Who can help you start?"]
};

export default function MilestoneCard({ projectId, milestone, onToggleTask, onAddTask, onUpdateMilestoneStatus, onUpdateMilestone }: MilestoneCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const { projects, addReflection } = useBlueprintStore();
  
  const currentProject = projects.find(p => p.id === projectId);
  const otherMilestones = currentProject?.milestones.filter(m => m.id !== milestone.id) || [];

  const calculateMilestoneProgress = (m: Milestone) => {
    if (m.tasks.length === 0) return 0;
    const completedTasks = m.tasks.filter(t => t.completed).length;
    return (completedTasks / m.tasks.length) * 100;
  };

  const progress = calculateMilestoneProgress(milestone);

  const handleToggleDependency = (id: string) => {
    const deps = milestone.dependsOn || [];
    const newDeps = deps.includes(id) ? deps.filter(d => d !== id) : [...deps, id];
    onUpdateMilestone({ dependsOn: newDeps });
  };

  const handleSaveReflection = (content: string) => {
    addReflection(projectId, milestone.id, {
      content,
      milestoneStatus: milestone.status
    });
  };

  const dependencyWarning = milestone.dependsOn?.some(dId => {
    const m = currentProject?.milestones.find(ms => ms.id === dId);
    return m && m.status !== 'Completed';
  });

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
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{milestone.title}</h4>
                      {milestone.dependsOn && milestone.dependsOn.length > 0 && (
                        <Badge variant="outline" className="text-[8px] h-4 py-0 gap-1 uppercase tracking-tighter">
                          <Link2 className="w-2 h-2" /> Linked
                        </Badge>
                      )}
                    </div>
                     {milestone.dueDate && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Due: {format(new Date(milestone.dueDate), 'PPP')}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2">
                 <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Link2 className={cn("w-4 h-4", milestone.dependsOn?.length ? "text-primary" : "text-muted-foreground")} /></Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Depends On:</h4>
                        <div className="space-y-1">
                          {otherMilestones.map(m => (
                            <div key={m.id} className="flex items-center gap-2">
                              <Checkbox 
                                id={`dep-${m.id}`} 
                                checked={milestone.dependsOn?.includes(m.id)} 
                                onCheckedChange={() => handleToggleDependency(m.id)}
                              />
                              <Label htmlFor={`dep-${m.id}`} className="text-xs cursor-pointer truncate">{m.title}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                 </Popover>

                 <Select
                    value={milestone.status}
                    onValueChange={(value) => onUpdateMilestoneStatus(value as Milestone["status"])}
                >
                    <SelectTrigger className={cn("w-[140px] h-8 text-xs", dependencyWarning && milestone.status === 'In Progress' && "border-amber-500")}>
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
            
            {dependencyWarning && milestone.status === 'In Progress' && (
              <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-md flex items-start gap-2 text-[10px] text-amber-600">
                <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
                <p>Dependency Alert: Milestones this depends on are not yet complete.</p>
              </div>
            )}

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

            <div className="pt-4 space-y-4 border-t border-primary/5">
              <div className="space-y-2">
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> Suggested Prompts
                </h5>
                <div className="flex flex-wrap gap-2">
                  {statusPrompts[milestone.status].map(prompt => (
                    <Button 
                      key={prompt} 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-[10px] bg-primary/5 border-primary/10 hover:bg-primary/10"
                      onClick={() => onUpdateMilestone({ reflection: `${milestone.reflection || ''}\n\n## ${prompt}\n` })}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>

              <ReflectionTextarea
                  initialText={milestone.reflection}
                  onSave={handleSaveReflection}
              />

              {milestone.reflections && milestone.reflections.length > 0 && (
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-[10px] uppercase font-bold text-muted-foreground h-8"
                    onClick={() => setShowHistory(!showHistory)}
                  >
                    <History className="w-3 h-3 mr-2" /> 
                    Reflection History ({milestone.reflections.length})
                  </Button>
                  {showHistory && (
                    <div className="space-y-2 pl-4 border-l-2 border-primary/10 ml-1">
                      {milestone.reflections.map(r => (
                        <div key={r.id} className="p-2 bg-muted/20 rounded-md">
                          <div className="flex justify-between items-center mb-1">
                            <Badge variant="secondary" className="text-[8px] h-3.5 py-0">{r.milestoneStatus}</Badge>
                            <span className="text-[8px] text-muted-foreground">{format(new Date(r.createdAt), 'MMM d, h:mm a')}</span>
                          </div>
                          <p className="text-[11px] line-clamp-2 italic">"{r.content}"</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
        </CollapsibleContent>
    </Collapsible>
  );
}
