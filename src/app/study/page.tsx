
'use client';

import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Book, BarChart3, FlaskConical, Target, GraduationCap, Layers, Library, Search, Play, FileText, Bookmark, Edit, Trash2 } from 'lucide-react';
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
import { useState } from 'react';
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

function QuickAccessWidgets() {
    const { cards } = useFlashcardStore();
    const dueCardsCount = cards.filter(c => new Date(c.dueDate) <= new Date()).length;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Layers className="w-5 h-5 text-primary" />
                        Flashcard Hub
                    </CardTitle>
                    <CardDescription>Review your flashcards to reinforce your knowledge.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center gap-4">
                    <p className="text-6xl font-bold text-primary">{dueCardsCount}</p>
                    <p className="text-muted-foreground -mt-2">cards due for review</p>
                    <div className="flex gap-2">
                        <Button asChild size="lg" disabled={dueCardsCount === 0}>
                            <Link href="/flashcards/study">
                                <Play className="mr-2 h-4 w-4" /> Study Now
                            </Link>
                        </Button>
                        <Button asChild variant="secondary" size="lg">
                            <Link href="/flashcards">
                                Manage Decks
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center items-center">
                <CardHeader>
                     <CardTitle className="flex items-center gap-2">
                        <Library className="w-5 h-5 text-primary" />
                        Library Search
                    </CardTitle>
                    <CardDescription className="text-center">Find insights from your saved notes and journal entries.</CardDescription>
                </CardHeader>
                <CardContent className="w-full max-w-md">
                     <p className="text-xs text-center text-muted-foreground mt-2">Search notes, journal entries, and highlights.</p>
                </CardContent>
            </Card>
        </div>
    )
}

const ItemCard = ({ item, onToggleBookmark, onDelete }: { item: any, onToggleBookmark: (item: any) => void, onDelete: (item: any) => void }) => (
    <div key={item.id} className="group flex items-center p-4 border rounded-lg hover:bg-muted/50">
        <div className="flex-grow">
            <p className="font-bold">{item.title}</p>
            <p className="text-sm text-muted-foreground truncate max-w-lg">{item.description || item.content}</p>
            <p className="text-xs text-primary font-semibold mt-1">{item.source}</p>
        </div>
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
            <Button variant="ghost" size="icon" onClick={() => onToggleBookmark(item)}>
                <Bookmark className={cn("w-4 h-4", item.bookmarked ? 'text-primary fill-current' : '')} />
            </Button>
            {item.source === 'Library' && (
                <>
                    <Button variant="ghost" size="icon" disabled>
                        <Edit className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Delete Note?</AlertDialogTitle></AlertDialogHeader>
                        <AlertDialogDescription>Are you sure you want to delete this note? This action cannot be undone.</AlertDialogDescription>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDelete(item)} variant="destructive">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            )}
        </div>
    </div>
  )

export default function StudyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { items: libraryItems, deleteItem: deleteLibraryItem, toggleBookmark: toggleLibraryBookmark } = useLibraryStore();
  const { entries: journalEntries, toggleJournalBookmark } = useHydratedJournalStore();

  const allContent = [
      ...libraryItems.map(item => ({...item, source: 'Library'})),
      ...journalEntries.map(entry => ({
          id: entry.id,
          title: entry.label || entry.category,
          content: entry.field1 || entry.field2 || entry.field3 || 'No content',
          createdAt: entry.date,
          bookmarked: entry.bookmarked || false,
          source: 'Journal'
      }))
  ].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const filteredContent = searchTerm.trim() ? allContent.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const handleToggleBookmark = (item: any) => {
      if (item.source === 'Library') {
          toggleLibraryBookmark(item.id);
      } else {
          toggleJournalBookmark(item.id);
      }
  }

  const handleDeleteItem = (item: any) => {
      if (item.source === 'Library') {
          deleteLibraryItem(item.id);
      }
  }

  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
            <div className="text-center mb-8">
                <GraduationCap className="mx-auto h-12 w-12 text-primary mb-2"/>
                <h1 className="text-4xl font-bold font-headline">Study Hub</h1>
                <p className="text-lg text-muted-foreground">Learn, practice, and track your study methods.</p>
            </div>

            <div className="relative w-full max-w-2xl mx-auto mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search your knowledge base..." 
                    className="pl-12 h-14 text-lg" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            {searchTerm.trim() ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Search Results ({filteredContent.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         {filteredContent.length === 0 ? (
                             <div className="text-center py-16 border-2 border-dashed rounded-lg">
                                <p className="text-muted-foreground">No results found for "{searchTerm}".</p>
                            </div>
                        ) : (
                             <div className="space-y-4">
                                {filteredContent.map(item => <ItemCard key={item.id} item={item} onToggleBookmark={handleToggleBookmark} onDelete={handleDeleteItem} />)}
                            </div>
                        )}
                    </CardContent>
                </Card>
            ) : (
              <>
                <QuickAccessWidgets />
                <Tabs defaultValue="tools" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="tools">
                        <FlaskConical className="mr-2 h-4 w-4" /> Tools
                    </TabsTrigger>
                    <TabsTrigger value="guides">
                        <Book className="mr-2 h-4 w-4" /> Guides
                    </TabsTrigger>
                    <TabsTrigger value="trackers">
                        <BarChart3 className="mr-2 h-4 w-4" /> Trackers
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="tools" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <SelfQuizCreator />
                        <CornellNotesEditor />
                        <MindMapTool />
                        <SmartGoalWizard />
                        <TeachBackRecorder />
                        <ExamSimulator />
                        <InterleavingPlanner />
                        <SmartHighlightExporter />
                        <StudyBreakOptimizer />
                        <DistractionLog />
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

                  <TabsContent value="trackers" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <StudyTimeTracker />
                        <RetentionRateTracker />
                        <GoalCompletionTracker />
                        <QuizAccuracyTracker />
                        <InterleavingSessionStats />
                        <MindMapActivityTracker />
                        <FocusDistractionRatioTracker />
                        <FeynmanTeachBackPerformanceTracker />
                        <ExamReadinessTracker />
                        <ConsistencyStreakTracker />
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
        </div>
      </main>
    </>
  );
}
