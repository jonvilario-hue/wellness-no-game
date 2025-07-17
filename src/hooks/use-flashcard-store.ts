
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Card, Deck, CardType } from '@/types/flashcards';

type FlashcardStore = {
  decks: Deck[];
  cards: Card[];
  addDeck: (deck: { name: string; description?: string }) => void;
  updateDeck: (deckId: string, updates: Partial<Deck>) => void;
  deleteDeck: (deckId: string) => void;
  addCard: (card: { front: string; back: string; deckId: string; type: CardType }) => void;
  updateCard: (updatedCard: Card) => void;
  deleteCard: (cardId: string) => void;
  bulkAddCards: (newCards: Omit<Card, 'id' | 'interval' | 'easeFactor' | 'repetitions' | 'dueDate'>[]) => void;
};

const createInitialState = () => {
    const defaultDeck: Deck = {
        id: 'default',
        name: 'Default',
        description: 'Cards that don\'t belong to a specific deck.'
    };
    return {
        decks: [defaultDeck],
        cards: [],
    };
};

export const useFlashcardStore = create<FlashcardStore>()(
  persist(
    (set, get) => ({
      ...createInitialState(),
      addDeck: (deck) =>
        set((state) => ({
          decks: [
            ...state.decks,
            {
              id: crypto.randomUUID(),
              ...deck,
            },
          ],
        })),
      updateDeck: (deckId, updates) =>
        set((state) => ({
          decks: state.decks.map((d) => (d.id === deckId ? { ...d, ...updates } : d)),
        })),
      deleteDeck: (deckId) =>
        set((state) => {
          if (deckId === 'default') return state; // Prevent deleting the default deck
          // Instead of deleting cards, move them to the default deck
          const newCards = state.cards.map(card => {
            if (card.deckId === deckId) {
              return { ...card, deckId: 'default' };
            }
            return card;
          });
          return {
            decks: state.decks.filter((d) => d.id !== deckId),
            cards: newCards,
          };
        }),
      addCard: (card) =>
        set((state) => ({
          cards: [
            ...state.cards,
            {
              id: crypto.randomUUID(),
              ...card,
              interval: 1,
              easeFactor: 2.5,
              repetitions: 0,
              dueDate: new Date().toISOString(),
            },
          ],
        })),
      updateCard: (updatedCard) =>
        set((state) => ({
          cards: state.cards.map((c) => (c.id === updatedCard.id ? updatedCard : c)),
        })),
      deleteCard: (cardId) =>
        set((state) => ({
          cards: state.cards.filter((c) => c.id !== cardId),
        })),
       bulkAddCards: (newCards) => {
          set((state) => {
            // Ensure default deck exists
            let currentDecks = state.decks;
            if (!currentDecks.find(d => d.id === 'default')) {
                currentDecks = [...currentDecks, { id: 'default', name: 'Default', description: 'Default deck for imports.' }];
            }

            const transformedCards: Card[] = newCards.map(c => ({
                id: crypto.randomUUID(),
                ...c,
                interval: 1,
                easeFactor: 2.5,
                repetitions: 0,
                dueDate: new Date().toISOString(),
            }));
            return {
                cards: [...state.cards, ...transformedCards],
                decks: currentDecks,
            };
          });
      },
    }),
    {
      name: 'flashcard-storage-v2',
      storage: createJSONStorage(() => localStorage),
       onRehydrateStorage: (state) => {
        if (!state) return;
        const s = state as FlashcardStore;
        if (!s.decks || s.decks.length === 0 || !s.decks.find(d => d.id === 'default')) {
            const defaults = createInitialState();
            s.decks = defaults.decks;
        }
      }
    }
  )
);
