import { providers } from 'ethers';
import { getAddress, hexValue } from 'ethers/lib/utils';
import { Connector } from 'wagmi';
import { ConnectorOptions, Tally } from './types';

declare global {
  interface Window {
    tally: any;
  }
}

export default class TallyHoConnector extends Connector<
  Tally | undefined,
  ConnectorOptions,
  providers.JsonRpcSigner
> {
  readonly id: string = 'tallyHo';
  readonly name: string = 'TallyHo';
  readonly ready = typeof window != 'undefined' && window.tally;

  #provider?: Tally;
  #switchingChains?: boolean;
  #UNSTABLE_shimOnConnectSelectAccount: ConnectorOptions['UNSTABLE_shimOnConnectSelectAccount'];

  async connect({ chainId }: { chainId?: number } = {}) {
    try {
      const provider = await this.getProvider();
      if (!provider) throw new Error();

      if (provider.on) {
        provider.on('accountsChanged', this.onAccountsChanged);
        provider.on('chainChanged', this.onChainChanged);
        provider.on('disconnect', this.onDisconnect);
      }

      this.emit('message', { type: 'connecting' });

      // Attempt to show wallet select prompt with `wallet_requestPermissions` when
      // `shimDisconnect` is active and account is in disconnected state (flag in storage)
      if (
        this.#UNSTABLE_shimOnConnectSelectAccount &&
        this.options?.shimDisconnect
      ) {
        const accounts = await provider
          .request({
            method: 'eth_accounts',
          })
          .catch(() => []);
        const isConnected = !!accounts[0];
        if (isConnected)
          await provider.request({
            method: 'wallet_requestPermissions',
            params: [{ eth_accounts: {} }],
          });
      }

      const account = await this.getAccount();
      // Switch to chain if provided
      let id = await this.getChainId();

      let unsupported = this.isChainUnsupported(id);
      if (chainId && id !== chainId) {
        const chain = await this.switchChain(chainId);
        id = chain.id;
        unsupported = this.isChainUnsupported(id);
      }

      return { account, chain: { id, unsupported }, provider };
    } catch (error) {
      throw new Error();
    }
  }

  async getProvider() {
    if (!this.#provider) {
      this.#provider = window.tally;
    }
    return this.#provider;
  }

  protected onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) this.emit('disconnect');
    else this.emit('change', { account: getAddress(accounts[0] as string) });
  };

  protected onChainChanged = (chainId: number | string) => {
    const id = normalizeChainId(chainId);
    const unsupported = this.isChainUnsupported(id);
    this.emit('change', { chain: { id, unsupported } });
  };

  protected onDisconnect = () => {
    // We need this as MetaMask can emit the "disconnect" event
    // upon switching chains. This workaround ensures that the
    // user currently isn't in the process of switching chains.
    if (this.options?.shimChainChangedDisconnect && this.#switchingChains) {
      this.#switchingChains = false;
      return;
    }
    this.emit('disconnect');
    // Remove shim signalling wallet is disconnected
  };

  async disconnect() {
    const provider = await this.getProvider();
    if (!provider?.removeListener) return;

    provider.removeListener('accountsChanged', this.onAccountsChanged);
    provider.removeListener('chainChanged', this.onChainChanged);
    provider.removeListener('disconnect', this.onDisconnect);
  }

  async getAccount() {
    const provider = await this.getProvider();
    if (!provider) throw new Error('bad provider');
    const accounts = await provider.request({
      method: 'eth_requestAccounts',
    });
    // return checksum address
    return getAddress(accounts[0] as string);
  }

  async getChainId() {
    const provider = await this.getProvider();
    if (!provider) throw new Error();
    return await provider
      .request({ method: 'eth_chainId' })
      .then(normalizeChainId);
  }

  async switchChain(chainId: number) {
    if (this.options?.shimChainChangedDisconnect) this.#switchingChains = true;

    const provider = await this.getProvider();
    if (!provider) throw new Error();
    const id = hexValue(chainId);

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: id }],
      });
      return (
        this.chains.find(x => x.id === chainId) ?? {
          id: chainId,
          name: `Chain ${id}`,
          network: `${id}`,
          rpcUrls: { default: '' },
        }
      );
    } catch (error) {
      const chain = this.chains.find(x => x.id === chainId);
      if (!chain) throw new Error();

      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              blockExplorerUrls: this.getBlockExplorerUrls(chain),
              chainId: id,
              chainName: chain.name,
              nativeCurrency: chain.nativeCurrency,
              rpcUrls: [chain.rpcUrls.public ?? chain.rpcUrls.default],
            },
          ],
        });
        return chain;
      } catch (e) {
        throw new Error();
      }
    }
  }

  async getSigner({ chainId }: { chainId?: number } = {}) {
    const [provider, account] = await Promise.all([
      this.getProvider(),
      this.getAccount(),
    ]);
    return new providers.Web3Provider(
      provider as providers.ExternalProvider,
      chainId
    ).getSigner(account);
  }

  async isAuthorized() {
    try {
      const provider = await this.getProvider();
      if (!provider) throw new Error();
      const accounts = await provider.request({
        method: 'eth_accounts',
      });
      const account = accounts[0];
      return !!account;
    } catch {
      return false;
    }
  }

  protected isChainUnsupported(chainId: number) {
    return !this.chains.some(x => x.id === chainId);
  }

  protected isUserRejectedRequestError(error: any) {
    return error?.code === 4001;
  }
}

export function normalizeChainId(chainId: string | number | bigint) {
  if (typeof chainId === 'string')
    return Number.parseInt(
      chainId,
      chainId.trim().substring(0, 2) === '0x' ? 16 : 10
    );
  if (typeof chainId === 'bigint') return Number(chainId);
  return chainId;
}
