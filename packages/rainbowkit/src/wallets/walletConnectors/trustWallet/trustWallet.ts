import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { isMobile } from '../../../utils/isMobile';
import { InstructionStepName, Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type {
  WalletConnectConnectorOptions,
  WalletConnectLegacyConnectorOptions,
} from '../../getWalletConnectConnector';

declare global {
  interface Window {
    trustwallet: Window['ethereum'];
  }
}

export interface TrustWalletLegacyOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion: '1';
  walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}

export interface TrustWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const trustWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = '2',
  ...options
}: (TrustWalletLegacyOptions | TrustWalletOptions) &
  InjectedConnectorOptions): Wallet => {
  const isTrustWalletInjected = isMobile()
    ? hasInjectedProvider('isTrust')
    : hasInjectedProvider('isTrustWallet');
  const shouldUseWalletConnect = !isTrustWalletInjected;

  return {
    id: 'trust',
    name: 'Trust Wallet',
    iconUrl: async () => (await import('./trustWallet.svg')).default,
    // Note that we never resolve `installed` to `false` because the
    // Trust Wallet provider falls back to other connection methods if
    // the injected connector isn't available
    installed: isTrustWalletInjected || undefined,
    iconAccent: '#3375BB',
    iconBackground: '#fff',
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp',
      ios: 'https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409',
      mobile: 'https://trustwallet.com/download',
      qrCode: 'https://trustwallet.com/download',
      chrome:
        'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph',
      browserExtension: 'https://trustwallet.com/browser-extension',
    },
    createConnector: () => {
      const getUriMobile = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);

        return `trust://wc?uri=${encodeURIComponent(uri)}`;
      };

      const getUriQR = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);

        return uri;
      };

      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({
            projectId,
            chains,
            version: walletConnectVersion,
            options: walletConnectOptions,
          })
        : isMobile()
        ? getInjectedConnector({ flag: 'isTrust', chains, options })
        : getInjectedConnector({ flag: 'isTrustWallet', chains, options });

      const mobileConnector = {
        getUri: shouldUseWalletConnect ? getUriMobile : undefined,
      };

      let qrConnector = undefined;

      if (shouldUseWalletConnect) {
        qrConnector = {
          getUri: getUriQR,
          instructions: {
            learnMoreUrl: 'https://trustwallet.com/',
            steps: [
              {
                description:
                  'wallet_connectors.trust.qr_code.step1.description',
                step: 'install' as InstructionStepName,
                title: 'wallet_connectors.trust.qr_code.step1.title',
              },
              {
                description:
                  'wallet_connectors.trust.qr_code.step2.description',
                step: 'create' as InstructionStepName,
                title: 'wallet_connectors.trust.qr_code.step2.title',
              },
              {
                description:
                  'wallet_connectors.trust.qr_code.step3.description',
                step: 'scan' as InstructionStepName,
                title: 'wallet_connectors.trust.qr_code.step3.title',
              },
            ],
          },
        };
      }

      const extensionConnector = {
        instructions: {
          learnMoreUrl: 'https://trustwallet.com/browser-extension',
          steps: [
            {
              description:
                'wallet_connectors.trust.extension.step1.description',
              step: 'install' as InstructionStepName,
              title: 'wallet_connectors.trust.extension.step1.title',
            },
            {
              description:
                'wallet_connectors.trust.extension.step2.description',
              step: 'create' as InstructionStepName,
              title: 'wallet_connectors.trust.extension.step2.title',
            },
            {
              description:
                'wallet_connectors.trust.extension.step3.description',
              step: 'refresh' as InstructionStepName,
              title: 'wallet_connectors.trust.extension.step3.title',
            },
          ],
        },
      };

      return {
        connector,
        mobile: mobileConnector,
        qrCode: qrConnector,
        extension: extensionConnector,
      };
    },
  };
};
