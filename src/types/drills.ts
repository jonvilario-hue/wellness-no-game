export type Language = 'go' | 'python' | 'javascript' | 'typescript' | 'rust' | 'swift' | 'sql' | 'bash';
export type Lane = 'Write' | 'Read' | 'Build';
export type DrillType = 'Syntax Sprints' | 'Code Reconstruction' | 'Output Prediction' | 'Bug Hunt' | 'Timed Implementation';

export type SlotKind = 'literal' | 'identifier' | 'expression' | 'operator' | 'keyword' | 'typeAnnotation' | 'queryFragment' | 'shellToken';

export interface SlotDefinition {
  id: string;
  kind: SlotKind;
  values: unknown[];
  constraints?: {
    excludeValuePairs?: Array<{ otherSlotId: string; invalidPairs: Array<[unknown, unknown]> }>;
  };
}

export interface MultipleChoiceAnswer {
  mode: 'multipleChoice';
  correct: string;
  options: string[];
}

export interface ExactAnswer {
  mode: 'exact';
  correct: string;
  accepted?: string[];
}

export interface TokenProbeAnswer {
  mode: 'tokenProbe';
  requiredTokens: string[];
  forbiddenTokens?: string[];
}

export interface StructuralAnswer {
  mode: 'structural';
  requiredTokens: string[];
  forbiddenTokens?: string[];
  requiredSequences?: string[][];
}

export type GeneratedAnswer = MultipleChoiceAnswer | ExactAnswer | TokenProbeAnswer | StructuralAnswer;

export interface FamilyRenderContext {
  language: Language;
  lane: Lane;
  type: DrillType;
  values: Record<string, unknown>;
  render: (value: unknown, hint?: SlotKind) => string;
}

export interface ValidationResult {
  ok: boolean;
  reasons: string[];
}

export interface DrillTemplateFamily {
  id: string;
  language: Language;
  lane: Lane;
  type: DrillType;
  concept: string;
  conceptTags: string[];
  difficulty: 1 | 2 | 3;
  slots: SlotDefinition[];
  generatePrompt: (ctx: FamilyRenderContext) => string;
  generateCode: (ctx: FamilyRenderContext) => string;
  generateAnswer: (ctx: FamilyRenderContext) => GeneratedAnswer;
  validate: (ctx: FamilyRenderContext) => ValidationResult;
  buildDistractors?: (ctx: FamilyRenderContext, correct: string) => string[];
}

export interface GeneratedDrill {
  id: string;
  templateId: string;
  language: Language;
  lane: Lane;
  type: DrillType;
  concept: string;
  conceptTags: string[];
  difficulty: 1 | 2 | 3;
  prompt: string;
  code: string;
  answer: GeneratedAnswer;
  metadata: {
    slotValues: Record<string, unknown>;
    hash: string;
    familyId: string;
  };
}

export interface DrillHistoryEntry {
  hash: string;
  templateId: string;
  concept: string;
  timestamp: number;
  language: Language;
  lane: Lane;
  type: DrillType;
}
