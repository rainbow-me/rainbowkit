import { afterEach, describe, expect, it, vi } from 'vitest';
import { addRecentWalletId, getRecentWalletIds } from './recentWalletIds';

function mockUnavailableLocalStorage() {
  vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
    throw new Error('localStorage unavailable');
  });
}

describe('recentWalletIds', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns no recent wallet ids when localStorage is unavailable', () => {
    mockUnavailableLocalStorage();

    expect(getRecentWalletIds()).toEqual([]);
  });

  it('ignores recent wallet updates when localStorage is unavailable', () => {
    mockUnavailableLocalStorage();

    expect(() => addRecentWalletId('rainbow')).not.toThrow();
  });
});
