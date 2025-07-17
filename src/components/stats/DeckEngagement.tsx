// components/stats/DeckEngagement.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DeckEngagementStats } from "@/types/stats"
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function DeckEngagement({ stats }: { stats: DeckEngagementStats[] }) {
    if (stats.length === 0) {
        return <Card><CardContent className="p-4 text-center text-muted-foreground">No deck engagement data available.</CardContent></Card>
    }
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats} layout="vertical" margin={{ left: 10, right: 10 }}>
                <XAxis type="number" hide />
                <YAxis 
                    type="category" 
                    dataKey="deck" 
                    width={80} 
                    tickLine={false} 
                    axisLine={false} 
                    fontSize={12} 
                    stroke="hsl(var(--muted-foreground))"
                />
                 <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} />
                <Bar dataKey="accuracy" name="Accuracy %" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}
