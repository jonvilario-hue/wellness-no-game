'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type WhyChain = {
  id: string;
  topic: string;
  questions: string[];
  answers: string[];
  depthScore: 'basic' | 'intermediate' | 'deep';
  date: string;
};

export type VisualPair = {
  id: string;
  concept: string;
  image: string; // base64
  date: string;
};

export type StudySession = {
  id: string;
  tool: string;
  focus: number; // 1-10
  duration: number; // minutes
  timestamp: string;
};

export type SelfExplanation = {
  id: string;
  concept: string;
  relation: string;
  scenario: string;
  reasoning: string;
  date: string;
};

export type ConcreteExample = {
  id: string;
  concept: string;
  examples: string[];
  date: string;
};

interface ScholarState {
  whyChains: WhyChain[];
  visualPairs: VisualPair[];
  sessions: StudySession[];
  explanations: SelfExplanation[];
  examples: ConcreteExample[];
  
  addWhyChain: (chain: Omit<WhyChain, 'id' | 'date'>) => void;
  addVisualPair: (pair: Omit<VisualPair, 'id' | 'date'>) => void;
  deleteVisualPair: (id: string) => void;
  addSession: (session: Omit<StudySession, 'id' | 'timestamp'>) => void;
  addExplanation: (explanation: Omit<SelfExplanation, 'id' | 'date'>) => void;
  addExample: (example: Omit<ConcreteExample, 'id' | 'date'>) => void;
}

export const useScholarStore = create<ScholarState>()(
  persist(
    (set) => ({
      whyChains: [],
      visualPairs: [],
      sessions: [],
      explanations: [],
      examples: [],

      addWhyChain: (chain) => set((s) => ({
        whyChains: [{ ...chain, id: crypto.randomUUID(), date: new Date().toISOString() }, ...s.whyChains]
      })),
      addVisualPair: (pair) => set((s) => ({
        visualPairs: [{ ...pair, id: crypto.randomUUID(), date: new Date().toISOString() }, ...s.visualPairs]
      })),
      deleteVisualPair: (id) => set((s) => ({
        visualPairs: s.visualPairs.filter(p => p.id !== id)
      })),
      addSession: (session) => set((s) => ({
        sessions: [{ ...session, id: crypto.randomUUID(), timestamp: new Date().toISOString() }, ...s.sessions]
      })),
      addExplanation: (explanation) => set((s) => ({
        explanations: [{ ...explanation, id: crypto.randomUUID(), date: new Date().toISOString() }, ...s.explanations]
      })),
      addExample: (example) => set((s) => ({
        examples: [{ ...example, id: crypto.randomUUID(), date: new Date().toISOString() }, ...s.examples]
      })),
    }),
    {
      name: 'scholar-hub-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
