// components/stats/RetentionCurve.tsx
"use client"
import type { RetentionData } from "@/types/stats"
import { Line, LineChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-background border rounded-lg shadow-lg">
          <p className="label font-semibold">{`After ${label}: ${payload[0].value}% Retention`}</p>
        </div>
      );
    }
    return null;
};

export function RetentionCurve({ days, retention }: { days: number[], retention: number[] }) {
    const chartData = days.map((d, i) => ({
        name: `${d}d`,
        retention: retention[i]
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} unit="%" domain={[0,100]} />
                <Tooltip content={<CustomTooltip />} cursor={{stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: "3 3"}}/>
                <Line type="monotone" dataKey="retention" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
        </ResponsiveContainer>
    )
}
