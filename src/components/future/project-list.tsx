
'use client';

import type { Project } from '@/hooks/use-future-store';
import { ProjectCard } from './project-card';
import { AnimatePresence, motion } from 'framer-motion';

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">No projects here.</p>
        <p className="text-sm text-muted-foreground">Create a new project to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {projects.map((project) => (
           <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
