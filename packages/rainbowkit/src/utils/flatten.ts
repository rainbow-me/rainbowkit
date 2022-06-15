export function flatten<Item>(array: Item[][]) {
  const flattenedItems: Item[] = [];

  for (const items of array) {
    flattenedItems.push(...items);
  }

  return flattenedItems;
}
