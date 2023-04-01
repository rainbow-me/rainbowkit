/*eslint-disable no-redeclare */
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import type { RainbowWalletOptions } from '@rainbow-me/rainbowkit/dist/wallets/walletConnectors/rainbowWallet/rainbowWallet';
import { rainbowWallet } from '@rainbow-me/rainbowkit/wallets';
import { Connector } from '@wagmi/core';

declare class RainbowConnector extends Connector {
  constructor({ chains }: RainbowWalletOptions);
}

function RainbowConnector({ chains }: RainbowWalletOptions) {
  return connectorsForWallets([
    {
      groupName: 'Popular',
      wallets: [rainbowWallet({ chains })],
    },
  ])()[0];
}

export { RainbowConnector };
