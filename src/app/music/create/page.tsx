
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  ArrowLeft, Mic, Zap, Drum, 
  Sparkles, ChevronRight, History
} from 'lucide-react';
import { initDB } from '@/lib/storage/db';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const exercises = [
  { 
    id: 'vocal-improv', 
    name: 'Vocal Improv', 
    desc: 'Improvise melodies over adaptive chord changes.', 
    difficulty: 'Intermediate', 
    icon: Mic 
  },
  { 
    id: 'flow-trainer', 
    name: 'Flow Trainer', 
    desc: 'Ride the beat with rhythmic precision.', 
    difficulty: 'Intermediate', 
    icon: Zap 
  },
  { 
    id: 'beatbox-lab', 
    name: 'Beatbox Lab', 
    desc: 'Create complex drum patterns with your voice.', 
    difficulty: 'Beginner', 
    icon: Drum 
  },
  { 
    id: 'freestyle', 
    name: 'Freestyle Sandbox', 
    desc: 'Open creative space with real-time analytics.', 
    difficulty: 'All Levels', 
    icon: Sparkles 
  },
];

export default function CreateHub() {
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
    const sessions = history.filter(s => s.gameName === `create-${id}`);
    return {
      count: sessions.length,
      last: sessions.length > 0 ? format(new Date(sessions[sessions.length - 1].date), 'MMM d') : 'New'
    };
  };

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-10 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/music"><ArrowLeft className="w-5 h-5" /></Link>
        </Button>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Creation Domain</h1>
          <p className="text-muted-foreground">Master the art of real-time musical expression.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {exercises.map((ex) => {
          const stats = getStats(ex.id);
          return (
            <Link key={ex.id} href={`/music/create/${ex.id}`}>
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
                          ex.difficulty === 'All Levels' && "bg-primary/10 text-primary"
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
