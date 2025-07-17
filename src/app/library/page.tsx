
'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileText, Bookmark, Search, PlusCircle, Edit, Trash2, BookUser } from 'lucide-react';
import { useLibraryStore } from '@/hooks/use-library-store';
import { useHydratedJournalStore } from '@/hooks/use-journal';
import { NoteDialog } from '@/components/library/note-dialog';
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
          bookmarked: entry.bookmarked || false,
          source: 'Journal'
      }))
  ].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const filteredContent = allContent.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <p className="text-xs text-primary font-semibold mt-1">{item.source}</p>
        </div>
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
            <Button variant="ghost" size="icon" onClick={() => handleToggleBookmark(item)}>
                <Bookmark className={cn("w-4 h-4", item.bookmarked ? 'text-primary fill-current' : '')} />
            </Button>
            {item.source === 'Library' && (
                <>
                    <Button variant="ghost" size="icon" onClick={() => handleOpenNoteDialog(item)}>
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


  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Library</CardTitle>
              <CardDescription>
                A central place for all your saved articles, notes, and learning materials.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col gap-2 w-full max-w-sm">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search your library..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            </div>
                            <Button onClick={() => handleOpenNoteDialog(null)}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Note
                            </Button>
                        </div>
                        <TabsList>
                            <TabsTrigger value="all"><FileText className="w-4 h-4 mr-2"/>All Content</TabsTrigger>
                            <TabsTrigger value="notes"><FileText className="w-4 h-4 mr-2"/>Notes</TabsTrigger>
                            <TabsTrigger value="journal"><BookUser className="w-4 h-4 mr-2"/>Journal Entries</TabsTrigger>
                            <TabsTrigger value="bookmarks"><Bookmark className="w-4 h-4 mr-2"/>Bookmarks</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="all">
                        {filteredContent.length === 0 ? (
                             <div className="text-center py-16 border-2 border-dashed rounded-lg">
                                <p className="text-muted-foreground">Your library is empty.</p>
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
