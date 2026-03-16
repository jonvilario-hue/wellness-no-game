'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface DrawaboxState {
  currentLesson: number;
  completedExercises: string[]; // drill IDs
  completedLessons: number[];
  boxCount: number;
  cylinderCount: number;
  mvdMode: boolean;
  
  // Actions
  completeExercise: (id: string) => void;
  toggleLessonComplete: (lessonNumber: number) => void;
  setLesson: (n: number) => void;
  addBoxes: (n: number) => void;
  addCylinders: (n: number) => void;
  toggleMvd: () => void;
}

export const useDrawaboxStore = create<DrawaboxState>()(
  persist(
    (set) => ({
      currentLesson: 0,
      completedExercises: [],
      completedLessons: [],
      boxCount: 0,
      cylinderCount: 0,
      mvdMode: false,
      
      completeExercise: (id) => set((state) => ({
        completedExercises: state.completedExercises.includes(id) 
          ? state.completedExercises 
          : [...state.completedExercises, id]
      })),

      toggleLessonComplete: (lessonNumber) => set((state) => ({
        completedLessons: state.completedLessons.includes(lessonNumber)
          ? state.completedLessons.filter(l => l !== lessonNumber)
          : [...state.completedLessons, lessonNumber]
      })),

      setLesson: (currentLesson) => set({ currentLesson }),
      
      addBoxes: (n) => set((state) => ({ boxCount: Math.min(250, state.boxCount + n) })),
      
      addCylinders: (n) => set((state) => ({ cylinderCount: Math.min(250, state.cylinderCount + n) })),
      
      toggleMvd: () => set((state) => ({ mvdMode: !state.mvdMode })),
    }),
    {
      name: 'drawabox-storage-v1',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
