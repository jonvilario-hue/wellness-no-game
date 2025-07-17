
'use client';

import { memo, useCallback, useEffect, useState } from 'react';
import {
    Save,
    Trash2,
    Loader2,
    CheckCircle,
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
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useHydratedJournalStore as useJournal, type JournalEntry, type ReflectionFrequency, type JournalCategory } from '@/hooks/use-journal';
import { journalConfig } from '@/lib/journal-config';
import { EditableLabel } from '../time/editable-label';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';
import { MoodEditor } from '../mood/mood-editor';
import { FocusEditor } from '../focus/focus-editor';

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
  const { settings: dashboardSettings } = useDashboardSettings();
  
  useEffect(() => {
    setEditorState(entry);
    setSaveStatus('idle');
  }, [entry]);
  
  const handleSave = useCallback((updatedEntry: JournalEntry, options: { isFinal?: boolean } = { isFinal: false }) => {
    const isNew = updatedEntry.id.startsWith('new-');
    const hasContent = updatedEntry.field1 || updatedEntry.field2 || updatedEntry.field3 || updatedEntry.affirmations.some(a => a) || updatedEntry.moodNote || updatedEntry.effort > 0 || updatedEntry.focusContext;
    
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
      entryToSave.effort = 0;
      entryToSave.focusContext = null;
      entryToSave.focusTags = [];
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
      const defaultCategory: JournalCategory = 'Notebook';
      if (category && journalConfig[category as JournalCategory]) {
          return { config: journalConfig[category as JournalCategory], category: category as JournalCategory};
      }
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
        const hasContent = editorState.field1 || editorState.field2 || editorState.field3 || editorState.affirmations.some(a => a) || editorState.moodNote || editorState.effort > 0;
        if (!isNewEntry || hasContent) {
          handleSave(editorState, { isFinal: true });
        }
        onCategoryChange(newCategory);
    }
  };
  
  const handleFrequencyButtonClick = (newFrequency: ReflectionFrequency) => {
    if (editorState.frequency !== newFrequency) {
        const hasContent = editorState.field1 || editorState.field2 || editorState.field3 || editorState.affirmations.some(a => a) || editorState.moodNote || editorState.effort > 0;
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
  
  const currentPrompts = config.prompts[editorState.frequency] || config.prompts.daily;
  const categoryKeys = Object.keys(journalConfig) as JournalCategory[];
  
  const handleLabelSave = (newLabel: string) => {
    const updatedEntry = { ...editorState, label: newLabel };
    setEditorState(updatedEntry);
    handleSave(updatedEntry, { isFinal: true });
  }

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
                          <span>Saved</span>
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
          
           {category !== 'Notebook' && (
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
           )}

          <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
            {config.guidance}
          </div>

          {category === 'Notebook' ? (
              <Textarea
                placeholder="Start writing..."
                value={editorState.field1}
                onChange={e => handleFieldChange('field1', e.target.value)}
                className="min-h-[300px]"
              />
          ) : (
            <>
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
            </>
          )}
          
          <Separator/>

            {dashboardSettings.moodTracker && (
              <MoodEditor
                mood={editorState.mood}
                moodNote={editorState.moodNote || ''}
                onMoodChange={(value) => handleFieldChange('mood', value)}
                onMoodNoteChange={(value) => handleFieldChange('moodNote', value)}
              />
            )}
          
          {dashboardSettings.effortTracker && (
            <FocusEditor 
              effort={editorState.effort}
              onEffortChange={(value) => handleFieldChange('effort', value)}
              focusContext={editorState.focusContext || ''}
              onFocusContextChange={(value) => handleFieldChange('focusContext', value)}
              focusTags={editorState.focusTags || []}
              onFocusTagsChange={(value) => handleFieldChange('focusTags', value)}
              contextualPrompt="Rate your focus for this reflection:"
            />
          )}

        </div>
      </ScrollArea>
    </div>
  );
};
export const JournalEditor = memo(JournalEditorComponent);
JournalEditor.displayName = 'JournalEditor';

