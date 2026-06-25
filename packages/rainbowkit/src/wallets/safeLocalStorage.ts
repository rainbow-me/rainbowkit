function getSafeLocalStorage(): Storage | undefined {
  if (typeof window === 'undefined') return;

  try {
    return window.localStorage;
  } catch {
    return;
  }
}

export function getStorageItem(key: string): string | null {
  try {
    return getSafeLocalStorage()?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

export function setStorageItem(key: string, value: string): void {
  try {
    getSafeLocalStorage()?.setItem(key, value);
  } catch {}
}

export function removeStorageItem(key: string): void {
  try {
    getSafeLocalStorage()?.removeItem(key);
  } catch {}
}
