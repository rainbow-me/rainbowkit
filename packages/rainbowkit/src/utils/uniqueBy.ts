export function uniqueBy<key extends string, item extends Record<key, any>>(
  items: item[],
  key: key,
): item[] {
  const filtered: item[] = [];

  for (const item of items) {
    if (!filtered.some((x) => x[key] === item[key])) {
      filtered.push(item);
    }
  }

  return filtered;
}
