
'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { useMotivationStore } from '@/hooks/use-motivation-store';
import { cn } from '@/lib/utils';
import { useHydratedJournalStore } from '@/hooks/use-journal';
import { usePomodoroStore } from '@/hooks/use-pomodoro-store';
import { usePathname } from 'next/navigation';

export function MotivationalMessage() {
  const { message, isVisible, hideMessage, selectMessage } = useMotivationStore();
  const { entries, completedHabits, hasHydrated: journalHydrated } = useHydratedJournalStore();
  const { cycles } = usePomodoroStore();
  const pathname = usePathname();
  
  // Use a ref to track the last pathname to prevent redundant calculations on shallow re-renders
  const lastPathname = useRef(pathname);

  // Trigger message selection on page navigation with stabilized logic
  useEffect(() => {
    if (journalHydrated) {
      // Only process if the path actually changed or on initial hydration
      selectMessage({ journalEntries: entries, completedHabits, pomodoroCycles: cycles });
      lastPathname.current = pathname;
    }
  }, [pathname, journalHydrated, selectMessage]); // Reduced dependencies to prevent infinite render loops

  // Auto-dismiss timer
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideMessage();
      }, 8000); // 8-second visibility

      return () => clearTimeout(timer);
    }
  }, [isVisible, hideMessage]);

  return (
    <AnimatePresence>
      {isVisible && message && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="relative text-center overflow-hidden"
        >
          <div className="bg-primary/10 text-primary-foreground p-3">
            <p className="text-sm font-medium text-foreground">{message}</p>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7 text-foreground/70 hover:text-foreground"
              onClick={hideMessage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
