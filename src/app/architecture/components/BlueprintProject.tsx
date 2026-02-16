'use client'

import type { Blueprint, Milestone, Task } from "@/types/blueprint"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Archive, Trash2, Edit, MoreVertical, ArchiveRestore, CheckCircle2, Copy, Layers, Rocket, History } from "lucide-react"
import MilestoneCard from "./MilestoneCard"
import AddMilestoneDialog from "./AddMilestoneDialog"
import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useDashboardSettings } from "@/hooks/use-dashboard-settings"
import { cn } from "@/lib/utils"

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
  const { cloneBlueprint } = useBlueprintStore();
  const { settings } = useDashboardSettings();

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
                    <Badge variant="outline" className="text-[10px] font-black h-5">V{project.versionNumber || 1}</Badge>
                </div>
                {project.description && <p className="text-muted-foreground text-sm max-w-2xl">{project.description}</p>}
                
                {project.identityGoal && (
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <div className={cn("text-xs font-medium text-primary mt-2 flex items-center gap-2", settings.assistantMode && "cursor-help")}>
                            <Badge variant="outline" className="font-bold uppercase tracking-tighter text-[9px] bg-primary/5">Becoming</Badge>
                            <span className="italic">{project.identityGoal}</span>
                        </div>
                      </TooltipTrigger>
                      {settings.assistantMode && <TooltipContent className="max-w-xs">This is who you're growing into through this blueprint. Research shows identity-based goals are more sustainable.</TooltipContent>}
                    </Tooltip>
                  </TooltipProvider>
                )}

                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <div className={cn("flex gap-2 mt-3 flex-wrap", settings.assistantMode && "cursor-help")}>
                      {project.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-[10px] uppercase font-bold tracking-tight">{tag}</Badge>
                      ))}
                      </div>
                    </TooltipTrigger>
                    {settings.assistantMode && <TooltipContent>Labels used to categorize and match relevant strategies from the Vision Library.</TooltipContent>}
                  </Tooltip>
                </TooltipProvider>
            </div>
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <EditBlueprintDialog blueprint={project} onSave={(updates) => onUpdateProject(project.id, updates)}>
                       <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Edit className="w-4 h-4 mr-2" /> Edit Blueprint
                       </DropdownMenuItem>
                    </EditBlueprintDialog>
                    
                    <DropdownMenuItem onClick={() => onUpdateProject(project.id, { status: project.status === 'Completed' ? 'Active' : 'Completed' })}>
                       <CheckCircle2 className="w-4 h-4 mr-2" /> 
                       {project.status === 'Completed' ? 'Mark Active' : 'Mark Completed'}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <DropdownMenuItem onClick={() => cloneBlueprint(project.id, {})}>
                             <Copy className="w-4 h-4 mr-2" /> Clone Blueprint
                          </DropdownMenuItem>
                        </TooltipTrigger>
                        {settings.assistantMode && <TooltipContent side="left">Create an exact copy with progress reset to zero.</TooltipContent>}
                      </Tooltip>

                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <DropdownMenuItem onClick={() => cloneBlueprint(project.id, { asTemplate: true })}>
                             <Layers className="w-4 h-4 mr-2" /> Save as Template
                          </DropdownMenuItem>
                        </TooltipTrigger>
                        {settings.assistantMode && <TooltipContent side="left">Save the structure to your Templates library for reuse.</TooltipContent>}
                      </Tooltip>

                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <DropdownMenuItem onClick={() => cloneBlueprint(project.id, { asV2: true })}>
                             <Rocket className="w-4 h-4 mr-2" /> Create V2 Iteration
                          </DropdownMenuItem>
                        </TooltipTrigger>
                        {settings.assistantMode && <TooltipContent side="left">Clone but carry over all reflections into a "Lessons from v1" section.</TooltipContent>}
                      </Tooltip>
                    </TooltipProvider>

                    <DropdownMenuSeparator />

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
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div className={cn("space-y-1", settings.assistantMode && "cursor-help")}>
                    <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                        <span>Blueprint Progress</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                  </div>
                </TooltipTrigger>
                {settings.assistantMode && <TooltipContent>Your overall completion percentage, calculated from completed tasks vs total tasks.</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-6">
        {project.lessonsFromV1 && (
          <div className="p-4 bg-primary/5 border border-dashed border-primary/20 rounded-lg mb-4">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
              <History className="w-3 h-3" /> Lessons from V1
            </h5>
            <p className="text-xs text-muted-foreground italic whitespace-pre-wrap">{project.lessonsFromV1}</p>
          </div>
        )}

        {project.milestones.map(milestone => (
          <MilestoneCard
            key={milestone.id}
            projectId={project.id}
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
