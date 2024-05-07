import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

interface RainbowKitWagmiStateContextValue {
  isDisconnecting: boolean;
  setIsDisconnecting: (isDisconnecting: boolean) => void;
}

const RainbowKitWagmiStateContext =
  createContext<RainbowKitWagmiStateContextValue>({
    isDisconnecting: false,
    setIsDisconnecting: () => {},
  });

interface RainbowKitWagmiStateProviderProps {
  children: ReactNode;
}

export function RainbowKitWagmiStateProvider({
  children,
}: RainbowKitWagmiStateProviderProps) {
  // The 'status' state from the `useDisconnect` hook in wagmi can't be used for 'pending' logic,
  // as it doesn't share its state globally. It only shares its state within the same component (like useState).
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  return (
    <RainbowKitWagmiStateContext.Provider
      value={useMemo(
        () => ({
          isDisconnecting,
          setIsDisconnecting,
        }),
        [isDisconnecting],
      )}
    >
      {children}
    </RainbowKitWagmiStateContext.Provider>
  );
}

export const useRainbowKitWagmiState = () =>
  useContext(RainbowKitWagmiStateContext);
