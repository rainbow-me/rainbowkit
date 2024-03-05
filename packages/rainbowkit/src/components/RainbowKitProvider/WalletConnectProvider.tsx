import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

interface WalletConnectContextValue {
  isWalletConnectModalOpen: boolean;
  setIsWalletConnectModalOpen: (isWalletConnectModalOpen: boolean) => void;
}

export const WalletConnectContext = createContext<WalletConnectContextValue>({
  isWalletConnectModalOpen: false,
  setIsWalletConnectModalOpen: () => {},
});

interface WalletConnectProviderProps {
  children: ReactNode;
}

export function WalletConnectProvider({
  children,
}: WalletConnectProviderProps) {
  const [isWalletConnectModalOpen, setIsWalletConnectModalOpen] =
    useState<boolean>(false);

  return (
    <WalletConnectContext.Provider
      value={useMemo(
        () => ({
          isWalletConnectModalOpen,
          setIsWalletConnectModalOpen,
        }),
        [isWalletConnectModalOpen],
      )}
    >
      {children}
    </WalletConnectContext.Provider>
  );
}

export function useIsWalletConnectModalOpen() {
  const { isWalletConnectModalOpen } = useContext(WalletConnectContext);

  return isWalletConnectModalOpen;
}

export function useWalletConnectOpenState() {
  const { isWalletConnectModalOpen, setIsWalletConnectModalOpen } =
    useContext(WalletConnectContext);

  return { isWalletConnectModalOpen, setIsWalletConnectModalOpen };
}
