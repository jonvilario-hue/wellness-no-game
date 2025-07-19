
'use client'

import type { Blueprint, Milestone, Task } from "@/types/blueprint"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Archive, Trash2, Edit, MoreVertical } from "lucide-react"
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

type BlueprintProjectProps = {
  project: Blueprint;
  onUpdateProject: (id: string, updates: Partial<Blueprint>) => void;
  onDeleteProject: (id: string) => void;
  onAddMilestone: (projectId: string, milestone: Omit<Milestone, 'id'>) => void;
  onToggleTask: (projectId: string, milestoneId: string, taskId: string) => void;
}

export default function BlueprintProject({
  project,
  onUpdateProject,
  onDeleteProject,
  onAddMilestone,
  onToggleTask,
}: BlueprintProjectProps) {

  const calculateProjectProgress = (proj: Blueprint) => {
    const allTasks = proj.milestones.flatMap(m => m.tasks);
    if (allTasks.length === 0) return 0;
    const completedTasks = allTasks.filter(t => t.completed).length;
    return (completedTasks / allTasks.length) * 100;
  };

  const progress = calculateProjectProgress(project);

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div className="flex-grow">
                <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
                {project.description && <p className="text-muted-foreground text-sm">{project.description}</p>}
                {project.identityGoal && (
                <p className="italic text-sm mt-2">Becoming: <strong>{project.identityGoal}</strong></p>
                )}
                <div className="flex gap-2 mt-2 flex-wrap">
                {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" /> Edit Blueprint
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onUpdateProject(project.id, { archived: !project.archived })}>
                       <Archive className="w-4 h-4 mr-2" /> {project.archived ? 'Unarchive' : 'Archive'}
                    </DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Trash2 className="w-4 h-4 mr-2 text-destructive" /> Delete
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
        <Progress value={progress} className="mt-4" />
      </CardHeader>

      <CardContent className="space-y-4">
        {project.milestones.map(milestone => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            onToggleTask={(taskId) => onToggleTask(project.id, milestone.id, taskId)}
          />
        ))}

        <AddMilestoneDialog onAdd={(milestone) => onAddMilestone(project.id, milestone)}>
          <Button variant="outline" className="mt-4 w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Milestone
          </Button>
        </AddMilestoneDialog>
      </CardContent>
    </Card>
  )
}
