
"use client"

import CalendarHeatmap from "react-calendar-heatmap"
import "react-calendar-heatmap/dist/styles.css"
import { subDays } from "date-fns"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { cn } from "@/lib/utils"

const today = new Date()

export default function WellnessHeatmap({ activityData }: { activityData: { date: string, count: number }[] }) {
  return (
    <Card className="mt-6">
        <CardHeader>
            <CardTitle>Wellness Progress</CardTitle>
        </CardHeader>
        <CardContent>
            <CalendarHeatmap
                startDate={subDays(today, 90)}
                endDate={today}
                values={activityData}
                classForValue={(value) => {
                    if (!value || value.count === 0) return "color-empty"
                    if (value.count <= 1) return "color-scale-1"
                    if (value.count <= 2) return "color-scale-2"
                    return "color-scale-3"
                }}
                tooltipDataAttrs={(value: { date: string, count: number}) => {
                    return {
                        'data-tooltip-id': 'heatmap-tooltip',
                        'data-tooltip-content': value.date ? `${new Date(value.date).toDateString()}: ${value.count || 0} practice(s)` : 'No data',
                    };
                }}
                showWeekdayLabels
            />
            <ReactTooltip id="heatmap-tooltip" />
        </CardContent>
    </Card>
  )
}
