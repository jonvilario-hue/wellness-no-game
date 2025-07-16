
'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import {
    Trash2,
    ArchiveRestore,
    Search,
    ArrowDownUp,
    AlertTriangle,
    PlusCircle,
    Edit,
} from 'lucide-react';
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
} from '../ui/alert-dialog';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useHydratedJournalStore as useJournal, type JournalEntry } from '@/hooks/use-journal';
import { journalConfig, type JournalCategory } from '@/lib/journal-config';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';
import { EditableLabel } from '../time/editable-label';

const JournalSidebarComponent = ({ 
    onSelectEntry, 
    onDeleteEntry,
    onNewEntry,
    selectedEntry,
    onUpdateEntry,
}: {
    onSelectEntry: (entry: JournalEntry) => void,
    onDeleteEntry: (id: string) => void,
    onNewEntry: () => void,
    selectedEntry: JournalEntry | null,
    onUpdateEntry: (id: string, updatedEntry: Partial<Omit<JournalEntry, 'id' | 'date' | 'category' | 'frequency'>>) => void,
}) => {
    const [viewMode, setViewMode] = useState<'entries' | 'trash'>('entries');
    type SortMode = 'date-desc' | 'date-asc' | 'category';

    const { entries, trashedEntries, restoreEntry, deleteFromTrashPermanently, emptyTrash } = useJournal();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortMode, setSortMode] = useState<SortMode>('date-desc');
    const { toast } = useToast();

    const handleRestore = useCallback((id: string) => {
      restoreEntry(id);
      toast({ title: 'Entry Restored' });
    }, [restoreEntry, toast]);
  
    const handleDeleteFromTrash = useCallback((id: string) => {
      deleteFromTrashPermanently(id);
      toast({ title: 'Entry Permanently Deleted', variant: 'destructive' });
    }, [deleteFromTrashPermanently, toast]);

    const filteredAndSortedEntries = useMemo(() => {
        const filtered = entries.filter(entry => {
            if (entry.id.startsWith('new-')) return false;
            const query = searchQuery.toLowerCase();
            return (
                (entry.label || '').toLowerCase().includes(query) ||
                (entry.category || '').toLowerCase().includes(query) ||
                (entry.field1 || '').toLowerCase().includes(query) ||
                (entry.field2 || '').toLowerCase().includes(query) ||
                (entry.field3 || '').toLowerCase().includes(query) ||
                (entry.tags || '').toLowerCase().includes(query)
            );
        });

        return filtered.sort((a, b) => {
            switch (sortMode) {
                case 'date-asc':
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                case 'category':
                    return a.category.localeCompare(b.category);
                case 'date-desc':
                default:
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
            }
        });
    }, [entries, searchQuery, sortMode]);

    const groupEntriesByDate = (entries: JournalEntry[]) => {
      return entries.reduce((acc, entry) => {
        const date = entry.date;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(entry);
        return acc;
      }, {} as Record<string, JournalEntry[]>);
    };

    const handleSaveRename = (entry: JournalEntry, newLabel: string) => {
        onUpdateEntry(entry.id, { label: newLabel });
        toast({ title: 'Entry renamed' });
    };

    const ListView = () => {
        const groupedEntries = groupEntriesByDate(filteredAndSortedEntries);
        const sortedDates = Object.keys(groupedEntries).sort((a,b) => new Date(b).getTime() - new Date(a).getTime());

        return (
            <ScrollArea className="flex-grow pr-3 -mr-3">
                <div className="space-y-4 mt-2">
                    {sortedDates.map(date => (
                        <div key={date}>
                            <h4 className="font-bold text-sm text-muted-foreground px-2">
                                {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </h4>
                            <Separator className="my-1"/>
                            <div className="space-y-1">
                                {groupedEntries[date].map(entry => {
                                    const isSelected = selectedEntry?.id === entry.id;
                                    const categoryTitle = journalConfig[entry.category as JournalCategory]?.title || entry.category;
                                    const preview = (entry.field1 || entry.field2 || entry.field3 || 'No reflection yet.').substring(0, 100);
                                    const tags = (entry.tags || '').split(',').map(t => t.trim()).filter(Boolean);

                                    return (
                                        <div key={entry.id} className="group flex items-center gap-1">
                                            <button onClick={() => onSelectEntry(entry)}
                                                className={cn(
                                                    "flex-grow text-left p-2 rounded-md transition-colors",
                                                    isSelected ? 'bg-primary/10' : 'hover:bg-muted'
                                                )}>
                                                <p className={cn(
                                                    "font-semibold text-sm",
                                                    isSelected ? "text-primary font-bold" : "text-foreground"
                                                )}>
                                                  {entry.label || categoryTitle}
                                                </p>
                                                <p className={cn(
                                                    "text-xs truncate",
                                                    isSelected ? "text-foreground/90" : "text-muted-foreground"
                                                )}>
                                                    {preview}{preview.length === 100 && '...'}
                                                </p>
                                                {tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                                                    </div>
                                                )}
                                            </button>
                                            
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Trash2 className="w-4 h-4 text-muted-foreground"/>
                                                    </Button>
                                                </AlertDialogTrigger>
                                                 <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Move to Trash?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This will move the entry to the trash. You can restore it later.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => onDeleteEntry(entry.id)}>
                                                            Move to Trash
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        );
    };

    const TrashView = () => (
         <div className='h-full flex flex-col'>
            <ScrollArea className="flex-grow pr-3 -mr-3">
                <div className="space-y-2 mt-2">
                {trashedEntries.length > 0 ? trashedEntries.map(entry => {
                    const config = journalConfig[entry.category as JournalCategory];
                    const categoryTitle = config ? config.title : entry.category;
                    return (
                      <div key={entry.id} className="group flex items-center gap-1 p-2 rounded-md bg-muted/50">
                          <div className='flex-grow'>
                              <p className="font-semibold">{new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - <span className="text-sm font-normal text-muted-foreground">{entry.label || categoryTitle}</span></p>
                              <p className="text-sm text-muted-foreground truncate">{entry.field1 || entry.field2 || entry.field3 || 'No reflection yet.'}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => handleRestore(entry.id)} title="Restore">
                              <ArchiveRestore className="w-4 h-4 text-muted-foreground hover:text-primary"/>
                          </Button>
                          <AlertDialog>
                              <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" title="Delete Permanently">
                                      <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive"/>
                                  </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                  <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Permanently?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                          This action cannot be undone. This will permanently delete this journal entry.
                                      </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteFromTrash(entry.id)} variant="destructive">
                                          Delete
                                      </AlertDialogAction>
                                  </AlertDialogFooter>
                              </AlertDialogContent>
                          </AlertDialog>
                      </div>
                    );
                }) : (
                    <div className="text-center text-muted-foreground pt-10">Trash is empty.</div>
                )}
                </div>
            </ScrollArea>
            {trashedEntries.length > 0 && (
                <div className="mt-2 pt-2 border-t flex-shrink-0">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                             <Button variant="outline" className="w-full">
                                <AlertTriangle className="mr-2 h-4 w-4" />
                                Empty Entire Trash
                              </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete {trashedEntries.length} item(s).
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={emptyTrash} variant="destructive">
                                    Yes, Empty Trash
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )}
        </div>
    );

    return (
        <div className="lg:col-span-1 bg-muted/30 rounded-lg p-3 flex flex-col h-full">
            <div className="flex-shrink-0 space-y-2">
                <Button className="w-full" onClick={onNewEntry}>
                    <PlusCircle className="mr-2 h-4 w-4" /> New Entry
                </Button>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setViewMode('entries')} className={cn(viewMode === 'entries' && 'bg-background font-semibold')}>Entries ({entries.length})</Button>
                        <Button variant="ghost" size="sm" onClick={() => setViewMode('trash')} className={cn(viewMode === 'trash' && 'bg-background font-semibold')}>Trash ({trashedEntries.length})</Button>
                    </div>
                </div>
                {viewMode === 'entries' && (
                    <div className='flex gap-2 items-center'>
                         <div className="relative flex-grow">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder="Search entries..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <ArrowDownUp className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={sortMode} onValueChange={(value) => setSortMode(value as SortMode)}>
                                    <DropdownMenuRadioItem value="date-desc">Date (Newest)</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="date-asc">Date (Oldest)</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="category">Category</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
            </div>
            <Separator className="my-2"/>
            <div className="flex-grow mt-2 min-h-0">
                {viewMode === 'entries' ? <ListView /> : <TrashView />}
            </div>
        </div>
    );
}

export const JournalSidebar = memo(JournalSidebarComponent);
JournalSidebar.displayName = 'JournalSidebar';
