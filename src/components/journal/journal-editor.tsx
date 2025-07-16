
'use client';

import { memo, useCallback, useEffect, useState } from 'react';
import {
    Save,
    Trash2,
    Loader2,
    CheckCircle,
    Share,
    PlusCircle,
    MinusCircle,
} from 'lucide-react';
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
} from '../ui/alert-dialog';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useHydratedJournalStore as useJournal, type JournalEntry, type ReflectionFrequency, type TrashedJournalEntry, type JournalCategory, type HabitId, type Habit, type MoodState } from '@/hooks/use-journal';
import { journalConfig, allHabits } from '@/lib/journal-config';
import { cn } from '@/lib/utils';
import { EditableLabel } from '../time/editable-label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';
import { Slider } from '../ui/slider';

const moodOptions = [
  { emoji: '😔', label: 'Very Low', value: 0 },
  { emoji: '😐', label: 'Low', value: 1 },
  { emoji: '🙂', label: 'Neutral', value: 2 },
  { emoji: '😊', label: 'Good', value: 3 },
  { emoji: '😄', label: 'Very Good', value: 4 },
];

const effortLevels: { value: number, label: string }[] = [
    { value: 1, label: 'Very Low' },
    { value: 2, label: 'Low' },
    { value: 3, label: 'Medium' },
    { value: 4, label: 'High' },
    { value: 5, label: 'Very High' },
];

const JournalEditorComponent = ({
  entry,
  onSave,
  onDelete,
  onCategoryChange,
  onFrequencyChange,
}: {
  entry: JournalEntry;
  onSave: (entry: JournalEntry, options?: { isFinal?: boolean }) => { success: boolean; entry: JournalEntry | null };
  onDelete: (id: string) => void;
  onCategoryChange: (newCategory: JournalCategory) => void;
  onFrequencyChange: (newFrequency: ReflectionFrequency) => void;
}) => {
  const [editorState, setEditorState] = useState<JournalEntry>(entry);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const { toast } = useToast();
  const { habits, completedHabits, toggleHabitForDay } = useJournal();
  const { settings: dashboardSettings } = useDashboardSettings();
  
  const todaysHabits = completedHabits[editorState.date] || [];

  useEffect(() => {
    setEditorState(entry);
    setSaveStatus('idle');
  }, [entry]);
  
  const handleSave = useCallback((updatedEntry: JournalEntry, options: { isFinal?: boolean } = { isFinal: false }) => {
    const isNew = updatedEntry.id.startsWith('new-');
    const hasContent = updatedEntry.field1 || updatedEntry.field2 || updatedEntry.field3 || updatedEntry.affirmations.some(a => a) || updatedEntry.moodNote;
    
    if(isNew && !hasContent && !options.isFinal) {
      return { success: false, entry: null };
    }

    const hasChanged = JSON.stringify(entry) !== JSON.stringify(updatedEntry);

    if(!hasChanged && !isNew) {
      setSaveStatus('idle');
      return { success: true, entry: updatedEntry };
    }

    const entryToSave = { ...updatedEntry };
    if (!dashboardSettings.moodTracker) {
      entryToSave.mood = null;
      entryToSave.moodNote = '';
    }
    if (!dashboardSettings.effortTracker) {
      entryToSave.effort = 3; // Reset to default if tracker is off
    }
    
    setSaveStatus('saving');
    const result = onSave(entryToSave, options);
    
    if (result.success && result.entry) {
        setEditorState(prev => ({...prev, ...result.entry}));
        setTimeout(() => setSaveStatus('saved'), 500);
    } else if (!result.success) {
        setSaveStatus('idle');
    }
    return result;
  }, [entry, onSave, dashboardSettings]);

  useEffect(() => {
    const hasChanged = JSON.stringify(entry) !== JSON.stringify(editorState);

    if (entry.id === editorState.id && hasChanged) {
      const handler = setTimeout(() => {
        handleSave(editorState);
      }, 1500);

      return () => clearTimeout(handler);
    }
  }, [editorState, entry, handleSave]);


  useEffect(() => {
      if (saveStatus === 'saved') {
          const timer = setTimeout(() => setSaveStatus('idle'), 2000);
          return () => clearTimeout(timer);
      }
  }, [saveStatus]);
  
  const getValidConfig = (category: JournalCategory | string) => {
      if (category && journalConfig[category as JournalCategory]) {
          return { config: journalConfig[category as JournalCategory], category: category as JournalCategory};
      }
      const defaultCategory = 'Growth & Challenge Reflection';
      return { config: journalConfig[defaultCategory], category: defaultCategory };
  }
  
  const { config, category } = getValidConfig(editorState.category);
  const isNewEntry = editorState.id.startsWith('new-');
  
  const handleManualSave = () => {
    const result = handleSave(editorState, { isFinal: true });
    if(result.success) {
      toast({ title: 'Journal Entry Saved' });
    }
  }

  const handleCategoryButtonClick = (newCategory: JournalCategory) => {
    if (editorState.category !== newCategory) {
        const hasContent = editorState.field1 || editorState.field2 || editorState.field3 || editorState.affirmations.some(a => a) || editorState.moodNote;
        if (!isNewEntry || hasContent) {
          handleSave(editorState, { isFinal: true });
        }
        onCategoryChange(newCategory);
    }
  };
  
  const handleFrequencyButtonClick = (newFrequency: ReflectionFrequency) => {
    if (editorState.frequency !== newFrequency) {
        const hasContent = editorState.field1 || editorState.field2 || editorState.field3 || editorState.affirmations.some(a => a) || editorState.moodNote;
        if (!isNewEntry || hasContent) {
          handleSave(editorState, { isFinal: true });
        }
        onFrequencyChange(newFrequency);
    }
  };

  const handleFieldChange = (
    field: keyof Omit<JournalEntry, 'id' | 'date'>,
    value: any
  ) => {
    setEditorState(prevState => ({ ...prevState, [field]: value }));
  };

  const handleHabitChange = (habitId: HabitId, checked: boolean) => {
    toggleHabitForDay(editorState.date, habitId);
  };

  const handleAffirmationChange = (index: number, value: string) => {
      const newAffirmations = [...editorState.affirmations];
      newAffirmations[index] = value;
      setEditorState(prevState => ({...prevState, affirmations: newAffirmations}));
  }

  const addAffirmation = () => {
      setEditorState(prevState => ({...prevState, affirmations: [...prevState.affirmations, '']}));
  }
  
  const removeLastAffirmation = () => {
      setEditorState(prevState => ({...prevState, affirmations: prevState.affirmations.slice(0, -1)}));
  }

  const exportAsMarkdown = (entryToExport: JournalEntry) => {
      const entryConfig = journalConfig[entryToExport.category as JournalCategory];
      const prompts = entryConfig.prompts[entryToExport.frequency] || entryConfig.prompts.daily;
      const moodLabel = moodOptions.find(m => m.value === entryToExport.mood)?.label;

      let markdown = `---
date: ${entryToExport.date}
category: "${entryToExport.category}"
frequency: ${entryToExport.frequency}
effort: ${entryToExport.effort}
mood: ${moodLabel || 'Not set'}
tags: ${entryToExport.tags}
---

# Journal Entry: ${new Date(entryToExport.date + 'T00:00:00').toLocaleDateString()}

## ${entryToExport.category} (${entryToExport.frequency})

`;

      if (entryToExport.field1) markdown += `### ${prompts[0]}\n${entryToExport.field1}\n\n`;
      if (entryToExport.field2) markdown += `### ${prompts[1]}\n${entryToExport.field2}\n\n`;
      if (entryToExport.field3) markdown += `### ${prompts[2]}\n${entryToExport.field3}\n\n`;

      if (entryToExport.affirmations && entryToExport.affirmations.length > 0 && entryToExport.affirmations.some(a => a)) {
          markdown += `### Affirmations\n${entryToExport.affirmations.filter(a => a).map(a => `> ${a}`).join('\n')}\n\n`;
      }
      
      const completedHabitsForEntry = habits
          .filter(habit => todaysHabits.includes(habit.id))
          .map(h => h?.label);

      if (completedHabitsForEntry.length > 0) {
          markdown += `### Supporting Habits\n${completedHabitsForEntry.map(h => `- [x] ${h}`).join('\n')}\n\n`;
      }

      const element = document.createElement("a");
      const file = new Blob([markdown], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `journal-${entryToExport.date}.md`;
      document.body.appendChild(element); 
      element.click();
      document.body.removeChild(element);
  }
  
  const currentPrompts = config.prompts[editorState.frequency] || config.prompts.daily;
  const categoryKeys = Object.keys(journalConfig) as JournalCategory[];
  const relevantHabits = habits.filter(h => h.category === category);

  const handleLabelSave = (newLabel: string) => {
    const updatedEntry = { ...editorState, label: newLabel };
    setEditorState(updatedEntry);
    handleSave(updatedEntry, { isFinal: true });
  }

  const effortLabel = effortLevels.find(l => l.value === editorState.effort)?.label || 'Medium';

  return (
    <div className="p-4 h-full flex flex-col gap-2 relative">
        <div className="absolute top-0 left-0 right-0 p-2 z-10 text-center">
            {saveStatus !== 'idle' && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-sm font-semibold transition-all animate-in fade-in">
                  {saveStatus === 'saving' ? (
                      <>
                          <Loader2 className="w-4 h-4 animate-spin"/>
                          <span>Saving...</span>
                      </>
                  ) : (
                      <>
                           <CheckCircle className="w-4 h-4 text-green-500"/>
                          <span>Saved at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </>
                  )}
              </div>
            )}
        </div>
      <div className="flex justify-between items-start pt-8">
        <div className="flex-grow mr-4">
            <EditableLabel 
                initialValue={editorState.label}
                onSave={handleLabelSave}
                placeholder="Click to add a title..."
                className="w-full"
                inputClassName="text-lg font-bold"
            />
            <p className="text-sm text-muted-foreground ml-3">
                 {new Date(editorState.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
        </div>
         <div className="flex items-center gap-2 flex-shrink-0">
          {!isNewEntry && (
              <>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary" onClick={() => exportAsMarkdown(editorState)}>
                  <Share className="w-4 h-4"/>
              </Button>
               <AlertDialog>
                  <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                          <Trash2 className="w-4 h-4"/>
                      </Button>
                  </AlertDialogTrigger>
                   <AlertDialogContent>
                      <AlertDialogHeader>
                          <AlertDialogTitle>Move to Trash?</AlertDialogTitle>
                          <AlertDialogDescription>
                              This entry will be moved to the trash and can be restored within 30 days.
                          </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onDelete(editorState.id)}>
                              Move to Trash
                          </AlertDialogAction>
                      </AlertDialogFooter>
                  </AlertDialogContent>
              </AlertDialog>
              </>
          )}
          {isNewEntry && (
              <Button onClick={handleManualSave}>
                  <Save className="mr-2 h-4 w-4" /> Save Entry
              </Button>
          )}
         </div>
      </div>
      <Separator />
      <ScrollArea className="flex-grow pr-2 -mr-2">
        <div className="space-y-4 pr-2">
          <div>
            <Label className="mb-2 block">Journal Type</Label>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {categoryKeys.map(catKey => {
                const CatIcon = journalConfig[catKey].icon;
                return (
                  <Button
                    key={catKey}
                    variant={category === catKey ? 'default' : 'outline'}
                    onClick={() => handleCategoryButtonClick(catKey)}
                    className="flex items-center justify-start gap-2 h-auto py-2"
                  >
                    <CatIcon className="w-4 h-4 shrink-0" />
                    <span className="text-xs text-left whitespace-normal leading-tight">
                      {journalConfig[catKey].title}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>
          
           <div>
            <Label className="mb-2 block">Reflection Frequency</Label>
              <div className="flex items-center gap-2">
                  {(['daily', 'weekly', 'monthly'] as ReflectionFrequency[]).map(freq => (
                      <Button key={freq} variant={editorState.frequency === freq ? 'default' : 'outline'} onClick={() => handleFrequencyButtonClick(freq)} className="capitalize flex-1">
                          {freq}
                      </Button>
                  ))}
              </div>
          </div>

          <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
            {config.guidance}
          </div>

          <Textarea
            placeholder={currentPrompts[0]}
            value={editorState.field1}
            onChange={e => handleFieldChange('field1', e.target.value)}
            className="min-h-[60px]"
          />
           <Textarea
            placeholder={currentPrompts[1]}
            value={editorState.field2}
            onChange={e => handleFieldChange('field2', e.target.value)}
            className="min-h-[60px]"
          />
           <Textarea
            placeholder={currentPrompts[2]}
            value={editorState.field3}
            onChange={e => handleFieldChange('field3', e.target.value)}
            className="min-h-[60px]"
          />
          
          <div className="space-y-2">
               {editorState.affirmations.map((affirmation, index) => (
                  <div key={index} className="flex items-center gap-2">
                       <Textarea
                        placeholder={config.affirmationPrompt}
                        value={affirmation}
                        onChange={e => handleAffirmationChange(index, e.target.value)}
                        className="min-h-[60px] flex-grow"
                      />
                  </div>
               ))}
               <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={addAffirmation}>
                      <PlusCircle className="mr-2 h-4 w-4"/>
                      Add Affirmation
                  </Button>
                  {editorState.affirmations.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={removeLastAffirmation}>
                          <MinusCircle className="mr-2 h-4 w-4"/>
                          Remove
                      </Button>
                  )}
               </div>
          </div>
          
          <Separator/>
          
          {dashboardSettings.moodTracker && (
            <div>
              <Label>Mood</Label>
              <TooltipProvider>
              <div className="flex justify-around items-center p-2 rounded-lg bg-muted/50 mt-1">
                {moodOptions.map(option => (
                  <Tooltip key={option.value} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleFieldChange('mood', editorState.mood === option.value ? null : option.value)}
                        className={cn(
                          "text-3xl transition-transform duration-200 ease-in-out hover:scale-125",
                          editorState.mood === option.value ? "scale-125" : "scale-100 opacity-50"
                        )}
                      >
                        {option.emoji}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{option.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
              </TooltipProvider>
              <Textarea
                  placeholder="Optional: What influenced your mood today?"
                  value={editorState.moodNote || ''}
                  onChange={e => handleFieldChange('moodNote', e.target.value)}
                  className="min-h-[60px] mt-2"
                />
            </div>
          )}

          {dashboardSettings.effortTracker && (
            <div>
              <Label
                htmlFor="effort-slider"
                className="flex justify-between items-center"
              >
                <span>Focus / Cognitive Effort</span>
                <span className="font-semibold text-primary">{effortLabel}</span>
              </Label>
              <Slider
                id="effort-slider"
                min={1}
                max={5}
                step={1}
                value={[editorState.effort]}
                onValueChange={(value) => handleFieldChange('effort', value[0])}
                className="mt-2"
              />
            </div>
          )}
          
          <div>
              <Label htmlFor="tags-input">Tags (comma-separated)</Label>
              <Input
                id="tags-input"
                placeholder={config.suggestedTags}
                value={editorState.tags}
                onChange={e => handleFieldChange('tags', e.target.value)}
              />
          </div>

          {relevantHabits.length > 0 && (
            <div>
              <Label>Supporting Habits</Label>
              <div className="space-y-1 mt-1">
                {relevantHabits.map(habit => {
                  if (!habit) return null;
                  const habitCheckboxId = `habit-${habit.id}-${entry.id}`;
                  const Icon = allHabits[habit.id]?.icon;
                  if (!Icon) return null;

                  return (
                     <div key={habit.id} className="flex items-center">
                      <Label
                        htmlFor={habitCheckboxId}
                        className="flex items-center gap-2 text-sm font-normal cursor-pointer p-2 rounded-md flex-grow hover:bg-muted w-full"
                      >
                         <Checkbox 
                          id={habitCheckboxId}
                          checked={todaysHabits.includes(habit.id)}
                          onCheckedChange={checked => handleHabitChange(habit.id, !!checked)}
                         />
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        <span>{habit.label}</span>
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
export const JournalEditor = memo(JournalEditorComponent);
JournalEditor.displayName = 'JournalEditor';
