
'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Loader2, HelpCircle, ArrowRight, MessageSquare } from 'lucide-react';
import { generateWhyChainAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function WhyChainTool() {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState<string[] | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!topic.trim()) return;
    startTransition(async () => {
      try {
        const data = await generateWhyChainAction(topic);
        setResult(data.questions);
      } catch (err) {
        toast({ title: "Thinking Error", description: "The AI engine is busy. Try again in a moment.", variant: "destructive" });
      }
    });
  };

  return (
    <Card className="h-full flex flex-col border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          Why-Chain Explorer
        </CardTitle>
        <CardDescription>Master a concept by answering 5 progressively deeper "Why" questions.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        {!result ? (
          <div className="space-y-4 animate-in fade-in">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase text-muted-foreground">The Concept</Label>
              <Input 
                value={topic} 
                onChange={e => setTopic(e.target.value)} 
                placeholder="e.g. Photosynthesis, Compounding Interest..." 
              />
            </div>
            <Button className="w-full font-bold gap-2" onClick={handleGenerate} disabled={isPending || !topic.trim()}>
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Generate Inquiry Chain
            </Button>
          </div>
        ) : (
          <div className="space-y-4 animate-in slide-in-from-bottom-2">
            <div className="space-y-2">
              {result.map((q, i) => (
                <div key={i} className="p-3 bg-muted/30 rounded-xl border border-primary/5 flex gap-3 group hover:border-primary/20 transition-all">
                  <span className="text-xs font-black text-primary opacity-40">{i + 1}</span>
                  <p className="text-sm font-medium leading-relaxed">{q}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full text-xs font-bold" onClick={() => setResult(null)}>
              Start New Topic
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
