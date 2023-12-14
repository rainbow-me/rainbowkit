import {
  Chain,
  MethodNotFoundRpcError,
  SwitchChainError,
  UserRejectedRequestError,
  createWalletClient,
  custom,
  getAddress,
} from 'viem';
import { fromHex } from 'viem';
import {
  Address,
  Connector,
  ConnectorData,
  ConnectorNotFoundError,
  WalletClient,
} from 'wagmi';
import { appInfo } from '../../utils/appInfo';
import { normalizeChainId } from '../../utils/normalizeChainId';
import {
  removeSessionToken,
  savedSessionToken,
  setSessionToken,
} from '../../utils/session';
import { stringifyToQuery } from '../../utils/stringifyToQuery';
import { config } from './config';
import type {
  CustomPopupRequestParams,
  EventMessage,
  InitializedProviderEventData,
  InitializedProviderEventResult,
  TransportRequestParams,
  TransportRequestResponse,
  TransportRequestResult,
} from './interfaces';

export abstract class AbstractRainbowMiniWallet extends Connector<void, any> {
  #account: Address | null = null;
  #chainId: number | null = null;

  // abstracted values
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly loginType: string;
  readonly ready = true;

  constructor({
    chains,
    options,
  }: {
    chains: Chain[];
    options: Record<string, any>;
  }) {
    super({ chains, options });
  }

  #customPopupRequest<EventData, Response>({
    path = '',
    shouldResolve,
    getKey,
  }: CustomPopupRequestParams<EventData, Response>): Promise<Response> {
    if (typeof window === 'undefined') throw new Error('Window not found');

    return new Promise((resolve, reject) => {
      const popup = window.open(
        `${config.url}${path && `/${path}`}`,
        config.target,
        config.features,
      );

      const intervalCheckIfWindowClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(intervalCheckIfWindowClosed);
          reject('User rejected login');
        }
      }, 500);

      window.addEventListener('message', (e: EventMessage<EventData>) => {
        if (shouldResolve(e.data)) {
          resolve(getKey(e.data));
        }
      });
    });
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

      const [account, connectedChainId] = await Promise.all([
        this.getAccount(),
        this.getChainId(),
      ]);

      let unsupported = this.isChainUnsupported(connectedChainId);
      let id = connectedChainId;

      if (chainId && connectedChainId !== chainId) {
        // @ts-ignore
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
    const account = await this.getAccount();
    // @ts-ignore
    const chain = this.chains.find((x) => x.id === chainId) as Chain;

    const self = this;

    return createWalletClient({
      account,
      chain,
      transport: custom({
        async request({
          method,
          params,
        }: TransportRequestParams): Promise<any> {
          let queryData = {};

          switch (method) {
            case 'eth_sendTransaction':
              queryData = {
                signerData: { method, ...params[0] },
              };
              break;

            case 'personal_sign':
              queryData = {
                signerData: { method, message: fromHex(params[0], 'string') },
              };
              break;

            case 'eth_signTypedData_v4':
              queryData = {
                signerData: {
                  method: 'eth_signTypedData',
                  ...JSON.parse(params[1]),
                },
              };
              break;

            default:
              throw new MethodNotFoundRpcError(
                new Error(`${method} not supported`),
              );
          }

          const sessionToken = savedSessionToken();

          queryData = {
            ...queryData,
            app: appInfo(),
            ...(sessionToken ? { token: sessionToken } : {}),
          };

          const stringifyQuery = stringifyToQuery(queryData, true);

          const { signature, token } = await self.#customPopupRequest<
            TransportRequestResponse,
            TransportRequestResult
          >({
            path: `/signer${stringifyQuery}`,
            shouldResolve: (data) => !!data?.signature || data?.token === null,
            getKey: (data) => data,
          });

          if (token) setSessionToken(token);
          if (token === null) {
            removeSessionToken();
            throw new ConnectorNotFoundError();
          }

          return signature;
        },
      }),
    });
  }

  async getAccount(): Promise<Address> {
    if (!this.#account) throw new ConnectorNotFoundError();
    return Promise.resolve(getAddress(this.#account));
  }

  async getProvider(): Promise<void> {
    const sessionToken = savedSessionToken();

    const stringifyQuery = stringifyToQuery(
      {
        type: this.loginType,
        app: appInfo(),
        ...(sessionToken ? { token: sessionToken } : {}),
      },
      true,
    );

    const { account, chainId, token } = await this.#customPopupRequest<
      InitializedProviderEventData,
      InitializedProviderEventResult
    >({
      path: `/login${stringifyQuery}`,
      getKey: (data) => data,
      shouldResolve: (data) => !!data?.account || data?.token === null,
    });
    console.log({ token });
    if (token) setSessionToken(token);

    if (token === null) {
      removeSessionToken();
      throw new ConnectorNotFoundError();
    }

    if (!this.#account) {
      this.#account = account;
    }

    // @ts-ignore
    const chain = this.chains.find((chain) => chain.id === chainId);

    if (chain) {
      this.#chainId = chain.id;
    }
  }

  async watchAsset /* {
      address,
      decimals = 18,
      image,
      symbol,
    }: {
      address: Address;
      decimals?: number;
      image?: string;
      symbol: string;
    } */() {
    /* const provider = await this.getProvider();
  
      return provider.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address,
            decimals,
            image,
            symbol,
          },
        },
      }) as Promise<boolean>; */

    return false;
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
    if (!this.#chainId) return 1;
    return normalizeChainId(this.#chainId);
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
    return new Promise((resolve) => {
      this.#account = null;
      this.#chainId = null;
      resolve();
    });
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
