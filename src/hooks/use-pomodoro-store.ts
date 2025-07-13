
'use client';

import { create } from 'zustand';
import { pomodoroPresets, type PomodoroPreset } from '@/data/pomodoro-presets';

export type PomodoroMode = 'work' | 'shortBreak' | 'longBreak';

type PomodoroState = {
  preset: PomodoroPreset;
  mode: PomodoroMode;
  timeLeft: number; // in seconds
  cycles: number;
  isActive: boolean;
  setPreset: (preset: PomodoroPreset) => void;
  setMode: (mode: PomodoroMode) => void;
  tick: () => void;
  toggleIsActive: () => void;
  resetTimer: () => void;
  skipMode: () => void;
};

export const usePomodoroStore = create<PomodoroState>((set, get) => ({
  preset: pomodoroPresets[0],
  mode: 'work',
  timeLeft: pomodoroPresets[0].focusMinutes * 60,
  cycles: 0,
  isActive: false,

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
    const { mode, cycles, preset } = get();
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

    let nextTime = 0;
    if (nextMode === 'work') nextTime = preset.focusMinutes * 60;
    else if (nextMode === 'shortBreak') nextTime = preset.shortBreakMinutes * 60;
    else if (nextMode === 'longBreak') nextTime = preset.longBreakMinutes * 60;

    set({ mode: nextMode, cycles: nextCycles, timeLeft: nextTime, isActive: true });
  }
}));
