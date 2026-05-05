const storageKey = 'rk-latest-id';

export function getLatestWalletId(): string {
  return typeof window !== 'undefined'
    ? window.localStorage.getItem(storageKey) || ''
    : '';
}

export function addLatestWalletId(walletId: string): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(storageKey, walletId);
  }
}

export function clearLatestWalletId(): void {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(storageKey);
  }
}
