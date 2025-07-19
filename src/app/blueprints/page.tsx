
'use client';

import { useState } from 'react';
import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import { Button } from '@/components/ui/button';
import { Plus, LayoutList, GanttChartSquare } from 'lucide-react';
import BlueprintProject from './components/BlueprintProject';
import AddProjectDialog from './components/AddProjectDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TimelineView from './components/TimelineView';
import type { Blueprint } from '@/types/blueprint';

export default function BlueprintsPage() {
  const { projects, addProject, updateProject, deleteProject, addMilestone, toggleTask, updateMilestoneStatus, addTask, updateTask, deleteTask, updateMilestoneDetails } = useBlueprintStore();
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');
  
  const activeProjects = projects.filter(p => !p.archived);
  const archivedProjects = projects.filter(p => p.archived);

  const getTimelineMilestones = (blueprintProjects: Blueprint[]) => {
    return blueprintProjects.flatMap(project =>
      project.milestones
        .filter(m => !!m.dueDate)
        .map(m => ({
          milestoneId: m.id,
          milestoneTitle: m.title,
          projectTitle: project.title,
          dueDate: m.dueDate!,
          status: m.status,
        }))
    );
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blueprints</h1>
        <Button onClick={() => setIsAddProjectDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Blueprint
        </Button>
      </div>
    
      <Tabs defaultValue="list" className="w-full">
        <div className="flex justify-between items-center mb-4">
            <TabsList>
                <TabsTrigger value="active">Active ({activeProjects.length})</TabsTrigger>
                <TabsTrigger value="archived">Archived ({archivedProjects.length})</TabsTrigger>
            </TabsList>
            <TabsList>
                <TabsTrigger value="list"><LayoutList className="w-4 h-4 mr-2"/>List View</TabsTrigger>
                <TabsTrigger value="timeline"><GanttChartSquare className="w-4 h-4 mr-2"/>Timeline View</TabsTrigger>
            </TabsList>
        </div>

        <TabsContent value="active">
            <TabsContent value="list" className="space-y-6">
                {activeProjects.map(project => (
                    <BlueprintProject
                        key={project.id}
                        project={project}
                        onUpdateProject={updateProject}
                        onDeleteProject={deleteProject}
                        onAddMilestone={addMilestone}
                        onUpdateMilestone={updateMilestoneDetails}
                        onDeleteMilestone={(milestoneId) => {}}
                        onToggleTask={toggleTask}
                        onAddTask={addTask}
                        onUpdateTask={updateTask}
                        onDeleteTask={deleteTask}
                        onUpdateMilestoneStatus={updateMilestoneStatus}
                    />
                ))}
                {activeProjects.length === 0 && (
                     <div className="text-center py-16 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">You have no active blueprints.</p>
                        <p className="text-sm text-muted-foreground">Click "New Blueprint" to map out your first vision.</p>
                    </div>
                )}
            </TabsContent>
            <TabsContent value="timeline">
                <TimelineView milestones={getTimelineMilestones(activeProjects)} />
            </TabsContent>
        </TabsContent>

        <TabsContent value="archived">
            <TabsContent value="list" className="space-y-6">
                 {archivedProjects.map(project => (
                    <BlueprintProject
                        key={project.id}
                        project={project}
                        onUpdateProject={updateProject}
                        onDeleteProject={deleteProject}
                        onAddMilestone={addMilestone}
                        onUpdateMilestone={updateMilestoneDetails}
                        onDeleteMilestone={(milestoneId) => {}}
                        onToggleTask={toggleTask}
                        onAddTask={addTask}
                        onUpdateTask={updateTask}
                        onDeleteTask={deleteTask}
                        onUpdateMilestoneStatus={updateMilestoneStatus}
                    />
                ))}
                 {archivedProjects.length === 0 && (
                     <div className="text-center py-16 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">You have no archived blueprints.</p>
                    </div>
                )}
            </TabsContent>
            <TabsContent value="timeline">
                 <TimelineView milestones={getTimelineMilestones(archivedProjects)} />
            </TabsContent>
        </TabsContent>
      </Tabs>
      
      <AddProjectDialog
        open={isAddProjectDialogOpen}
        onOpenChange={setIsAddProjectDialogOpen}
        onAdd={addProject}
      />
    </div>
  );
}
