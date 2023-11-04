import type { InjectedConnectorOptions } from '@wagmi/core/dist/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface BitskiWalletOptions {
  chains: Chain[];
}

export const bitskiWallet = ({
  chains,
  ...options
}: BitskiWalletOptions & InjectedConnectorOptions): Wallet => ({
  id: 'bitski',
  name: 'Bitski',
  installed:
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    ((window.ethereum as any).isBitski === true ||
      !!window.ethereum.providers?.find((p: any) => p.isBitski === true)),
  iconUrl: async () => (await import('./bitskiWallet.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    chrome:
      'https://chrome.google.com/webstore/detail/bitski/feejiigddaafeojfddjjlmfkabimkell',
    browserExtension: 'https://bitski.com',
  },
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options,
    }),
    extension: {
      instructions: {
        learnMoreUrl:
          'https://bitski.zendesk.com/hc/articles/12803972818836-How-to-install-the-Bitski-browser-extension',
        steps: [
          {
            description: 'wallet_connectors.bitski.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.bitski.extension.step1.title',
          },
          {
            description: 'wallet_connectors.bitski.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.bitski.extension.step2.title',
          },
          {
            description: 'wallet_connectors.bitski.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.bitski.extension.step3.title',
          },
        ],
      },
    },
  }),
});
