
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
};

export const dopamineWizardData: Record<Feeling, Record<Craving, DopamineAction>> = {
  'Mentally foggy': {
    Relief: {
      action: '10-minute NSDR or breathwork audio',
      reason: 'Restores cognitive clarity through deep rest.',
    },
    Energy: {
      action: '3-minute full-body stretch flow',
      reason: 'Movement and blood flow activate alertness.',
    },
    Progress: {
      action: 'Write down 3 tiny wins from today',
      reason: 'Symbolic completion creates forward momentum.',
    },
  },
  'Emotionally overloaded': {
    Relief: {
      action: '5-4-3-2-1 Grounding or Box Breathing',
      reason: 'Parasympathetic reset to calm the nervous system.',
    },
    Energy: {
      action: 'Pace or walk while listening to intense music',
      reason: 'Emotional venting through structured motion.',
    },
    Progress: {
      action: 'Tidy one surface (desk, counter)',
      reason: 'Visible order creates a sense of mental regulation.',
    },
  },
  'Physically tired': {
    Relief: {
      action: 'Legs up the wall for 3-5 minutes',
      reason: 'Restorative pose for low-effort physical recovery.',
    },
    Energy: {
      action: 'Drink a cold glass of water and do 10 wall push-ups',
      reason: 'Hydration and gentle resistance activate the body.',
    },
    Progress: {
      action: 'Plan your next relaxing activity',
      reason: 'Anticipation of rest provides a mental reward.',
    },
  },
  'Numb or bored': {
    Relief: {
      action: 'Listen to a new song or a 5-minute podcast clip',
      reason: 'Passive sensory input requires minimal effort.',
    },
    Energy: {
      action: '1-minute doodle or color something random',
      reason: 'Novelty and creativity provide a light challenge.',
    },
    Progress: {
      action: 'Do one small, easy task you’ve been avoiding',
      reason: 'Overcoming minor friction builds momentum.',
    },
  },
  'Scattered/restless': {
    Relief: {
      action: 'Hold a plank or wall sit for 30 seconds',
      reason: 'Physical tension can channel and relieve mental restlessness.',
    },
    Energy: {
      action: 'Do 20 jumping jacks or a 1-minute shakeout',
      reason: 'High-intensity burst to match and release energy.',
    },
    Progress: {
      action: 'Write a quick to-do list for the next hour',
      reason: 'Externalizing thoughts provides structure and control.',
    },
  },
  'Unsure': {
    Relief: {
      action: '2-minute mindful breathing',
      reason: 'A neutral starting point to check in with your body.',
    },
    Energy: {
      action: 'Step outside for 60 seconds of fresh air',
      reason: 'A change of environment can reset your state.',
    },
    Progress: {
      action: 'Read one page of a book or article',
      reason: 'A small, contained step forward can provide clarity.',
    },
  },
};
