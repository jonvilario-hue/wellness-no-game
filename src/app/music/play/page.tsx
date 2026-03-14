
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  ArrowLeft, Guitar, BookOpen, Music, 
  ChevronRight, History, Piano, LayoutGrid
} from 'lucide-react';
import { initDB } from '@/lib/storage/db';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { InputSelector } from '@/components/audio/InputSelector';
import { InstrumentSelector } from '@/components/audio/InstrumentSelector';

const exercises = [
  { 
    id: 'transcription', 
    name: 'Transcription Challenge', 
    desc: 'Hear a phrase, play it back on your instrument.', 
    difficulty: 'Intermediate', 
    icon: BookOpen 
  },
  { 
    id: 'call-response', 
    name: 'Call & Response', 
    desc: 'Trade musical phrases with the lab in real-time.', 
    difficulty: 'Intermediate', 
    icon: Music 
  },
  { 
    id: 'scale-drill', 
    name: 'Scale Drill', 
    desc: 'Play scales and chords on demand.', 
    difficulty: 'Beginner', 
    icon: Piano 
  },
];

export default function PlayHub() {
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
    const sessions = history.filter(s => s.gameName === `play-${id}`);
    return {
      count: sessions.length,
      last: sessions.length > 0 ? format(new Date(sessions[sessions.length - 1].date), 'MMM d') : 'New'
    };
  };

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b pb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="/music"><ArrowLeft className="w-5 h-5" /></Link>
          </Button>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">Instrument Domain</h1>
            <p className="text-muted-foreground">Develop your ears through your physical hardware.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <InputSelector />
          <InstrumentSelector />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {exercises.map((ex) => {
          const stats = getStats(ex.id);
          return (
            <Link key={ex.id} href={`/music/play/${ex.id}`}>
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
