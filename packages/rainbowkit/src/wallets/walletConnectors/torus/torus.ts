import Torus from '@toruslabs/torus-embed';
import { ConnectorNotFoundError } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface TorusConnectorArguments {
  chainId: number;
  loginOptions?: any;
}

export interface TorusOptions {
  chains: Chain[];
}

export const torus = ({ chains }: TorusOptions): Wallet => {
  return {
    createConnector: () => {
      const connector = new TorusConnector({ chains });

      return {
        connector,
      };
    },
    iconBackground: '#0c64fc',
    iconUrl: async () => (await import('./torus.svg')).default,
    id: 'torus',
    installed: true,
    name: 'Torus',
    shouldCloseModalOnConnecting: true,
  };
};

export class TorusConnector extends InjectedConnector {
  readonly ready = typeof window != 'undefined';
  readonly id = 'torus';
  readonly name = 'Torus';

  private torus: Torus | undefined;
  private provider: Window['ethereum'] | undefined;

  // Empty constructor so that InjectedConnector doesn't override id/name
  constructor({ chains }: { chains: Chain[] }) {
    super({ chains, options: {} });
  }

  async connect() {
    const res = super.connect();
    (await this.getTorus()).login();
    return res;
  }

  async disconnect() {
    super.disconnect();
    (await this.getTorus()).cleanUp();
  }

  private async getTorus() {
    if (!this.torus) {
      this.torus = new Torus();
      if (!this.torus) throw new ConnectorNotFoundError();

      const [defaultChain] = this.chains;

      await this.torus.init({
        network: {
          chainId: defaultChain.id,
          host: defaultChain.network,
          networkName: defaultChain.name,
        },
        showTorusButton: false,
      });
    }

    return this.torus;
  }

  /**
   * Available after torus.init() — implements MetaMask's window.ethereum spec
   *
   * @see https://docs.tor.us/wallet/api-reference/ethereum-api#ethereum
   */
  async getProvider() {
    const torus = this.torus ?? (await this.getTorus());

    if (!this.provider) {
      this.provider = torus.ethereum as unknown as Window['ethereum'];
    }

    // for TypeScript's benefit
    if (!this.provider) throw new ConnectorNotFoundError();

    return this.provider;
  }

  async getAccount() {
    const provider = await this.getProvider();
    if (!provider) throw new ConnectorNotFoundError();
    const accounts = await provider.request({
      method: 'eth_requestAccounts',
    });
    // return checksum address
    return accounts[0];
  }

  /**
   * @see https://github.com/tmm/wagmi/blob/fc94210b67daa91aa164625dfe189d5b6c2f92d4/packages/core/src/connectors/injected.ts#L179
   */
  async switchChain(chainId: number) {
    const chain = this.chains.find(x => x.id === chainId) ?? {
      id: chainId,
      name: `Chain ${chainId}`,
      network: `${chainId}`,
      rpcUrls: { default: '' },
    };

    (await this.getTorus()).setProvider({
      chainId: chain.id,
      host: chain.network,
      networkName: chain.network,
    });

    return chain;
  }
}
