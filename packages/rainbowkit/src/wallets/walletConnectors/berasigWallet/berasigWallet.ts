import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type BerasigWalletOptions = DefaultWalletOptions;

export const berasigWallet = ({
  projectId,
  walletConnectParameters,
}: BerasigWalletOptions): Wallet => {
  const isBerasigWalletInjected = hasInjectedProvider({
    namespace: 'berasig.ethereum',
  });

  const shouldUseWalletConnect = !isBerasigWalletInjected;
  return {
    id: 'berasig',
    name: 'BeraSig',
    rdns: 'app.berasig',
    iconUrl: async () => (await import('./berasigWallet.svg')).default,
    iconBackground: '#ffffff',
    installed: !shouldUseWalletConnect ? isBerasigWalletInjected : undefined,
    downloadUrls: {
      android: 'https://play.google.com/store/apps/details?id=io.berasig.ios',
      ios: 'https://apps.apple.com/us/app/berasig-wallet-on-berachain/id6502052535',
      qrCode: 'https://berasig.com',
      mobile: 'https://berasig.com',
      browserExtension:
        'https://chromewebstore.google.com/detail/berasig/ckedkkegjbflcfblcjklibnedmfjppbj',
    },
    extension: {
      instructions: {
        steps: [
          {
            description:
              'wallet_connectors.berasig.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.berasig.extension.step1.title',
          },
          {
            description:
              'wallet_connectors.berasig.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.berasig.extension.step2.title',
          },
          {
            description:
              'wallet_connectors.berasig.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.berasig.extension.step3.title',
          },
        ],
        learnMoreUrl: 'https://berasig.com',
      },
    },
    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : getInjectedConnector({
          namespace: 'berasig.ethereum',
        }),
  };
};
