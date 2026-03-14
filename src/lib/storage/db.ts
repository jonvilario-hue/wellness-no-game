
'use client';

import { openDB, type IDBPDatabase, type DBSchema } from 'idb';
import type { GameSessionRecord, SkillRating } from '@/types/user';

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
}

const DB_NAME = 'ear-training-db';
const DB_VERSION = 1;

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
    },
  });
}

export async function saveSession(session: Omit<GameSessionRecord, 'id'>) {
  const db = await initDB();
  return db.add('sessions', session as any);
}

export async function getSkillRating(skillName: string): Promise<SkillRating | undefined> {
  const db = await initDB();
  return db.get('skills', skillName);
}

export async function updateSkillRating(skill: SkillRating) {
  const db = await initDB();
  return db.put('skills', skill);
}
