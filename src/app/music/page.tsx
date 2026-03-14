
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Headphones, Mic2, Wind, Guitar, Sparkles, ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  {
    id: 'listen',
    name: 'Listen',
    desc: 'Identify intervals, chords, scales & more',
    icon: Headphones,
    count: 14,
    status: 'ACTIVE',
    href: '/music/listen'
  },
  {
    id: 'sing',
    name: 'Sing',
    desc: 'Train your voice with pitch exercises',
    icon: Mic2,
    count: 4,
    status: 'ACTIVE',
    href: '/music/sing'
  },
  {
    id: 'voice',
    name: 'Voice',
    desc: 'Build breath, range & vocal control',
    icon: Wind,
    count: 4,
    status: 'ACTIVE',
    href: '/music/voice'
  },
  {
    id: 'play',
    name: 'Play',
    desc: 'Practice your instrument by ear',
    icon: Guitar,
    count: 3,
    status: 'ACTIVE',
    href: '/music/play'
  },
  {
    id: 'create',
    name: 'Create',
    desc: 'Improvise, freestyle & beatbox',
    icon: Sparkles,
    count: 4,
    status: 'ACTIVE',
    href: '/music/create'
  }
];

export default function MusicHub() {
  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Music Laboratory</h1>
        <p className="text-muted-foreground text-lg">Develop your auditory hardware through structured disciplines.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {categories.map((cat) => {
          return (
            <Link key={cat.id} href={cat.href}>
              <Card className={cn(
                "relative overflow-hidden transition-all group border-primary/10 hover:border-primary/30 hover:shadow-lg cursor-pointer"
              )}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    )}>
                      <cat.icon className="w-8 h-8" />
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-bold">{cat.name}</h2>
                        <Badge variant="secondary" className="text-[10px] font-black">{cat.count} EXERCISES</Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{cat.desc}</p>
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
