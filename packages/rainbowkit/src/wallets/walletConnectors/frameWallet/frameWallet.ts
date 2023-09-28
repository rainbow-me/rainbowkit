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
            description:
              'We recommend pinning Frame to your taskbar for quicker access to your wallet.',
            step: 'install',
            title: 'Install Frame & the companion extension',
          },
          {
            description:
              'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
            step: 'create',
            title: 'Create or Import a Wallet',
          },
          {
            description:
              'Once you set up your wallet, click below to refresh the browser and load up the extension.',
            step: 'refresh',
            title: 'Refresh your browser',
          },
        ],
      },
    },
  }),
});
