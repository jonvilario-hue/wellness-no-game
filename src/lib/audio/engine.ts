
'use client';

import * as Tone from 'tone';
import { getPreferences } from '@/lib/storage/preferences';

class AudioEngine {
  private static instance: AudioEngine;
  private synth: Tone.PolySynth | null = null;
  private initialized: boolean = false;

  private constructor() {}

  public static getInstance(): AudioEngine {
    if (!AudioEngine.instance) {
      AudioEngine.instance = new AudioEngine();
    }
    return AudioEngine.instance;
  }

  public async initialize() {
    if (this.initialized) return;
    
    await Tone.start();
    this.synth = new Tone.PolySynth(Tone.Synth).toDestination();
    
    const prefs = getPreferences();
    this.setVolume(prefs.volume);
    this.setMute(prefs.muted);
    
    this.initialized = true;
    console.log('Audio Engine Initialized');
  }

  public setVolume(value: number) {
    if (Tone.getDestination()) {
      Tone.getDestination().volume.value = Tone.gainToDb(value);
    }
  }

  public setMute(muted: boolean) {
    if (Tone.getDestination()) {
      Tone.getDestination().mute = muted;
    }
  }

  public playNote(note: string, duration: string = '4n', time?: number) {
    if (!this.synth) return;
    this.synth.triggerAttackRelease(note, duration, time);
  }

  public playChord(notes: string[], duration: string = '2n') {
    if (!this.synth) return;
    this.synth.triggerAttackRelease(notes, duration);
  }

  public playSequence(notes: string[], interval: string = '4n') {
    if (!this.synth) return;
    const now = Tone.now();
    notes.forEach((note, i) => {
      this.synth?.triggerAttackRelease(note, '8n', now + i * Tone.Time(interval).toSeconds());
    });
  }

  public async playMetronomeClick() {
    const click = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 2,
      envelope: { attack: 0.001, decay: 0.1, sustain: 0 },
    }).toDestination();
    click.triggerAttackRelease('C4', '32n');
  }

  public dispose() {
    this.synth?.dispose();
    this.initialized = false;
  }
}

export const audioEngine = AudioEngine.getInstance();
