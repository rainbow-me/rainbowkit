import type { InjectedConnectorOptions } from '@wagmi/core/dist/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface FrameWalletOptions {
  chains: Chain[];
}

export const frameWallet = ({
  chains,
  ...options
}: FrameWalletOptions & InjectedConnectorOptions): Wallet => ({
  id: 'frame',
  name: 'Frame',
  installed:
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    ((window.ethereum as any).isFrame === true ||
      !!window.ethereum.providers?.find((p: any) => p.isFrame === true)),
  iconUrl: async () => (await import('./frameWallet.svg')).default,
  iconBackground: '#121C20',
  downloadUrls: {
    browserExtension: 'https://frame.sh/',
  },
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options,
    }),
    extension: {
      instructions: {
        learnMoreUrl:
          'https://docs.frame.sh/docs/Getting%20Started/Installation/',
        steps: [
          {
            description: 'wallet_connectors.frame.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.frame.extension.step1.title',
          },
          {
            description: 'wallet_connectors.frame.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.frame.extension.step2.title',
          },
          {
            description: 'wallet_connectors.frame.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.frame.extension.step3.title',
          },
        ],
      },
    },
  }),
});
