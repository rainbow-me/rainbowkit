import {
  RainbowKitProvider,
  WalletButton as RKWalletButton,
} from '@rainbow-me/rainbowkit';
import { Box } from 'components/Box/Box';
import React from 'react';
import { walletButtons } from './WalletButton.css';

export function WalletButtonDemo() {
  return (
    <RainbowKitProvider chains={[]}>
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
