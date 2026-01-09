import type { Locale } from '@rainbow-me/rainbowkit';
import { Box } from 'components/Box/Box';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { walletButtons } from './WalletButton.css';

// Dynamically import components that use wagmi hooks to avoid SSG errors
const RainbowKitProvider = dynamic(
  () => import('@rainbow-me/rainbowkit').then((mod) => mod.RainbowKitProvider),
  { ssr: false },
);

const RKWalletButton = dynamic(
  () => import('@rainbow-me/rainbowkit').then((mod) => mod.WalletButton),
  { ssr: false },
);

export function WalletButtonDemo() {
  const { locale } = useRouter() as { locale: Locale };
  return (
    <RainbowKitProvider locale={locale}>
      <Box className={walletButtons} id="wallet-button-demo">
        <Box alignItems={'flex-start'}>
          <RKWalletButton wallet="rainbow" />
        </Box>
        <Box>
          <RKWalletButton wallet="metaMask" />
        </Box>
        <Box>
          <RKWalletButton wallet="baseAccount" />
        </Box>
        <Box>
          <RKWalletButton wallet="trust" />
        </Box>
        <Box>
          <RKWalletButton wallet="ready" />
        </Box>
        <Box>
          <RKWalletButton wallet="omni" />
        </Box>
      </Box>
    </RainbowKitProvider>
  );
}
