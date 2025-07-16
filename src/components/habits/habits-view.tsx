
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Target, PlusCircle, Trash2, Edit, TrendingUp, Zap, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useHydratedJournalStore as useJournal, type Habit } from '@/hooks/use-journal';
import { journalConfig, type JournalCategory, type HabitId, allHabits } from '@/lib/journal-config';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from '../ui/skeleton';
import { Progress } from '../ui/progress';

const habitCategories = Object.keys(journalConfig) as JournalCategory[];

const HabitItem = ({ 
  habit, 
  isDone, 
  onToggle,
  onEdit,
  onDelete
}: { 
  habit: Habit; 
  isDone: boolean, 
  onToggle: (checked: boolean) => void,
  onEdit: () => void,
  onDelete: () => void
}) => {
  const Icon = allHabits[habit.id]?.icon || journalConfig[habit.category]?.icon || Target;
  const checkboxId = `habit-tracker-${habit.id}`;
  return (
    <div className="flex items-center group">
      <Label
        htmlFor={checkboxId}
        className={cn(
          "flex items-center gap-3 p-3 rounded-lg transition-all w-full cursor-pointer",
          isDone ? 'bg-primary/10 hover:bg-primary/20' : 'bg-muted/50 hover:bg-muted'
        )}
      >
        <Checkbox id={checkboxId} checked={isDone} onCheckedChange={onToggle} />
        <div className={cn("p-1.5 rounded-md", isDone ? 'bg-primary/20' : 'bg-background/50')}>
          <Icon className={cn("w-5 h-5", isDone ? 'text-primary' : 'text-muted-foreground')} />
        </div>
        <span className={cn("flex-grow font-medium text-sm", isDone ? 'text-foreground' : 'text-muted-foreground')}>
          {habit.label}
        </span>
      </Label>
       <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onEdit}>
            <Edit className="w-4 h-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Habit?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete the habit "{habit.label}"? This cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete} variant="destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
    </div>
  );
};

const HabitDialog = ({
    open,
    onOpenChange,
    onSave,
    habitToEdit
}: {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    onSave: (habit: Omit<Habit, 'id' | 'icon'>, id?: HabitId) => void,
    habitToEdit: Habit | null
}) => {
    const [label, setLabel] = useState('');
    const [category, setCategory] = useState<JournalCategory | ''>('');

    useEffect(() => {
        if(habitToEdit && open) {
            setLabel(habitToEdit.label);
            setCategory(habitToEdit.category);
        } else {
            setLabel('');
            setCategory('');
        }
    }, [habitToEdit, open]);

    const handleSave = () => {
        if (!label || !category) return;
        const newHabitData = {
            label,
            category,
        };
        onSave(newHabitData, habitToEdit?.id);
        onOpenChange(false);
    }
    
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                 <AlertDialogHeader>
                    <AlertDialogTitle>{habitToEdit ? 'Edit Habit' : 'Add New Habit'}</AlertDialogTitle>
                    <AlertDialogDescription>
                       Customize your habits to align with your personal growth goals.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-4">
                     <div>
                        <Label htmlFor="habit-label">Habit Name</Label>
                        <Input id="habit-label" value={label} onChange={e => setLabel(e.target.value)} placeholder="e.g., Meditate for 5 minutes" />
                    </div>
                    <div>
                        <Label htmlFor="habit-category">Category</Label>
                        <Select value={category} onValueChange={(value) => setCategory(value as JournalCategory)}>
                            <SelectTrigger id="habit-category">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {habitCategories.map(cat => (
                                    <SelectItem key={cat} value={cat}>{journalConfig[cat].title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};


export function HabitsView() {
    const { habits, completedHabits, toggleHabitForDay, addHabit, updateHabit, removeHabit, resetHabits, hasHydrated } = useJournal();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [habitToEdit, setHabitToEdit] = useState<Habit | null>(null);

    const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
    const todaysHabits = completedHabits[today] || [];
    
    const handleToggleHabit = (habitId: HabitId) => {
      toggleHabitForDay(today, habitId);
    };
    
    const handleOpenDialog = (habit: Habit | null) => {
        setHabitToEdit(habit);
        setIsDialogOpen(true);
    };

    const handleSaveHabit = (habitData: Omit<Habit, 'id' | 'icon'>, id?: HabitId) => {
        if(id) {
            updateHabit(id, habitData);
        } else {
            addHabit(habitData);
        }
    };
    
    const handleDeleteHabit = (id: HabitId) => {
        removeHabit(id);
    };
    
    const habitsByCategory = habitCategories.map(categoryKey => {
      const category = journalConfig[categoryKey];
      const categoryHabits = habits.filter(h => h.category === category.title);
      return { category, categoryHabits };
    }).filter(group => group.categoryHabits.length > 0);

    const completionPercentage = habits.length > 0 ? (todaysHabits.length / habits.length) * 100 : 0;
    
    // Mock data for streak stats
    const streakStats = {
        currentStreak: 5,
        longestStreak: 12,
        weeklyCompletion: 85,
    }

    if (!hasHydrated) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2"><Skeleton className="h-[400px] w-full" /></div>
            <div><Skeleton className="h-[400px] w-full" /></div>
        </div>
      );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Today's Habits</CardTitle>
                    <CardDescription>Check off your habits for today to build your streak.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[500px] pr-3 -mr-3">
                        <Accordion type="multiple" className="w-full" defaultValue={[]}>
                        {habitsByCategory.map(({ category, categoryHabits }) => {
                            if (categoryHabits.length === 0) return null;
                            const completedInCategory = categoryHabits.filter(h => todaysHabits.includes(h.id)).length;
                            return (
                            <AccordionItem value={category.title} key={category.title}>
                                <AccordionTrigger>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-2">
                                    <category.icon className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-semibold">{category.title}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground font-medium pr-2">{completedInCategory} / {categoryHabits.length}</span>
                                </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                <div className="space-y-2 pl-2">
                                    {categoryHabits.map(habit => (
                                    habit && <HabitItem 
                                        key={habit.id} 
                                        habit={habit}
                                        isDone={todaysHabits.includes(habit.id)}
                                        onToggle={() => handleToggleHabit(habit.id)}
                                        onEdit={() => handleOpenDialog(habit)}
                                        onDelete={() => handleDeleteHabit(habit.id)}
                                    />
                                    ))}
                                </div>
                                </AccordionContent>
                            </AccordionItem>
                            )
                        })}
                        </Accordion>
                    </ScrollArea>
                </CardContent>
                 <CardFooter className="border-t pt-4 flex-col gap-2">
                    <Button variant="outline" className="w-full" onClick={() => handleOpenDialog(null)}>
                        <PlusCircle className="mr-2 h-4 w-4"/>
                        Add Custom Habit
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" className="w-full text-muted-foreground">
                                Reset to Default Habits
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Reset Habits?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will remove any custom habits you've created and restore the original set. This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={resetHabits} variant="destructive">Reset Habits</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Your Progress</CardTitle>
                    <CardDescription>Visualize your consistency and build momentum.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-muted-foreground">Today's Completion</span>
                            <span className="text-sm font-bold text-primary">{todaysHabits.length} / {habits.length}</span>
                        </div>
                        <Progress value={completionPercentage} />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Zap className="w-5 h-5"/>
                                <span className="font-medium">Current Streak</span>
                            </div>
                            <span className="font-bold text-lg">{streakStats.currentStreak} days</span>
                        </div>
                         <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <TrendingUp className="w-5 h-5"/>
                                <span className="font-medium">Longest Streak</span>
                            </div>
                            <span className="font-bold text-lg">{streakStats.longestStreak} days</span>
                        </div>
                         <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="w-5 h-5"/>
                                <span className="font-medium">Weekly Completion</span>
                            </div>
                            <span className="font-bold text-lg">{streakStats.weeklyCompletion}%</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <HabitDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSave={handleSaveHabit} habitToEdit={habitToEdit} />
        </div>
    );
}
