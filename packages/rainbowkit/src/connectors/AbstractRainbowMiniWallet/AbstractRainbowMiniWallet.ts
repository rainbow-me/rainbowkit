import {
  Chain,
  MethodNotFoundRpcError,
  SwitchChainError,
  UserRejectedRequestError,
  createWalletClient,
  custom,
  getAddress,
  isAddress,
} from "viem";
import { fromHex } from "viem";
import {
  Address,
  Connector,
  ConnectorData,
  ConnectorNotFoundError,
  WalletClient,
} from "wagmi";
import { normalizeChainId } from "../../utils/normalizeChainId";
import { stringifyToQuery } from "../../utils/stringifyToQuery";
import { config } from "./config";
import type {
  CustomPopupRequestParams,
  EventMessage,
  InitializedProviderEventData,
  InitializedProviderEventResult,
  TransportRequestParams,
  TransportRequestResponse,
  TransportRequestResult,
} from "./interfaces";
import {
  miniWalletConnector,
  removeMiniWalletConnector,
  setMiniWalletConnector,
} from "../../utils/miniWalletConnector";

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

  #getCachedProvider() {
    const miniWallet = miniWalletConnector();
    if (!miniWallet) return;
    return { account: miniWallet.account, chain: miniWallet.chain };
  }

  #customPopupRequest<EventData, Response>({
    path = "",
    shouldResolve,
    getKey,
  }: CustomPopupRequestParams<EventData, Response>): Promise<Response> {
    if (typeof window === "undefined") throw new Error("Window not found");

    return new Promise((resolve, reject) => {
      const popup = window.open(
        `${config.url}${path && `/${path}`}`,
        config.target,
        config.features
      );

      const intervalCheckIfWindowClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(intervalCheckIfWindowClosed);
          reject("User rejected login");
        }
      }, 500);

      window.addEventListener("message", (e: EventMessage<EventData>) => {
        if (shouldResolve(e.data)) {
          resolve(getKey(e.data));
        }
      });
    });
  }

  async connect({ chainId }: { chainId?: number } = {}): Promise<
    Required<ConnectorData>
  > {
    // @ts-ignore
    this.emit("message", {
      type: "connecting",
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
  }

  async getWalletClient({
    chainId,
  }: { chainId?: number } = {}): Promise<WalletClient> {
    const self = this;

    const account = await this.getAccount();

    // @ts-ignore
    const chain = this.chains.find((x) => x.id === chainId) as Chain;

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
            case "eth_sendTransaction":
              queryData = {
                signerData: { method, ...params[0] },
              };
              break;

            case "personal_sign":
              queryData = {
                signerData: { method, message: fromHex(params[0], "string") },
              };
              break;

            case "eth_signTypedData_v4":
              queryData = {
                signerData: {
                  method: "eth_signTypedData",
                  ...JSON.parse(params[1]),
                },
              };
              break;

            default:
              throw new MethodNotFoundRpcError(
                new Error(`${method} not supported`)
              );
          }

          const stringifyQuery = stringifyToQuery(queryData, true);

          const { signature } = await self.#customPopupRequest<
            TransportRequestResponse,
            TransportRequestResult
          >({
            path: `/signer${stringifyQuery}`,
            shouldResolve: (data) => !!data?.signature,
            getKey: (data) => data,
          });

          return signature;
        },
      }),
    });
  }

  async getAccount(): Promise<Address> {
    await this.getProvider();
    return Promise.resolve(getAddress(this.#account));
  }

  async getProvider(): Promise<void> {
    const cachedProvider = this.#getCachedProvider();

    if (cachedProvider) {
      if (!this.#chainId && !this.#account) {
        this.#account = cachedProvider.account;
        this.#chainId = cachedProvider.chain.id;
      }

      return;
    }

    const stringifyQuery = stringifyToQuery(
      {
        type: this.loginType,
      },
      true
    );

    const { account, chainId } = await this.#customPopupRequest<
      InitializedProviderEventData,
      InitializedProviderEventResult
    >({
      path: `/login${stringifyQuery}`,
      getKey: (data) => data,
      shouldResolve: (data) => !!data?.account,
    });

    if (!isAddress(account)) {
      throw new ConnectorNotFoundError();
    }

    const normalizedChainId = normalizeChainId(chainId);

    // @ts-ignore
    const chain = this.chains.find((chain) => chain.id === normalizedChainId);

    if (!chain) {
      throw new SwitchChainError(new Error("chain not found on connector."));
    }

    this.#chainId = chain.id;
    this.#account = account;

    setMiniWalletConnector({ account, chain });
  }

  async watchAsset() {
    return true;
  }

  async isAuthorized() {
    try {
      await this.getProvider();
      const account = await this.getAccount();
      return !!account;
    } catch {
      return false;
    }
  }

  async getChainId(): Promise<number> {
    await this.getProvider();
    return this.#chainId!;
  }

  async switchChain(chainId: number) {
    // @ts-ignore
    const chain = this.chains.find((chain) => chain.id === chainId);

    if (!chain) {
      throw new SwitchChainError(new Error("chain not found on connector."));
    }

    return chain;
  }

  async disconnect(): Promise<void> {
    return new Promise((resolve) => {
      this.#account = null;
      this.#chainId = null;
      removeMiniWalletConnector();
      resolve();
    });
  }

  protected onAccountsChanged = (accounts: string[]) => {
    // @ts-ignore
    if (accounts.length === 0) this.emit("disconnect");
    // @ts-ignore
    else this.emit("change", { account: getAddress(accounts[0]) });
  };

  protected isChainUnsupported(chainId: number): boolean {
    // @ts-ignore
    return !this.chains.some((x) => x.id === chainId);
  }

  protected onChainChanged = (chainId: string | number): void => {
    const id = normalizeChainId(chainId);
    const unsupported = this.isChainUnsupported(id);
    // @ts-ignore
    this.emit("change", { chain: { id, unsupported } });
  };

  protected onDisconnect() {
    // @ts-ignore
    this.emit("disconnect");
  }
}
