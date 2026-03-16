export function hashDrill(familyId: string, values: Record<string, unknown>): string {
  const sortedValues = Object.keys(values)
    .sort()
    .map(key => `${key}:${JSON.stringify(values[key])}`)
    .join('|');
  return `${familyId}#${sortedValues}`;
}
