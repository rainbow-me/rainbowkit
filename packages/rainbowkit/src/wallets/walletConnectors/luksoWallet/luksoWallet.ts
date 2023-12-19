
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Chain } from 'wagmi';

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

export const luksoWallet = () => ({
    id: 'Universal Profile',
    name: 'Universal Profile',
    iconUrl: 'https://wallet.universalprofile.cloud/assets/images/up-logo.png',
    iconBackground: '#646eb5',
    downloadUrls: {
      chrome: 'https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en',
    },
    createConnector: () => {
    const connector = new InjectedConnector({
            chains: [LUKSO_TESTNET],
            options: {
                getProvider: () => (typeof window !== 'undefined' && (window as any).lukso ? (window as any).lukso : undefined),
                name: 'Universal Profile',
            },
        },
    );
  
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
  });