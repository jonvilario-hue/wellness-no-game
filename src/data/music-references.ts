
import { BookOpen, Mic2, Wind, Activity, Clock, ShieldCheck, HeartPulse } from 'lucide-react';

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
  {
    id: 'ref-slow-practice',
    title: 'Slow Practice & Why It Works',
    summary: 'How playing at half tempo rewires muscle memory faster than full-speed repetition.',
    category: 'Practice Methods',
    icon: Clock,
    body: {
      what: 'Slow practice is the deliberate act of performing a passage at a tempo far below its performance speed. By slowing down, you give your brain the time it needs to process complex motor movements and neurological connections without the stress of "keeping up." This results in deeper encoding of the muscle memory.',
      how: 'Take the passage you\'re struggling with. Set your metronome to 50% of your target tempo. Play through the passage. If you make any error, stop, go back to the beginning of the bar where the error occurred, and play that single bar three times cleanly before continuing. When you can play the full passage three times consecutively with zero errors at 50%, raise the metronome by 5 BPM and repeat.',
      mistakes: [
        'Most players raise the tempo too quickly. If you\'re making errors after a tempo increase, you jumped too far. Drop back down. The goal is zero errors at every tempo, not getting to full speed today.',
        'Playing slowly but without focus. Slow practice requires more mental effort, not less.',
        'Not using a metronome. A steady pulse is essential to ensure you aren\'t accidentally speeding up during easier sections.'
      ],
      when: 'Use this whenever you encounter a technical passage that feels "clumsy" or when learning entirely new material.'
    },
    relatedModule: { name: 'Scale Drill', hub: 'Play' }
  },
  {
    id: 'ref-sectional-isolation',
    title: 'Sectional Isolation',
    summary: 'Breaking large pieces into tiny, solvable cells.',
    category: 'Practice Methods',
    icon: Activity,
    body: {
      what: 'Sectional isolation involves taking a large piece of music and identifying the specific 1-2 bars that are causing technical difficulty. Instead of playing the whole piece from the beginning, you isolate these "problem cells" and treat them as independent exercises.',
      how: 'Identify the exact transition or bar where you consistently make a mistake. Circle it. Practice only that bar plus the first note of the following bar. Loop this tiny section until it feels effortless. Once mastered, "bridge" it by starting 2 bars before and playing through to the end of the isolated cell.',
      mistakes: [
        'Isolating sections that are too long. If it\'s more than 4 bars, it\'s not isolated enough.',
        'Not practicing the "bridge" notes. You must practice the transition into and out of the isolated section.'
      ],
      when: 'Use this when you find yourself playing through a piece and only stumbling in specific, predictable spots.'
    }
  },
  {
    id: 'ref-interleaving',
    title: 'Interleaving vs. Blocked Practice',
    summary: 'Why mixing topics leads to better long-term retention than repeating one thing.',
    category: 'Practice Methods',
    icon: ShieldCheck,
    body: {
      what: 'Blocked practice is repeating one skill over and over (AAAA). Interleaving is mixing different skills (ABCABC). While blocked practice feels more successful in the moment, research shows that interleaving leads to significantly better long-term retention and the ability to apply skills in new contexts.',
      how: 'Choose three different skills or passages (e.g., a scale, a difficult bar from a piece, and an ear-training drill). Instead of doing 15 minutes of each, rotate between them every 5 minutes. Every time you switch, your brain is forced to "reload" the information, which strengthens the retrieval pathway.',
      mistakes: [
        'Switching too frequently. Give yourself enough time to engage with the task before moving on.',
        'Mistaking the "struggle" for failure. Interleaving is harder and feels slower, but that difficulty is exactly what creates deep learning.'
      ],
      when: 'Use this for your main daily practice sessions once you have moved past the initial "learning how it works" phase.'
    }
  },
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
      how: 'As you move toward the top of your range, lean your vowels toward a more neutral "neutral" shape. For example, an "EE" vowel should shift slightly toward "IH" (as in "bit"). An "AY" vowel should shift slightly toward "EH". Relax the jaw and allow the soft palate to lift slightly to create more space.',
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
