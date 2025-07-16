
'use client';

import { useTrainingFocus } from '@/hooks/use-training-focus';
import { useTrainingOverride } from '@/hooks/use-training-override';
import { MentalRotationLab } from './mental-rotation-lab';
import { BalancePuzzle } from './balance-puzzle';
import { Skeleton } from '@/components/ui/skeleton';

export function VisualProcessingRouter() {
  const { focus: globalFocus, isLoaded: isGlobalFocusLoaded } = useTrainingFocus();
  const { override, isLoaded: isOverrideLoaded } = useTrainingOverride();

  const isLoaded = isGlobalFocusLoaded && isOverrideLoaded;
  
  if (!isLoaded) {
    return <Skeleton className="w-full max-w-xl h-96" />;
  }

  // Determine the effective training focus: override > global
  const effectiveFocus = override || globalFocus;
  
  if (effectiveFocus === 'math') {
    return <BalancePuzzle />;
  }
  
  // Default to Core Mode for both 'neutral' and 'music'
  return <MentalRotationLab />;
}
