
'use client';

import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Book, BarChart3, FlaskConical, Target, GraduationCap, Layers, Library, Search, Play, FileText, Bookmark, Edit, Trash2, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import Link from 'next/link';
import { 
    SelfQuizCreator, CornellNotesEditor, MindMapTool, SmartGoalWizard, TeachBackRecorder, 
    ExamSimulator, InterleavingPlanner, SmartHighlightExporter, StudyBreakOptimizer, DistractionLog 
} from '@/components/study/tools';
import { 
    ActiveRecallGuide, SpacedRepetitionGuide, CornellNotesGuide, InterleavingGuide, SmartGoalSettingGuide,
    FeynmanTechniqueGuide, ExamPreparationGuide, EffectiveMindMappingGuide, ActiveReadingStrategiesGuide, TimeManagementGuide
} from '@/components/study/guides';
import {
    StudyTimeTracker, RetentionRateTracker, GoalCompletionTracker, QuizAccuracyTracker, InterleavingSessionStats,
    MindMapActivityTracker, FocusDistractionRatioTracker, FeynmanTeachBackPerformanceTracker, ExamReadinessTracker, ConsistencyStreakTracker
} from '@/components/study/trackers';
import { useState, useMemo, useEffect } from 'react';
import { useLibraryStore } from '@/hooks/use-library-store';
import { useHydratedJournalStore } from '@/hooks/use-journal';
import { cn } from '@/lib/utils';
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
import { FlashcardDecks } from '@/components/flashcards/flashcard-decks';
import { processReviewData, generateMockTestingReviews } from '@/components/stats/utils';
import type { ReviewEvent } from '@/types/stats';
import { StudySessions } from '@/components/stats/StudySessions';
import { ReviewQuality } from '@/components/stats/ReviewQuality';
import { RetentionCurve } from '@/components/stats/RetentionCurve';
import { DeckEngagement } from '@/components/stats/DeckEngagement';
import { CardDifficultyIndex } from '@/components/stats/CardDifficultyIndex';
import { ProgressTimeline } from '@/components/stats/ProgressTimeline';
import { StreakSystem } from '@/components/stats/StreakSystem';
import { TagPerformance } from '@/components/stats/TagPerformance';
import { Separator } from '@/components/ui/separator';
import { useStatsStore } from '@/hooks/use-stats-store';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

function StatsView() {
    const { reviews } = useStatsStore();
    const { cards, decks } = useFlashcardStore();

    const stats = useMemo(() => {
        const reviewData = reviews.length > 0 ? reviews : generateMockTestingReviews(cards, decks);
        if(reviewData.length === 0) return null;
        return processReviewData(reviewData, cards, decks);
    }, [reviews, cards, decks]);

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

const toolTrackerPairs = [
    { tool: <SelfQuizCreator />, tracker: <QuizAccuracyTracker /> },
    { tool: <CornellNotesEditor />, tracker: <RetentionRateTracker /> },
    { tool: <MindMapTool />, tracker: <MindMapActivityTracker /> },
    { tool: <SmartGoalWizard />, tracker: <GoalCompletionTracker /> },
    { tool: <TeachBackRecorder />, tracker: <FeynmanTeachBackPerformanceTracker /> },
    { tool: <ExamSimulator />, tracker: <ExamReadinessTracker /> },
    { tool: <InterleavingPlanner />, tracker: <InterleavingSessionStats /> },
    { tool: <SmartHighlightExporter />, tracker: <ConsistencyStreakTracker /> },
    { tool: <StudyBreakOptimizer />, tracker: <StudyTimeTracker /> },
    { tool: <DistractionLog />, tracker: <FocusDistractionRatioTracker /> },
];

export default function StudyPage() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const savedState = localStorage.getItem('study-hub-collapsible-state');
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState));
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    localStorage.setItem('study-hub-collapsible-state', JSON.stringify(open));
  };


  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <Collapsible open={isOpen} onOpenChange={handleOpenChange} className="space-y-4">
            <div className="flex justify-between items-start">
              <CollapsibleContent asChild>
                  <div className="flex flex-col items-center text-center flex-grow">
                      <GraduationCap className="mx-auto h-12 w-12 text-primary mb-2"/>
                      <h1 className="text-4xl font-bold font-headline">Study Hub</h1>
                      <p className="text-lg text-muted-foreground">Learn, practice, and track your study methods.</p>
                  </div>
              </CollapsibleContent>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="h-6 w-6 transition-transform duration-300 data-[state=open]:rotate-180" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
          </Collapsible>
          
          <Tabs defaultValue="decks" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="decks"><Layers className="mr-2 h-4 w-4" /> Decks & Stats</TabsTrigger>
              <TabsTrigger value="study-tools"><FlaskConical className="mr-2 h-4 w-4" /> Study Tools</TabsTrigger>
              <TabsTrigger value="guides"><Book className="mr-2 h-4 w-4" /> Guides</TabsTrigger>
            </TabsList>
            
            <TabsContent value="decks" className="mt-6 space-y-6">
              <FlashcardDecks />
              <Separator />
              <StatsView />
            </TabsContent>
            <TabsContent value="study-tools" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {toolTrackerPairs.map((pair, index) => (
                   <Card key={index}>
                      {pair.tool}
                      <Separator className="my-4" />
                      <div className="px-6 pb-6">
                          {pair.tracker}
                      </div>
                  </Card>
                 ))}
              </div>
            </TabsContent>
            <TabsContent value="guides" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ActiveRecallGuide />
              <SpacedRepetitionGuide />
              <CornellNotesGuide />
              <InterleavingGuide />
              <SmartGoalSettingGuide />
              <FeynmanTechniqueGuide />
              <ExamPreparationGuide />
              <EffectiveMindMappingGuide />
              <ActiveReadingStrategiesGuide />
              <TimeManagementGuide />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
