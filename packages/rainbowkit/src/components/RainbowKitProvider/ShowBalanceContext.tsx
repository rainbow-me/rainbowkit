import React, {
  type ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import type { ResponsiveValue } from '../../css/sprinkles.css';

interface ShowBalanceContextValue {
  showBalance: ResponsiveValue<boolean> | undefined;
  setShowBalance: (showBalance: ResponsiveValue<boolean>) => void;
}

const ShowBalanceContext = createContext<ShowBalanceContextValue>({
  showBalance: undefined,
  setShowBalance: () => {},
});

interface ShowBalanceProviderProps {
  children: ReactNode;
}

export function ShowBalanceProvider({ children }: ShowBalanceProviderProps) {
  const [showBalance, setShowBalance] = useState<ResponsiveValue<boolean>>();

  return (
    <ShowBalanceContext.Provider value={{ showBalance, setShowBalance }}>
      {children}
    </ShowBalanceContext.Provider>
  );
}

export const useShowBalance = () => useContext(ShowBalanceContext);
