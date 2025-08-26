import { RainbowKitProvider, WalletButton } from '@rainbow-me/rainbowkit';
import type React from 'react';

type RainbowKitProviderProps = React.ComponentProps<typeof RainbowKitProvider>;

export function RainbowButtonProvider({
  children,
  ...options
}: Omit<
  RainbowKitProviderProps,
  'chains' | 'avatar' | 'initialChain' | 'modalSize' | 'showRecentTransactions'
>) {
  return <RainbowKitProvider {...options}>{children}</RainbowKitProvider>;
}

export const RainbowButton = () => {
  return <WalletButton wallet="rainbow" />;
};

RainbowButton.Custom = WalletButton.Custom;
