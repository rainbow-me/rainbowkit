import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type BalanceStatus = 'show' | 'refetch';

const RealtimeBalanceStatusContext = createContext<{
  status: BalanceStatus;
  setStatus: (status: BalanceStatus) => void;
}>({
  status: 'show',
  setStatus: () => {},
});

interface RealtimeBalanceStatusProviderProps {
  children: ReactNode;
}

export const RealtimeBalanceStatusProvider = ({
  children,
}: RealtimeBalanceStatusProviderProps) => {
  const [status, setStatus] = useState<BalanceStatus>('show');

  useEffect(() => {
    if (status === 'refetch') {
      // Whenever status is 'refetch' immediately set it to 'show'.
      // This will force wagmi's 'useBalance' hook to refetch the balance
      setStatus('show');
    }
  }, [status]);

  return (
    <RealtimeBalanceStatusContext.Provider value={{ status, setStatus }}>
      {children}
    </RealtimeBalanceStatusContext.Provider>
  );
};

export const useRealtimeBalanceStatus = () =>
  useContext(RealtimeBalanceStatusContext);
