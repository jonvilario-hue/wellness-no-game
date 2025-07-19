
'use client';

import { useState } from 'react';
import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import BlueprintProject from './components/BlueprintProject';
import AddProjectDialog from './components/AddProjectDialog';

export default function BlueprintsPage() {
  const { projects, addProject, updateProject, deleteProject, addMilestone, toggleTask } = useBlueprintStore();
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Architecture</h1>
        <Button onClick={() => setIsAddProjectDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Blueprint
        </Button>
      </div>

      {projects.map(project => (
        <BlueprintProject
          key={project.id}
          project={project}
          onUpdateProject={updateProject}
          onDeleteProject={deleteProject}
          onAddMilestone={addMilestone}
          onToggleTask={toggleTask}
        />
      ))}
      
      {projects.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">You have no blueprints yet.</p>
          <p className="text-sm text-muted-foreground">Click "New Blueprint" to map out your first vision.</p>
        </div>
      )}

      <AddProjectDialog
        open={isAddProjectDialogOpen}
        onOpenChange={setIsAddProjectDialogOpen}
        onAdd={addProject}
      />
    </div>
  );
}
