import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { rainbowWallet } from '@rainbow-me/rainbowkit/wallets';
import type { Connector } from '@wagmi/core';

export type RainbowConnectorOptions = Parameters<typeof rainbowWallet>[0];

declare class RainbowConnector extends Connector {
  constructor(options: RainbowConnectorOptions);
}

function RainbowConnector(options: RainbowConnectorOptions) {
  return connectorsForWallets([
    {
      groupName: 'Popular',
      wallets: [rainbowWallet(options)],
    },
  ])()[0];
}

export { RainbowConnector };
