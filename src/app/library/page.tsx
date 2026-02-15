'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileText, Bookmark, Search, PlusCircle, Edit, Trash2, BookUser, Library as LibraryIcon, BookMarked, CalendarDays } from 'lucide-react';
import { useLibraryStore } from '@/hooks/use-library-store';
import { useHydratedJournalStore } from '@/hooks/use-journal';
import { NoteDialog } from '@/components/library/note-dialog';
import WellnessLibrary from '@/components/wellness/WellnessLibrary';
import { VaultCalendar } from '@/components/library/vault-calendar';
import type { LibraryItem } from '@/types/library';
import { cn } from '@/lib/utils';
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

export default function LibraryPage() {
  const { items: libraryItems, deleteItem, toggleBookmark: toggleLibraryBookmark } = useLibraryStore();
  const { entries: journalEntries, toggleJournalBookmark } = useHydratedJournalStore();

  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<LibraryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenNoteDialog = (item: LibraryItem | null) => {
    setItemToEdit(item);
    setIsNoteDialogOpen(true);
  };
  
  const allContent = [
      ...libraryItems.map(item => ({...item, source: 'Library'})),
      ...journalEntries.map(entry => ({
          id: entry.id,
          title: entry.label || entry.category,
          content: entry.field1 || entry.field2 || entry.field3 || 'No content',
          createdAt: entry.date,
          date: entry.date,
          bookmarked: entry.bookmarked || false,
          source: 'Journal',
          tags: entry.tags,
      }))
  ].sort((a,b) => new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime());

  const filteredContent = allContent.filter(item => {
    const term = searchTerm.toLowerCase();
    
    const titleMatch = item.title.toLowerCase().includes(term);
    const contentMatch = item.content.toLowerCase().includes(term);
    
    let tagsMatch = false;
    if (item.tags) {
        if (Array.isArray(item.tags)) { // LibraryItem tags
            tagsMatch = item.tags.some(tag => tag.toLowerCase().includes(term));
        } else if (typeof item.tags === 'string') { // JournalEntry tags
            tagsMatch = item.tags.toLowerCase().includes(term);
        }
    }

    return titleMatch || contentMatch || tagsMatch;
  });

  const notes = filteredContent.filter(item => item.source === 'Library');
  const journalContent = filteredContent.filter(item => item.source === 'Journal');
  const bookmarks = filteredContent.filter(item => item.bookmarked);

  const handleToggleBookmark = (item: any) => {
      if (item.source === 'Library') {
          toggleLibraryBookmark(item.id);
      } else {
          toggleJournalBookmark(item.id);
      }
  }


  const ItemCard = ({ item }: { item: any }) => (
    <div key={item.id} className="group flex items-center p-4 border rounded-lg hover:bg-muted/50">
        <div className="flex-grow">
            <p className="font-bold">{item.title}</p>
            <p className="text-sm text-muted-foreground truncate max-w-lg">{item.description || item.content}</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-primary font-semibold">{item.source}</p>
              <span className="text-[10px] text-muted-foreground opacity-60">• {formatDate(item.createdAt || item.date)}</span>
            </div>
        </div>
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
            <Button variant="ghost" size="icon" onClick={() => handleToggleBookmark(item)}>
                <Bookmark className={cn("w-4 h-4", item.bookmarked ? 'text-primary fill-current' : '')} />
            </Button>
            {item.source === 'Library' && (
                <>
                    <Button variant="ghost" size="icon" onClick={() => handleOpenNoteDialog(item as LibraryItem)}>
                        <Edit className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Delete Note?</AlertDialogTitle></AlertDialogHeader>
                        <AlertDialogDescription>Are you sure you want to delete this note? This action cannot be undone.</AlertDialogDescription>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteItem(item.id)} variant="destructive">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            )}
        </div>
    </div>
  )

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  }


  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="personal" className="gap-2">
                  <LibraryIcon className="w-4 h-4" />
                  Personal Vault
                </TabsTrigger>
                <TabsTrigger value="wellness" className="gap-2">
                  <BookMarked className="w-4 h-4" />
                  Wellness Library
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="personal" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Vault</CardTitle>
                  <CardDescription>
                    A central place for all your saved articles, notes, and journal reflections.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="all">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                            <div className="flex flex-col gap-2 w-full max-w-sm">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search vault..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                </div>
                                <Button onClick={() => handleOpenNoteDialog(null)}>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Note
                                </Button>
                            </div>
                            <TabsList className="flex-wrap h-auto">
                                <TabsTrigger value="all" className="gap-2"><FileText className="w-4 h-4"/>All</TabsTrigger>
                                <TabsTrigger value="notes" className="gap-2"><FileText className="w-4 h-4"/>Notes</TabsTrigger>
                                <TabsTrigger value="journal" className="gap-2"><BookUser className="w-4 h-4"/>Journal</TabsTrigger>
                                <TabsTrigger value="calendar" className="gap-2"><CalendarDays className="w-4 h-4"/>Calendar</TabsTrigger>
                                <TabsTrigger value="bookmarks" className="gap-2"><Bookmark className="w-4 h-4"/>Bookmarks</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="all">
                            {filteredContent.length === 0 ? (
                                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                                    <p className="text-muted-foreground">Your vault is empty.</p>
                                    <p className="text-sm text-muted-foreground">Click "Add Note" to save your first item.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredContent.map(item => <ItemCard key={item.id} item={item} />)}
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent value="notes">
                            {notes.length === 0 ? (
                                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                                    <p className="text-muted-foreground">You have no notes.</p>
                                    <p className="text-sm text-muted-foreground">Click "Add Note" to get started.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {notes.map(item => <ItemCard key={item.id} item={item} />)}
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent value="journal">
                            {journalContent.length === 0 ? (
                                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                                    <p className="text-muted-foreground">You have no journal entries.</p>
                                    <p className="text-sm text-muted-foreground">Go to the journal to write an entry.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {journalContent.map(item => <ItemCard key={item.id} item={item} />)}
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent value="calendar">
                            <VaultCalendar 
                              items={allContent} 
                              onEdit={(item) => handleOpenNoteDialog(item)}
                              onDelete={(id) => deleteItem(id)}
                              onToggleBookmark={handleToggleBookmark}
                            />
                        </TabsContent>
                        <TabsContent value="bookmarks">
                            {bookmarks.length === 0 ? (
                                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                                    <p className="text-muted-foreground">You have no bookmarks.</p>
                                    <p className="text-sm text-muted-foreground">Click the bookmark icon on a note to save it here.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {bookmarks.map(item => <ItemCard key={item.id} item={item} />)}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wellness" className="mt-0">
              <WellnessLibrary />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <NoteDialog
        open={isNoteDialogOpen}
        onOpenChange={setIsNoteDialogOpen}
        itemToEdit={itemToEdit}
      />
    </>
  );
}
