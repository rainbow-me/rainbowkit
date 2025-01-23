import { isAndroid } from '../../../utils/isMobile';
import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type BinanceWalletOptions = DefaultWalletOptions;

export const binanceWallet = ({
  projectId,
  walletConnectParameters,
}: BinanceWalletOptions): Wallet => {
  const isBinanceInjected = hasInjectedProvider({
    flag: 'isBinance',
  });
  const shouldUseWalletConnect = !isBinanceInjected;

  return {
    id: 'binance',
    name: 'Binance Wallet',
    rdns: 'com.binance.wallet',
    iconUrl: async () => (await import('./binanceWallet.svg')).default,
    iconBackground: '#000000',
    installed: !shouldUseWalletConnect ? isBinanceInjected : undefined,
    downloadUrls: {
      android: 'https://play.google.com/store/apps/details?id=com.binance.dev',
      ios: 'https://apps.apple.com/us/app/id1436799971',
      mobile: 'https://www.binance.com/en/download',
      qrCode: 'https://www.binance.com/en/web3wallet',
    },
    mobile: shouldUseWalletConnect
      ? {
          getUri: (uri: string) => {
            return isAndroid()
              ? uri
              : `bnc://app.binance.com/cedefi/wc?uri=${encodeURIComponent(
                  uri,
                )}`;
          },
        }
      : undefined,
    qrCode: shouldUseWalletConnect
      ? {
          getUri: (uri: string) => uri,
          instructions: {
            learnMoreUrl: 'https://www.binance.com/en/web3wallet',
            steps: [
              {
                description:
                  'wallet_connectors.binance.qr_code.step1.description',
                step: 'install',
                title: 'wallet_connectors.binance.qr_code.step1.title',
              },
              {
                description:
                  'wallet_connectors.binance.qr_code.step2.description',
                step: 'create',
                title: 'wallet_connectors.binance.qr_code.step2.title',
              },
              {
                description:
                  'wallet_connectors.binance.qr_code.step3.description',
                step: 'scan',
                title: 'wallet_connectors.binance.qr_code.step3.title',
              },
            ],
          },
        }
      : undefined,
    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : getInjectedConnector({
          flag: 'isBinance',
        }),
  };
};
