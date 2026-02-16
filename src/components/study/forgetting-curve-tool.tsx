
'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { AlertCircle, Clock, Zap } from 'lucide-react';

export function ForgettingCurveVisualizer() {
  const { cards } = useFlashcardStore();

  const retentionData = useMemo(() => {
    return cards.map(card => {
      const now = new Date();
      const lastReview = new Date(card.dueDate);
      const t = Math.max(0, (now.getTime() - lastReview.getTime()) / (1000 * 3600 * 24));
      const S = (card.repetitions || 1) * 2;
      const R = Math.exp(-t / S) * 100;

      return {
        concept: card.front,
        retention: Math.round(R),
        stability: S,
        t
      };
    }).sort((a, b) => a.retention - b.retention);
  }, [cards]);

  const curvePoints = useMemo(() => {
    if (retentionData.length === 0) return [];
    const avgStability = retentionData.reduce((acc, curr) => acc + curr.stability, 0) / retentionData.length;
    
    return Array.from({ length: 30 }, (_, i) => {
      const R = Math.exp(-i / avgStability) * 100;
      return { day: i, retention: R };
    });
  }, [retentionData]);

  const avgRetention = useMemo(() => {
    if (retentionData.length === 0) return 0;
    return Math.round(retentionData.reduce((acc, curr) => acc + curr.retention, 0) / retentionData.length);
  }, [retentionData]);

  return (
    <div className="space-y-10 animate-in fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-primary/5">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Retention Decay Model
            </CardTitle>
            <CardDescription className="text-xs">Based on Ebbinghaus's Formula: R = e^(-t/S)</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={curvePoints}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.05} />
                <XAxis dataKey="day" label={{ value: 'Days Since Review', position: 'insideBottom', offset: -5, fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} fontSize={10} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} unit="%" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
                />
                <ReferenceLine y={50} stroke="hsl(var(--destructive))" strokeDasharray="3 3" label={{ value: 'Critical', position: 'right', fontSize: 10, fill: 'hsl(var(--destructive))' }} />
                <Line type="monotone" dataKey="retention" stroke="hsl(var(--primary))" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/10 flex flex-col justify-center text-center p-6 space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-primary uppercase tracking-widest">Average Retention</p>
            <p className="text-7xl font-black text-foreground">{avgRetention}%</p>
          </div>
          <div className="p-3 bg-background/50 rounded-lg border border-primary/5">
            <p className="text-[10px] text-muted-foreground uppercase font-bold">Concept Inventory: {cards.length}</p>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <h3 className="text-xl font-black tracking-tight uppercase">Critical Review Priority</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {retentionData.length === 0 ? (
            <div className="col-span-full py-10 text-center opacity-30 italic text-sm">Add flashcards to track your retention.</div>
          ) : (
            retentionData.slice(0, 6).map((item, i) => (
              <Card key={i} className={cn("transition-all border-l-4", item.retention < 50 ? 'border-l-destructive bg-destructive/5' : 'border-l-primary')}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-sm line-clamp-1 flex-grow pr-2">{item.concept}</p>
                    <Badge variant={item.retention < 50 ? 'destructive' : 'secondary'} className="text-[10px] font-black h-5">
                      {item.retention}%
                    </Badge>
                  </div>
                  <Progress value={item.retention} className={cn("h-1.5", item.retention < 50 && "[&>div]:bg-destructive")} />
                  <div className="flex items-center text-[10px] font-bold text-muted-foreground uppercase tracking-tighter gap-2">
                    <Clock className="h-3 w-3" />
                    Last reviewed {Math.round(item.t)} days ago
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
