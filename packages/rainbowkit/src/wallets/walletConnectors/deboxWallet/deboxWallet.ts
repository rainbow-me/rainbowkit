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

export type DeBoxWalletOptions = DefaultWalletOptions;

export const deboxWallet = ({
  projectId,
  walletConnectParameters,
}: DeBoxWalletOptions): Wallet => {
  // DeBox ships an in-app browser. When a dapp runs inside it, the provider is
  // injected as `window.ethereum` with an `isDeBox` flag. The same flag is used
  // on every platform, so there is no desktop/mobile split here.
  const isDeBoxInjected = hasInjectedProvider({ flag: 'isDeBox' });
  const shouldUseWalletConnect = !isDeBoxInjected;

  const getUriMobile = (uri: string) => {
    return `debox://wc?uri=${encodeURIComponent(uri)}`;
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
        learnMoreUrl: 'https://debox.pro/',
        steps: [
          {
            description: 'wallet_connectors.debox.qr_code.step1.description',
            step: 'install' as InstructionStepName,
            title: 'wallet_connectors.debox.qr_code.step1.title',
          },
          {
            description: 'wallet_connectors.debox.qr_code.step2.description',
            step: 'create' as InstructionStepName,
            title: 'wallet_connectors.debox.qr_code.step2.title',
          },
          {
            description: 'wallet_connectors.debox.qr_code.step3.description',
            step: 'scan' as InstructionStepName,
            title: 'wallet_connectors.debox.qr_code.step3.title',
          },
        ],
      },
    };
  }

  return {
    id: 'debox',
    name: 'DeBox',
    rdns: 'com.debox.wallet',
    iconUrl: async () => (await import('./deboxWallet.svg')).default,
    // Never resolve `installed` to `false`: DeBox falls back to WalletConnect
    // when the dapp is opened outside of its in-app browser.
    installed: isDeBoxInjected || undefined,
    iconAccent: '#21C161',
    iconBackground: '#21C161',
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=com.tm.security.wallet',
      ios: 'https://apps.apple.com/app/id6444485220',
      mobile: 'https://debox.pro/download',
      qrCode: 'https://debox.pro/download',
    },
    mobile: mobileConnector,
    qrCode: qrConnector,
    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : getInjectedConnector({ flag: 'isDeBox' }),
  };
};
