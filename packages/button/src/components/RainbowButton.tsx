import { RainbowKitProvider, WalletButton } from '@rainbow-me/rainbowkit';
import type { RainbowKitProviderProps } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitProvider';
import React from 'react';

export function RainbowButtonProvider({
  children,
  ...options
}: Omit<RainbowKitProviderProps, 'chains'>) {
  return (
    <RainbowKitProvider chains={[]} {...options}>
      {children}
    </RainbowKitProvider>
  );
}

export function RainbowButton() {
  return <WalletButton />;
}
