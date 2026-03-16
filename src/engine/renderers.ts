import { Language, SlotKind } from '@/types/drills';

export function renderValueForLanguage(language: Language, value: unknown, hint?: SlotKind): string {
  if (hint === 'identifier' || hint === 'operator' || hint === 'keyword') {
    return String(value);
  }

  if (value === null || value === undefined) {
    switch (language) {
      case 'python': return 'None';
      case 'go':
      case 'swift': return 'nil';
      case 'sql': return 'NULL';
      case 'bash': return '""';
      case 'rust': return 'None';
      default: return 'null';
    }
  }

  if (typeof value === 'boolean') {
    switch (language) {
      case 'python': return value ? 'True' : 'False';
      case 'bash': return value ? '0' : '1';
      case 'sql': return value ? 'TRUE' : 'FALSE';
      default: return value ? 'true' : 'false';
    }
  }

  if (typeof value === 'string') {
    if (language === 'sql') {
      return `'${value.replace(/'/g, "''")}'`;
    }
    return `"${value.replace(/"/g, '\\"')}"`;
  }

  return String(value);
}
