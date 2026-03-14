
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Play, Brain, Zap, History, Target } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="container max-w-6xl mx-auto p-6 space-y-10">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b pb-10">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">Sonic Lab</h1>
          <p className="text-xl text-muted-foreground max-w-xl">
            Precision cognitive training through auditory mastery and local-first performance tracking.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline" size="lg" className="h-14 px-8 font-bold border-2">
            <Link href="/profile">
              <History className="mr-2 w-5 h-5" /> Analytics
            </Link>
          </Button>
          <Button asChild size="lg" className="h-14 px-10 text-lg font-black shadow-xl shadow-primary/20">
            <Link href="/games">
              <Play className="mr-2 w-6 h-6 fill-current" /> Initialize Lab
            </Link>
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-primary/10 hover:border-primary/30 transition-all group overflow-hidden">
          <CardHeader className="bg-primary/5 pb-8">
            <CardTitle className="text-2xl flex items-center gap-3">
              <Zap className="w-6 h-6 text-primary animate-pulse" /> Daily Neural Circuit
            </CardTitle>
            <CardDescription>A curated 10-minute session to prime your auditory cortex.</CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Intervals', icon: Target },
                { label: 'Rhythm', icon: Zap },
                { label: 'Pitch', icon: Music }
              ].map((module) => (
                <div key={module.label} className="p-4 rounded-xl bg-muted/50 border text-center space-y-2 group-hover:bg-background transition-colors">
                  <module.icon className="w-5 h-5 mx-auto text-muted-foreground group-hover:text-primary" />
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{module.label}</p>
                  <p className="font-bold text-sm">Calibration</p>
                </div>
              ))}
            </div>
            <Button className="w-full mt-8 h-12 font-bold uppercase tracking-widest">
              Launch Circuit
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-primary" /> Local Skill Map
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { label: 'Harmonic Identification', value: 0 },
              { label: 'Rhythmic Precision', value: 0 },
              { label: 'Melodic Retention', value: 0 },
            ].map((skill) => (
              <div key={skill.label} className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase">
                  <span>{skill.label}</span>
                  <span className="text-primary">{skill.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${skill.value}%` }} />
                </div>
              </div>
            ))}
            <p className="text-[10px] text-muted-foreground italic text-center">Training data persists in your browser's IndexedDB.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
