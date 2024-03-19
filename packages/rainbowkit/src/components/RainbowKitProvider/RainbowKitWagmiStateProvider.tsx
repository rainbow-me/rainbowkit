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

// This provider is used for optimistic update purposes
export function RainbowKitWagmiStateProvider({
  children,
}: RainbowKitWagmiStateProviderProps) {
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
