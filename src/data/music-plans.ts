
import { MusicJourneyPlan } from "@/types/music";

export const musicPlans: MusicJourneyPlan[] = [
  {
    id: "7-day-ear-awakening",
    title: "7-Day Ear Awakening",
    description: "Progress from basic interval recognition to complex melodic memory.",
    durationDays: 7,
    steps: [
      { day: 1, title: "Unison & Octaves", domain: "Ear Training", drill: "Interval Identification", difficulty: "Beginner", estimatedMinutes: 5 },
      { day: 2, title: "Major vs Minor", domain: "Ear Training", drill: "Chord Quality ID", difficulty: "Beginner", estimatedMinutes: 5 },
      { day: 3, title: "The Perfect 5th", domain: "Ear Training", drill: "Interval Identification", difficulty: "Beginner", estimatedMinutes: 8 },
      { day: 4, title: "Basic Progressions", domain: "Theory & Harmony", drill: "Key Signature ID", difficulty: "Beginner", estimatedMinutes: 10 },
      { day: 5, title: "Melodic Dictation I", domain: "Ear Training", drill: "Interval Identification", difficulty: "Intermediate", estimatedMinutes: 10 },
      { day: 6, title: "The 7th Chord", domain: "Ear Training", drill: "Interval Identification", difficulty: "Intermediate", estimatedMinutes: 12 },
      { day: 7, title: "Harmonic Integration", domain: "Ear Training", drill: "Interval Identification", difficulty: "Intermediate", estimatedMinutes: 15 }
    ]
  },
  {
    id: "14-day-rhythm-foundation",
    title: "14-Day Rhythm Foundation",
    description: "Master everything from basic subdivisions to complex polyrhythms.",
    durationDays: 14,
    steps: [
      { day: 1, title: "The Pulse", domain: "Rhythm & Timing", drill: "Tap-Along", difficulty: "Beginner", estimatedMinutes: 5 }
    ]
  },
  {
    id: "21-day-complete-musician",
    title: "21-Day Complete Musician",
    description: "A comprehensive rotation through all remaining domains with increasing complexity.",
    durationDays: 21,
    steps: [
      { day: 1, title: "Interval Audit", domain: "Ear Training", drill: "Interval Identification", difficulty: "Beginner", estimatedMinutes: 10 },
      { day: 2, title: "Rhythmic Pulse", domain: "Rhythm & Timing", drill: "Tap-Along", difficulty: "Beginner", estimatedMinutes: 10 },
      { day: 3, title: "Melodic Memory", domain: "Ear Training", drill: "Melody Echo", difficulty: "Beginner", estimatedMinutes: 12 }
    ]
  }
];
