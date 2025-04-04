const storageKey = 'rk-WalletConnect-connected';

function isLocalStorageAvailable() {
  return typeof localStorage !== 'undefined';
}

export function setWalletConnectConnected() {
  if (!isLocalStorageAvailable()) return;
  localStorage.setItem(storageKey, 'true');
}

export function isWalletConnectConnected(): boolean {
  if (!isLocalStorageAvailable()) return false;
  return localStorage.getItem(storageKey) === 'true';
}

export function clearWalletConnectConnected() {
  localStorage.removeItem(storageKey);
}
