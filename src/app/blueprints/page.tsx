
'use client';

import { useState, useEffect } from 'react';
import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import { Button } from '@/components/ui/button';
import { Plus, LayoutList, GanttChartSquare, Target, ChevronUp, ChevronDown, Book } from 'lucide-react';
import BlueprintProject from './components/BlueprintProject';
import TimelineView from './components/TimelineView';
import type { Blueprint, Milestone, Task } from '@/types/blueprint';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { StrategySelection } from './components/StrategySelection';
import type { GoalStrategy } from '@/data/goal-strategies';
import { BlueprintCreator } from './components/BlueprintCreator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StrategyGuide } from './components/StrategyGuide';
import { goalStrategies } from '@/data/goal-strategies';

export default function BlueprintsPage() {
  const { projects, addProject, updateProject, deleteProject, addMilestone, toggleTask, updateMilestoneStatus, addTask, updateTask, deleteTask, updateMilestoneDetails, deleteMilestone } = useBlueprintStore();
  
  const [viewState, setViewState] = useState<'list' | 'select_strategy' | 'create_blueprint'>('list');
  const [selectedStrategy, setSelectedStrategy] = useState<GoalStrategy | null>(null);

  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const savedState = localStorage.getItem('blueprints-collapsible-state');
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState));
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    localStorage.setItem('blueprints-collapsible-state', JSON.stringify(open));
  };
  
  const handleQuickAdd = () => {
    addProject({
        title: "Untitled Blueprint",
        description: "",
        identityGoal: "",
        tags: [],
    });
  }

  const handleCreateBlueprint = (projectData: Omit<Blueprint, 'id' | 'milestones' | 'archived'>) => {
    addProject(projectData);
    setViewState('list');
    setSelectedStrategy(null);
  };
  
  const activeProjects = projects.filter(p => !p.archived);
  const archivedProjects = projects.filter(p => p.archived);
  
  const projectsToDisplay = activeTab === 'active' ? activeProjects : archivedProjects;

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

  const renderContent = () => {
    switch (viewState) {
      case 'create_blueprint':
        if (!selectedStrategy) return null;
        return (
           <BlueprintCreator
              strategy={selectedStrategy}
              onBack={() => setViewState('list')}
              onCreate={handleCreateBlueprint}
            />
        );
      case 'list':
      default:
        return (
            <>
              <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                     <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                      <TabsList>
                          <TabsTrigger value="active">Active ({activeProjects.length})</TabsTrigger>
                          <TabsTrigger value="archived">Archived ({archivedProjects.length})</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
                        <TabsList>
                            <TabsTrigger value="list"><LayoutList className="w-4 h-4 mr-2"/>List</TabsTrigger>
                            <TabsTrigger value="timeline"><GanttChartSquare className="w-4 h-4 mr-2"/>Timeline</TabsTrigger>
                        </TabsList>
                    </Tabs>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={handleQuickAdd}>
                        <Plus className="w-4 h-4 mr-2" />
                        New Blueprint
                    </Button>
                  </div>
              </div>

              <div>
                {viewMode === 'list' && (
                  <div className="space-y-6">
                    {projectsToDisplay.length === 0 ? (
                      <div className="text-center py-16 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">
                          {activeTab === 'active'
                            ? 'You have no active blueprints.'
                            : 'You have no archived blueprints.'}
                        </p>
                        {activeTab === 'active' && (
                          <p className="text-sm text-muted-foreground">
                            Click "New Blueprint" to map out your first vision.
                          </p>
                        )}
                      </div>
                    ) : (
                      projectsToDisplay.map(project => (
                        <BlueprintProject
                            key={project.id}
                            project={project}
                            onUpdateProject={updateProject}
                            onDeleteProject={deleteProject}
                            onAddMilestone={addMilestone}
                            onUpdateMilestone={updateMilestoneDetails}
                            onDeleteMilestone={deleteMilestone}
                            onToggleTask={toggleTask}
                            onAddTask={addTask}
                            onUpdateTask={updateTask}
                            onDeleteTask={deleteTask}
                            onUpdateMilestoneStatus={updateMilestoneStatus}
                        />
                      ))
                    )}
                  </div>
                )}

                {viewMode === 'timeline' && (
                  <TimelineView milestones={getTimelineMilestones(projectsToDisplay)} />
                )}
              </div>
            </>
        );
    }
  }

  return (
    <div className="space-y-6">
       <Collapsible open={isOpen} onOpenChange={handleOpenChange} className="w-full">
            <div className="flex justify-between items-start">
                <div className="flex-grow">
                    <CollapsibleContent>
                        <div className="flex flex-col items-center text-center pb-4">
                            <Target className="mx-auto h-12 w-12 text-primary mb-2"/>
                            <h1 className="text-4xl font-bold font-headline">Architect Lab</h1>
                            <p className="text-lg text-muted-foreground">Design your future, one blueprint at a time.</p>
                        </div>
                    </CollapsibleContent>
                </div>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon">
                        {isOpen ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>
            </div>
        </Collapsible>
       
       <Tabs defaultValue="blueprints" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="blueprints"><Target className="mr-2 h-4 w-4" />Blueprints</TabsTrigger>
                <TabsTrigger value="guides"><Book className="mr-2 h-4 w-4" />Vision Techniques</TabsTrigger>
            </TabsList>
            <TabsContent value="blueprints" className="mt-6">
                {renderContent()}
            </TabsContent>
            <TabsContent value="guides" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {goalStrategies.map(strategy => (
                        <StrategyGuide key={strategy.id} strategy={strategy} />
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    </div>
  );
}
