
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';

const deckSettingsSchema = z.object({
  newCardsPerDay: z.coerce.number().int().min(0, "Cannot be negative"),
  maxReviewsPerDay: z.coerce.number().int().min(0, "Cannot be negative"),
  learningSteps: z.string().refine((val) => /^\d+(?:\s+\d+)*$/.test(val), {
    message: "Must be a space-separated list of numbers (minutes).",
  }),
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
    defaultValues: {
      newCardsPerDay: 20,
      maxReviewsPerDay: 200,
      learningSteps: '1 10',
    }
  });

  useEffect(() => {
    if (deck) {
      reset({
        newCardsPerDay: deck.newCardsPerDay,
        maxReviewsPerDay: deck.maxReviewsPerDay,
        learningSteps: deck.learningSteps.join(' '),
      });
    }
  }, [deck, reset]);

  const onSubmit = (data: DeckSettingsFormValues) => {
    const learningStepsArray = data.learningSteps.split(' ').map(Number);
    updateDeck(deckId, {
      newCardsPerDay: data.newCardsPerDay,
      maxReviewsPerDay: data.maxReviewsPerDay,
      learningSteps: learningStepsArray,
    });
    toast({
      title: 'Deck settings saved!',
      description: `Settings for "${deck?.name}" have been updated.`,
      variant: 'success',
    });
    router.push(`/flashcards/deck/${deckId}`);
  };

  if (!deck) {
    return <div>Loading or deck not found...</div>;
  }
  
  if (deck.id === 'default') {
     return (
        <div className="text-center py-12">
            <h1 className="text-2xl font-bold">The Default deck has no settings.</h1>
            <Button asChild variant="link">
            <Link href={`/flashcards/deck/default`}>Return to Deck</Link>
            </Button>
      </div>
     )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Button asChild variant="outline" className="mb-4">
            <Link href={`/flashcards/deck/${deckId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Deck</Link>
          </Button>
          <h1 className="text-3xl font-bold">Deck Settings: {deck.name}</h1>
          <p className="text-muted-foreground">Customize the learning behavior for this deck.</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>New Cards</CardTitle>
            <CardDescription>Control how new cards are introduced.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="newCardsPerDay">New cards/day</Label>
              <Controller
                name="newCardsPerDay"
                control={control}
                render={({ field }) => <Input {...field} type="number" id="newCardsPerDay" />}
              />
              {errors.newCardsPerDay && <p className="text-destructive text-sm mt-1">{errors.newCardsPerDay.message}</p>}
              <p className="text-xs text-muted-foreground mt-1">The maximum number of new cards to introduce in a day.</p>
            </div>
            <div>
              <Label htmlFor="learningSteps">Learning steps (in minutes)</Label>
               <Controller
                name="learningSteps"
                control={control}
                render={({ field }) => <Input {...field} type="text" id="learningSteps" />}
              />
               {errors.learningSteps && <p className="text-destructive text-sm mt-1">{errors.learningSteps.message}</p>}
               <p className="text-xs text-muted-foreground mt-1">Space-separated list of delays. E.g., "1 10" for 1min then 10min.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Reviews</CardTitle>
                <CardDescription>Control the maximum number of reviews.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div>
                    <Label htmlFor="maxReviewsPerDay">Maximum reviews/day</Label>
                    <Controller
                        name="maxReviewsPerDay"
                        control={control}
                        render={({ field }) => <Input {...field} type="number" id="maxReviewsPerDay" />}
                    />
                    {errors.maxReviewsPerDay && <p className="text-destructive text-sm mt-1">{errors.maxReviewsPerDay.message}</p>}
                     <p className="text-xs text-muted-foreground mt-1">The maximum number of review cards to show in a day.</p>
                </div>
            </CardContent>
        </Card>
        
         <div className="flex justify-end">
            <Button type="submit" disabled={!isDirty}>
                <Save className="mr-2 h-4 w-4"/> Save Changes
            </Button>
        </div>
      </form>
    </div>
  );
}
