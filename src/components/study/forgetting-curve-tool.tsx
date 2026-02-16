'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useFlashcardStore } from '@/hooks/use-flashcard-store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export function ForgettingCurveVisualizer() {
  const { cards } = useFlashcardStore();

  const retentionData = useMemo(() => {
    return cards.map(card => {
      const now = new Date();
      const lastReview = new Date(card.dueDate); // Last review proxy
      const t = Math.max(0, (now.getTime() - lastReview.getTime()) / (1000 * 3600 * 24)); // Days since last review
      const S = (card.repetitions || 1) * 2; // Stability factor
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
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Global Retention Forecast</CardTitle>
            <CardDescription>Based on Ebbinghaus's formula: R = e^(-t/S)</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={curvePoints}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="day" label={{ value: 'Days Since Study', position: 'insideBottom', offset: -5 }} fontSize={12} />
                <YAxis domain={[0, 100]} unit="%" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: '8px' }} />
                <ReferenceLine y={50} stroke="red" strokeDasharray="3 3" label="Threshold" />
                <Line type="monotone" dataKey="retention" stroke="#4f46e5" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-indigo-50/50 dark:bg-indigo-950/10 border-indigo-100 flex flex-col justify-center text-center p-6">
          <div className="space-y-2">
            <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Average Retention</p>
            <p className="text-7xl font-black text-indigo-900 dark:text-indigo-100">{avgRetention}%</p>
            <p className="text-xs text-muted-foreground mt-4">Across {cards.length} tracked concepts</p>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-orange-500" />
          Critical Review List
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {retentionData.slice(0, 6).map((item, i) => (
            <Card key={i} className={`border-l-4 ${item.retention < 50 ? 'border-l-red-500' : 'border-l-orange-500'}`}>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <p className="font-bold line-clamp-1">{item.concept}</p>
                  <Badge variant={item.retention < 50 ? 'destructive' : 'secondary'}>
                    {item.retention}%
                  </Badge>
                </div>
                <Progress value={item.retention} className="h-1.5" />
                <div className="flex items-center text-[10px] text-muted-foreground gap-2">
                  <Clock className="h-3 w-3" />
                  Last studied {Math.round(item.t)} days ago
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
