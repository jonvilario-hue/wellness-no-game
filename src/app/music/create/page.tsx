
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Sparkles, ListChecks } from 'lucide-react';
import Link from 'next/link';

export default function CreatePlaceholder() {
  return (
    <div className="container max-w-2xl mx-auto p-12 text-center space-y-8 animate-in fade-in">
      <div className="space-y-4">
        <div className="p-6 bg-primary/10 rounded-full w-fit mx-auto text-primary">
          <Sparkles className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter">Creation Domain</h1>
        <p className="text-xl text-muted-foreground font-medium italic">"Coming Soon to the Laboratory"</p>
      </div>

      <Card className="border-dashed bg-muted/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-center gap-2">
            <ListChecks className="w-5 h-5 text-primary" />
            Planned Protocols
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm font-bold uppercase tracking-widest text-muted-foreground">
            <li>Vocal Improv</li>
            <li>Flow Trainer</li>
            <li>Beatbox Lab</li>
            <li>Freestyle Sandbox</li>
          </ul>
        </CardContent>
      </Card>

      <Button variant="outline" asChild size="lg" className="rounded-full px-8">
        <Link href="/music"><ArrowLeft className="mr-2 w-4 h-4" /> Back to Music</Link>
      </Button>
    </div>
  );
}
