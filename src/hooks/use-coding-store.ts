
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { 
  CodingDrillLog, 
  CodingLanguage, 
  LanguageProgress, 
  CodingDrillType, 
  CodingLane, 
  LaneProgress,
  ActiveLoop,
  CodingTrack
} from '@/types/coding';
import { format, subDays, isToday, parseISO, startOfWeek, isAfter } from 'date-fns';

interface CodingState {
  logs: CodingDrillLog[];
  languageProgress: Record<string, LanguageProgress>; // key: language
  laneProgress: Record<CodingLane, LaneProgress>;
  activeLanguage: CodingLanguage;
  activeTrack: CodingTrack;
  activeLoop: ActiveLoop;
  streak: {
    current: number;
    longest: number;
    lastDate: string | null;
  };
  
  setActiveLanguage: (lang: CodingLanguage) => void;
  setActiveTrack: (track: CodingTrack) => void;
  startLoop: (steps: any[]) => void;
  advanceLoop: (accuracy: number, speed: number) => void;
  cancelLoop: () => void;
  addLog: (log: Omit<CodingDrillLog, 'id' | 'timestamp' | 'date'>) => void;
  
  getFluencyScore: () => number;
  getWeeklyVolume: () => number;
  getLanguageDistribution: () => Record<string, number>;
  getTopLane: () => CodingLane | 'None';
  _hasHydrated: boolean;
}

const DEFAULT_LANG_PROGRESS = (lang: CodingLanguage): LanguageProgress => ({
  language: lang,
  level: 1,
  consecutiveSuccesses: 0,
  consecutiveFailures: 0,
  avgAccuracy: 0,
  avgSpeed: 0
});

const DEFAULT_LANE_PROGRESS = (lane: CodingLane): LaneProgress => ({
  lane,
  level: 1,
  avgAccuracy: 0,
  avgSpeed: 0,
  totalSessions: 0
});

const EMPTY_LOOP: ActiveLoop = {
  active: false,
  currentStep: 0,
  steps: [],
  startTime: 0,
  results: []
};

export const useCodingStore = create<CodingState>()(
  persist(
    (set, get) => ({
      logs: [],
      languageProgress: {},
      laneProgress: {
        'Write': DEFAULT_LANE_PROGRESS('Write'),
        'Read': DEFAULT_LANE_PROGRESS('Read'),
        'Build': DEFAULT_LANE_PROGRESS('Build')
      },
      activeLanguage: 'TypeScript',
      activeTrack: 'Foundation',
      activeLoop: EMPTY_LOOP,
      streak: { current: 0, longest: 0, lastDate: null },
      _hasHydrated: false,

      setActiveLanguage: (activeLanguage) => set({ activeLanguage }),
      
      setActiveTrack: (activeTrack) => {
        // When switching tracks, pick the first available language in that track
        const languages: Record<CodingTrack, CodingLanguage[]> = {
          'Foundation': ['Python', 'TypeScript', 'SQL'],
          'Specialist': ['Rust', 'Bash', 'Swift', 'Go']
        };
        const defaultLang = languages[activeTrack][0];
        set({ activeTrack, activeLanguage: defaultLang });
      },

      startLoop: (steps) => set({
        activeLoop: {
          active: true,
          currentStep: 0,
          steps,
          startTime: Date.now(),
          results: []
        }
      }),

      advanceLoop: (accuracy, speed) => set(state => {
        const loop = state.activeLoop;
        if (!loop.active) return state;
        
        const currentStep = loop.steps[loop.currentStep];
        const newResults = [...loop.results, { 
          lane: currentStep.lane, 
          type: currentStep.type, 
          accuracy, 
          speed 
        }];

        return {
          activeLoop: {
            ...loop,
            currentStep: loop.currentStep + 1,
            results: newResults
          }
        };
      }),

      cancelLoop: () => set({ activeLoop: EMPTY_LOOP }),

      addLog: (logData) => {
        const now = new Date();
        const dateStr = format(now, 'yyyy-MM-dd');
        const timestamp = now.toISOString();
        
        const newLog: CodingDrillLog = {
          ...logData,
          id: crypto.randomUUID(),
          timestamp,
          date: dateStr
        };

        set(state => {
          // 1. Update Logs
          const newLogs = [newLog, ...state.logs].slice(0, 500);

          // 2. Update Streak
          let newStreak = state.streak.current;
          const lastDate = state.streak.lastDate;
          if (!lastDate || !isToday(parseISO(lastDate))) {
            if (lastDate && isToday(subDays(now, 1))) {
              newStreak += 1;
            } else {
              newStreak = 1;
            }
          }

          // 3. Adaptive Difficulty Engine
          const lang = logData.language;
          const langProg = state.languageProgress[lang] || DEFAULT_LANG_PROGRESS(lang);
          const laneProg = state.laneProgress[logData.lane] || DEFAULT_LANE_PROGRESS(logData.lane);

          // Language logic
          let lLevel = langProg.level;
          let lSuccess = langProg.consecutiveSuccesses;
          if (logData.accuracy >= 85) {
            lSuccess++;
            if (lSuccess >= 3 && lLevel < 4) { lLevel++; lSuccess = 0; }
          } else if (logData.accuracy < 60) {
            lLevel = Math.max(1, lLevel - 1);
            lSuccess = 0;
          }

          // Lane logic
          const newLaneProg = {
            ...laneProg,
            totalSessions: laneProg.totalSessions + 1,
            lastPracticed: timestamp,
            avgAccuracy: (laneProg.avgAccuracy * 4 + logData.accuracy) / 5,
            level: logData.accuracy >= 90 ? Math.min(4, laneProg.level + 1) : laneProg.level
          };

          return {
            logs: newLogs,
            streak: {
              current: newStreak,
              longest: Math.max(newStreak, state.streak.longest),
              lastDate: timestamp
            },
            languageProgress: {
              ...state.languageProgress,
              [lang]: { ...langProg, level: lLevel, consecutiveSuccesses: lSuccess }
            },
            laneProgress: {
              ...state.laneProgress,
              [logData.lane]: newLaneProg
            }
          };
        });
      },

      getFluencyScore: () => {
        const recentLogs = get().logs.slice(0, 20);
        if (recentLogs.length === 0) return 0;
        const avgAcc = recentLogs.reduce((s, l) => s + l.accuracy, 0) / recentLogs.length;
        return Math.round(avgAcc);
      },

      getWeeklyVolume: () => {
        const start = startOfWeek(new Date());
        return get().logs
          .filter(l => isAfter(parseISO(l.timestamp), start))
          .reduce((sum, l) => sum + Math.ceil(l.durationSeconds / 60), 0);
      },

      getLanguageDistribution: () => {
        const start = startOfWeek(new Date());
        const weekLogs = get().logs.filter(l => isAfter(parseISO(l.timestamp), start));
        const dist: Record<string, number> = {};
        weekLogs.forEach(l => {
          dist[l.language] = (dist[l.language] || 0) + 1;
        });
        return dist;
      },

      getTopLane: () => {
        const counts: Record<string, number> = { 'Write': 0, 'Read': 0, 'Build': 0 };
        get().logs.slice(0, 50).forEach(l => {
          counts[l.lane]++;
        });
        const sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]);
        return sorted[0][1] > 0 ? (sorted[0][0] as CodingLane) : 'None';
      }
    }),
    {
      name: 'coding-fluency-storage-v4',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state._hasHydrated = true;
      }
    }
  )
);
