
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSleepStore } from '@/hooks/use-sleep-store';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const ReadinessGauge = ({ score }: { score: number }) => {
    const data = [{ name: 'Score', value: score }];
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const progress = score / 100;
    const strokeDashoffset = circumference * (1 - progress);

    return (
        <div className="relative w-40 h-40">
            <svg width="100%" height="100%" viewBox="0 0 160 160" className="-rotate-90">
                <circle
                    stroke="hsl(var(--muted))"
                    fill="transparent"
                    strokeWidth="12"
                    r={radius}
                    cx="80"
                    cy="80"
                />
                <circle
                    stroke="hsl(var(--primary))"
                    fill="transparent"
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    r={radius}
                    cx="80"
                    cy="80"
                    className="transition-all duration-500"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-primary">{score}</span>
                <span className="text-sm text-muted-foreground">Readiness</span>
            </div>
        </div>
    );
};


export function SleepCycleTracker() {
    const { readinessScore, sleepData, feedbackSummary, generateNewSleepCycle } = useSleepStore();
    
    const chartData = [
        {
            name: 'Last Night',
            light: sleepData.lightPercentage,
            deep: sleepData.deepPercentage,
            rem: sleepData.remPercentage,
        }
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sleep Cycle & Readiness</CardTitle>
                <CardDescription>Analyze your simulated sleep patterns to understand your cognitive readiness.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <ReadinessGauge score={readinessScore} />
                        <Button onClick={generateNewSleepCycle} variant="outline" size="sm">
                            <RefreshCw className="w-4 h-4 mr-2"/>
                            Simulate New Night
                        </Button>
                    </div>
                    <div className="md:col-span-2">
                       <p className="text-sm text-muted-foreground italic mb-4">"{feedbackSummary}"</p>
                       <div className="h-48 w-full">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" hide />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--muted))' }}
                                    contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: 'var(--radius)',
                                    }}
                                />
                                <Legend wrapperStyle={{ fontSize: '0.8rem' }} />
                                <Bar dataKey="light" stackId="a" fill="var(--chart-1)" name="Light (%)" />
                                <Bar dataKey="deep" stackId="a" fill="var(--chart-2)" name="Deep (%)" />
                                <Bar dataKey="rem" stackId="a" fill="var(--chart-3)" name="REM (%)" />
                            </BarChart>
                        </ResponsiveContainer>
                       </div>
                    </div>
                </div>
                 <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <h3 className="font-semibold">Test the Alarm Dismissal Flow</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                        Experience how your readiness score is calculated after a cognitive puzzle.
                    </p>
                    <Button asChild>
                        <Link href="/alarm" target="_blank">
                            Simulate Alarm <ExternalLink className="w-4 h-4 ml-2"/>
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
