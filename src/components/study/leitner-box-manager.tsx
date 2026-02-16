'use client';

import { useState, useMemo } from 'react';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, Inbox, Layers, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Leitner specific state extension (simplified for MVP using existing Card object)
// Card.repetitions will serve as the "Box" index (0-4)

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
      const lastReview = new Date(c.dueDate); // Borrowing dueDate as last review or next due
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
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <Badge variant="outline">Box {(currentCard.repetitions || 0) + 1}</Badge>
          <span className="text-sm font-mono">{currentIndex + 1} / {dueCards.length}</span>
        </div>
        <Card className="min-h-[300px] flex items-center justify-center text-center p-8 cursor-pointer border-2" onClick={() => setFlipped(!flipped)}>
          <CardContent>
            <p className="text-2xl font-semibold">
              {flipped ? currentCard.back : currentCard.front}
            </p>
            <p className="text-xs text-muted-foreground mt-4 uppercase tracking-widest">
              Click to flip
            </p>
          </CardContent>
        </Card>
        {flipped && (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in">
            <Button variant="destructive" size="lg" onClick={() => handleResponse(false)}>
              <XCircle className="mr-2 h-5 w-5" /> Missed It (To Box 1)
            </Button>
            <Button variant="default" size="lg" className="bg-green-600 hover:bg-green-700" onClick={() => handleResponse(true)}>
              <CheckCircle2 className="mr-2 h-5 w-5" /> Got It (Next Box)
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-indigo-500" />
              Box Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData}>
                <XAxis dataKey="name" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(var(--primary) / ${0.2 + (index * 0.2)})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-indigo-50/50 dark:bg-indigo-950/10 border-indigo-100">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Session Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-4xl font-bold">{dueCards.length}</span>
              <span className="text-xs font-bold text-indigo-600">CARDS DUE</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-4xl font-bold text-green-600">{distributionData[4].count}</span>
              <span className="text-xs font-bold text-green-600">BOX 5 MASTERY</span>
            </div>
            <Button className="w-full h-12 text-lg" disabled={dueCards.length === 0} onClick={() => setActiveSession(true)}>
              <Inbox className="mr-2 h-5 w-5" /> Review Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
