
'use client';

import { PatternMatrix } from '@/components/training/gf/pattern-matrix';
import { TrainingFocusProvider } from '@/hooks/use-training-focus';
import { TrainingOverrideProvider } from '@/hooks/use-training-override';
import { PerformanceStoreProvider } from '@/hooks/use-performance-store';

// This is a special page designed to be embedded via an iframe.
// It only renders the single game component.
export default function EmbeddableGfPage() {
  return (
    // The game component requires these providers to function correctly.
    <div className="flex items-center justify-center min-h-screen bg-background">
        <PatternMatrix />
    </div>
  );
}
