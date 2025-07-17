
'use client';

import { FlashcardDecks } from '@/components/flashcards/flashcard-decks';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';

export default function FlashcardsPage() {
  return (
    <>
      <div className="sticky top-0 z-20">
        <Header />
        <PageNav />
      </div>
      <MotivationalMessage />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="space-y-8">
          <FlashcardDecks />
        </div>
      </main>
    </>
  );
}
