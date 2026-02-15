
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
import { ArrowLeft, Save, RotateCcw, Info } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const deckSettingsSchema = z.object({
  // New Cards
  newCardsPerDay: z.coerce.number().int().min(0),
  learningSteps: z.string().refine((val) => /^\d+(?:\s+\d+)*$/.test(val), { message: "Must be space-separated numbers" }),
  graduatingIntervalDays: z.coerce.number().min(1),
  easyIntervalDays: z.coerce.number().min(1),
  insertionOrder: z.enum(['sequential', 'random']),

  // Reviews
  maxReviewsPerDay: z.coerce.number().int().min(0),
  startingEase: z.coerce.number().min(130, "Minimum 130%"), // Input as %, stored as decimal
  easyBonus: z.coerce.number().min(100),
  intervalModifier: z.coerce.number().min(10),
  hardIntervalModifier: z.coerce.number().min(100),
  maximumIntervalDays: z.coerce.number().min(1),

  // Lapses
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
    toast({ title: 'Deck settings saved!', variant: 'success' });
    router.push(`/study/deck/${deckId}`);
  };

  const handleRestoreDefaults = () => {
    reset({
        ...DEFAULT_DECK_SETTINGS,
        startingEase: DEFAULT_DECK_SETTINGS.startingEase * 100,
        easyBonus: DEFAULT_DECK_SETTINGS.easyBonus * 100,
        intervalModifier: DEFAULT_DECK_SETTINGS.intervalModifier * 100,
        hardIntervalModifier: DEFAULT_DECK_SETTINGS.hardIntervalModifier * 100,
        learningSteps: DEFAULT_DECK_SETTINGS.learningSteps.join(' '),
        relearningSteps: DEFAULT_DECK_SETTINGS.relearningSteps.join(' '),
    });
    toast({ title: 'Defaults restored. Save to apply.' });
  };

  if (!deck) return <div className="p-8 text-center">Deck not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <Button asChild variant="outline" size="sm" className="mb-4">
            <Link href={`/study/deck/${deckId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Deck</Link>
          </Button>
          <h1 className="text-3xl font-bold">Deck Algorithm: {deck.name}</h1>
          <p className="text-muted-foreground">Fine-tune the Spaced Repetition behavior for this deck.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleRestoreDefaults} className="text-muted-foreground">
            <RotateCcw className="w-4 h-4 mr-2" /> Restore Defaults
        </Button>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Accordion type="multiple" defaultValue={['new', 'reviews', 'lapses']} className="space-y-4">
          
          <AccordionItem value="new" className="border rounded-lg bg-card px-4">
            <AccordionTrigger className="hover:no-underline py-4">
                <span className="text-xl font-bold">SECTION 1 — New Cards</span>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pb-6 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>New cards/day</Label>
                        <Controller name="newCardsPerDay" control={control} render={({ field }) => <Input {...field} type="number" />} />
                        <p className="text-xs text-muted-foreground">The maximum number of new cards to introduce daily.</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Insertion order</Label>
                        <Controller name="insertionOrder" control={control} render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sequential">Sequential (Oldest first)</SelectItem>
                                    <SelectItem value="random">Random</SelectItem>
                                </SelectContent>
                            </Select>
                        )} />
                        <p className="text-xs text-muted-foreground">Order in which new cards are introduced.</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Learning steps (minutes)</Label>
                        <Controller name="learningSteps" control={control} render={({ field }) => <Input {...field} />} />
                        <p className="text-xs text-muted-foreground">Delays for new cards. E.g., "1 10" for 1min then 10min steps.</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Graduating interval (days)</Label>
                        <Controller name="graduatingIntervalDays" control={control} render={({ field }) => <Input {...field} type="number" />} />
                        <p className="text-xs text-muted-foreground">Interval after the last learning step is passed with "Good".</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Easy interval (days)</Label>
                        <Controller name="easyIntervalDays" control={control} render={({ field }) => <Input {...field} type="number" />} />
                        <p className="text-xs text-muted-foreground">Interval when "Easy" is pressed on a new/learning card.</p>
                    </div>
                </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="reviews" className="border rounded-lg bg-card px-4">
            <AccordionTrigger className="hover:no-underline py-4">
                <span className="text-xl font-bold">SECTION 2 — Reviews</span>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pb-6 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Maximum reviews/day</Label>
                        <Controller name="maxReviewsPerDay" control={control} render={({ field }) => <Input {...field} type="number" />} />
                        <p className="text-xs text-muted-foreground">The maximum number of reviews to show today.</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Starting ease (%)</Label>
                        <Controller name="startingEase" control={control} render={({ field }) => <Input {...field} type="number" />} />
                        <p className="text-xs text-muted-foreground">Initial ease factor for new cards (Default 250%).</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Easy bonus (%)</Label>
                        <Controller name="easyBonus" control={control} render={({ field }) => <Input {...field} type="number" />} />
                        <p className="text-xs text-muted-foreground">Multiplier applied to interval when "Easy" is selected.</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Interval modifier (%)</Label>
                        <Controller name="intervalModifier" control={control} render={({ field }) => <Input {...field} type="number" />} />
                        <p className="text-xs text-muted-foreground">Global multiplier for all review intervals.</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Hard interval modifier (%)</Label>
                        <Controller name="hardIntervalModifier" control={control} render={({ field }) => <Input {...field} type="number" />} />
                        <p className="text-xs text-muted-foreground">Multiplier applied when "Hard" is selected.</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Maximum interval (days)</Label>
                        <Controller name="maximumIntervalDays" control={control} render={({ field }) => <Input {...field} type="number" />} />
                        <p className="text-xs text-muted-foreground">Upper limit for any review interval.</p>
                    </div>
                </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="lapses" className="border rounded-lg bg-card px-4">
            <AccordionTrigger className="hover:no-underline py-4">
                <span className="text-xl font-bold">SECTION 3 — Lapses</span>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pb-6 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Relearning steps (minutes)</Label>
                        <Controller name="relearningSteps" control={control} render={({ field }) => <Input {...field} />} />
                        <p className="text-xs text-muted-foreground">Steps for cards that were forgotten ("Again").</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Minimum interval (days)</Label>
                        <Controller name="minimumLapseIntervalDays" control={control} render={({ field }) => <Input {...field} type="number" />} />
                        <p className="text-xs text-muted-foreground">The shortest possible interval after a lapse.</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Leech threshold</Label>
                        <Controller name="leechThreshold" control={control} render={({ field }) => <Input {...field} type="number" />} />
                        <p className="text-xs text-muted-foreground">Number of "Again" presses before card is considered a leech.</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Leech action</Label>
                        <Controller name="leechAction" control={control} render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="suspend">Suspend Card</SelectItem>
                                    <SelectItem value="tag">Tag Only</SelectItem>
                                </SelectContent>
                            </Select>
                        )} />
                        <p className="text-xs text-muted-foreground">What happens when a card reaches the leech threshold.</p>
                    </div>
                </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
        
        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg" disabled={!isDirty} className="bg-primary text-primary-foreground min-w-[200px]">
            <Save className="mr-2 h-5 w-5"/> Save Algorithm Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
