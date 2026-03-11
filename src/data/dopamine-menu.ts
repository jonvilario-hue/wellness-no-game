
export type FeelingKey =
  | 'mentally-foggy'
  | 'emotionally-overloaded'
  | 'physically-tired'
  | 'numb'
  | 'scattered'
  | 'anxious'
  | 'bored';

export type CravingKey = 'relief' | 'energy' | 'progress';
export type MobilityLevel = "none" | "low" | "moderate" | "high";
export type NoiseLevel = "silent" | "low" | "moderate";

export interface DopamineActivity {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  feelingState: FeelingKey;
  craving: CravingKey;
  tier: "blue" | "green" | "yellow";
  timeEstimate: string;
  requiresMovement: boolean;
  category: "physical" | "cognitive" | "sensory" | "breathwork";
  isSkillBuilding: boolean;
  mobilityRequired: MobilityLevel;
  privateSpacePreferred: boolean;
  noiseLevel: NoiseLevel;
  needsSupplies: boolean;
  suppliesList: string[];
  seatedAlternative: string | null;
  link?: string;
  difficultyWeight: number; // 1 (Easy) to 3 (Hard)
}

/**
 * Master data set for the Dopamine Menu.
 * Activities are mapped to feeling states and cravings.
 */
export const dopamineActivities: DopamineActivity[] = [
  // --- MENTALLY FOGGY ---
  {
    id: "foggy-relief-desk-reboot",
    name: "Start Desk Reboot Kit",
    subtitle: "Reset your workspace in 2 minutes",
    description: "Clear the physical and mental clutter from your desk to lower visual noise and reset your focus window.",
    feelingState: "mentally-foggy",
    craving: "relief",
    tier: "blue",
    timeEstimate: "2 min",
    requiresMovement: true,
    category: "physical",
    isSkillBuilding: false,
    mobilityRequired: "low",
    privateSpacePreferred: false,
    noiseLevel: "low",
    needsSupplies: false,
    suppliesList: [],
    seatedAlternative: null,
    link: "/library?tab=wellness#kit-desk-reboot",
    difficultyWeight: 1
  },
  {
    id: "foggy-energy-peppermint-inhale",
    name: "Try a Peppermint Inhale",
    subtitle: "Sharp scent to cut through mental fog",
    description: "Hold peppermint oil, a mint, toothpaste, or anything with a strong menthol scent near your nose. Take 5 sharp, deliberate inhales. Olfactory stimulation bypasses the foggy prefrontal cortex and hits alertness circuits directly.",
    feelingState: "mentally-foggy",
    craving: "energy",
    tier: "blue",
    timeEstimate: "1-2 min",
    requiresMovement: false,
    category: "sensory",
    isSkillBuilding: false,
    mobilityRequired: "none",
    privateSpacePreferred: false,
    noiseLevel: "silent",
    needsSupplies: true,
    suppliesList: ["peppermint oil, mint, or toothpaste"],
    seatedAlternative: null,
    difficultyWeight: 1
  },
  {
    id: "foggy-progress-tomorrows-priority",
    name: "Write Tomorrow's Single Priority",
    subtitle: "Pick one target to cut through the fog",
    description: "Write down one sentence: the single most important thing you want to accomplish tomorrow. Not a to-do list. One thing. Fog lifts faster when your brain has a clear target, even a future one.",
    feelingState: "mentally-foggy",
    craving: "progress",
    tier: "blue",
    timeEstimate: "1-2 min",
    requiresMovement: false,
    category: "cognitive",
    isSkillBuilding: false,
    mobilityRequired: "none",
    privateSpacePreferred: false,
    noiseLevel: "silent",
    needsSupplies: false,
    suppliesList: [],
    seatedAlternative: null,
    difficultyWeight: 1
  },
  {
    id: "foggy-progress-skill-mental-math",
    name: "Practice Mental Math Chains",
    subtitle: "Sharpen working memory through the haze",
    description: "Start at 100 and subtract 7 repeatedly out loud. When that gets easy, try subtracting 13. The goal isn't math — it's forcing your working memory to activate through the fog.",
    feelingState: "mentally-foggy",
    craving: "progress",
    tier: "green",
    timeEstimate: "5 min",
    requiresMovement: false,
    category: "cognitive",
    isSkillBuilding: true,
    mobilityRequired: "none",
    privateSpacePreferred: false,
    noiseLevel: "low",
    needsSupplies: false,
    suppliesList: [],
    seatedAlternative: null,
    difficultyWeight: 3
  },

  // --- EMOTIONALLY OVERLOADED ---
  {
    id: "overloaded-relief-legs-up-wall",
    name: "Do a Legs-Up-the-Wall Hold",
    subtitle: "Passive inversion to calm your whole system",
    description: "Lie on your back and rest your legs vertically against a wall. Stay for 90 seconds. This passive inversion activates your parasympathetic nervous system and slows everything down without requiring any effort or focus.",
    feelingState: "emotionally-overloaded",
    craving: "relief",
    tier: "blue",
    timeEstimate: "1-2 min",
    requiresMovement: true,
    category: "physical",
    isSkillBuilding: false,
    mobilityRequired: "low",
    privateSpacePreferred: true,
    noiseLevel: "silent",
    needsSupplies: false,
    suppliesList: [],
    seatedAlternative: null,
    difficultyWeight: 1
  },
  {
    id: "overloaded-energy-jumping-jacks",
    name: "Do 1-Min Jumping Jacks",
    subtitle: "Discharge emotional flooding through your body",
    description: "Set a timer for 60 seconds and do jumping jacks at whatever pace you can. When emotions are flooding your system, explosive physical movement helps your body process the adrenaline and cortisol. You're not exercising — you're discharging.",
    feelingState: "emotionally-overloaded",
    craving: "energy",
    tier: "blue",
    timeEstimate: "1-2 min",
    requiresMovement: true,
    category: "physical",
    isSkillBuilding: false,
    mobilityRequired: "high",
    privateSpacePreferred: true,
    noiseLevel: "moderate",
    needsSupplies: false,
    suppliesList: [],
    seatedAlternative: "Seated arm jacks",
    difficultyWeight: 2
  },
  {
    id: "overloaded-energy-cross-body-march",
    name: "Do a Paced Cross-Body March",
    subtitle: "Alternating hand-to-knee at a steady rhythm",
    description: "Stand and march in place, touching your right hand to your left knee, then left hand to right knee. Keep a slow, steady rhythm for 60 seconds. The bilateral pattern helps your brain process overwhelm while the structure prevents escalation.",
    feelingState: "emotionally-overloaded",
    craving: "energy",
    tier: "blue",
    timeEstimate: "1-2 min",
    requiresMovement: true,
    category: "physical",
    isSkillBuilding: false,
    mobilityRequired: "moderate",
    privateSpacePreferred: false,
    noiseLevel: "silent",
    needsSupplies: false,
    suppliesList: [],
    seatedAlternative: "Seated cross-body touches",
    difficultyWeight: 1
  },
  {
    id: "overloaded-progress-i-statements",
    name: "Practice 'I' Statements",
    subtitle: "Express feelings without blame using 'I feel...'",
    description: "Choose one thing currently bothering you and phrase it as an 'I feel...' statement. It forces you to name the internal state and reduces the 'attack' response.",
    feelingState: "emotionally-overloaded",
    craving: "progress",
    tier: "green",
    timeEstimate: "3-5 min",
    requiresMovement: false,
    category: "cognitive",
    isSkillBuilding: true,
    mobilityRequired: "none",
    privateSpacePreferred: false,
    noiseLevel: "silent",
    needsSupplies: false,
    suppliesList: [],
    seatedAlternative: null,
    link: "/exercises?tab=communication#practice-conflict_i_statements",
    difficultyWeight: 2
  },

  // --- ANXIOUS ---
  {
    id: "anxious-relief-mouse-pose",
    name: "Do a Deep Mouse Pose",
    subtitle: "Grounding fold to quiet the nervous system",
    description: "A restorative posture that focuses your awareness inward and physically compresses the core, signaling safety to the brain.",
    feelingState: "anxious",
    craving: "relief",
    tier: "blue",
    timeEstimate: "2 min",
    requiresMovement: true,
    category: "physical",
    isSkillBuilding: false,
    mobilityRequired: "low",
    privateSpacePreferred: true,
    noiseLevel: "silent",
    needsSupplies: false,
    suppliesList: [],
    seatedAlternative: "Seated forward fold",
    link: "/exercises?tab=movement#practice-yoga_mouse_pose",
    difficultyWeight: 1
  },
  {
    id: "anxious-energy-cold-water",
    name: "Do a Cold Water Reset",
    subtitle: "Shock the system out of a loop",
    description: "Splash ice-cold water on your face or hold an ice pack to your chest. The temperature shock triggers the mammalian dive reflex, immediately slowing the heart rate.",
    feelingState: "anxious",
    craving: "energy",
    tier: "blue",
    timeEstimate: "1 min",
    requiresMovement: false,
    category: "sensory",
    isSkillBuilding: false,
    mobilityRequired: "low",
    privateSpacePreferred: false,
    noiseLevel: "silent",
    needsSupplies: true,
    suppliesList: ["sink or water source"],
    seatedAlternative: null,
    difficultyWeight: 1
  },
  {
    id: "anxious-progress-333-reframe",
    name: "Try the 3-3-3 Reframe",
    subtitle: "Turn three worries into three action steps",
    description: "Write down 3 things you're worried about. Next to each, write 1 truth that counters or softens it. Then write 1 small action within your control for each. This transforms anxious spiraling into structured problem-solving.",
    feelingState: "anxious",
    craving: "progress",
    tier: "green",
    timeEstimate: "5 min",
    requiresMovement: false,
    category: "cognitive",
    isSkillBuilding: false,
    mobilityRequired: "none",
    privateSpacePreferred: false,
    noiseLevel: "silent",
    needsSupplies: false,
    suppliesList: [],
    seatedAlternative: null,
    difficultyWeight: 2
  },
  {
    id: "anxious-progress-skill-breathing-holds",
    name: "Practice Box Breathing Rhythm Holds",
    subtitle: "Train your nervous system like a muscle",
    description: "Do box breathing but extend each phase by 1 second per round. Start at 4-4-4-4, then 5-5-5-5, and so on. See how far you can go. Builds regulation capacity over time.",
    feelingState: "anxious",
    craving: "progress",
    tier: "green",
    timeEstimate: "5 min",
    requiresMovement: false,
    category: "breathwork",
    isSkillBuilding: true,
    mobilityRequired: "none",
    privateSpacePreferred: false,
    noiseLevel: "silent",
    needsSupplies: false,
    suppliesList: [],
    seatedAlternative: null,
    difficultyWeight: 3
  },

  // --- SCATTERED ---
  {
    id: "scattered-energy-step-touch",
    name: "Try a 60-Second Step-Touch Pattern",
    subtitle: "Channel restless energy into a simple rhythm",
    description: "Step to the right, tap your left foot beside it. Step to the left, tap your right foot beside it. Add arm swings. Increase speed gradually. The repeating pattern gives scattered energy a container instead of letting it ricochet.",
    feelingState: "scattered",
    craving: "energy",
    tier: "blue",
    timeEstimate: "1-2 min",
    requiresMovement: true,
    category: "physical",
    isSkillBuilding: false,
    mobilityRequired: "moderate",
    privateSpacePreferred: false,
    noiseLevel: "silent",
    needsSupplies: false,
    suppliesList: [],
    seatedAlternative: "Seated side-taps",
    difficultyWeight: 1
  },
  {
    id: "scattered-progress-one-step",
    name: "Try the 'One Next Step' Plan",
    subtitle: "Identify just the very next action to take",
    description: "When scattered, the whole list is toxic. Identify exactly ONE action that takes less than 5 minutes and commit to doing ONLY that.",
    feelingState: "scattered",
    craving: "progress",
    tier: "blue",
    timeEstimate: "2 min",
    requiresMovement: false,
    category: "cognitive",
    isSkillBuilding: false,
    mobilityRequired: "none",
    privateSpacePreferred: false,
    noiseLevel: "silent",
    needsSupplies: false,
    suppliesList: [],
    seatedAlternative: null,
    difficultyWeight: 1
  },
  {
    id: "scattered-progress-skill-singletask",
    name: "Practice Single-Tasking Sprints",
    subtitle: "One task, five minutes, nothing else",
    description: "Pick one task. Set a 5-minute timer. Do only that task. When your attention drifts, note it and return. Track how many consecutive days you can do this. Builds sustained attention like a muscle.",
    feelingState: "scattered",
    craving: "progress",
    tier: "green",
    timeEstimate: "5 min",
    requiresMovement: false,
    category: "cognitive",
    isSkillBuilding: true,
    mobilityRequired: "none",
    privateSpacePreferred: false,
    noiseLevel: "silent",
    needsSupplies: false,
    suppliesList: [],
    seatedAlternative: null,
    difficultyWeight: 3
  },

  // --- PHYSICALLY TIRED ---
  {
    id: "tired-energy-5-point-wakeup",
    name: "Do a Gentle 5-Point Wake-Up",
    subtitle: "Five small actions to come back online",
    description: "Splash water on your face. Roll your wrists. Shrug your shoulders up and drop them. Rise onto your toes and lower back down. Take one deep breath. Five low-cost activation points that wake the body up without demanding what it doesn't have.",
    feelingState: "physically-tired",
    craving: "energy",
    tier: "blue",
    timeEstimate: "1-2 min",
    requiresMovement: true,
    category: "physical",
    isSkillBuilding: false,
    mobilityRequired: "low",
    privateSpacePreferred: false,
    noiseLevel: "silent",
    needsSupplies: false,
    suppliesList: [],
    seatedAlternative: null,
    difficultyWeight: 1
  },
  {
    id: "tired-progress-pitch",
    name: "Practice Optimal Pitch Finding",
    subtitle: "Find the vocal pitch that relaxes your body",
    description: "Humming and finding your resonant register stimulates the vagus nerve and provides a low-cost win for your self-efficacy.",
    feelingState: "physically-tired",
    craving: "progress",
    tier: "green",
    timeEstimate: "3 min",
    requiresMovement: false,
    category: "breathwork",
    isSkillBuilding: true,
    mobilityRequired: "none",
    privateSpacePreferred: false,
    noiseLevel: "low",
    needsSupplies: false,
    suppliesList: [],
    seatedAlternative: null,
    link: "/exercises?tab=communication#practice-vocal_pitch",
    difficultyWeight: 2
  },

  // --- NUMB / FLAT ---
  {
    id: "numb-energy-gentle-dance",
    name: "Try a 60-Second Gentle Dance",
    subtitle: "Move freely to any song for one minute",
    description: "Put on any song and let your body move however it wants for 60 seconds. No choreography, no rules. The goal isn't performance — it's letting movement pull you back into your body.",
    feelingState: "numb",
    craving: "energy",
    tier: "blue",
    timeEstimate: "1-2 min",
    requiresMovement: true,
    category: "physical",
    isSkillBuilding: false,
    mobilityRequired: "moderate",
    privateSpacePreferred: true,
    noiseLevel: "low",
    needsSupplies: false,
    suppliesList: [],
    seatedAlternative: "Seated torso swaying",
    difficultyWeight: 1
  },
  {
    id: "numb-progress-skill-emotion-vocab",
    name: "Practice Emotion Vocabulary Building",
    subtitle: "Name what you feel, even faintly",
    description: "Look at a list of emotion words (search 'emotion wheel' or 'feeling words list') and try to identify 2-3 that describe your current state, even if only slightly. Over time this builds emotional granularity — the ability to distinguish between similar internal states.",
    feelingState: "numb",
    craving: "progress",
    tier: "green",
    timeEstimate: "5 min",
    requiresMovement: false,
    category: "cognitive",
    isSkillBuilding: true,
    mobilityRequired: "none",
    privateSpacePreferred: false,
    noiseLevel: "silent",
    needsSupplies: false,
    suppliesList: [],
    seatedAlternative: null,
    difficultyWeight: 3
  },

  // --- BORED ---
  {
    id: "bored-progress-skill-speed-sketch",
    name: "Practice Speed Sketching",
    subtitle: "Draw any object in 60 seconds, repeat",
    description: "Pick any nearby object and sketch it in 60 seconds. Don't aim for accuracy — aim for speed. Pick another object and repeat. Builds observation skill and gives the understimulated brain a novel challenge with visible output.",
    feelingState: "bored",
    craving: "progress",
    tier: "green",
    timeEstimate: "5 min",
    requiresMovement: false,
    category: "cognitive",
    isSkillBuilding: true,
    mobilityRequired: "none",
    privateSpacePreferred: false,
    noiseLevel: "silent",
    needsSupplies: true,
    suppliesList: ["paper and pencil"],
    seatedAlternative: null,
    difficultyWeight: 2
  }
];

export const feelingOptions: { key: FeelingKey; label: string; icon: string }[] = [
  { key: 'mentally-foggy', label: 'Mentally Foggy', icon: '🧠' },
  { key: 'emotionally-overloaded', label: 'Overloaded', icon: '🌊' },
  { key: 'physically-tired', label: 'Physically Tired', icon: '🔋' },
  { key: 'scattered', label: 'Scattered / Restless', icon: '🌪️' },
  { key: 'anxious', label: 'Anxious / Worried', icon: '⚡' },
  { key: 'numb', label: 'Numb / Flat', icon: '🌫️' },
  { key: 'bored', label: 'Understimulated / Bored', icon: '⏳' },
];

export const cravingOptions: { key: CravingKey; label: string; icon: any }[] = [
  { key: 'relief', label: 'Relief', icon: 'Wind' },
  { key: 'energy', label: 'Energy', icon: 'Zap' },
  { key: 'progress', label: 'Progress', icon: 'Rocket' },
];
