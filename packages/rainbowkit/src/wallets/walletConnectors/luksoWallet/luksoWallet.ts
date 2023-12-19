import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface LuksoWalletOptions {
  chains: Chain[];
}

export const luksoWallet = ({
  chains,
  ...options
}: LuksoWalletOptions & InjectedConnectorOptions): Wallet => {
  return {
    id: 'lukso',
    name: 'Lukso',
    iconUrl: async () => (await import('./luksoWallet.svg')).default,
    iconBackground: '#646eb5',
    installed:
      (typeof window !== 'undefined' &&
        !!((window as any).lukso as any)?.ethereum) ||
      undefined,
    downloadUrls: {
      chrome: 'https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en',
      firefox: 'https://chromewebstore.google.com/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn',
      browserExtension: 'https://chromewebstore.google.com/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn',
    },
    createConnector: () => {
      const getProvider = () =>
        typeof window !== 'undefined'
          ? ((window as any).lukso as any)?.ethereum
          : undefined;

      const connector = new InjectedConnector({
        chains,
        options: { getProvider, ...options },
      });

      return {
        connector,
        extension: {
          instructions: {
            learnMoreUrl: 'https://universalprofile.cloud/',
            steps: [
              {
                description:
                  'Create your Universal Profile and get ready for a new kind of DApp experience!',
                step: 'install',
                title: 'Install Universal Profile',
              },
              {
                description:
                  'Create new Universal Profile sponsored by Lukso',
                step: 'create',
                title: 'Create Universal Profile',
              },
              {
                description:
                  'Once you set up your wallet, click below to refresh the browser and load up the extension.',
                step: 'refresh',
                title: 'Refresh your browser',
              },
            ],
          },
        },
      };
    },
  };
};


// Lukso chain configuration
const LUKSO_TESTNET: Chain = {
    id: 42,
    name: 'LUKSO',
    network: 'LUKSO',
    nativeCurrency: {
      decimals: 18,
      name: 'LUKSO',
      symbol: 'LYX',
    },
    rpcUrls: {
      default: { http: ['hhttps://rpc.lukso.gateway.fm'] },
      public: { http: ['https://lukso.nownodes.io'] },
    },
    blockExplorers: {
      default: { name: 'Lukso Testnet Explorer', url: 'https://explorer.execution.mainnet.lukso.network/' },
    },
    testnet: true,
  };