import { Address, isAddress } from 'viem';

interface EnsData {
  ensName: string;
  expires: number;
}

export function getStorageKey(address: Address) {
  return `rk-ens-${address}`;
}

function safeParseJsonData(string: string | null): EnsData | null {
  try {
    const value = string ? JSON.parse(string) : null;
    return typeof value === 'object' ? value : null;
  } catch {
    return null;
  }
}

export function addEnsName(address: Address, ensName: string) {
  if (!isAddress(address)) return;

  const now = new Date();

  const expiry = new Date(now.getTime() + 15 * 60_000); // Set expiry to 15 minutes from now

  localStorage.setItem(
    getStorageKey(address),
    JSON.stringify({
      ensName,
      expires: expiry.getTime(),
    }),
  );
}

export function getEnsName(address: Address): string | null {
  const data = safeParseJsonData(localStorage.getItem(getStorageKey(address)));

  if (!data) return null;

  const { ensName, expires } = data;

  if (typeof ensName !== 'string' || Number.isNaN(Number(expires))) {
    localStorage.removeItem(getStorageKey(address));
    return null;
  }

  const now = new Date();

  if (now.getTime() > Number(expires)) {
    localStorage.removeItem(getStorageKey(address));
    return null;
  }

  return ensName;
}
