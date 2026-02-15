
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { LibraryItem, LibraryItemType } from '@/types/library';

type LibraryStore = {
  items: LibraryItem[];
  addItem: (item: Omit<LibraryItem, 'id' | 'createdAt' | 'bookmarked'>) => LibraryItem;
  updateItem: (id: string, updates: Partial<LibraryItem>) => void;
  deleteItem: (id: string) => void;
  toggleBookmark: (id: string) => void;
};

export const useLibraryStore = create<LibraryStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (newItem) => {
        const itemWithId: LibraryItem = {
          ...newItem,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          bookmarked: false,
        };
        set((state) => ({ items: [itemWithId, ...state.items] }));
        return itemWithId;
      },
      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        })),
      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      toggleBookmark: (id: string) =>
        set((state) => ({
            items: state.items.map((item) =>
                item.id === id ? { ...item, bookmarked: !item.bookmarked } : item
            ),
        })),
    }),
    {
      name: 'library-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
