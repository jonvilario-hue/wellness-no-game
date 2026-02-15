
export type Feeling =
  | 'Mentally foggy'
  | 'Emotionally overloaded'
  | 'Physically tired'
  | 'Numb or bored'
  | 'Scattered/restless'
  | 'Unsure';

export type Craving = 'Relief' | 'Energy' | 'Progress';

type DopamineAction = {
  action: string;
  reason: string;
  link: string;
};

/**
 * 18 Unique Outcomes based on Emotional Triage.
 * Mapping directly to either the Protocol Hub (Library) for sequences
 * or the Gym Floor (Health Check) for raw exercises.
 */
export const dopamineWizardData: Record<Feeling, Record<Craving, DopamineAction>> = {
  'Mentally foggy': {
    Relief: {
      action: 'Brain Warm-Up Protocol',
      reason: 'Use structured box breathing to clear carbon dioxide and CO2 buildup, sharpening mental focus.',
      link: '/library?tab=wellness#kit-brain-warm-up-kit',
    },
    Energy: {
      action: '1-Min High Knees',
      reason: 'A rapid heart-rate spike forces blood flow to the prefrontal cortex.',
      link: '/exercises?tab=movement#practice-energizer_high_knees',
    },
    Progress: {
      action: 'Momentum Builder Kit',
      reason: 'Combine physical motion with symbolic task-starting to break the freeze response.',
      link: '/library?tab=wellness#kit-momentum-builder-kit',
    },
  },
  'Emotionally overloaded': {
    Relief: {
      action: '4-7-8 Breath Reset',
      reason: 'Directly stimulates the vagus nerve to switch your system from sympathetic to parasympathetic mode.',
      link: '/exercises?tab=stillness#practice-breath_478',
    },
    Energy: {
      action: 'Stress Shakeoff Protocol',
      reason: 'Physically discharge cortisol and adrenaline through shadow boxing and controlled breath pulses.',
      link: '/library?tab=wellness#kit-stress-shakeoff',
    },
    Progress: {
      action: 'Emotional Recovery Sequence',
      reason: 'Transition from reactive overwhelm to productive stability using grounding and self-compassion tools.',
      link: '/library?tab=wellness#kit-emotional-recovery-kit',
    },
  },
  'Physically tired': {
    Relief: {
      action: 'Evening Soft Landing',
      reason: 'Gently downshift your metabolic rate to prepare for high-quality recovery sleep.',
      link: '/library?tab=wellness#kit-evening-soft-landing',
    },
    Energy: {
      action: 'Body Jumpstart Routine',
      reason: 'Activate the large muscle groups to signal to your brain that it is time for wakefulness.',
      link: '/library?tab=wellness#kit-body-jumpstart-kit',
    },
    Progress: {
      action: 'Dopamine Ladder Kit',
      reason: 'Layer small sensory wins to gradually rebuild mental energy without causing further burnout.',
      link: '/library?tab=wellness#kit-dopamine-ladder-kit',
    },
  },
  'Numb or bored': {
    Relief: {
      action: 'Unfreeze Protocol',
      reason: 'Restore the mind-body connection using tactile sensory anchors and gentle mobility.',
      link: '/library?tab=wellness#kit-unfreeze-toolkit',
    },
    Energy: {
      action: 'Music & Move Challenge',
      reason: 'Leverage auditory dopamine and rhythmic movement to "unlock" your emotional and physical state.',
      link: '/library?tab=wellness#kit-music-&-move-kit',
    },
    Progress: {
      action: 'Creative Flow Primer',
      reason: 'Prime the associative neural pathways to transition from boredom into a productive flow state.',
      link: '/library?tab=wellness#kit-creative-flow-primer',
    },
  },
  'Scattered/restless': {
    Relief: {
      action: 'Two-Minute Reset',
      reason: 'A cognitive "empty space" to stop the loop of task-switching and regain a single point of focus.',
      link: '/exercises?tab=stillness#practice-focus_reset',
    },
    Energy: {
      action: 'Core Awakening',
      reason: 'Isometric core tension provides a stabilizing physical anchor for a scattered mind.',
      link: '/exercises?tab=movement#practice-strength_core',
    },
    Progress: {
      action: 'Focus Reboot Protocol',
      reason: 'A multi-step intervention to reset your executive function and filter out distractions.',
      link: '/library?tab=wellness#kit-focus-reboot-pack',
    },
  },
  'Unsure': {
    Relief: {
      action: 'Nature Visualization',
      reason: 'Creates a safe, low-stakes mental environment to reduce the pressure of decision-making.',
      link: '/exercises?tab=stillness#practice-grounding_nature',
    },
    Energy: {
      action: 'Self-Talk Reset Kit',
      reason: 'Swap the internal "noise" of uncertainty for a supportive and structured internal channel.',
      link: '/library?tab=wellness#kit-self-talk-reset',
    },
    Progress: {
      action: 'Name 3 Wins',
      reason: 'Rebuild self-efficacy by identifying existing progress and small victories.',
      link: '/exercises?tab=stillness#practice-focus_wins',
    },
  },
};
