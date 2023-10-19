import { RainbowKitProvider, WalletButton } from '@rainbow-me/rainbowkit';
import type { RainbowKitProviderProps } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitProvider';
import React from 'react';

export function RainbowButtonProvider({
  children,
  ...options
}: Omit<RainbowKitProviderProps, 'chains'>) {
  // NOTE: The chains array is intentionally left empty.
  // This is due to the current incompatibility between the 'rainbowkit' chain modal and the 'rainbow' button library.
  // As a workaround, users can utilize 'wagmi' to switch chains.
  return (
    <RainbowKitProvider chains={[]} {...options}>
      {children}
    </RainbowKitProvider>
  );
}

export const RainbowButton = ({ wallet }: { wallet?: string }) => {
  return <WalletButton wallet={wallet} />;
};

RainbowButton.Custom = WalletButton.Custom;
