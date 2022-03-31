export function indexBy<Item>(
  items: Item[],
  getKey: (item: Item) => string
): Record<string, Item> {
  const indexedItems: Record<string, Item> = {};

  items.forEach(item => {
    const key = getKey(item);

    if (!key) {
      return;
    }

    indexedItems[key] = item;
  });

  return indexedItems;
}
