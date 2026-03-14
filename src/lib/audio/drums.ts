
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
      envelope: { attack: 0.001, decay: 0.2, sustain: 0 }
    }).toDestination();

    this.hihatSynth = new Tone.NoiseSynth({
      noise: { type: 'pink' },
      envelope: { attack: 0.001, decay: 0.05, sustain: 0 }
    }).toDestination();

    this.initialized = true;
  }

  public kick(time?: number) { this.kickSynth?.triggerAttackRelease('C1', '8n', time); }
  public snare(time?: number) { this.snareSynth?.triggerAttack(time); }
  public hihat(time?: number) { this.hihatSynth?.triggerAttack(time); }
}

export const drumKit = DrumKit.getInstance();
