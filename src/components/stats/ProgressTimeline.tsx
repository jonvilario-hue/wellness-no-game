// components/stats/ProgressTimeline.tsx
"use client"
import type { ProgressPoint } from "@/types/stats"
import { Line, LineChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function ProgressTimeline({ timeline }: { timeline: ProgressPoint[] }) {
    if (timeline.length < 2) {
        return <div className="h-[300px] flex items-center justify-center text-muted-foreground">Not enough data for a timeline. Keep learning!</div>
    }

    const formattedTimeline = timeline.map(t => ({
        ...t,
        date: new Date(t.date + 'T00:00:00').toLocaleDateString('en-us', { month: 'short', day: 'numeric' })
    }))

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formattedTimeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="learned" name="Cards Learned" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    )
}
