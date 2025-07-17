
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
  const { items: libraryItems, deleteItem } = useLibraryStore();
  const { entries: journalEntries } = useHydratedJournalStore();

  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<LibraryItem | null>(null);

  const handleOpenNoteDialog = (item: LibraryItem | null) => {
    setItemToEdit(item);
    setIsNoteDialogOpen(true);
  };

  const notes = libraryItems.filter(item => item.type === 'note');
  const allContent = [
      ...libraryItems.map(item => ({...item, source: 'Library'})),
      ...journalEntries.map(entry => ({
          id: entry.id,
          title: entry.label || entry.category,
          content: entry.field1 || entry.field2 || entry.field3,
          createdAt: entry.date,
          source: 'Journal'
      }))
  ].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const ItemCard = ({ item }: { item: any }) => (
    <div key={item.id} className="group flex items-center p-4 border rounded-lg hover:bg-muted/50">
        <div className="flex-grow">
            <p className="font-bold">{item.title}</p>
            <p className="text-sm text-muted-foreground truncate">{item.description || item.content}</p>
            <p className="text-xs text-primary font-semibold mt-1">{item.source}</p>
        </div>
        {item.source === 'Library' && (
            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
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
            </div>
        )}
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
                    <div className="flex justify-between items-center mb-4">
                        <TabsList>
                            <TabsTrigger value="all"><FileText className="w-4 h-4 mr-2"/>All Content</TabsTrigger>
                            <TabsTrigger value="notes"><FileText className="w-4 h-4 mr-2"/>Notes</TabsTrigger>
                             <TabsTrigger value="journal"><BookUser className="w-4 h-4 mr-2"/>Journal Entries</TabsTrigger>
                            <TabsTrigger value="bookmarks" disabled><Bookmark className="w-4 h-4 mr-2"/>Bookmarks</TabsTrigger>
                        </TabsList>
                         <div className="flex items-center gap-2">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search your library..." className="pl-8" />
                            </div>
                            <Button onClick={() => handleOpenNoteDialog(null)}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Note
                            </Button>
                        </div>
                    </div>
                    <TabsContent value="all">
                        {allContent.length === 0 ? (
                             <div className="text-center py-16 border-2 border-dashed rounded-lg">
                                <p className="text-muted-foreground">Your library is empty.</p>
                                <p className="text-sm text-muted-foreground">Click "Add Note" to save your first item.</p>
                            </div>
                        ) : (
                             <div className="space-y-4">
                                {allContent.map(item => <ItemCard key={item.id} item={item} />)}
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
                        {journalEntries.length === 0 ? (
                             <div className="text-center py-16 border-2 border-dashed rounded-lg">
                                <p className="text-muted-foreground">You have no journal entries.</p>
                                <p className="text-sm text-muted-foreground">Go to the journal to write an entry.</p>
                            </div>
                        ) : (
                             <div className="space-y-4">
                                {journalEntries.map(item => <ItemCard key={item.id} item={{...item, source: 'Journal', title: item.label || item.category, content: item.field1 || item.field2 || item.field3 }} />)}
                            </div>
                        )}
                    </TabsContent>
                    <TabsContent value="bookmarks">
                         <div className="text-center py-16 border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground">You have no bookmarks.</p>
                             <p className="text-sm text-muted-foreground">Bookmark items to find them here later.</p>
                        </div>
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
