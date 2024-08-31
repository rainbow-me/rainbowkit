import { type Address, isAddress } from 'viem';

interface EnsData {
  ensName: string;
  expires: number;
}

export function getStorageEnsNameKey(address: Address) {
  return `rk-ens-name-${address}`;
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

  const expiry = new Date(now.getTime() + 180 * 60_000); // Set expiry to 3 hours from now

  localStorage.setItem(
    getStorageEnsNameKey(address),
    JSON.stringify({
      ensName,
      expires: expiry.getTime(),
    }),
  );
}

export function getEnsName(address: Address): string | null {
  const data = safeParseJsonData(
    localStorage.getItem(getStorageEnsNameKey(address)),
  );

  if (!data) return null;

  const { ensName, expires } = data;

  if (typeof ensName !== 'string' || Number.isNaN(Number(expires))) {
    localStorage.removeItem(getStorageEnsNameKey(address));
    return null;
  }

  const now = new Date();

  if (now.getTime() > Number(expires)) {
    localStorage.removeItem(getStorageEnsNameKey(address));
    return null;
  }

  return ensName;
}
