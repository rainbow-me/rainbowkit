/* eslint-disable sort-keys-fix/sort-keys-fix */
import { SafeConnector, SafeConnectorOptions } from 'wagmi/connectors/safe';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface SafeWalletOptions {
  chains: Chain[];
  options?: SafeConnectorOptions;
}

// See the official integration guide for auto-connecting
// https://github.com/safe-global/safe-apps-sdk/tree/main/packages/safe-apps-wagmi#integration-steps
export const safeWallet = ({
  chains,
  options = {},
}: SafeWalletOptions): Wallet => ({
  id: 'safe',
  name: 'Safe',
  iconUrl: async () => (await import('./safe.svg')).default,
  iconBackground: '#000',
  createConnector: () => ({
    connector: new SafeConnector({ chains, options }),
  }),
});
