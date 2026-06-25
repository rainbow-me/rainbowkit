import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  addLatestWalletId,
  clearLatestWalletId,
  getLatestWalletId,
} from './latestWalletId';

function mockUnavailableLocalStorage() {
  vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
    throw new Error('localStorage unavailable');
  });
}

describe('latestWalletId', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns an empty wallet id when localStorage is unavailable', () => {
    mockUnavailableLocalStorage();

    expect(getLatestWalletId()).toBe('');
  });

  it('ignores latest wallet updates when localStorage is unavailable', () => {
    mockUnavailableLocalStorage();

    expect(() => addLatestWalletId('rainbow')).not.toThrow();
    expect(() => clearLatestWalletId()).not.toThrow();
  });
});
