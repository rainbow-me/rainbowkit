import type { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export const anchorageDigitalWallet = (): Wallet => ({
  id: 'anchorageDigital',
  name: 'Anchorage Digital',
  rdns: 'com.anchorage.connect',
  iconUrl: async () => (await import('./anchorageDigitalWallet.svg')).default,
  iconAccent: '#FFFFFF',
  iconBackground: '#000000',
  installed: hasInjectedProvider({ flag: 'isAnchorageDigital' }),
  downloadUrls: {
    chrome:
      'https://chromewebstore.google.com/detail/anchorage-digital/fadcgekaahkbmhjnpdhldednpbfpmkfl',
    ios: 'https://apps.apple.com/us/app/anchorage-digital/id6754656781',
    mobile: 'https://apps.apple.com/us/app/anchorage-digital/id6754656781',
    qrCode: 'https://apps.apple.com/us/app/anchorage-digital/id6754656781',
  },
  extension: {
    instructions: {
      learnMoreUrl: 'https://www.anchorage.com',
      steps: [
        {
          description:
            'wallet_connectors.anchorage_digital.extension.step1.description',
          step: 'install',
          title: 'wallet_connectors.anchorage_digital.extension.step1.title',
        },
        {
          description:
            'wallet_connectors.anchorage_digital.extension.step2.description',
          step: 'scan',
          title: 'wallet_connectors.anchorage_digital.extension.step2.title',
        },
        {
          description:
            'wallet_connectors.anchorage_digital.extension.step3.description',
          step: 'refresh',
          title: 'wallet_connectors.anchorage_digital.extension.step3.title',
        },
      ],
    },
  },
  createConnector: getInjectedConnector({ flag: 'isAnchorageDigital' }),
});
