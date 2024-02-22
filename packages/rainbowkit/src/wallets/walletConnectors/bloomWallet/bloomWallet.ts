import { isMobile } from '../../../utils/isMobile';
import { DefaultWalletOptions, Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export const bloomWallet = ({
  projectId,
  walletConnectParameters,
}: DefaultWalletOptions): Wallet => ({
  id: 'bloomWallet',
  name: 'Bloom Wallet',
  iconBackground: '#000',
  iconAccent: '#000',
  hidden: () => isMobile(),
  iconUrl: async () => (await import('./bloomWallet.svg')).default,
  downloadUrls: {
    qrCode: 'https://bloomwallet.io/',
    windows: 'https://bloomwallet.io/',
    macos: 'https://bloomwallet.io/',
    linux: 'https://bloomwallet.io/',
    desktop: 'https://bloomwallet.io/',
  },
  qrCode: {
    getUri: (uri: string) =>
      `bloom://wallet-connect/wc?uri=${encodeURIComponent(uri)}`,
    instructions: {
      learnMoreUrl: 'https://bloomwallet.io/',
      steps: [
        {
          description: 'wallet_connectors.bloom.qr_code.step1.description',
          step: 'install',
          title: 'wallet_connectors.bloom.qr_code.step1.title',
        },
        {
          description: 'wallet_connectors.bloom.qr_code.step2.description',
          step: 'create',
          title: 'wallet_connectors.bloom.qr_code.step2.title',
        },
        {
          description: 'wallet_connectors.bloom.qr_code.step3.description',
          step: 'refresh',
          title: 'wallet_connectors.bloom.qr_code.step3.title',
        },
      ],
    },
  },
  desktop: {
    getUri: (uri: string) =>
      `bloom://wallet-connect/wc?uri=${encodeURIComponent(uri)}`,
    instructions: {
      learnMoreUrl: 'https://bloomwallet.io/',
      steps: [
        {
          description: 'wallet_connectors.bloom.desktop.step1.description',
          step: 'install',
          title: 'wallet_connectors.bloom.desktop.step1.title',
        },
        {
          description: 'wallet_connectors.bloom.desktop.step2.description',
          step: 'create',
          title: 'wallet_connectors.bloom.desktop.step2.title',
        },
        {
          description: 'wallet_connectors.bloom.desktop.step3.description',
          step: 'refresh',
          title: 'wallet_connectors.bloom.desktop.step3.title',
        },
      ],
    },
  },
  createConnector: getWalletConnectConnector({
    projectId,
    walletConnectParameters,
  }),
});
