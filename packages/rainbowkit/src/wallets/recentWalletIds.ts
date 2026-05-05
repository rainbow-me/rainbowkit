const storageKey = 'rk-recent';

function safeParseJsonArray<T>(string: string | null): T[] {
  try {
    const value = string ? JSON.parse(string) : [];
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function getRecentWalletIds(): string[] {
  return typeof window !== 'undefined'
    ? safeParseJsonArray(window.localStorage.getItem(storageKey))
    : [];
}

function dedupe<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export function addRecentWalletId(walletId: string): void {
  const newValue = dedupe([walletId, ...getRecentWalletIds()]);

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(storageKey, JSON.stringify(newValue));
  }
}
