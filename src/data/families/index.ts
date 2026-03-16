import { DrillTemplateFamily } from '@/types/drills';
import { jsClosureFamily } from './javascript/closure';
import { jsCoercionFamily } from './javascript/coercion';
import { jsArrowFamily } from './javascript/arrow';
import { jsArrayFamily } from './javascript/arrays';
import { jsBugHuntFamily } from './javascript/bughunt';

// Python
import { pyComprehensionFamily } from './python/comprehension';
import { pyDefaultsFamily } from './python/defaults';
import { pyBugHuntFamily } from './python/bughunt';
import { pyDictFamily } from './python/dictionary';
import { pyContextFamily } from './python/context';

// Go
import { goMapFamily } from './go/map';
import { goChannelFamily } from './go/channel';
import { goBugHuntFamily } from './go/bughunt';
import { goPointerFamily } from './go/pointer';
import { goInterfaceFamily } from './go/interface';

// Rust
import { rsOwnershipFamily } from './rust/ownership';
import { rsPatternFamily } from './rust/pattern';
import { rsBugHuntFamily } from './rust/bughunt';
import { rsTraitFamily } from './rust/trait';
import { rsIteratorFamily } from './rust/iterator';

export const allFamilies: DrillTemplateFamily[] = [
  // JS
  jsClosureFamily,
  jsCoercionFamily,
  jsArrowFamily,
  jsArrayFamily,
  jsBugHuntFamily,
  
  // Python
  pyComprehensionFamily,
  pyDefaultsFamily,
  pyBugHuntFamily,
  pyDictFamily,
  pyContextFamily,

  // Go
  goMapFamily,
  goChannelFamily,
  goBugHuntFamily,
  goPointerFamily,
  goInterfaceFamily,

  // Rust
  rsOwnershipFamily,
  rsPatternFamily,
  rsBugHuntFamily,
  rsTraitFamily,
  rsIteratorFamily
];
