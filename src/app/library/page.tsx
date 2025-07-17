
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flashcard, getStoredCards } from "@/components/FlashcardStudy";
import { Label } from "@/components/ui/label";

// Deck helpers for card stats
export const getDeckStats = (deckId: string, cards: Flashcard[]) => {
  const deckCards = cards.filter(c => c.deckId === deckId);
  const dueCount = deckCards.filter(c => new Date(c.dueDate) <= new Date()).length;
  return {
    total: deckCards.length,
    due: dueCount,
  };
};

export type Deck = {
  id: string;
  name: string;
  settings: {
    newCardsPerDay: number;
    maxReviewsPerDay: number;
    learningSteps: number[];
    startingEase: number;
  };
};

export default function DeckLibraryPage() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("decks");
    if (stored) setDecks(JSON.parse(stored));
    setCards(getStoredCards());
  }, []);

  useEffect(() => {
    localStorage.setItem("decks", JSON.stringify(decks));
  }, [decks]);

  const createDeck = () => {
    if (!newName.trim()) return;
    const newDeck: Deck = {
      id: crypto.randomUUID(),
      name: newName,
      settings: {
        newCardsPerDay: 10,
        maxReviewsPerDay: 100,
        learningSteps: [1, 10],
        startingEase: 2.5,
      },
    };
    setDecks([...decks, newDeck]);
    setNewName("");
  };

  const deleteDeck = (id: string) => {
    if (!confirm("Delete this deck and all its cards? This cannot be undone.")) return;
    setDecks((prev) => prev.filter((d) => d.id !== id));
    const remainingCards = cards.filter((c) => c.deckId !== id);
    localStorage.setItem("cards", JSON.stringify(remainingCards));
    setCards(remainingCards);
  };

  const renameDeck = (id: string, name: string) => {
    setDecks((prev) => prev.map((deck) => deck.id === id ? { ...deck, name } : deck));
  };

  const updateDeckSetting = (id: string, key: keyof Deck["settings"], value: any) => {
    setDecks((prev) =>
      prev.map((deck) =>
        deck.id === id ? { ...deck, settings: { ...deck.settings, [key]: value } } : deck
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Your Decks</h1>

      <Card>
        <CardContent className="p-4">
            <div className="flex gap-4">
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="New deck name..." />
                <Button onClick={createDeck}>Create Deck</Button>
            </div>
        </CardContent>
      </Card>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {decks.map((deck) => {
          const { total, due } = getDeckStats(deck.id, cards);
          return (
            <Card key={deck.id}>
              <CardContent className="p-4 space-y-3">
                <Input
                  className="text-lg font-bold"
                  value={deck.name}
                  onChange={(e) => renameDeck(deck.id, e.target.value)}
                  placeholder="Deck Name"
                />
                <p className="text-sm text-muted-foreground">
                  {total} cards, {due} due
                </p>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">New Cards/Day</Label>
                  <Input
                    type="number"
                    value={deck.settings.newCardsPerDay}
                    onChange={(e) => updateDeckSetting(deck.id, "newCardsPerDay", Number(e.target.value))}
                  />
                  <Label className="text-sm font-medium">Max Reviews/Day</Label>
                  <Input
                    type="number"
                    value={deck.settings.maxReviewsPerDay}
                    onChange={(e) => updateDeckSetting(deck.id, "maxReviewsPerDay", Number(e.target.value))}
                  />
                  <Label className="text-sm font-medium">Learning Steps (minutes)</Label>
                  <Input
                    type="text"
                    value={deck.settings.learningSteps.join(",")}
                    onChange={(e) => updateDeckSetting(deck.id, "learningSteps", e.target.value.split(",").map(Number))}
                  />
                  <Label className="text-sm font-medium">Starting Ease</Label>
                   <Input
                    type="number"
                    step="0.1"
                    value={deck.settings.startingEase}
                    onChange={(e) => updateDeckSetting(deck.id, "startingEase", Number(e.target.value))}
                  />
                </div>
                <Button variant="destructive" className="w-full" onClick={() => deleteDeck(deck.id)}>
                  Delete Deck
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
