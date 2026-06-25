import { getStorageItem, setStorageItem } from './safeLocalStorage';

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
  return safeParseJsonArray(getStorageItem(storageKey));
}

function dedupe<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export function addRecentWalletId(walletId: string): void {
  const newValue = dedupe([walletId, ...getRecentWalletIds()]);

  setStorageItem(storageKey, JSON.stringify(newValue));
}
