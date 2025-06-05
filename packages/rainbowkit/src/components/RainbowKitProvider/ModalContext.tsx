import React, {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAccount, useAccountEffect, useConfig } from 'wagmi';
import { useConnectionStatus } from '../../hooks/useConnectionStatus';
import { AccountModal } from '../AccountModal/AccountModal';
import { ChainModal } from '../ChainModal/ChainModal';
import { ConnectModal } from '../ConnectModal/ConnectModal';
import { useAuthenticationStatus } from './AuthenticationContext';

function useModalStateValue() {
  const [isModalOpen, setModalOpen] = useState(false);

  return {
    closeModal: useCallback(() => setModalOpen(false), []),
    isModalOpen,
    openModal: useCallback(() => setModalOpen(true), []),
  };
}

interface ModalContextValue {
  accountModalOpen: boolean;
  chainModalOpen: boolean;
  connectModalOpen: boolean;
  openAccountModal?: () => void;
  openChainModal?: () => void;
  openConnectModal?: () => void;
  isWalletConnectModalOpen: boolean;
  setIsWalletConnectModalOpen: (isWalletConnectModalOpen: boolean) => void;
}

const ModalContext = createContext<ModalContextValue>({
  accountModalOpen: false,
  chainModalOpen: false,
  connectModalOpen: false,
  isWalletConnectModalOpen: false,
  setIsWalletConnectModalOpen: () => {},
});

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const {
    closeModal: closeConnectModal,
    isModalOpen: connectModalOpen,
    openModal: openConnectModal,
  } = useModalStateValue();

  const {
    closeModal: closeAccountModal,
    isModalOpen: accountModalOpen,
    openModal: openAccountModal,
  } = useModalStateValue();

  const {
    closeModal: closeChainModal,
    isModalOpen: chainModalOpen,
    openModal: openChainModal,
  } = useModalStateValue();

  const [isWalletConnectModalOpen, setIsWalletConnectModalOpen] =
    useState(false);

  const connectionStatus = useConnectionStatus();

  const { chainId } = useAccount();
  const { chains } = useConfig();

  const isCurrentChainSupported = chains.some((chain) => chain.id === chainId);

  interface CloseModalsOptions {
    keepConnectModalOpen?: boolean;
  }

  const closeModals = useCallback(
    ({ keepConnectModalOpen = false }: CloseModalsOptions = {}) => {
      if (!keepConnectModalOpen) {
        closeConnectModal();
      }
      closeAccountModal();
      closeChainModal();
    },
    [closeConnectModal, closeAccountModal, closeChainModal],
  );

  const isUnauthenticated = useAuthenticationStatus() === 'unauthenticated';

  useAccountEffect({
    onConnect: () => closeModals({ keepConnectModalOpen: isUnauthenticated }),
    onDisconnect: () => closeModals(),
  });

  useEffect(() => {
    // Due to multiple connection feature in wagmi v2 we need to close
    // modals when user is unauthenticated. When connectors changes we log user out
    // This means we'll need to close the modals as well.
    if (isUnauthenticated) closeModals();
  }, [isUnauthenticated, closeModals]);

  return (
    <ModalContext.Provider
      value={useMemo(
        () => ({
          accountModalOpen,
          chainModalOpen,
          connectModalOpen,
          isWalletConnectModalOpen,
          openAccountModal:
            isCurrentChainSupported && connectionStatus === 'connected'
              ? openAccountModal
              : undefined,
          openChainModal:
            connectionStatus === 'connected' ? openChainModal : undefined,
          openConnectModal:
            connectionStatus === 'disconnected' ||
            connectionStatus === 'unauthenticated'
              ? openConnectModal
              : undefined,
          setIsWalletConnectModalOpen,
        }),
        [
          connectionStatus,
          accountModalOpen,
          chainModalOpen,
          connectModalOpen,
          openAccountModal,
          openChainModal,
          openConnectModal,
          isCurrentChainSupported,
          isWalletConnectModalOpen,
        ],
      )}
    >
      {children}
      <ConnectModal onClose={closeConnectModal} open={connectModalOpen} />
      <AccountModal onClose={closeAccountModal} open={accountModalOpen} />
      <ChainModal onClose={closeChainModal} open={chainModalOpen} />
    </ModalContext.Provider>
  );
}

export function useModalState() {
  const { accountModalOpen, chainModalOpen, connectModalOpen } =
    useContext(ModalContext);

  return {
    accountModalOpen,
    chainModalOpen,
    connectModalOpen,
  };
}

export function useAccountModal() {
  const { accountModalOpen, openAccountModal } = useContext(ModalContext);
  return { accountModalOpen, openAccountModal };
}

export function useChainModal() {
  const { chainModalOpen, openChainModal } = useContext(ModalContext);
  return { chainModalOpen, openChainModal };
}

export function useWalletConnectOpenState() {
  const { isWalletConnectModalOpen, setIsWalletConnectModalOpen } =
    useContext(ModalContext);

  return { isWalletConnectModalOpen, setIsWalletConnectModalOpen };
}

export function useConnectModal() {
  const { connectModalOpen, openConnectModal } = useContext(ModalContext);
  const { isWalletConnectModalOpen } = useWalletConnectOpenState();

  return {
    connectModalOpen: connectModalOpen || isWalletConnectModalOpen,
    openConnectModal,
  };
}
