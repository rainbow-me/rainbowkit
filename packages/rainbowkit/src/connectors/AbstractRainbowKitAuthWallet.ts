import { type SafeEventEmitterProvider } from '@web3auth/base';
import {
  COREKIT_STATUS,
  IdTokenLoginParams,
  type Web3AuthMPCCoreKit,
} from '@web3auth/mpc-core-kit';
import {
  Chain,
  ChainNotFoundError,
  SwitchChainError,
  UserRejectedRequestError,
  createWalletClient,
  custom,
  getAddress,
} from 'viem';
import {
  Address,
  Connector,
  ConnectorData,
  ConnectorNotFoundError,
  WalletClient,
} from 'wagmi';

const authenticationTypes = ['rk-password'] as const;

interface EventMessageDataUser {
  jwt: string;
  userId: string;
}

interface EventMessageData {
  type: typeof authenticationTypes[number];
  data: EventMessageDataUser;
}

interface EventMessageResult {
  data: EventMessageData;
}

export interface Options {
  web3AuthInstance: Web3AuthMPCCoreKit;
}

function normalizeChainId(chainId: string | number | bigint) {
  if (typeof chainId === 'string')
    return Number.parseInt(
      chainId,
      chainId.trim().substring(0, 2) === '0x' ? 16 : 10,
    );
  if (typeof chainId === 'bigint') return Number(chainId);
  return chainId;
}

export abstract class AbstractRainbowKitAuthWallet extends Connector<
  SafeEventEmitterProvider,
  Options
> {
  #web3AuthInstance: Web3AuthMPCCoreKit;

  protected provider: SafeEventEmitterProvider | null = null;

  // abstracted values
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly loginType: string;

  readonly #loginProviderTarget?: string;
  readonly #loginProviderUrl?: string;
  readonly #loginProviderFeatures: string;
  readonly ready = true;

  constructor({ chains, options }: { chains: Chain[]; options: Options }) {
    super({ chains, options });
    this.#web3AuthInstance = options.web3AuthInstance;
    this.#loginProviderTarget = 'auth';
    this.#loginProviderUrl = 'http://localhost:3000';
    this.#loginProviderFeatures = 'width=600,height=700';
  }

  async #login(data: EventMessageDataUser): Promise<void> {
    try {
      const idTokenLoginParams: IdTokenLoginParams = {
        verifier: 'rainbow-test-login',
        subVerifier: 'stytch-jwt-verifier',
        verifierId: data.userId,
        idToken: data.jwt,
      };

      await this.#web3AuthInstance.loginWithJWT(idTokenLoginParams);
    } catch {
      // ignore
    }
  }

  #loginWithStytch(): Promise<EventMessageDataUser> {
    if (typeof window === 'undefined') throw new Error('Window not found');

    return new Promise((resolve, reject) => {
      const popup = window.open(
        `${this.#loginProviderUrl}?authType=${this.loginType}`,
        this.#loginProviderTarget,
        this.#loginProviderFeatures,
      );

      const intervalCheckIfWindowClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(intervalCheckIfWindowClosed);
          reject('User rejected login');
        }
      }, 500);

      window.addEventListener('message', (event: EventMessageResult) => {
        if (!authenticationTypes.includes(event.data.type)) {
          clearInterval(intervalCheckIfWindowClosed);
          return reject('Not a valid auth provider');
        }

        clearInterval(intervalCheckIfWindowClosed);
        resolve(event.data.data);
      });
    });
  }

  async #initProvider(): Promise<void> {
    const { userId, jwt } = await this.#loginWithStytch();
    await this.#login({ userId, jwt });
  }

  async connect({
    chainId,
  }: { chainId?: number } = {}): Promise<Required<ConnectorData>> {
    try {
      // @ts-ignore
      this.emit('message', {
        type: 'connecting',
      });

      await this.getProvider();

      if (!this.provider) throw new ConnectorNotFoundError();

      this.provider.on('accountsChanged', this.onAccountsChanged);
      this.provider.on('chainChanged', this.onChainChanged);

      const [account, connectedChainId] = await Promise.all([
        this.getAccount(),
        this.getChainId(),
      ]);

      let unsupported = this.isChainUnsupported(connectedChainId);
      let id = connectedChainId;

      if (chainId && connectedChainId !== chainId) {
        const chain = await this.switchChain(chainId);
        id = chain.id;
        unsupported = this.isChainUnsupported(id);
      }

      return {
        account,
        chain: {
          id,
          unsupported,
        },
      };
    } catch {
      this.onDisconnect();
      throw new UserRejectedRequestError(
        'Something went wrong' as unknown as Error,
      );
    }
  }

  async getWalletClient({
    chainId,
  }: { chainId?: number } = {}): Promise<WalletClient> {
    const [provider, account] = await Promise.all([
      this.getProvider(),
      this.getAccount(),
    ]);
    // @ts-ignore
    const chain = this.chains.find((x) => x.id === chainId)!;
    // @ts-ignore
    return createWalletClient({
      account,
      chain,
      transport: custom(provider),
    });
  }

  async getAccount(): Promise<Address> {
    const provider = await this.getProvider();
    const accounts = await provider.request<unknown, string[]>({
      method: 'eth_accounts',
    });
    return getAddress((accounts?.[0] ?? '') as Address);
  }

  async getProvider(): Promise<SafeEventEmitterProvider> {
    if (this.provider) return this.provider;

    if (this.#web3AuthInstance.status === COREKIT_STATUS.NOT_INITIALIZED) {
      await this.#web3AuthInstance.init();
    }

    await this.#initProvider();

    if (this.#web3AuthInstance.provider) {
      this.provider = this.#web3AuthInstance.provider;
    }

    if (!this.provider) throw new ConnectorNotFoundError();

    return this.provider;
  }

  async watchAsset({
    address,
    decimals = 18,
    image,
    symbol,
  }: {
    address: Address;
    decimals?: number;
    image?: string;
    symbol: string;
  }) {
    const provider = await this.getProvider();

    return provider.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address,
          decimals,
          image,
          symbol,
        },
      },
    }) as Promise<boolean>;
  }

  async isAuthorized() {
    try {
      const account = await this.getAccount();
      return !!account;
    } catch {
      return false;
    }
  }

  async getChainId(): Promise<number> {
    if (!this.provider) return 1;

    // @ts-ignore
    const chainId = await this.provider.request<
      unknown,
      string | bigint | number
    >({
      method: 'eth_chainId',
    });

    if (!chainId) throw new ChainNotFoundError();

    return normalizeChainId(chainId);
  }

  async switchChain(chainId: number) {
    try {
      // @ts-ignore
      const chain = this.chains.find((chain) => chain.id === chainId);

      if (!chain) {
        throw new SwitchChainError(new Error('chain not found on connector.'));
      }

      /* await this.#web3AuthInstance.addChain({
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: `0x${chain.id.toString(16)}`,
        rpcTarget: chain.rpcUrls.default.http[0],
        displayName: chain.name,
        blockExplorer: chain.blockExplorers?.default.url[0] || "",
        ticker: chain.nativeCurrency?.symbol || "ETH",
        tickerName: chain.nativeCurrency?.name || "Ethereum",
        decimals: chain.nativeCurrency.decimals || 18,
      });

       await this.web3AuthInstance.switchChain({
        chainId: `0x${chain.id.toString(16)}`,
      }); */

      return chain;
    } catch (error: unknown) {
      throw new SwitchChainError(error as Error);
    }
  }

  async disconnect(): Promise<void> {
    await this.#web3AuthInstance.logout();

    if (this.provider) {
      this.provider.removeListener('accountsChanged', this.onAccountsChanged);
      this.provider.removeListener('chainChanged', this.onChainChanged);
      this.provider = null;
    }
  }

  protected onAccountsChanged = (accounts: string[]) => {
    // @ts-ignore
    if (accounts.length === 0) this.emit('disconnect');
    // @ts-ignore
    else this.emit('change', { account: getAddress(accounts[0]) });
  };

  protected isChainUnsupported(chainId: number): boolean {
    // @ts-ignore
    return !this.chains.some((x) => x.id === chainId);
  }

  protected onChainChanged = (chainId: string | number): void => {
    const id = normalizeChainId(chainId);
    const unsupported = this.isChainUnsupported(id);
    // @ts-ignore
    this.emit('change', { chain: { id, unsupported } });
  };

  protected onDisconnect() {
    // @ts-ignore
    this.emit('disconnect');
  }
}
