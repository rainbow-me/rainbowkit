export function groupBy<Item>(
  items: Item[],
  getKey: (item: Item) => string
): Record<string, Item[]> {
  const groupedItems: Record<string, Item[]> = {};

  items.forEach(item => {
    const key = getKey(item);

    if (!key) {
      return;
    }

    if (!groupedItems[key]) {
      groupedItems[key] = [];
    }

    groupedItems[key].push(item);
  });

  return groupedItems;
}
