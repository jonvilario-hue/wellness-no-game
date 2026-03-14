
'use client';

import { openDB, type IDBPDatabase, type DBSchema } from 'idb';
import type { GameSessionRecord, SkillRating } from '@/types/user';
import type { MusicDrillLog } from '@/types/music';

interface EarTrainingDB extends DBSchema {
  sessions: {
    key: number;
    value: GameSessionRecord;
  };
  skills: {
    key: string;
    value: SkillRating;
  };
  calibration: {
    key: string;
    value: {
      offsetMs: number;
      calibratedAt: string;
    };
  };
  'math-sessions': {
    key: string;
    value: any;
  };
  'music-drill-logs': {
    key: string;
    value: MusicDrillLog;
  };
}

const DB_NAME = 'ear-training-db';
const DB_VERSION = 2; // Incremented version to trigger upgrade

export async function initDB() {
  return openDB<EarTrainingDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('sessions')) {
        db.createObjectStore('sessions', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('skills')) {
        db.createObjectStore('skills', { keyPath: 'skillName' });
      }
      if (!db.objectStoreNames.contains('calibration')) {
        db.createObjectStore('calibration', { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains('math-sessions')) {
        db.createObjectStore('math-sessions', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('music-drill-logs')) {
        db.createObjectStore('music-drill-logs', { keyPath: 'id' });
      }
    },
  });
}
