
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { PlaybookEntry, PlaybookStatus, ExecutionGuideResponse, CustomStrategy } from '@/types/architecture-enhanced';

type PlaybookState = {
  entries: Record<string, PlaybookEntry>;
  guides: Record<string, ExecutionGuideResponse>;
  customStrategies: CustomStrategy[];
  orderedFavoriteIds: string[]; // Order of strategies in the playbook
  
  toggleFavorite: (strategyId: string, name: string) => void;
  updateStatus: (strategyId: string, status: PlaybookStatus) => void;
  updateNotes: (strategyId: string, notes: string) => void;
  linkToBlueprint: (strategyId: string, blueprintId: string) => void;
  
  saveGuide: (strategyId: string, responses: Record<string, string>, blueprintId?: string) => void;
  
  addCustomStrategy: (strategy: Omit<CustomStrategy, 'id' | 'createdAt' | 'isCustom'>) => void;
  deleteCustomStrategy: (id: string) => void;
  reorderFavorites: (newOrder: string[]) => void;
};

export const usePlaybookStore = create<PlaybookState>()(
  persist(
    immer((set) => ({
      entries: {},
      guides: {},
      customStrategies: [],
      orderedFavoriteIds: [],

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
            if (!state.orderedFavoriteIds.includes(id)) {
              state.orderedFavoriteIds.push(id);
            }
          } else {
            state.entries[id].isFavorite = !state.entries[id].isFavorite;
            if (!state.entries[id].isFavorite) {
              state.orderedFavoriteIds = state.orderedFavoriteIds.filter(fid => fid !== id);
            } else if (!state.orderedFavoriteIds.includes(id)) {
              state.orderedFavoriteIds.push(id);
            }
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

      addCustomStrategy: (strategy) => {
        set((state) => {
          state.customStrategies.push({
            ...strategy,
            id: `custom-strat-${Date.now()}`,
            isCustom: true,
            createdAt: new Date().toISOString()
          });
        });
      },

      deleteCustomStrategy: (id) => {
        set((state) => {
          state.customStrategies = state.customStrategies.filter(s => s.id !== id);
          if (state.entries[id]) {
            delete state.entries[id];
            state.orderedFavoriteIds = state.orderedFavoriteIds.filter(fid => fid !== id);
          }
        });
      },

      reorderFavorites: (newOrder) => {
        set((state) => {
          state.orderedFavoriteIds = newOrder;
        });
      }
    })),
    {
      name: 'playbook-storage-v2',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
