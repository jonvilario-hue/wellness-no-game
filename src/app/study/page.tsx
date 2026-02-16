'use client';

import { useScholarStore } from '@/hooks/use-scholar-store';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Layers, HelpCircle, PenTool, TrendingUp, Sparkles, BookOpen, GraduationCap, ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { LeitnerBoxManager } from '@/components/study/leitner-box-manager';
import { VisualPairingTool } from '@/components/study/visual-pairing-tool';
import { ForgettingCurveVisualizer } from '@/components/study/forgetting-curve-tool';
import { useMemo } from 'react';

export default function ScholarHub() {
  const { whyChains, visualPairs, sessions, explanations, examples } = useScholarStore();
  const { cards } = useFlashcardStore();

  const toolCards = [
    {
      id: 'leitner',
      title: 'Leitner Box Manager',
      desc: 'Spaced repetition system with 5-box logic.',
      icon: Inbox,
      stat: `${cards.filter(c => c.repetitions === 4).length} Mastered`,
      link: 'leitner'
    },
    {
      id: 'visual',
      title: 'Visual Pairing Tool',
      desc: 'Combine text and sketches for dual coding.',
      icon: PenTool,
      stat: `${visualPairs.length} Pairs Created`,
      link: 'visual'
    },
    {
      id: 'curve',
      title: 'Forgetting Curve',
      desc: 'Visualize retention decay and stability.',
      icon: TrendingUp,
      stat: 'Predictive Map',
      link: 'curve'
    },
    {
      id: 'insights',
      title: 'Session Insights',
      desc: 'Focus trends and tool effectiveness.',
      icon: BarChart3,
      stat: `${sessions.length} Sessions`,
      link: 'insights'
    }
  ];

  const guideCards = [
    { id: 'leitner', title: 'Leitner System', desc: 'Organizational flashcard method.' },
    { id: 'interrogation', title: 'Elaborative Interrogation', desc: 'Ask why & how questions.' },
    { id: 'dual-coding', title: 'Dual Coding', desc: 'Verbal + Visual integration.' },
    { id: 'retrieval', title: 'Retrieval Practice', desc: 'Active recall vs. reading.' },
    { id: 'explanation', title: 'Self-Explanation', desc: 'Step-by-step reasoning.' }
  ];

  const aggregateStats = useMemo(() => {
    const month = new Date().getMonth();
    const sessionsThisMonth = sessions.filter(s => new Date(s.timestamp).getMonth() === month).length;
    const avgFocus = sessions.length > 0 
      ? (sessions.reduce((acc, s) => acc + s.focus, 0) / sessions.length).toFixed(1)
      : '0';
    return { sessionsThisMonth, avgFocus };
  }, [sessions]);

  return (
    <div className="space-y-8 pb-20">
      {/* Aggregate Banner */}
      <div className="bg-indigo-600 rounded-2xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <h1 className="text-4xl font-black tracking-tight">Scholar Hub</h1>
          <p className="text-indigo-100 max-w-md">Evidence-backed strategies meets interactive learning tools.</p>
        </div>
        <div className="flex gap-8 relative z-10">
          <div className="text-center">
            <p className="text-3xl font-black">{aggregateStats.sessionsThisMonth}</p>
            <p className="text-[10px] uppercase font-bold text-indigo-200">Sessions / Month</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black">{aggregateStats.avgFocus}/10</p>
            <p className="text-[10px] uppercase font-bold text-indigo-200">Avg Focus</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black">{cards.length}</p>
            <p className="text-[10px] uppercase font-bold text-indigo-200">Total Cards</p>
          </div>
        </div>
        <Zap className="absolute -bottom-10 -right-10 w-64 h-64 text-indigo-500 opacity-20 rotate-12" />
      </div>

      <Tabs defaultValue="tools" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 bg-muted/50 p-1">
          <TabsTrigger value="tools" className="gap-2">
            <Zap className="h-4 w-4" /> Study Tools
          </TabsTrigger>
          <TabsTrigger value="guides" className="gap-2">
            <BookOpen className="h-4 w-4" /> Learning Guides
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {toolCards.map(tool => (
              <Card key={tool.id} className="hover:shadow-lg transition-all group border-indigo-100/50">
                <CardHeader className="pb-2">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg w-fit group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg mt-4">{tool.title}</CardTitle>
                  <CardDescription className="text-xs">{tool.desc}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-4 flex justify-between items-center border-t border-indigo-50 dark:border-indigo-950/20">
                  <Badge variant="secondary" className="font-bold text-[10px]">{tool.stat}</Badge>
                  <Button variant="ghost" size="sm" asChild className="h-8 px-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/30">
                    <Link href={`#${tool.id}`}>Launch <ChevronRight className="ml-1 h-3 w-3"/></Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="space-y-20 pt-10">
            <section id="leitner" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-1 bg-indigo-600 rounded-full" />
                <h2 className="text-2xl font-black tracking-tight">Leitner Box Manager</h2>
              </div>
              <LeitnerBoxManager />
            </section>

            <section id="visual" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-1 bg-indigo-600 rounded-full" />
                <h2 className="text-2xl font-black tracking-tight">Visual Pairing Tool</h2>
              </div>
              <VisualPairingTool />
            </section>

            <section id="curve" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-1 bg-indigo-600 rounded-full" />
                <h2 className="text-2xl font-black tracking-tight">Forgetting Curve Visualizer</h2>
              </div>
              <ForgettingCurveVisualizer />
            </section>
          </div>
        </TabsContent>

        <TabsContent value="guides" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guideCards.map(guide => (
            <Card key={guide.id} className="hover:border-indigo-300 transition-all flex flex-col h-full">
              <CardHeader>
                <CardTitle>{guide.title}</CardTitle>
                <CardDescription>{guide.desc}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="p-4 bg-muted/30 rounded-lg text-xs italic text-muted-foreground">
                  Includes research citations from Dunlosky et al. (2013).
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">Read Guide</Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { Inbox, BarChart3, Separator } from 'lucide-react';
