const storageKey = 'rk-latest-id';

export function getLatestWalletId(): string {
  return typeof localStorage !== 'undefined'
    ? localStorage.getItem(storageKey) || ''
    : '';
}

export function addLatestWalletId(walletId: string): void {
  localStorage.setItem(storageKey, walletId);
}

export function clearLatestWalletId(): void {
  localStorage.removeItem(storageKey);
}
