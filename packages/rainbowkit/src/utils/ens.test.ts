import { beforeAll, describe, expect, it, vi } from 'vitest';
import { addEnsName, getEnsName, getStorageEnsNameKey } from './ens';

// vitalik.eth
const mockAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
const mockEnsName = 'vitalik.eth';

const store: Record<string, string> = {};

const localStorageMock: Storage = {
  getItem: (key: string): string => store[key] ?? null,
  setItem: (key: string, value: string): void => {
    store[key] = value.toString();
  },
  removeItem: (key: string): void => {
    delete store[key];
  },
  clear: (): void => {},
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  key: (index: number): string | null => '',
  length: Object.keys(store).length,
  // Easier to get number realtime, due to single object
  // reference not allowing us to use localStorage.length realtime
  total: () => Object.keys(store).length,
};

beforeAll((): void => {
  // biome-ignore lint/suspicious/noGlobalAssign: TODO
  localStorage = localStorageMock;
});

describe('ens', () => {
  it('should return null if ens name is not found', () => {
    const ensName = getEnsName(mockAddress);

    expect(localStorage.total()).toBe(0);
    expect(ensName).toBeNull();
  });

  it('should return ens name if added to storage', () => {
    addEnsName(mockAddress, mockEnsName);

    const ensName = getEnsName(mockAddress);

    expect(localStorage.total()).toBe(1);
    expect(ensName).toBe(mockEnsName);
  });

  it('should return null if ens name has expired', () => {
    const date = new Date();

    // 3 hours and 1 minute passed (expired)
    date.setMinutes(date.getMinutes() + 181);

    vi.useFakeTimers();
    vi.setSystemTime(date);

    const ensName = getEnsName(mockAddress);

    expect(localStorage.total()).toBe(0);
    expect(ensName).toBeNull();
  });

  it('should return null if ens name from localStorage is not a string', () => {
    addEnsName(mockAddress, mockEnsName);

    expect(localStorage.total()).toBe(1);

    // Pretend someone messed up the localStorage by putting null on ensName field
    store[getStorageEnsNameKey(mockAddress)] = JSON.stringify({
      ensName: null,
      expires: 0,
    });

    const ensName = getEnsName(mockAddress);

    expect(localStorage.total()).toBe(0);
    expect(ensName).toBeNull();
  });

  it('should return null if ens name expiration from localStorage is NaN', () => {
    addEnsName(mockAddress, mockEnsName);

    expect(localStorage.total()).toBe(1);

    // Pretend someone messed up the localStorage by putting undefined on expires field
    store[getStorageEnsNameKey(mockAddress)] = JSON.stringify({
      ensName: mockEnsName,
      expires: undefined,
    });

    const ensName = getEnsName(mockAddress);

    expect(localStorage.total()).toBe(0);
    expect(ensName).toBeNull();
  });
});
