
"use client"

import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap"
import "react-calendar-heatmap/dist/styles.css"
import { subDays } from "date-fns"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton";

const today = new Date()

export default function WellnessHeatmap({ activityData }: { activityData: { date: string, count: number }[] }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Card className="mt-6">
        <CardHeader>
            <CardTitle>Wellness Progress</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="w-full h-full text-[10px] pl-2">
              {isClient ? (
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
              ) : (
                <Skeleton className="h-[150px] w-full" />
              )}
            </div>
            {isClient && <ReactTooltip id="heatmap-tooltip" />}
        </CardContent>
    </Card>
  )
}
