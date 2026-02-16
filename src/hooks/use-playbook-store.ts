
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { PlaybookEntry, PlaybookStatus, ExecutionGuideResponse } from '@/types/architecture-enhanced';

type PlaybookState = {
  entries: Record<string, PlaybookEntry>;
  guides: Record<string, ExecutionGuideResponse>;
  
  toggleFavorite: (strategyId: string, name: string) => void;
  updateStatus: (strategyId: string, status: PlaybookStatus) => void;
  updateNotes: (strategyId: string, notes: string) => void;
  linkToBlueprint: (strategyId: string, blueprintId: string) => void;
  
  saveGuide: (strategyId: string, responses: Record<string, string>, blueprintId?: string) => void;
};

export const usePlaybookStore = create<PlaybookState>()(
  persist(
    immer((set) => ({
      entries: {},
      guides: {},

      toggleFavorite: (id, name) => {
        set((state) => {
          if (!state.entries[id]) {
            state.entries[id] = {
              strategyId: id,
              strategyName: name,
              isFavorite: true,
              status: 'Not tried',
              personalNotes: '',
              timesUsed: 0,
              linkedBlueprintIds: []
            };
          } else {
            state.entries[id].isFavorite = !state.entries[id].isFavorite;
          }
        });
      },

      updateStatus: (id, status) => {
        set((state) => {
          if (state.entries[id]) {
            state.entries[id].status = status;
            if (status !== 'Not tried') {
              state.entries[id].timesUsed += 1;
              state.entries[id].lastUsedAt = new Date().toISOString();
            }
          }
        });
      },

      updateNotes: (id, notes) => {
        set((state) => {
          if (state.entries[id]) state.entries[id].personalNotes = notes;
        });
      },

      linkToBlueprint: (id, bId) => {
        set((state) => {
          if (state.entries[id] && !state.entries[id].linkedBlueprintIds.includes(bId)) {
            state.entries[id].linkedBlueprintIds.push(bId);
          }
        });
      },

      saveGuide: (id, resp, bId) => {
        set((state) => {
          state.guides[id] = {
            strategyId: id,
            responses: resp,
            completedAt: new Date().toISOString(),
            linkedBlueprintId: bId
          };
        });
      },
    })),
    {
      name: 'playbook-storage-v1',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
