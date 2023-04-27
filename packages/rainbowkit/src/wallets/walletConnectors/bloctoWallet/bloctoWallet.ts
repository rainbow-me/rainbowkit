/* eslint-disable sort-keys-fix/sort-keys-fix */
import BloctoSDK from '@blocto/sdk';
import { ConnectorNotFoundError, SwitchChainError } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface BloctoWalletOptions {
  chains: Chain[];
}

declare global {
  interface Window {
    blocto: BloctoSDK;
  }
}
export class BloctoConnector extends InjectedConnector {
  readonly ready = typeof window !== 'undefined';
  readonly id = 'blocto';
  readonly name = 'Blocto';

  private blocto: BloctoSDK | any;
  private provider: Window['ethereum'] | undefined;

  #chains: Chain[];

  constructor({ chains }: BloctoWalletOptions) {
    super({
      chains,
      options: {
        getProvider: () => {
          const getBlocto = (blocto?: any) =>
            blocto?.isBlocto ? blocto : undefined;
          if (typeof window === 'undefined') return;
          return getBlocto(window.blocto);
        },
      },
    });
    this.#chains = chains;
  }

  async connect() {
    const res = super.connect();
    const blocto = await this.getBlocto();
    if (!blocto) throw new ConnectorNotFoundError();
    blocto?.ethereum?.enable();
    return res;
  }

  async disconnect() {
    super.disconnect();
    const blocto = await this.getBlocto();
    if (!blocto) throw new ConnectorNotFoundError();
    await blocto?.ethereum?.request({ method: 'wallet_disconnect' });
  }
  async getBlocto() {
    if (!this.blocto) {
      const [defaultChain] = this.#chains ?? [];
      this.blocto = new BloctoSDK({
        ethereum: {
          chainId: defaultChain.id,
          rpc: defaultChain.rpcUrls?.default?.http[0],
        },
      });
    }
    return this.blocto;
  }
  async getProvider() {
    const blocto = this.blocto ?? (await this.getBlocto());
    if (!this.provider) {
      this.provider = blocto.ethereum as unknown as Window['ethereum'];
    }
    return this.provider;
  }

  async getAccount() {
    const blocto = await this.getBlocto();
    if (!blocto) throw new ConnectorNotFoundError();
    const accounts = await blocto?.ethereum?.request({
      method: 'eth_requestAccounts',
    });
    return accounts[0];
  }

  /**
   * @see https://github.com/tmm/wagmi/blob/fc94210b67daa91aa164625dfe189d5b6c2f92d4/packages/core/src/connectors/injected.ts#L179
   */
  async switchChain(chainId: number) {
    const chain = this.#chains.find(x => x.id === chainId) ?? {
      id: chainId,
      name: `Chain ${chainId}`,
      network: `${chainId}`,
      rpcUrls: { default: '' },
    };
    const provider = await this.getProvider();
    if (!provider) throw new ConnectorNotFoundError();
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId,
            rpcUrls: [chain.rpcUrls?.default?.http[0]],
          },
        ],
      });
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
      const listeners = provider?.eventListeners?.chainChanged;
      listeners[0](chainId);
      listeners[1]();
      return chain;
    } catch (error) {
      throw new SwitchChainError(error);
    }
  }
}

export const bloctoWallet = ({ chains }: BloctoWalletOptions): Wallet => ({
  id: 'blocto',
  name: 'Blocto',
  iconBackground: '#ffffff',
  iconUrl: async () => (await import('./bloctoWallet.svg')).default,
  downloadUrls: {
    ios: 'https://apps.apple.com/app/blocto/id1481181682',
    android: 'https://play.google.com/store/apps/details?id=com.portto.blocto',
  },
  installed: true,
  closeModalOnConnecting: true,
  createConnector: () => {
    const connector = new BloctoConnector({ chains });
    return {
      connector,
    };
  },
});
