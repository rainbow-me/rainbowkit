export function omitUndefinedValues<T>(obj: T): T {
  return Object.fromEntries(
    //@ts-ignore
    Object.entries(obj).filter(([_key, value]) => value !== undefined)
  ) as T;
}
