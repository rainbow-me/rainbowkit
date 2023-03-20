/* eslint-disable import/no-extraneous-dependencies */
import { ConnectorNotFoundError, Ethereum } from '@wagmi/core';
import { getAddress } from 'ethers/lib/utils';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface EnkryptWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

interface EIP5749ConnectorOptions {
  walletId: string;
  chains: Chain[];
  options: {
    shimDisconnect: boolean | undefined;
  };
}
const detectProvider = (
  walletId: string
): {
  isAvailable: boolean;
  provider?: Ethereum;
} => {
  const isAvailable =
    typeof window !== 'undefined' &&
    typeof (window as any).evmproviders !== 'undefined' &&
    (window as any).evmproviders[walletId]
      ? true
      : false;
  if (isAvailable)
    return {
      isAvailable,
      provider: (window as any).evmproviders[walletId],
    };
  return { isAvailable };
};
class EIP5749Connector extends InjectedConnector {
  walletId: string;
  ready: boolean;
  constructor(options: EIP5749ConnectorOptions) {
    const injectorOptions = {
      getProvider: () =>
        typeof window !== 'undefined' &&
        typeof (window as any).evmproviders !== 'undefined'
          ? (window as any).evmproviders[options.walletId]
          : undefined,
      ...options.options,
    };
    super({
      chains: options.chains,
      options: injectorOptions,
    });
    this.walletId = options.walletId;
    this.ready = detectProvider(this.walletId).isAvailable;
    setTimeout(() => {
      this.ready = detectProvider(this.walletId).isAvailable;
    }, 1000); //Chrome MV3 inject immediate is still not 100% functioning therefor sometimes there is a delay
  }

  async getAccount() {
    const provider = await super.getProvider();
    if (!provider) throw new ConnectorNotFoundError();
    return provider
      .request({
        method: 'eth_accounts',
      })
      .then((accounts: string[]) => getAddress(accounts[0] as string))
      .catch((err: unknown) => err); //somewhere in import { createClient} from 'wagmi', it doesnt handle the eth_accounts error properly thats why it keeps popping up with connect window. This fixes it;
  }
}

export const enkryptWallet = ({
  chains,
  shimDisconnect,
}: EnkryptWalletOptions): Wallet => {
  return {
    createConnector: () => {
      return {
        connector: new EIP5749Connector({
          chains,
          options: {
            shimDisconnect,
          },
          walletId: 'enkrypt',
        }),
      };
    },
    downloadUrls: {
      browserExtension: 'https://www.enkrypt.com',
    },
    iconBackground: '#fff',
    iconUrl: async () => (await import('./enkryptWallet.svg')).default,
    id: 'enkrypt',
    installed: true,
    name: 'Enkrypt',
  };
};
