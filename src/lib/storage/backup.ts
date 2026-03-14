
'use client';

import { initDB } from './db';
import { getPreferences, savePreferences } from './preferences';

export async function exportAllData() {
  const db = await initDB();
  const sessions = await db.getAll('sessions');
  const skills = await db.getAll('skills');
  const calibration = await db.get('calibration', 'rhythm');
  
  const prefs = getPreferences();
  
  const exportData = {
    version: 1,
    timestamp: new Date().toISOString(),
    db: {
      sessions,
      skills,
      calibration
    },
    preferences: prefs
  };
  
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ear-training-backup-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export async function importAllData(json: any) {
  if (!json || json.version !== 1) throw new Error("Invalid backup format");
  
  const db = await initDB();
  
  // Clear existing
  await db.clear('sessions');
  await db.clear('skills');
  await db.clear('calibration');
  
  // Import via transaction
  const tx = db.transaction(['sessions', 'skills', 'calibration'], 'readwrite');
  
  if (json.db.sessions) {
    for (const session of json.db.sessions) {
      await tx.objectStore('sessions').put(session);
    }
  }
  if (json.db.skills) {
    for (const skill of json.db.skills) {
      await tx.objectStore('skills').put(skill);
    }
  }
  if (json.db.calibration) {
    await tx.objectStore('calibration').put(json.db.calibration);
  }
  
  await tx.done;
  
  if (json.preferences) {
    savePreferences(json.preferences);
  }
  
  window.location.reload();
}
