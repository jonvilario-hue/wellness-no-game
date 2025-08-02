
import type { LucideIcon } from 'lucide-react';
import { Dumbbell, HeartPulse, StretchHorizontal, Brain, Wind, Waves, PersonStanding, Cat, Mountain, Bird, TreeDeciduous, Zap } from 'lucide-react';

export type ExerciseCategory = 'Stretching' | 'Strength' | 'Energizer';
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
  { id: 'stretch_shoulders', name: 'Shoulder Openers', description: 'Clasp hands behind your back and lift to open the chest.', duration: 60, icon: PersonStanding, category: 'Stretching' },
  { id: 'stretch_cat_cow', name: 'Spinal Twists', description: 'Gently twist your torso while seated or lying down.', duration: 90, icon: Cat, category: 'Stretching' },
  { id: 'stretch_hamstring', name: 'Standing Hamstring Stretch', description: 'Reach for your toes while keeping your legs straight.', duration: 60, icon: PersonStanding, category: 'Stretching' },
  
  // Strength
  { id: 'strength_squats', name: 'Chair Squats', description: 'Perform squats to build leg and core strength using a chair for support.', duration: 120, icon: Dumbbell, category: 'Strength' },
  { id: 'strength_wall_sit', name: 'Wall Sit', description: 'Hold a seated position against a wall to build isometric strength.', duration: 60, icon: Dumbbell, category: 'Strength' },
  { id: 'strength_glute_bridge', name: 'Glute Bridges', description: 'Lift your hips off the floor to strengthen your glutes and lower back.', duration: 90, icon: Dumbbell, category: 'Strength' },
  { id: 'strength_balance', name: 'Standing Balance', description: 'Stand on one leg to improve stability and focus.', duration: 60, icon: Dumbbell, category: 'Strength' },

  // Energizers
  { id: 'energizer_jumping_jacks', name: 'Jumping Jacks', description: 'A full-body exercise to get your heart rate up quickly.', duration: 60, icon: Zap, category: 'Energizer' },
  { id: 'energizer_high_knees', name: 'High Knees', description: 'Run in place, bringing your knees up towards your chest.', duration: 60, icon: Zap, category: 'Energizer' },
  { id: 'energizer_mountain_climbers', name: 'Mountain Climbers', description: 'A dynamic core exercise that simulates climbing.', duration: 60, icon: Zap, category: 'Energizer' },
  { id: 'energizer_shadow_boxing', name: 'Shadow Boxing', description: 'Practice punches and footwork for a dynamic cardio workout.', duration: 120, icon: Zap, category: 'Energizer' },
];

export const mindfulnessPractices: MindfulnessPractice[] = [
  // Breathing
  { id: 'breath_box', name: 'Box Breathing', description: 'Inhale for 4s, hold for 4s, exhale for 4s, hold for 4s. Repeat.', duration: 180, icon: Wind, category: 'Breathing' },
  { id: 'breath_478', name: '4-7-8 Breathing', description: 'Inhale for 4s, hold for 7s, exhale slowly for 8s. A powerful relaxation technique.', duration: 180, icon: Wind, category: 'Breathing' },
  { id: 'breath_diaphragmatic', name: 'Diaphragmatic Breathing', description: 'Focus on deep belly breaths to engage the diaphragm and calm the nervous system.', duration: 300, icon: Wind, category: 'Breathing' },

  // Meditation
  { id: 'meditation_awareness', name: 'Mindfulness of Breath', description: 'Gently guide your attention to the sensation of your breath without trying to change it.', duration: 300, icon: Brain, category: 'Meditation' },
  { id: 'meditation_body_scan', name: 'Body Scan', description: 'Bring awareness to each part of your body sequentially, noticing sensations without judgment.', duration: 600, icon: Brain, category: 'Meditation' },
  { id: 'meditation_loving_kindness', name: 'Affirmation Meditation', description: 'Repeat a positive affirmation to cultivate a specific mindset.', duration: 180, icon: Brain, category: 'Meditation' },

  // Relaxation
  { id: 'relaxation_visualization', name: 'Guided Visualization', description: 'Imagine a calm, peaceful place in detail to transport your mind and relax your body.', duration: 300, icon: Waves, category: 'Relaxation' },
  { id: 'relaxation_pmr', name: 'Progressive Muscle Relaxation', description: 'Tense and then release different muscle groups to achieve a state of deep physical relaxation.', duration: 600, icon: Waves, category: 'Relaxation' },
  { id: 'relaxation_5_senses', name: '5-4-3-2-1 Grounding', description: 'Ground yourself by noticing 5 things you see, 4 you feel, 3 you hear, 2 you smell, and 1 you taste.', duration: 180, icon: Waves, category: 'Relaxation' },
];
