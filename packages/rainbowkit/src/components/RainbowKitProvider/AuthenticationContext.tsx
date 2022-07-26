import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useAccount, useDisconnect } from 'wagmi';

export type AuthenticationStatus =
  | 'pending'
  | 'unauthenticated'
  | 'authenticated';

export interface Authenticator<Message> {
  fetchNonce: () => Promise<string>;
  createMessage: (args: {
    nonce: string;
    address: string;
    chainId: number;
  }) => Message;
  prepareMessage: (args: { message: Message }) => string;
  verify: (args: { message: Message; signature: string }) => Promise<boolean>;
  checkStatus: () => Promise<boolean>;
  logout: () => Promise<void>;
}

export function createAuthenticator<Message>(
  authenticator: Authenticator<Message>
) {
  return authenticator;
}

const AuthenticationContext = createContext<{
  authenticator: Authenticator<any>;
  status: AuthenticationStatus;
  setStatus: (status: AuthenticationStatus) => void;
  setActiveAuthenticatorCount: Dispatch<SetStateAction<number>>;
} | null>(null);

interface AuthenticationProviderProps<Message = unknown> {
  authenticator?: Authenticator<Message>;
  children: ReactNode;
}

export function AuthenticationProvider<Message = unknown>({
  authenticator,
  children,
}: AuthenticationProviderProps<Message>) {
  const [status, setStatus] = useState<AuthenticationStatus>('pending');
  const [activeAuthenticatorCount, setActiveAuthenticatorCount] = useState(0);
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount({
    onDisconnect: () => {
      setStatus('unauthenticated');
      authenticator?.logout();
    },
  });

  const onceRef = useRef(false);
  useEffect(() => {
    if (onceRef.current) return;
    onceRef.current = true;

    async function checkStatusOnMount() {
      if (!authenticator) return;

      if (isConnected) {
        const authenticated = await authenticator.checkStatus();

        if (authenticated) {
          setStatus('authenticated');
        } else {
          setStatus('unauthenticated');
          disconnect();
        }
      } else {
        setStatus('unauthenticated');
      }
    }

    checkStatusOnMount();
  }, [authenticator, disconnect, isConnected]);

  useEffect(() => {
    async function focusHandler() {
      if (activeAuthenticatorCount === 0) {
        const authenticated = await authenticator?.checkStatus();

        if (!authenticated) {
          setStatus('unauthenticated');
          disconnect();
        }
      }
    }

    window.addEventListener('focus', focusHandler);

    return () => {
      window.removeEventListener('focus', focusHandler);
    };
  }, [authenticator, activeAuthenticatorCount, disconnect]);

  return (
    <AuthenticationContext.Provider
      value={useMemo(
        () =>
          authenticator
            ? { authenticator, setActiveAuthenticatorCount, setStatus, status }
            : null,
        [authenticator, status, setStatus, setActiveAuthenticatorCount]
      )}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthenticator() {
  const contextValue = useContext(AuthenticationContext);

  if (!contextValue) {
    throw new Error('No authenticator found');
  }

  const { authenticator, setActiveAuthenticatorCount } = contextValue;

  useEffect(() => {
    setActiveAuthenticatorCount(x => x + 1);

    return () => {
      setActiveAuthenticatorCount(x => x - 1);
    };
  }, [setActiveAuthenticatorCount]);

  return authenticator;
}

export function useAuthenticationStatus() {
  const contextValue = useContext(AuthenticationContext);

  return contextValue?.status ?? null;
}

export function useSetAuthenticationStatus() {
  return useContext(AuthenticationContext)?.setStatus ?? null;
}
