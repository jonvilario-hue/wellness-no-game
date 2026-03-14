
export type PlanAction = {
  label: string;
  link: string;
};

export type DailyStep = {
  day: number;
  title: string;
  estimatedMinutes: number;
  actions: PlanAction[];
};

export type WellnessPlan = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "Movement" | "Stillness" | "Communication" | "Speed Reading" | "Math" | "Music";
  durationDays: number;
  steps: DailyStep[];
};

export const wellnessPlans: WellnessPlan[] = [
  // --- MOVEMENT ---
  {
    id: "move-0",
    title: "Movement: Intro Session",
    tagline: "Just try this once. No commitment.",
    description: "Break the inertia with a single foundational mobility session.",
    category: "Movement",
    durationDays: 1,
    steps: [
      {
        day: 1,
        title: "The Reset Flow",
        estimatedMinutes: 8,
        actions: [
          { label: "Launch Full Body Flow", link: "/exercises?tab=movement#practice-yoga_morning_flow" },
          { label: "Perform 10 deep belly breaths", link: "/exercises?tab=stillness#practice-breath_box" }
        ]
      }
    ]
  },
  {
    id: "move-3",
    title: "Movement: 3-Day Kickstart",
    tagline: "Build a micro-habit loop.",
    description: "Three days of targeted mobility to wake up your joints.",
    category: "Movement",
    durationDays: 3,
    steps: [
      {
        day: 1,
        title: "Upper Body Focus",
        estimatedMinutes: 5,
        actions: [{ label: "Neck & Shoulder Release", link: "/exercises?tab=movement#practice-stretch_neck" }]
      },
      {
        day: 2,
        title: "Lower Body Focus",
        estimatedMinutes: 5,
        actions: [{ label: "Hip Openers", link: "/exercises?tab=movement#practice-stretch_hips" }]
      },
      {
        day: 3,
        title: "Combined Flow",
        estimatedMinutes: 8,
        actions: [{ label: "Morning Mobility Flow", link: "/exercises?tab=movement#practice-wakeup_flow" }]
      }
    ]
  },
  {
    id: "move-5",
    title: "Movement: 5-Day Foundation",
    tagline: "Breadth and consistency.",
    description: "Rotate through the core movement techniques available in the lab.",
    category: "Movement",
    durationDays: 5,
    steps: [
      { day: 1, title: "Mobility", estimatedMinutes: 5, actions: [{ label: "Thoracic Rotations", link: "/exercises?tab=movement#practice-stretch_spine" }] },
      { day: 2, title: "Balance", estimatedMinutes: 5, actions: [{ label: "Tree Pose", link: "/exercises?tab=movement#practice-balance_tree_pose" }] },
      { day: 3, title: "Strength", estimatedMinutes: 10, actions: [{ label: "Wall Push-ups", link: "/exercises?tab=movement#practice-strength_wall_pushups" }] },
      { day: 4, title: "Flexibility", estimatedMinutes: 8, actions: [{ label: "Downward Dog", link: "/exercises?tab=movement#practice-yoga_down_dog" }] },
      { day: 5, title: "Combined Flow", estimatedMinutes: 10, actions: [{ label: "5-Min Flow", link: "/exercises?tab=movement#practice-yoga_morning_flow" }] }
    ]
  },
  {
    id: "move-7",
    title: "Movement: Week One Protocol",
    tagline: "Establish a sustainable rhythm.",
    description: "A full week of movement, ranging from high intensity to active recovery.",
    category: "Movement",
    durationDays: 7,
    steps: [
      { day: 1, title: "Activation", estimatedMinutes: 10, actions: [{ label: "High Knees", link: "/exercises?tab=movement#practice-energizer_high_knees" }] },
      { day: 2, title: "Foundations", estimatedMinutes: 10, actions: [{ label: "Yoga Flow", link: "/exercises?tab=movement#practice-yoga_morning_flow" }] },
      { day: 3, title: "Focus", estimatedMinutes: 10, actions: [{ label: "Balance Work", link: "/exercises?tab=movement#practice-balance_tree_pose" }] },
      { day: 4, title: "Intensity", estimatedMinutes: 15, actions: [{ label: "Shadow Boxing", link: "/exercises?tab=movement#practice-energizer_shadow_boxing" }] },
      { day: 5, title: "Recovery", estimatedMinutes: 10, actions: [{ label: "Gentle Stretching", link: "/exercises?tab=movement#practice-stretch_hips" }] },
      { day: 6, title: "Technique Review", estimatedMinutes: 15, actions: [{ label: "Review All Mobility", link: "/exercises?tab=movement" }] },
      { day: 7, title: "Rest & Step Count", estimatedMinutes: 20, actions: [{ label: "Go for a light 20-min walk", link: "/calendar" }] }
    ]
  },

  // --- STILLNESS ---
  {
    id: "still-0",
    title: "Stillness: Intro Session",
    tagline: "Just try this once.",
    description: "One single session to experience the power of breath control.",
    category: "Stillness",
    durationDays: 1,
    steps: [
      {
        day: 1,
        title: "The Breathing Anchor",
        estimatedMinutes: 5,
        actions: [{ label: "Box Breathing Drill", link: "/exercises?tab=stillness#practice-breath_box" }]
      }
    ]
  },
  {
    id: "still-3",
    title: "Stillness: 3-Day Kickstart",
    tagline: "Quiet the mental noise.",
    description: "Three days to transition your nervous system from reactive to calm.",
    category: "Stillness",
    durationDays: 3,
    steps: [
      { day: 1, title: "Breath Anchor", estimatedMinutes: 5, actions: [{ label: "Box Breathing", link: "/exercises?tab=stillness#practice-breath_box" }] },
      { day: 2, title: "Body Awareness", estimatedMinutes: 5, actions: [{ label: "5-4-3-2-1 Senses", link: "/exercises?tab=stillness#practice-grounding_54321" }] },
      { day: 3, title: "Combined Reset", estimatedMinutes: 7, actions: [{ label: "Two-Minute Reset", link: "/exercises?tab=stillness#practice-focus_reset" }] }
    ]
  },
  {
    id: "still-5",
    title: "Stillness: 5-Day Foundation",
    tagline: "The spectrum of calm.",
    description: "Rotate through five different mindfulness and grounding techniques.",
    category: "Stillness",
    durationDays: 5,
    steps: [
      { day: 1, title: "Breath", estimatedMinutes: 5, actions: [{ label: "4-7-8 Breath", link: "/exercises?tab=stillness#practice-breath_478" }] },
      { day: 2, title: "Senses", estimatedMinutes: 5, actions: [{ label: "Tactile Focus", link: "/exercises?tab=stillness#practice-grounding_tactile" }] },
      { day: 3, title: "Visualization", estimatedMinutes: 8, actions: [{ label: "Nature Visual", link: "/exercises?tab=stillness#practice-grounding_nature" }] },
      { day: 4, title: "Focus", estimatedMinutes: 5, actions: [{ label: "Name 3 Wins", link: "/exercises?tab=stillness#practice-focus_wins" }] },
      { day: 5, title: "Compassion", estimatedMinutes: 8, actions: [{ label: "Loving-Kindness", link: "/exercises?tab=stillness#practice-compassion_metta" }] }
    ]
  },
  {
    id: "still-7",
    title: "Stillness: Week One Protocol",
    tagline: "Establish mental hygiene.",
    description: "A weekly cycle of focused recovery and emotional processing.",
    category: "Stillness",
    durationDays: 7,
    steps: [
      { day: 1, title: "Physiological", estimatedMinutes: 5, actions: [{ label: "Resonant Breath", link: "/exercises?tab=stillness#practice-breath_resonant" }] },
      { day: 2, title: "Grounding", estimatedMinutes: 5, actions: [{ label: "5-4-3-2-1", link: "/exercises?tab=stillness#practice-grounding_54321" }] },
      { day: 3, title: "Focus Drill", estimatedMinutes: 5, actions: [{ label: "Visualization", link: "/exercises?tab=stillness#practice-focus_visualization" }] },
      { day: 4, title: "Empathy", estimatedMinutes: 8, actions: [{ label: "Self-Compassion", link: "/exercises?tab=stillness#practice-compassion_mantra" }] },
      { day: 5, title: "Wind Down", estimatedMinutes: 10, actions: [{ label: "Nature Anchor", link: "/exercises?tab=stillness#practice-grounding_nature" }] },
      { day: 6, title: "Reflect", estimatedMinutes: 15, actions: [{ label: "Weekly Journaling", link: "/journal" }] },
      { day: 7, title: "Silent Rest", estimatedMinutes: 20, actions: [{ label: "20-Min Silent Walk", link: "/calendar" }] }
    ]
  },

  // --- MUSIC ---
  {
    id: "music-0",
    title: "Music: The Auditory Pulse",
    tagline: "Establish your baseline.",
    description: "A single high-intensity tour of the lab to calibrate your pitch and rhythm sensing.",
    category: "Music",
    durationDays: 1,
    steps: [
      {
        day: 1,
        title: "Sonic Diagnostic",
        estimatedMinutes: 10,
        actions: [
          { label: "Start Pitch Match", link: "/music/sing/pitch-match" },
          { label: "Launch Interval Sniper", link: "/music/listen/interval-sniper" },
          { label: "Sync Rhythm Tap", link: "/music/listen/rhythm-tap" }
        ]
      }
    ]
  },
  {
    id: "music-3",
    title: "Music: Ear-Voice Connection",
    tagline: "Build the melodic bridge.",
    description: "Three days dedicated to the feedback loop between hearing and vocal reproduction.",
    category: "Music",
    durationDays: 3,
    steps: [
      { day: 1, title: "Single Notes", estimatedMinutes: 8, actions: [{ label: "Note Flash + Pitch Match", link: "/music/listen/note-flash" }] },
      { day: 2, title: "The Distance", estimatedMinutes: 10, actions: [{ label: "Interval Sniper + Sing-Back", link: "/music/listen/interval-sniper" }] },
      { day: 3, title: "Melodic Memory", estimatedMinutes: 12, actions: [{ label: "Melody Echo Protocol", link: "/music/sing/melody-echo" }] }
    ]
  },
  {
    id: "music-5",
    title: "Music: Harmonic Architect",
    tagline: "Structure your sound.",
    description: "A 5-day deep dive into theory, harmony, and instrumental application.",
    category: "Music",
    durationDays: 5,
    steps: [
      { day: 1, title: "Chord Qualities", estimatedMinutes: 10, actions: [{ label: "Chord Detective", link: "/music/listen/chord-detective" }] },
      { day: 2, title: "Scale Degrees", estimatedMinutes: 10, actions: [{ label: "Scale Runner", link: "/music/listen/scale-runner" }] },
      { day: 3, title: "Progressions", estimatedMinutes: 12, actions: [{ label: "Progression Decoder", link: "/music/listen/progression-decoder" }] },
      { day: 4, title: "Transcription", estimatedMinutes: 15, actions: [{ label: "Transcription Challenge", link: "/music/play/transcription" }] },
      { day: 5, title: "Synthesis", estimatedMinutes: 15, actions: [{ label: "Vocal Improv Session", link: "/music/create/vocal-improv" }] }
    ]
  },
  {
    id: "music-7",
    title: "Music: Complete Musician Protocol",
    tagline: "The high-fidelity circuit.",
    description: "Our most comprehensive weekly rotation, touching every major domain in the laboratory.",
    category: "Music",
    durationDays: 7,
    steps: [
      { day: 1, title: "Ear Calibration", estimatedMinutes: 10, actions: [{ label: "Interval Identification", link: "/music/listen/interval-sniper" }] },
      { day: 2, title: "Rhythmic Pulse", estimatedMinutes: 10, actions: [{ label: "Rhythm Reading", link: "/music/listen/rhythm-reader" }] },
      { day: 3, title: "Vocal Control", estimatedMinutes: 12, actions: [{ label: "Breath + Tone Shaping", link: "/music/voice/tone" }] },
      { day: 4, title: "Theory Foundations", estimatedMinutes: 15, actions: [{ label: "Scale Builder", link: "/music/play/scale-drill" }] },
      { day: 5, title: "Instrumental Dialogue", estimatedMinutes: 15, actions: [{ label: "Call & Response", link: "/music/play/call-response" }] },
      { day: 6, title: "Rhythmic Flow", estimatedMinutes: 15, actions: [{ label: "Flow Trainer", link: "/music/create/flow-trainer" }] },
      { day: 7, title: "Creative Capstone", estimatedMinutes: 20, actions: [{ label: "Freestyle Sandbox", link: "/music/create/freestyle" }] }
    ]
  },

  // --- COMMUNICATION ---
  {
    id: "comm-0",
    title: "Communication: Intro Session",
    tagline: "Hear yourself clearly.",
    description: "A 5-minute enunciation drill to prime your vocal presence.",
    category: "Communication",
    durationDays: 1,
    steps: [
      {
        day: 1,
        title: "Vocal Clarity",
        estimatedMinutes: 5,
        actions: [{ label: "Articulation Drill", link: "/exercises?tab=communication#practice-vocal_articulation" }]
      }
    ]
  },
  {
    id: "comm-3",
    title: "Communication: 3-Day Kickstart",
    tagline: "Control the room.",
    description: "Focus on the physical mechanics of speaking and pausing.",
    category: "Communication",
    durationDays: 3,
    steps: [
      { day: 1, title: "Enunciation", estimatedMinutes: 5, actions: [{ label: "Articulation", link: "/exercises?tab=communication#practice-vocal_articulation" }] },
      { day: 2, title: "Pacing", estimatedMinutes: 5, actions: [{ label: "Rate Variation", link: "/exercises?tab=communication#practice-vocal_rate" }] },
      { day: 3, title: "Combined Drill", estimatedMinutes: 8, actions: [{ label: "Strategic Pause", link: "/exercises?tab=communication#practice-vocal_pauses" }] }
    ]
  },
  {
    id: "comm-5",
    title: "Communication: 5-Day Foundation",
    tagline: "The polymath communicator.",
    description: "Explore five distinct domains of effective interaction.",
    category: "Communication",
    durationDays: 5,
    steps: [
      { day: 1, title: "Mechanics", estimatedMinutes: 5, actions: [{ label: "Pitch Finding", link: "/exercises?tab=communication#practice-vocal_pitch" }] },
      { day: 2, title: "Listening", estimatedMinutes: 5, actions: [{ label: "Paraphrasing", link: "/exercises?tab=communication#practice-listen_paraphrasing" }] },
      { day: 3, title: "Nonverbal", estimatedMinutes: 5, actions: [{ label: "Power Posing", link: "/exercises?tab=communication#practice-speaking_power_pose_ritual" }] },
      { day: 4, title: "Structure", estimatedMinutes: 8, actions: [{ label: "Topic Bridging", link: "/exercises?tab=communication#practice-convo_topic_bridging" }] },
      { day: 5, title: "Influence", estimatedMinutes: 8, actions: [{ label: "Social Proof", link: "/exercises?tab=communication#practice-persuasion_social_proof" }] }
    ]
  },
  {
    id: "comm-7",
    title: "Communication: Week One Protocol",
    tagline: "Integrated social intelligence.",
    description: "A full week cycle of drills, real-world application, and self-review.",
    category: "Communication",
    durationDays: 7,
    steps: [
      { day: 1, title: "Presence", estimatedMinutes: 5, actions: [{ label: "Vocal Power", link: "/exercises?tab=communication#practice-vocal_diaphragmatic" }] },
      { day: 2, title: "Persuasion", estimatedMinutes: 8, actions: [{ label: "Anchoring", link: "/exercises?tab=communication#practice-persuasion_anchoring" }] },
      { day: 3, title: "Clarity", estimatedMinutes: 10, actions: [{ label: "Active Voice", link: "/exercises?tab=communication#practice-clarity_active_voice" }] },
      { day: 4, title: "Conflict", estimatedMinutes: 10, actions: [{ label: "I-Statements", link: "/exercises?tab=communication#practice-conflict_i_statements" }] },
      { day: 5, title: "Story", estimatedMinutes: 10, actions: [{ label: "3-Act Arc", link: "/exercises?tab=communication#practice-story_3act" }] },
      { day: 6, title: "Self-Review", estimatedMinutes: 15, actions: [{ label: "Record & Listen Back", link: "/exercises?tab=communication#practice-speaking_mirror_drill" }] },
      { day: 7, title: "Social Rest", estimatedMinutes: 30, actions: [{ label: "Reflective Notebook", link: "/journal" }] }
    ]
  }
];
