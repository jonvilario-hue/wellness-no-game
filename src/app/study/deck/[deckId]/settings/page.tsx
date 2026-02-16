
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFlashcardStore, DEFAULT_DECK_SETTINGS } from '@/hooks/use-flashcard-store';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Save, RotateCcw, Info, Settings2, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const deckSettingsSchema = z.object({
  newCardsPerDay: z.coerce.number().int().min(0),
  learningSteps: z.string().refine((val) => /^\d+(?:\s+\d+)*$/.test(val), { message: "Must be space-separated numbers" }),
  graduatingIntervalDays: z.coerce.number().min(1),
  easyIntervalDays: z.coerce.number().min(1),
  insertionOrder: z.enum(['sequential', 'random']),
  maxReviewsPerDay: z.coerce.number().int().min(0),
  startingEase: z.coerce.number().min(130, "Minimum 130%"),
  easyBonus: z.coerce.number().min(100),
  intervalModifier: z.coerce.number().min(10),
  hardIntervalModifier: z.coerce.number().min(100),
  maximumIntervalDays: z.coerce.number().min(1),
  relearningSteps: z.string().refine((val) => /^\d+(?:\s+\d+)*$/.test(val), { message: "Must be space-separated numbers" }),
  minimumLapseIntervalDays: z.coerce.number().min(1),
  leechThreshold: z.coerce.number().int().min(1),
  leechAction: z.enum(['suspend', 'tag']),
});

type DeckSettingsFormValues = z.infer<typeof deckSettingsSchema>;

export default function DeckSettingsPage() {
  const router = useRouter();
  const params = useParams();
  const deckId = params.deckId as string;
  const { decks, updateDeck } = useFlashcardStore();
  const deck = decks.find(d => d.id === deckId);

  const { control, handleSubmit, reset, formState: { errors, isDirty } } = useForm<DeckSettingsFormValues>({
    resolver: zodResolver(deckSettingsSchema),
    defaultValues: { ...DEFAULT_DECK_SETTINGS, learningSteps: '1 10', relearningSteps: '10' }
  });

  useEffect(() => {
    if (deck?.settings) {
      reset({
        ...deck.settings,
        startingEase: deck.settings.startingEase * 100,
        easyBonus: deck.settings.easyBonus * 100,
        intervalModifier: deck.settings.intervalModifier * 100,
        hardIntervalModifier: deck.settings.hardIntervalModifier * 100,
        learningSteps: deck.settings.learningSteps.join(' '),
        relearningSteps: deck.settings.relearningSteps.join(' '),
      });
    }
  }, [deck, reset]);

  const onSubmit = (data: DeckSettingsFormValues) => {
    const settings = {
      ...data,
      startingEase: data.startingEase / 100,
      easyBonus: data.easyBonus / 100,
      intervalModifier: data.intervalModifier / 100,
      hardIntervalModifier: data.hardIntervalModifier / 100,
      learningSteps: data.learningSteps.split(' ').map(Number),
      relearningSteps: data.relearningSteps.split(' ').map(Number),
    };

    updateDeck(deckId, { settings });
    toast({ title: 'Algorithm settings saved!', variant: 'success' });
    router.push(`/study/deck/${deckId}`);
  };

  if (!deck) return <div className="p-8 text-center">Deck not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <Button asChild variant="ghost" className="mb-2 p-0 hover:bg-transparent text-muted-foreground hover:text-primary">
            <Link href={`/study/deck/${deckId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Deck</Link>
          </Button>
          <h1 className="text-4xl font-bold font-headline tracking-tight">Algorithm Settings</h1>
          <p className="text-muted-foreground mt-1">Configure Spaced Repetition behavior for <span className="text-primary font-semibold">{deck.name}</span>.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => reset(DEFAULT_DECK_SETTINGS as any)} className="text-muted-foreground hover:text-foreground">
            <RotateCcw className="w-3.5 h-3.5 mr-2" /> Reset Defaults
        </Button>
      </div>

      <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl flex items-start gap-3">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
            <p className="font-bold uppercase tracking-widest mb-1">How it works</p>
            <p className="text-muted-foreground">These settings control the SM-2 based algorithm. Modifying these values will change how quickly cards are scheduled for review. Higher <strong>Starting Ease</strong> makes cards reappear less frequently, while <strong>Learning Steps</strong> determine the initial "training" phase for new concepts.</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Accordion type="multiple" defaultValue={['new', 'reviews', 'lapses']} className="space-y-4">
          
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
                        <p className="text-[10px] text-muted-foreground">Limit daily new concepts to prevent burnout.</p>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Insertion order</Label>
                        <Controller name="insertionOrder" control={control} render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="bg-muted/20"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sequential">Sequential (Oldest first)</SelectItem>
                                    <SelectItem value="random">Randomized Discovery</SelectItem>
                                </SelectContent>
                            </Select>
                        )} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Learning steps (min)</Label>
                        <Controller name="learningSteps" control={control} render={({ field }) => <Input {...field} className="bg-muted/20" />} />
                        <p className="text-[10px] text-muted-foreground italic">Delays for new cards (e.g., "1 10").</p>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Graduating interval (days)</Label>
                        <Controller name="graduatingIntervalDays" control={control} render={({ field }) => <Input {...field} type="number" className="bg-muted/20" />} />
                    </div>
                </div>
            </AccordionContent>
          </AccordionItem>

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
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Maximum interval (days)</Label>
                        <Controller name="maximumIntervalDays" control={control} render={({ field }) => <Input {...field} type="number" className="bg-muted/20" />} />
                    </div>
                </div>
            </AccordionContent>
          </AccordionItem>

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
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Relearning steps (min)</Label>
                        <Controller name="relearningSteps" control={control} render={({ field }) => <Input {...field} className="bg-muted/20" />} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Leech threshold</Label>
                        <Controller name="leechThreshold" control={control} render={({ field }) => <Input {...field} type="number" className="bg-muted/20" />} />
                        <p className="text-[10px] text-muted-foreground italic">"Again" count before card is flagged as difficult.</p>
                    </div>
                </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
        
        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg" disabled={!isDirty} className="bg-primary text-primary-foreground min-w-[240px] h-14 text-lg font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            <Save className="mr-2 h-5 w-5"/> Save Algorithm Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
