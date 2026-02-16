
'use client';

import { useState, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { CalendarIcon, BookUser, ChevronRight } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { useHydratedJournalStore, type JournalEntry } from '@/hooks/use-journal';
import { journalConfig } from '@/lib/journal-config';

export function JournalCalendar() {
  const { entries, setSelectedEntry, hasHydrated } = useHydratedJournalStore();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const entryDates = useMemo(() => {
    return entries.map(entry => new Date(entry.displayDate || entry.date + 'T12:00:00'));
  }, [entries]);

  const filteredEntries = useMemo(() => {
    if (!selectedDate) return [];
    return entries.filter(entry => {
      const entryDate = new Date(entry.displayDate || entry.date + 'T12:00:00');
      return isSameDay(entryDate, selectedDate);
    });
  }, [entries, selectedDate]);

  const modifiers = {
    hasEntry: (date: Date) => entryDates.some(d => isSameDay(d, date)),
  };

  const modifiersStyles = {
    hasEntry: {
      fontWeight: 'bold',
      textDecoration: 'underline',
      color: 'hsl(var(--primary))',
    },
  };

  if (!hasHydrated) return null;

  return (
    <Card className="border-primary/10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              Reflection History
            </CardTitle>
            <CardDescription>Select a date to jump to your past reflections.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center border rounded-2xl p-4 bg-muted/10">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border-none p-0"
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
          />
        </div>
        
        <div className="flex flex-col h-full space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'Select a date'}
            </h3>
            <Badge variant="secondary" className="text-[10px]">{filteredEntries.length} Entries</Badge>
          </div>

          <ScrollArea className="flex-grow h-[250px] pr-4 -mr-4">
            <div className="space-y-3">
              {filteredEntries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-xl bg-muted/50">
                  <p className="text-xs text-muted-foreground italic">No reflections logged for this day.</p>
                </div>
              ) : (
                filteredEntries.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => {
                        setSelectedEntry(entry);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-muted/30 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <BookUser className="w-4 h-4" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-sm font-bold leading-none truncate">
                            {entry.label || journalConfig[entry.category]?.title || 'Untitled'}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase font-black mt-1.5 tracking-tighter">
                          {entry.category} • {entry.frequency}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
