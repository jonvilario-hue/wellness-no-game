'use client';

import { useState, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { CalendarIcon, FileText, BookUser, Bookmark, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, isSameDay } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface VaultCalendarProps {
  items: any[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onToggleBookmark: (item: any) => void;
}

export function VaultCalendar({ items, onEdit, onDelete, onToggleBookmark }: VaultCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Dates that have entries
  const entryDates = useMemo(() => {
    return items.map(item => new Date(item.createdAt || item.date));
  }, [items]);

  // Entries for the selected date
  const filteredEntries = useMemo(() => {
    if (!selectedDate) return [];
    return items.filter(item => {
      const itemDate = new Date(item.createdAt || item.date);
      return isSameDay(itemDate, selectedDate);
    });
  }, [items, selectedDate]);

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            Entry Timeline
          </CardTitle>
          <CardDescription>Select a date to view its associated notes and journals.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-0 pb-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border-none"
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground flex items-center justify-between">
          <span>Entries for {selectedDate ? format(selectedDate, 'PPP') : 'Selected Date'}</span>
          <Badge variant="outline">{filteredEntries.length}</Badge>
        </h3>

        <ScrollArea className="h-[400px] pr-4">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed rounded-lg bg-muted/20">
              <p className="text-muted-foreground text-sm italic">No entries found for this date.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredEntries.map((item) => (
                <div key={item.id} className="group p-4 border rounded-lg bg-card hover:bg-muted/30 transition-colors relative">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                      {item.source === 'Journal' ? (
                        <BookUser className="w-4 h-4 text-primary" />
                      ) : (
                        <FileText className="w-4 h-4 text-blue-500" />
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">{item.source}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={() => onToggleBookmark(item)}
                    >
                      <Bookmark className={cn("w-3.5 h-3.5", item.bookmarked ? 'text-primary fill-current' : 'text-muted-foreground')} />
                    </Button>
                  </div>
                  
                  <p className="font-bold text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.description || item.content}</p>
                  
                  <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.source === 'Library' && (
                      <>
                        <Button variant="ghost" size="sm" className="h-7 text-[10px]" onClick={() => onEdit(item)}>
                          <Edit className="w-3 h-3 mr-1" /> Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 text-[10px] text-destructive">
                              <Trash2 className="w-3 h-3 mr-1" /> Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Note?</AlertDialogTitle>
                              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => onDelete(item.id)} variant="destructive">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
