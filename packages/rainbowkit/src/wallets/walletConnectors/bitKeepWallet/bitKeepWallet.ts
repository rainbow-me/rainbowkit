import type { InjectedConnectorOptions } from '@wagmi/core';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
export interface bitKeepWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

declare global {
  interface Window {
    bitkeep: any;
  }
}

class BitkeepConnector extends InjectedConnector {
  id: string;
  ready: boolean;
  provider: NonNullable<typeof window['ethereum']>;
  constructor({ chains = [], options_ = {} }: InjectedConnectorOptions) {
    const options = {
      name: 'BitKeep',
      ...options_,
    };
    super({ chains, options });

    this.id = 'Bitkeep';
    this.ready =
      typeof window != 'undefined' &&
      !!this.findProvider(window?.bitkeep?.ethereum);
  }
  async getProvider() {
    if (typeof window !== 'undefined') {
      // TODO: Fallback to `ethereum#initialized` event for async injection
      // https://github.com/BitKeep/detect-provider#synchronous-and-asynchronous-injection=
      this.provider = window.bitkeep?.ethereum;
    }
    return this.provider;
  }
  getReady(ethereum: NonNullable<typeof window['ethereum']>) {
    if (!ethereum.isBitKeep || !ethereum) return;
    // Brave tries to make itself look like BitKeep
    // Could also try RPC `web3_clientVersion` if following is unreliable
    if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state) return;
    if (ethereum.isTokenPocket) return;
    if (ethereum.isTokenary) return;
    return ethereum;
  }
  findProvider(ethereum: NonNullable<typeof window['ethereum']>) {
    if (ethereum?.providers) return ethereum.providers.find(this.getReady);
    return this.getReady(ethereum);
  }
}

function isBitKeep(ethereum: NonNullable<typeof window['ethereum']>) {
  // Logic borrowed from wagmi's bitKeepConnector
  // https://github.com/tmm/wagmi/blob/main/packages/core/src/connectors/bitKeep.ts
  const isBitKeep = Boolean(ethereum.isBitKeep);

  if (!isBitKeep) {
    return false;
  }

  // Brave tries to make itself look like bitKeep
  // Could also try RPC `web3_clientVersion` if following is unreliable
  if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state) {
    return false;
  }

  if (ethereum.isTokenPocket) {
    return false;
  }

  if (ethereum.isTokenary) {
    return false;
  }

  return true;
}

export const bitKeepWallet = ({
  chains,
  shimDisconnect,
}: bitKeepWalletOptions): Wallet => {
  const isBitKeepInjected =
    typeof window !== 'undefined' &&
    typeof window.bitkeep !== 'undefined' &&
    typeof window.bitkeep.ethereum !== 'undefined' &&
    isBitKeep(window.bitkeep.ethereum);

  const shouldUseWalletConnect = !isBitKeepInjected;
  return {
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({ chains })
        : new BitkeepConnector({
            chains,
            options: { shimDisconnect },
          });

      const getUri = async () => {
        const { uri } = (await connector.getProvider()).connector;
        return isAndroid()
          ? `bitkeep://?action=connect&connectType=wc&value=${encodeURIComponent(
              uri
            )}`
          : `https://bkcode.vip?value=${encodeURIComponent(uri)}`;
      };
      return {
        connector,
        extension: {
          instructions: {
            steps: [
              {
                description:
                  'We recommend pinning BitKeep to your taskbar for quicker access to your wallet.',
                step: 'install',
                title: 'Install the BitKeep extension',
              },
              {
                description:
                  'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
                step: 'create',
                title: 'Create or Import a Wallet',
              },
              {
                description:
                  'Once you set up your wallet, click below to refresh the browser and load up the extension.',
                step: 'refresh',
                title: 'Refresh your browser',
              },
            ],
          },
          learnMoreUrl: 'https://study.bitkeep.com',
        },
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri,
              instructions: {
                learnMoreUrl: 'https://study.bitkeep.com',
                steps: [
                  {
                    description:
                      'We recommend putting BitKeep on your home screen for quicker access.',
                    step: 'install',
                    title: 'Open the BitKeep app',
                  },
                  {
                    description:
                      'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
                    step: 'create',
                    title: 'Create or Import a Wallet',
                  },
                  {
                    description:
                      'After you scan, a connection prompt will appear for you to connect your wallet.',
                    step: 'scan',
                    title: 'Tap the scan button',
                  },
                ],
              },
            }
          : undefined,
      };
    },
    downloadUrls: {
      android: 'https://bitkeep.com/en/download?type=2',
      browserExtension:
        'https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak',
      ios: 'https://apps.apple.com/app/bitkeep/id1395301115',
      qrCode: 'https://bitkeep.com/en/download',
    },
    iconAccent: '#f6851a',
    iconBackground: '#fff',
    iconUrl: async () => (await import('./bitKeepWallet.svg')).default,
    id: 'bitKeep',
    installed: !shouldUseWalletConnect ? isBitKeepInjected : undefined,
    name: 'bitKeep',
  };
};
