
export type PlaybookStatus = 'Not tried' | 'Currently using' | 'Used before';

export type PlaybookEntry = {
  strategyId: string;
  strategyName: string;
  isFavorite: boolean;
  status: PlaybookStatus;
  personalNotes: string;
  timesUsed: number;
  lastUsedAt?: string;
  linkedBlueprintIds: string[];
};

export type ExecutionGuideResponse = {
  strategyId: string;
  responses: Record<string, string>;
  completedAt: string;
  linkedBlueprintId?: string;
};

export type CustomStrategy = {
  id: string;
  name: string;
  description: string;
  steps: string[];
  useFor: string;
  isCustom: boolean;
  createdAt: string;
};
