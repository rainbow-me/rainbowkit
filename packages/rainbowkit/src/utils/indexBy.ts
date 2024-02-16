export function indexBy<Item>(
  items: Item[],
  getKey: (item: Item) => string,
): Record<string, Item> {
  const indexedItems: Record<string, Item> = {};

  for (const item of items) {
    const key = getKey(item);

    if (!key) {
      continue;
    }

    indexedItems[key] = item;
  }

  return indexedItems;
}
