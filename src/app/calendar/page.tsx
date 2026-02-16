
'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { Calendar as CalendarIcon, ChevronDown, ChevronUp, CalendarDays, ListChecks, Plus, LayoutGrid, CheckCircle2, Circle, Trash2, RotateCcw, Edit, Play } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { presetPlans } from '@/data/preset-calendar-plans';
import { useCalendarPlansStore } from '@/hooks/use-calendar-plans-store';
import { Calendar } from '@/components/ui/calendar';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { PlanCategory, CalendarPlan } from '@/types/calendar-plans';
import { DayDetailsDialog } from '@/components/calendar/day-details-dialog';
import { calendarContent } from '@/data/calendar-content';
import Link from 'next/link';

export default function CalendarPage() {
  const { 
    activePlanIds, 
    customPlans, 
    deletedPresetIds, 
    togglePlan, 
    deletePlan, 
    resetDefaults, 
    activityInstances, 
    updateActivityStatus,
    addCustomPlan,
    updateCustomPlan,
    _hasHydrated 
  } = useCalendarPlansStore();
  
  const [view, setView] = useState<'month' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [plansOpen, setPlansOpen] = useState(true);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<CalendarPlan | null>(null);
  const [selectedDayContent, setSelectedDayContent] = useState<any>(null);

  // Form State for Custom Plan
  const [newPlanName, setNewPlanName] = useState('');
  const [newPlanDesc, setNewPlanDesc] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<PlanCategory[]>([]);

  const availablePlans = useMemo(() => {
    const presets = presetPlans.filter(p => !deletedPresetIds.includes(p.id));
    return [...presets, ...customPlans];
  }, [deletedPresetIds, customPlans]);

  const activePlans = useMemo(() => {
    return availablePlans.filter(p => activePlanIds.includes(p.id));
  }, [availablePlans, activePlanIds]);

  const todaysTasks = useMemo(() => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const instances = activityInstances[dateStr] || [];
    
    // Merge plan-based tasks and ad-hoc/study sessions
    const activeTasks = [
      ...activePlans.flatMap(plan => 
        plan.activities.map(act => {
          const existing = instances.find(i => i.activityId === act.id);
          return {
            ...act,
            planName: plan.name,
            planColor: plan.color,
            status: existing?.status || 'not-started',
            instanceId: existing?.id || `v-${plan.id}-${act.id}`
          };
        })
      ),
      ...instances.filter(inst => inst.planId === 'adhoc' || inst.planId === 'study-sessions').map(inst => ({
        id: inst.activityId,
        name: inst.activityName,
        category: (inst.planId === 'study-sessions' ? 'Study/Learning' : 'Custom') as PlanCategory,
        planName: inst.planId === 'study-sessions' ? 'Study Hub' : 'One-off',
        planColor: inst.planId === 'study-sessions' ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
        status: inst.status,
        instanceId: inst.id,
        scheduledTime: inst.scheduledTime,
        duration: 30,
        studyToolId: inst.studyToolId,
        studyResourceId: inst.studyResourceId
      }))
    ];
    return activeTasks;
  }, [selectedDate, activePlans, activityInstances]);

  const handleOpenBuilder = (plan?: CalendarPlan) => {
    if (plan) {
      setEditingPlan(plan);
      setNewPlanName(plan.name);
      setNewPlanDesc(plan.description);
      setSelectedCategories(plan.categories);
    } else {
      setEditingPlan(null);
      setNewPlanName('');
      setNewPlanDesc('');
      setSelectedCategories([]);
    }
    setIsBuilderOpen(true);
  };

  const handleSavePlan = () => {
    if (!newPlanName.trim()) return;

    if (editingPlan) {
      updateCustomPlan(editingPlan.id, {
        name: newPlanName,
        description: newPlanDesc,
        categories: selectedCategories.length > 0 ? selectedCategories : ['Custom'],
      });
    } else {
      addCustomPlan({
        id: `custom-${Date.now()}`,
        name: newPlanName,
        description: newPlanDesc || "Personalized wellness protocol.",
        isPreset: false,
        isActive: true,
        durationType: 'ongoing',
        startDate: new Date().toISOString(),
        categories: selectedCategories.length > 0 ? selectedCategories : ['Custom'],
        color: `hsl(${Math.floor(Math.random() * 360)} 70% 50%)`,
        activities: [] 
      });
    }

    // Reset Form
    setNewPlanName('');
    setNewPlanDesc('');
    setSelectedCategories([]);
    setEditingPlan(null);
    setIsBuilderOpen(false);
  };

  const handleDayClick = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    const day = date.getDate();
    const content = calendarContent.find(c => c.day === day) || {
      day,
      icon: CalendarIcon,
      prompt: "Custom Focus",
      description: "Log your activities for this day.",
      toolType: 'text',
      toolContent: ""
    };
    setSelectedDayContent(content);
  };

  const toggleCategory = (cat: PlanCategory) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  if (!_hasHydrated) return null;

  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          
          <Collapsible open={plansOpen} onOpenChange={setPlansOpen} className="w-full">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-primary" />
                  Available Plans ({availablePlans.length})
                </h2>
                {deletedPresetIds.length > 0 && (
                  <Button variant="outline" size="sm" onClick={resetDefaults} className="h-7 text-[10px] uppercase font-bold">
                    <RotateCcw className="w-3 h-3 mr-1" /> Reset Defaults
                  </Button>
                )}
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {plansOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
              {availablePlans.map(plan => (
                <Card key={plan.id} className={cn("transition-all relative group", activePlanIds.includes(plan.id) && "border-primary bg-primary/5")}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-sm font-bold pr-8">{plan.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={activePlanIds.includes(plan.id)} 
                          onCheckedChange={() => togglePlan(plan.id)}
                        />
                      </div>
                    </div>
                    <CardDescription className="text-xs line-clamp-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-[10px] uppercase">{plan.categories[0]}</Badge>
                      <span className="text-[10px] text-muted-foreground">{plan.activities.length} daily steps</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!plan.isPreset && (
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary" onClick={() => handleOpenBuilder(plan)}>
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => deletePlan(plan.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
              <Card className="border-dashed cursor-pointer hover:bg-muted/50 flex flex-col items-center justify-center p-6 text-center h-full min-h-[120px]" onClick={() => handleOpenBuilder()}>
                <Plus className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-sm font-bold">Create Custom Plan</p>
                <p className="text-xs text-muted-foreground">Design your own routine</p>
              </Card>
            </CollapsibleContent>
          </Collapsible>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-xl">Monthly Schedule</CardTitle>
                  <CardDescription>Select a day to view your routine</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant={view === 'month' ? 'default' : 'outline'} size="sm" onClick={() => setView('month')}>Month</Button>
                  <Button variant={view === 'day' ? 'default' : 'outline'} size="sm" onClick={() => setView('day')}>Day</Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 sm:p-6">
                {view === 'month' ? (
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDayClick}
                    className="w-full"
                    components={{
                      DayContent: ({ date }) => {
                        const dateStr = format(date, 'yyyy-MM-dd');
                        const instances = activityInstances[dateStr] || [];
                        const hasActive = activePlanIds.length > 0 || instances.length > 0;
                        
                        return (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <span>{date.getDate()}</span>
                            {hasActive && (
                              <div className="absolute bottom-1 flex gap-0.5">
                                {activePlans.slice(0, 3).map(p => (
                                  <div key={p.id} className="w-1 h-1 rounded-full" style={{ backgroundColor: p.color }} />
                                ))}
                                {instances.some(i => i.planId === 'study-sessions') && (
                                  <div className="w-1 h-1 rounded-full bg-primary" />
                                )}
                              </div>
                            )}
                          </div>
                        );
                      }
                    }}
                  />
                ) : (
                  <div className="p-4 space-y-4">
                    <h3 className="font-bold text-lg">{format(selectedDate, 'PPPP')}</h3>
                    <div className="space-y-3">
                      {todaysTasks.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                          No activities scheduled for this day.
                        </div>
                      ) : (
                        todaysTasks.map(task => (
                          <div key={task.instanceId} className="flex items-center gap-4 p-4 rounded-xl border bg-card shadow-sm group">
                            <div className="w-1.5 h-10 rounded-full" style={{ backgroundColor: task.planColor }} />
                            <div className="flex-grow">
                              <div className="flex items-center gap-2">
                                <p className="font-bold text-sm">{task.name}</p>
                                {task.studyToolId && (
                                  <Badge variant="outline" className="text-[8px] h-3.5 border-primary/30 text-primary">STUDY</Badge>
                                )}
                              </div>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="secondary" className="text-[9px] h-4">{task.category}</Badge>
                                <span className="text-[10px] text-muted-foreground">{task.scheduledTime || task.timeOfDay || 'Anytime'} • {task.duration}m</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {task.studyToolId && task.status !== 'completed' && (
                                <Button asChild size="icon" variant="ghost" className="h-8 w-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Link href={`/study/session?deckId=${task.studyResourceId}`}>
                                    <Play className="h-4 w-4 fill-current" />
                                  </Link>
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant={task.status === 'completed' ? 'default' : 'outline'}
                                className="rounded-full gap-2 h-8"
                                onClick={() => updateActivityStatus(format(selectedDate, 'yyyy-MM-dd'), task.instanceId, task.status === 'completed' ? 'not-started' : 'completed')}
                              >
                                {task.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                                {task.status === 'completed' ? 'Done' : 'Log'}
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-primary/5 border-primary/10">
                <CardHeader>
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <ListChecks className="w-4 h-4 text-primary" />
                    Plan Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-muted-foreground">Overall Adherence</span>
                      <span className="font-bold">85%</span>
                    </div>
                    <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[85%]" />
                    </div>
                  </div>
                  <div className="p-3 bg-background rounded-lg border text-[11px] leading-relaxed">
                    <p><b>Analysis:</b> You're highly consistent with <b>Movement</b> (92%) but missing <b>Finance</b> check-ins (40%) this week.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-bold">Upcoming</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activePlans.length === 0 && todaysTasks.length === 0 ? (
                      <p className="text-xs text-muted-foreground italic">Activate a plan to see upcoming tasks.</p>
                    ) : (
                      todaysTasks.filter(t => t.status !== 'completed').slice(0, 3).map(a => (
                        <div key={a.instanceId} className="flex items-center gap-3 text-xs">
                          <Circle className="w-2 h-2 text-primary" />
                          <span className="font-medium truncate max-w-[120px]">{a.name}</span>
                          <span className="text-muted-foreground ml-auto">{a.scheduledTime || a.timeOfDay || 'Next'}</span>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={isBuilderOpen} onOpenChange={setIsBuilderOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingPlan ? 'Edit Custom Plan' : 'Custom Plan Builder'}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="plan-name">Plan Name</Label>
              <Input 
                id="plan-name"
                placeholder="e.g. Morning Focus" 
                value={newPlanName}
                onChange={e => setNewPlanName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan-desc">Description (Optional)</Label>
              <Input 
                id="plan-desc"
                placeholder="Purpose of this protocol..." 
                value={newPlanDesc}
                onChange={e => setNewPlanDesc(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Categories</Label>
              <div className="flex flex-wrap gap-2">
                {(['Movement', 'Stillness', 'Nutrition', 'Finance', 'Study/Learning'] as PlanCategory[]).map(c => (
                  <Badge 
                    key={c} 
                    variant={selectedCategories.includes(c) ? 'default' : 'outline'} 
                    className="cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => toggleCategory(c)}
                  >
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              className="w-full" 
              disabled={!newPlanName.trim()}
              onClick={handleSavePlan}
            >
              {editingPlan ? 'Save Changes' : 'Initialize Plan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedDayContent && (
        <DayDetailsDialog 
          dayContent={selectedDayContent}
          isOpen={!!selectedDayContent}
          onClose={() => setSelectedDayContent(null)}
          isCompleted={false} // Simplification for MVP
          onToggleCompletion={() => {}}
          studyInfo={todaysTasks.find(t => t.studyToolId)? { 
            toolId: todaysTasks.find(t => t.studyToolId)!.studyToolId!,
            resourceId: todaysTasks.find(t => t.studyToolId)!.studyResourceId!,
            status: todaysTasks.find(t => t.studyToolId)!.status
          } : undefined}
        />
      )}
    </>
  );
}
