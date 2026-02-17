
"use client"

import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap"
import "react-calendar-heatmap/dist/styles.css"
import { subDays } from "date-fns"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton";
import { TrendingUp } from "lucide-react";

const today = new Date()

export default function WellnessHeatmap({ activityData }: { activityData: { date: string, count: number }[] }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Card className="mt-6 border-primary/10 shadow-sm overflow-hidden">
        <CardHeader className="bg-primary/[0.02] border-b border-primary/5">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Wellness Progress Marker
            </CardTitle>
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Historical Consistency (Last 90 Days)</p>
        </CardHeader>
        <CardContent className="pt-8">
            <div className="w-full h-full text-[10px] pl-2 transition-all duration-1000">
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
                <Skeleton className="h-[120px] w-full" />
              )}
            </div>
            {isClient && <ReactTooltip id="heatmap-tooltip" className="z-50" />}
            
            <div className="flex justify-end items-center gap-4 mt-4 text-[9px] font-bold uppercase text-muted-foreground opacity-60">
                <span>Less</span>
                <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-sm bg-muted/30" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-primary/30" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-primary/60" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-primary/90" />
                </div>
                <span>More</span>
            </div>
        </CardContent>
    </Card>
  )
}
