
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { drillsData } from '@/data/music-drills';
import { useMusicStore } from '@/hooks/use-music-store';
import { MusicAnalytics } from './MusicAnalytics';
import { MusicDrillPlayer } from './MusicDrillPlayer';
import { TodayScheduleWidget } from './TodayScheduleWidget';
import { MusicOpenPractice } from './MusicOpenPractice';
import { MusicSongAnalysis } from './MusicSongAnalysis';
import { WellnessActivityCalendar } from './WellnessActivityCalendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Music, Headphones, Mic2, Guitar, Sparkles,
  Target, BookOpen, Waves, Zap, History,
  ChevronRight, Play, Clock, Piano, Mic,
  Library, Book, MessageSquare, Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { initDB } from '@/lib/storage/db';
import { format } from 'date-fns';
import Link from 'next/link';
import { InputSelector } from '../audio/InputSelector';
import { InstrumentSelector } from '../audio/InstrumentSelector';
import { musicReferences } from '@/data/music-references';
import { MusicReferenceCard } from './MusicReferenceCard';
import { AssistantTooltip } from '../assistant-tooltip';

const categoryExercises = {
  listen: [
    ...drillsData.map(d => ({ ...d, type: 'drill' as const })),
  ],
  sing: [
    { id: 'melody-echo', name: 'Melody Echo', desc: 'Train your pitch memory from raw tone sequences up through full melodic phrases.', difficulty: 'Beginner/Int/Adv', icon: Waves, type: 'game' as const, path: '/music/sing/melody-echo' },
    { id: 'sight-singing', name: 'Sight-Singing', desc: 'Perform phrases from notation without hearing it.', difficulty: 'Advanced', icon: BookOpen, type: 'game' as const, path: '/music/sing/sight-singing' },
  ],
  play: [
    { id: 'transcription', name: 'Transcription Challenge', desc: 'Hear a phrase, play it back on your instrument.', difficulty: 'Intermediate', icon: BookOpen },
    { id: 'call-response', name: 'Call & Response', desc: 'Trade musical phrases with the lab in real-time.', difficulty: 'Intermediate', icon: Music },
    { id: 'scale-drill', name: 'Scale Drill', desc: 'Play scales and chords on demand.', difficulty: 'Beginner', icon: Piano },
  ],
  freeflow: [
    { id: 'lyrical-spontaneity', name: 'Lyrical Spontaneity', desc: 'Respond to random word prompts and stay in motion. No right answers.', difficulty: 'Intermediate', icon: MessageSquare, type: 'game' as const, path: '/music/freeflow/lyrical-spontaneity' },
    { id: 'vocal-improv', name: 'Melodic Freeflow', desc: 'Improvise melodies or hum freely over chord progressions. Ride the harmony.', difficulty: 'Intermediate', icon: Mic, type: 'game' as const, path: '/music/freeflow/vocal-improv' },
    { id: 'freestyle', name: 'The Cypher', desc: 'The open sandbox. Grab a beat and flow. No scoring, just creative energy.', difficulty: 'All Levels', icon: Sparkles, type: 'game' as const, path: '/music/freeflow/freestyle' },
    { id: 'flow-trainer', name: 'Flow Pattern Lab', desc: 'Match cadences, triplet flows, and syncopation patterns over a beat.', difficulty: 'Intermediate', icon: Zap, type: 'game' as const, path: '/music/freeflow/flow-trainer' },
  ]
};

export default function MusicContent() {
  const { logs, _hasHydrated } = useMusicStore();
  const [activeDrillId, setActiveDrillId] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const activeSubTab = searchParams.get('sub') || 'listen';

  useEffect(() => {
    async function load() {
      try {
        const db = await initDB();
        const sessions = await db.getAll('sessions');
        setHistory(sessions);
      } catch (e) {}
    }
    load();
  }, []);

  const handleSubTabChange = (val: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sub', val);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const getStats = (id: string, prefix?: string) => {
    const gameId = prefix ? `${prefix}-${id}` : id;
    const gameSessions = history.filter(s => {
        const sName = s.gameName?.toLowerCase().replace(/ /g, '-');
        return sName === gameId || s.gameName === id;
    });
    if (gameSessions.length === 0) return { lastPlayed: 'New', bestScore: null };
    const sorted = [...gameSessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const best = Math.max(...gameSessions.map(s => s.score || 0));
    return {
      lastPlayed: format(new Date(sorted[0].date), 'MMM d'),
      bestScore: best
    };
  };

  if (activeDrillId) {
    return <MusicDrillPlayer drillId={activeDrillId} onClose={() => setActiveDrillId(null)} subtab={activeSubTab} />;
  }

  if (!_hasHydrated) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <Tabs value={activeSubTab} onValueChange={handleSubTabChange} className="w-full">
        <div className="flex justify-center mb-8 overflow-x-auto no-scrollbar">
          <TabsList className="flex w-full max-w-2xl h-auto bg-muted/50 p-1 min-w-max gap-1">
            <AssistantTooltip text="The analytical hub. Focus on auditory decoding—identifying intervals, chords, and rhythmic patterns by ear using math-based DSP detection.">
              <TabsTrigger value="listen" className="gap-2 px-8 font-bold uppercase text-[10px] py-2 flex-1">
                <Headphones className="w-4 h-4" /> Listen
              </TabsTrigger>
            </AssistantTooltip>
            <AssistantTooltip text="The vocal laboratory. Master pitch matching and melodic recall. Calibration here adjusts the math to handle vocal 'formants' and breathing patterns.">
              <TabsTrigger value="sing" className="gap-2 px-8 font-bold uppercase text-[10px] py-2 flex-1">
                <Mic2 className="w-4 h-4" /> Vocals
              </TabsTrigger>
            </AssistantTooltip>
            <AssistantTooltip text="The mechanical hub. Bridge theory and mechanics by practicing specific scales and construction drills on your physical instrument.">
              <TabsTrigger value="play" className="gap-2 px-8 font-bold uppercase text-[10px] py-2 flex-1">
                <Guitar className="w-4 h-4" /> Instrumentals
              </TabsTrigger>
            </AssistantTooltip>
            <AssistantTooltip text="The spontaneous hub. Improvise melodies and flow over beats with no 'correct' answers—pure creative generation.">
              <TabsTrigger value="freeflow" className="gap-2 px-8 font-bold uppercase text-[10px] py-2 flex-1">
                <Sparkles className="w-4 h-4" /> Freeflow
              </TabsTrigger>
            </AssistantTooltip>
          </TabsList>
        </div>

        <TabsContent value="listen" className="space-y-8 animate-in fade-in">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryExercises.listen.map((item) => {
              const gameSessions = logs.filter(l => l.drillName === item.name);
              const stats = gameSessions.length === 0 
                ? { lastPlayed: 'New', bestScore: null }
                : { 
                    lastPlayed: format(new Date(gameSessions[0].timestamp), 'MMM d'),
                    bestScore: Math.max(...gameSessions.map(l => l.har))
                  };

              return (
                <Card 
                  key={item.id} 
                  className="h-full border-primary/5 hover:border-primary/30 transition-all group flex flex-col cursor-pointer"
                  onClick={() => setActiveDrillId(item.id)}
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <Music className="w-5 h-5" />
                      </div>
                      <Badge variant="outline" className="uppercase text-[8px] font-black px-2">Drill</Badge>
                    </div>
                    <CardTitle className="text-sm font-bold group-hover:text-primary transition-colors">{item.name}</CardTitle>
                    <CardDescription className="text-[10px] leading-relaxed line-clamp-2 mt-1">{item.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-4 mt-auto border-t border-primary/5 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-muted-foreground uppercase opacity-60">Best HAR</span>
                      <span className="text-[10px] font-bold">{stats.bestScore ?? '--'}</span>
                    </div>
                    <Play className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-5px] group-hover:translate-x-0" />
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          <MusicAnalytics />
        </TabsContent>

        <TabsContent value="sing" className="space-y-12 animate-in fade-in">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryExercises.sing.map((item) => {
              const stats = getStats(item.id);
              return (
                <Link key={item.id} href={item.path}>
                  <Card className="h-full border-primary/5 hover:border-primary/30 transition-all group flex flex-col cursor-pointer bg-primary/[0.02]">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <Badge variant="secondary" className="uppercase text-[8px] font-black px-2">Performance</Badge>
                      </div>
                      <CardTitle className="text-sm font-bold group-hover:text-primary transition-colors">{item.name}</CardTitle>
                      <CardDescription className="text-[10px] leading-relaxed line-clamp-2 mt-1">{item.desc}</CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-4 mt-auto border-t border-primary/5 flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black text-muted-foreground uppercase opacity-60">Best Score</span>
                        <span className="text-[10px] font-bold">{stats.bestScore ?? '--'}</span>
                      </div>
                      <Play className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-5px] group-hover:translate-x-0" />
                    </CardFooter>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 px-1">
              <div className="h-8 w-1 bg-primary rounded-full" />
              <AssistantTooltip text="Guides for vocal health and resonance. These protocols focus on the physiological side of the instrument.">
                <h3 className="text-xl font-black uppercase tracking-tight">Vocal Techniques</h3>
              </AssistantTooltip>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {musicReferences.filter(r => r.category === 'Vocal Techniques').map(ref => (
                <MusicReferenceCard key={ref.id} entry={ref} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="play" className="space-y-12 animate-in fade-in">
          <AssistantTooltip text="This calibration uses deterministic Digital Signal Processing (DSP)—not AI—to ensure low-latency feedback. Distinguishing between instruments allows the math to adjust for different overtones and 'attacks' (how a note starts), ensuring that a Violin's bow noise or a Piano's sharp strike doesn't confuse the detection engine.">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 bg-muted/20 rounded-2xl border border-primary/5">
              <div className="space-y-1 text-center md:text-left">
                <h3 className="font-bold">Input Calibration</h3>
                <p className="text-xs text-muted-foreground">Select your instrument and connection method.</p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <InputSelector />
                <InstrumentSelector />
              </div>
            </div>
          </AssistantTooltip>

          <div className="space-y-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
              <Target className="w-3.5 h-3.5" /> Performance Drills
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryExercises.play.map((ex) => {
                const stats = getStats(ex.id, 'play');
                return (
                  <Link key={ex.id} href={`/music/play/${ex.id}`}>
                    <Card className="h-full relative overflow-hidden transition-all group border-primary/10 hover:border-primary/30 hover:shadow-lg cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-6">
                          <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            <ex.icon className="w-8 h-8" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                              <h2 className="text-lg font-bold truncate">{ex.name}</h2>
                              {stats.bestScore !== null && (
                                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-black text-[10px] h-5">
                                  PB: {stats.bestScore}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1">{ex.desc}</p>
                            <div className="flex items-center gap-4 mt-3 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                              <Badge variant="secondary" className="text-[10px] font-black px-2">{ex.difficulty}</Badge>
                              <span>Last: {stats.lastPlayed}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-all" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 px-1">
              <div className="h-8 w-1 bg-primary rounded-full" />
              <AssistantTooltip text="Tactical frameworks for how to learn effectively. These aren't drills, but recipes for high-efficiency practice sessions.">
                <h3 className="text-xl font-black uppercase tracking-tight">Practice Methods</h3>
              </AssistantTooltip>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {musicReferences.filter(r => r.category === 'Practice Methods').map(ref => (
                <MusicReferenceCard key={ref.id} entry={ref} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="freeflow" className="space-y-8 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryExercises.freeflow.map((ex) => {
              const stats = getStats(ex.id, 'freeflow');
              return (
                <Link key={ex.id} href={ex.path}>
                  <Card className="h-full relative overflow-hidden transition-all group border-primary/10 hover:border-primary/30 hover:shadow-lg cursor-pointer bg-primary/[0.02]">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          <ex.icon className="w-8 h-8" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-lg font-bold truncate">{ex.name}</h2>
                            {stats.bestScore !== null && (
                              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-black text-[10px] h-5">
                                PB: {stats.bestScore}
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground leading-relaxed text-xs">{ex.desc}</p>
                          <div className="flex items-center gap-4 mt-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            <Badge variant="secondary" className="text-[10px] font-black px-2">{ex.difficulty}</Badge>
                            <span>Last: {stats.lastPlayed}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AssistantTooltip text="The stopwatch for your unstructured practice. Log duration and focus for any instrument or vocal session.">
              <MusicOpenPractice />
            </AssistantTooltip>
            <AssistantTooltip text="Deconstruct the harmonic and formal architecture of any track. Paste a chord chart to start the analysis protocol.">
              <MusicSongAnalysis />
            </AssistantTooltip>
          </div>
        </TabsContent>
      </Tabs>

      <TodayScheduleWidget category="Music" />
      <WellnessActivityCalendar categoryFilter="Music" />
    </div>
  );
}
