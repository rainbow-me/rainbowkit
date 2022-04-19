export function formatENS(name: string): string {
  const beforePeriod = name.split('.')[0];
  return name.length <= 24 ? name : `${name.substring(0, 16)}...`;
}
