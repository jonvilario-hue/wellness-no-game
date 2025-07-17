
'use client';

import type { Deck } from '@/types/flashcards';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface DeckListItemProps {
  deck: Deck;
  cardCount: number;
  onEdit: () => void;
  onDelete: () => void;
}

export function DeckListItem({ deck, cardCount, onEdit, onDelete }: DeckListItemProps) {
  return (
    <Card className="group hover:bg-muted/50 transition-colors">
      <CardContent className="p-3 flex items-center justify-between">
        <Link href={`/flashcards/deck/${deck.id}`} className="flex-grow">
          <div className="flex items-center gap-4">
            <div className="flex-grow">
              <p className="font-semibold">{deck.name}</p>
              <p className="text-sm text-muted-foreground">{cardCount} card{cardCount !== 1 && 's'}</p>
            </div>
          </div>
        </Link>
        <div className="flex items-center">
            <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
                    <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
            </div>
            <Link href={`/flashcards/deck/${deck.id}`}>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
        </div>
      </CardContent>
    </Card>
  );
}
