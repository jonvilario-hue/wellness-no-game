
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { 
  Calendar as CalendarIcon, 
  ChevronDown, 
  ChevronUp, 
  CalendarDays, 
  ListChecks, 
  Plus, 
  LayoutGrid, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  RotateCcw, 
  Edit, 
  Play, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  TrendingUp, 
  Brain, 
  Utensils, 
  Wallet, 
  HeartPulse, 
  Waves,
  MessageSquare,
  BookMarked
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { presetPlans } from '@/data/preset-calendar-plans';
import { useCalendarPlansStore } from '@/hooks/use-calendar-plans-store';
import { Calendar } from '@/components/ui/calendar';
import { format, parseISO, startOfWeek, addDays, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { PlanCategory, CalendarPlan, ActivityStatus } from '@/types/calendar-plans';
import { DayDetailsDialog } from '@/components/calendar/day-details-dialog';
import { calendarContent } from '@/data/calendar-content';
import { useWellnessData } from '@/hooks/use-wellness-data';
import { useHydratedJournalStore } from '@/hooks/use-journal';
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

  const { movementLogs, stillnessLogs, mealLogs, transactions, communicationLogs } = useWellnessData();
  const { entries } = useHydratedJournalStore();
  
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [plansOpen, setPlansOpen] = useState(true);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<CalendarPlan | null>(null);
  const [selectedDayContent, setSelectedDayContent] = useState<any>(null);

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

  const getTasksForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();
    const instances = activityInstances[dateStr] || [];
    
    const planTasks = activePlans.flatMap(plan => 
      plan.activities
        .filter(act => {
          if (act.recurrence === 'daily') return true;
          if (act.recurrence === 'weekly') {
            const planStart = parseISO(plan.startDate);
            return planStart.getDay() === dayOfWeek;
          }
          if (act.recurrence === 'monthly') {
            const planStart = parseISO(plan.startDate);
            return planStart.getDate() === dayOfMonth;
          }
          return true;
        })
        .map(act => {
          const existing = instances.find(i => i.activityId === act.id);
          return {
            ...act,
            planName: plan.name,
            planColor: plan.color,
            status: existing?.status || 'not-started',
            instanceId: existing?.id || `v-${plan.id}-${act.id}-${dateStr}`
          };
        })
    );

    const studyTasks = instances.filter(inst => inst.planId === 'study-sessions').map(inst => ({
      id: inst.activityId,
      name: inst.activityName,
      category: 'Study/Learning' as PlanCategory,
      planName: 'Study Hub',
      planColor: 'hsl(var(--primary))',
      status: inst.status,
      instanceId: inst.id,
      scheduledTime: inst.scheduledTime,
      studyToolId: inst.studyToolId,
      studyResourceId: inst.studyResourceId
    }));

    // Amalgamate Wellness & Reflection Logs
    const wellnessTasks = [
      ...movementLogs.filter(l => isSameDay(new Date(l.timestamp), date)).map(l => ({
        id: l.id,
        name: l.exerciseName,
        category: 'Movement' as PlanCategory,
        planName: 'Logged Movement',
        planColor: 'hsl(var(--primary))',
        status: 'completed' as ActivityStatus,
        instanceId: l.id,
        icon: HeartPulse
      })),
      ...stillnessLogs.filter(l => isSameDay(new Date(l.timestamp), date)).map(l => ({
        id: l.id,
        name: l.techniqueName,
        category: 'Stillness' as PlanCategory,
        planName: 'Logged Stillness',
        planColor: '#60a5fa',
        status: 'completed' as ActivityStatus,
        instanceId: l.id,
        icon: Waves
      })),
      ...communicationLogs.filter(l => isSameDay(new Date(l.timestamp), date)).map(l => ({
        id: l.id,
        name: l.practiceName,
        category: 'Communication' as PlanCategory,
        planName: 'Communication Lab',
        planColor: '#a855f7',
        status: 'completed' as ActivityStatus,
        instanceId: l.id,
        icon: MessageSquare
      })),
      ...mealLogs.filter(l => isSameDay(new Date(l.date + 'T12:00:00'), date)).map(l => ({
        id: l.id,
        name: `${l.mealType}: ${l.foodName || 'Meal'}`,
        category: 'Nutrition' as PlanCategory,
        planName: 'Nutrition Lab',
        planColor: '#fb923c',
        status: 'completed' as ActivityStatus,
        instanceId: l.id,
        icon: Utensils
      })),
      ...transactions.filter(l => isSameDay(new Date(l.date + 'T12:00:00'), date)).map(l => ({
        id: l.id,
        name: `${l.merchant}: $${l.amount}`,
        category: 'Finance' as PlanCategory,
        planName: 'Financial History',
        planColor: '#22c55e',
        status: 'completed' as ActivityStatus,
        instanceId: l.id,
        icon: Wallet
      })),
      ...entries.filter(e => isSameDay(new Date(e.displayDate || e.date + 'T12:00:00'), date)).map(e => ({
        id: e.id,
        name: e.label || 'Reflection',
        category: 'Journaling' as PlanCategory,
        planName: 'Notebook',
        planColor: '#6b7280',
        status: 'completed' as ActivityStatus,
        instanceId: e.id,
        icon: BookMarked
      }))
    ];

    return [...planTasks, ...studyTasks, ...wellnessTasks];
  };

  const todaysTasks = useMemo(() => getTasksForDate(selectedDate), [selectedDate, activePlans, activityInstances, movementLogs, stillnessLogs, mealLogs, transactions, communicationLogs, entries]);

  const weekDays = useMemo(() => {
    const start = startOfWeek(selectedDate);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [selectedDate]);

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
        description: newPlanDesc || "Personalized routine.",
        isPreset: false,
        isActive: true,
        durationType: 'ongoing',
        startDate: new Date().toISOString(),
        categories: selectedCategories.length > 0 ? selectedCategories : ['Custom'],
        color: `hsl(${Math.floor(Math.random() * 360)} 70% 50%)`,
        activities: [
          {
            id: `act-${Date.now()}`,
            name: `${newPlanName} Step`,
            category: 'Custom',
            recurrence: 'daily',
            duration: 10,
            reminderEnabled: true
          }
        ] 
      });
    }

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
      prompt: "Daily Focus",
      description: "Amalgamated wellness and study view.",
      toolType: 'text',
      toolContent: "View your integrated schedule for today."
    };
    setSelectedDayContent(content);
  };

  const toggleCategory = (cat: PlanCategory) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const getDayFocus = (date: Date) => {
    return calendarContent.find(c => c.day === date.getDate());
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
                  Amalgamated Routines
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
                <Card key={plan.id} className={cn("transition-all relative group", activePlanIds.includes(plan.id) && "border-primary bg-primary/5 shadow-sm")}>
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
                      <Badge variant="outline" className="text-[9px] uppercase tracking-tighter">{plan.categories[0]}</Badge>
                      <span className="text-[9px] text-muted-foreground uppercase font-bold">{plan.activities.length} Steps</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!plan.isPreset && (
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleOpenBuilder(plan)}>
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
              <Card className="border-dashed cursor-pointer hover:bg-primary/[0.02] flex flex-col items-center justify-center p-6 text-center h-full min-h-[120px] transition-colors" onClick={() => handleOpenBuilder()}>
                <Plus className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-sm font-bold">New Custom Plan</p>
                <p className="text-xs text-muted-foreground">Syncs with all category views</p>
              </Card>
            </CollapsibleContent>
          </Collapsible>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-3">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-primary/5">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    {view === 'month' ? format(selectedDate, 'MMMM yyyy') : view === 'week' ? `Week of ${format(weekDays[0], 'MMM d')}` : format(selectedDate, 'PPPP')}
                  </CardTitle>
                  <CardDescription>Master schedule: Plans + Direct Wellness & Reflection Logs.</CardDescription>
                </div>
                <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
                  <Button variant={view === 'month' ? 'secondary' : 'ghost'} size="sm" className="h-8 text-xs font-bold" onClick={() => setView('month')}>Month</Button>
                  <Button variant={view === 'week' ? 'secondary' : 'ghost'} size="sm" className="h-8 text-xs font-bold" onClick={() => setView('week')}>Week</Button>
                  <Button variant={view === 'day' ? 'secondary' : 'ghost'} size="sm" className="h-8 text-xs font-bold" onClick={() => setView('day')}>Day</Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {view === 'month' && (
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDayClick}
                    className="w-full"
                    components={{
                      DayContent: ({ date }) => {
                        const tasks = getTasksForDate(date);
                        const hasActive = tasks.length > 0;
                        
                        return (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <span className="relative z-10">{date.getDate()}</span>
                            {hasActive && (
                              <div className="absolute bottom-1 flex gap-0.5">
                                {tasks.slice(0, 4).map((t, idx) => (
                                  <div key={idx} className="w-1 h-1 rounded-full" style={{ backgroundColor: (t as any).planColor || 'hsl(var(--primary))' }} />
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }
                    }}
                  />
                )}

                {view === 'week' && (
                  <div className="p-4 grid grid-cols-1 md:grid-cols-7 gap-4">
                    {weekDays.map(date => {
                      const tasks = getTasksForDate(date);
                      const isToday = isSameDay(date, new Date());
                      const isSelected = isSameDay(date, selectedDate);

                      return (
                        <div 
                          key={date.toISOString()} 
                          className={cn(
                            "flex flex-col gap-2 p-3 rounded-xl border transition-all cursor-pointer min-h-[200px]",
                            isToday ? "border-primary bg-primary/[0.02]" : "border-transparent hover:bg-muted/30",
                            isSelected && "ring-2 ring-primary ring-offset-2"
                          )}
                          onClick={() => setSelectedDate(date)}
                        >
                          <div className="flex flex-col items-center border-b border-primary/5 pb-2">
                            <span className="text-[10px] uppercase font-black text-muted-foreground">{format(date, 'EEE')}</span>
                            <span className={cn("text-lg font-black", isToday && "text-primary")}>{format(date, 'd')}</span>
                          </div>
                          <div className="space-y-1 overflow-y-auto max-h-[150px] scrollbar-none">
                            {tasks.map(task => (
                              <div 
                                key={task.instanceId} 
                                className={cn(
                                  "p-1 rounded flex items-center gap-1.5",
                                  task.status === 'completed' ? "opacity-40" : ""
                                )}
                              >
                                <div className="w-1 h-3 rounded-full shrink-0" style={{ backgroundColor: (task as any).planColor || 'hsl(var(--primary))' }} />
                                <span className="text-[9px] font-medium truncate">{task.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {view === 'day' && (
                  <div className="p-6 space-y-8 animate-in fade-in">
                    <div className="space-y-4">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <ListChecks className="w-3 h-3 text-primary" /> Combined Schedule
                      </h3>
                      {todaysTasks.length === 0 ? (
                        <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-2xl bg-muted/10">
                          <p className="text-sm font-bold italic">Schedule is empty for this date.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-3">
                          {todaysTasks.map(task => (
                            <div key={task.instanceId} className={cn(
                              "flex items-center gap-4 p-4 rounded-2xl border bg-card transition-all group",
                              task.status === 'completed' && "opacity-60 bg-muted/20"
                            )}>
                              <div className="w-1.5 h-10 rounded-full" style={{ backgroundColor: (task as any).planColor || 'hsl(var(--primary))' }} />
                              <div className="flex-grow">
                                <div className="flex items-center gap-2">
                                  <p className="font-bold text-sm">{task.name}</p>
                                  {task.status === 'completed' && (
                                    <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-none text-[8px] h-4">LOGGED</Badge>
                                  )}
                                </div>
                                <div className="flex gap-2 mt-1">
                                  <Badge variant="secondary" className="text-[9px] h-4 py-0 font-bold uppercase">{task.category}</Badge>
                                  <span className="text-[10px] text-muted-foreground font-medium">{task.scheduledTime || (task as any).timeOfDay || 'Anytime'}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {task.status !== 'completed' && (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="rounded-full gap-2 h-10 px-6 font-bold"
                                    onClick={() => updateActivityStatus(format(selectedDate, 'yyyy-MM-dd'), task.instanceId, 'completed')}
                                  >
                                    <Circle className="w-4 h-4 text-muted-foreground" />
                                    Complete
                                  </Button>
                                )}
                                {task.status === 'completed' && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-primary/5 border-primary/10 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Amalgamated Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-2">
                    <span className="text-4xl font-black">92%</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    Cross-module analysis: Financial discipline and Movement consistency are perfectly aligned this week.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={isBuilderOpen} onOpenChange={setIsBuilderOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingPlan ? 'Edit Routine' : 'Build Custom Routine'}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Name</Label>
              <Input placeholder="e.g. Work-Life Sync" value={newPlanName} onChange={e => setNewPlanName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Categories</Label>
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
            <Button className="w-full font-bold h-12" disabled={!newPlanName.trim()} onClick={handleSavePlan}>
              {editingPlan ? 'Save Changes' : 'Initialize Routine'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedDayContent && (
        <DayDetailsDialog 
          dayContent={selectedDayContent}
          isOpen={!!selectedDayContent}
          onClose={() => setSelectedDayContent(null)}
          isCompleted={false}
          onToggleCompletion={() => {}}
        />
      )}
    </>
  );
}
