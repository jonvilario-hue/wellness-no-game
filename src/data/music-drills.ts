
import { MusicDomain } from "@/types/music";
import { 
  Ear, Music, Brain, Eye, 
  Sparkles, Headphones, 
  TypeIcon as LucideIcon 
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
    name: 'Improvisation & Composition', 
    icon: Sparkles, 
    drills: ['Constrained Composition', 'Call and Response', 'Harmonic Sandbox'] 
  },
  { 
    name: 'Critical Listening', 
    icon: Headphones, 
    drills: ['Instrument Identification', 'Harmonic Direction', 'Form Mapping', 'Dynamic Analysis'] 
  }
];

export const drillsData: DrillDefinition[] = [
  {
    id: 'interval-id-asc',
    name: 'Interval Identification (Ascending)',
    domain: 'Ear Training',
    description: 'Identify the distance between two notes played in sequence.',
    questions: [
      {
        prompt: "The first note is C4. The second note is G4. What is the interval?",
        options: ["Major 3rd", "Perfect 4th", "Perfect 5th", "Major 6th"],
        answer: "Perfect 5th",
        explanation: "C to G covers 7 semitones, forming a Perfect 5th.",
        type: 'multiple-choice'
      },
      {
        prompt: "The first note is E4. The second note is G#4. What is the interval?",
        options: ["Minor 3rd", "Major 3rd", "Perfect 4th", "Tritone"],
        answer: "Major 3rd",
        explanation: "E to G# is 4 semitones, characteristic of a Major 3rd.",
        type: 'multiple-choice'
      }
    ]
  },
  {
    id: 'tap-along-basic',
    name: 'Tap-Along',
    domain: 'Rhythm & Timing',
    description: 'Match the rhythm of the metronome.',
    questions: [
      {
        prompt: "Tap along to a steady 4/4 beat at 90 BPM.",
        answer: "target: 90bpm",
        explanation: "Steady timing is the foundation of all musicality.",
        type: 'tap'
      }
    ]
  },
  {
    id: 'scale-builder-major',
    name: 'Scale Builder',
    domain: 'Theory & Harmony',
    description: 'Construct scales from a root note.',
    questions: [
      {
        prompt: "Construct a D Major scale.",
        options: ["D E F G A B C D", "D E F# G A B C# D", "D E F G A B C# D", "D Eb F G A Bb C D"],
        answer: "D E F# G A B C# D",
        explanation: "D Major has two sharps: F# and C#.",
        type: 'multiple-choice'
      }
    ]
  }
];
