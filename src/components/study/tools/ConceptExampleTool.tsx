
'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lightbulb, Loader2, Sparkles, BookOpen, Quote } from 'lucide-react';
import { generateStarterExampleAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

export function ConceptExampleTool() {
  const [concept, setConcept] = useState('');
  const [example, setExample] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!concept.trim()) return;
    startTransition(async () => {
      try {
        const data = await generateStarterExampleAction(concept);
        setExample(data.example);
      } catch (err) {
        toast({ title: "Synthesis Error", description: "AI reached a limit. Try a simpler concept.", variant: "destructive" });
      }
    });
  };

  return (
    <Card className="h-full flex flex-col border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Concrete Realizer
        </CardTitle>
        <CardDescription>Turn abstract theory into a relatable real-world scenario.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        {!example ? (
          <div className="space-y-4 animate-in fade-in">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase text-muted-foreground">Abstract Idea</Label>
              <Input 
                value={concept} 
                onChange={e => setConcept(e.target.value)} 
                placeholder="e.g. Opportunity Cost, The Dopamine Loop..." 
              />
            </div>
            <Button className="w-full font-bold gap-2" onClick={handleGenerate} disabled={isPending || !concept.trim()}>
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Realize Concept
            </Button>
          </div>
        ) : (
          <div className="space-y-4 animate-in slide-in-from-bottom-2">
            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 relative">
              <Quote className="absolute top-2 right-2 w-8 h-8 text-primary/10" />
              <p className="text-sm font-medium leading-relaxed italic text-foreground/90">
                "{example}"
              </p>
            </div>
            <Button variant="outline" className="w-full text-xs font-bold" onClick={() => setExample(null)}>
              Try Another Concept
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
