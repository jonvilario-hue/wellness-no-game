
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFlashcardStore } from "@/hooks/use-flashcard-store";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useMemo } from "react";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-background border rounded-lg shadow-lg text-sm">
          <p className="font-semibold">{label}</p>
          <p>Reviews: <span className="font-bold">{payload[0].value}</span></p>
        </div>
      );
    }
    return null;
};

export function StudySummary() {
  const { reviewLogs } = useFlashcardStore();

  const chartData = useMemo(() => {
    const dailyCounts: Record<string, number> = {};
    const today = new Date();
    
    // Initialize last 7 days
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        dailyCounts[dateStr] = 0;
    }
    
    // Populate with review data
    reviewLogs.forEach(log => {
        const dateStr = new Date(log.reviewedAt).toISOString().split('T')[0];
        if (dailyCounts.hasOwnProperty(dateStr)) {
            dailyCounts[dateStr]++;
        }
    });

    return Object.entries(dailyCounts).map(([date, count]) => ({
        date: new Date(date).toLocaleDateString('en-us', { month: 'short', day: 'numeric' }),
        reviews: count,
    }));
  }, [reviewLogs]);

  const totalReviews = reviewLogs.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Activity</CardTitle>
        <CardDescription>Your review activity over the last 7 days.</CardDescription>
      </CardHeader>
      <CardContent>
        {totalReviews > 0 ? (
           <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis allowDecimals={false} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="reviews" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
            </ResponsiveContainer>
           </div>
        ) : (
            <div className="text-center py-8 text-muted-foreground">
                <p>No review data yet.</p>
                <p className="text-sm">Complete a study session to see your progress.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
