
export type PomodoroPreset = {
  name: string;
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  cyclesUntilLongBreak: number;
  attachedDomain?: string;
};

export const pomodoroPresets: PomodoroPreset[] = [
  {
    name: "Classic Pomodoro",
    focusMinutes: 25,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    cyclesUntilLongBreak: 4
  },
  {
    name: "Deep Focus",
    focusMinutes: 50,
    shortBreakMinutes: 10,
    longBreakMinutes: 30,
    cyclesUntilLongBreak: 3
  },
  {
    name: "Micro Pomodoro",
    focusMinutes: 15,
    shortBreakMinutes: 3,
    longBreakMinutes: 10,
    cyclesUntilLongBreak: 4
  },
  {
    name: "Creative Sprint",
    focusMinutes: 45,
    shortBreakMinutes: 5,
    longBreakMinutes: 20,
    cyclesUntilLongBreak: 2
  },
  {
    name: "Recovery Mode",
    focusMinutes: 10,
    shortBreakMinutes: 10,
    longBreakMinutes: 30,
    cyclesUntilLongBreak: 2
  },
  {
    name: "Cognitive Training",
    focusMinutes: 20,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    cyclesUntilLongBreak: 3,
    attachedDomain: "working_memory"
  }
];
