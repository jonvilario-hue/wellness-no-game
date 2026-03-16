
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface DrawaboxState {
  boxCount: number;
  cylinderCount: number;
  
  // Actions
  addBoxes: (n: number) => void;
  addCylinders: (n: number) => void;
  resetProgress: () => void;
}

export const useDrawaboxStore = create<DrawaboxState>()(
  persist(
    (set) => ({
      boxCount: 0,
      cylinderCount: 0,
      
      addBoxes: (n) => set((state) => ({ boxCount: Math.min(250, state.boxCount + n) })),
      
      addCylinders: (n) => set((state) => ({ cylinderCount: Math.min(250, state.cylinderCount + n) })),
      
      resetProgress: () => set({ boxCount: 0, cylinderCount: 0 })
    }),
    {
      name: 'drawabox-toolbox-storage-v1',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
