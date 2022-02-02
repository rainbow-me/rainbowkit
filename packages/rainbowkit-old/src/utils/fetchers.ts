import type {
  BlockTag,
  Log,
  TransactionResponse,
} from '@ethersproject/abstract-provider';
import type { EtherscanProvider } from '@ethersproject/providers';

export type TxHistoryFetcher<Tx = any, P = any, O = any> = (opts: {
  address: string;
  provider: P;
  options?: O;
}) => Promise<Tx[]>;

export const logsFetcher: TxHistoryFetcher<Log> = async ({
  provider,
  address,
  options = {},
}) => {
  return await provider.getLogs({ address, ...options });
};

export const etherscanFetcher: TxHistoryFetcher<
  TransactionResponse,
  EtherscanProvider,
  { fromBlock?: BlockTag; toBlock?: BlockTag }
> = async ({ provider, address, options = {} }) => {
  return await provider.getHistory(address, options.fromBlock, options.toBlock);
};
