import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { rainbowWallet } from '@rainbow-me/rainbowkit/wallets';
import type { CreateConnectorFn } from 'wagmi';

export type RainbowConnectorOptions = Parameters<typeof rainbowWallet>[0];

function rainbowConnector(options: RainbowConnectorOptions): CreateConnectorFn {
  const [connector] = connectorsForWallets([rainbowWallet(options)]);
  return connector;
}

export { rainbowConnector };
