export type Wallet = { name: string; hidden?: boolean; options?: Record<string, any>; connectorName?: string }

export type TxHistoryFetcher<Tx = any, P = any, O = any> = (opts: {
  address: string
  provider: P
  options?: O
}) => Promise<Tx[]>
