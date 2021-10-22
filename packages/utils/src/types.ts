import type { AbstractConnector } from '@web3-react/abstract-connector'

export type Wallet = {
  name: string
  hidden?: boolean
  connector: AbstractConnector
}

export type TxHistoryFetcher<Tx = any, P = any, O = any> = (opts: {
  address: string
  provider: P
  options?: O
}) => Promise<Tx[]>
