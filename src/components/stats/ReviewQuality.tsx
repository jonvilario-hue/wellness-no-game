// components/stats/ReviewQuality.tsx
"use client"
import type { ReviewStats } from "@/types/stats"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-background border rounded-lg shadow-lg">
          <p className="label font-semibold">{`${payload[0].payload.name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
};

export function ReviewQuality({ data }: { data: ReviewStats }) {
    const chartData = [
        { name: 'Again', count: data.again, fill: 'hsl(var(--destructive))' },
        { name: 'Hard', count: data.hard, fill: 'hsl(var(--chart-4))' },
        { name: 'Good', count: data.good, fill: 'hsl(var(--chart-2))' },
        { name: 'Easy', count: data.easy, fill: 'hsl(var(--primary))' },
    ]

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--muted))'}}/>
                <Bar dataKey="count" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}
