
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFlashcardStore, DEFAULT_DECK_SETTINGS } from '@/hooks/use-flashcard-store';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Save, RotateCcw, Info, SlidersHorizontal, AlertCircle, Eye, Zap, Layers, History, Clock, Target, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const parseSteps = (val: string): number[] => {
  return val.split(/\s+/).map(s => {
    const match = s.match(/^(\d+)([mhd])?$/);
    if (!match) return 0;
    const num = parseInt(match[1]);
    const unit = match[2] || 'm';
    if (unit === 'h') return num * 60;
    if (unit === 'd') return num * 1440;
    return num;
  }).filter(n => n > 0);
};

const formatSteps = (steps: number[]): string => {
  return steps.map(m => {
    if (m >= 1440 && m % 1440 === 0) return `${m / 1440}d`;
    if (m >= 60 && m % 60 === 0) return `${m / 60}h`;
    return `${m}m`;
  }).join(' ');
};

const deckSettingsSchema = z.object({
  // New Cards
  newCardsPerDay: z.coerce.number().int().min(0),
  learningSteps: z.string(),
  graduatingIntervalDays: z.coerce.number().min(1),
  easyIntervalDays: z.coerce.number().min(1),
  insertionOrder: z.enum(['sequential', 'random', 'newest-first']),

  // Reviews
  maxReviewsPerDay: z.coerce.number().int().min(0),
  startingEase: z.coerce.number().min(130, "Minimum 130%"),
  easyBonus: z.coerce.number().min(100),
  intervalModifier: z.coerce.number().min(10),
  hardIntervalModifier: z.coerce.number().min(100),
  maximumIntervalDays: z.coerce.number().min(1),
  minimumIntervalDays: z.coerce.number().min(1),
  fuzzFactorEnabled: z.boolean(),

  // Lapses
  relearningSteps: z.string(),
  newIntervalAfterLapsePercent: z.coerce.number().min(0).max(100),
  minimumLapseIntervalDays: z.coerce.number().min(1),
  leechThreshold: z.coerce.number().int().min(1),
  leechAction: z.enum(['suspend', 'tag']),

  // Display
  reviewSortOrder: z.string(),
  interdayLearningPriority: z.string(),
  showAnswerTimer: z.boolean(),
  showRemainingCount: z.boolean(),
  autoplayAudio: z.boolean(),

  // Burying
  buryNewSiblings: z.boolean(),
  buryReviewSiblings: z.boolean(),
  buryInterdayLearningSiblings: z.boolean(),

  // Algorithm
  algorithm: z.enum(['sm2', 'fsrs']),
  desiredRetention: z.coerce.number().min(0.7).max(0.99),

  // Daily Limits
  learnAheadLimitMinutes: z.coerce.number().min(0),
  dayBoundaryHour: z.coerce.number().min(0).max(23),
});

type DeckSettingsFormValues = z.infer<typeof deckSettingsSchema>;

export default function DeckSettingsPage() {
  const router = useRouter();
  const params = useParams();
  const deckId = params.deckId as string;
  const { decks, updateDeck } = useFlashcardStore();
  const deck = decks.find(d => d.id === deckId);

  const { control, handleSubmit, reset, watch, formState: { errors, isDirty } } = useForm<DeckSettingsFormValues>({
    resolver: zodResolver(deckSettingsSchema),
    defaultValues: {
      ...DEFAULT_DECK_SETTINGS,
      learningSteps: formatSteps(DEFAULT_DECK_SETTINGS.learningSteps),
      relearningSteps: formatSteps(DEFAULT_DECK_SETTINGS.relearningSteps),
      startingEase: DEFAULT_DECK_SETTINGS.startingEase * 100,
      easyBonus: DEFAULT_DECK_SETTINGS.easyBonus * 100,
      intervalModifier: DEFAULT_DECK_SETTINGS.intervalModifier * 100,
      hardIntervalModifier: DEFAULT_DECK_SETTINGS.hardIntervalModifier * 100,
    }
  });

  const algorithm = watch('algorithm');

  useEffect(() => {
    if (deck?.settings) {
      reset({
        ...deck.settings,
        learningSteps: formatSteps(deck.settings.learningSteps || [1, 10]),
        relearningSteps: formatSteps(deck.settings.relearningSteps || [10]),
        startingEase: (deck.settings.startingEase || 2.5) * 100,
        easyBonus: (deck.settings.easyBonus || 1.3) * 100,
        intervalModifier: (deck.settings.intervalModifier || 1.0) * 100,
        hardIntervalModifier: (deck.settings.hardIntervalModifier || 1.2) * 100,
      });
    }
  }, [deck, reset]);

  const onSubmit = (data: DeckSettingsFormValues) => {
    const finalSettings = {
      ...data,
      learningSteps: parseSteps(data.learningSteps),
      relearningSteps: parseSteps(data.relearningSteps),
      startingEase: data.startingEase / 100,
      easyBonus: data.easyBonus / 100,
      intervalModifier: data.intervalModifier / 100,
      hardIntervalModifier: data.hardIntervalModifier / 100,
    };

    updateDeck(deckId, { settings: finalSettings as any });
    toast({ title: 'Algorithm settings saved!', variant: 'success' });
    router.push(`/study/deck/${deckId}`);
  };

  const resetSection = (fields: (keyof DeckSettingsFormValues)[]) => {
    const defaults: any = {};
    fields.forEach(f => {
      let val = (DEFAULT_DECK_SETTINGS as any)[f];
      if (f === 'learningSteps' || f === 'relearningSteps') val = formatSteps(val);
      if (['startingEase', 'easyBonus', 'intervalModifier', 'hardIntervalModifier'].includes(f as string)) val *= 100;
      defaults[f] = val;
    });
    reset({ ...watch(), ...defaults });
    toast({ title: "Section reset to defaults" });
  };

  if (!deck) return <div className="p-8 text-center">Deck not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <Button asChild variant="ghost" className="mb-2 p-0 hover:bg-transparent text-muted-foreground hover:text-primary">
            <Link href={`/study/deck/${deckId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Deck</Link>
          </Button>
          <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">Algorithm Mastery</h1>
          <p className="text-muted-foreground mt-1">Fine-tune the Spaced Repetition logic for <span className="text-primary font-bold">{deck.name}</span>.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => reset({ ...DEFAULT_DECK_SETTINGS, learningSteps: '1m 10m', relearningSteps: '10m', startingEase: 250, easyBonus: 130, intervalModifier: 100, hardIntervalModifier: 120 } as any)} className="text-muted-foreground hover:text-foreground">
            <RotateCcw className="w-3.5 h-3.5 mr-2" /> Global Reset
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Accordion type="multiple" defaultValue={['new', 'reviews', 'lapses', 'display', 'burying', 'advanced']} className="space-y-4">
          
          {/* SECTION: NEW CARDS */}
          <AccordionItem value="new" className="border border-primary/10 rounded-xl bg-card px-6 overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg"><SlidersHorizontal className="w-5 h-5 text-primary"/></div>
                    <span className="text-xl font-bold">New Cards</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pb-8 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">New cards/day</Label>
                        <Controller name="newCardsPerDay" control={control} render={({ field }) => <Input {...field} type="number" className="bg-muted/20" />} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Order</Label>
                        <Controller name="insertionOrder" control={control} render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="bg-muted/20"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sequential">Sequential (Oldest first)</SelectItem>
                                    <SelectItem value="newest-first">Sequential (Newest first)</SelectItem>
                                    <SelectItem value="random">Randomized Discovery</SelectItem>
                                </SelectContent>
                            </Select>
                        )} />
                    </div>
                    <div className="space-y-2">
                        <TooltipProvider>
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground cursor-help flex items-center gap-1.5">
                                Learning steps <Info className="w-3 h-3" />
                              </Label>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="max-w-xs">
                              Separate steps with spaces. Use m=minutes, h=hours, d=days. Example: 1m 10m 1d
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <Controller name="learningSteps" control={control} render={({ field }) => <Input {...field} className="bg-muted/20" placeholder="1m 10m" />} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Graduating (d)</Label>
                          <Controller name="graduatingIntervalDays" control={control} render={({ field }) => <Input {...field} type="number" className="bg-muted/20" />} />
                      </div>
                      <div className="space-y-2">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Easy (d)</Label>
                          <Controller name="easyIntervalDays" control={control} render={({ field }) => <Input {...field} type="number" className="bg-muted/20" />} />
                      </div>
                    </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-primary/5">
                  <Button type="button" variant="ghost" size="sm" onClick={() => resetSection(['newCardsPerDay', 'learningSteps', 'graduatingIntervalDays', 'easyIntervalDays', 'insertionOrder'])} className="text-[10px] font-bold uppercase opacity-50 hover:opacity-100">
                    Reset Section
                  </Button>
                </div>
            </AccordionContent>
          </AccordionItem>

          {/* SECTION: REVIEW CYCLES */}
          <AccordionItem value="reviews" className="border border-primary/10 rounded-xl bg-card px-6 overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg"><RotateCcw className="w-5 h-5 text-primary"/></div>
                    <span className="text-xl font-bold">Review Cycles</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pb-8 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Starting ease (%)</Label>
                        <Controller name="startingEase" control={control} render={({ field }) => <Input {...field} type="number" className="bg-muted/20" />} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Easy bonus (%)</Label>
                        <Controller name="easyBonus" control={control} render={({ field }) => <Input {...field} type="number" className="bg-muted/20" />} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Interval modifier (%)</Label>
                        <Controller name="intervalModifier" control={control} render={({ field }) => <Input {...field} type="number" className="bg-muted/20" />} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Hard modifier (%)</Label>
                        <Controller name="hardIntervalModifier" control={control} render={({ field }) => <Input {...field} type="number" className="bg-muted/20" />} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Max Int (d)</Label>
                          <Controller name="maximumIntervalDays" control={control} render={({ field }) => <Input {...field} type="number" className="bg-muted/20" />} />
                      </div>
                      <div className="space-y-2">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Min Int (d)</Label>
                          <Controller name="minimumIntervalDays" control={control} render={({ field }) => <Input {...field} type="number" className="bg-muted/20" />} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-primary/5">
                        <div className="space-y-0.5">
                          <Label className="text-sm">Interval Fuzz</Label>
                          <p className="text-[10px] text-muted-foreground">Prevent clustering reviews.</p>
                        </div>
                        <Controller name="fuzzFactorEnabled" control={control} render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />} />
                    </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-primary/5">
                  <Button type="button" variant="ghost" size="sm" onClick={() => resetSection(['startingEase', 'easyBonus', 'intervalModifier', 'hardIntervalModifier', 'maximumIntervalDays', 'minimumIntervalDays', 'fuzzFactorEnabled'])} className="text-[10px] font-bold uppercase opacity-50 hover:opacity-100">
                    Reset Section
                  </Button>
                </div>
            </AccordionContent>
          </AccordionItem>

          {/* SECTION: MEMORY LAPSES */}
          <AccordionItem value="lapses" className="border border-primary/10 rounded-xl bg-card px-6 overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-destructive/10 rounded-lg"><AlertCircle className="w-5 h-5 text-destructive"/></div>
                    <span className="text-xl font-bold">Memory Lapses</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pb-8 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Relearning steps</Label>
                        <Controller name="relearningSteps" control={control} render={({ field }) => <Input {...field} className="bg-muted/20" placeholder="10m" />} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">New interval (%)</Label>
                        <Controller name="newIntervalAfterLapsePercent" control={control} render={({ field }) => <Input {...field} type="number" className="bg-muted/20" />} />
                        <p className="text-[10px] text-muted-foreground">0% = reset to 1 day.</p>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Leech threshold</Label>
                        <Controller name="leechThreshold" control={control} render={({ field }) => <Input {...field} type="number" className="bg-muted/20" />} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Leech action</Label>
                        <Controller name="leechAction" control={control} render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="bg-muted/20"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="suspend">Suspend Card</SelectItem>
                                    <SelectItem value="tag">Tag Only</SelectItem>
                                </SelectContent>
                            </Select>
                        )} />
                    </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-primary/5">
                  <Button type="button" variant="ghost" size="sm" onClick={() => resetSection(['relearningSteps', 'newIntervalAfterLapsePercent', 'leechThreshold', 'leechAction'])} className="text-[10px] font-bold uppercase opacity-50 hover:opacity-100">
                    Reset Section
                  </Button>
                </div>
            </AccordionContent>
          </AccordionItem>

          {/* SECTION: DISPLAY & ORDER */}
          <AccordionItem value="display" className="border border-primary/10 rounded-xl bg-card px-6 overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg"><Eye className="w-5 h-5 text-primary"/></div>
                    <span className="text-xl font-bold">Display & Order</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pb-8 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Review Sort Order</Label>
                        <Controller name="reviewSortOrder" control={control} render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="bg-muted/20"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="due-date">Due Date (Default)</SelectItem>
                                    <SelectItem value="random">Random</SelectItem>
                                    <SelectItem value="ease-asc">Ease (Ascending)</SelectItem>
                                    <SelectItem value="ease-desc">Ease (Descending)</SelectItem>
                                    <SelectItem value="added-order">Order Added</SelectItem>
                                </SelectContent>
                            </Select>
                        )} />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-primary/5">
                        <Label className="text-sm">Remaining Count</Label>
                        <Controller name="showRemainingCount" control={control} render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />} />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-primary/5">
                        <Label className="text-sm">Answer Timer</Label>
                        <Controller name="showAnswerTimer" control={control} render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />} />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-primary/5">
                        <Label className="text-sm">Autoplay Audio</Label>
                        <Controller name="autoplayAudio" control={control} render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />} />
                    </div>
                </div>
            </AccordionContent>
          </AccordionItem>

          {/* SECTION: BURYING & SIBLINGS */}
          <AccordionItem value="burying" className="border border-primary/10 rounded-xl bg-card px-6 overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg"><Layers className="w-5 h-5 text-primary"/></div>
                    <span className="text-xl font-bold">Burying & Siblings</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pb-8 pt-2">
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-4">
                  Prevents seeing both versions of a card (e.g. front-to-back and back-to-front) on the same day.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-primary/5">
                        <Label className="text-[10px] font-bold uppercase">New Siblings</Label>
                        <Controller name="buryNewSiblings" control={control} render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />} />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-primary/5">
                        <Label className="text-[10px] font-bold uppercase">Review Siblings</Label>
                        <Controller name="buryReviewSiblings" control={control} render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />} />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-primary/5">
                        <Label className="text-[10px] font-bold uppercase">Interday Siblings</Label>
                        <Controller name="buryInterdayLearningSiblings" control={control} render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />} />
                    </div>
                </div>
            </AccordionContent>
          </AccordionItem>

          {/* SECTION: DAILY LIMITS */}
          <AccordionItem value="limits" className="border border-primary/10 rounded-xl bg-card px-6 overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg"><Target className="w-5 h-5 text-primary"/></div>
                    <span className="text-xl font-bold">Daily Limits & Time</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pb-8 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Max reviews/day</Label>
                        <Controller name="maxReviewsPerDay" control={control} render={({ field }) => <Input {...field} type="number" className="bg-muted/20" />} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Learn ahead (min)</Label>
                        <Controller name="learnAheadLimitMinutes" control={control} render={({ field }) => <Input {...field} type="number" className="bg-muted/20" />} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Day boundary (hour)</Label>
                        <Controller name="dayBoundaryHour" control={control} render={({ field }) => <Input {...field} type="number" className="bg-muted/20" />} />
                        <p className="text-[10px] text-muted-foreground">When the "next day" starts (e.g. 4 = 4:00 AM).</p>
                    </div>
                </div>
            </AccordionContent>
          </AccordionItem>

          {/* SECTION: ADVANCED ALGORITHM */}
          <AccordionItem value="advanced" className="border-2 border-primary/20 rounded-xl bg-primary/5 px-6 overflow-hidden shadow-lg">
            <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg text-primary"><Zap className="w-5 h-5"/></div>
                    <span className="text-xl font-black uppercase tracking-tighter">Advanced Engine</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-8 pb-8 pt-2">
                <div className="p-4 bg-background/50 rounded-xl border border-dashed border-primary/20 flex gap-4 items-start">
                  <Zap className="w-6 h-6 text-primary shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold">FSRS v4 (Modern Spaced Repetition)</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      FSRS is a high-accuracy modern scheduler that adapts to your personal memory patterns. It typically requires less review time for the same level of retention.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Algorithm Choice</Label>
                        <Controller name="algorithm" control={control} render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="bg-muted/20"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sm2">SM-2 (Classic)</SelectItem>
                                    <SelectItem value="fsrs">FSRS v4 (Modern)</SelectItem>
                                </SelectContent>
                            </Select>
                        )} />
                    </div>
                    {algorithm === 'fsrs' && (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex justify-between">
                            <span>Desired Retention</span>
                            <span className="text-primary font-bold">{Math.round(watch('desiredRetention') * 100)}%</span>
                          </Label>
                          <Controller name="desiredRetention" control={control} render={({ field }) => (
                            <Slider value={[field.value]} onValueChange={([v]) => field.onChange(v)} min={0.7} max={0.99} step={0.01} className="py-2" />
                          )} />
                        </div>
                        <Button type="button" variant="secondary" className="w-full h-10 font-bold gap-2 text-xs" disabled>
                          <History className="w-3.5 h-3.5" /> Optimize Parameters (Needs History)
                        </Button>
                      </div>
                    )}
                </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
        
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t z-50 flex justify-center">
          <Button type="submit" size="lg" disabled={!isDirty} className="bg-primary text-primary-foreground min-w-[300px] h-14 text-lg font-black shadow-2xl shadow-primary/40 hover:scale-105 transition-transform">
            <Save className="mr-2 h-6 w-6"/> LOCK IN CONFIGURATION
          </Button>
        </div>
      </form>
    </div>
  );
}
