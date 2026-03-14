
'use client';

import * as Tone from 'tone';

/**
 * Procedural drum synthesis engine using Tone.js.
 */
class DrumKit {
  private static instance: DrumKit;
  private kickSynth: Tone.MembraneSynth | null = null;
  private snareSynth: Tone.NoiseSynth | null = null;
  private hihatSynth: Tone.NoiseSynth | null = null;
  private crashSynth: Tone.NoiseSynth | null = null;
  private initialized = false;

  private constructor() {}

  public static getInstance() {
    if (!DrumKit.instance) DrumKit.instance = new DrumKit();
    return DrumKit.instance;
  }

  public async init() {
    if (this.initialized) return;
    
    await Tone.start();
    
    this.kickSynth = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 4,
      oscillator: { type: 'sine' },
      envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.4 }
    }).toDestination();

    this.snareSynth = new Tone.NoiseSynth({
      noise: { type: 'white' },
      envelope: { attack: 0.001, decay: 0.2, sustain: 0 },
      filter: { Q: 1, type: 'lowpass', frequency: 2500 }
    }).toDestination();

    this.hihatSynth = new Tone.NoiseSynth({
      noise: { type: 'pink' },
      envelope: { attack: 0.001, decay: 0.05, sustain: 0 },
      filter: { Q: 1, type: 'highpass', frequency: 5000 }
    }).toDestination();

    this.crashSynth = new Tone.NoiseSynth({
      noise: { type: 'white' },
      envelope: { attack: 0.001, decay: 1.2, sustain: 0 },
      filter: { Q: 1, type: 'highpass', frequency: 2000 }
    }).toDestination();

    this.initialized = true;
  }

  public kick(time?: number) { this.kickSynth?.triggerAttackRelease('C1', '8n', time); }
  public snare(time?: number) { this.snareSynth?.triggerAttack(time); }
  public hihat(time?: number) { this.hihatSynth?.triggerAttack(time); }
  public crash(time?: number) { this.crashSynth?.triggerAttack(time); }

  public playPattern(pattern: string[], bpm: number) {
    const stepTime = 60 / bpm / 4; // 16th notes
    const now = Tone.now();
    
    pattern.forEach((step, i) => {
      const time = now + (i * stepTime);
      if (step.includes('K')) this.kick(time);
      if (step.includes('S')) this.snare(time);
      if (step.includes('H')) this.hihat(time);
      if (step.includes('C')) this.crash(time);
    });
  }
}

export const drumKit = DrumKit.getInstance();
