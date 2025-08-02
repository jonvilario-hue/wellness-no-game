
import type { LucideIcon } from 'lucide-react';
import { Dumbbell, HeartPulse, StretchHorizontal, Brain, Wind, Waves, PersonStanding, Cat, Mountain, Bird, TreeDeciduous } from 'lucide-react';

export type ExerciseCategory = 'Stretching' | 'Strength' | 'Cardio';
export type MindfulnessCategory = 'Breathing' | 'Meditation' | 'Relaxation';

type BaseExercise = {
  id: string;
  name: string;
  description: string;
  duration: number; // in seconds
  icon: LucideIcon;
};

export type Exercise = BaseExercise & {
  category: ExerciseCategory;
};

export type MindfulnessPractice = BaseExercise & {
  category: MindfulnessCategory;
};

export const movementExercises: Exercise[] = [
  // Stretching
  { id: 'stretch_neck', name: 'Neck Rolls', description: 'Gently roll your head from side to side to release neck tension.', duration: 60, icon: PersonStanding, category: 'Stretching' },
  { id: 'stretch_shoulders', name: 'Shoulder Shrugs', description: 'Raise and lower your shoulders to relieve upper back tightness.', duration: 60, icon: PersonStanding, category: 'Stretching' },
  { id: 'stretch_cat_cow', name: 'Cat-Cow Stretch', description: 'Alternate between arching and rounding your back to improve spinal flexibility.', duration: 90, icon: Cat, category: 'Stretching' },
  { id: 'stretch_hamstring', name: 'Standing Hamstring Stretch', description: 'Reach for your toes while keeping your legs straight to stretch the back of your legs.', duration: 60, icon: PersonStanding, category: 'Stretching' },
  
  // Strength
  { id: 'strength_squats', name: 'Bodyweight Squats', description: 'Perform squats to build leg and core strength.', duration: 120, icon: Dumbbell, category: 'Strength' },
  { id: 'strength_pushups', name: 'Push-ups', description: 'Engage your chest, shoulders, and triceps. Can be done on knees or toes.', duration: 120, icon: Dumbbell, category: 'Strength' },
  { id: 'strength_plank', name: 'Plank', description: 'Hold a straight body position to build core stability.', duration: 60, icon: Dumbbell, category: 'Strength' },
  { id: 'strength_lunges', name: 'Alternating Lunges', description: 'Step forward and bend both knees to strengthen your legs and improve balance.', duration: 120, icon: Dumbbell, category: 'Strength' },

  // Cardio
  { id: 'cardio_jumping_jacks', name: 'Jumping Jacks', description: 'A full-body exercise to get your heart rate up quickly.', duration: 120, icon: HeartPulse, category: 'Cardio' },
  { id: 'cardio_high_knees', name: 'High Knees', description: 'Run in place, bringing your knees up towards your chest.', duration: 120, icon: HeartPulse, category: 'Cardio' },
  { id: 'cardio_burpees', name: 'Burpees', description: 'A high-intensity exercise combining a squat, push-up, and jump.', duration: 180, icon: HeartPulse, category: 'Cardio' },
  { id: 'cardio_shadow_boxing', name: 'Shadow Boxing', description: 'Practice punches and footwork for a dynamic cardio workout.', duration: 180, icon: HeartPulse, category: 'Cardio' },
];

export const mindfulnessPractices: MindfulnessPractice[] = [
  // Breathing
  { id: 'breath_box', name: 'Box Breathing', description: 'Inhale for 4s, hold for 4s, exhale for 4s, hold for 4s. Repeat.', duration: 180, icon: Wind, category: 'Breathing' },
  { id: 'breath_478', name: '4-7-8 Breathing', description: 'Inhale for 4s, hold for 7s, exhale slowly for 8s. A powerful relaxation technique.', duration: 180, icon: Wind, category: 'Breathing' },
  { id: 'breath_diaphragmatic', name: 'Diaphragmatic Breathing', description: 'Focus on deep belly breaths to engage the diaphragm and calm the nervous system.', duration: 300, icon: Wind, category: 'Breathing' },

  // Meditation
  { id: 'meditation_awareness', name: 'Mindfulness of Breath', description: 'Gently guide your attention to the sensation of your breath without trying to change it.', duration: 300, icon: Brain, category: 'Meditation' },
  { id: 'meditation_body_scan', name: 'Body Scan', description: 'Bring awareness to each part of your body sequentially, noticing sensations without judgment.', duration: 600, icon: Brain, category: 'Meditation' },
  { id: 'meditation_loving_kindness', name: 'Loving-Kindness', description: 'Extend feelings of warmth, kindness, and compassion to yourself and others.', duration: 480, icon: Brain, category: 'Meditation' },

  // Relaxation
  { id: 'relaxation_visualization', name: 'Guided Visualization', description: 'Imagine a calm, peaceful place in detail to transport your mind and relax your body.', duration: 300, icon: Waves, category: 'Relaxation' },
  { id: 'relaxation_pmr', name: 'Progressive Muscle Relaxation', description: 'Tense and then release different muscle groups to achieve a state of deep physical relaxation.', duration: 600, icon: Waves, category: 'Relaxation' },
  { id: 'relaxation_5_senses', name: 'Five Senses Exercise', description: 'Ground yourself in the present by noticing 5 things you can see, 4 you can feel, 3 you can hear, 2 you can smell, and 1 you can taste.', duration: 180, icon: Waves, category: 'Relaxation' },
];
