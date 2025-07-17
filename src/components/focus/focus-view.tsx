
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useHydratedJournalStore as useJournal, type JournalEntry } from '@/hooks/use-journal';
import { useState, useMemo, useCallback } from 'react';
import { Skeleton } from '../ui/skeleton';
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';
import { FocusCard } from './focus-card';
import { JournalEditor } from '../journal/journal-editor';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useDashboardSettings } from '@/hooks/use-dashboard-settings';

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const avgFocus = payload[0].value;
      return (
        <div className="p-2 bg-background border rounded-lg shadow-lg text-sm">
          <p className="label font-semibold">{`${label}`}</p>
          <p className="intro">{`Avg Focus: ${avgFocus.toFixed(1)}`}</p>
        </div>
      );
    }
    return null;
};
  

const FocusTrendChart = ({ data }: { data: { date: string, avgFocus: number }[] }) => {
    if (data.length < 2) {
      return (
        <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
          Log your focus for a few more days to see a trend chart.
        </div>
      );
    }
  
    return (
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false}/>
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis domain={[0, 5]} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <RechartsTooltip content={<CustomTooltip />} />
            <Bar dataKey="avgFocus" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
};
  

export function FocusView() {
    const { entries, hasHydrated, updateEntry, setSelectedEntry, selectedEntry } = useJournal();
    const { settings } = useDashboardSettings();
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    const focusData = useMemo(() => {
        return entries
            .filter(entry => entry.effort > 0)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [entries]);

    const handleEdit = (entry: JournalEntry) => {
        setSelectedEntry(entry);
        setIsEditorOpen(true);
    };

    const handleSave = (entry: JournalEntry) => {
        updateEntry(entry.id, entry);
        setIsEditorOpen(false);
        return { success: true, entry: entry };
    };

    const last7DaysData = useMemo(() => {
        const dateMap = new Map<string, { total: number, count: number }>();
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            dateMap.set(dateStr, { total: 0, count: 0 });
        }
        
        focusData.forEach(entry => {
            if (dateMap.has(entry.date) && entry.effort > 0) {
                const dayData = dateMap.get(entry.date)!;
                dayData.total += entry.effort;
                dayData.count++;
            }
        });

        return Array.from(dateMap.entries()).map(([date, data]) => ({
            date: new Date(date + 'T00:00:00').toLocaleDateString('en-us', { weekday: 'short' }),
            avgFocus: data.count > 0 ? data.total / data.count : 0,
        }));
    }, [focusData]);

    const peakFocusSessions = useMemo(() => {
        return [...focusData].sort((a,b) => b.effort - a.effort).slice(0, 3);
    }, [focusData]);


    if (!hasHydrated || !settings.effortTracker) {
        return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-[400px] w-full md:col-span-2 lg:col-span-3" />
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[200px] w-full" />
        </div>
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>7-Day Focus Trend</CardTitle>
                    <CardDescription>Your average focus rating over the last week.</CardDescription>
                </CardHeader>
                <CardContent>
                    <FocusTrendChart data={last7DaysData} />
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Focus Log</CardTitle>
                        <CardDescription>Your most recent focus entries. Click to edit.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {focusData.length > 0 ? focusData.slice(0, 6).map(entry => (
                            <FocusCard key={entry.id} entry={entry} onEdit={handleEdit} />
                        )) : (
                            <p className="text-muted-foreground col-span-2 text-center py-8">No focus entries logged yet. Log your focus in the journal to see it here.</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Peak Focus Sessions</CardTitle>
                        <CardDescription>These are your highest-rated focus sessions.</CardDescription>
                    </CardHeader>
                     <CardContent className="space-y-4">
                        {peakFocusSessions.length > 0 ? peakFocusSessions.map(entry => (
                           <FocusCard key={entry.id} entry={entry} onEdit={handleEdit} />
                        )) : (
                            <p className="text-muted-foreground text-center py-8">No high-focus sessions recorded yet.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
            
             <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
                <DialogContent className="max-w-4xl h-[90vh]">
                     {selectedEntry && (
                         <JournalEditor 
                            key={selectedEntry.id}
                            entry={selectedEntry} 
                            onSave={handleSave as any} // Cast because the return type differs slightly from journal module
                            onDelete={() => {}} // Deletion is handled elsewhere
                            onCategoryChange={() => {}} // Editing category from here is disabled
                            onFrequencyChange={() => {}} // Editing frequency from here is disabled
                        />
                     )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
