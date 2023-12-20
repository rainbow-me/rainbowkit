import { RainbowKitProvider, WalletButton } from '@rainbow-me/rainbowkit';
import type { RainbowKitProviderProps } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitProvider';
import React from 'react';
import { mainnet } from 'wagmi/chains';

export function RainbowButtonProvider({
  children,
  ...options
}: Omit<
  RainbowKitProviderProps,
  'chains' | 'avatar' | 'initialChain' | 'modalSize' | 'showRecentTransactions'
>) {
  return (
    // Wagmi requires 'chains' as a tuple type with at least one chain
    <RainbowKitProvider chains={[mainnet]} {...options}>
      {children}
    </RainbowKitProvider>
  );
}

export const RainbowButton = () => {
  return <WalletButton wallet="rainbow" />;
};

RainbowButton.Custom = WalletButton.Custom;
