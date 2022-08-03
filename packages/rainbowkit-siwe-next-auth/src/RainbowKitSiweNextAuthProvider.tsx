import { RainbowKitAuthenticationProvider } from '@rainbow-me/rainbowkit';
import React, { ReactNode } from 'react';
import { useSiweNextAuth, UseSiweNextAuthOptions } from './useSiweNextAuth';

interface RainbowKitSiweNextAuthProviderProps extends UseSiweNextAuthOptions {
  enabled?: boolean;
  children: ReactNode;
}

export function RainbowKitSiweNextAuthProvider({
  children,
  enabled,
  ...options
}: RainbowKitSiweNextAuthProviderProps) {
  return (
    <RainbowKitAuthenticationProvider
      {...useSiweNextAuth(options)}
      enabled={enabled}
    >
      {children}
    </RainbowKitAuthenticationProvider>
  );
}
