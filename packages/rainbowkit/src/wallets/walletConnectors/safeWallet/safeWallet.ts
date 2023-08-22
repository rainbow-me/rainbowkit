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
    // We're opting not to provide a download prompt if the application is not
    // already running as a Safe App within the context of the Safe browser,
    // since it's unlikely to be a desired behavior for users.
  },
  createConnector: () => ({
    connector: new SafeConnector({ chains, options }),
  }),
});
