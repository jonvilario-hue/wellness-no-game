
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
  category: ExerciseCategory | MindfulnessCategory;
  intention: string;
  setup: string[];
  steps: string[];
  modifications: string[];
  completionCue: string;
};

export type MindfulnessPractice = Exercise & {
  category: MindfulnessCategory;
};

// --- MOVEMENT MODULES ---

export const movementExercises: Exercise[] = [
  // Mobility & Release -> Stretching
  {
    id: 'stretch_neck',
    name: 'Neck & Shoulder Release',
    description: 'Gently release tension from sitting or stress.',
    duration: 120,
    icon: PersonStanding,
    category: 'Stretching',
    intention: 'Release neck and upper shoulder tension from stress or sitting.',
    setup: ['Sit or stand comfortably, spine tall.', 'Relax your arms at your sides or on your lap.'],
    steps: [
      'Inhale, gently roll your shoulders up toward your ears.',
      'Exhale, roll them down and back.',
      'Tilt your head slowly to the left (hold 3–5 seconds), then switch sides.',
      'Slowly roll your head in a semi-circle forward from left to right.',
      'Shrug shoulders up, hold for a second, then drop.'
    ],
    modifications: ['Do it seated if standing is uncomfortable.', 'Use a heat pack beforehand for deeper release.'],
    completionCue: 'When your breath and shoulders feel lighter, you’re done.'
  },
  {
    id: 'stretch_hips',
    name: 'Hip Openers',
    description: 'Counteract the effects of long sitting periods.',
    duration: 180,
    icon: PersonStanding,
    category: 'Stretching',
    intention: 'Open stiff hips and counteract long sitting.',
    setup: ['Sit on the floor or a firm bed.', 'Cross legs or place soles of feet together (butterfly pose).'],
    steps: [
        'Sit tall, hands on ankles or knees.',
        'Gently push knees down with elbows (don’t force).',
        'Rock side-to-side or lean forward slightly.',
        'Hold for 20–30 seconds while breathing slowly.',
        'Switch to lying on your back, hug knees into chest and rotate gently side to side.'
    ],
    modifications: ['Sit on a folded blanket for more support.', 'Keep one leg extended if both knees up is hard.'],
    completionCue: 'When hips feel looser or less stiff, you’ve completed it.'
  },
  {
    id: 'stretch_spine',
    name: 'Thoracic Spine Rotations',
    description: 'Improve mid-back mobility and posture.',
    duration: 90,
    icon: Cat,
    category: 'Stretching',
    intention: 'Mobilize mid-back, improve posture.',
    setup: ['Sit on a chair or mat.', 'Place hands behind your head.'],
    steps: [
        'Inhale, gently rotate your torso to the left.',
        'Exhale and return to center.',
        'Repeat on the right.',
        'Add a twist by reaching one elbow toward the opposite knee.',
        'Do 3–5 reps each side slowly.'
    ],
    modifications: ['Hands can be crossed on chest if overhead is uncomfortable.', 'Use a towel behind back for support.'],
    completionCue: 'Feel your back more mobile? You\'re done.'
  },
  
  // Functional Strength -> Strength
  {
    id: 'strength_wall_pushups',
    name: 'Wall Push-ups',
    description: 'Build shoulder integrity and upper body strength.',
    duration: 120,
    icon: Dumbbell,
    category: 'Strength',
    intention: 'Gentle strength work for upper body.',
    setup: ['Stand 2–3 feet away from a wall.', 'Place palms flat on wall at chest height.'],
    steps: [
        'Inhale as you bend elbows and lean toward the wall.',
        'Exhale as you push back to start.',
        'Keep body in a straight line.',
        'Do 8–12 slow reps.'
    ],
    modifications: ['Do fewer reps or take breaks between.', 'Use a countertop instead of wall for more challenge.'],
    completionCue: 'Muscles warmed up? Great work.'
  },
  {
    id: 'strength_balance',
    name: 'Single-Leg Balance',
    description: 'Enhance stability, focus, and knee health.',
    duration: 60,
    icon: Mountain,
    category: 'Strength',
    intention: 'Improve focus, joint stability.',
    setup: ['Stand near a chair or wall for balance.', 'Shift weight to one foot.'],
    steps: [
        'Lift other foot a few inches off floor.',
        'Hold for 10–20 seconds.',
        'Switch sides.',
        'Try closing your eyes or moving your arms for challenge.'
    ],
    modifications: ['Tap toe to floor if needed.', 'Use a timer to track balance.'],
    completionCue: 'Once you feel focused and steady on both sides, you\'re done.'
  },
  {
    id: 'strength_core',
    name: 'Core Awakening',
    description: 'Engage deep core muscles with plank variations.',
    duration: 90,
    icon: Dumbbell,
    category: 'Strength',
    intention: 'Engage deep core muscles for posture and energy.',
    setup: ['Find a clear space to lie down or use a mat.', 'Get into a plank position (on forearms or hands).'],
    steps: [
        'Hold plank for 10–30 seconds.',
        'Breathe slow and steady.',
        'Rest, then repeat up to 3 times.',
        'Add knee taps or shoulder touches for variation.'
    ],
    modifications: ['Drop to knees for support.', 'Use couch edge for elevated plank.'],
    completionCue: 'When your core is awake but not strained, you\'ve done enough.'
  },
  
  // Quick Energy Boosters -> Energizer
  {
    id: 'energizer_high_knees',
    name: '1-Min High Knees',
    description: 'Quickly elevate your heart rate and energy.',
    duration: 60,
    icon: Zap,
    category: 'Energizer',
    intention: 'Quick cardio boost to reset energy.',
    setup: ['Stand tall, arms at your side.', 'Set a 1-minute timer.'],
    steps: [
        'Jog in place, lifting knees toward chest.',
        'Pump arms for momentum.',
        'Keep breathing!',
        'Stop when timer ends.'
    ],
    modifications: ['March in place if jogging is too intense.', 'Do 30 seconds and build up.'],
    completionCue: 'Heart pumping? You nailed it!'
  },
  {
    id: 'energizer_shadow_boxing',
    name: 'Shadow Boxing',
    description: 'A dynamic cardio workout to shake off sluggishness.',
    duration: 120,
    icon: Zap,
    category: 'Energizer',
    intention: 'Release agitation or sluggishness.',
    setup: ['Stand in a fighter stance.', 'Loosen shoulders.'],
    steps: [
        'Jab, cross, and hook punches in the air.',
        'Move feet lightly to simulate dodging.',
        'Do 30 sec intervals x 2–3 rounds.'
    ],
    modifications: ['Slow down movements.', 'Sit and do punches from a chair.'],
    completionCue: 'Feeling lighter or less stuck? Done.'
  },
  {
    id: 'energizer_breath_squats',
    name: 'Breath & Squat Pulses',
    description: 'Sync breath with movement to energize the body.',
    duration: 90,
    icon: Zap,
    category: 'Energizer',
    intention: 'Synchronize breath and body for energy.',
    setup: ['Stand with feet shoulder-width apart.', 'Inhale deeply.'],
    steps: [
        'Inhale: stand tall.',
        'Exhale: squat halfway down and pulse.',
        'Repeat for 5–8 breaths.',
        'End by standing tall and shaking limbs loose.'
    ],
    modifications: ['Hold onto a chair for balance.', 'Do less squat depth.'],
    completionCue: 'Feeling reconnected? That’s the goal.'
  },

  // Gentle Wakeups / Wind-Downs -> Wakeup & Wind-Down
  {
    id: 'wakeup_flow',
    name: 'Morning Mobility Flow',
    description: 'Wake up your spine, ankles, and shoulders.',
    duration: 180,
    icon: Sunrise,
    category: 'Wakeup & Wind-Down',
    intention: 'Gently activate your body for the day.',
    setup: ['Stand or sit comfortably.', 'Roll out wrists, shoulders, ankles.'],
    steps: [
        'Do neck rolls → shoulder circles → spine twists.',
        'Stretch arms overhead and side to side.',
        'Do ankle circles and toe touches.',
        'Breathe slowly the whole time.'
    ],
    modifications: ['Do seated if still groggy.', 'Use gentle music.'],
    completionCue: 'Body feels awake? You’re ready.'
  },
  {
    id: 'wind_down_stretch',
    name: 'Pre-Bedtime Stretch',
    description: 'Release the day\'s tension from hamstrings and neck.',
    duration: 240,
    icon: Moon,
    category: 'Wakeup & Wind-Down',
    intention: 'Relax body tension before sleep.',
    setup: ['Dim lights.', 'Lay down on floor or bed.'],
    steps: [
        'Hug knees to chest, gently rock.',
        'Stretch hamstrings one leg at a time.',
        'Neck rolls + shoulder shrugs.',
        'End with slow breathing.'
    ],
    modifications: ['Do only the lower body if short on time.', 'Play relaxing sound in background.'],
    completionCue: 'Feeling less tense? Time for sleep.'
  },
];


// --- STILLNESS MODULES ---

export const mindfulnessPractices: MindfulnessPractice[] = [
  { 
    id: 'breath_box', 
    name: 'Box Breathing', 
    description: 'Inhale 4s, hold 4s, exhale 4s, hold 4s. For calm and focus.', 
    duration: 180, 
    icon: Wind, 
    category: 'Breathwork',
    intention: "Regain calm and sharpen focus with structured breath.",
    setup: ["Sit or lie down with back supported.", "Optional: Set a 2-minute timer."],
    steps: [
      "Inhale for 4 seconds.",
      "Hold your breath for 4 seconds.",
      "Exhale slowly for 4 seconds.",
      "Hold again for 4 seconds.",
      "Repeat the cycle 4–6 times."
    ],
    modifications: ["Use 3-second boxes if 4 feels too long.", "Trace a square in the air to visualize each phase."],
    completionCue: "If your shoulders feel softer, you’ve done enough."
  },
  { 
    id: 'breath_478', 
    name: '4-7-8 Breath', 
    description: 'A powerful technique to reduce anxiety and promote rest.', 
    duration: 120, 
    icon: Wind, 
    category: 'Breathwork',
    intention: "Calm anxiety and prepare the body for rest.",
    setup: ["Sit or lie down with eyes closed.", "Optional: Hand on chest or belly."],
    steps: [
      "Inhale through your nose for 4 seconds.",
      "Hold your breath for 7 seconds.",
      "Exhale fully through your mouth for 8 seconds (slowly).",
      "Do 3–4 rounds total."
    ],
    modifications: ["Shorten to 3-5-6 for gentler breathwork.", "Whisper “relax” while exhaling for more effect."],
    completionCue: "When you feel slightly slower and quieter inside, you're done."
  },
  { 
    id: 'breath_resonant', 
    name: 'Resonant Breathing', 
    description: 'Breathe at a rate of 5-6 breaths per minute to balance the nervous system.', 
    duration: 300, 
    icon: Wind, 
    category: 'Breathwork',
    intention: "Harmonize the nervous system by syncing your breath rhythm.",
    setup: ["Sit or recline.", "Optional: Play calming music at 60 bpm."],
    steps: [
      "Inhale slowly for 5–6 seconds.",
      "Exhale for 5–6 seconds.",
      "Repeat for 1–3 minutes.",
      "Focus on the even rhythm, like ocean waves."
    ],
    modifications: ["Use a breathing app as visual guidance.", "Place a hand on your heart or stomach."],
    completionCue: "Once you feel like you’re riding a rhythm, pause or continue as needed."
  },
  { 
    id: 'focus_wins', 
    name: 'Name 3 Wins', 
    description: 'A self-coaching exercise to build momentum and clarity.', 
    duration: 120, 
    icon: Brain, 
    category: 'Clarity & Focus',
    intention: "Boost confidence and sense of progress.",
    setup: ["Open journal or note app.", "Optional: Set a 2-minute timer."],
    steps: [
      "Think of three things you did well today.",
      "Write each one down or say aloud.",
      "Focus on effort, not just outcome.",
      "Smile or breathe deeply with each one."
    ],
    modifications: ["Use tiny wins (e.g. “I drank water” counts!).", "Voice record instead of writing."],
    completionCue: "When you feel even slightly more capable, stop there."
  },
  { 
    id: 'focus_visualization', 
    name: 'Focus Visualization', 
    description: 'Mentally rehearse a task to improve performance and reduce anxiety.', 
    duration: 180, 
    icon: Eye, 
    category: 'Clarity & Focus',
    intention: "Mentally rehearse a task to reduce anxiety and boost readiness.",
    setup: ["Sit with eyes closed or gaze lowered.", "Choose 1 task you want to do soon."],
    steps: [
      "Imagine starting the task calmly.",
      "Visualize each step, slowly and clearly.",
      "Imagine staying focused and steady.",
      "Picture finishing it and feeling relief.",
      "Smile or nod to “lock it in.”"
    ],
    modifications: ["Use a 2-minute timer.", "Sketch the task afterward to reinforce it."],
    completionCue: "When your body feels more ready to begin, you’re done."
  },
  { 
    id: 'focus_reset', 
    name: 'Two-Minute Reset', 
    description: 'A brief mindfulness pause to break from overwhelm and regain focus.', 
    duration: 120, 
    icon: Brain, 
    category: 'Clarity & Focus',
    intention: "Stop the spin of distraction and restart mental focus.",
    setup: ["Sit or lie down with no goal but stillness.", "Optional: Timer for 2 minutes."],
    steps: [
      "Close eyes or soften your gaze.",
      "Breathe normally.",
      "Let thoughts pass like clouds.",
      "Do nothing. Just observe.",
      "Gently stretch or blink at the end."
    ],
    modifications: ["Use background sound (fan, rain).", "Try with a weighted object or pillow."],
    completionCue: "If your mind feels a little quieter, that’s a win."
  },
  { 
    id: 'grounding_54321', 
    name: '5-4-3-2-1 Senses', 
    description: 'Engage all five senses to anchor yourself in the present moment.', 
    duration: 180, 
    icon: Shield, 
    category: 'Grounding & Safety',
    intention: "Ground yourself in the present during overwhelm or panic.",
    setup: ["Sit wherever you are.", "Look around gently."],
    steps: [
      "Name 5 things you see.",
      "Name 4 things you can touch.",
      "Name 3 things you hear.",
      "Name 2 things you can smell.",
      "Name 1 thing you can taste (or like the taste of)."
    ],
    modifications: ["Tap fingers for each number.", "Use imaginary senses if surroundings are too dull."],
    completionCue: "Feel even a little more here? That’s enough."
  },
  { 
    id: 'grounding_tactile', 
    name: 'Tactile Object Focus', 
    description: 'Hold an object and focus on its texture, temperature, and weight.', 
    duration: 120, 
    icon: Shield, 
    category: 'Grounding & Safety',
    intention: "Anchor your attention by engaging one sense deeply.",
    setup: ["Pick up a small object (rock, leaf, keychain, etc.).", "Sit comfortably."],
    steps: [
      "Focus only on the object in your hand.",
      "Describe its texture out loud or silently.",
      "Notice its weight, shape, temperature.",
      "Trace its edges or surface slowly.",
      "Hold it for 30 seconds, breathing gently."
    ],
    modifications: ["Close eyes for deeper focus.", "Switch to different object halfway."],
    completionCue: "When your thoughts are quieter and attention narrowed, you’re done."
  },
  { 
    id: 'grounding_nature', 
    name: 'Nature Visualization', 
    description: 'Imagine a safe, natural place and sync your breath with its rhythm.', 
    duration: 300, 
    icon: TreeDeciduous, 
    category: 'Grounding & Safety',
    intention: "Create a safe, calm mental space.",
    setup: ["Sit or lie down in a quiet place.", "Close your eyes or gaze downward."],
    steps: [
      "Imagine a place in nature you love or make one up.",
      "Picture the sights—trees, water, sky.",
      "Hear the sounds—wind, birds, silence.",
      "Sync your breath with the imagined scene.",
      "Stay for 1–2 minutes, then slowly return."
    ],
    modifications: ["Use background nature sounds.", "Draw or journal about the place afterward."],
    completionCue: "When your breath feels calmer and body softer, pause or return gently."
  },
  { 
    id: 'compassion_metta', 
    name: 'Loving-Kindness Meditation', 
    description: 'Extend wishes of well-being to yourself and others.', 
    duration: 300, 
    icon: HeartHandshake, 
    category: 'Self-Compassion',
    intention: "Increase emotional warmth for self and others.",
    setup: ["Sit or lie in a cozy position.", "Take one slow breath."],
    steps: [
      "Silently repeat: “May I be safe. May I be well. May I be at peace.”",
      "After 3 rounds, shift to someone you care about.",
      "Repeat the same words for them.",
      "Optionally repeat for a neutral person or all beings."
    ],
    modifications: ["Change wording to what resonates with you.", "Visualize the person’s smile or energy."],
    completionCue: "When you feel a tinge of warmth, you can stop there."
  },
  { 
    id: 'compassion_journal', 
    name: '"What do I need?"', 
    description: 'A journaling prompt to check in with your inner needs.', 
    duration: 180, 
    icon: HeartHandshake, 
    category: 'Self-Compassion',
    intention: "Increase emotional clarity and meet your current need.",
    setup: ["Open journal or notes app.", "Write or say aloud."],
    steps: [
      "Ask: “What do I need right now?”",
      "Let answers flow: sleep? rest? joy? silence?",
      "Write or name 1–3 real needs.",
      "Choose one small action to meet one of them."
    ],
    modifications: ["Use emojis or voice memos instead of full sentences.", "Skip action step if awareness alone helps."],
    completionCue: "Awareness = enough. Action is optional."
  },
  { 
    id: 'compassion_mantra', 
    name: 'Gentle Inner Voice', 
    description: 'Practice a supportive mantra to counter self-criticism.', 
    duration: 120, 
    icon: HeartHandshake, 
    category: 'Self-Compassion',
    intention: "Reframe self-criticism with softness.",
    setup: ["Sit still and breathe for 15 seconds.", "Recall a recent moment of struggle."],
    steps: [
      "Notice any harsh inner voice.",
      "Ask: “What would I say to a friend in this situation?”",
      "Replace the harsh phrase with a gentle one.",
      "Repeat your new phrase slowly: “I’m doing my best.” “It’s okay to rest.” etc."
    ],
    modifications: ["Write it on a sticky note.", "Turn it into a lock screen or mantra."],
    completionCue: "When your voice feels a touch kinder, stop there."
  },
];
