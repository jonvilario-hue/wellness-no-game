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

export const exportOmniData = () => {
    const data: Record<string, any> = {};
    const keys = [
        'blueprint-store-local-v1',
        'calendar-plans-storage-v3',
        'flashcard-storage-v3',
        'journal-storage-v2',
        'wellness-data-storage-v2',
        'alarm-storage',
        'motivation-storage',
        'cognitive-performance-storage',
        'playbook-storage-v2',
        'pomodoro-storage',
        'sleep-pro-storage',
        'library-storage'
    ];
    
    keys.forEach(key => {
        const val = localStorage.getItem(key);
        if (val) data[key] = JSON.parse(val);
    });

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `polymath-lab-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
};
