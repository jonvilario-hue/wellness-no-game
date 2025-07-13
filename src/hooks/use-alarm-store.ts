
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Alarm = {
    id: number;
    time: string;
    period: 'AM' | 'PM';
    label: string;
    active: boolean;
    puzzle: boolean;
    repeatWeekly: boolean;
    repeatDays: number[]; // 0-6 for Sun-Sat
};

type AlarmStore = {
    alarms: Alarm[];
    addAlarm: (alarm: Omit<Alarm, 'id'> & { id?: number }) => void;
    removeAlarm: (id: number) => void;
    toggleAlarm: (id: number) => void;
    toggleAlarmPuzzle: (id: number) => void;
    updateAlarm: (id: number, updates: Partial<Alarm>) => void;
};

const defaultAlarms: Alarm[] = [
    { id: 1, time: '06:30', period: 'AM', label: 'Wake Up + Gwm Training', active: true, puzzle: true, repeatWeekly: true, repeatDays: [1,2,3,4,5] },
    { id: 2, time: '09:00', period: 'AM', label: 'Start Deep Work Block', active: true, puzzle: true, repeatWeekly: false, repeatDays: [] },
    { id: 3, time: '08:00', period: 'PM', label: 'Wind Down', active: false, puzzle: false, repeatWeekly: true, repeatDays: [0,6] },
];

export const useAlarmStore = create<AlarmStore>()(
    persist(
        (set) => ({
            alarms: defaultAlarms,
            addAlarm: (newAlarm) =>
                set((state) => ({
                    alarms: [...state.alarms, { ...newAlarm, id: newAlarm.id || Date.now() }],
                })),
            removeAlarm: (id) =>
                set((state) => ({
                    alarms: state.alarms.filter((alarm) => alarm.id !== id),
                })),
            toggleAlarm: (id) =>
                set((state) => ({
                    alarms: state.alarms.map((alarm) =>
                        alarm.id === id ? { ...alarm, active: !alarm.active } : alarm
                    ),
                })),
            toggleAlarmPuzzle: (id) =>
                set((state) => ({
                    alarms: state.alarms.map((alarm) =>
                        alarm.id === id ? { ...alarm, puzzle: !alarm.puzzle } : alarm
                    ),
                })),
            updateAlarm: (id, updates) =>
                set((state) => ({
                    alarms: state.alarms.map((alarm) =>
                        alarm.id === id ? { ...alarm, ...updates } : alarm
                    ),
                })),
        }),
        {
            name: 'alarm-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
            onRehydrateStorage: (state) => {
                // Prevent rehydration on the server
                if (typeof window === 'undefined') {
                  return;
                }
                // Optional: you can do something with the state after it's rehydrated
                console.log('Alarm store has been rehydrated');
            },
        }
    )
);
