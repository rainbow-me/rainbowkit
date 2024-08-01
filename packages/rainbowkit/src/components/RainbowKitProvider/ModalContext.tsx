import React, {
  Fragment,
  ReactNode,
  Suspense,
  createContext,
  lazy,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAccount, useAccountEffect, useConfig } from 'wagmi';
import { useConnectionStatus } from '../../hooks/useConnectionStatus';
import { ConnectModal } from '../ConnectModal/ConnectModal';
import { useAuthenticationStatus } from './AuthenticationContext';

const AccountModal = lazy(() =>
  import('../AccountModal/AccountModal').then((module) => ({
    default: module.AccountModal,
  })),
);

const ChainModal = lazy(() =>
  import('../ChainModal/ChainModal').then((module) => ({
    default: module.ChainModal,
  })),
);

function useModalStateValue() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUsing, setIsUsing] = useState(false);

  return {
    closeModal: useCallback(() => setModalOpen(false), []),
    isModalOpen,
    openModal: useCallback(() => setModalOpen(true), []),
    isUsing,
    setIsUsing: useCallback((isUsing: boolean) => setIsUsing(isUsing), []),
  };
}

interface ModalContextValue {
  accountModalOpen: boolean;
  chainModalOpen: boolean;
  connectModalOpen: boolean;
  isUsingChainModal: boolean;
  isUsingAccountModal: boolean;
  isWalletConnectModalOpen: boolean;
  openAccountModal?: () => void;
  openChainModal?: () => void;
  openConnectModal?: () => void;
  setIsWalletConnectModalOpen: (isWalletConnectModalOpen: boolean) => void;
  setIsUsingChainModal: (isUsingChainModal: boolean) => void;
  setIsUsingAccountModal: (isUsingAccountModal: boolean) => void;
}

const ModalContext = createContext<ModalContextValue>({
  accountModalOpen: false,
  chainModalOpen: false,
  connectModalOpen: false,
  isWalletConnectModalOpen: false,
  isUsingAccountModal: false,
  isUsingChainModal: false,
  setIsWalletConnectModalOpen: () => {},
  setIsUsingChainModal: () => {},
  setIsUsingAccountModal: () => {},
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
    isUsing: isUsingAccountModal,
    setIsUsing: setIsUsingAccountModal,
  } = useModalStateValue();

  const {
    closeModal: closeChainModal,
    isModalOpen: chainModalOpen,
    openModal: openChainModal,
    isUsing: isUsingChainModal,
    setIsUsing: setIsUsingChainModal,
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

  function closeModals({
    keepConnectModalOpen = false,
  }: CloseModalsOptions = {}) {
    if (!keepConnectModalOpen) {
      closeConnectModal();
    }
    closeAccountModal();
    closeChainModal();
  }

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
  }, [isUnauthenticated]);

  return (
    <ModalContext.Provider
      value={useMemo(
        () => ({
          accountModalOpen,
          chainModalOpen,
          connectModalOpen,
          isWalletConnectModalOpen,
          isUsingChainModal,
          isUsingAccountModal,
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
          setIsUsingChainModal,
          setIsUsingAccountModal,
        }),
        [
          connectionStatus,
          accountModalOpen,
          chainModalOpen,
          connectModalOpen,
          openAccountModal,
          openChainModal,
          openConnectModal,
          setIsUsingChainModal,
          setIsUsingAccountModal,
          isCurrentChainSupported,
          isWalletConnectModalOpen,
          isUsingAccountModal,
          isUsingChainModal,
        ],
      )}
    >
      {children}
      <ConnectModal onClose={closeConnectModal} open={connectModalOpen} />
      {isUsingAccountModal && (
        <Suspense fallback={<Fragment />}>
          <AccountModal onClose={closeAccountModal} open={accountModalOpen} />
        </Suspense>
      )}
      {isUsingChainModal && (
        <Suspense fallback={<Fragment />}>
          <ChainModal onClose={closeChainModal} open={chainModalOpen} />
        </Suspense>
      )}
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
  const {
    accountModalOpen,
    openAccountModal,
    isUsingAccountModal,
    setIsUsingAccountModal,
  } = useContext(ModalContext);

  useEffect(() => {
    if (!isUsingAccountModal) {
      setIsUsingAccountModal(true);
    }
  }, [setIsUsingAccountModal, isUsingAccountModal]);

  return { accountModalOpen, openAccountModal };
}

export function useChainModal() {
  const {
    chainModalOpen,
    openChainModal,
    isUsingChainModal,
    setIsUsingChainModal,
  } = useContext(ModalContext);

  useEffect(() => {
    if (!isUsingChainModal) {
      setIsUsingChainModal(true);
    }
  }, [setIsUsingChainModal, isUsingChainModal]);

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
