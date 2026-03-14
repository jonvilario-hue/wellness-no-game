
'use client';

import { useMemo, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  ArrowLeft, Crosshair, Zap, Search, Music, 
  Waves, Brain, Timer, LayoutGrid, 
  ChevronRight, Mic2, FileAudio, Disc, 
  Volume2, GitGraph, Info
} from 'lucide-react';
import { initDB } from '@/lib/storage/db';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const games = [
  { id: 'interval-sniper', name: 'Interval Sniper', desc: 'Identify intervals by ear', difficulty: 'Beginner', icon: Crosshair },
  { id: 'note-flash', name: 'Note Flash', desc: 'Name notes as fast as you can', difficulty: 'Beginner', icon: Zap },
  { id: 'chord-detective', name: 'Chord Detective', desc: 'Identify chord types and qualities', difficulty: 'Beginner', icon: Search },
  { id: 'scale-runner', name: 'Scale Runner', desc: 'Recognize scales and modes', difficulty: 'Intermediate', icon: Disc },
  { id: 'rhythm-tap', name: 'Rhythm Tap', desc: 'Tap back rhythmic patterns', difficulty: 'Beginner', icon: Timer },
  { id: 'rhythm-reader', name: 'Rhythm Reader', desc: 'Read and perform rhythm notation', difficulty: 'Intermediate', icon: FileAudio },
  { id: 'melodic-memory', name: 'Melodic Memory', desc: 'Remember and repeat melodies', difficulty: 'Intermediate', icon: Brain },
  { id: 'tonal-recall', name: 'Tonal Recall', desc: 'Identify notes within a key', difficulty: 'Intermediate', icon: Target },
  { id: 'harmonic-anticipation', name: 'Harmonic Anticipation', desc: 'Predict the next chord', difficulty: 'Advanced', icon: GitGraph },
  { id: 'progression-decoder', name: 'Progression Decoder', desc: 'Identify full chord progressions', difficulty: 'Advanced', icon: Music },
  { id: 'timbre-lab', name: 'Timbre Lab', desc: 'Distinguish instrument timbres', difficulty: 'Intermediate', icon: Waves },
  { id: 'dynamic-ear', name: 'Dynamic Ear', desc: 'Detect volume and dynamic changes', difficulty: 'Beginner', icon: Volume2 },
  { id: 'form-mapper', name: 'Form Mapper', desc: 'Identify song structure and form', difficulty: 'Advanced', icon: LayoutGrid },
  { id: 'pitch-sharpener', name: 'Pitch Sharpener', desc: 'Fine-tune your pitch accuracy', difficulty: 'Intermediate', icon: Mic2 },
];

export default function ListenHub() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const db = await initDB();
        const sessions = await db.getAll('sessions');
        setHistory(sessions);
      } catch (e) {
        console.warn("Failed to load session history for hub", e);
      }
    }
    load();
  }, []);

  const getStats = (gameId: string) => {
    const gameSessions = history.filter(s => s.gameName?.toLowerCase().replace(/ /g, '-') === gameId);
    if (gameSessions.length === 0) return { lastPlayed: 'New', bestScore: null };
    
    const sorted = [...gameSessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const best = Math.max(...gameSessions.map(s => s.score));
    
    return {
      lastPlayed: format(new Date(sorted[0].date), 'MMM d'),
      bestScore: best
    };
  };

  return (
    <div className="container max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/music"><ArrowLeft className="w-5 h-5" /></Link>
        </Button>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Listen Hub</h1>
          <p className="text-muted-foreground">Auditory identification protocols.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map((game) => {
          const stats = getStats(game.id);
          return (
            <Link key={game.id} href={`/music/listen/${game.id}`}>
              <Card className="h-full border-primary/5 hover:border-primary/30 transition-all group flex flex-col">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <game.icon className="w-5 h-5" />
                    </div>
                    <Badge variant="secondary" className={cn(
                      "uppercase text-[8px] font-black px-2",
                      game.difficulty === 'Beginner' && "bg-emerald-500/10 text-emerald-600",
                      game.difficulty === 'Intermediate' && "bg-amber-500/10 text-amber-600",
                      game.difficulty === 'Advanced' && "bg-rose-500/10 text-rose-600"
                    )}>
                      {game.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-bold group-hover:text-primary transition-colors">{game.name}</CardTitle>
                  <CardDescription className="text-[10px] leading-relaxed line-clamp-2 mt-1">{game.desc}</CardDescription>
                </CardHeader>
                
                <CardFooter className="p-4 pt-4 mt-auto border-t border-primary/5 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-muted-foreground uppercase opacity-60">Last Session</span>
                    <span className="text-[10px] font-bold">{stats.lastPlayed}</span>
                  </div>
                  {stats.bestScore !== null && (
                    <div className="flex flex-col items-end">
                      <span className="text-[8px] font-black text-muted-foreground uppercase opacity-60">Best</span>
                      <span className="text-[10px] font-bold text-primary">{stats.bestScore}</span>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
