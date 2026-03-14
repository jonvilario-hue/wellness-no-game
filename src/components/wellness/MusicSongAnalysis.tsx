
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  BookCopy, Search, Check, Play,
  Brain, Target, Music, Sparkles
} from 'lucide-react';
import { useMusicStore } from '@/hooks/use-music-store';
import { useToast } from '@/hooks/use-toast';

export function MusicSongAnalysis() {
  const [chart, setChart] = useState('');
  const [step, setStep] = useState<'input' | 'analysis'>('input');
  const [results, setResults] = useState<Record<string, string>>({
    key: '',
    progression: '',
    form: ''
  });
  
  const { logDrill } = useMusicStore();
  const { toast } = useToast();

  const handleFinalize = () => {
    logDrill({
      domain: 'Theory & Harmony',
      drillName: 'Song Analysis Mode',
      difficulty: 'Intermediate',
      difficultyMultiplier: 1.5,
      focusLevel: 4,
      score: 10,
      har: 150,
      averageResponseTime: 0,
      effectivenessRating: 5,
      context: 'Post-Study',
      durationMinutes: 10,
      questions: []
    });

    toast({ title: "Analysis Synchronized", variant: 'success' });
    setStep('input');
    setChart('');
  };

  return (
    <Card className="border-primary/10 overflow-hidden">
      <CardHeader className="bg-primary/5 pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <BookCopy className="w-5 h-5 text-primary" />
          Song Analysis Mode
        </CardTitle>
        <CardDescription>Deconstruct structures and progressions locally.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {step === 'input' ? (
          <div className="space-y-4">
            <Label className="text-[10px] font-black uppercase text-muted-foreground">Paste Chord Chart / Structure</Label>
            <Textarea 
              className="min-h-[150px] font-mono text-xs leading-relaxed" 
              placeholder="[Verse 1] C G Am F..."
              value={chart}
              onChange={e => setChart(e.target.value)}
            />
            <Button className="w-full h-12 font-black uppercase gap-2" disabled={!chart} onClick={() => setStep('analysis')}>
              Initialize Analysis <Search className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase">Identified Key</Label>
                <Input value={results.key} onChange={e => setResults({...results, key: e.target.value})} placeholder="e.g. A Major" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase">Form Changes</Label>
                <Input value={results.form} onChange={e => setResults({...results, form: e.target.value})} placeholder="e.g. 16 Bar Verse" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase">Roman Numeral Progression</Label>
              <Input value={results.progression} onChange={e => setResults({...results, progression: e.target.value})} placeholder="e.g. I-V-vi-IV" />
            </div>
            <Button className="w-full h-12 font-black uppercase gap-2 shadow-lg" onClick={handleFinalize}>
              Sync Analysis <Check className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
