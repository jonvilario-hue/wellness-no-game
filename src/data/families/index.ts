'use client';

import { DrillTemplateFamily } from '@/types/drills';

// JavaScript
import { jsClosureFamily } from './javascript/closure';
import { jsCoercionFamily } from './javascript/coercion';
import { jsArrowFamily } from './javascript/arrow';
import { jsArrayFamily } from './javascript/arrays';
import { jsBugHuntFamily } from './javascript/bughunt';
import { jsBuildFamily } from './javascript/build';

// Python
import { pyComprehensionFamily } from './python/comprehension';
import { pyDefaultsFamily } from './python/defaults';
import { pyBugHuntFamily, pyLogicBugFamily } from './python/bughunt';
import { pyDictFamily } from './python/dictionary';
import { pyContextFamily } from './python/context';
import { pyBuildFamily } from './python/build';

// Go
import { goMapFamily } from './go/map';
import { goChannelFamily } from './go/channel';
import { goBugHuntFamily } from './go/bughunt';
import { goPointerFamily } from './go/pointer';
import { goInterfaceFamily } from './go/interface';
import { goBuildStructFamily } from './go/build';

// Rust
import { rsOwnershipFamily } from './rust/ownership';
import { rsPatternFamily } from './rust/pattern';
import { rsBugHuntFamily } from './rust/bughunt';
import { rsTraitFamily } from './rust/trait';
import { rsIteratorFamily } from './rust/iterator';
import { rsBuildFamily } from './rust/build';

// TypeScript
import { tsNarrowingFamily } from './typescript/narrowing';
import { tsGenericFamily } from './typescript/generic';
import { tsMappedFamily } from './typescript/mapped';
import { tsBugHuntFamily } from './typescript/bughunt';
import { tsAssertionFamily } from './typescript/assertion';
import { tsBuildFamily } from './typescript/build';

// Swift
import { swiftOptionalFamily } from './swift/optional';
import { swiftSyntaxFamily } from './swift/syntax';
import { swiftBugHuntFamily } from './swift/bughunt';
import { swiftProtocolFamily } from './swift/protocol';
import { swiftEnumFamily } from './swift/enum';

// SQL
import { sqlJoinFamily } from './sql/joins';
import { sqlAggregateFamily } from './sql/aggregate';
import { sqlBugHuntFamily } from './sql/bughunt';
import { sqlRewriteFamily } from './sql/rewrite';
import { sqlWindowFamily } from './sql/window';
import { sqlBuildFamily } from './sql/build';

// Bash
import { bashQuotingFamily } from './bash/quoting';
import { bashExitFamily } from './bash/exitcode';
import { bashBugHuntFamily } from './bash/bughunt';
import { bashRedirectFamily } from './bash/redirection';
import { bashCondFamily } from './bash/conditional';
import { bashBuildFamily } from './bash/build';

export const allFamilies: DrillTemplateFamily[] = [
  // JS
  jsClosureFamily, jsCoercionFamily, jsArrowFamily, jsArrayFamily, jsBugHuntFamily, jsBuildFamily,
  
  // Python
  pyComprehensionFamily, pyDefaultsFamily, pyBugHuntFamily, pyLogicBugFamily, pyDictFamily, pyContextFamily, pyBuildFamily,

  // Go
  goMapFamily, goChannelFamily, goBugHuntFamily, goPointerFamily, goInterfaceFamily, goBuildStructFamily,

  // Rust
  rsOwnershipFamily, rsPatternFamily, rsBugHuntFamily, rsTraitFamily, rsIteratorFamily, rsBuildFamily,

  // TypeScript
  tsNarrowingFamily, tsGenericFamily, tsMappedFamily, tsBugHuntFamily, tsAssertionFamily, tsBuildFamily,

  // Swift
  swiftOptionalFamily, swiftSyntaxFamily, swiftBugHuntFamily, swiftProtocolFamily, swiftEnumFamily,

  // SQL
  sqlJoinFamily, sqlAggregateFamily, sqlBugHuntFamily, sqlRewriteFamily, sqlWindowFamily, sqlBuildFamily,

  // Bash
  bashQuotingFamily, bashExitFamily, bashBugHuntFamily, bashRedirectFamily, bashCondFamily, bashBuildFamily
];
