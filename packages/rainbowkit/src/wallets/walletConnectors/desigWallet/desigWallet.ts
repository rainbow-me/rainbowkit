import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export interface DesigWalletOptions {
  chains: Chain[];
}

export const desigWallet = ({ chains }: DesigWalletOptions): Wallet => ({
  id: 'desig',
  name: 'Desig Wallet',
  iconUrl: async () => (await import('./desigWallet.svg')).default,
  iconBackground: '#ffffff',
  installed: hasInjectedProvider({ namespace: 'desig.ethereum' }),
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=io.desig.app',
    ios: 'https://apps.apple.com/app/desig-wallet/id6450106028',
    qrCode: 'https://desig.io',
    mobile: 'https://desig.io',
    browserExtension:
      'https://chrome.google.com/webstore/detail/desig-wallet/panpgppehdchfphcigocleabcmcgfoca',
  },

  createConnector: () => {
    const connector = getInjectedConnector({
      chains,
      namespace: 'desig.ethereum',
    });

    return {
      connector,
      extension: {
        instructions: {
          steps: [
            {
              description:
                'wallet_connectors.desig.extension.step1.description',
              step: 'install',
              title: 'wallet_connectors.desig.extension.step1.title',
            },
            {
              description:
                'wallet_connectors.desig.extension.step2.description',
              step: 'create',
              title: 'wallet_connectors.desig.extension.step2.title',
            },
            {
              description:
                'wallet_connectors.desig.extension.step3.description',
              step: 'refresh',
              title: 'wallet_connectors.desig.extension.step3.title',
            },
          ],
          learnMoreUrl: 'https://desig.io',
        },
      },
    };
  },
});
