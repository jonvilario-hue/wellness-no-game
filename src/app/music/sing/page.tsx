
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Music, 
  Waves, BookOpen, Play, 
  ChevronRight, History, Star
} from 'lucide-react';
import { initDB } from '@/lib/storage/db';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const exercises = [
  { 
    id: 'pitch-match', 
    name: 'Pitch Match', 
    desc: 'Match the note you hear using your voice.', 
    difficulty: 'Beginner', 
    icon: Target 
  },
  { 
    id: 'interval-sing', 
    name: 'Interval Sing-Back', 
    desc: 'Sing the specific interval above a heard root note.', 
    difficulty: 'Intermediate', 
    icon: Music 
  },
  { 
    id: 'melody-echo', 
    name: 'Melody Echo', 
    desc: 'Listen to a short melody and sing it back from memory.', 
    difficulty: 'Intermediate', 
    icon: Waves 
  },
  { 
    id: 'sight-singing', 
    name: 'Sight-Singing', 
    desc: 'Perform musical phrases from notation without assistance.', 
    difficulty: 'Advanced', 
    icon: BookOpen 
  },
];

export default function SingHub() {
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

  const getStats = (id: string) => {
    const sessions = history.filter(s => s.gameName === id);
    return {
      count: sessions.length,
      best: sessions.length > 0 ? Math.max(...sessions.map(s => s.score)) : null,
      last: sessions.length > 0 ? format(new Date(sessions[sessions.length - 1].date), 'MMM d') : 'New'
    };
  };

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/music"><ArrowLeft className="w-5 h-5" /></Link>
        </Button>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Singing Domain</h1>
          <p className="text-muted-foreground">Train your vocal cords and auditory perception.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {exercises.map((ex) => {
          const stats = getStats(ex.id);
          return (
            <Link key={ex.id} href={`/music/sing/${ex.id}`}>
              <Card className="relative overflow-hidden transition-all group border-primary/10 hover:border-primary/30 hover:shadow-lg cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <ex.icon className="w-8 h-8" />
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-bold">{ex.name}</h2>
                        <Badge variant="secondary" className={cn(
                          "text-[10px] font-black px-2",
                          ex.difficulty === 'Beginner' && "bg-emerald-500/10 text-emerald-600",
                          ex.difficulty === 'Intermediate' && "bg-amber-500/10 text-amber-600",
                          ex.difficulty === 'Advanced' && "bg-rose-500/10 text-rose-600"
                        )}>
                          {ex.difficulty}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{ex.desc}</p>
                      
                      <div className="flex items-center gap-4 mt-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        <span className="flex items-center gap-1"><History className="w-3 h-3" /> {stats.count} Sessions</span>
                        {stats.best !== null && <span className="flex items-center gap-1 text-primary"><Star className="w-3 h-3 fill-current" /> Best: {stats.best}</span>}
                        <span>Last: {stats.last}</span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
