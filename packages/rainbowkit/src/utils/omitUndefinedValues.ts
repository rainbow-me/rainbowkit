export function omitUndefinedValues<T>(obj: T): T {
  return Object.fromEntries(
    // @ts-expect-error
    Object.entries(obj).filter(([_key, value]) => value !== undefined)
  ) as T;
}
