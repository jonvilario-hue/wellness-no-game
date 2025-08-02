
import type { LucideIcon } from 'lucide-react';
import { Dumbbell, StretchHorizontal, Brain, Wind, Waves, PersonStanding, Cat, Mountain, Bird, TreeDeciduous, Zap, Shield, HeartHandshake, Eye, Sunrise, Moon } from 'lucide-react';

// --- CATEGORY TYPES ---
export type ExerciseCategory = 'Stretching' | 'Strength' | 'Energizer' | 'Wakeup & Wind-Down';
export type MindfulnessCategory = 'Breathwork' | 'Clarity & Focus' | 'Grounding & Safety' | 'Self-Compassion';

type BasePractice = {
  id: string;
  name: string;
  description: string;
  duration: number; // in seconds
  icon: LucideIcon;
};

export type Exercise = BasePractice & {
  category: ExerciseCategory;
};

export type MindfulnessPractice = BasePractice & {
  category: MindfulnessCategory;
};

// --- MOVEMENT MODULES ---

export const movementExercises: Exercise[] = [
  // Mobility & Release -> Stretching
  { id: 'stretch_neck', name: 'Neck & Shoulder Release', description: 'Gently release tension from sitting or stress.', duration: 120, icon: PersonStanding, category: 'Stretching' },
  { id: 'stretch_hips', name: 'Hip Openers', description: 'Counteract the effects of long sitting periods.', duration: 180, icon: PersonStanding, category: 'Stretching' },
  { id: 'stretch_spine', name: 'Thoracic Spine Rotations', description: 'Improve mid-back mobility and posture.', duration: 90, icon: Cat, category: 'Stretching' },
  
  // Functional Strength -> Strength
  { id: 'strength_wall_pushups', name: 'Wall Push-ups', description: 'Build shoulder integrity and upper body strength.', duration: 120, icon: Dumbbell, category: 'Strength' },
  { id: 'strength_balance', name: 'Single-Leg Balance', description: 'Enhance stability, focus, and knee health.', duration: 60, icon: Mountain, category: 'Strength' },
  { id: 'strength_core', name: 'Core Awakening', description: 'Engage deep core muscles with plank variations.', duration: 90, icon: Dumbbell, category: 'Strength' },
  
  // Quick Energy Boosters -> Energizer
  { id: 'energizer_high_knees', name: '1-Min High Knees', description: 'Quickly elevate your heart rate and energy.', duration: 60, icon: Zap, category: 'Energizer' },
  { id: 'energizer_shadow_boxing', name: 'Shadow Boxing', description: 'A dynamic cardio workout to shake off sluggishness.', duration: 120, icon: Zap, category: 'Energizer' },
  { id: 'energizer_breath_squats', name: 'Breath & Squat Pulses', description: 'Sync breath with movement to energize the body.', duration: 90, icon: Zap, category: 'Energizer' },

  // Gentle Wakeups / Wind-Downs -> Wakeup & Wind-Down
  { id: 'wakeup_flow', name: 'Morning Mobility Flow', description: 'Wake up your spine, ankles, and shoulders.', duration: 180, icon: Sunrise, category: 'Wakeup & Wind-Down' },
  { id: 'wind_down_stretch', name: 'Pre-Bedtime Stretch', description: 'Release the day\'s tension from hamstrings and neck.', duration: 240, icon: Moon, category: 'Wakeup & Wind-Down' },
];


// --- STILLNESS MODULES ---

export const mindfulnessPractices: MindfulnessPractice[] = [
  // Breathwork for State Shifting -> Breathwork
  { id: 'breath_box', name: 'Box Breathing', description: 'Inhale 4s, hold 4s, exhale 4s, hold 4s. For calm and focus.', duration: 180, icon: Wind, category: 'Breathwork' },
  { id: 'breath_478', name: '4-7-8 Breath', description: 'A powerful technique to reduce anxiety and promote rest.', duration: 120, icon: Wind, category: 'Breathwork' },
  { id: 'breath_resonant', name: 'Resonant Breathing', description: 'Breathe at a rate of 5-6 breaths per minute to balance the nervous system.', duration: 300, icon: Wind, category: 'Breathwork' },

  // Mental Clarity & Focus Tools -> Clarity & Focus
  { id: 'focus_wins', name: 'Name 3 Wins', description: 'A self-coaching exercise to build momentum and clarity.', duration: 120, icon: Brain, category: 'Clarity & Focus' },
  { id: 'focus_visualization', name: 'Focus Visualization', description: 'Mentally rehearse a task to improve performance and reduce anxiety.', duration: 180, icon: Eye, category: 'Clarity & Focus' },
  { id: 'focus_reset', name: 'Two-Minute Reset', description: 'A brief mindfulness pause to break from overwhelm and regain focus.', duration: 120, icon: Brain, category: 'Clarity & Focus' },
  
  // Grounding & Safety Practices -> Grounding & Safety
  { id: 'grounding_54321', name: '5-4-3-2-1 Senses', description: 'Engage all five senses to anchor yourself in the present moment.', duration: 180, icon: Shield, category: 'Grounding & Safety' },
  { id: 'grounding_tactile', name: 'Tactile Object Focus', description: 'Hold an object and focus on its texture, temperature, and weight.', duration: 120, icon: Shield, category: 'Grounding & Safety' },
  { id: 'grounding_nature', name: 'Nature Visualization', description: 'Imagine a safe, natural place and sync your breath with its rhythm.', duration: 300, icon: TreeDeciduous, category: 'Grounding & Safety' },

  // Self-Compassion & Emotional Support -> Self-Compassion
  { id: 'compassion_metta', name: 'Loving-Kindness Meditation', description: 'Extend wishes of well-being to yourself and others.', duration: 300, icon: HeartHandshake, category: 'Self-Compassion' },
  { id: 'compassion_journal', name: '"What do I need?"', description: 'A journaling prompt to check in with your inner needs.', duration: 180, icon: HeartHandshake, category: 'Self-Compassion' },
  { id: 'compassion_mantra', name: 'Gentle Inner Voice', description: 'Practice a supportive mantra to counter self-criticism.', duration: 120, icon: HeartHandshake, category: 'Self-Compassion' },
];
