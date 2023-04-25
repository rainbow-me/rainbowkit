/* eslint-disable no-console */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import BloctoSDK from '@blocto/sdk';
import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { ConnectorNotFoundError, SwitchChainError } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface BloctoWalletOptions {
  chains: Chain[];
}

declare global {
  interface Window {
    tally: any;
  }
}

export class BloctoConnector extends InjectedConnector {
  readonly ready = typeof window !== 'undefined';
  readonly id = 'blocto';
  readonly name = 'Blocto';

  private blocto: BloctoSDK | any;
  private provider: Window['ethereum'] | undefined;

  #chains: Chain[];
  // Empty constructor so that InjectedConnector doesn't override id/name
  constructor({ chains }: BloctoWalletOptions) {
    super({ chains, options: {} });
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

  private async getBlocto() {
    try {
      if (!this.blocto) {
        console.log('this.chains: ', this.#chains);
        const [defaultChain] = this.#chains ?? [];
        console.log('defaultChain: ', defaultChain);
        this.blocto = new BloctoSDK({
          ethereum: {
            chainId: '0x1',
            rpc: 'https://eth-mainnet.g.alchemy.com/v2/',
          },
          appId: '5d35c67e-7f37-4e4c-81ba-e7fafc92fd0a',
        });
      }
      return this.blocto;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async getProvider() {
    const blocto = await this.getBlocto();
    if (!blocto) throw new ConnectorNotFoundError();
    if (!this.provider) {
      this.provider = blocto.ethereum as unknown as Window['ethereum'];
    }
    if (!this.provider) throw new ConnectorNotFoundError();

    return this.provider;
  }

  async getAccount() {
    const provider = await this.getProvider();
    if (!provider) throw new ConnectorNotFoundError();
    const accounts = await provider.request({
      method: 'eth_requestAccounts',
    });
    return accounts[0];
  }

  /**
   * @see https://github.com/tmm/wagmi/blob/fc94210b67daa91aa164625dfe189d5b6c2f92d4/packages/core/src/connectors/injected.ts#L179
   */
  async switchChain(chainId: number) {
    console.log('chainId: ', chainId);
    try {
      const chain = this.#chains.find(x => x.id === chainId) ?? {
        id: chainId,
        name: `Chain ${chainId}`,
        network: `${chainId}`,
        rpcUrls: { default: '' },
      };
      console.log('chain: ', chain);
      const provider = await this.getProvider();
      if (!provider) throw new ConnectorNotFoundError();
      const params = { chainId, rpcUrls: chain.rpcUrls.infura.http };
      console.log('params: ', params);
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [params],
      });

      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
      console.log('chain: ', chain);
      return chain;
    } catch (error) {
      console.log('error----: ', error);
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
