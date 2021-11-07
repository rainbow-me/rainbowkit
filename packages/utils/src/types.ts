export type Wallet<T = any> = {
  name: string
  hidden?: boolean
  connector: T
}

export type TxHistoryFetcher<Tx = any, P = any, O = any> = (opts: {
  address: string
  provider: P
  options?: O
}) => Promise<Tx[]>
