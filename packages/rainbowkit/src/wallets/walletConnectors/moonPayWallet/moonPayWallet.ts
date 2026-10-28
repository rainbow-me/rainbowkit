import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type {
  DefaultWalletOptions,
  InstructionStepName,
  Wallet,
} from '../../Wallet';

export type MoonPayWalletOptions = DefaultWalletOptions;

export const moonPayWallet = ({
  projectId,
  walletConnectParameters,
}: MoonPayWalletOptions): Wallet => {
  const isMoonPayInjected = hasInjectedProvider({ flag: 'isMoonPay' });
  const shouldUseWalletConnect = !isMoonPayInjected;

  const getUriMobile = (uri: string) => {
    return `moonpay://wc?uri=${encodeURIComponent(uri)}`;
  };

  const getUriQR = (uri: string) => {
    return uri;
  };

  const mobileConnector = {
    getUri: shouldUseWalletConnect ? getUriMobile : undefined,
  };

  let qrConnector: Wallet['qrCode'];

  if (shouldUseWalletConnect) {
    qrConnector = {
      getUri: getUriQR,
      instructions: {
        learnMoreUrl: 'https://www.moonpay.com/',
        steps: [
          {
            description: 'wallet_connectors.moonpay.qr_code.step1.description',
            step: 'install' as InstructionStepName,
            title: 'wallet_connectors.moonpay.qr_code.step1.title',
          },
          {
            description: 'wallet_connectors.moonpay.qr_code.step2.description',
            step: 'create' as InstructionStepName,
            title: 'wallet_connectors.moonpay.qr_code.step2.title',
          },
          {
            description: 'wallet_connectors.moonpay.qr_code.step3.description',
            step: 'scan' as InstructionStepName,
            title: 'wallet_connectors.moonpay.qr_code.step3.title',
          },
        ],
      },
    };
  }

  return {
    id: 'moonpay',
    name: 'MoonPay',
    rdns: 'com.moonpay',
    iconUrl: async () => (await import('./moonPayWallet.svg')).default,
    // Never resolve `installed` to `false`: MoonPay falls back to
    // WalletConnect when no injected provider is present.
    installed: isMoonPayInjected || undefined,
    iconAccent: '#7D00FF',
    iconBackground: '#7D00FF',
    downloadUrls: {
      android: 'https://play.google.com/store/apps/details?id=com.moonpay',
      ios: 'https://apps.apple.com/app/moonpay/id1635031432',
      mobile: 'https://moonpay.onelink.me/O2ia',
      qrCode: 'https://moonpay.onelink.me/O2ia',
    },
    mobile: mobileConnector,
    qrCode: qrConnector,
    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : getInjectedConnector({ flag: 'isMoonPay' }),
  };
};
