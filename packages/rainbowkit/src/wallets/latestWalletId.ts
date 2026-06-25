import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from './safeLocalStorage';

const storageKey = 'rk-latest-id';

export function getLatestWalletId(): string {
  return getStorageItem(storageKey) || '';
}

export function addLatestWalletId(walletId: string): void {
  setStorageItem(storageKey, walletId);
}

export function clearLatestWalletId(): void {
  removeStorageItem(storageKey);
}
