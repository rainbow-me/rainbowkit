import { useCallback } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';

export function useRainbowConnectModal() {
  const { openConnectModal, connectModalOpen } = useConnectModal();

  const connect = useCallback(() => {
    openConnectModal?.();
  }, [openConnectModal]);

  return {
    connect,
    connectModalOpen,
  } as const;
}
