
'use client';

import { useState } from 'react';
import type { Project } from '@/hooks/use-architecture-store';
import { useArchitectureStore } from '@/hooks/use-architecture-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Archive, Trash2, PlusCircle, Edit, Tag, ArchiveRestore } from 'lucide-react';
import { MilestoneList } from './milestone-list';
import { EditableLabel } from '../time/editable-label';
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
} from '@/components/ui/alert-dialog';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { updateProject, deleteProject, addMilestone } = useArchitectureStore();
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');

  const calculateProjectProgress = (project: Project) => {
    const allTasks = project.milestones.flatMap((m) => m.tasks);
    if (allTasks.length === 0) return 0;
    const completedTasks = allTasks.filter((t) => t.done).length;
    return (completedTasks / allTasks.length) * 100;
  };

  const progress = calculateProjectProgress(project);

  const handleAddMilestone = () => {
    if (newMilestoneTitle.trim()) {
      addMilestone(project.id, newMilestoneTitle.trim());
      setNewMilestoneTitle('');
    }
  };

  const handleToggleArchive = () => {
    updateProject(project.id, { archived: !project.archived });
  };
  
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const tags = e.target.value.split(',').map(t => t.trim());
      updateProject(project.id, { tags });
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-grow mr-4">
            <EditableLabel
              initialValue={project.title}
              onSave={(newTitle) => updateProject(project.id, { title: newTitle })}
              className="!p-0 !min-h-0"
              inputClassName="text-2xl font-bold"
            />
            <div className="flex flex-wrap gap-1 mt-2">
                {project.tags.filter(Boolean).map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={handleToggleArchive}>
              {project.archived ? <ArchiveRestore className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
            </Button>
             <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="w-4 h-4"/>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Project?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this project and all its milestones and tasks? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteProject(project.id)} variant="destructive">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-2">
            <Progress value={progress} className="h-2" />
            <span className="text-sm font-semibold text-muted-foreground">{Math.round(progress)}%</span>
        </div>
      </CardHeader>
      <CardContent>
        <MilestoneList projectId={project.id} milestones={project.milestones} />
        <div className="flex gap-2 mt-4">
          <Input
            placeholder="New milestone..."
            value={newMilestoneTitle}
            onChange={(e) => setNewMilestoneTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddMilestone()}
          />
          <Button onClick={handleAddMilestone} variant="secondary">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Milestone
          </Button>
        </div>
      </CardContent>
       <CardFooter className="flex items-center gap-2 text-sm text-muted-foreground">
            <Tag className="w-4 h-4" />
            <Input 
                placeholder="Add tags, separated by commas..." 
                defaultValue={project.tags.join(', ')} 
                onChange={handleTagsChange}
                className="h-8 text-xs"
            />
        </CardFooter>
    </Card>
  );
}
