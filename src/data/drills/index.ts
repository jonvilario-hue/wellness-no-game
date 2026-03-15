/**
 * DRILL CONTENT BARREL FILE — DO NOT DELETE
 * Re-exports all language-specific drill files.
 * If any import fails, the corresponding language shows "content unavailable."
 * Do not remove any import/export line.
 */

import { pythonDrills } from './drills-python';
import { javascriptDrills } from './drills-javascript';
import { typescriptDrills } from './drills-typescript';
import { sqlDrills } from './drills-sql';
import { rustDrills } from './drills-rust';
import { bashDrills } from './drills-bash';
import { swiftDrills } from './drills-swift';
import { goDrills } from './drills-go';

import type { CodingDrill } from '@/types/coding';

export const codingDrills: CodingDrill[] = [
  ...pythonDrills,
  ...javascriptDrills,
  ...typescriptDrills,
  ...sqlDrills,
  ...rustDrills,
  ...bashDrills,
  ...swiftDrills,
  ...goDrills
];

export {
  pythonDrills,
  javascriptDrills,
  typescriptDrills,
  sqlDrills,
  rustDrills,
  bashDrills,
  swiftDrills,
  goDrills
};
