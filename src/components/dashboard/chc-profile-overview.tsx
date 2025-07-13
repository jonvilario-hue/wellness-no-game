
'use client';

import { TrendingUp, Activity, BarChart2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { chcDomains } from '@/types';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
  CartesianGrid,
} from 'recharts';
import { Card } from '../ui/card';

const generateMockData = () => {
  const data = [];
  for (let i = 4; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i * 7); // Go back i weeks
    const score = 60 + Math.random() * 15 - i * 2; // Simulate slight upward trend
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      score: Math.max(0, Math.min(100, score)),
    });
  }
  return data;
};

export function ChcProfileOverview() {
  const [overallScore, setOverallScore] = useState(0);
  const [trend, setTrend] = useState(0);
  const [chartData, setChartData] = useState<{ date: string; score: number }[]>([]);

  useEffect(() => {
    // This effect runs only once on the client after mounting
    const mockData = generateMockData();
    setChartData(mockData);

    const scores = mockData.map(d => d.score);
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    setOverallScore(averageScore);

    const startScore = scores[0];
    const endScore = scores[scores.length - 1];
    if (startScore > 0) {
      const pctChange = ((endScore - startScore) / startScore) * 100;
      setTrend(pctChange);
    }
  }, []);

  const trendColor = trend > 0 ? 'text-green-500' : 'text-amber-500';

  return (
    <Card className="bg-muted/30 p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center justify-center space-y-1">
          <p className="text-sm text-muted-foreground font-semibold">Overall Score</p>
          <p className="text-4xl font-bold text-primary">{Math.round(overallScore)}</p>
          <p className="text-xs text-muted-foreground">Average of all domains</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-1">
          <p className="text-sm text-muted-foreground font-semibold">Weekly Trend</p>
          <p className={cn('text-4xl font-bold', trendColor)}>
            {trend > 0 ? '+' : ''}
            {trend.toFixed(1)}%
          </p>
           <p className="text-xs text-muted-foreground">Change from 4 weeks ago</p>
        </div>
        <div className="h-24 md:col-span-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
