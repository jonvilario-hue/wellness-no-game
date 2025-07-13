
'use client';

import { create } from 'zustand';
import { pomodoroPresets, type PomodoroPreset } from '@/data/pomodoro-presets';
import { persist, createJSONStorage } from 'zustand/middleware';

export type PomodoroMode = 'work' | 'shortBreak' | 'longBreak';

type PomodoroState = {
  preset: PomodoroPreset;
  mode: PomodoroMode;
  timeLeft: number; // in seconds
  cycles: number;
  isActive: boolean;
  showGameSuggestion: boolean;
  suggestGameEnabled: boolean;
  setSuggestGameEnabled: (enabled: boolean) => void;
  handleGameSuggestion: (choice: 'play' | 'break') => void;
  setPreset: (preset: PomodoroPreset) => void;
  setMode: (mode: PomodoroMode) => void;
  tick: () => void;
  toggleIsActive: () => void;
  resetTimer: () => void;
  skipMode: () => void;
};

export const usePomodoroStore = create<PomodoroState>()(
    persist(
        (set, get) => ({
            preset: pomodoroPresets[0],
            mode: 'work',
            timeLeft: pomodoroPresets[0].focusMinutes * 60,
            cycles: 0,
            isActive: false,
            showGameSuggestion: false,
            suggestGameEnabled: true,

            setSuggestGameEnabled: (enabled) => set({ suggestGameEnabled: enabled }),

            handleGameSuggestion: (choice) => {
                set({ showGameSuggestion: false });
                if (choice === 'break') {
                    const { cycles, preset } = get();
                    const nextMode = (cycles + 1) % preset.cyclesUntilLongBreak === 0 ? 'longBreak' : 'shortBreak';
                    set({ cycles: cycles + 1 });
                    get().setMode(nextMode);
                }
                // If 'play', the dialog closes and the user navigates via the Link. The next break will start after the game.
            },
        
            setPreset: (newPreset) => {
                set({
                preset: newPreset,
                isActive: false,
                mode: 'work',
                timeLeft: newPreset.focusMinutes * 60,
                cycles: 0,
                });
            },
            
            setMode: (newMode) => {
                const { preset } = get();
                let newTime = 0;
                if (newMode === 'work') newTime = preset.focusMinutes * 60;
                else if (newMode === 'shortBreak') newTime = preset.shortBreakMinutes * 60;
                else if (newMode === 'longBreak') newTime = preset.longBreakMinutes * 60;
                set({ mode: newMode, timeLeft: newTime, isActive: true });
            },

            tick: () => {
                set((state) => ({ timeLeft: state.timeLeft - 1 }));
            },

            toggleIsActive: () => {
                set((state) => ({ isActive: !state.isActive }));
            },

            resetTimer: () => {
                const { preset, mode } = get();
                let timeToReset = 0;
                if (mode === 'work') timeToReset = preset.focusMinutes * 60;
                else if (mode === 'shortBreak') timeToReset = preset.shortBreakMinutes * 60;
                else if (mode === 'longBreak') timeToReset = preset.longBreakMinutes * 60;
                set({ isActive: false, timeLeft: timeToReset });
            },
            
            skipMode: () => {
                const { setMode, mode, cycles, preset, suggestGameEnabled } = get();
                
                if (mode === 'work' && suggestGameEnabled) {
                    set({ isActive: false, showGameSuggestion: true });
                    return;
                }

                let nextMode: PomodoroMode;
                let nextCycles = cycles;

                if (mode === 'work') {
                nextCycles++;
                if (nextCycles % preset.cyclesUntilLongBreak === 0) {
                    nextMode = 'longBreak';
                } else {
                    nextMode = 'shortBreak';
                }
                } else { // shortBreak or longBreak
                nextMode = 'work';
                }
                
                set({ cycles: nextCycles });
                setMode(nextMode);
            }
        }),
        {
            name: 'pomodoro-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

      