
'use client';

import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';
import { FlashcardDecks } from '@/components/flashcards/flashcard-decks';
import { Button } from '@/components/ui/button';
import { BarChart2 } from 'lucide-react';
import Link from 'next/link';

export default function FlashcardsPage() {
  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-5xl space-y-6">
            <div className="flex justify-end">
                <Button asChild variant="outline">
                    <Link href="/flashcards/stats">
                        <BarChart2 className="mr-2 h-4 w-4" />
                        View Statistics
                    </Link>
                </Button>
            </div>
            <FlashcardDecks />
        </div>
      </main>
    </>
  );
}
