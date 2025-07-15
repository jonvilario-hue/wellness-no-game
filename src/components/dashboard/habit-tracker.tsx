
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Target, PlusCircle, Trash2, Edit } from 'lucide-react';
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
import { useTheme } from '@/hooks/use-theme';
import { GrowthDecoration } from '../ui/growth-decoration';


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
          "flex items-center gap-3 p-2 rounded-lg transition-all w-full cursor-pointer",
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


export function HabitTracker() {
    const { habits, completedHabits, toggleHabitForDay, addHabit, updateHabit, removeHabit, resetHabits, hasHydrated } = useJournal();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [habitToEdit, setHabitToEdit] = useState<Habit | null>(null);
    const { organicGrowth } = useTheme();

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
    
    if (!hasHydrated) {
      return (
        <Card>
          <CardHeader>
             <CardTitle className="flex items-center gap-2 font-headline">
              <Target className="w-5 h-5 text-primary" />
              Habit Tracker
            </CardTitle>
            <CardDescription>Loading habits...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col relative overflow-hidden">
        {organicGrowth && <GrowthDecoration />}
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Target className="w-5 h-5 text-primary" />
            Habit Tracker
          </CardTitle>
          <CardDescription>Track your consistency and build lasting cognitive habits.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col min-h-[300px]">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Today's Progress</h3>
                <p className="text-sm font-bold text-primary">{todaysHabits.length} / {habits.length} Done</p>
            </div>
            <ScrollArea className="pr-3 -mr-3 flex-grow">
                <Accordion type="multiple" className="w-full" defaultValue={[habitCategories[0]]}>
                {habitCategories.map(categoryKey => {
                    const category = journalConfig[categoryKey];
                    const categoryHabits = habits.filter(h => h.category === category.title);
                    const completedInCategory = categoryHabits.filter(h => todaysHabits.includes(h.id)).length;

                    if (!categoryHabits.length) return null;

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
             <div className="mt-4 pt-4 border-t space-y-2">
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
            </div>
            {todaysHabits.length === habits.length && habits.length > 0 && (
                <p className="text-center text-green-500 font-bold mt-4">All habits completed for today!</p>
            )}
        </CardContent>
        <HabitDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSave={handleSaveHabit} habitToEdit={habitToEdit} />
      </Card>
    );
}
