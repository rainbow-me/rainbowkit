import { renderHook } from '@testing-library/react';
import type { Address } from 'viem';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useProfile } from './useProfile';

const wagmiMocks = vi.hoisted(() => ({
  useBalance: vi.fn(),
}));

vi.mock('wagmi', () => ({
  useBalance: wagmiMocks.useBalance,
}));

vi.mock('./useMainnetEnsAvatar', () => ({
  useMainnetEnsAvatar: () => undefined,
}));

vi.mock('./useMainnetEnsName', () => ({
  useMainnetEnsName: () => undefined,
}));

const address = '0x0000000000000000000000000000000000000001' as Address;

describe('useProfile', () => {
  beforeEach(() => {
    wagmiMocks.useBalance.mockReset();
    wagmiMocks.useBalance.mockReturnValue({ data: undefined });
  });

  it('disables balance fetching when balance display is disabled', () => {
    renderHook(() => useProfile({ address, includeBalance: false }));

    expect(wagmiMocks.useBalance).toHaveBeenCalledWith({
      address,
      query: { enabled: false },
    });
  });

  it('enables balance fetching when balance display is enabled', () => {
    renderHook(() => useProfile({ address, includeBalance: true }));

    expect(wagmiMocks.useBalance).toHaveBeenCalledWith({
      address,
      query: { enabled: true },
    });
  });
});
