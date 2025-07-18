'use client';

import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Book, BarChart3, FlaskConical, Target, GraduationCap } from 'lucide-react';
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

export default function StudyPage() {
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
        </div>
      </main>
    </>
  );
}