'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { domainIcons } from '@/components/icons';
import type { CHCDomain } from '@/types';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useMemo } from 'react';

interface ChcDomainCardProps {
  domain: {
    key: CHCDomain;
    name: string;
    description: string;
  };
}

export function ChcDomainCard({ domain }: ChcDomainCardProps) {
  const Icon = domainIcons[domain.key];

  // Using useMemo to prevent re-calculation on every render.
  const { score, trendData } = useMemo(() => {
    // Generate static, but unique-looking data for each card to avoid hydration errors.
    const score = (domain.key.charCodeAt(0) * 3) % 40 + 50;
    const trendData = [
      { week: 'W1', score: score - 15 + Math.random() * 5 },
      { week: 'W2', score: score - 10 + Math.random() * 5 },
      { week: 'W3', score: score - 5 + Math.random() * 5 },
      { week: 'W4', score: score },
    ].map(d => ({...d, score: Math.max(0, Math.min(100, d.score))}));
    return { score, trendData };
  }, [domain.key]);

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <CardTitle className="font-headline">{domain.name}</CardTitle>
          <CardDescription>{domain.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-muted-foreground">
              Current Score
            </span>
            <span className="text-sm font-bold text-primary">{Math.round(score)}</span>
          </div>
          <Progress value={score} aria-label={`Score for ${domain.name} is ${score}`} />
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Weekly Improvement
          </h4>
          <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Start Training</Button>
      </CardFooter>
    </Card>
  );
}
