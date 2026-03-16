'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface DrawaboxState {
  mvdMode: boolean;
  boxCount: number;
  cylinderCount: number;
  
  // Actions
  toggleMvd: () => void;
  addBoxes: (n: number) => void;
  addCylinders: (n: number) => void;
  resetProgress: () => void;
}

export const useDrawaboxStore = create<DrawaboxState>()(
  persist(
    (set) => ({
      mvdMode: false,
      boxCount: 0,
      cylinderCount: 0,
      
      toggleMvd: () => set((state) => ({ mvdMode: !state.mvdMode })),
      
      addBoxes: (n) => set((state) => ({ boxCount: Math.min(250, state.boxCount + n) })),
      
      addCylinders: (n) => set((state) => ({ cylinderCount: Math.min(250, state.cylinderCount + n) })),
      
      resetProgress: () => set({ boxCount: 0, cylinderCount: 0, mvdMode: false })
    }),
    {
      name: 'drawabox-toolbox-storage-v1',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
