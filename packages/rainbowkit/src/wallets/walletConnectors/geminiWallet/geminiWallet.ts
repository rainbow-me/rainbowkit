import { GeminiWalletProvider } from '@gemini-wallet/core';
import {
  ChainNotConfiguredError,
  type CreateConnectorFn,
  createConnector,
} from 'wagmi';
import {
  type Address,
  getAddress,
  type Hex,
  numberToHex,
  UserRejectedRequestError,
} from 'viem';
import type { Wallet, WalletDetailsParams } from '../../Wallet';

export interface GeminiWalletOptions {
  appName: string;
  appIcon?: string;
}

export const geminiWallet = ({
  appName,
  appIcon,
}: GeminiWalletOptions): Wallet => {
  return {
    id: 'gemini',
    name: 'Gemini Wallet',
    shortName: 'Gemini',
    rdns: 'com.gemini.wallet',
    iconUrl: async () => (await import('./geminiWallet.svg')).default,
    iconAccent: '#1FC4DF',
    iconBackground: '#1FC4DF',
    installed: true,
    downloadUrls: {
      browserExtension: 'https://keys.gemini.com',
      qrCode: 'https://keys.gemini.com',
    },
    mobile: {
      getUri: (uri: string) => uri,
    },
    qrCode: {
      getUri: (uri: string) => uri,
      instructions: {
        learnMoreUrl: 'https://keys.gemini.com',
        steps: [
          {
            description: 'wallet_connectors.gemini.qr_code.step1.description',
            step: 'install',
            title: 'wallet_connectors.gemini.qr_code.step1.title',
          },
          {
            description: 'wallet_connectors.gemini.qr_code.step2.description',
            step: 'create',
            title: 'wallet_connectors.gemini.qr_code.step2.title',
          },
          {
            description: 'wallet_connectors.gemini.qr_code.step3.description',
            step: 'scan',
            title: 'wallet_connectors.gemini.qr_code.step3.title',
          },
        ],
      },
    },
    extension: {
      instructions: {
        learnMoreUrl: 'https://keys.gemini.com',
        steps: [
          {
            description: 'wallet_connectors.gemini.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.gemini.extension.step1.title',
          },
          {
            description: 'wallet_connectors.gemini.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.gemini.extension.step2.title',
          },
          {
            description: 'wallet_connectors.gemini.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.gemini.extension.step3.title',
          },
        ],
      },
    },
    createConnector: (walletDetails: WalletDetailsParams) => {
      const connector: CreateConnectorFn =
        createConnector<GeminiWalletProvider>((config) => {
          let provider: GeminiWalletProvider | undefined;
          let accountsChanged: ((accounts: string[]) => void) | undefined;
          let chainChanged: ((chainId: string) => void) | undefined;
          let disconnect: ((error?: Error) => void) | undefined;

          const getProvider = () => {
            if (!provider) {
              const chain = config.chains[0];

              provider = new GeminiWalletProvider({
                appMetadata: {
                  icon: appIcon,
                  name: appName,
                },
                chain: {
                  id: chain?.id ?? 42161,
                  rpcUrl: chain?.rpcUrls.default.http[0],
                },
                onDisconnectCallback: () => config.emitter.emit('disconnect'),
              });
            }

            return provider;
          };

          return {
            id: 'gemini',
            name: 'Gemini Wallet',
            rdns: 'com.gemini.wallet',
            type: 'gemini',
            async connect({ chainId } = {}) {
              const provider = getProvider();

              try {
                const accounts = (
                  (await provider.request({
                    method: 'eth_requestAccounts',
                  })) as string[]
                ).map((account) => getAddress(account as Address));
                let currentChainId = await this.getChainId();

                if (chainId && currentChainId !== chainId) {
                  const chain = await this.switchChain!({ chainId });
                  currentChainId = chain.id;
                }

                if (!accountsChanged) {
                  accountsChanged = this.onAccountsChanged.bind(this);
                  provider.on('accountsChanged', accountsChanged);
                }
                if (!chainChanged) {
                  chainChanged = this.onChainChanged.bind(this);
                  provider.on('chainChanged', chainChanged);
                }
                if (!disconnect) {
                  disconnect = this.onDisconnect.bind(this);
                  provider.on('disconnect', disconnect);
                }

                return { accounts: accounts as never, chainId: currentChainId };
              } catch (error) {
                if (
                  /(user closed modal|user denied account|request rejected|cancelled)/i.test(
                    (error as Error).message,
                  )
                ) {
                  throw new UserRejectedRequestError(error as Error);
                }
                throw error;
              }
            },
            async disconnect() {
              const provider = getProvider();

              if (accountsChanged) {
                provider.removeListener('accountsChanged', accountsChanged);
                accountsChanged = undefined;
              }
              if (chainChanged) {
                provider.removeListener('chainChanged', chainChanged);
                chainChanged = undefined;
              }
              if (disconnect) {
                provider.removeListener('disconnect', disconnect);
                disconnect = undefined;
              }

              await provider.disconnect();
            },
            async getAccounts() {
              const provider = getProvider();
              return (
                (await provider.request({
                  method: 'eth_accounts',
                })) as string[]
              ).map((account) => getAddress(account as Address));
            },
            async getChainId() {
              const provider = getProvider();
              const chainId = (await provider.request({
                method: 'eth_chainId',
              })) as Hex;
              return Number(chainId);
            },
            async getProvider() {
              return getProvider();
            },
            async isAuthorized() {
              try {
                const accounts = await this.getAccounts();
                return accounts.length > 0;
              } catch {
                return false;
              }
            },
            async switchChain({ chainId }) {
              const provider = getProvider();
              const chain = config.chains.find((chain) => chain.id === chainId);
              if (!chain) throw new ChainNotConfiguredError();

              await provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: numberToHex(chainId) }],
              });

              return chain;
            },
            onAccountsChanged(accounts) {
              if (accounts.length === 0) {
                this.onDisconnect();
                return;
              }

              config.emitter.emit('change', {
                accounts: accounts.map((account) =>
                  getAddress(account as Address),
                ),
              });
            },
            onChainChanged(chainId) {
              config.emitter.emit('change', {
                chainId: Number(chainId),
              });
            },
            onDisconnect() {
              const provider = getProvider();

              if (accountsChanged) {
                provider.removeListener('accountsChanged', accountsChanged);
                accountsChanged = undefined;
              }
              if (chainChanged) {
                provider.removeListener('chainChanged', chainChanged);
                chainChanged = undefined;
              }
              if (disconnect) {
                provider.removeListener('disconnect', disconnect);
                disconnect = undefined;
              }

              config.emitter.emit('disconnect');
            },
          };
        });

      return createConnector((config) => ({
        ...connector(config),
        ...walletDetails,
      }));
    },
  };
};
