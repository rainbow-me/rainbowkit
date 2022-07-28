import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { useAccount } from 'wagmi';

export type AuthenticationStatus =
  | 'loading'
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
  logout: () => Promise<void>;
}

export function createAuthenticator<Message>(
  authenticator: Authenticator<Message>
) {
  return authenticator;
}

const AuthenticationContext = createContext<{
  authenticator: Authenticator<any>;
  status?: AuthenticationStatus;
} | null>(null);

interface AuthenticationProviderProps<Message = unknown> {
  authenticator?: Authenticator<Message>;
  authenticationStatus?: AuthenticationStatus;
  children: ReactNode;
}

export function AuthenticationProvider<Message = unknown>({
  authenticationStatus,
  authenticator,
  children,
}: AuthenticationProviderProps<Message>) {
  const status = authenticationStatus;

  useAccount({
    onDisconnect: () => {
      authenticator?.logout();
    },
  });

  return (
    <AuthenticationContext.Provider
      value={useMemo(
        () => (authenticator ? { authenticator, status } : null),
        [authenticator, status]
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

  const { authenticator } = contextValue;

  return authenticator;
}

export function useAuthenticationStatus() {
  const contextValue = useContext(AuthenticationContext);

  return contextValue?.status ?? null;
}
