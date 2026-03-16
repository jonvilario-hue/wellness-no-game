/**
 * @fileOverview Master Coding Drill Registry.
 * Python, JavaScript, TypeScript, and Bash drills have been cleared for a destructive rebuild.
 * Other languages remain in active rotation.
 */

import { javascriptDrills } from './drills-javascript';
import { typescriptDrills } from './drills-typescript';
import { sqlDrills } from './drills-sql';
import { rustDrills } from './drills-rust';
import { bashDrills } from './drills-bash';
import { swiftDrills } from './drills-swift';
import { goDrills } from './drills-go';
import { pythonDrills } from './drills-python';

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
