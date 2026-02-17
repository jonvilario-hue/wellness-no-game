
import type { Recommendation, RecommendationType } from '@/types/recommendations';
import type { Blueprint } from '@/types/blueprint';
import type { MovementLog, StillnessLog } from '@/hooks/use-wellness-data';
import { format, subDays, isBefore, startOfDay, parseISO, differenceInHours } from 'date-fns';

interface EngineInput {
  blueprints: Blueprint[];
  movementLogs: MovementLog[];
  stillnessLogs: StillnessLog[];
  habits: Record<string, string[]>; // date: habitIds[]
  preferences: { enabledCategories: RecommendationType[] };
}

export function generateSmartRecommendations(input: EngineInput): Recommendation[] {
  const recs: Recommendation[] = [];
  const { blueprints, movementLogs, stillnessLogs, habits, preferences } = input;
  const today = format(new Date(), 'yyyy-MM-dd');
  const now = new Date();

  // --- 1. STREAK SAVERS (Priority: High) ---
  if (preferences.enabledCategories.includes('streak_saver')) {
    // Check if any habit completed yesterday hasn't been done today
    const yesterday = format(subDays(now, 1), 'yyyy-MM-dd');
    const yesterdayHabits = habits[yesterday] || [];
    const todayHabits = habits[today] || [];
    
    const missing = yesterdayHabits.filter(id => !todayHabits.includes(id));
    if (missing.length > 0 && now.getHours() >= 18) { // Only nudge in evening
      recs.push({
        id: `streak_saver_${today}`,
        type: 'streak_saver',
        title: 'Protect Your Streak!',
        description: `You're one step away from maintaining your ${yesterdayHabits.length} habits. A quick 5-minute session keeps the chain alive.`,
        actionLabel: 'OPEN HABITS',
        actionLink: '/habits',
        priority: 85
      });
    }
  }

  // --- 2. RECOVERY (Priority: Medium-High) ---
  if (preferences.enabledCategories.includes('recovery')) {
    const last3Days = [0, 1, 2].map(d => format(subDays(now, d), 'yyyy-MM-dd'));
    const movementCount = movementLogs.filter(l => last3Days.includes(l.timestamp.split('T')[0])).length;
    const stillnessCount = stillnessLogs.filter(l => last3Days.includes(l.timestamp.split('T')[0])).length;

    if (movementCount >= 3 && stillnessCount === 0) {
      recs.push({
        id: `recovery_needed_${today}`,
        type: 'recovery',
        title: 'Time for Stillness',
        description: "You've been physically active recently! Balance your nervous system with a brief 'Box Breathing' session to improve mental recovery.",
        actionLabel: 'TRY BREATHWORK',
        actionLink: '/exercises?tab=stillness#practice-breath_box',
        priority: 75
      });
    }
  }

  // --- 3. MILESTONE NUDGES (Priority: Medium) ---
  if (preferences.enabledCategories.includes('milestone_nudge')) {
    const stalledBlueprint = blueprints.find(bp => {
      const lastActivity = bp.streaks.lastActivityDate;
      if (!lastActivity) return true;
      return isBefore(parseISO(lastActivity), subDays(now, 7)) && bp.status === 'active';
    });

    if (stalledBlueprint) {
      recs.push({
        id: `nudge_${stalledBlueprint.id}`,
        type: 'milestone_nudge',
        title: 'Resume Architecture',
        description: `It's been a week since you worked on "${stalledBlueprint.title}". What's the smallest next step you can take today?`,
        actionLabel: 'OPEN BLUEPRINT',
        actionLink: `/architecture`,
        priority: 65,
        metadata: { blueprintId: stalledBlueprint.id }
      });
    }
  }

  // --- 4. CELEBRATIONS (Priority: High but transient) ---
  if (preferences.enabledCategories.includes('celebration')) {
    const recentlyCompleted = blueprints.filter(bp => 
      bp.status === 'completed' && 
      isBefore(subDays(now, 2), parseISO(bp.activatedAt)) // Simplification for MVP
    );

    if (recentlyCompleted.length > 0) {
      const bp = recentlyCompleted[0];
      recs.push({
        id: `celebrate_${bp.id}`,
        type: 'celebration',
        title: 'Achievement Unlocked! 🎉',
        description: `You finished the "${bp.title}" blueprint. Take a moment to journal about what you learned before starting your next quest.`,
        actionLabel: 'LOG REFLECTION',
        actionLink: '/journal',
        priority: 90
      });
    }
  }

  return recs.sort((a, b) => b.priority - a.priority);
}
