'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { 
  Calendar as CalendarIcon, 
  ChevronDown, 
  ChevronUp, 
  ListChecks, 
  Plus, 
  LayoutGrid, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  RotateCcw, 
  Edit, 
  Clock, 
  TrendingUp, 
  Brain, 
  Utensils, 
  Wallet, 
  HeartPulse, 
  Waves,
  MessageSquare,
  BookMarked,
  X,
  Target,
  Trophy,
  Zap,
  Activity,
  Sparkles,
  LayoutList,
  ShieldCheck,
  ClipboardCheck,
  PlusCircle,
  AlignJustify,
  ChevronUpSquare,
  ChevronDownSquare,
  MoreHorizontal,
  RotateCw
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { presetPlans } from '@/data/preset-calendar-plans';
import { useCalendarPlansStore } from '@/hooks/use-calendar-plans-store';
import { Calendar } from '@/components/ui/calendar';
import { format, parseISO, startOfWeek, addDays, isSameDay, subDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { PlanCategory, CalendarPlan, ActivityStatus, PlanActivity } from '@/types/calendar-plans';
import { useWellnessData, useMovementLogs, useStillnessLogs, useCommunicationLogs } from '@/hooks/use-wellness-data';
import { useHydratedJournalStore } from '@/hooks/use-journal';
import { useSpeedReadingStore } from '@/hooks/use-speedreading-store';
import { useStudyDashboardStore } from '@/hooks/use-study-dashboard-store';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AssistantTooltip } from '@/components/assistant-tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

function AmalgamatedAnalytics() {
  const { mealLogs, transactions } = useWellnessData();
  const movementLogs = useMovementLogs();
  const stillnessLogs = useStillnessLogs();
  const communicationLogs = useCommunicationLogs();
  const { logs: readingLogs } = useSpeedReadingStore();
  const { entries: journalEntries } = useHydratedJournalStore();
  const { activity: studyActivity } = useStudyDashboardStore();

  const chartData = useMemo(() => {
    const data = [];
    const now = new Date();
    for (let i = 13; i >= 0; i--) {
      const date = subDays(now, i);
      const dStr = format(date, 'yyyy-MM-dd');
      
      const count = 
        (movementLogs?.filter(l => l.timestamp.startsWith(dStr)).length || 0) +
        (stillnessLogs?.filter(l => l.timestamp.startsWith(dStr)).length || 0) +
        (communicationLogs?.filter(l => l.timestamp.startsWith(dStr)).length || 0) +
        (readingLogs?.filter(l => l.date === dStr).length || 0) +
        (mealLogs?.filter(l => l.date === dStr).length || 0) +
        (transactions?.filter(l => l.date === dStr).length || 0) +
        (journalEntries?.filter(l => l.date === dStr).length || 0) +
        (studyActivity[dStr] ? 1 : 0);

      data.push({
        name: format(date, 'MMM d'),
        total: count,
      });
    }
    return data;
  }, [movementLogs, stillnessLogs, communicationLogs, readingLogs, mealLogs, transactions, journalEntries, studyActivity]);

  const hallOfFame = useMemo(() => {
    const topReading = [...readingLogs].sort((a, b) => b.wpm - a.wpm)[0];
    const topStillness = [...stillnessLogs].sort((a, b) => (b.postCalm || 0) - (a.postCalm || 0))[0];
    const topComm = [...communicationLogs].sort((a, b) => (b.effectiveness || 0) - (a.effectiveness || 0))[0];
    const topFin = [...transactions].sort((a, b) => b.amount - a.amount)[0];
    const topStudy = Object.entries(studyActivity)
      .sort(([, a], [_, b]) => b.cardsReviewed - a.cardsReviewed)[0];

    return [
      { label: 'Peak Velocity', value: topReading ? `${topReading.wpm} WPM` : '0', icon: Zap, sub: 'Reading' },
      { label: 'Max Equilibrium', value: topStillness ? `${topStillness.postCalm}/10` : '0', icon: Waves, sub: 'Stillness' },
      { label: 'Highest Impact', value: topComm ? `${topComm.effectiveness}/5` : '0', icon: Target, sub: 'Interpersonal' },
      { label: 'Asset Utilization', value: topFin ? `$${topFin.amount.toLocaleString()}` : '$0', icon: Wallet, sub: 'Largest Log' },
      { label: 'Cognitive Load', value: topStudy ? `${topStudy[1].cardsReviewed}` : '0', icon: Brain, sub: 'Max Daily Cards' }
    ];
  }, [readingLogs, stillnessLogs, communicationLogs, transactions, studyActivity]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-1000 delay-300 pt-12">
      <Card className="lg:col-span-2 border-primary/10 overflow-hidden">
        <CardHeader className="bg-primary/5 pb-4">
          <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Cross-Module Output Velocity
          </CardTitle>
          <CardDescription>Aggregate growth actions (wellness, study, journaling, finance) over the last 14 days.</CardDescription>
        </CardHeader>
        <CardContent className="h-64 pt-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
              <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="total" 
                name="System Actions" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary))" 
                fillOpacity={0.1} 
                strokeWidth={3} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-primary/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary" /> Polymath Hall of Fame
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          {hallOfFame.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <item.icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">{item.label}</p>
                <p className="font-bold text-sm truncate">{item.value}</p>
                <p className="text-[8px] font-bold uppercase opacity-40">{item.sub}</p>
              </div>
            </div>
          ))}
          
          <div className="pt-4 border-t border-primary/5">
            <div className="p-3 bg-primary/5 rounded-xl space-y-2">
              <h4 className="text-[10px] font-black uppercase text-primary flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" /> Data Integrity Sync
              </h4>
              <p className="text-[10px] leading-relaxed text-muted-foreground">
                Turning on "Tracking" in modules enables these high-fidelity Hall of Fame metrics. This data is persistent and rolls up across all labs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CalendarPage() {
  const { 
    customPlans, 
    deletedPresetIds, 
    planOrder,
    deletePlan, 
    resetDefaults, 
    activityInstances, 
    routineTallies,
    updateActivityStatus,
    deleteActivityInstance,
    addCustomPlan,
    updateCustomPlan,
    reorderPlan,
    incrementTally,
    decrementTally,
    resetTally,
    _hasHydrated 
  } = useCalendarPlansStore();

  const { 
    logExerciseById, 
    deleteMovementLog, 
    deleteStillnessLog, 
    deleteCommunicationLog, 
    deleteMealLog, 
    deleteTransaction,
    mealLogs, 
    transactions 
  } = useWellnessData();
  
  const movementLogs = useMovementLogs();
  const stillnessLogs = useStillnessLogs();
  const communicationLogs = useCommunicationLogs();
  const { entries } = useHydratedJournalStore();
  const { toast } = useToast();
  
  const [view, setView] = useState<'month' | 'week'>('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [plansOpen, setPlansOpen] = useState(true);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<CalendarPlan | null>(null);

  // Form states for builder
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanDesc, setNewPlanDesc] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<PlanCategory[]>([]);
  const [newActivities, setNewActivities] = useState<PlanActivity[]>([]);

  const dateStr = useMemo(() => format(selectedDate, 'yyyy-MM-dd'), [selectedDate]);

  const availablePlans = useMemo(() => {
    const presets = presetPlans.filter(p => !deletedPresetIds.includes(p.id));
    const all = [...presets, ...customPlans];
    
    if (planOrder.length === 0) return all;

    return [...all].sort((a, b) => {
      const idxA = planOrder.indexOf(a.id);
      const idxB = planOrder.indexOf(b.id);
      if (idxA === -1 && idxB === -1) return 0;
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });
  }, [deletedPresetIds, customPlans, planOrder]);

  const getTasksForDate = useCallback((date: Date) => {
    const dStr = format(date, 'yyyy-MM-dd');
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();
    const instances = activityInstances[dStr] || [];
    
    const planTasks = availablePlans.flatMap(plan => 
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
            name: plan.name, 
            planName: plan.name,
            planColor: plan.color,
            status: existing?.status || 'not-started',
            instanceId: existing?.id || `v-${plan.id}-${act.id}-${dStr}`,
            linkedTracker: act.linkedTracker,
            canDelete: !!existing,
            onDelete: existing ? () => deleteActivityInstance(dStr, existing.id) : undefined
          };
        })
    );

    const tallyTasks = Object.entries(routineTallies[dStr] || {}).map(([planId, count]) => {
      const plan = availablePlans.find(p => p.id === planId);
      if (!plan) return null;
      return {
        id: `tally-${planId}-${dStr}`,
        name: plan.name,
        category: (plan.categories && plan.categories[0]) || 'Custom',
        planName: plan.name,
        planColor: plan.color,
        status: 'completed' as ActivityStatus,
        instanceId: `tally-${planId}-${dStr}`,
        canDelete: true,
        onDelete: () => decrementTally(dStr, planId),
        onReset: () => resetTally(dStr, planId),
        tally: count
      };
    }).filter(Boolean) as any[];

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
      studyResourceId: inst.studyResourceId,
      canDelete: true,
      onDelete: () => deleteActivityInstance(dStr, inst.id)
    }));

    const wellnessTasks = [
      ...(movementLogs?.filter(l => isSameDay(new Date(l.timestamp), date)) || []).map(l => ({
        id: l.id,
        name: l.exerciseName,
        category: 'Movement' as PlanCategory,
        planName: 'Logged Movement',
        planColor: 'hsl(var(--primary))',
        status: 'completed' as ActivityStatus,
        instanceId: l.id,
        icon: HeartPulse,
        canDelete: true,
        onDelete: () => deleteMovementLog(l.id)
      })),
      ...(stillnessLogs?.filter(l => isSameDay(new Date(l.timestamp), date)) || []).map(l => ({
        id: l.id,
        name: l.techniqueName,
        category: 'Stillness' as PlanCategory,
        planName: 'Logged Stillness',
        planColor: '#60a5fa',
        status: 'completed' as ActivityStatus,
        instanceId: l.id,
        icon: Waves,
        canDelete: true,
        onDelete: () => deleteStillnessLog(l.id)
      })),
      ...(communicationLogs?.filter(l => isSameDay(new Date(l.timestamp), date)) || []).map(l => ({
        id: l.id,
        name: l.practiceName,
        category: 'Communication' as PlanCategory,
        planName: 'Communication Lab',
        planColor: '#a855f7',
        status: 'completed' as ActivityStatus,
        instanceId: l.id,
        icon: MessageSquare,
        canDelete: true,
        onDelete: () => deleteCommunicationLog(l.id)
      })),
      ...(mealLogs?.filter(l => isSameDay(new Date(l.date + 'T12:00:00'), date)) || []).map(l => ({
        id: l.id,
        name: `${l.mealType}: ${l.foodName || 'Meal'}`,
        category: 'Nutrition' as PlanCategory,
        planName: 'Nutrition Lab',
        planColor: '#fb923c',
        status: 'completed' as ActivityStatus,
        instanceId: l.id,
        icon: Utensils,
        canDelete: true,
        onDelete: () => deleteMealLog(l.id)
      })),
      ...(transactions?.filter(l => isSameDay(new Date(l.date + 'T12:00:00'), date)) || []).map(l => ({
        id: l.id,
        name: `${l.merchant}: $${l.amount}`,
        category: 'Finance' as PlanCategory,
        planName: 'Financial History',
        planColor: '#22c55e',
        status: 'completed' as ActivityStatus,
        instanceId: l.id,
        icon: Wallet,
        canDelete: true,
        onDelete: () => deleteTransaction(l.id)
      })),
      ...(entries?.filter(e => isSameDay(new Date(e.displayDate || e.date + 'T12:00:00'), date)) || []).map(e => ({
        id: e.id,
        name: e.label || 'Reflection',
        category: 'Journaling' as PlanCategory,
        planName: 'Notebook',
        planColor: '#6b7280',
        status: 'completed' as ActivityStatus,
        instanceId: e.id,
        icon: BookMarked,
        canDelete: false
      }))
    ];

    return [...planTasks, ...tallyTasks, ...studyTasks, ...wellnessTasks];
  }, [availablePlans, activityInstances, routineTallies, movementLogs, stillnessLogs, communicationLogs, mealLogs, transactions, entries, deleteActivityInstance, deleteMovementLog, deleteStillnessLog, deleteCommunicationLog, deleteMealLog, deleteTransaction, decrementTally, resetTally]);

  const todaysTasks = useMemo(() => getTasksForDate(selectedDate), [selectedDate, getTasksForDate]);

  const weekDays = useMemo(() => {
    const start = startOfWeek(selectedDate);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [selectedDate]);

  const handleOpenBuilder = (plan?: CalendarPlan) => {
    if (plan) {
      setEditingPlan(plan);
      setNewPlanName(plan.name);
      setNewPlanDesc(plan.description);
      setSelectedCategories([...plan.categories]);
      setNewActivities([...plan.activities]);
    } else {
      setEditingPlan(null);
      setNewPlanName('');
      setNewPlanDesc('');
      setSelectedCategories([]);
      setNewActivities([{
        id: `act-${Date.now()}`,
        name: 'Primary Activity',
        category: 'Custom',
        recurrence: 'daily',
        duration: 15,
        reminderEnabled: false
      }]);
    }
    setIsBuilderOpen(true);
  };

  const handleAddActivity = () => {
    const id = `act-${Date.now()}`;
    setNewActivities([...newActivities, {
      id,
      name: 'Additional Activity',
      category: 'Custom',
      recurrence: 'daily',
      duration: 15,
      reminderEnabled: false
    }]);
  };

  const removeActivity = (id: string) => {
    setNewActivities(newActivities.filter(a => a.id !== id));
  };

  const updateActivity = (id: string, updates: Partial<PlanActivity>) => {
    setNewActivities(newActivities.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const handleSavePlan = () => {
    if (!newPlanName.trim()) return;

    const planData: CalendarPlan = {
      id: editingPlan?.id || `custom-${Date.now()}`,
      name: newPlanName,
      description: newPlanDesc || "Personalized routine.",
      isPreset: false,
      isActive: true,
      durationType: 'ongoing',
      startDate: editingPlan?.startDate || new Date().toISOString(),
      categories: selectedCategories.length > 0 ? selectedCategories : ['Custom'],
      color: editingPlan?.color || `hsl(${Math.floor(Math.random() * 360)} 70% 50%)`,
      activities: newActivities
    };

    if (editingPlan) {
      updateCustomPlan(editingPlan.id, planData);
    } else {
      addCustomPlan(planData);
    }

    setIsBuilderOpen(false);
  };

  const isFormValid = newPlanName.trim().length > 0 && newActivities.length > 0;

  const handleDayClick = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
  };

  const toggleCategory = (cat: PlanCategory) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleLogRoutine = (planId: string) => {
    incrementTally(dateStr, planId);
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
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-primary" />
                  Active Routines
                </h2>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/10" onClick={() => handleOpenBuilder()}>
                  <PlusCircle className="w-5 h-5" />
                </Button>
                {deletedPresetIds.length > 0 && (
                  <Button variant="outline" size="sm" onClick={resetDefaults} className="h-7 text-[10px] uppercase font-bold">
                    <RotateCcw className="w-3 h-3 mr-1" /> Reset Defaults
                  </Button>
                )}
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {plansOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent>
              <div className="space-y-2 pb-10">
                <AnimatePresence mode="popLayout">
                  {availablePlans.map((plan, index) => {
                    const tally = (routineTallies[dateStr] || {})[plan.id] || 0;
                    const isDone = tally > 0;

                    return (
                      <motion.div
                        key={plan.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                      >
                        <div className="flex items-center justify-between p-4 rounded-xl border border-primary/5 bg-card hover:bg-muted/30 transition-all group">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="flex flex-col items-center -ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <AssistantTooltip text="Move Up">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-5 w-5 text-muted-foreground hover:text-primary" 
                                  onClick={() => reorderPlan(plan.id, 'up')} 
                                  disabled={index === 0}
                                >
                                  <ChevronUp className="w-3 h-3" />
                                </Button>
                              </AssistantTooltip>
                              <AssistantTooltip text="Move Down">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-5 w-5 text-muted-foreground hover:text-primary" 
                                  onClick={() => reorderPlan(plan.id, 'down')} 
                                  disabled={index === availablePlans.length - 1}
                                >
                                  <ChevronDown className="w-3 h-3" />
                                </Button>
                              </AssistantTooltip>
                            </div>

                            <div className={cn(
                              "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all shrink-0",
                              isDone ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/20 text-muted-foreground/40"
                            )}>
                              {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-4 h-4" />}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className={cn("text-sm font-bold truncate", isDone && "text-primary")}>{plan.name}</span>
                                {tally > 1 && <Badge variant="secondary" className="text-[10px] h-4 py-0 font-black">×{tally}</Badge>}
                              </div>
                              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest truncate">{plan.categories.join(' • ')}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {isDone && (
                              <AssistantTooltip text="Remove one tally instance">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-muted-foreground"
                                  onClick={() => decrementTally(dateStr, plan.id)}
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                </Button>
                              </AssistantTooltip>
                            )}

                            <Button 
                              size="sm" 
                              className="h-8 gap-2 font-black uppercase text-[10px] px-4" 
                              onClick={() => handleLogRoutine(plan.id)}
                            >
                              <Zap className="w-3 h-3 fill-current" />
                              Log
                            </Button>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Options</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleOpenBuilder(plan)}>
                                  <Edit className="w-4 h-4 mr-2" /> Edit Configuration
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive" onClick={() => deletePlan(plan.id)}>
                                  <Trash2 className="w-4 h-4 mr-2" /> Delete Routine
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                  
                  <motion.div key="add-plan-row" layout>
                    <button 
                      className="w-full p-4 border border-dashed border-primary/10 rounded-xl hover:bg-primary/[0.02] flex items-center justify-center gap-3 transition-colors text-muted-foreground hover:text-primary"
                      onClick={() => handleOpenBuilder()}
                    >
                      <PlusCircle className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-widest">Initialize New Routine</span>
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-4">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-primary/5">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    {view === 'month' ? format(selectedDate, 'MMMM yyyy') : `Week of ${format(weekDays[0], 'MMM d')}`}
                  </CardTitle>
                  <CardDescription>Master schedule: Plans + Direct Wellness & Reflection Logs.</CardDescription>
                </div>
                <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
                  <Button variant={view === 'month' ? 'default' : 'ghost'} size="sm" className="h-8 text-xs font-bold" onClick={() => setView('month')}>Month</Button>
                  <Button variant={view === 'week' ? 'default' : 'ghost'} size="sm" className="h-8 text-xs font-bold" onClick={() => setView('week')}>Week</Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {view === 'month' && (
                  <div className="space-y-6">
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
                  </div>
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
              </CardContent>
            </Card>

            <Card className="lg:col-span-4 animate-in fade-in slide-in-from-top-4 duration-700">
              <CardHeader className="pb-4 border-b border-primary/5">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <ListChecks className="w-5 h-5 text-primary" />
                      Agenda: {format(selectedDate, 'EEEE, MMMM do')}
                    </CardTitle>
                    <CardDescription>Combined schedule for your chosen date.</CardDescription>
                  </div>
                  <Badge variant="outline" className="h-6 font-black uppercase text-[10px]">
                    {todaysTasks.length} {todaysTasks.length === 1 ? 'Item' : 'Items'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {todaysTasks.length === 0 ? (
                  <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-2xl bg-muted/10">
                    <p className="text-sm font-bold italic">Schedule is empty for this date.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {todaysTasks.map(task => (
                      <div key={task.instanceId} className={cn(
                        "flex items-center gap-4 p-4 rounded-2xl border bg-card transition-all group",
                        task.status === 'completed' && "opacity-60 bg-muted/20"
                      )}>
                        <div className="w-1.5 h-10 rounded-full" style={{ backgroundColor: (task as any).planColor || 'hsl(var(--primary))' }} />
                        <div className="flex-grow">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-sm">{task.name}</p>
                            {task.tally > 1 && <Badge variant="secondary" className="text-[10px] h-4 py-0 font-black">×{task.tally}</Badge>}
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
                            <div className="flex gap-2">
                              <AssistantTooltip text="Quickly log baseline metrics.">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="rounded-full gap-2 h-10 px-6 font-bold"
                                  onClick={() => {
                                    if (task.linkedTracker) {
                                      logExerciseById(task.linkedTracker);
                                      updateActivityStatus(dateStr, task.instanceId, 'completed');
                                      toast({ title: "Quick Log Successful", description: `${task.name} metrics synced to history.` });
                                    }
                                  }}
                                >
                                  <ClipboardCheck className="w-4 h-4 text-primary" />
                                  Quick Log
                                </Button>
                              </AssistantTooltip>
                            </div>
                          )}
                          {task.status === 'completed' && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {task.tally !== undefined && (
                              <AssistantTooltip text="Reset this routine's log for today">
                                <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground" onClick={() => { (task as any).onReset?.(); toast({ title: "Tally Reset" }); }}>
                                  <RotateCw className="w-4 h-4" />
                                </Button>
                              </AssistantTooltip>
                            )}
                            {task.canDelete && (
                              <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground" onClick={() => { task.onDelete?.(); toast({ title: "Activity Removed" }); }}>
                                <Trash2 className="w-5 h-5" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <AmalgamatedAnalytics />
        </div>
      </main>

      <Dialog open={isBuilderOpen} onOpenChange={setIsBuilderOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{editingPlan ? 'Edit Routine' : 'Routine Architect'}</DialogTitle>
            <CardDescription>Design a recurring sequence of high-performance habits.</CardDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Routine Name <span className="text-red-500">*</span></Label>
                  <input 
                    placeholder="e.g. Work-Life Sync" 
                    value={newPlanName} 
                    onChange={e => setNewPlanName(e.target.value)}
                    className={cn(
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                      !newPlanName.trim() && "border-amber-500/50"
                    )}
                  />
                  {!newPlanName.trim() && <p className="text-[9px] text-amber-600 font-bold uppercase">Name is required to initialize</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Theme Categories</Label>
                  <div className="flex flex-wrap gap-1.5">
                    {(['Movement', 'Stillness', 'Nutrition', 'Finance', 'Study/Learning', 'Communication'] as PlanCategory[]).map(c => (
                      <Badge 
                        key={c} 
                        variant={selectedCategories.includes(c) ? 'default' : 'outline'} 
                        className="cursor-pointer text-[9px] uppercase transition-colors"
                        onClick={() => toggleCategory(c)}
                      >
                        {c}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Activity Sequence <span className="text-red-500">*</span></Label>
                  <Button variant="outline" size="sm" className="h-7 text-[10px] font-bold" onClick={handleAddActivity}>
                    <Plus className="w-3 h-3 mr-1" /> Add Step
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {newActivities.length === 0 ? (
                    <div className="py-10 text-center border-2 border-dashed border-amber-500/20 rounded-xl bg-amber-500/5">
                      <Zap className="w-8 h-8 text-amber-500 mx-auto mb-2 opacity-50" />
                      <p className="text-xs font-bold text-amber-700 uppercase">No activities added</p>
                      <p className="text-[10px] text-muted-foreground mt-1">Add at least one step to build this routine.</p>
                    </div>
                  ) : (
                    newActivities.map((act, i) => (
                      <div key={act.id} className="p-4 bg-muted/30 rounded-xl border border-primary/5 space-y-4 relative group">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" 
                          onClick={() => removeActivity(act.id)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label className="text-[10px] font-bold uppercase">Activity Name <span className="text-red-500">*</span></Label>
                            <Input 
                              value={act.name} 
                              onChange={e => updateActivity(act.id, { name: e.target.value })}
                              className="h-8 text-xs font-bold"
                              placeholder="e.g. Morning Coffee"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[10px] font-bold uppercase">Recurrence</Label>
                            <Select value={act.recurrence} onValueChange={v => updateActivity(act.id, { recurrence: v as any })}>
                              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="space-y-1.5">
                            <Label className="text-[10px] font-bold uppercase">Time (optional)</Label>
                            <Input 
                              type="time" 
                              value={act.timeOfDay || ''} 
                              onChange={e => updateActivity(act.id, { timeOfDay: e.target.value })}
                              className="h-8 text-xs"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[10px] font-bold uppercase">Duration (min)</Label>
                            <Input 
                              type="number" 
                              value={act.duration} 
                              onChange={e => updateActivity(act.id, { duration: parseInt(e.target.value) || 0 })}
                              className="h-8 text-xs"
                            />
                          </div>
                          <div className="flex items-center gap-2 pt-4">
                            <Switch 
                              checked={act.reminderEnabled} 
                              onCheckedChange={v => updateActivity(act.id, { reminderEnabled: v })}
                            />
                            <Label className="text-[10px] font-bold uppercase">Notify</Label>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="pt-4 border-t">
            <Button variant="ghost" onClick={() => setIsBuilderOpen(false)}>Cancel</Button>
            <Button className="w-full font-bold h-12" disabled={!isFormValid} onClick={handleSavePlan}>
              {editingPlan ? 'Update Steps' : 'Initialize Routine'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
