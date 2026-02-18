'use client';

import { useFirebase, useMemoFirebase, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { AnkiDeckCard } from './anki-deck-card';
import { Layers, Loader2, PackageOpen } from 'lucide-react';

export function AnkiDeckList() {
  const { user, firestore } = useFirebase();

  const ankiQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return query(
      collection(firestore, 'users', user.uid, 'anki-decks'),
      orderBy('uploadedAt', 'desc')
    );
  }, [firestore, user?.uid]);

  const { data: decks, isLoading } = useCollection(ankiQuery);

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Fetching Vault...</p>
      </div>
    );
  }

  if (!decks || decks.length === 0) {
    return (
      <div className="py-20 text-center border-2 border-dashed rounded-2xl bg-muted/20">
        <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-20 mb-4" />
        <p className="text-lg font-bold text-muted-foreground">Your Anki Vault is empty.</p>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-2">
          Upload .apkg files above to keep your practice scripts synchronized across devices.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-1">
        <Layers className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Your Practice Library ({decks.length})</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {decks.map((deck) => (
          <AnkiDeckCard key={deck.id} deck={deck} />
        ))}
      </div>
    </div>
  );
}
