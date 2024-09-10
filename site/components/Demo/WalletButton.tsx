import {
  type Locale,
  WalletButton as RKWalletButton,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { Box } from 'components/Box/Box';
import { useRouter } from 'next/router';
import React from 'react';
import { walletButtons } from './WalletButton.css';

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
          <RKWalletButton wallet="coinbase" />
        </Box>
        <Box>
          <RKWalletButton wallet="trust" />
        </Box>
        <Box>
          <RKWalletButton wallet="argent" />
        </Box>
        <Box>
          <RKWalletButton wallet="omni" />
        </Box>
      </Box>
    </RainbowKitProvider>
  );
}
