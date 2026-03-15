
import { BookOpen, Mic2, Wind, Activity, Clock, ShieldCheck, HeartPulse, Target, Shuffle, Sparkles, LayoutGrid, Brain } from 'lucide-react';

export type MusicReferenceEntry = {
  id: string;
  title: string;
  summary: string;
  category: 'Practice Methods' | 'Vocal Techniques';
  icon: any;
  body: {
    what: string;
    how: string;
    mistakes: string[];
    when: string;
  };
  audioLabel?: string;
  visualLabel?: string;
  relatedModule?: {
    name: string;
    hub: string;
  };
};

export const musicReferences: MusicReferenceEntry[] = [
  // --- PRACTICE METHODS (PLAY TAB) ---
  {
    id: 'ref-slow-practice',
    title: 'Slow Practice & Why It Works',
    summary: 'How playing at half tempo rewires muscle memory faster than full-speed repetition.',
    category: 'Practice Methods',
    icon: Clock,
    body: {
      what: 'Slow practice is the primary tool for developing high-level technical accuracy. When you play fast, your brain focuses on "keeping up," often at the expense of precision. Slowing down allows your neural pathways to map every physical movement and pitch relationship without the noise of panic or the constant need for error correction. It\'s not just "playing slow"; it\'s "thinking fast while moving slow."',
      how: '1. Identify the passage you want to master.\n2. Set your metronome to 50% of the target tempo, or whatever speed allows you to play the entire section with zero errors.\n3. Play the section perfectly three times in a row. If you miss a note, the count resets to zero.\n4. Increase the tempo by only 2-4 BPM.\n5. If you make an error, drop back down by 5 BPM and clear the passage again.\n6. Continue until you reach 80% of target tempo, then stop for the day to allow for neural consolidation.',
      mistakes: [
        'Raising the tempo too quickly before the passage is truly clean.',
        'Sloppy rhythm: playing "slowly" but with uneven timing. Slow practice must be just as rhythmically strict as performance speed.'
      ],
      when: 'Every time you encounter a technical barrier or start learning new material.'
    },
    relatedModule: { name: 'Scale Drill', hub: 'Play' }
  },
  {
    id: 'ref-metronome',
    title: 'The Metronome as a Training Tool',
    summary: 'Using a metronome in ways that build internal time rather than dependence on the click.',
    category: 'Practice Methods',
    icon: Activity,
    body: {
      what: 'A metronome is not just a clock; it\'s a diagnostic instrument. Most players use it as a crutch to keep them on the beat, but used correctly, it forces you to develop your own internal sense of time. The goal is to make the metronome "disappear" by burying the click under your notes.',
      how: '1. Standard: Click on every beat (1, 2, 3, 4).\n2. Internal Focus: Set the click only on beats 2 and 4 (the "backbeat"). This forces you to feel 1 and 3 internally.\n3. Offbeat Challenge: Set the click to only the offbeats (the "+" of every beat).\n4. Minimalist: Set the click to one per bar (beat 1) or even one every two bars.\n5. Tempo Pyramid: Build speed by going up 2 BPM, then back 1 (e.g., 60 -> 62 -> 61 -> 63 -> 62).',
      mistakes: [
        'Click dependence: letting the metronome "carry" you. If you can\'t play the line without the click, you don\'t have the internal rhythm.',
        'Ignoring the "gap": not noticing when you are consistently rushing or dragging relative to the click.'
      ],
      when: 'Daily for technical exercises and when polishing repertoire. Use minimalist settings to test if you\'ve truly internalized the pulse.'
    }
  },
  {
    id: 'ref-isolating-bars',
    title: 'Isolating Problem Bars',
    summary: 'Stop running the whole piece and zoom in on the two bars that are actually broken.',
    category: 'Practice Methods',
    icon: Target,
    body: {
      what: 'Playing a piece from beginning to end repeatedly is the most common form of inefficient practice. The beginning gets mastered while the difficult passages in the middle remain brittle because the player is already fatigued by the time they reach them. Isolating "problem bars" allows you to spend 90% of your time on the 10% of the music that actually needs it.',
      how: '1. Identify the specific 1-2 bars where you stumble.\n2. Extract those bars and treat them as an independent exercise.\n3. Use Slow Practice on just those bars.\n4. Once clean, "bridge" the section: Play starting 2 bars before and ending 2 bars after the isolated section.\n5. Practice entering the section from different beats to ensure you haven\'t just memorized the lead-in.',
      mistakes: [
        'Lead-in dependence: always starting from the same spot. Practice entering the passage from different beats.',
        'Isolating sections that are too long (keep it to 1-2 bars).'
      ],
      when: 'When you notice you are "stopping and starting" at the same spot in a piece.'
    }
  },
  {
    id: 'ref-interleaving-v2',
    title: 'Blocked vs Interleaved Practice',
    summary: 'When to drill one thing on repeat and when to shuffle between multiple things in a single session.',
    category: 'Practice Methods',
    icon: Shuffle,
    body: {
      what: 'Blocked practice is drilling one thing for a long time. It feels good because performance improves quickly, but retention is often poor. Interleaved practice (rotating between topics) is harder and feels messier, but produces much stronger long-term retention because it forces the brain to "reload" information constantly.',
      how: '1. Choose 3-4 items you need to work on (e.g., a scale, a difficult passage, and an ear-training drill).\n2. Set a timer for 3-5 minutes.\n3. Work on Item A until the timer goes off, then move immediately to Item B.\n4. Cycle through A, B, C, D multiple times in one session.\n5. Finish with a "mixed" review session.',
      mistakes: [
        'Over-focusing: staying on one item for too long because you\'re "almost there."',
        'Thinking the "struggle" of switching is failure (it\'s actually growth).'
      ],
      when: 'For material you\'ve already introduced to your body but haven\'t yet solidified into long-term memory.'
    }
  },
  {
    id: 'ref-sing-before-play',
    title: 'Sing Before You Play',
    summary: 'If you can\'t sing the line away from your instrument, you\'ve memorized finger patterns, not music.',
    category: 'Practice Methods',
    icon: Mic2,
    body: {
      what: 'Your instrument is a physical interface that can produce sound even if you don\'t "hear" it first. Singing removes the crutch of muscle memory and forces you to confront your actual musical understanding. If you can\'t sing it, you don\'t truly know it.',
      how: '1. Pick a passage or a solo you are learning.\n2. Put your instrument down.\n3. Sing the passage (humming or "la la" is fine). Vocal quality doesn\'t matter; pitch and rhythm do.\n4. Wherever you hesitate is where your musical understanding has a gap.\n5. Fix the gap by listening or reading the score until you can sing it perfectly.\n6. Return to the instrument and play the line while "singing" it in your head.',
      mistakes: [
        'Using the instrument to "find" the note while singing. Keep the instrument away.',
        'Ignoring rhythm during the sing-back.'
      ],
      when: 'For difficult melodic intervals, complex rhythms, or when preparing to improvise.'
    },
    relatedModule: { name: 'Melody Echo', hub: 'Listen' }
  },
  {
    id: 'ref-improv-systematic',
    title: 'Practicing Improvisation Systematically',
    summary: 'How to build vocabulary over changes instead of running scales and hoping for the best.',
    category: 'Practice Methods',
    icon: Sparkles,
    body: {
      what: 'Improvisation is often treated as "playing by feel," but elite improvisers build a structured vocabulary. Running through scales over a backing track is a low-yield activity that reinforces stale habits. Systematic practice builds "landmarks" in the harmony.',
      how: '1. Limitation Drills: Improvise using ONLY chord tones (1, 3, 5, 7).\n2. Rhythmic Isolation: Choose just one note and improvise purely rhythmically for one minute. Then two notes.\n3. Transcribe and Steal: Learn 2 bars of a solo you love by ear. Play it in all 12 keys.\n4. Phrase Extension: Take a small motif and repeat it, changing one note each time.',
      mistakes: [
        'Wandering: playing too many notes without a clear rhythmic or harmonic intent.',
        'Scale-running: relying on finger patterns rather than hearing phrases.'
      ],
      when: 'Every time you sit down to improvise.'
    },
    relatedModule: { name: 'Vocal Improv', hub: 'Create' }
  },
  {
    id: 'ref-session-building',
    title: 'Building a Practice Session',
    summary: 'How to divide your available time so technique, repertoire, and musicianship all move forward.',
    category: 'Practice Methods',
    icon: LayoutGrid,
    body: {
      what: 'Most players spend all their time on one thing—usually repertoire—and neglect the underlying hardware of technique and the soul of musicianship. A balanced session ensures you don\'t plateau.',
      how: '1. Divide your time into thirds.\n2. First Third: Technical (Scales, arpeggios, long tones). Build the hardware.\n3. Second Third: Repertoire (The pieces or songs you are preparing). Build the software.\n4. Final Third: Musicianship & Creativity (Ear training, improvisation, sight reading). Build the artist.\n5. A 30-minute session is 10-10-10. A 15-minute session is 5-5-5.',
      mistakes: [
        'The "Reward Trap": spending all your time on the parts of a piece you already play well because it feels good.',
        'Ignoring the final third (Musicianship) because it feels more like "work."'
      ],
      when: 'The blueprint for every daily session.'
    }
  },
  {
    id: 'ref-mental-practice',
    title: 'Mental Practice Away From Your Instrument',
    summary: 'You can improve without touching your instrument by hearing the music in your head with precision.',
    category: 'Practice Methods',
    icon: Brain,
    body: {
      what: 'Mental rehearsal activates overlapping neural pathways with actual physical practice. It is a supplement, not a replacement, but it is incredibly powerful for reinforcing memory and managing performance anxiety.',
      how: '1. Sit quietly and close your eyes.\n2. Imagine holding your instrument. Feel the texture and weight.\n3. "Play" through a passage in your mind. Hear every note with perfect clarity.\n4. Feel the physical motions: the tension in the breath, the finger movement.\n5. If the sound gets fuzzy or you lose the thread, stop and check the score.',
      mistakes: [
        'Vagueness: just "thinking about" the music isn\'t mental practice. You must hear and feel it with 100% precision.',
        'Impatience: letting the mind drift. Treat this with the same focus as a stage performance.'
      ],
      when: 'Warming up before a show, or when physical fatigue makes playing counterproductive.'
    }
  },

  // --- VOCAL TECHNIQUES (SING TAB) ---
  {
    id: 'ref-breath-support',
    title: 'Breath Support Mechanics',
    summary: 'The physical architecture of a supported vocal tone.',
    category: 'Vocal Techniques',
    icon: Wind,
    body: {
      what: 'Breath support is the management of air pressure using the diaphragm and intercostal muscles. It is the foundation of vocal power, pitch stability, and longevity. Without it, the vocal cords take the brunt of the work, leading to strain and poor tone.',
      how: 'Stand tall with your feet shoulder-width apart. Place your hands on your lower ribs. Inhale slowly and imagine the air filling the bottom of your lungs, feeling your ribs expand outward. When you sing, keep the ribs "open" as long as possible while your abdominal muscles move slowly inward. This resistance provides the steady pressure your vocal cords need.',
      mistakes: [
        'Lifting the shoulders during inhalation. This is "chest breathing" and creates tension.',
        'Letting all the air out at once. Support is about controlled release, not a big blast of air.',
        'Tightening the throat to control the air. The control should come from the torso, not the neck.'
      ],
      when: 'Practice this during your daily vocal warm-up and apply it to every phrase you sing.'
    },
    relatedModule: { name: 'Melody Echo', hub: 'Listen' }
  },
  {
    id: 'ref-vowel-mod',
    title: 'Vowel Modification',
    summary: 'Adjusting mouth shape to maintain resonance across your range.',
    category: 'Vocal Techniques',
    icon: Mic2,
    body: {
      what: 'As you sing higher in your range, "pure" vowels (like a spoken \'ee\' or \'ah\') can become pinched or shouty. Vowel modification is the subtle adjustment of your vocal tract shape to maintain resonance and prevent strain as pitch increases.',
      how: 'As you move toward the top of your range, lean your vowels toward a more neutral shape. For example, an "EE" vowel should shift slightly toward "IH" (as in "bit"). An "AY" vowel should shift slightly toward "EH". Relax the jaw and allow the soft palate to lift slightly to create more space.',
      mistakes: [
        'Over-modifying. The goal is to keep the word intelligible while improving the tone.',
        'Holding onto "closed" vowels too tightly in the high register, which leads to a "pinched" sound.'
      ],
      when: 'Use this whenever you feel your tone getting "thin" or "strained" as you reach higher notes.'
    }
  },
  {
    id: 'ref-vocal-health',
    title: 'Vocal Health Foundations',
    summary: 'Protecting your instrument for long-term performance.',
    category: 'Vocal Techniques',
    icon: HeartPulse,
    body: {
      what: 'Your vocal cords are delicate mucosal tissues. Maintaining their health is not just about avoiding "losing your voice"—it\'s about ensuring your instrument is flexible and responsive enough for high-level training.',
      how: 'Maintain high systemic hydration (drink water 2 hours before you need it). Avoid "throat clearing" which slams the cords together; try a "silent cough" or a sip of water instead. Ensure you warm up with gentle slides or humming before attempting high-intensity drills.',
      mistakes: [
        'Practicing through pain. If it hurts, stop immediately.',
        'Relying on tea or lozenges to "fix" a tired voice. These are surface treatments; rest and hydration are the only true repairs.'
      ],
      when: 'Every day. Vocal health is a cumulative maintenance habit, not a rescue mission.'
    }
  }
];
