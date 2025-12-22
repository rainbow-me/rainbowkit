'use client';

import type React from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {
  RainbowKitSiweNextAuthProvider,
  type GetSiweMessageOptions,
} from '@rainbow-me/rainbowkit-siwe-next-auth';

import { config } from '../wagmi';

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to the RainbowKit + SIWE example app',
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={0}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitSiweNextAuthProvider
            getSiweMessageOptions={getSiweMessageOptions}
          >
            <RainbowKitProvider>{children}</RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SessionProvider>
  );
}
