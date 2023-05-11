/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { InstructionStepName, Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface DefiantWalletOptions {
  chains: Chain[];
}

export const defiantWallet = ({
  chains,
  ...options
}: DefiantWalletOptions & InjectedConnectorOptions): Wallet => {
  const isInjected =
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    window.ethereum.isDefiant === true;

  const shouldUseWalletConnect = !isInjected;

  return {
    id: 'defiant',
    name: 'Defiant',
    iconUrl: async () => (await import('./defiantWallet.svg')).default,
    iconBackground: '#fff',
    installed: isInjected,
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=ar.com.andinasmart.defiant',
      ios: 'https://apps.apple.com/ar/app/defiant-wallet/id1559622756',
      mobile: 'https://defiantapp.tech/',
      qrCode: 'https://defiantapp.tech/',
    },
    createConnector: () => {
      const getUriMobile = async () => {
        const { uri } = (await connector.getProvider()).connector;

        return `https://defiantapp.tech/wc?uri=${encodeURIComponent(uri)}`;
      };

      const getUriQR = async () => {
        const { uri } = (await connector.getProvider()).connector;

        return uri;
      };

      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({ chains })
        : new InjectedConnector({
            chains,
            options: {
              name: 'Defiant',
              getProvider: isInjected ? window.ethereum : undefined,
              ...options,
            },
          });

      const mobileConnector = {
        getUri: shouldUseWalletConnect ? getUriMobile : undefined,
      };

      let qrConnector = undefined;

      if (shouldUseWalletConnect) {
        qrConnector = {
          getUri: getUriQR,
          instructions: {
            learnMoreUrl: 'https://defiantapp.tech/',
            steps: [
              {
                description:
                  'Put Defiant on your home screen for faster access to your wallet.',
                step: 'install' as InstructionStepName,
                title: 'Open the Defiant app',
              },
              {
                description: 'Create a new wallet or import an existing one.',
                step: 'create' as InstructionStepName,
                title: 'Create or Import a Wallet',
              },
              {
                description:
                  'Choose WalletConnect, tap on New Connection, choose wallet and blockchain, then scan the QR code and confirm the prompt to connect.',
                step: 'scan' as InstructionStepName,
                title: 'Tap WalletConnect in Menu',
              },
            ],
          },
        };
      }

      return {
        connector,
        mobile: mobileConnector,
        qrCode: qrConnector,
      };
    },
  };
};
