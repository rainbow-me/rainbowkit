import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { InstructionStepName, Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type { WalletConnectConnectorOptions } from '../../getWalletConnectConnector';

export interface HyperPlayWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const hyperPlayWallet = ({
  chains,
  projectId,
  ...options
}: HyperPlayWalletOptions & InjectedConnectorOptions): Wallet => {
  // check if MetaMask is installed, else use WalletConnect
  const shouldUseWalletConnect = window.ethereum?.isMetaMask ? false : true;

  return {
    id: 'hyperplay',
    name: 'HyperPlay',
    iconUrl: async () => (await import('./hyperPlayWallet.svg')).default,
    iconAccent: '#661ae3',
    iconBackground: '#661ae3',
    downloadUrls: {
      mobile: 'https://www.hyperplay.xyz/downloads',
      qrCode: 'https://www.hyperplay.xyz/downloads',
      chrome: 'https://www.hyperplay.xyz/downloads',
      browserExtension: 'https://www.hyperplay.xyz/downloads',
    },
    createConnector: () => {
      const getUriQR = async () => await getWalletConnectUri(connector, '2');

      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({
            projectId,
            chains,
            version: '2',
          })
        : new InjectedConnector({
            chains,
            options: { getProvider: () => window.ethereum, ...options },
          });

      const mobileConnector = {
        getUri: shouldUseWalletConnect ? getUriQR : undefined,
      };

      let qrConnector = undefined;

      const instructions = {
        learnMoreUrl: 'https://docs.hyperplay.xyz/',
        steps: [
          {
            description:
              "We recommend connecting your wallet to HyperPlay's launcher",
            step: 'install' as InstructionStepName,
            title: 'Install the HyperPlay',
          },
          {
            description:
              'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
            step: 'create' as InstructionStepName,
            title: 'Create or Import a Wallet',
          },
          {
            description:
              'Once you set up your wallet, click below to refresh the browser and load up the extension.',
            step: 'refresh' as InstructionStepName,
            title: 'Refresh your browser',
          },
        ],
      };

      if (shouldUseWalletConnect) {
        qrConnector = {
          getUri: getUriQR,
          instructions,
        };
      }

      return {
        connector,
        mobile: mobileConnector,
        qrCode: qrConnector,
        extension: { instructions },
      };
    },
  };
};
