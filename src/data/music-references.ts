
import { 
  Clock, Activity, Target, Shuffle, Mic2, Sparkles, LayoutGrid, Brain, 
  Wind, HeartPulse, SlidersHorizontal, Ear, UserCheck, ShieldAlert, BookOpen 
} from 'lucide-react';
import type { MusicReferenceEntry } from '@/types/music';

export const musicReferences: MusicReferenceEntry[] = [
  // --- PRACTICE METHODS (PLAY TAB) ---
  {
    id: 'ref-slow-practice',
    title: 'Slow Practice Mastery',
    summary: 'Rewire muscle memory by eliminating the "panic response" at high speeds.',
    category: 'Practice Methods',
    icon: Clock,
    metadata: {
      time: '5-10 min',
      difficulty: 'All Levels',
      bestFor: 'Technical accuracy and cleaning up messy passages.'
    },
    drill: {
      tryThisNow: 'Play a difficult 2-bar phrase at 50% speed with zero errors.',
      steps: [
        'Identify a 1-2 bar passage you keep missing.',
        'Set metronome to 50% of the target tempo.',
        'Play the passage 3 times consecutively with zero errors.',
        'If you make an error, the count resets to zero.',
        'Increase tempo by 2-4 BPM only after 3 clean reps.'
      ]
    },
    theory: {
      what: 'Slow practice allows the brain to encode correct motor patterns without the constant interference of error correction. It prevents the "muscle memory of mistakes."',
      mistakes: [
        'Raising the tempo too quickly (if you miss, you jumped too far).',
        'Sloppy rhythm (slow practice must be metronomically perfect).'
      ],
      when: 'Every time you encounter a technical barrier or start new material.'
    },
    relatedModule: { name: 'Scale Builder', hub: 'Play' }
  },
  {
    id: 'ref-metronome-diag',
    title: 'Metronome as Diagnostic',
    summary: 'Build internal time by intentionally removing beats from the click.',
    category: 'Practice Methods',
    icon: Activity,
    metadata: {
      time: '5 min',
      difficulty: 'Intermediate',
      bestFor: 'Developing internal pulse and stopping "click-dependency."'
    },
    drill: {
      tryThisNow: 'Set metronome to click only on beats 2 and 4.',
      steps: [
        'Start at 80 BPM with a standard 4/4 click.',
        'Switch settings so the click only sounds on beats 2 and 4.',
        'Maintain your internal feel for 1 and 3 while playing a simple scale.',
        'Challenge: Set the click to only beat 1 of every other bar.',
        'Notice if you rush or drag when the click is absent.'
      ]
    },
    theory: {
      what: 'Standard clicks can become a crutch. Removing beats forces your internal "internal clock" to work harder, highlighting where your timing is naturally unstable.',
      mistakes: [
        'Letting the metronome carry you rather than burying the click under your notes.',
        'Practicing with the click too loud (it should be a guide, not a lead instrument).'
      ],
      when: 'Weekly for technical exercises to audit your rhythmic stability.'
    },
    relatedModule: { name: 'Tap-Along', hub: 'Listen' }
  },
  {
    id: 'ref-isolating-bars',
    title: 'Surgical Isolation',
    summary: 'Stop running the whole piece; fix the broken 10% first.',
    category: 'Practice Methods',
    icon: Target,
    metadata: {
      time: '3-5 min',
      difficulty: 'All Levels',
      bestFor: 'Eliminating the "stop-and-start" habit during performance.'
    },
    drill: {
      tryThisNow: 'Isolate the "broken" bar and bridge it with the surrounding measures.',
      steps: [
        'Identify exactly where you stumble (usually just 1-2 bars).',
        'Extract those bars and practice them in isolation until clean.',
        'Bridge: Start 2 bars before the problem and play through to 2 bars after.',
        'Expansion: Add 1 bar to the start and end of the bridge until the section is restored.',
        'Practice entering the isolated section from different beats, not just beat 1.'
      ]
    },
    theory: {
      what: 'Running a piece from the top every time over-practices the beginning and under-practices the hard part. Isolation ensures your effort is spent where the friction actually lives.',
      mistakes: [
        'Isolating sections that are too long (keep it to 1-2 bars).',
        'Lead-in dependency: only being able to play the hard part if you start from the beginning.'
      ],
      when: 'When you notice you are stopping and restarting at the same spot in a piece.'
    }
  },
  {
    id: 'ref-interleaved',
    title: 'Interleaved Rotation',
    summary: 'Shuffle your tasks to trick your brain into better long-term retention.',
    category: 'Practice Methods',
    icon: Shuffle,
    metadata: {
      time: '15-20 min',
      difficulty: 'Intermediate',
      bestFor: 'Breaking plateaus and improving next-day recall.'
    },
    drill: {
      tryThisNow: 'Rotate between 3 unrelated tasks every 3 minutes.',
      steps: [
        'Pick 3 items (e.g., Scale X, Passage Y, Ear Training Z).',
        'Set a timer for 3 minutes.',
        'Work on Item A until the timer rings, then move immediately to B.',
        'After B, move to C. Then back to A.',
        'Complete 3 full cycles (A-B-C, A-B-C, A-B-C).'
      ]
    },
    theory: {
      what: 'Blocked practice (one thing for 20 mins) feels productive but retention is lower. Interleaving forces the brain to "reload" info, which builds stronger neural connections.',
      mistakes: [
        'Over-focusing: staying on one item too long because you\'re "almost there."',
        'Interleaving items that are too similar (e.g., two very similar scales).'
      ],
      when: 'For material you know basic steps for but haven\'t yet mastered.'
    }
  },
  {
    id: 'ref-sing-diagnostic',
    title: 'Sing-Back Diagnostic',
    summary: 'If you can\'t sing it, you don\'t truly know it.',
    category: 'Practice Methods',
    icon: Mic2,
    metadata: {
      time: '2 min',
      difficulty: 'All Levels',
      bestFor: 'Identifying where finger patterns are hiding a lack of musical understanding.'
    },
    drill: {
      tryThisNow: 'Put your instrument down and hum a difficult passage from memory.',
      steps: [
        'Choose a melodic line you are currently learning.',
        'Put the instrument away.',
        'Sing or hum the line out loud (pitch quality doesn\'t matter, accuracy does).',
        'Identify where you get lost or fuzzy on the melody.',
        'Return to the instrument and fix ONLY those specific pitch relationships.'
      ]
    },
    theory: {
      what: 'Instrumentalists often rely on "finger memory." Singing bypasses the hands and forces the brain to process the actual music. It is the ultimate test of internalization.',
      mistakes: [
        'Humming vaguely without committing to specific pitches.',
        'Ignoring the rhythm during the sing-back.'
      ],
      when: 'For any passage that feels "slippery" or unreliable under pressure.'
    },
    relatedModule: { name: 'Melody Echo', hub: 'Listen' }
  },
  {
    id: 'ref-improv-landmarks',
    title: 'Harmonic Landmarks',
    summary: 'Build a roadmap for improvisation using chord tones.',
    category: 'Practice Methods',
    icon: Sparkles,
    metadata: {
      time: '10 min',
      difficulty: 'Intermediate',
      bestFor: 'Moving away from random scale-running toward melodic solos.'
    },
    drill: {
      tryThisNow: 'Solo over a track using ONLY the 3rd and 7th of each chord.',
      steps: [
        'Pick a 2-chord loop (e.g., Cmaj7 to Fmaj7).',
        'Identify the 3rd and 7th of both chords.',
        'Improvise using ONLY those two notes per chord.',
        'Focus on the voice-leading: how one 3rd moves to the next landmark.',
        'Slowly add roots and 5ths once the "guide tones" feel like home.'
      ]
    },
    theory: {
      what: 'Improvisation is often taught as "scales," but chords are built on specific tones. Guide tones (3rds and 7ths) are the markers that define the sound of the harmony.',
      mistakes: [
        'Wandering: playing too many notes without intent.',
        'Relying on finger patterns rather than hearing the chord change.'
      ],
      when: 'Before practicing free improvisation or learning a new jazz standard.'
    },
    relatedModule: { name: 'Vocal Improv', hub: 'Create' }
  },
  {
    id: 'ref-thirds-framework',
    title: 'The Thirds Session',
    summary: 'Ensure balanced growth by dividing your time into three pillars.',
    category: 'Practice Methods',
    icon: LayoutGrid,
    metadata: {
      time: '15-60 min',
      difficulty: 'All Levels',
      bestFor: 'General progress and preventing "stagnation" in one area.'
    },
    drill: {
      tryThisNow: 'Divide your next 30-minute session into 10-10-10 blocks.',
      steps: [
        'Pillar 1 (Technical): 10 mins of scales, arpeggios, or physical drills.',
        'Pillar 2 (Repertoire): 10 mins of focused work on your current songs/pieces.',
        'Pillar 3 (Musicianship): 10 mins of ear training, improv, or sight reading.',
        'Respect the timer: move to the next pillar even if you feel unfinished.',
        'Adjust the durations, but keep the 1:1:1 ratio.'
      ]
    },
    theory: {
      what: 'Most players spend 90% of their time on Repertoire. The Thirds framework ensures the underlying "hardware" (Technique) and "software" (Musicianship) aren\'t neglected.',
      mistakes: [
        'The "Just one more time" trap: let the repertoire eat into the other blocks.',
        'Ignoring the third pillar because it feels less like "playing."'
      ],
      when: 'Use as the standard template for every daily practice session.'
    }
  },
  {
    id: 'ref-mental-practice',
    title: 'High-Fidelity Rehearsal',
    summary: 'Reinforce learning away from the instrument through vivid mental imaging.',
    category: 'Practice Methods',
    icon: Brain,
    metadata: {
      time: '3 min',
      difficulty: 'Intermediate',
      bestFor: 'Memorization and reducing performance anxiety.'
    },
    drill: {
      tryThisNow: 'Close your eyes and "play" 4 bars in your head with 100% detail.',
      steps: [
        'Sit in a quiet space and close your eyes.',
        'Imagine your instrument—feel the texture, weight, and position.',
        'Hear the music in your head with perfect pitch and rhythm.',
        'Feel the physical sensation of the movement (fingers, breath, posture).',
        'If the mental image gets fuzzy, that is where your understanding is weak.'
      ]
    },
    theory: {
      what: 'Mental rehearsal activates the same neural pathways as physical practice. It is exceptionally efficient for reinforcing memory without physical fatigue.',
      mistakes: [
        'Vagueness: just "thinking about the song" isn\'t practice. It must be high-fidelity.',
        'Impatience: letting the mind drift to other topics.'
      ],
      when: 'Warming up before a show, during travel, or when physically tired.'
    }
  },

  // --- VOCAL TECHNIQUES (SING TAB) ---
  {
    id: 'ref-vocal-breath',
    title: 'Diaphragmatic Support',
    summary: 'Generate consistent power from your core to protect your throat.',
    category: 'Vocal Techniques',
    icon: Wind,
    metadata: {
      time: '3 min',
      difficulty: 'Beginner',
      bestFor: 'Vocal power, stability, and preventing throat strain.'
    },
    drill: {
      tryThisNow: 'Use the "Book Method" to feel your core engagement.',
      steps: [
        'Lie on your back with a book on your belly.',
        'Inhale: the book should rise as your lower ribs expand wide.',
        'Exhale: the book should fall slowly while you "hiss" (ssssss).',
        'Stand up and replicate the same expansion in your ribs.',
        'Sing a note, focusing on steady abdominal pressure, not throat tension.'
      ]
    },
    theory: {
      what: 'Breath support is the management of air pressure. The sensation should be low and wide expansion, never lifting in the chest or shoulders.',
      mistakes: [
        'Shoulder lifting: indicates shallow chest breathing.',
        'Clenching: confusing "support" with "rock-hard abs" (it should be flexible).'
      ],
      when: 'Every morning and during every vocal warm-up.'
    }
  },
  {
    id: 'ref-vocal-warmup',
    title: 'The Safe Start',
    summary: 'A 5-minute sequence to wake up vocal tissue safely.',
    category: 'Vocal Techniques',
    icon: HeartPulse,
    metadata: {
      time: '5 min',
      difficulty: 'All Levels',
      bestFor: 'Preventing vocal injury and improving morning tone.'
    },
    drill: {
      tryThisNow: 'Follow the sequence: Humming → Lip Trills → Open Vowels.',
      steps: [
        '1 Min: Gentle humming on a mid-range pitch (focus on the "buzz").',
        '2 Mins: Lip Trills (bubbling lips) sliding up and down your range.',
        '2 Mins: Open "oo" and "ee" vowels on descending scales.',
        'Avoid high-volume or extreme range notes for the first 5 minutes.',
        'End by gently shaking out your jaw and shoulders.'
      ]
    },
    theory: {
      what: 'The voice is a soft-tissue instrument. Singing "cold" can cause micro-swelling and fatigue. Warm-ups increase blood flow and flexibility.',
      mistakes: [
        'Warming up with your hardest song.',
        'Skipping the hum/trill phase and going straight to loud vowels.'
      ],
      when: 'Before every practice session, lesson, or performance.'
    }
  },
  {
    id: 'ref-vocal-vowel-mod',
    title: 'Vowel Modification',
    summary: 'Adjust your internal mouth shape to keep high notes resonant.',
    category: 'Vocal Techniques',
    icon: SlidersHorizontal,
    metadata: {
      time: '4 min',
      difficulty: 'Intermediate',
      bestFor: 'Singing high notes without shouting or "breaking."'
    },
    drill: {
      tryThisNow: 'Subtly shift "ah" to "uh" as you sing an ascending scale.',
      steps: [
        'Sing "ah" on a comfortable low note.',
        'As you sing higher, subtly round the lips and drop the jaw.',
        'By the top of the scale, your "ah" should feel more like "uh".',
        'The audience should still hear "ah," but your throat feels open.',
        'Practice this on the word "Love" (L-uh-ve) to maintain resonance.'
      ]
    },
    theory: {
      what: 'As pitch rises, the vocal tract must shift its shape to match the new frequency. If you keep a mid-range "ah" too high, the voice will squeeze or crack.',
      mistakes: [
        'Muscling through with a pure, wide vowel at high pitches.',
        'Over-modifying so the words become unintelligible.'
      ],
      when: 'When working on your upper register or the bridge (passaggio) of your range.'
    }
  },
  {
    id: 'ref-vocal-resonance',
    title: 'Resonance Balance',
    summary: 'Balance "chest" and "head" vibrations for a rich, consistent tone.',
    category: 'Vocal Techniques',
    icon: Ear,
    metadata: {
      time: '3 min',
      difficulty: 'Intermediate',
      bestFor: 'Developing a "professional" tone and smoothing vocal breaks.'
    },
    drill: {
      tryThisNow: 'Sing "nee" on a descending scale to feel the "face buzz."',
      steps: [
        'Hum a low note and feel the vibration in your sternum (Chest).',
        'Sing "nee" on a high note and feel the buzz in your sinuses (Head).',
        'Slowly descend the scale, trying to keep that "face buzz" even as you go low.',
        'The goal is a "Mix": chest power with head resonance and clarity.',
        'Maintain a "forward" placement to ensure you aren\'t swallowed by the throat.'
      ]
    },
    theory: {
      what: 'Resonance placement is about where the sound "sits." Forward placement in the face (the mask) provides clarity and projection without extra effort.',
      mistakes: [
        'Swallowing the sound: resonance sitting too far back in the throat.',
        'Nasal tone: too much face buzz without enough chest support.'
      ],
      when: 'When working on tone quality and smoothing out your vocal transitions.'
    }
  },
  {
    id: 'ref-vocal-pitch-onset',
    title: 'Clean Onset Practice',
    summary: 'Hit the target note immediately without "scooping" from below.',
    category: 'Vocal Techniques',
    icon: Target,
    metadata: {
      time: '2 min',
      difficulty: 'Beginner',
      bestFor: 'Pitch accuracy and confident delivery.'
    },
    drill: {
      tryThisNow: 'Internalize the note for one full beat before you sing it.',
      steps: [
        'Play a reference note on the app.',
        'Listen and "hear" it in your head for 2 seconds (Internalize).',
        'Prepare your breath a split second before the sound begins.',
        'Sing the note directly on pitch. Do not slide up to it.',
        'If you miss, stop instantly. Re-listen, re-internalize, and restart.'
      ]
    },
    theory: {
      what: 'Scooping is a sign of lack of confidence or poor mental imaging. Pitch accuracy is won or lost in the split second *before* the sound starts.',
      mistakes: [
        'Singing along with the reference note (you must sing *after* it).',
        'Adjusting the pitch *after* you start (train the onset, not the correction).'
      ],
      when: 'During any pitch-matching or melodic memory drill.'
    },
    relatedModule: { name: 'Pitch Match', hub: 'Listen' }
  },
  {
    id: 'ref-vocal-fatigue-check',
    title: 'Fatigue Protocol',
    summary: 'Recognize the red flags of vocal tiredness to prevent injury.',
    category: 'Vocal Techniques',
    icon: ShieldAlert,
    metadata: {
      time: '1 min',
      difficulty: 'All Levels',
      bestFor: 'Vocal health and longevity.'
    },
    drill: {
      tryThisNow: 'Do a 30-second "effort check" on a mid-range note.',
      steps: [
        'Sing a comfortable mid-range note at medium volume.',
        'Check: Does it feel harder to produce than it did 20 mins ago?',
        'Check: Is the tone airier or "scratchier" than normal?',
        'If yes: STOP immediately. Rest for 20 minutes.',
        'If symptoms persist after rest: end your practice for the day.'
      ]
    },
    theory: {
      what: 'Muscular fatigue is normal; vocal fold strain is dangerous. Pushing through scratchiness or loss of range risks nodules or chronic damage.',
      mistakes: [
        'Drinking hot tea with honey and "powering through" (treats symptoms, not the tissue).',
        'Ignoring the early signs of a scratchy throat.'
      ],
      when: 'Every 20 minutes during any extended singing session.'
    }
  },
  {
    id: 'ref-vocal-vibrato-natural',
    title: 'Natural Vibrato Release',
    summary: 'Allow vibrato to emerge from relaxation, not forced movement.',
    category: 'Vocal Techniques',
    icon: Sparkles,
    metadata: {
      time: '5 min',
      difficulty: 'Advanced',
      bestFor: 'A professional, effortless sound and relieving jaw tension.'
    },
    drill: {
      tryThisNow: 'Alternate between "Straight Tone" and "Released Tone."',
      steps: [
        'Sing a sustained "ah" vowel with steady breath support.',
        'Start with a Straight Tone: perfectly even, no oscillation.',
        'Consciously relax your jaw, tongue, and throat.',
        'Transition to a Released Tone: let go of the control and let the sound spin.',
        'Do not "wobble" your jaw—if vibrato doesn\'t happen, just keep it straight.'
      ]
    },
    theory: {
      what: 'Vibrato is a byproduct of relaxation and support. Forced vibrato (wobble) creates tension and sounds uneven. It will emerge naturally as your support improves.',
      mistakes: [
        'Pulsing the abs or shaking the larynx to fake the sound.',
        'Over-applying vibrato to every note (it is an ornament, not a requirement).'
      ],
      when: 'When practicing long tones and sustained melodic endings.'
    }
  },
  {
    id: 'ref-vocal-registers-blend',
    title: 'Register Blending',
    summary: 'Smooth out the "crack" in your voice between low and high.',
    category: 'Vocal Techniques',
    icon: UserCheck,
    metadata: {
      time: '6 min',
      difficulty: 'Advanced',
      bestFor: 'Extending range and achieving a consistent sound across the whole voice.'
    },
    drill: {
      tryThisNow: 'Practice descending scales from Head Voice into Chest Voice.',
      steps: [
        'Start on a high "oo" in pure Head Voice (light and flute-like).',
        'Slowly sing a descending 5-note scale.',
        'As you go lower, try to "thicken" the sound without letting it drop abruptly.',
        'Reverse: start low and see how high you can take that "mix" resonance.',
        'Focus on the passaggio (the break) and keep the airflow perfectly steady.'
      ]
    },
    theory: {
      what: 'The "break" is where the vocal folds shift their vibration mode. Blending involves keeping some "head buzz" in your lows and some "chest power" in your highs.',
      mistakes: [
        'Flipping abruptly between registers instead of finding the middle ground.',
        'Avoiding the break entirely (the only way through is through).'
      ],
      when: 'When working on songs that sit right in the middle of your range.'
    }
  }
];
