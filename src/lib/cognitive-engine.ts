/**
 * @fileOverview Local logic-based "Cognitive Engine". 
 * Houses deterministic versions of features that were previously AI flows.
 */

import { chcDomains, type CHCDomain } from '@/types';
import { getDifficultyReasoning, getWeakAreaTemplate, getRecommendationTemplate } from '@/lib/prompt-templates';

// --- Adaptive Difficulty ---
export function calculateAdaptiveDifficulty(chcDomain: CHCDomain, userSkillLevel: number) {
  let adjustedDifficulty: 'Easy' | 'Medium' | 'Hard';

  if (userSkillLevel < 30) {
    adjustedDifficulty = 'Easy';
  } else if (userSkillLevel <= 70) {
    adjustedDifficulty = 'Medium';
  } else {
    adjustedDifficulty = 'Hard';
  }

  return {
    adjustedDifficulty,
    reasoning: getDifficultyReasoning(adjustedDifficulty, userSkillLevel),
  };
}

// --- Weak Area Recommendations ---
export function getWeakAreaRecommendation(performanceData: { domain: CHCDomain; score: number; sessions: number }[]) {
  const totalSessions = performanceData.reduce((sum, d) => sum + d.sessions, 0);

  if (totalSessions < 5) {
    return {
      recommendations: [],
      message: getWeakAreaTemplate('insufficientData').reason,
    };
  }

  const weakestDomainData = [...performanceData].sort((a, b) => a.score - b.score)[0];
  const domainInfo = chcDomains.find(d => d.key === weakestDomainData.domain);
  
  return {
    recommendations: [{
      domain: weakestDomainData.domain,
      exercise: domainInfo?.gameTitle || 'Training',
      reason: getWeakAreaTemplate('focusArea', weakestDomainData.domain).reason,
    }],
  };
}

// --- Training Recommendations ---
export function getSmartTrainingRecommendation(input: {
  performanceData: { domain: CHCDomain; score: number; trend: number }[];
  sessionStreak: number;
  hoursSinceLastSession: number;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  recentFailures: number;
}) {
  const { performanceData, timeOfDay, hoursSinceLastSession, sessionStreak, recentFailures } = input;

  if (timeOfDay === 'morning') {
    return {
      recommendationType: 'performanceInsight',
      ...getRecommendationTemplate('performanceInsight', 'EF', { timeOfDay }),
      domain: 'EF' as CHCDomain,
    };
  }

  const needsConfidenceBoost = hoursSinceLastSession > 24 || (sessionStreak === 0 && hoursSinceLastSession > 0) || recentFailures > 2;
  
  if (needsConfidenceBoost && performanceData.length > 0) {
    const strongest = [...performanceData].sort((a, b) => b.score - a.score)[0];
    return {
      recommendationType: 'momentumStarter',
      ...getRecommendationTemplate('momentumStarter', strongest.domain, { domain: strongest.domain }),
      domain: strongest.domain,
    };
  }

  const weakest = [...performanceData].sort((a, b) => a.score - b.score)[0];
  const domain = weakest?.domain || 'Gf';
  return {
    recommendationType: 'weakArea',
    ...getRecommendationTemplate('weakArea', domain, { domain }),
    domain,
  };
}

// --- Daily Circuit ---
export function getLocalDailyCircuit() {
  const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const sortedKeys = [...chcDomains].sort((a, b) => a.key.localeCompare(b.key)).map(d => d.key);
  const selected = [sortedKeys[dayOfYear % 8], sortedKeys[(dayOfYear + 2) % 8], sortedKeys[(dayOfYear + 4) % 8]];

  const circuitTitles = ["Focus Catalyst", "Mental Architect", "Cognitive Agility", "Neural Pathway", "Synaptic Sprint"];
  const segmentTitles: Record<CHCDomain, string[]> = {
    Gf: ["Logic Flow", "Pattern Pro"], Gc: ["Verbal Velocity", "Lexicon"],
    Gwm: ["Memory Matrix", "Span"], Gs: ["Synaptic Relay", "Code Match"],
    Gv: ["Spatial Map", "Rotation"], Ga: ["Auditory Filter", "Signal"],
    Glr: ["Idea Garden", "Recall"], EF: ["Attention Filter", "Switch"]
  };

  return {
    circuitTitle: `The ${circuitTitles[dayOfYear % circuitTitles.length]} Sequence`,
    segments: selected.map(key => {
      const info = chcDomains.find(d => d.key === key)!;
      return {
        domain: key,
        title: segmentTitles[key][dayOfYear % 2],
        gameTitle: info.gameTitle,
        transferAnchor: `Helps with ${info.description.toLowerCase()}`,
      };
    }),
  };
}

// --- Scripted Quiz Fallback ---
export function generateScriptedQuiz(notes: string) {
  const sentences = notes.split(/[.!?]/).filter(s => s.trim().length > 20);
  const questions = sentences.slice(0, 3).map(sentence => {
    const words = sentence.trim().split(' ');
    const targetIndex = Math.floor(words.length / 2);
    const answer = words[targetIndex].replace(/[^a-zA-Z]/g, '');
    words[targetIndex] = "____";
    
    return {
      question: words.join(' ') + "?",
      answer: answer,
      options: [answer, "Context", "Insight", "Logic"].sort(() => Math.random() - 0.5),
    };
  });

  return {
    title: "Scripted Concept Check",
    questions,
  };
}
