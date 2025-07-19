
'use client';

import type { Milestone } from '@/hooks/use-architecture-store';
import { MilestoneCard } from './milestone-card';
import { AnimatePresence, motion } from 'framer-motion';

interface MilestoneListProps {
  projectId: string;
  milestones: Milestone[];
}

export function MilestoneList({ projectId, milestones }: MilestoneListProps) {
  if (milestones.length === 0) {
    return (
        <div className="text-center py-6 text-muted-foreground text-sm">
            <p>No milestones yet. Add one to get started!</p>
        </div>
    )
  }
  
  return (
    <div className="space-y-3">
      <AnimatePresence>
        {milestones.map((milestone) => (
           <motion.div
            key={milestone.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <MilestoneCard projectId={projectId} milestone={milestone} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
