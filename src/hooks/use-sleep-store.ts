
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

type SleepData = {
  duration: number; // hours
  remPercentage: number;
  deepPercentage: number;
  lightPercentage: number;
  wakeEvents: number;
};

// Simplified performance data for the readiness calculation
type GamePerformance = {
  recentEFScore: number; // 0-1
  recentGwmScore: number; // 0-1
  recentGfScore: number; // 0-1
};

type SleepState = {
  sleepData: SleepData;
  gamePerformance: GamePerformance;
  readinessScore: number;
  feedbackSummary: string;
  difficulty: Difficulty;
  generateNewSleepCycle: () => void;
};

const computeReadiness = (sleepData: SleepData, gamePerformance: GamePerformance) => {
    // Normalize sleep duration to a 0-1 scale, capped at 8 hours.
    const durationScore = Math.min(sleepData.duration / 8, 1.0);
    // Ideal light sleep is around 50%, so we score based on proximity to that.
    const lightScore = 1 - Math.abs(sleepData.lightPercentage - 50) / 50;
    // Ideal REM is ~25%
    const remScore = 1 - Math.abs(sleepData.remPercentage - 25) / 25;
    // Lower wake events are better. Normalize based on a max of 5 being bad.
    const wakeScore = 1 - Math.min(sleepData.wakeEvents / 5, 1);

    const sleep_score = (
        0.4 * durationScore +
        0.2 * lightScore +
        0.2 * remScore +
        0.2 * wakeScore
    );

    const performance_score = (
        0.33 * gamePerformance.recentEFScore +
        0.33 * gamePerformance.recentGwmScore +
        0.34 * gamePerformance.recentGfScore
    );
    
    return Math.round((0.6 * sleep_score + 0.4 * performance_score) * 100);
}

const getFeedbackSummary = (score: number) => {
    if (score > 80) {
        return "You're primed for peak performance! Your sleep was restorative, setting you up for a highly productive day. Expect to tackle complex problems with ease.";
    }
    if (score > 60) {
        return "You're well-rested and ready to go. Your cognitive batteries are charged for a solid day of focus and learning.";
    }
    if (score > 40) {
        return "You got some rest, but there's room for improvement. A balanced approach to tasks is best today; don't push too hard.";
    }
    return "It looks like a tough night. Be gentle with yourself today. Focus on light tasks and prioritize rest when you can.";
}

const getDifficulty = (score: number): Difficulty => {
    if (score > 75) return 'Hard';
    if (score > 45) return 'Medium';
    return 'Easy';
}

const generateRandomSleepData = (): SleepData => {
  const duration = 6 + Math.random() * 3; // 6-9 hours
  const deepPercentage = 15 + Math.random() * 10; // 15-25%
  const remPercentage = 20 + Math.random() * 10; // 20-30%
  const lightPercentage = 100 - deepPercentage - remPercentage;
  const wakeEvents = Math.floor(Math.random() * 4); // 0-3 wake events
  
  return {
    duration,
    remPercentage: parseFloat(remPercentage.toFixed(1)),
    deepPercentage: parseFloat(deepPercentage.toFixed(1)),
    lightPercentage: parseFloat(lightPercentage.toFixed(1)),
    wakeEvents,
  };
};

const generateRandomPerformanceData = (): GamePerformance => ({
    recentEFScore: 0.6 + Math.random() * 0.35, // 0.6 - 0.95
    recentGwmScore: 0.55 + Math.random() * 0.4, // 0.55 - 0.95
    recentGfScore: 0.65 + Math.random() * 0.3, // 0.65 - 0.95
});


export const useSleepStore = create<SleepState>()(
    (set) => ({
        sleepData: generateRandomSleepData(),
        gamePerformance: generateRandomPerformanceData(),
        readinessScore: 0,
        feedbackSummary: '',
        difficulty: 'Medium',
        
        generateNewSleepCycle: () => {
            const newSleepData = generateRandomSleepData();
            const newPerfData = generateRandomPerformanceData();
            const newReadinessScore = computeReadiness(newSleepData, newPerfData);
            
            set({
                sleepData: newSleepData,
                gamePerformance: newPerfData,
                readinessScore: newReadinessScore,
                feedbackSummary: getFeedbackSummary(newReadinessScore),
                difficulty: getDifficulty(newReadinessScore),
            });
        },
    })
);

