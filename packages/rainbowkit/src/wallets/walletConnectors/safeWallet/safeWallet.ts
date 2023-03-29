/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { SafeConnectorOptions } from 'wagmi/connectors/safe';
import { SafeConnector } from 'wagmi/connectors/safe';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface SafeWalletOptions {
  chains: Chain[];
}

export const safeWallet = ({
  chains,
  ...options
}: SafeWalletOptions & SafeConnectorOptions): Wallet => ({
  id: 'safe',
  name: 'Safe',
  iconAccent: '#12ff80',
  iconBackground: '#fff',
  iconUrl: async () => (await import('./safeWallet.svg')).default,
  installed:
    // Only allowed in iframe context
    // borrowed from wagmi safe connector
    !(typeof window === 'undefined') && window?.parent !== window,
  downloadUrls: {
    // We're opting not to provide a download prompt if Safe isn't the current
    // browser since it's unlikely to be a desired behavior for users. It's
    // more of a convenience for users who are already using Brave rather than
    // an explicit wallet choice for users coming from other browsers.
  },
  createConnector: () => ({
    connector: new SafeConnector({ chains, options }),
  }),
});
