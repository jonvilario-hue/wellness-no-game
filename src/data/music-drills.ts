import { MusicDomain } from "@/types/music";
import { 
  Ear, Music, Brain, Eye, 
  Sparkles, Headphones, 
  Wind, Mic2
} from "lucide-react";

export interface DrillDefinition {
  id: string;
  name: string;
  domain: MusicDomain;
  description: string;
  questions: {
    prompt: string;
    options?: string[];
    answer: string;
    explanation: string;
    type: 'multiple-choice' | 'tap' | 'construction' | 'text';
  }[];
}

export const musicDomains: { name: MusicDomain; icon: any; drills: string[] }[] = [
  { 
    name: 'Ear Training', 
    icon: Ear, 
    drills: ['Interval Identification', 'Chord Quality ID', 'Seventh Chord ID', 'Melody Dictation', 'Relative Pitch Ladder'] 
  },
  { 
    name: 'Rhythm & Timing', 
    icon: Music, 
    drills: ['Tap-Along', 'Subdivision ID', 'Polyrhythm Replication', 'Internal Metronome', 'Syncopation Reading'] 
  },
  { 
    name: 'Theory & Harmony', 
    icon: Brain, 
    drills: ['Scale Builder', 'Chord Constructor', 'Key Signature ID', 'Progression Analysis', 'Mode Identification'] 
  },
  { 
    name: 'Sight Reading', 
    icon: Eye, 
    drills: ['Note Flash', 'Rhythm Reading', 'Progressive Notation', 'Bass Clef Training'] 
  },
  { 
    name: 'Vocal Mechanics', 
    icon: Mic2, 
    drills: ['Pitch Matching', 'Range Expansion', 'Breath Support', 'Tone Shaping'] 
  },
  { 
    name: 'Improvisation & Composition', 
    icon: Sparkles, 
    drills: ['Constrained Composition', 'Call and Response', 'Harmonic Sandbox', 'Vocal Improv'] 
  },
  { 
    name: 'Critical Listening', 
    icon: Headphones, 
    drills: ['Harmonic Direction', 'Dynamic Analysis'] 
  }
];

export const drillsData: DrillDefinition[] = [
  // --- Ear Training ---
  {
    id: 'interval-id',
    name: 'Interval Identification',
    domain: 'Ear Training',
    description: 'Identify the distance between two notes.',
    questions: [
      { prompt: "Notes C4 to G4.", options: ["Major 3rd", "Perfect 4th", "Perfect 5th", "Major 6th"], answer: "Perfect 5th", explanation: "C to G is 7 semitones.", type: 'multiple-choice' },
      { prompt: "Notes E4 to G#4.", options: ["Minor 3rd", "Major 3rd", "Perfect 4th", "Tritone"], answer: "Major 3rd", explanation: "E to G# is 4 semitones.", type: 'multiple-choice' },
      { prompt: "Notes A3 to C4.", options: ["Minor 3rd", "Major 3rd", "Perfect 4th", "Major 2nd"], answer: "Minor 3rd", explanation: "A to C is 3 semitones.", type: 'multiple-choice' }
    ]
  },
  {
    id: 'chord-quality-id',
    name: 'Chord Quality ID',
    domain: 'Ear Training',
    description: 'Identify the flavor of the triad.',
    questions: [
      { prompt: "Notes C, E, G played simultaneously.", options: ["Major", "Minor", "Diminished", "Augmented"], answer: "Major", explanation: "Root, Major 3rd, and Perfect 5th form a Major triad.", type: 'multiple-choice' },
      { prompt: "Notes A, C, E played simultaneously.", options: ["Major", "Minor", "Diminished", "Augmented"], answer: "Minor", explanation: "Root, Minor 3rd, and Perfect 5th form a Minor triad.", type: 'multiple-choice' }
    ]
  },

  // --- Rhythm & Timing ---
  {
    id: 'tap-along',
    name: 'Tap-Along',
    domain: 'Rhythm & Timing',
    description: 'Maintain steady timing with the metronome.',
    questions: [
      { prompt: "Sync with a steady 4/4 beat at 90 BPM.", answer: "90bpm", explanation: "The foundation of all musicality is a steady pulse.", type: 'tap' },
      { prompt: "Sync with a fast 120 BPM tempo.", answer: "120bpm", explanation: "High speed requires lighter, more precise internal timing.", type: 'tap' }
    ]
  },
  {
    id: 'polyrhythm-replication',
    name: 'Polyrhythm Replication',
    domain: 'Rhythm & Timing',
    description: 'Maintain two conflicting rhythms simultaneously.',
    questions: [
      { prompt: "Tap a 3-over-2 polyrhythm (Triplet vs Quarter).", answer: "3:2", explanation: "Commonly summarized as 'Nice Cold Cup of Tea'.", type: 'tap' }
    ]
  },

  // --- Theory & Harmony ---
  {
    id: 'scale-builder',
    name: 'Scale Builder',
    domain: 'Theory & Harmony',
    description: 'Construct scales from a root note.',
    questions: [
      { prompt: "Construct a D Major scale.", answer: "D E F# G A B C# D", explanation: "D Major uses two sharps: F# and C#.", type: 'construction' },
      { prompt: "Construct an A Minor (Natural) scale.", answer: "A B C D E F G A", explanation: "A Natural Minor has no sharps or flats.", type: 'construction' }
    ]
  },
  {
    id: 'key-signature-id',
    name: 'Key Signature ID',
    domain: 'Theory & Harmony',
    description: 'Identify the scale from the sharp/flat count.',
    questions: [
      { prompt: "Signature: 3 Sharps (F#, C#, G#). Name the Major and Relative Minor.", options: ["A Maj / F# Min", "D Maj / B Min", "E Maj / C# Min", "G Maj / E Min"], answer: "A Maj / F# Min", explanation: "3 Sharps indicate A Major or its relative minor, F# Minor.", type: 'multiple-choice' }
    ]
  },

  // --- Sight Reading ---
  {
    id: 'note-flash',
    name: 'Note Flash',
    domain: 'Sight Reading',
    description: 'Identify the note on the staff as fast as possible.',
    questions: [
      { prompt: "Treble Clef: Second space from the bottom.", options: ["A", "B", "C", "D"], answer: "A", explanation: "FACE mnemonic: F-A-C-E for spaces.", type: 'multiple-choice' },
      { prompt: "Treble Clef: Middle line.", options: ["A", "B", "C", "D"], answer: "B", explanation: "Every Good Boy Does Fine: E-G-B-D-F for lines.", type: 'multiple-choice' }
    ]
  },

  // --- Improvisation ---
  {
    id: 'constrained-composition',
    name: 'Constrained Composition',
    domain: 'Improvisation & Composition',
    description: 'Plan a phrase using specific parameters.',
    questions: [
      { prompt: "Compose a 4-bar melody using only: G, A, B, D, E (G Pentatonic).", answer: "composition", explanation: "Pentatonic scales provide a safe harmonic landing for improvisation.", type: 'text' }
    ]
  }
];
