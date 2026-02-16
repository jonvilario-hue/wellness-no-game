
'use client';

import { useState, useMemo } from 'react';
import { useBlueprintStore } from '@/hooks/use-blueprint-store';
import { Button } from '@/components/ui/button';
import { 
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
  Info,
  Rocket,
  ChevronRight,
  Flame
} from 'lucide-react';
import BlueprintProject from './components/BlueprintProject';
import GanttTimeline from './components/GanttTimeline';
import type { Blueprint } from '@/types/blueprint';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { goalStrategies } from '@/data/goal-strategies';
import { Badge } from '@/components/ui/badge';
import BlueprintDashboard from './components/BlueprintDashboard';
import TemplatesLibrary from './components/TemplatesLibrary';
import PlaybookView from './components/PlaybookView';
import ScenarioSimulator from './components/ScenarioSimulator';
import AdviceMatcher from './components/AdviceMatcher';
import ArchitectureHelp from './components/ArchitectureHelp';
import { AssistantTooltip } from '@/components/assistant-tooltip';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { StrategyGuide } from '@/app/blueprints/components/StrategyGuide';

export default function ArchitecturePage() {
  const { projects, updateProject, deleteProject } = useBlueprintStore();
  
  const [activeTab, setActiveTab] = useState<'active' | 'Completed' | 'Archived'>('active');
  const [viewMode, setViewMode] = useState<'dashboard' | 'list' | 'timeline'>('dashboard');
  const [isOpen, setIsOpen] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

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

  const selectedProject = useMemo(() => 
    projects.find(p => p.id === selectedProjectId), 
  [projects, selectedProjectId]);

  if (selectedProject) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedProjectId(null)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Architect Lab
          </Button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black uppercase tracking-tighter">{selectedProject.title}</h1>
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">V{selectedProject.versionNumber || 1}</Badge>
          </div>
        </div>
        <BlueprintDashboard project={selectedProject} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
            <div className="flex justify-between items-start">
                <div className="flex-grow">
                    <CollapsibleContent>
                        <div className="flex flex-col items-center text-center pb-4">
                            <div className="p-3 bg-primary/10 rounded-full mb-3">
                                <Target className="h-10 w-10 text-primary"/>
                            </div>
                            <div className="flex items-center justify-center gap-3">
                              <h1 className="text-4xl font-bold font-headline tracking-tight">Architect Lab</h1>
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
                  <AssistantTooltip text="Your long-term goals, broken into milestones and tasks. Each blueprint represents a major project or life direction you're actively building toward.">
                    <TabsTrigger value="blueprints" className="w-full"><Target className="mr-2 h-4 w-4" />Blueprints</TabsTrigger>
                  </AssistantTooltip>
                  <AssistantTooltip text="A collection of proven goal-achievement strategies. Each one includes a step-by-step protocol you can learn, practice, and apply.">
                    <TabsTrigger value="guides" className="w-full"><Book className="mr-2 h-4 w-4" />Vision Library</TabsTrigger>
                  </AssistantTooltip>
              </TabsList>

            <TabsContent value="blueprints" className="mt-0 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="flex flex-col gap-4 w-full sm:w-auto">
                    <div className="flex items-center gap-2">
                        <AssistantTooltip text="Filter your blueprints by status. Active ones are in progress, Completed ones are finished, and Archived ones are paused or shelved for later.">
                          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                            <TabsList className="bg-muted/50 border-primary/10">
                                <TabsTrigger value="active" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">Active</TabsTrigger>
                                <TabsTrigger value="Completed" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">Completed</TabsTrigger>
                                <TabsTrigger value="Archived" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">Archived</TabsTrigger>
                            </TabsList>
                          </Tabs>
                        </AssistantTooltip>

                        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
                            <TabsList className="bg-muted/50 border-primary/10">
                                <AssistantTooltip text="A bird's-eye overview of all active blueprints. See upcoming deadlines, overdue tasks, and weekly priorities at a glance.">
                                  <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">
                                    <LayoutDashboard className="w-4 h-4 mr-2"/>Dashboard
                                  </TabsTrigger>
                                </AssistantTooltip>
                                
                                <AssistantTooltip text="See your blueprints as expandable cards with milestones and tasks listed vertically.">
                                  <TabsTrigger value="list" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">
                                    <LayoutList className="w-4 h-4 mr-2"/>List
                                  </TabsTrigger>
                                </AssistantTooltip>

                                <AssistantTooltip text="See your milestones on a Gantt-style timeline. Dependency arrows show which milestones must finish before others can start.">
                                  <TabsTrigger value="timeline" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm">
                                    <GanttChartSquare className="w-4 h-4 mr-2"/>Gantt
                                  </TabsTrigger>
                                </AssistantTooltip>
                            </TabsList>
                        </Tabs>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <AssistantTooltip text="Browse pre-built blueprint structures for common goals like launching a business, learning a language, or completing a creative project.">
                      <Button variant="outline" onClick={() => setIsTemplatesOpen(true)} className="border-primary/20 hover:bg-primary/5">
                          <Layers className="w-4 h-4 mr-2" /> Templates
                      </Button>
                    </AssistantTooltip>
                  </div>
              </div>

              {viewMode === 'dashboard' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map(p => (
                    <Card key={p.id} className="group hover:border-primary/50 transition-all cursor-pointer overflow-hidden" onClick={() => setSelectedProjectId(p.id)}>
                      <CardHeader className="bg-primary/5">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="secondary" className="text-[10px] uppercase font-black">{p.tags[0]}</Badge>
                          <div className="flex items-center gap-1 text-[10px] font-bold text-orange-500">
                            <Flame className="w-3 h-3" /> {p.streaks.currentStreak}
                          </div>
                        </div>
                        <CardTitle className="text-lg font-black group-hover:text-primary transition-colors">{p.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-4">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Momentum</span>
                          <span className="font-black text-primary">{p.momentumScore}%</span>
                        </div>
                        <Progress value={p.momentumScore} className="h-1.5" />
                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
                          <Clock className="w-3 h-3" /> Started {new Date(p.activatedAt).toLocaleDateString()}
                        </div>
                      </CardContent>
                      <CardFooter className="bg-muted/10 border-t p-3 justify-end">
                        <Button variant="ghost" size="sm" className="h-7 text-[10px] font-black uppercase">Open Dashboard <ChevronRight className="ml-1 w-3 h-3" /></Button>
                      </CardFooter>
                    </Card>
                  ))}
                  {filteredProjects.length === 0 && (
                    <div className="col-span-full py-20 text-center border-2 border-dashed rounded-xl bg-muted/20">
                      <Target className="mx-auto h-12 w-12 text-muted-foreground opacity-20 mb-4" />
                      <p className="text-xl font-bold text-muted-foreground">Your Architecture is waiting.</p>
                      <Button onClick={() => setIsTemplatesOpen(true)} variant="secondary" className="mt-6">
                          Explore Template Library
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {viewMode === 'list' && (
                <div className="space-y-6">
                  {filteredProjects.map(project => (
                    <BlueprintProject
                        key={project.id}
                        project={project}
                        onUpdateProject={updateProject}
                        onDeleteProject={deleteProject}
                        onAddMilestone={() => {}} 
                        onUpdateMilestone={() => {}}
                        onDeleteMilestone={() => {}}
                        onToggleTask={() => {}}
                        onAddTask={() => {}}
                        onUpdateTask={() => {}}
                        onDeleteTask={() => {}}
                        onUpdateMilestoneStatus={() => {}}
                    />
                  ))}
                </div>
              )}

              {viewMode === 'timeline' && <GanttTimeline />}
            </TabsContent>

            <TabsContent value="guides" className="mt-0 space-y-12">
                <Tabs defaultValue="library">
                  <div className="flex justify-center mb-8">
                      <TabsList className="grid w-full grid-cols-3 max-w-lg h-auto p-1 bg-muted/50">
                        <TabsTrigger value="library" className="gap-2"><Book className="w-4 h-4" /> Strategy Library</TabsTrigger>
                        <TabsTrigger value="playbook" className="gap-2 w-full"><Star className="w-4 h-4" /> My Playbook</TabsTrigger>
                        <TabsTrigger value="advisor" className="gap-2 w-full"><BrainCircuit className="w-4 h-4" /> Advisor</TabsTrigger>
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
  );
}
