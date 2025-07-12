import type { CHCDomain } from '@/types';
import { PatternMatrix } from './gf/pattern-matrix';
import { DynamicSequenceTransformer } from './gwm/dynamic-sequence-transformer';
import { RapidCodeMatch } from './gs/rapid-code-match';
import { MentalRotationLab } from './gv/mental-rotation-lab';
import { ToneGridChallenge } from './ga/tone-grid-challenge';
import { VerbalInferenceBuilder } from './gc/verbal-inference-builder';
import { SemanticFluencyStorm } from './glr/semantic-fluency-storm';
import { FocusSwitchReactor } from './ef/focus-switch-reactor';

export const gameComponents: Record<CHCDomain, React.ComponentType> = {
  Gf: PatternMatrix,
  Gwm: DynamicSequenceTransformer,
  Gs: RapidCodeMatch,
  Gv: MentalRotationLab,
  Ga: ToneGridChallenge,
  Gc: VerbalInferenceBuilder,
  Glr: SemanticFluencyStorm,
  EF: FocusSwitchReactor,
};
