
'use client';

import { useState, useMemo } from 'react';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, Inbox, Layers, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function LeitnerBoxManager() {
  const { cards, updateCard } = useFlashcardStore();
  const [activeSession, setActiveSession] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const boxSchedules = [1, 3, 7, 14, 30]; // Days

  const distributionData = useMemo(() => {
    const boxes = [0, 0, 0, 0, 0];
    cards.forEach(c => {
      const box = Math.min(c.repetitions || 0, 4);
      boxes[box]++;
    });
    return boxes.map((count, i) => ({ name: `Box ${i + 1}`, count }));
  }, [cards]);

  const dueCards = useMemo(() => {
    const now = new Date();
    return cards.filter(c => {
      const box = Math.min(c.repetitions || 0, 4);
      const lastReview = new Date(c.dueDate);
      return lastReview <= now;
    }).sort((a, b) => (a.repetitions || 0) - (b.repetitions || 0));
  }, [cards]);

  const handleResponse = (gotIt: boolean) => {
    const card = dueCards[currentIndex];
    const currentBox = card.repetitions || 0;
    
    const newBox = gotIt ? Math.min(currentBox + 1, 4) : 0;
    const nextInterval = boxSchedules[newBox];
    const newDueDate = new Date();
    newDueDate.setDate(newDueDate.getDate() + nextInterval);

    updateCard({
      ...card,
      repetitions: newBox,
      dueDate: newDueDate.toISOString(),
    });

    if (currentIndex < dueCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    } else {
      setActiveSession(false);
      setCurrentIndex(0);
    }
  };

  if (activeSession && dueCards.length > 0) {
    const currentCard = dueCards[currentIndex];
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="border-primary/20 text-primary">Box {(currentCard.repetitions || 0) + 1}</Badge>
          <span className="text-sm font-mono text-muted-foreground">{currentIndex + 1} / {dueCards.length}</span>
        </div>
        <Card 
          className="min-h-[300px] flex items-center justify-center text-center p-8 cursor-pointer border-2 hover:border-primary/30 transition-all shadow-sm" 
          onClick={() => setFlipped(!flipped)}
        >
          <CardContent>
            <p className="text-2xl font-bold">
              {flipped ? currentCard.back : currentCard.front}
            </p>
            <p className="text-[10px] text-muted-foreground mt-8 uppercase tracking-widest font-bold opacity-60">
              {flipped ? 'Correct?' : 'Click to see answer'}
            </p>
          </CardContent>
        </Card>
        {flipped && (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in">
            <Button variant="outline" size="lg" className="h-14 border-destructive/20 text-destructive hover:bg-destructive/5" onClick={() => handleResponse(false)}>
              <XCircle className="mr-2 h-5 w-5" /> Missed It
            </Button>
            <Button variant="default" size="lg" className="h-14 bg-primary hover:bg-primary/90" onClick={() => handleResponse(true)}>
              <CheckCircle2 className="mr-2 h-5 w-5" /> Got It
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Layers className="h-4 w-4 text-primary" />
              Progress across Boxes
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData}>
                <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(var(--primary) / ${0.3 + (index * 0.15)})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/10 flex flex-col justify-center">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Review Queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div>
              <span className="text-6xl font-black text-primary">{dueCards.length}</span>
              <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Cards Due Now</p>
            </div>
            <div className="flex justify-between items-center px-4 py-2 bg-background/50 rounded-lg border border-primary/5 text-[10px]">
              <span className="font-bold text-muted-foreground uppercase">Box 5 Mastery:</span>
              <span className="font-black text-primary">{distributionData[4].count}</span>
            </div>
            <Button className="w-full h-12 text-sm font-bold shadow-sm" disabled={dueCards.length === 0} onClick={() => setActiveSession(true)}>
              <Inbox className="mr-2 h-4 w-4" /> Start Review Session
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
