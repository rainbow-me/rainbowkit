import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { useAccount } from 'wagmi';

export type AuthenticationStatus =
  | 'loading'
  | 'unauthenticated'
  | 'authenticated';

export interface AuthenticationAdapter<Message> {
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

export interface AuthenticationConfig<Message> {
  adapter: AuthenticationAdapter<Message>;
  status: AuthenticationStatus;
}

// Right now this function only serves to infer the generic Message type
export function createAuthenticationAdapter<Message>(
  adapter: AuthenticationAdapter<Message>
) {
  return adapter;
}

const AuthenticationContext = createContext<AuthenticationConfig<any> | null>(
  null
);

interface AuthenticationProviderProps<Message = unknown> {
  authentication?: {
    adapter: AuthenticationAdapter<Message>;
    status: AuthenticationStatus;
  };
  children: ReactNode;
}

export function AuthenticationProvider<Message = unknown>({
  authentication,
  children,
}: AuthenticationProviderProps<Message>) {
  const { adapter, status } = authentication ?? {};

  useAccount({
    onDisconnect: () => {
      adapter?.logout();
    },
  });

  return (
    <AuthenticationContext.Provider
      value={useMemo(
        () => (adapter && status ? { adapter, status } : null),
        [adapter, status]
      )}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthenticationAdapter() {
  const { adapter } = useContext(AuthenticationContext) ?? {};

  if (!adapter) {
    throw new Error('No authentication adapter found');
  }

  return adapter;
}

export function useAuthenticationStatus() {
  const contextValue = useContext(AuthenticationContext);

  return contextValue?.status ?? null;
}
