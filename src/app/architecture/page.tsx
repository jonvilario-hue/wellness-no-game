
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  LayoutList, 
  GanttChartSquare, 
  Target, 
  ChevronUp, 
  ChevronDown, 
  Book, 
  Sparkles, 
  Filter, 
  X, 
  LayoutDashboard, 
  Layers, 
  BrainCircuit,
  Star,
  ArrowLeft,
  Info
} from 'lucide-react';
import BlueprintProject from './components/BlueprintProject';
import GanttTimeline from './components/GanttTimeline';
import type { Blueprint } from '@/types/blueprint';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { StrategySelection } from '../blueprints/components/StrategySelection';
import type { GoalStrategy } from '@/data/goal-strategies';
import { BlueprintCreator } from '../blueprints/components/BlueprintCreator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StrategyGuide } from '../blueprints/components/StrategyGuide';
import { goalStrategies } from '@/data/goal-strategies';
import { Badge } from '@/components/ui/badge';
import BlueprintDashboard from './components/BlueprintDashboard';
import TemplatesLibrary from './components/TemplatesLibrary';
import PlaybookView from './components/PlaybookView';
import ScenarioSimulator from './components/ScenarioSimulator';
import AdviceMatcher from './components/AdviceMatcher';
import ArchitectureHelp from './components/ArchitectureHelp';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';

export default function ArchitecturePage() {
  const { projects, addProject, updateProject, deleteProject, addMilestone, toggleTask, updateMilestoneStatus, addTask, updateTask, deleteTask, updateMilestoneDetails, deleteMilestone } = useBlueprintStore();
  const { settings } = useDashboardSettings();
  
  const [viewState, setViewState] = useState<'list' | 'select_strategy' | 'create_blueprint'>('list');
  const [selectedStrategy, setSelectedStrategy] = useState<GoalStrategy | null>(null);

  const [activeTab, setActiveTab] = useState<'Active' | 'Completed' | 'Archived'>('Active');
  const [viewMode, setViewMode] = useState<'dashboard' | 'list' | 'timeline'>('dashboard');
  const [isOpen, setIsOpen] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('architecture-collapsible-state');
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState));
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    localStorage.setItem('architecture-collapsible-state', JSON.stringify(open));
  };
  
  const handleStartCreation = () => {
    setViewState('select_strategy');
  };

  const handleSelectStrategy = (strategy: GoalStrategy) => {
    setSelectedStrategy(strategy);
    setViewState('create_blueprint');
  };

  const handleCreateBlueprint = (projectData: Omit<Blueprint, 'id' | 'milestones' | 'status'>) => {
    addProject(projectData);
    setViewState('list');
    setSelectedStrategy(null);
  };
  
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
        const matchesTab = p.status === activeTab;
        const matchesTag = !selectedTag || p.tags.includes(selectedTag);
        return matchesTab && matchesTag;
    });
  }, [projects, activeTab, selectedTag]);

  const renderContent = () => {
    switch (viewState) {
      case 'select_strategy':
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Button variant="ghost" className="mb-4" onClick={() => setViewState('list')}>
                    <ArrowLeft className="mr-2 h-4 w-4"/> Back to Lab
                </Button>
                <StrategySelection onSelectStrategy={handleSelectStrategy} />
            </div>
        );
      case 'create_blueprint':
        if (!selectedStrategy) return null;
        return (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <BlueprintCreator
                    strategy={selectedStrategy}
                    onBack={() => setViewState('select_strategy')}
                    onCreate={handleCreateBlueprint}
                />
           </div>
        );
      case 'list':
      default:
        return (
            <div className="animate-in fade-in duration-500">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="flex flex-col gap-4 w-full sm:w-auto">
                    <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                            <Tooltip delayDuration={0}>
                              <TooltipTrigger asChild>
                                <TabsList className="bg-muted/50 border-primary/10">
                                    <TabsTrigger value="Active" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">Active</TabsTrigger>
                                    <TabsTrigger value="Completed" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">Completed</TabsTrigger>
                                    <TabsTrigger value="Archived" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">Archived</TabsTrigger>
                                </TabsList>
                              </TooltipTrigger>
                              {settings.assistantMode && (
                                <TooltipContent className="max-w-xs">
                                  Filter your blueprints by status. Active ones are in progress, Completed ones are finished, and Archived ones are paused or shelved for later.
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </Tabs>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
                              <TabsList className="bg-muted/50 border-primary/10">
                                  <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                      <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">
                                        <LayoutDashboard className="w-4 h-4 mr-2"/>Board
                                      </TabsTrigger>
                                    </TooltipTrigger>
                                    {settings.assistantMode && <TooltipContent>A bird's-eye overview of all active blueprints. See upcoming deadlines, overdue tasks, and weekly priorities at a glance.</TooltipContent>}
                                  </Tooltip>
                                  
                                  <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                      <TabsTrigger value="list" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">
                                        <LayoutList className="w-4 h-4 mr-2"/>List
                                      </TabsTrigger>
                                    </TooltipTrigger>
                                    {settings.assistantMode && <TooltipContent>See your blueprints as expandable cards with milestones and tasks listed vertically.</TooltipContent>}
                                  </Tooltip>

                                  <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                      <TabsTrigger value="timeline" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">
                                        <GanttChartSquare className="w-4 h-4 mr-2"/>Gantt
                                      </TabsTrigger>
                                    </TooltipTrigger>
                                    {settings.assistantMode && <TooltipContent className="max-w-xs">See your milestones on a Gantt-style timeline. Dependency arrows show which milestones must finish before others can start. The highlighted path is your critical path.</TooltipContent>}
                                  </Tooltip>
                              </TabsList>
                          </Tabs>
                        </TooltipProvider>
                    </div>
                    
                    {allTags.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                            <Filter className="w-3 h-3 text-muted-foreground" />
                            {allTags.map(tag => (
                                <Badge 
                                    key={tag} 
                                    variant={selectedTag === tag ? 'default' : 'outline'}
                                    className="cursor-pointer text-[10px] uppercase tracking-tighter py-0 h-5"
                                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                >
                                    {tag}
                                </Badge>
                            ))}
                            {selectedTag && (
                                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setSelectedTag(null)}>
                                    <X className="w-3 h-3" />
                                </Button>
                            )}
                        </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Button variant="outline" onClick={() => setIsTemplatesOpen(true)} className="border-primary/20 hover:bg-primary/5">
                              <Layers className="w-4 h-4 mr-2" /> Templates
                          </Button>
                        </TooltipTrigger>
                        {settings.assistantMode && <TooltipContent className="max-w-xs">Browse pre-built blueprint structures for common goals like launching a business, learning a language, or completing a creative project.</TooltipContent>}
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Button onClick={handleStartCreation} className="shadow-lg hover:scale-105 transition-transform bg-primary text-primary-foreground">
                              <Sparkles className="w-4 h-4 mr-2" />
                              Guided Blueprint
                          </Button>
                        </TooltipTrigger>
                        {settings.assistantMode && <TooltipContent className="max-w-xs">Walk through a step-by-step flow to create a new blueprint. You'll define your goal, identity statement, category, and milestones with prompts.</TooltipContent>}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
              </div>

              <div>
                {viewMode === 'dashboard' && <BlueprintDashboard />}

                {viewMode === 'list' && (
                  <div className="space-y-6">
                    {filteredProjects.length === 0 ? (
                      <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/20">
                        <Target className="mx-auto h-12 w-12 text-muted-foreground opacity-20 mb-4" />
                        <p className="text-xl font-bold text-muted-foreground">
                          {activeTab === 'Active'
                            ? 'Your Architecture is waiting.'
                            : `No ${activeTab.toLowerCase()} blueprints found.`}
                        </p>
                        {activeTab === 'Active' && (
                          <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
                            Use a Guided Strategy to build your next major milestone or life pivot.
                          </p>
                        )}
                        <Button onClick={handleStartCreation} variant="secondary" className="mt-6">
                            Start Your First Blueprint
                        </Button>
                      </div>
                    ) : (
                      filteredProjects.map(project => (
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
                  <GanttTimeline />
                )}
              </div>
            </div>
        );
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Collapsible open={isOpen} onOpenChange={handleOpenChange} className="w-full">
              <div className="flex justify-between items-start">
                  <div className="flex-grow">
                      <CollapsibleContent>
                          <div className="flex flex-col items-center text-center pb-4">
                              <div className="p-3 bg-primary/10 rounded-full mb-3">
                                  <Target className="h-10 w-10 text-primary"/>
                              </div>
                              <div className="flex items-center justify-center gap-3">
                                <h1 className="text-4xl font-bold font-headline tracking-tight">My Architecture</h1>
                                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsHelpOpen(true)}>
                                  <Info className="w-5 h-5 text-muted-foreground" />
                                </Button>
                              </div>
                              <p className="text-lg text-muted-foreground max-w-2xl">Design your future with precision. Map identity-driven goals to actionable steps.</p>
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
                <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <TabsTrigger value="blueprints"><Target className="mr-2 h-4 w-4" />Blueprints</TabsTrigger>
                      </TooltipTrigger>
                      {settings.assistantMode && <TooltipContent>Your long-term goals, broken into milestones and tasks. Each blueprint represents a major project or life direction you're actively building toward.</TooltipContent>}
                    </Tooltip>
                    
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <TabsTrigger value="guides"><Book className="mr-2 h-4 w-4" />Vision Library</TabsTrigger>
                      </TooltipTrigger>
                      {settings.assistantMode && <TooltipContent>A collection of proven goal-achievement strategies. Each one includes a step-by-step protocol you can learn, practice, and apply.</TooltipContent>}
                    </Tooltip>
                </TabsList>

              <TabsContent value="blueprints" className="mt-0">
                  {renderContent()}
              </TabsContent>
              <TabsContent value="guides" className="mt-0 space-y-12">
                  <Tabs defaultValue="library">
                    <div className="flex justify-center mb-8">
                        <TabsList className="grid w-full grid-cols-3 max-w-lg h-auto p-1 bg-muted/50">
                          <TabsTrigger value="library" className="gap-2"><Book className="w-4 h-4" /> Strategy Library</TabsTrigger>
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                              <TabsTrigger value="playbook" className="gap-2"><Star className="w-4 h-4" /> My Playbook</TabsTrigger>
                            </TooltipTrigger>
                            {settings.assistantMode && <TooltipContent className="max-w-xs">View only the strategies you've bookmarked as favorites. Tracks usage stats and personal execution notes.</TooltipContent>}
                          </Tooltip>
                          
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                              <TabsTrigger value="advisor" className="gap-2"><BrainCircuit className="w-4 h-4" /> Advisor</TabsTrigger>
                            </TooltipTrigger>
                            {settings.assistantMode && <TooltipContent className="max-w-xs">Get personalized strategy recommendations based on your active blueprints' status and categories.</TooltipContent>}
                          </Tooltip>
                        </TabsList>
                    </div>
                    
                    <TabsContent value="library" className="space-y-12">
                      <ScenarioSimulator />
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-700">
                          {goalStrategies.map(strategy => (
                              <StrategyGuide key={strategy.id} strategy={strategy} />
                          ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="playbook">
                      <PlaybookView />
                    </TabsContent>

                    <TabsContent value="advisor">
                      <AdviceMatcher />
                    </TabsContent>
                  </Tabs>
              </TabsContent>
          </Tabs>

          <TemplatesLibrary open={isTemplatesOpen} onOpenChange={setIsTemplatesOpen} />
          <ArchitectureHelp open={isHelpOpen} onOpenChange={setIsHelpOpen} />
      </div>
    </TooltipProvider>
  );
}
