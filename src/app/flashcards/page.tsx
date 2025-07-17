
'use client';

import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { FlashcardDecks } from '@/components/flashcards/flashcard-decks';
import { Button } from '@/components/ui/button';
import { Layers, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { useMemo } from 'react';
import { processReviewData } from '@/components/stats/utils';
import type { ReviewEvent } from '@/types/stats';

import { StudySessions } from '@/components/stats/StudySessions';
import { ReviewQuality } from '@/components/stats/ReviewQuality';
import { RetentionCurve } from '@/components/stats/RetentionCurve';
import { DeckEngagement } from '@/components/stats/DeckEngagement';
import { CardDifficultyIndex } from '@/components/stats/CardDifficultyIndex';
import { ProgressTimeline } from '@/components/stats/ProgressTimeline';
import { StreakSystem } from '@/components/stats/StreakSystem';
import { TagPerformance } from '@/components/stats/TagPerformance';

const generateMockReviews = (cards: any[]): ReviewEvent[] => {
    const reviews: ReviewEvent[] = [];
    const ratings: Array<'again' | 'hard' | 'good' | 'easy'> = ['again', 'hard', 'good', 'easy'];
    
    cards.forEach(card => {
        const reviewCount = card.repetitions > 0 ? card.repetitions : Math.floor(Math.random() * 5);
        for(let i=0; i<reviewCount; i++){
             const date = new Date();
             date.setDate(date.getDate() - Math.floor(Math.random() * 60));
             reviews.push({
                 cardId: card.id,
                 deckId: card.deckId,
                 tag: card.tags?.[0],
                 timestamp: date.toISOString(),
                 rating: ratings[Math.floor(Math.random() * ratings.length)],
                 ease: card.easeFactor,
                 interval: card.interval,
                 lapses: card.repetitions > 0 && Math.random() > 0.8 ? 1 : 0
             });
        }
    });
    return reviews;
};

function StatsView() {
    const { cards, decks } = useFlashcardStore();

    const stats = useMemo(() => {
        if(cards.length === 0) return null;
        const mockReviews = generateMockReviews(cards);
        return processReviewData(mockReviews, cards, decks);
    }, [cards, decks]);

  if (!stats) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Flashcard Statistics</CardTitle>
                <CardDescription>Review your study habits and track your memory retention over time.</CardDescription>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground py-16">
                <p>Not enough data to generate statistics.</p>
                <p className="text-sm">Study some cards to get started!</p>
            </CardContent>
        </Card>
    )
  }

  const {
    sessions,
    reviewQuality,
    deckEngagement,
    cardDifficulty,
    progressTimeline,
    streakSystem,
    tagPerformance,
    retentionCurve
  } = stats;
  
  return (
    <div className="space-y-6">
        <Card>
             <CardHeader>
                <CardTitle>Recent Study Sessions</CardTitle>
                <CardDescription>A look at your most recent study sessions.</CardDescription>
            </CardHeader>
            <CardContent>
                <StudySessions sessions={sessions} />
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Review Quality</CardTitle>
                    <CardDescription>How you've rated cards during reviews.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ReviewQuality data={reviewQuality} />
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Study Streaks</CardTitle>
                    <CardDescription>Your consistency in studying daily.</CardDescription>
                </CardHeader>
                <CardContent>
                    <StreakSystem streak={streakSystem.streak} longest={streakSystem.longest} />
                </CardContent>
            </Card>
        </div>
        
         <Card>
            <CardHeader>
                <CardTitle>Progress Timeline</CardTitle>
                <CardDescription>The total number of cards you've learned over time.</CardDescription>
            </CardHeader>
            <CardContent>
                <ProgressTimeline timeline={progressTimeline} />
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Estimated Retention Curve</CardTitle>
                <CardDescription>An estimation of how well you retain information over time.</CardDescription>
            </CardHeader>
            <CardContent>
                <RetentionCurve days={retentionCurve.days} retention={retentionCurve.retention} />
            </CardContent>
        </Card>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Deck Engagement</CardTitle>
                    <CardDescription>Your accuracy across different decks.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DeckEngagement stats={deckEngagement} />
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Tag Performance</CardTitle>
                    <CardDescription>Performance breakdown by the tags you've assigned.</CardDescription>
                </CardHeader>
                <CardContent>
                   <TagPerformance data={tagPerformance} />
                </CardContent>
            </Card>
        </div>

         <Card>
            <CardHeader>
                <CardTitle>Card Difficulty Index</CardTitle>
                <CardDescription>The cards you find most difficult, based on ease factor.</CardDescription>
            </CardHeader>
            <CardContent>
                <CardDifficultyIndex cards={cardDifficulty} />
            </CardContent>
        </Card>
    </div>
  );
}


export default function FlashcardsPage() {
  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-5xl space-y-6">
            <Tabs defaultValue="decks" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="decks">
                    <Layers className="mr-2 h-4 w-4" /> Decks
                </TabsTrigger>
                <TabsTrigger value="stats">
                    <BarChart2 className="mr-2 h-4 w-4" /> Statistics
                </TabsTrigger>
              </TabsList>
              <TabsContent value="decks" className="mt-6">
                <FlashcardDecks />
              </TabsContent>
              <TabsContent value="stats" className="mt-6">
                <StatsView />
              </TabsContent>
            </Tabs>
        </div>
      </main>
    </>
  );
}
