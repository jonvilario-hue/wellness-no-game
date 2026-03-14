
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Crosshair, Zap, Search, Music, 
  Waves, Brain, Timer, LayoutGrid, 
  ChevronRight, Mic2, FileAudio
} from 'lucide-react';

const games = [
  {
    id: 'interval-sniper',
    name: 'Interval Sniper',
    desc: 'Identify distances between notes with lethal precision.',
    category: 'Ear Training',
    icon: Crosshair,
    difficulty: 'All Levels'
  },
  {
    id: 'note-flash',
    name: 'Note Flash',
    desc: 'Instant recognition of notes on the staff.',
    category: 'Sight Reading',
    icon: Zap,
    difficulty: 'Beginner'
  },
  {
    id: 'pitch-sharpener',
    name: 'Pitch Sharpener',
    desc: 'Match your voice to the target frequency with real-time feedback.',
    category: 'Vocal/Ear',
    icon: Mic2,
    difficulty: 'All Levels'
  },
  {
    id: 'chord-detective',
    name: 'Chord Detective',
    desc: 'Deconstruct complex harmonies and voicings.',
    category: 'Harmony',
    icon: Search,
    difficulty: 'Intermediate'
  },
  {
    id: 'rhythm-tap',
    name: 'Rhythm Tap',
    desc: 'Syncopation and subdivision timing challenges.',
    category: 'Rhythm',
    icon: Timer,
    difficulty: 'All Levels'
  },
  {
    id: 'melodic-memory',
    name: 'Melodic Memory',
    desc: 'Listen, hold, and repeat ascending sequences.',
    category: 'Memory',
    icon: Brain,
    difficulty: 'Advanced'
  },
  {
    id: 'progression-decoder',
    name: 'Progression Decoder',
    desc: 'Identify Roman numeral patterns in chord sequences.',
    category: 'Theory',
    icon: FileAudio,
    difficulty: 'Master'
  }
];

export default function GamesMenu() {
  return (
    <div className="container max-w-6xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-black uppercase tracking-tighter">Drill Laboratory</h1>
        <p className="text-muted-foreground text-lg">Select a protocol to begin your training session.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link key={game.id} href={`/games/${game.id}`}>
            <Card className="h-full border-primary/5 hover:border-primary/30 transition-all hover:shadow-xl group">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <game.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className="uppercase text-[9px] font-black">{game.difficulty}</Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{game.name}</CardTitle>
                <CardDescription className="text-sm line-clamp-2">{game.desc}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-4 border-t pt-4">
                  <span>{game.category}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
