
'use client';

import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useJournal, type JournalEntry } from '@/hooks/use-journal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { BookOpenText, Target } from 'lucide-react';
import { journalConfig } from '@/lib/journal-config';
import { domainIcons } from '../icons';
import { chcDomains } from '@/types';
import type { CHCDomain } from '@/types';

// Simulate which domains were trained on which days
const getMockTrainingData = (date: Date): CHCDomain[] => {
    // Make it deterministic based on the date
    const day = date.getDate();
    if (day % 5 === 0) return ['Gf', 'Gwm'];
    if (day % 4 === 0) return ['Gs', 'EF'];
    if (day % 3 === 0) return ['Gv', 'Glr'];
    if (day % 2 === 0) return ['Gc', 'Ga'];
    return [];
};


export function CalendarView() {
  const { entries, isLoaded } = useJournal();
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  React.useEffect(() => {
    setDate(new Date());
  }, []);

  const journalEntriesByDate = React.useMemo(() => {
    const map = new Map<string, JournalEntry[]>();
    entries.forEach(entry => {
      const dateKey = new Date(entry.date).toDateString();
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)?.push(entry);
    });
    return map;
  }, [entries]);

  const trainingDataForSelectedDate = date ? getMockTrainingData(date) : [];
  const journalEntriesForSelectedDate = date ? journalEntriesByDate.get(date.toDateString()) || [] : [];
  
  const selectedDateString = date
    ? date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'No date selected';

  if (!isLoaded) {
    return <div>Loading Calendar...</div>;
  }

  return (
    <Card className="border-none shadow-none">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-4 border-b lg:border-r lg:border-b-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md"
            components={{
              DayContent: ({ date, ...props }) => {
                const hasJournalEntry = journalEntriesByDate.has(date.toDateString());
                const trainedDomains = getMockTrainingData(date);
                
                return (
                  <div className="relative h-full w-full flex items-center justify-center">
                    <span>{date.getDate()}</span>
                    {(hasJournalEntry || trainedDomains.length > 0) && (
                      <div className="absolute bottom-1 flex items-center gap-0.5">
                        {hasJournalEntry && <div className="w-1.5 h-1.5 rounded-full bg-accent" />}
                        {trainedDomains.map(domain => {
                            const domainInfo = chcDomains.find(d => d.key === domain);
                            const color = `var(--chart-${(domainInfo?.key.charCodeAt(0) ?? 0) % 5 + 1})`;
                            return <div key={domain} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />;
                        })}
                      </div>
                    )}
                  </div>
                );
              },
            }}
          />
        </div>
        <div className="p-4">
          <CardHeader className="p-2">
            <CardTitle>{selectedDateString}</CardTitle>
            <CardDescription>
              A log of your training and reflections for this day.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <ScrollArea className="h-96">
                <div className="space-y-4 pr-4">

                {trainingDataForSelectedDate.length > 0 && (
                    <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2 text-muted-foreground"><Target className="w-4 h-4"/>Training Sessions</h3>
                        <div className="flex flex-wrap gap-2">
                        {trainingDataForSelectedDate.map(domainKey => {
                            const domainInfo = chcDomains.find(d => d.key === domainKey);
                            if (!domainInfo) return null;
                            const Icon = domainIcons[domainKey];
                            return (
                                <Badge key={domainKey} variant="secondary" className="flex items-center gap-2">
                                    <Icon className="w-3 h-3"/>
                                    {domainInfo.name}
                                </Badge>
                            );
                        })}
                        </div>
                    </div>
                )}
                
                {journalEntriesForSelectedDate.length > 0 && (
                    <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2 text-muted-foreground"><BookOpenText className="w-4 h-4"/>Journal Entries</h3>
                        <div className="space-y-3">
                        {journalEntriesForSelectedDate.map(entry => {
                            const config = journalConfig[entry.category];
                            return (
                                <div key={entry.id} className="p-3 bg-muted/50 rounded-lg">
                                    <p className="font-semibold text-sm mb-1">{config?.title || entry.category}</p>
                                    <p className="text-xs text-muted-foreground italic truncate">
                                    {entry.field1 || entry.field2 || entry.field3}
                                    </p>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                )}
              
                {date && trainingDataForSelectedDate.length === 0 && journalEntriesForSelectedDate.length === 0 && (
                  <div className="text-center text-muted-foreground pt-16">
                    <p>No activity logged for this day.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
