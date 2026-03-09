
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
  BookMarked,
  X,
  Target,
  AlertCircle,
  List,
  Trophy,
  Zap,
  Activity,
  Sparkles,
  BarChart3,
  ChevronUpSquare,
  ChevronDownSquare,
  AlignJustify,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { presetPlans } from '@/data/preset-calendar-plans';
import { useCalendarPlansStore } from '@/hooks/use-calendar-plans-store';
import { Calendar } from '@/components/ui/calendar';
import { format, parseISO, startOfWeek, addDays, isSameDay, subDays, isAfter } from 'date-fns';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { PlanCategory, CalendarPlan, ActivityStatus, PlanActivity } from '@/types/calendar-plans';
import { DayDetailsDialog } from '@/components/calendar/day-details-dialog';
import { calendarContent } from '@/data/calendar-content';
import { useWellnessData } from '@/hooks/use-wellness-data';
import { useHydratedJournalStore } from '@/hooks/use-journal';
import { useSpeedReadingStore } from '@/hooks/use-speedreading-store';
import { useStudyDashboardStore } from '@/hooks/use-study-dashboard-store';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AssistantTooltip } from '@/components/assistant-tooltip';
import { motion, AnimatePresence } from 'framer-motion';

function AmalgamatedAnalytics() {
  const { movementLogs, stillnessLogs, communicationLogs, mealLogs, transactions } = useWellnessData();
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
        movementLogs.filter(l => l.timestamp.startsWith(dStr)).length +
        stillnessLogs.filter(l => l.timestamp.startsWith(dStr)).length +
        communicationLogs.filter(l => l.timestamp.startsWith(dStr)).length +
        readingLogs.filter(l => l.date === dStr).length +
        mealLogs.filter(l => l.date === dStr).length +
        transactions.filter(l => l.date === dStr).length +
        journalEntries.filter(l => l.date === dStr).length +
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
    activePlanIds, 
    customPlans, 
    deletedPresetIds, 
    planOrder,
    togglePlan, 
    deletePlan, 
    resetDefaults, 
    activityInstances, 
    updateActivityStatus,
    addCustomPlan,
    updateCustomPlan,
    reorderPlan,
    _hasHydrated 
  } = useCalendarPlansStore();

  const { trackingEnabled, toggleTracking, movementLogs, stillnessLogs, mealLogs, transactions, communicationLogs } = useWellnessData();
  const { entries } = useHydratedJournalStore();
  
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [routinesView, setRoutinesView] = useState<'grid' | 'list'>('grid');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [plansOpen, setPlansOpen] = useState(true);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<CalendarPlan | null>(null);
  const [selectedDayContent, setSelectedDayContent] = useState<any>(null);
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);

  // Form states for builder
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanDesc, setNewPlanDesc] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<PlanCategory[]>([]);
  const [newActivities, setNewActivities] = useState<PlanActivity[]>([]);

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
                  Routines
                </h2>
                <div className="bg-muted p-1 rounded-lg flex items-center gap-1">
                  <Button variant={routinesView === 'grid' ? 'secondary' : 'ghost'} size="sm" className="h-7 px-3 text-[10px] font-bold uppercase" onClick={() => setRoutinesView('grid')}>
                    <LayoutGrid className="w-3 h-3 mr-1.5" /> Squared
                  </Button>
                  <Button variant={routinesView === 'list' ? 'secondary' : 'ghost'} size="sm" className="h-7 px-3 text-[10px] font-bold uppercase" onClick={() => setRoutinesView('list')}>
                    <AlignJustify className="w-3 h-3 mr-1.5" /> List
                  </Button>
                </div>
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
              <motion.div 
                layout
                className={cn(
                  "pb-4 gap-4",
                  routinesView === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col"
                )}
              >
                <AnimatePresence mode="popLayout">
                  {availablePlans.map((plan, index) => (
                    <motion.div
                      key={plan.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.4 }}
                    >
                      <Card className={cn(
                        "transition-shadow relative group h-full", 
                        activePlanIds.includes(plan.id) && "border-primary bg-primary/5 shadow-sm",
                        routinesView === 'list' && "flex items-center justify-between py-2 px-4"
                      )}>
                        {routinesView === 'grid' ? (
                          <>
                            <CardHeader className="p-4 pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-sm font-bold pr-8">{plan.name}</CardTitle>
                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => reorderPlan(plan.id, 'up')} disabled={index === 0}>
                                    <ChevronUpSquare className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => reorderPlan(plan.id, 'down')} disabled={index === availablePlans.length - 1}>
                                    <ChevronDownSquare className="w-4 h-4" />
                                  </Button>
                                  <div className="w-px h-4 bg-border mx-1" />
                                  <Switch 
                                    checked={activePlanIds.includes(plan.id)} 
                                    onCheckedChange={() => togglePlan(plan.id)}
                                  />
                                </div>
                              </div>
                              <CardDescription className="text-xs line-clamp-2">{plan.description}</CardDescription>
                            </CardHeader>
                            
                            {expandedPlanId === plan.id && (
                              <CardContent className="p-4 pt-0 space-y-3 animate-in fade-in slide-in-from-top-1">
                                <Separator className="opacity-20" />
                                <div className="space-y-2">
                                  {plan.activities.map((act) => (
                                    <div key={act.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 border border-primary/5">
                                      <div className="flex items-center gap-2">
                                        <div className="w-1 h-3 rounded-full bg-primary/40" />
                                        <div>
                                          <p className="text-[10px] font-bold leading-none">{act.name}</p>
                                          <p className="text-[8px] text-muted-foreground uppercase mt-1">{act.timeOfDay || 'Anytime'} • {act.duration}m</p>
                                        </div>
                                      </div>
                                      <Badge variant="outline" className="text-[7px] h-3.5 uppercase font-black px-1.5">{act.recurrence}</Badge>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            )}

                            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                              <div className="flex gap-2 items-center">
                                <Badge variant="outline" className="text-[9px] uppercase tracking-tighter">{plan.categories[0]}</Badge>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-auto p-0 gap-1 text-[9px] text-muted-foreground uppercase font-black hover:text-primary transition-colors"
                                  onClick={() => setExpandedPlanId(expandedPlanId === plan.id ? null : plan.id)}
                                >
                                  <List className="w-3 h-3" />
                                  {plan.activities.length} Steps
                                  {expandedPlanId === plan.id ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
                                </Button>
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
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-4 flex-1">
                              <div className="flex items-center gap-1 shrink-0">
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => reorderPlan(plan.id, 'up')} disabled={index === 0}>
                                  <ChevronUpSquare className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => reorderPlan(plan.id, 'down')} disabled={index === availablePlans.length - 1}>
                                  <ChevronDownSquare className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-bold truncate">{plan.name}</p>
                                  <Badge variant="outline" className="text-[8px] h-4 py-0 uppercase">{plan.categories[0]}</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground truncate">{plan.description}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 pl-4 border-l ml-4">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 gap-1.5 text-[9px] font-black uppercase"
                                onClick={() => setExpandedPlanId(expandedPlanId === plan.id ? null : plan.id)}
                              >
                                {plan.activities.length} Steps
                                {expandedPlanId === plan.id ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
                              </Button>
                              
                              <div className="flex items-center gap-3">
                                {!plan.isPreset && (
                                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleOpenBuilder(plan)}>
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                )}
                                <Switch 
                                  checked={activePlanIds.includes(plan.id)} 
                                  onCheckedChange={() => togglePlan(plan.id)}
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                  
                  <motion.div 
                    key="add-plan-card"
                    layout
                    transition={{ duration: 0.4 }}
                  >
                    <Card 
                      className={cn(
                        "border-dashed cursor-pointer hover:bg-primary/[0.02] flex items-center justify-center transition-colors h-full",
                        routinesView === 'grid' ? "flex-col p-6 text-center min-h-[120px]" : "py-3"
                      )} 
                      onClick={() => handleOpenBuilder()}
                    >
                      <Plus className={cn("text-muted-foreground mb-2", routinesView === 'grid' ? "w-8 h-8" : "w-4 h-4 mr-2")} />
                      <p className="text-sm font-bold">New Custom Plan</p>
                      {routinesView === 'grid' && <p className="text-xs text-muted-foreground">Syncs with all category views</p>}
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
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
                  <Button variant={view === 'month' ? 'default' : 'ghost'} size="sm" className="h-8 text-xs font-bold" onClick={() => setView('month')}>Month</Button>
                  <Button variant={view === 'week' ? 'default' : 'ghost'} size="sm" className="h-8 text-xs font-bold" onClick={() => setView('week')}>Week</Button>
                  <Button variant={view === 'day' ? 'default' : 'ghost'} size="sm" className="h-8 text-xs font-bold" onClick={() => setView('day')}>Day</Button>
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
                    
                    {selectedDate && (
                      <div className="px-6 pb-6 pt-2 border-t border-primary/5 animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <ListChecks className="w-3 h-3 text-primary" /> Agenda: {format(selectedDate, 'MMM do')}
                          </h3>
                          <Badge variant="outline" className="text-[10px] font-bold">{todaysTasks.length} Logs</Badge>
                        </div>
                        
                        {todaysTasks.length === 0 ? (
                          <div className="py-10 text-center border-2 border-dashed rounded-xl bg-muted/10">
                            <p className="text-sm font-bold text-muted-foreground italic">No activity logged for this date.</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {todaysTasks.map(task => (
                              <div key={task.instanceId} className={cn(
                                "flex items-center gap-4 p-4 rounded-2xl border bg-card transition-all group",
                                task.status === 'completed' && "opacity-60 bg-muted/20"
                              )}>
                                <div className="w-1.5 h-10 rounded-full" style={{ backgroundColor: (task as any).planColor || 'hsl(var(--primary))' }} />
                                <div className="flex-grow">
                                  <p className="font-bold text-sm">{task.name}</p>
                                  <div className="flex gap-2 mt-1">
                                    <Badge variant="secondary" className="text-[9px] h-4 py-0 font-bold uppercase">{task.category}</Badge>
                                    <span className="text-[10px] text-muted-foreground font-medium">{task.scheduledTime || (task as any).timeOfDay || 'Anytime'}</span>
                                  </div>
                                </div>
                                {task.status === 'completed' && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
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
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    Tracking Core
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    Manage which modules are actively synced to your analytics. Toggling off hides them from view but <b>never</b> deletes historical data.
                  </p>
                  <div className="space-y-2">
                    {[
                      { id: 'Movement', icon: HeartPulse, label: 'Body Mastery' },
                      { id: 'Stillness', icon: Waves, label: 'Mental Reset' },
                      { id: 'Communication', icon: MessageSquare, label: 'Dialogue Drill' },
                      { id: 'Speed Reading', icon: Zap, label: 'Cognitive Velocity' },
                    ].map(track => (
                      <div key={track.id} className="flex items-center justify-between p-2 rounded-lg bg-background border border-primary/5">
                        <div className="flex items-center gap-2">
                          <track.icon className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-[10px] font-bold uppercase">{track.label}</span>
                        </div>
                        <Switch 
                          size="sm" 
                          checked={trackingEnabled[track.id]} 
                          onCheckedChange={() => toggleTracking(track.id)} 
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
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
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                      !newPlanName.trim() && "border-amber-500/50"
                    )}
                  />
                  {!newPlanName.trim() && <p className="text-[9px] text-amber-600 font-bold uppercase">Name is required to initialize</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Theme Categories</Label>
                  <div className="flex flex-wrap gap-1.5">
                    {(['Movement', 'Stillness', 'Nutrition', 'Finance', 'Study/Learning'] as PlanCategory[]).map(c => (
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
                      <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2 opacity-50" />
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
                            <Select value={act.recurrence} onValueChange={(v: any) => updateActivity(act.id, { recurrence: v })}>
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
              {editingPlan ? 'Update Protocol' : 'Initialize Protocol'}
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
