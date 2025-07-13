
export type PomodoroPreset = {
  name: string;
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  cyclesUntilLongBreak: number;
  description: string;
  attachedDomain?: string;
};

export const pomodoroPresets: PomodoroPreset[] = [
  {
    name: "Classic Pomodoro",
    focusMinutes: 25,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    cyclesUntilLongBreak: 4,
    description: "The original method. Great for balanced focus and rest.",
  },
  {
    name: "Deep Focus",
    focusMinutes: 50,
    shortBreakMinutes: 10,
    longBreakMinutes: 30,
    cyclesUntilLongBreak: 3,
    description: "Ideal for deep work sessions with fewer interruptions.",
  },
  {
    name: "Micro Pomodoro",
    focusMinutes: 15,
    shortBreakMinutes: 3,
    longBreakMinutes: 10,
    cyclesUntilLongBreak: 4,
    description: "Best for light tasks, warming up, or clearing a to-do list.",
  },
  {
    name: "Creative Sprint",
    focusMinutes: 45,
    shortBreakMinutes: 5,
    longBreakMinutes: 20,
    cyclesUntilLongBreak: 2,
    description: "Longer focus blocks for creative or problem-solving tasks.",
  },
  {
    name: "Recovery Mode",
    focusMinutes: 10,
    shortBreakMinutes: 10,
    longBreakMinutes: 30,
    cyclesUntilLongBreak: 2,
    description: "Gentle, low-pressure intervals for low-energy days.",
  },
  {
    name: "Cognitive Training",
    focusMinutes: 20,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    cyclesUntilLongBreak: 3,
    description: "A balanced session specifically for brain training exercises.",
    attachedDomain: "working_memory"
  }
];
