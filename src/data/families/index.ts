import { DrillTemplateFamily } from '@/types/drills';
import { jsClosureFamily } from './javascript/closure';
import { jsCoercionFamily } from './javascript/coercion';
import { jsArrowFamily } from './javascript/arrow';
import { jsArrayFamily } from './javascript/arrays';
import { jsBugHuntFamily } from './javascript/bughunt';

export const allFamilies: DrillTemplateFamily[] = [
  jsClosureFamily,
  jsCoercionFamily,
  jsArrowFamily,
  jsArrayFamily,
  jsBugHuntFamily
];
