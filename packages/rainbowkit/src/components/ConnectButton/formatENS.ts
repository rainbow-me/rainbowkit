export function formatENS(name: string): string {
  return name.length <= 16 ? name : `${name.substring(0, 16)}...`;
}
