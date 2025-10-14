import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useRainbowConnectModal } from './useRainbowConnectModal';

const openConnectModal = vi.hoisted(() => vi.fn());

vi.mock('@rainbow-me/rainbowkit', () => ({
  useConnectModal: () => ({
    connectModalOpen: false,
    openConnectModal,
  }),
}));

describe('useRainbowConnectModal', () => {
  it('invokes connect modal when connect is called', () => {
    const { result } = renderHook(() => useRainbowConnectModal());

    act(() => {
      result.current.connect();
    });

    expect(openConnectModal).toHaveBeenCalledTimes(1);
    expect(result.current.connectModalOpen).toBe(false);
  });
});
