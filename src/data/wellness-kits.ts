
export type MiniKit = {
    title: string;
    emoji: string;
    description: string;
    practices: { type: "Movement" | "Stillness"; title: string }[];
    whenToUse: string;
    whyItWorks: string;
    howToUse: string;
    tags?: string[];
};

export const kits: MiniKit[] = [
  // New ADHD-Friendly Energy Kits
  {
    title: "Body Jumpstart Kit",
    emoji: "⚡",
    description: "Wake up your body and shake off inertia.",
    whenToUse: "You’ve been sitting too long or feel physically sluggish.",
    whyItWorks: "Gentle movement boosts blood flow and dopamine.",
    howToUse: "Follow these steps in order for a quick physical reset.",
    practices: [
      { type: "Movement", title: "Stand up and do 10 jumping jacks (slow is fine)." },
      { type: "Movement", title: "Shake your arms out and bounce gently on your toes for 20 seconds." },
      { type: "Movement", title: "Reach up to the ceiling and take 3 big breaths." },
      { type: "Stillness", title: "Sit down and take 10 seconds to notice how your body feels." }
    ],
    tags: ["Energy", "ADHD-Friendly"]
  },
  {
    title: "Brain Warm-Up Kit",
    emoji: "🧠",
    description: "Activate mental momentum when you feel foggy or frozen.",
    whenToUse: "Your brain feels foggy, and you can’t get started.",
    whyItWorks: "Combines breathwork and micro-tasking to activate mental momentum.",
    howToUse: "Use this sequence to gently guide your brain from 'stuck' to 'started'.",
    practices: [
      { type: "Stillness", title: "Do 5 rounds of box breathing (Inhale 4, Hold 4, Exhale 4, Hold 4)." },
      { type: "Stillness", title: "Write down just 1 small thing you could do next." },
      { type: "Movement", title: "Do it for 1 minute only — set a timer." },
      { type: "Stillness", title: "Check it off, even if not fully done." }
    ],
    tags: ["Energy", "ADHD-Friendly", "Focus"]
  },
  {
    title: "Music & Move Kit",
    emoji: "🎧",
    description: "A fast, engaging pick-me-up for when you feel dull or disengaged.",
    whenToUse: "You feel dull, disengaged, and want a fast pick-me-up.",
    whyItWorks: "Music triggers dopamine, and pairing it with motion amplifies the effect.",
    howToUse: "Put on a favorite upbeat song and follow the steps to reset your energy.",
    practices: [
      { type: "Movement", title: "Pick a 2–3 minute upbeat song." },
      { type: "Movement", title: "Move in any way while the song plays (walk, stretch, bounce)." },
      { type: "Movement", title: "Clap or tap rhythmically to the beat to engage your hands." },
      { type: "Stillness", title: "When the song ends, close your eyes and take 3 deep breaths." }
    ],
    tags: ["Energy", "ADHD-Friendly"]
  },
  {
    title: "Momentum Builder Kit",
    emoji: "✍️",
    description: "Create traction when you want to start something but just can't.",
    whenToUse: "You want to “start” something but just… can’t.",
    whyItWorks: "Physical motion + symbolic task starting = traction.",
    howToUse: "A sequence to break through procrastination and build momentum.",
    practices: [
      { type: "Movement", title: "Do 10 slow air punches while breathing out sharply." },
      { type: "Movement", title: "Grab a sticky note and write a task, as small as possible." },
      { type: "Movement", title: "Do 30 seconds of the task (not perfection — just friction)." },
      { type: "Movement", title: "Trash the sticky note or cross it out with a dramatic swipe." }
    ],
    tags: ["Energy", "ADHD-Friendly", "Focus"]
  },
  {
    title: "Dopamine Ladder Kit",
    emoji: "💡",
    description: "For when you feel totally flat and nothing sounds appealing.",
    whenToUse: "You feel totally flat, and no one thing sounds appealing.",
    whyItWorks: "Structured layering of small sensory and mental cues rebuilds energy.",
    howToUse: "Follow the steps in order to gradually climb out of a low-energy state.",
    practices: [
      { type: "Stillness", title: "Drink a glass of cold or flavored water." },
      { type: "Stillness", title: "Touch something textured (ice, clay, warm object, etc.)" },
      { type: "Movement", title: "Stretch your arms overhead and say aloud: “I’m rebooting.”" },
      { type: "Stillness", title: "Write 1 idea, goal, or phrase you want to focus on next." },
      { type: "Movement", title: "Begin a low-stakes activity like rearranging items on your desk." }
    ],
    tags: ["Energy", "ADHD-Friendly", "Recovery"]
  },
  // Existing Kits
  {
    title: "Emotional First Aid",
    emoji: "🌪️",
    description: "For when you’re overwhelmed, upset, or in a storm of feelings.",
    whenToUse: "You’re in emotional turbulence — overwhelmed, anxious, or reactive.",
    whyItWorks: "Combines grounding techniques with small, manageable movements and comforting sensory tools. Helps calm the nervous system and restore a sense of safety and control.",
    howToUse: "Use this kit during or after emotional stress. Follow the grounding practice first, then use movement to re-anchor, followed by soothing or journaling techniques.",
    practices: [
      { type: "Stillness", title: "5-4-3-2-1 Senses" },
      { type: "Stillness", title: "Box Breathing" },
      { type: "Stillness", title: "Tactile Object Focus" },
      { type: "Stillness", title: "“What do I need?” Prompt" },
      { type: "Stillness", title: "Gentle Inner Voice" },
    ],
  },
  {
    title: "Morning Activation",
    emoji: "🌞",
    description: "Clear mental fog and wake up your body with intention.",
    whenToUse: "You’ve just woken up and feel sluggish, foggy, or disconnected.",
    whyItWorks: "Light mobility and sensory-focused practices activate your body and brain without jolting your system. A breath or visualization step sharpens clarity and intention for the day.",
    howToUse: "Complete before diving into tasks or screens. Movement first, then breath or visualization.",
    practices: [
      { type: "Movement", title: "Morning Mobility Flow" },
      { type: "Movement", title: "1-Minute High Knees" },
      { type: "Stillness", title: "Name 3 Wins" },
      { type: "Stillness", title: "Focus Visualization" },
      { type: "Movement", title: "Core Awakening" },
    ],
  },
  {
    title: "Unfreeze Toolkit",
    emoji: "🧊",
    description: "For when you feel emotionally numb, disconnected, or dissociated.",
    whenToUse: "You feel emotionally flat, numb, or paralyzed in place.",
    whyItWorks: "Understimulation and dissociation can be gently reversed by combining tactile, breath, and small motion cues. These techniques bring awareness back into the body.",
    howToUse: "Start small. Even if you don't feel like doing it, try holding something cold or rocking. This will help gradually pull your awareness back online.",
    practices: [
      { type: "Stillness", title: "Tactile Object Focus" },
      { type: "Movement", title: "Neck & Shoulder Release" },
      { type: "Stillness", title: "Two-Minute Reset" },
      { type: "Stillness", title: "Name 3 Wins" },
      { type: "Stillness", title: "Loving-Kindness Meditation" },
    ],
  },
  {
    title: "Evening Soft Landing",
    emoji: "🌙",
    description: "Wind down your body and nervous system before bed.",
    whenToUse: "You’ve had a long day and want to relax or prepare for sleep.",
    whyItWorks: "Movement helps discharge tension, while calming breath and reflective focus prepare the body for parasympathetic rest mode.",
    howToUse: "Use this after work or right before bed. Dim lights, reduce stimulation, and complete the kit in a slow rhythm.",
    practices: [
      { type: "Movement", title: "Pre-Bedtime Stretch" },
      { type: "Stillness", title: "4-7-8 Breath" },
      { type: "Stillness", title: "Gentle Inner Voice" },
      { type: "Stillness", title: "Nature Visualization" },
      { type: "Stillness", title: "Resonant Breathing" },
    ],
  },
  {
    title: "Focus Reboot Pack",
    emoji: "🎯",
    description: "For midday distractions and mental fog.",
    whenToUse: "You’re distracted, scattered, or stuck in foggy loops.",
    whyItWorks: "Simple movement wakes up alertness, and breathing focuses attention. Paired with short journaling, it helps you re-anchor into productive clarity.",
    howToUse: "Best used mid-task when you notice slipping. Use movement first, then breath, then a quick “reset intention” writing prompt.",
    practices: [
        { type: "Stillness", title: "Two-Minute Reset" },
        { type: "Movement", title: "Thoracic Spine Rotations" },
        { type: "Stillness", title: "Focus Visualization" },
        { type: "Stillness", title: "Resonant Breathing" },
        { type: "Movement", title: "Single-Leg Balance" },
    ],
  },
  {
    title: "Emotional Recovery Kit",
    emoji: "❤️‍🩹",
    description: "For after emotional conflict, grief, or burnout.",
    whenToUse: "After crying, rejection, embarrassment, or emotional vulnerability.",
    whyItWorks: "Provides safe, restorative techniques that calm your emotional center while allowing the body to gently integrate what just happened.",
    howToUse: "This is a slow-paced. Use after emotionally heavy moments, ideally alone or in a quiet space.",
    practices: [
        { type: "Stillness", title: "Box Breathing" },
        { type: "Stillness", title: "Tactile Object Focus" },
        { type: "Stillness", title: "“What do I need?” Prompt" },
        { type: "Stillness", title: "Loving-Kindness Meditation" },
        { type: "Movement", title: "Neck & Shoulder Release" },
    ],
  },
  {
    title: "Stress Shakeoff",
    emoji: "💥",
    description: "For when stress is peaking physically.",
    whenToUse: "You’re ramped up, irritable, and feel stress bubbling in your body.",
    whyItWorks: "Uses motion to discharge adrenaline, followed by calming breathwork and posture resets. Interrupts the stress loop.",
    howToUse: "Use at first signs of stress. Do the movement part at medium intensity, then shift into slowing your system.",
    practices: [
        { type: "Movement", title: "Shadow Boxing" },
        { type: "Movement", title: "Breath & Squat Pulses" },
        { type: "Movement", title: "Wall Push-Ups" },
        { type: "Movement", title: "Neck & Shoulder Release" },
        { type: "Stillness", title: "Resonant Breathing" },
    ],
  },
  {
    title: "Creative Flow Primer",
    emoji: "🎨",
    description: "For before creative work or brainstorming.",
    whenToUse: "Before creative work, brainstorming, or content creation.",
    whyItWorks: "Energizes the core, balances brain hemispheres, and uses visualization to prime your mind for creative thinking.",
    howToUse: "Use this kit just before you sit down to create. The goal is to shift your state, not to complete a long workout.",
    practices: [
        { type: "Stillness", title: "Two-Minute Reset" },
        { type: "Movement", title: "Neck & Shoulder Release" },
        { type: "Stillness", title: "Resonant Breathing" },
        { type: "Stillness", title: "Focus Visualization" },
        { type: "Stillness", title: "Name 3 Wins" },
    ],
  },
  {
    title: "Boundaries Booster",
    emoji: "🧱",
    description: "For before difficult conversations or when feeling drained.",
    whenToUse: "Before difficult conversations or when feeling drained.",
    whyItWorks: "Combines physical posture to signal confidence to the brain with breathwork to ground the nervous system, preparing you to hold your space.",
    howToUse: "Use this as a prep routine. The power pose sets your physical state, the breath calms you, and the prompt clarifies your verbal boundaries.",
    practices: [
        { type: "Movement", title: "Core Awakening" },
        { type: "Stillness", title: "Box Breathing" },
        { type: "Stillness", title: "Name 3 Wins" },
        { type: "Stillness", title: "Focus Visualization" },
        { type: "Stillness", title: "Gentle Inner Voice" },
    ],
  },
  {
    title: "Inner Calm SOS",
    emoji: "🕊️",
    description: "For acute anxiety or sensory overwhelm.",
    whenToUse: "In the middle of acute anxiety or sensory overwhelm.",
    whyItWorks: "This sequence rapidly de-escalates the nervous system by providing a visual anchor to stop racing thoughts, using coherent breath to signal safety, and gentle movement to self-soothe.",
    howToUse: "Use immediately when you feel anxiety rising. The gaze fix is your first step. Follow with breath. The self-hold can be done discreetly anywhere.",
    practices: [
        { type: "Stillness", title: "5-4-3-2-1 Senses" },
        { type: "Stillness", title: "Box Breathing" },
        { type: "Stillness", title: "Tactile Object Focus" },
        { type: "Stillness", title: "Resonant Breathing" },
        { type: "Stillness", title: "Nature Visualization" },
    ],
  },
  {
    title: "Self-Talk Reset",
    emoji: "💬",
    description: "For when you're stuck in a critical loop or inner judgment.",
    whenToUse: "When you're stuck in a critical loop or inner judgment.",
    whyItWorks: "Interrupts the negative feedback loop of self-criticism by shifting from judgment to compassion. It uses breath to soothe, a mantra to reframe, and a prompt to externalize.",
    howToUse: "This is a quiet, reflective kit. Find a private space if possible. The goal is to change your internal channel from criticism to support.",
    practices: [
        { type: "Stillness", title: "Two-Minute Reset" },
        { type: "Stillness", title: "“What do I need?” Prompt" },
        { type: "Stillness", "title": "Gentle Inner Voice" },
        { type: "Stillness", "title": "Loving-Kindness Meditation" },
        { type: "Stillness", "title": "Resonant Breathing" },
    ],
  },
  {
    title: "Screen Fatigue Recovery",
    emoji: "📱",
    description: "For after long screen exposure or digital overload.",
    whenToUse: "After too much time online, scrolling, or zoning out from devices.",
    whyItWorks: "This kit targets eye strain, attention drain, and nervous system exhaustion. It combines gentle movement, visual resets, and rest cues.",
    howToUse: "Use during breaks or after long screen sessions. Don’t skip the gaze-reset or breath cue — they restore attention better than just “taking a break.”",
    practices: [
        { type: "Movement", title: "Thoracic Spine Rotations" },
        { type: "Movement", title: "Neck & Shoulder Release" },
        { type: "Stillness", title: "Tactile Object Focus" },
        { type: "Stillness", title: "Nature Visualization" },
        { type: "Stillness", title: "Resonant Breathing" },
    ],
  },
];

    