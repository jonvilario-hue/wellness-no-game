
import { BookOpen, Mic2, Wind, Activity, Clock, ShieldCheck, HeartPulse, Target, Shuffle, Sparkles, LayoutGrid, Brain, ShieldAlert, Ear, SlidersHorizontal, UserCheck } from 'lucide-react';

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
      what: 'Slow practice is the primary tool for developing high-level technical accuracy. When you play fast, your brain focuses on "keeping up," often at the expense of precision. Slowing down allows your neural pathways to map every physical movement and pitch relationship without the noise of panic or the constant need for error correction.',
      how: '1. Identify the passage you want to master.\n2. Set your metronome to 50% of the target tempo, or whatever speed allows you to play the entire section with zero errors.\n3. Play the section perfectly three times in a row. If you miss a note, the count resets to zero.\n4. Increase the tempo by only 2-4 BPM.\n5. If you make an error, drop back down by 5 BPM and clear the passage again.',
      mistakes: [
        'Raising the tempo too quickly before the passage is truly clean.',
        'Sloppy rhythm: playing "slowly" but with uneven timing. Slow practice must be just as rhythmically strict as performance speed.'
      ],
      when: 'Every time you encounter a technical barrier or start learning new material.'
    },
    relatedModule: { name: 'Scale Builder', hub: 'Play' }
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
        'Click dependence: letting the metronome "carry" you.',
        'Ignoring the "gap": not noticing when you are consistently rushing or dragging relative to the click.'
      ],
      when: 'Daily for technical exercises and when polishing repertoire.'
    },
    relatedModule: { name: 'Tap-Along', hub: 'Listen' }
  },
  {
    id: 'ref-isolating-bars',
    title: 'Isolating Problem Bars',
    summary: 'Stop running the whole piece and zoom in on the two bars that are actually broken.',
    category: 'Practice Methods',
    icon: Target,
    body: {
      what: 'Playing a piece from beginning to end repeatedly is the most common form of inefficient practice. The beginning gets mastered while the difficult passages in the middle remain brittle. Isolating "problem bars" allows you to spend 90% of your time on the 10% of the music that actually needs it.',
      how: '1. Identify the specific 1-2 bars where you stumble.\n2. Extract those bars and treat them as an independent exercise.\n3. Use Slow Practice on just those bars.\n4. Once clean, "bridge" the section: Play starting 2 bars before and ending 2 bars after the isolated section.',
      mistakes: [
        'Lead-in dependence: always starting from the same spot. Practice entering the passage from different beats.',
        'Isolating sections that are too long (keep it to 1-2 bars).'
      ],
      when: 'When you notice you are "stopping and starting" at the same spot in a piece.'
    }
  },
  {
    id: 'ref-interleaving',
    title: 'Blocked vs Interleaved Practice',
    summary: 'When to drill one thing on repeat and when to shuffle between multiple things in a single session.',
    category: 'Practice Methods',
    icon: Shuffle,
    body: {
      what: 'Blocked practice is drilling one thing for a long time. Interleaved practice (rotating between topics) is harder and feels messier, but produces much stronger long-term retention because it forces the brain to "reload" information constantly.',
      how: '1. Choose 3-4 items you need to work on (e.g., a scale, a difficult passage, and an ear-training drill).\n2. Set a timer for 3-5 minutes.\n3. Work on Item A until the timer goes off, then move immediately to Item B.\n4. Cycle through A, B, C, D multiple times in one session.',
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
      how: '1. Pick a passage or a solo you are learning.\n2. Put your instrument down.\n3. Sing the passage (humming is fine). Vocal quality doesn\'t matter; pitch and rhythm do.\n4. Wherever you get lost or uncertain is where your musical understanding has a gap.',
      mistakes: [
        'Using the instrument to "find" the note while singing.',
        'Ignoring rhythm during the sing-back.'
      ],
      when: 'For difficult melodic intervals, complex rhythms, or when preparing to improvise.'
    },
    relatedModule: { name: 'Melody Echo', hub: 'Listen' }
  },
  {
    id: 'ref-improv-vocabulary',
    title: 'Practicing Improvisation Systematically',
    summary: 'How to build vocabulary over changes instead of running scales and hoping for the best.',
    category: 'Practice Methods',
    icon: Sparkles,
    body: {
      what: 'Improvisation is often treated as "playing by feel," but elite improvisers build a structured vocabulary. Systematic practice builds "landmarks" in the harmony.',
      how: '1. Limitation Drills: Improvise using ONLY chord tones (1, 3, 5, 7).\n2. Rhythmic Isolation: Choose just one note and improvise purely rhythmically for one minute. Then two notes.\n3. Transcribe and Steal: Learn 2 bars of a solo you love by ear. Play it in all 12 keys.',
      mistakes: [
        'Wandering: playing too many notes without a clear rhythmic or harmonic intent.',
        'Scale-running: relying on finger patterns rather than hearing phrases.'
      ],
      when: 'Every time you sit down to improvise.'
    },
    relatedModule: { name: 'Vocal Improv', hub: 'Create' }
  },
  {
    id: 'ref-session-framework',
    title: 'Building a Practice Session',
    summary: 'How to divide your available time so technique, repertoire, and musicianship all move forward.',
    category: 'Practice Methods',
    icon: LayoutGrid,
    body: {
      what: 'A balanced session ensures you don\'t plateau. Most players spend all their time on one thing—usually repertoire—and neglect the underlying hardware of technique.',
      how: '1. Divide your time into thirds.\n2. First Third: Technical (Scales, arpeggios, long tones).\n3. Second Third: Repertoire (The pieces or songs you are preparing).\n4. Final Third: Musicianship & Creativity (Ear training, improvisation, sight reading).',
      mistakes: [
        'The "Reward Trap": spending all your time on the parts of a piece you already play well.',
        'Ignoring the final third (Musicianship) because it feels more like "work."'
      ],
      when: 'The blueprint for every daily session.'
    }
  },
  {
    id: 'ref-mental-rehearsal',
    title: 'Mental Practice Away From Your Instrument',
    summary: 'You can improve without touching your instrument by hearing the music in your head with precision.',
    category: 'Practice Methods',
    icon: Brain,
    body: {
      what: 'Mental rehearsal activates overlapping neural pathways with actual physical practice. It is a supplement, not a replacement, but it is incredibly powerful for reinforcing memory and managing performance anxiety.',
      how: '1. Sit quietly and close your eyes.\n2. Imagine holding your instrument. Feel the texture and weight.\n3. "Play" through a passage in your mind. Hear every note with perfect clarity.\n4. Feel the physical motions: the tension in the breath, the finger movement.',
      mistakes: [
        'Vagueness: just "thinking about" the music isn\'t mental practice. You must hear and feel it with 100% precision.',
        'Impatience: letting the mind drift.'
      ],
      when: 'Warming up before a show, or when physical fatigue makes playing counterproductive.'
    }
  },

  // --- VOCAL TECHNIQUES (SING TAB) ---
  {
    id: 'ref-vocal-breath',
    title: 'Breath Support Mechanics',
    summary: 'How to generate consistent airflow from your diaphragm instead of squeezing from your throat.',
    category: 'Vocal Techniques',
    icon: Wind,
    body: {
      what: 'Breath support is the management of air pressure using the diaphragm. The sensation should be expansion around the lower ribs and belly, not lifting in the chest and shoulders.',
      how: '1. Lie on your back with a book on your stomach.\n2. Breathe deeply so the book rises on inhale and falls on exhale.\n3. Transfer that sensation to standing.\n4. Apply to sustained tones: sing a note and focus on maintaining steady outward pressure from the abdominal area.',
      mistakes: [
        'Lifting the shoulders during inhalation.',
        'Confusing "support" with "tension." If the abs are rock-hard, you\'re over-doing it.'
      ],
      when: 'Practice during every vocal warm-up.'
    }
  },
  {
    id: 'ref-vocal-warmup',
    title: 'Warming Up Without Straining',
    summary: 'A safe warm-up sequence that wakes up the voice without pushing into dangerous territory.',
    category: 'Vocal Techniques',
    icon: HeartPulse,
    body: {
      what: 'The voice is a physical instrument made of delicate soft tissue. Singing "cold" risks strain, fatigue, and injury.',
      how: '1. Start with gentle humming at a comfortable mid-range pitch.\n2. Progress to lip trills (bubbling the lips while producing pitch) ascending through your range slowly.\n3. Open to vowel sounds: start with "oo" and "ee" which keep the larynx relaxed.',
      mistakes: [
        'Warming up with the hardest song you\'ll sing that day.',
        'Skipping warm-ups for short sessions.'
      ],
      when: 'Before every practice session or performance.'
    }
  },
  {
    id: 'ref-vocal-vowel-mod',
    title: 'Vowel Modification Across Registers',
    summary: 'Why the same vowel shape doesn\'t work at every pitch and how to adjust.',
    category: 'Vocal Techniques',
    icon: SlidersHorizontal,
    body: {
      what: 'As pitch rises, the vocal tract resonance must shift to keep the tone open. A pure "ah" vowel that works at a mid-range pitch will cause the voice to squeeze at a high pitch.',
      how: '1. As you ascend your scale, gradually modify "ah" toward "uh" and then toward "oo".\n2. The modification should be subtle; the audience should still "hear" the original vowel.',
      mistakes: [
        'Refusing to modify and "muscling through" with a pure vowel.',
        'Over-modifying so the words become unintelligible.'
      ],
      when: 'When singing in your upper register or approaching your passaggio.'
    }
  },
  {
    id: 'ref-vocal-resonance',
    title: 'Resonance Placement',
    summary: 'How to feel where your sound vibrates and use that awareness to shape your tone.',
    category: 'Vocal Techniques',
    icon: Ear,
    body: {
      what: 'Resonance refers to where in the head and face you feel sympathetic vibration. Chest resonance dominates lower pitches, while head resonance dominates higher pitches.',
      how: '1. Hum at a low pitch and feel the "buzz" in your chest.\n2. Slowly slide up and notice the buzz migrate through the throat into the face.\n3. Exercise: Sing "nee" on a descending scale to place resonance forward.',
      mistakes: [
        'Trying to keep everything in chest voice too high (belting strain).',
        'Flipping entirely to head voice too early (thin tone).'
      ],
      when: 'When working on tone quality and projection.'
    }
  },
  {
    id: 'ref-vocal-pitch',
    title: 'Pitch Accuracy From the Body',
    summary: 'Hitting the note starts before the sound comes out — it starts with hearing it internally.',
    category: 'Vocal Techniques',
    icon: Target,
    body: {
      what: 'Accurate pitch is a result of coordination between the internal ear and the breath. "Scooping" is often caused by initiating sound before "pre-hearing" the target.',
      how: '1. Before you sing a note, hear it clearly in your mind first.\n2. Prepare the breath: the airflow should be ready a split second before the note begins.\n3. Exercise: Play a note, listen, internalize it silently for one beat, then sing it with a clean onset.',
      mistakes: [
        'Always relying on a reference pitch playing simultaneously.',
        'Scooping: starting flat and sliding up to the note.'
      ],
      when: 'During any pitch-matching or melodic memory drill.'
    },
    relatedModule: { name: 'Pitch Match', hub: 'Sing' }
  },
  {
    id: 'ref-vocal-fatigue',
    title: 'Managing Vocal Fatigue',
    summary: 'How to recognize when your voice is tired and what to do about it.',
    category: 'Vocal Techniques',
    icon: ShieldAlert,
    body: {
      what: 'Vocal fatigue is common, but ignoring it risks long-term damage. Recognizing early signals allows you to rest and recover before a minor issue becomes major.',
      how: '1. Monitor for signs: voice feels effortful, pitch accuracy degrades, or the throat feels scratchy.\n2. Action: When these appear, STOP. Rest for 15-20 minutes.\n3. If it doesn\'t clear, end your practice for the day.',
      mistakes: [
        'Drinking hot tea with honey and continuing to sing (treats symptom, not cause).',
        'Thinking "no pain, no gain" applies to the vocal folds.'
      ],
      when: 'Any time you practice for longer than 20-30 minutes.'
    }
  },
  {
    id: 'ref-vocal-vibrato',
    title: 'Developing Vibrato Naturally',
    summary: 'Vibrato is a result of relaxed, supported singing — not something you force.',
    category: 'Vocal Techniques',
    icon: Sparkles,
    body: {
      what: 'Vibrato is a slight natural oscillation in pitch that occurs when the voice is well-supported and the throat is free of tension.',
      how: '1. Sing a comfortable sustained note on "ah" with solid breath support.\n2. Focus on releasing tension in your jaw, tongue, and throat.\n3. If vibrato doesn\'t appear, that is fine. It develops over time as technique improves.',
      mistakes: [
        'Trying to "wobble" the jaw or pulse the abdomen to create vibrato.',
        'Assuming vibrato should be on every note.'
      ],
      when: 'When practicing long tones or melodic phrases.'
    }
  },
  {
    id: 'ref-vocal-registers',
    title: 'Head Voice, Chest Voice, and Mix',
    summary: 'Understanding your registers and learning to move between them without a break.',
    category: 'Vocal Techniques',
    icon: UserCheck,
    body: {
      what: 'Vocal registers refer to different ways the vocal folds vibrate. The "passaggio" or break is the transition point between them.',
      how: '1. Slide upward slowly on an "oo" vowel. Notice where the tone wants to crack.\n2. Aim for a "Mix": keep some chest engagement while allowing head resonance to enter.\n3. Exercise: Practice descending scales starting in head voice and blending in chest resonance.',
      mistakes: [
        'Avoiding the passaggio by only singing in your comfortable chest range.',
        'Flipping abruptly to head voice instead of blending.'
      ],
      when: 'When working on extending range and building tone consistency.'
    }
  }
];
