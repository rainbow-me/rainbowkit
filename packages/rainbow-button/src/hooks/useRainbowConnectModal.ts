import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useCallback } from 'react';

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
