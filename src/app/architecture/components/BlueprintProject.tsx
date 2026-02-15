'use client'

import type { Blueprint, Milestone, Task } from "@/types/blueprint"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Archive, Trash2, Edit, MoreVertical, ArchiveRestore, CheckCircle2 } from "lucide-react"
import MilestoneCard from "./MilestoneCard"
import AddMilestoneDialog from "./AddMilestoneDialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import EditBlueprintDialog from "./EditBlueprintDialog"

type BlueprintProjectProps = {
  project: Blueprint;
  onUpdateProject: (id: string, updates: Partial<Blueprint>) => void;
  onDeleteProject: (id: string) => void;
  onAddMilestone: (projectId: string, milestone: Omit<Milestone, 'id'>) => void;
  onUpdateMilestone: (projectId: string, milestoneId: string, updates: Partial<Milestone>) => void;
  onDeleteMilestone: (projectId: string, milestoneId: string) => void;
  onToggleTask: (projectId: string, milestoneId: string, taskId: string) => void;
  onAddTask: (projectId: string, milestoneId: string, task: Omit<Task, 'id' | 'completed'>) => void;
  onUpdateTask: (projectId: string, milestoneId: string, taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (projectId: string, milestoneId: string, taskId: string) => void;
  onUpdateMilestoneStatus: (projectId: string, milestoneId: string, status: Milestone['status']) => void;
}

export default function BlueprintProject({
  project,
  onUpdateProject,
  onDeleteProject,
  onAddMilestone,
  onUpdateMilestone,
  onDeleteMilestone,
  onToggleTask,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onUpdateMilestoneStatus
}: BlueprintProjectProps) {

  const calculateProjectProgress = (proj: Blueprint) => {
    const allTasks = proj.milestones.flatMap(m => m.tasks);
    if (allTasks.length === 0) return 0;
    const completedTasks = allTasks.filter(t => t.completed).length;
    return (completedTasks / allTasks.length) * 100;
  };

  const progress = calculateProjectProgress(project);

  return (
    <Card className="mb-6 overflow-hidden border-primary/10 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="bg-muted/30 pb-4">
        <div className="flex justify-between items-start">
            <div className="flex-grow space-y-1">
                <div className="flex items-center gap-2">
                    <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
                    {project.status === 'Completed' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                </div>
                {project.description && <p className="text-muted-foreground text-sm max-w-2xl">{project.description}</p>}
                {project.identityGoal && (
                <div className="text-xs font-medium text-primary mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="font-bold uppercase tracking-tighter text-[9px] bg-primary/5">Becoming</Badge>
                    <span className="italic">{project.identityGoal}</span>
                </div>
                )}
                <div className="flex gap-2 mt-3 flex-wrap">
                {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[10px] uppercase font-bold tracking-tight">{tag}</Badge>
                ))}
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <EditBlueprintDialog blueprint={project} onSave={(updates) => onUpdateProject(project.id, updates)}>
                       <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Edit className="w-4 h-4 mr-2" /> Edit Blueprint
                       </DropdownMenuItem>
                    </EditBlueprintDialog>
                    
                    <DropdownMenuItem onClick={() => onUpdateProject(project.id, { status: project.status === 'Completed' ? 'Active' : 'Completed' })}>
                       <CheckCircle2 className="w-4 h-4 mr-2" /> 
                       {project.status === 'Completed' ? 'Mark Active' : 'Mark Completed'}
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onUpdateProject(project.id, { status: project.status === 'Archived' ? 'Active' : 'Archived' })}>
                       {project.status === 'Archived' ? <ArchiveRestore className="w-4 h-4 mr-2" /> : <Archive className="w-4 h-4 mr-2" />} 
                       {project.status === 'Archived' ? 'Unarchive' : 'Archive'}
                    </DropdownMenuItem>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Delete Blueprint?</AlertDialogTitle></AlertDialogHeader>
                        <AlertDialogDescription>This will permanently delete "{project.title}" and all its milestones. This cannot be undone.</AlertDialogDescription>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDeleteProject(project.id)} variant="destructive">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div className="mt-4 space-y-1">
            <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                <span>Blueprint Progress</span>
                <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-6">
        {project.milestones.map(milestone => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            onToggleTask={(taskId) => onToggleTask(project.id, milestone.id, taskId)}
            onAddTask={(task) => onAddTask(project.id, milestone.id, task)}
            onUpdateMilestoneStatus={(status) => onUpdateMilestoneStatus(project.id, milestone.id, status)}
            onUpdateMilestone={(updates) => onUpdateMilestone(project.id, milestone.id, updates)}
          />
        ))}

        <AddMilestoneDialog onSave={(milestone) => onAddMilestone(project.id, milestone)}>
          <Button variant="outline" className="mt-2 w-full border-dashed">
            <Plus className="w-4 h-4 mr-2" />
            Add Milestone
          </Button>
        </AddMilestoneDialog>
      </CardContent>
    </Card>
  )
}
