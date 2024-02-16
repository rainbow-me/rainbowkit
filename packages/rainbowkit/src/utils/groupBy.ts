export function groupBy<Item>(
  items: Item[],
  getKey: (item: Item) => string,
): Record<string, Item[]> {
  const groupedItems: Record<string, Item[]> = {};

  for (const item of items) {
    const key = getKey(item);

    if (!key) {
      continue;
    }

    if (!groupedItems[key]) {
      groupedItems[key] = [];
    }

    groupedItems[key].push(item);
  }

  return groupedItems;
}
