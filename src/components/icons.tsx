import type { LucideIcon } from 'lucide-react';
import { Archive, BookOpenText, BrainCircuit, Ear, Goal, MemoryStick, View, Zap } from 'lucide-react';
import type { CHCDomain } from '@/types';

export const domainIcons: Record<CHCDomain, LucideIcon> = {
  Gf: BrainCircuit,
  Gc: BookOpenText,
  Gwm: MemoryStick,
  Gs: Zap,
  Gv: View,
  Ga: Ear,
  Glr: Archive,
  EF: Goal,
};
