import { SendTransactionParameters } from 'viem';
import { Address } from 'viem';

export interface EventMessage<T> {
  data: T;
}

export type CustomPopupRequestParams<Event, Response> = {
  path?: string;
  shouldResolve: (event: Event) => boolean;
  getKey: (event: Event) => Response;
};

export interface InitalizedProviderResponse {
  address: string;
}

export interface InitializedProviderEventData {
  account: Address;
  chainId: string;
  token?: string;
}

export interface InitializedProviderEventResult {
  account: Address;
  chainId: string;
  token?: string;
}

export interface TransportRequestResponse {
  signature: Address;
  token?: string;
}

export interface TransportRequestResult {
  signature: Address;
  token?: string;
}

export type TransportRequestParams =
  | {
      method: 'personal_sign';
      params: Address[];
    }
  | {
      method: 'eth_signTypedData_v4';
      params: string[];
    }
  | {
      method: 'eth_sendTransaction';
      params: SendTransactionParameters[];
    };
