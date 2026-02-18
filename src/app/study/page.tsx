'use client';

import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { useScholarStore } from '@/hooks/use-scholar-store';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { useStudyDashboardStore } from '@/hooks/use-study-dashboard-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, Layers, HelpCircle, PenTool, TrendingUp, Sparkles, 
  BookOpen, GraduationCap, ChevronRight, Zap, Inbox, BarChart3,
  ChevronUp, ChevronDown, Target, ShieldAlert, History, CalendarDays, LayoutDashboard, Cloud
} from 'lucide-react';
import Link from 'next/link';
import { VisualPairingTool } from '@/components/study/visual-pairing-tool';
import { ForgettingCurveVisualizer } from '@/components/study/forgetting-curve-tool';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { FlashcardDecks } from '@/components/flashcards/flashcard-decks';
import { 
  ActiveRecallGuide, 
  SpacedRepetitionGuide, 
  CornellNotesGuide, 
  InterleavingGuide, 
  SmartGoalSettingGuide, 
  FeynmanTechniqueGuide, 
  ExamPreparationGuide, 
  EffectiveMindMappingGuide, 
  ActiveReadingStrategiesGuide, 
  TimeManagementGuide 
} from '@/components/study/guides';
import { SelfQuizCreator, DistractionLog } from '@/components/study/tools';
import { StudyDashboardView } from '@/components/study/study-dashboard-view';
import { AssistantTooltip } from '@/components/assistant-tooltip';
import { AnkiDeckUploader } from '@/components/study/anki-deck-uploader';
import { AnkiDeckList } from '@/components/study/anki-deck-list';

export default function ScholarHub() {
  const { sessions, visualPairs } = useScholarStore();
  const { cards } = useFlashcardStore();
  const { getStreak } = useStudyDashboardStore();
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedState = localStorage.getItem('scholar-hub-collapsible-state');
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState));
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    localStorage.setItem('scholar-hub-collapsible-state', JSON.stringify(open));
  };

  const toolCards = [
    {
      id: 'quiz',
      title: 'Self-Quiz Creator',
      desc: 'Generate procedural quizzes from your notes.',
      icon: HelpCircle,
      stat: 'Interactive Prep',
      link: '#quiz',
      tooltip: "Turn passive notes into active testing. Research shows self-testing is significantly more effective than re-reading."
    },
    {
      id: 'visual',
      title: 'Dual Coding',
      desc: 'Pair text with sketches for memory.',
      icon: PenTool,
      stat: `${visualPairs.length} Pairs Created`,
      link: '#visual',
      tooltip: "The Dual Coding theory suggests that combining verbal and visual information creates two distinct mental representations, doubling your chances of recall."
    },
    {
      id: 'curve',
      title: 'Retention Forecast',
      desc: 'Visualize knowledge decay.',
      icon: TrendingUp,
      stat: 'Predictive Map',
      link: '#curve',
      tooltip: "Based on Ebbinghaus's Forgetting Curve. This tool predicts when you will forget information, allowing you to review just in time."
    }
  ];

  const aggregateStats = useMemo(() => {
    if (!isMounted) return { currentStreak: 0, avgFocus: '0' };
    const streak = getStreak();
    const avgFocus = sessions.length > 0 
      ? (sessions.reduce((acc, s) => acc + s.focus, 0) / sessions.length).toFixed(1)
      : '0';
    return { currentStreak: streak.current, avgFocus };
  }, [sessions, getStreak, isMounted]);

  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          
          <div className="flex flex-col gap-4">
            <Collapsible open={isOpen} onOpenChange={handleOpenChange} className="w-full">
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <CollapsibleContent>
                    <div className="flex flex-col items-center text-center pb-4">
                      <div className="p-3 bg-primary/10 rounded-full mb-3">
                        <GraduationCap className="h-10 w-10 text-primary"/>
                      </div>
                      <AssistantTooltip text="Evidence-backed study center. Combine active recall, spaced repetition, and mental models to accelerate your learning.">
                        <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">Scholar Hub</h1>
                      </AssistantTooltip>
                      <p className="text-lg text-muted-foreground max-w-2xl">Evidence-backed strategies meets interactive learning tools. Train your mind like a polymath.</p>
                    </div>
                  </CollapsibleContent>
                </div>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {isOpen ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
            </Collapsible>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <AssistantTooltip text="Consistency is the primary driver of neuroplasticity. Keep your streak alive!">
                <Card className="bg-primary/5 border-primary/10">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <Zap className="w-5 h-5 text-primary mb-1" />
                    <p className="text-2xl font-black">{aggregateStats.currentStreak}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Study Streak</p>
                  </CardContent>
                </Card>
              </AssistantTooltip>
              <AssistantTooltip text="Your average focus rating for study sessions. High-intensity focus sessions are more effective for encoding memories than long, distracted blocks.">
                <Card className="bg-primary/5 border-primary/10">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <Target className="w-5 h-5 text-primary mb-1" />
                    <p className="text-2xl font-black">{aggregateStats.avgFocus}/10</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Avg focus rating</p>
                  </CardContent>
                </Card>
              </AssistantTooltip>
              <AssistantTooltip text="The total number of individual concepts saved in your memory vault. These are cards scheduled for Spaced Repetition review.">
                <Card className="bg-primary/5 border-primary/10">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <Layers className="w-5 h-5 text-primary mb-1" />
                    <p className="text-2xl font-black">{cards.length}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total Flashcards</p>
                  </CardContent>
                </Card>
              </AssistantTooltip>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8 overflow-x-auto no-scrollbar">
              <TabsList className="flex w-full max-w-3xl h-auto bg-muted/50 p-1 min-w-max">
                <TabsTrigger value="dashboard" className="gap-2 px-6 font-bold">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </TabsTrigger>
                <TabsTrigger value="decks" className="gap-2 px-6 font-bold">
                  <Layers className="h-4 w-4" /> Decks
                </TabsTrigger>
                <TabsTrigger value="anki" className="gap-2 px-6 font-bold">
                  <Cloud className="h-4 w-4" /> Anki Vault
                </TabsTrigger>
                <TabsTrigger value="tools" className="gap-2 px-6 font-bold">
                  <Zap className="h-4 w-4" /> Tools
                </TabsTrigger>
                <TabsTrigger value="guides" className="gap-2 px-6 font-bold">
                  <BookOpen className="h-4 w-4" /> Guides
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="dashboard" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <StudyDashboardView />
            </TabsContent>

            <TabsContent value="decks" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <FlashcardDecks />
            </TabsContent>

            <TabsContent value="anki" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <AnkiDeckUploader />
              <AnkiDeckList />
            </TabsContent>

            <TabsContent value="tools" className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {toolCards.map(tool => (
                  <AssistantTooltip key={tool.id} text={tool.tooltip}>
                    <Card className="hover:shadow-md transition-all group border-primary/10 h-full">
                      <CardHeader className="pb-2">
                        <div className="p-2 bg-primary/10 rounded-lg w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <tool.icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg mt-4">{tool.title}</CardTitle>
                        <CardDescription className="text-xs">{tool.desc}</CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-4 flex justify-between items-center border-t border-primary/5">
                        <Badge variant="secondary" className="font-bold text-[10px]">{tool.stat}</Badge>
                        <Button variant="ghost" size="sm" asChild className="h-8 px-2 hover:bg-primary/10">
                          <Link href={tool.link}>Launch <ChevronRight className="ml-1 h-3 w-3"/></Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </AssistantTooltip>
                ))}
              </div>

              <div className="space-y-20 pt-4">
                <section id="quiz" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <SelfQuizCreator />
                  <DistractionLog />
                </section>

                <section id="visual" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-1 bg-primary rounded-full" />
                    <h2 className="text-2xl font-black tracking-tight uppercase">Visual Pairing Tool</h2>
                  </div>
                  <VisualPairingTool />
                </section>

                <section id="curve" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-1 bg-primary rounded-full" />
                    <h2 className="text-2xl font-black tracking-tight uppercase">Forgetting Curve Visualizer</h2>
                  </div>
                  <ForgettingCurveVisualizer />
                </section>
              </div>
            </TabsContent>

            <TabsContent value="guides" className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <ActiveRecallGuide />
              <SpacedRepetitionGuide />
              <CornellNotesGuide />
              <FeynmanTechniqueGuide />
              <InterleavingGuide />
              <EffectiveMindMappingGuide />
              <SmartGoalSettingGuide />
              <ActiveReadingStrategiesGuide />
              <TimeManagementGuide />
              <ExamPreparationGuide />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
