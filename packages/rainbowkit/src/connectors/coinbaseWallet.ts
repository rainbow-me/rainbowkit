import {
  type CoinbaseWalletProvider,
  type CoinbaseWalletSDK,
} from '@coinbase/wallet-sdk';

import {
  type ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
  getAddress,
  numberToHex,
} from 'viem';
import { ChainNotConfiguredError, Connector, createConnector } from 'wagmi';
import { Evaluate, Mutable, Omit } from '../types/utils';

// Borrowed from wagmi@2.5.22
// https://github.com/wevm/wagmi/blob/72a25ee00a7b6b1b41c1a4825d08440a852f9057/packages/connectors/src/coinbaseWallet.ts#L20

// TODO(@3): Set `enableMobileWalletLink` to `true`
export type CoinbaseWalletParameters = Evaluate<
  Mutable<
    Omit<
      ConstructorParameters<typeof CoinbaseWalletSDK>[0],
      'reloadOnDisconnect' // remove property since TSDoc says default is `true`
    >
  > & {
    /**
     * Fallback Ethereum JSON RPC URL
     * @default ""
     */
    jsonRpcUrl?: string | undefined;
    /**
     * Fallback Ethereum Chain ID
     * @default 1
     */
    chainId?: number | undefined;
    /**
     * Whether or not to reload dapp automatically after disconnect.
     * @default false
     */
    reloadOnDisconnect?: boolean | undefined;
  }
>;

coinbaseWallet.type = 'coinbaseWallet' as const;
export function coinbaseWallet(parameters: CoinbaseWalletParameters) {
  const reloadOnDisconnect = false;

  type Provider = CoinbaseWalletProvider;
  type Properties = {};

  let sdk: CoinbaseWalletSDK | undefined;
  let walletProvider: Provider | undefined;

  let accountsChanged: Connector['onAccountsChanged'] | undefined;
  let chainChanged: Connector['onChainChanged'] | undefined;
  let disconnect: Connector['onDisconnect'] | undefined;

  return createConnector<Provider, Properties>((config) => ({
    id: 'coinbaseWalletSDK',
    name: 'Coinbase Wallet',
    type: coinbaseWallet.type,
    async connect({ chainId } = {}) {
      try {
        const provider = await this.getProvider();
        const accounts = (
          (await provider.request({
            method: 'eth_requestAccounts',
          })) as string[]
        ).map((x) => getAddress(x));

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

        // Switch to chain if provided
        let currentChainId = await this.getChainId();
        if (chainId && currentChainId !== chainId) {
          const chain = await this.switchChain!({ chainId }).catch((error) => {
            if (error.code === UserRejectedRequestError.code) throw error;
            return { id: currentChainId };
          });
          currentChainId = chain?.id ?? currentChainId;
        }

        return { accounts, chainId: currentChainId };
      } catch (error) {
        if (
          /(user closed modal|accounts received is empty|user denied account)/i.test(
            (error as Error).message,
          )
        )
          throw new UserRejectedRequestError(error as Error);
        throw error;
      }
    },
    async disconnect() {
      const provider = await this.getProvider();

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

      provider.disconnect();
      provider.close();
    },
    async getAccounts() {
      const provider = await this.getProvider();
      return (
        await provider.request<string[]>({
          method: 'eth_accounts',
        })
      ).map((x) => getAddress(x));
    },
    async getChainId() {
      const provider = await this.getProvider();
      const chainId = await provider.request<number>({ method: 'eth_chainId' });
      return Number(chainId);
    },
    async getProvider() {
      if (!walletProvider) {
        const { default: CoinbaseWalletSDK } = await import(
          '@coinbase/wallet-sdk'
        );
        let SDK: typeof CoinbaseWalletSDK;
        if (
          typeof CoinbaseWalletSDK !== 'function' &&
          typeof (CoinbaseWalletSDK as { default: typeof CoinbaseWalletSDK })
            .default === 'function'
        ) {
          SDK = (CoinbaseWalletSDK as { default: typeof CoinbaseWalletSDK })
            .default;
        } else {
          SDK = CoinbaseWalletSDK as unknown as typeof CoinbaseWalletSDK;
        }

        sdk = new SDK({ reloadOnDisconnect, ...parameters });

        // Force types to retrieve private `walletExtension` method from the Coinbase Wallet SDK.
        const walletExtensionChainId = (
          sdk as unknown as {
            get walletExtension(): { getChainId(): number } | undefined;
          }
        ).walletExtension?.getChainId();

        const chain =
          config.chains.find((chain) =>
            parameters.chainId
              ? chain.id === parameters.chainId
              : chain.id === walletExtensionChainId,
          ) || config.chains[0];
        const chainId = parameters.chainId || chain?.id;
        const jsonRpcUrl =
          parameters.jsonRpcUrl || chain?.rpcUrls.default.http[0];

        walletProvider = sdk.makeWeb3Provider(jsonRpcUrl, chainId);
      }

      return walletProvider;
    },
    async isAuthorized() {
      try {
        const accounts = await this.getAccounts();
        return !!accounts.length;
      } catch {
        return false;
      }
    },
    async switchChain({ chainId }) {
      const chain = config.chains.find((chain) => chain.id === chainId);
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError());

      const provider = await this.getProvider();
      const chainId_ = numberToHex(chain.id);

      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainId_ }],
        });
        return chain;
      } catch (error) {
        // Indicates chain is not added to provider
        if ((error as ProviderRpcError).code === 4902) {
          try {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: chainId_,
                  chainName: chain.name,
                  nativeCurrency: chain.nativeCurrency,
                  rpcUrls: [chain.rpcUrls.default?.http[0] ?? ''],
                  blockExplorerUrls: [chain.blockExplorers?.default.url],
                },
              ],
            });
            return chain;
          } catch (error) {
            throw new UserRejectedRequestError(error as Error);
          }
        }

        throw new SwitchChainError(error as Error);
      }
    },
    onAccountsChanged(accounts) {
      if (accounts.length === 0) this.onDisconnect();
      else
        config.emitter.emit('change', {
          accounts: accounts.map((x) => getAddress(x)),
        });
    },
    onChainChanged(chain) {
      const chainId = Number(chain);
      config.emitter.emit('change', { chainId });
    },
    async onDisconnect(_error) {
      config.emitter.emit('disconnect');

      const provider = await this.getProvider();
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
    },
  }));
}
