
'use client';

import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileText, Bookmark, Search } from 'lucide-react';

export default function LibraryPage() {
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
                            <TabsTrigger value="bookmarks"><Bookmark className="w-4 h-4 mr-2"/>Bookmarks</TabsTrigger>
                        </TabsList>
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search your library..." className="pl-8" />
                        </div>
                    </div>
                    <TabsContent value="all">
                        <div className="text-center py-16 border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground">Your library is empty.</p>
                            <p className="text-sm text-muted-foreground">Content you save will appear here.</p>
                        </div>
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
    </>
  );
}
